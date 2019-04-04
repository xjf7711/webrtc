# coding:utf8
# 将程序转换成可以使用gevent框架的异步程序
from gevent import monkey

monkey.patch_all()

from flask import Flask
from flask_sse import sse

app = Flask(__name__)
app.config["REDIS_URL"] = "redis://localhost"
app.register_blueprint(sse, url_prefix='/stream')


@app.route('/')
def hello_world():
    return 'Hello World!'


@app.route('/stream')
def send_message():
    sse.publish({"message": "Hello!"}, type='greeting')
    return "Message sent!"


if __name__ == '__main__':
    app.run()

# gunicorn sse:app --worker-class gevent --workers 4 --bind 127.0.0.1:5000