from __main__ import app

from flask import request

@app.after_request 
def after_request(response):
    if request.headers:
        pass
    return response