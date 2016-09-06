import os

import flask
from flask import Flask

app = Flask(__name__)
port = 3000

@app.route('/')
def index():
    return flask.render_template('index.html')

if __name__ == '__main__':
    # Bind to PORT if defined, otherwise default to 5000.
    app.run(host='0.0.0.0', port=port, debug=(port != 80))
