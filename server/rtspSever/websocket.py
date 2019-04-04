from websocket_server import WebsocketServer
import threading
import cv2
import base64
import time
camera1 = None
frame = cv2.imread("1.jpg", cv2.IMREAD_COLOR)
rtsp_path = "rtsp://admin:abc12345@192.168.1.9:554/h264/ch1/main/"


# Called for every client connecting (after handshake)
def new_client(client, server):
	print("New client connected and was given id %d" % client['id'])
	# 发送给所有的连接
	server.send_message_to_all("Hey all, a new client has joined us")


# Called for every client disconnecting
def client_left(client, server):
	print("Client(%d) disconnected" % client['id'])


# Called when a client sends a message
def message_received(client, server, message):
	if len(message) > 200:
		message = message[:200]+'..'
	print("Client(%d) said: %s" % (client['id'], message))
	global camera1
	camera1 = cv2.VideoCapture(message)
	# 发送给所有的连接
	# server.send_message_to_all(message)


def from_vedio():
	thread1 = threading.Thread(target=vedio_thread1, args=(1,))
#     thread1.setDaemon(True)
	thread1.start()
	thread2 = threading.Thread(target=vedio_thread2, args=(1,))
#     thread1.setDaemon(True)
	thread2.start()
	print('start')


def vedio_thread1(n):
	print('send')
	while True:
		if len(server.clients) > 0:
			image = cv2.imencode('.jpg', frame)[1]
			base64_data = base64.b64encode(image)
			s = base64_data.decode()
			# print('data:image/jpeg;base64,%s'%s)
			server.send_message_to_all('data:image/jpeg;base64,' + s)
		time.sleep(0.01)


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


# Server Port
PORT = 8124
# 创建Websocket Server
server = WebsocketServer(PORT, '0.0.0.0')
from_vedio()
# 有设备连接上了
server.set_fn_new_client(new_client)
# 断开连接
server.set_fn_client_left(client_left)
# 接收到信息
server.set_fn_message_received(message_received)
# 开始监听
server.run_forever()
