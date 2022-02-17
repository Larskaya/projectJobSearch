from flask import jsonify

class Base:

    def __init__(self):
        pass


    def __login_validation_check(self, login):
        if len(login) >= 8: return True

    def __email_validation_check(self, email):
        if email in r'/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i':
            return True

    def __password_validation_check(self, password):
        if len(password) >= 8: return True


    def _check_validation(self, user_data):
        login, email, psw = user_data['login'], user_data['email'], user_data['password']
        if not self.__login_validation_check(login):
            return jsonify( {'success': 'false', 'error': 'short login'} ), 422

        if not self.__email_validation_check(email):
            return jsonify( {'success': 'false', 'error': 'incorrect email'} ), 422

        if not self.__password_validation_check(psw):
            return jsonify( {'success': 'false', 'error': 'short password'} ), 422
            
        # return render_template('authorization.html', 200)
        return jsonify( {'success': 'true'} ), 200

