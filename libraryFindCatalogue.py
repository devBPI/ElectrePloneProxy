import flask
from flask import request
from flask import Flask
from electreProxy import NoticePage
from crossDomainDecorator import crossdomain

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/quatrieme', methods=['GET', 'OPTIONS'])
@crossdomain('*', 'GET', 'X-Requested-With')
def quatrieme():
    isbn = request.args.get('isbn')
    resp = flask.Response(NoticePage().quatrieme(isbn))
    return resp

@app.route('/tabledesmatieres', methods=['GET', 'OPTIONS'])
@crossdomain('*', 'GET', 'X-Requested-With')
def tabledesmatieres():
    isbn = request.args.get('isbn')
    resp = flask.Response(NoticePage().tabledesmatieres(isbn))
    return resp

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=None)


