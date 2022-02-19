
from __main__ import app, get_db
from database.User import *
from werkzeug.security import generate_password_hash
from flask import jsonify, request

from base import Base 


@app.route('/api/register', methods=['POST'])
def registration():
    # print('\tregister')
    user_db = UserDB( get_db() )
    base = Base()

    if request.method == 'POST':
        user_data = request.json
        if base._check_validation(user_data):

            login, email, type_ = user_data['login'], user_data['email'], user_data['type']

            if type_ == 'employee': t = 2
            elif type_ == 'employer': t = 1
            
            hpsw = generate_password_hash(user_data['password'])
            result = user_db._add_user(login, hpsw, email, t)
        
            if result: 
                return jsonify( {'success': True} ), 200
            else: 
                return jsonify( {'success': False} ), 409  # render_template('registration.html'), 409
        else:
            return jsonify( {'success': False} ), 403 
            # return render_template(app.static_folder + '/registration.html'), 403
    else:
        return None, 200
    # return None, 405


