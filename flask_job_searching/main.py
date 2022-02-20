import flask
from flask import Flask, send_from_directory
import psycopg2, os 

app = Flask(__name__, static_folder='static_build/static')
app.config.update( dict(DATABASE=os.path.join(app.root_path, 'job_searching.db')) )

def connect_db():
    conn = False
    try:
        conn = psycopg2.connect(
            database="job_searching", 
            user="postgres", 
            password="bDpWbcCj6aQkg3aH",
            host="localhost", 
            port="5431"
        )
    except Exception as e:
        print('connection error', str(e))
    return conn


def get_db():
    if not hasattr(flask.g, 'link_db'):
        flask.g.link_db = connect_db()
    return flask.g.link_db


@app.route('/static_build/<path:path>')
def send_static(path):
    print(f'path: {path}')
    return send_from_directory(app.static_folder, path)


@app.after_request 
def after_request(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = '*'
    return response

from routs import registration, login, logout, vacancies

if __name__ == '__main__':
    os.environ['FLASK_ENV'] = 'development'
    app.run(debug=True)

