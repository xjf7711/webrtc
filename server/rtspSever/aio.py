import asyncio
from aiohttp import web
from aiohttp_sse import sse_response
import threading
import cv2
import base64
import time
from datetime import datetime

camera1 = None
frame = cv2.imread("1.jpg", cv2.IMREAD_COLOR)
rtsp_path = "rtsp://admin:abc12345@192.168.1.9:554/h264/ch1/main/"


async def hello(request):
    loop = request.app.loop
    async with sse_response(request) as resp:
        while True:
            data = 'Server Time : {}'.format(datetime.now())
            print(data)
            await resp.send(data)
            await asyncio.sleep(1, loop=loop)
    return resp


def from_vedio():
    thread1 = threading.Thread(target=vedio_thread1, args=(1,))
#     thread1.setDaemon(True)
    thread1.start()
    thread2 = threading.Thread(target=vedio_thread2, args=(1,))
#     thread1.setDaemon(True)
    thread2.start()
    print('start')


async def vedio_thread1(request):
    print('send')
    async with sse_response(request) as resp:
        while True:
            # if len(server.clients) > 0:
            image = cv2.imencode('.jpg', frame)[1]
            base64_data = base64.b64encode(image)
            steam = base64_data.decode()
            await resp.send(steam)
            await asyncio.sleep(0.02)
            # print('data:image/jpeg;base64,%s'%s)
            # server.send_message_to_all('data:image/jpeg;base64,' + s)
            # time.sleep(0.01)
    return resp


def vedio_thread2(n):
    global camera1
    camera1 = cv2.VideoCapture(rtsp_path)
    global frame
    while True:
        _, img_bgr = camera1.read()
        if img_bgr is None:
            camera1 = cv2.VideoCapture(rtsp_path)
            print('丢失帧')
        else:
            frame = img_bgr


async def sse(request):
    async with sse_response(request) as resp:
        while True:
            global camera1
            camera1 = cv2.VideoCapture(rtsp_path)
            global frame

            _, img_bgr = camera1.read()
            if img_bgr is None:
                camera1 = cv2.VideoCapture(rtsp_path)
                print('丢失帧')
            else:
                frame = img_bgr
            image = cv2.imencode('.jpg', frame)[1]
            base64_data = base64.b64encode(image)
            data = base64_data.decode()
            await resp.send(data)
            await asyncio.sleep(0.05)
    return resp

    #
    # global camera1
    # camera1 = cv2.VideoCapture(rtsp_path)
    # global frame
    #
    # _, img_bgr = camera1.read()
    # if img_bgr is None:
    #     camera1 = cv2.VideoCapture(rtsp_path)
    #     print('丢失帧')
    # else:
    #     frame = img_bgr
    #     image = cv2.imencode('.jpg', frame)[1]
    #     base64_data = base64.b64encode(image)
    #     s = base64_data.decode()
    #     # print("====" + s)
    #     headers = {
    #         "Content-Type": "text/event-stream",
    #         "Cache-Control": "no-cache",
    #         "Connection": "keep-alive",
    #         "Access-Control-Allow-Origin": '*'
    #     }
    #     content = "event: greeting\n" + "data: hello" + "\n\n" + "data:" + s + "\n\n"
    #     return web.Response(body=content, headers=headers)


if __name__ == '__main__':
    # get_frame()
    from_vedio()
    app = web.Application()
    app.add_routes([web.get('/stream', vedio_thread1), web.get("/hello", hello)])
    web.run_app(app, host='0.0.0.0', port=8282)
