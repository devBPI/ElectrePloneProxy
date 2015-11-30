import flask
from flask import request
from flask import Flask
from electreProxy import NoticePage

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

@app.route('/quatrieme')
def quatrieme():
    isbn = request.args.get('isbn')
    resp = flask.Response(NoticePage().quatrieme(isbn))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route('/tabledesmatieres')
def tabledesmatieres():
    isbn = request.args.get('isbn')
    resp = flask.Response(NoticePage().tabledesmatieres(isbn))
    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

if __name__ == '__main__':
    app.run(debug=True)
