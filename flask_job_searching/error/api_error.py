import werkzeug
from __main__ import app


# class ApiError:
    # def __init__(self, status_code, message):
    #     self.status = status_code
    #     self.msg = message

@app.errorhandler(werkzeug.exceptions.BadRequest)
def bedRequest(message):
    return 'bad request!', 400

@app.errorhandler(werkzeug.exceptions.BadRequest)
def forbidden(message):
    return 'forbidden', 403

@app.errorhandler(werkzeug.exceptions.BadRequest)
def notFound(message):
    return 'page not found!', 404

@app.errorhandler(werkzeug.exceptions.BadRequest)
def methodNotAllowed(message):
    return 'method not allowed', 405

@app.errorhandler(werkzeug.exceptions.BadRequest)
def internal(message):
    return 'internal server error', 500

    
        