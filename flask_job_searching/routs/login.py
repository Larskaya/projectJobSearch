import secrets
from __main__ import app, get_db
from database.User import *
from database.AccessToken import *
from flask import request, jsonify
from werkzeug.security import check_password_hash

# from flask import json


@app.route('/api/login', methods=['POST'])
def authorization():
    # print('\tauth')
    print('request:', request.json)
    access_token_db = AccessTokenDB( get_db() )
    user_db = UserDB( get_db() )

    email = request.json['email']
    password = request.json['password']
    
    user_id = user_db._is_user_id_by_email(email)
    if user_id:
        from_table_psw = user_db._get_hash_password_from_id(user_id)
        is_psw = check_password_hash(from_table_psw, password)
        
        if is_psw:
            token = secrets.token_urlsafe(64)
            if access_token_db._auth_user(user_id, token):
                # data = {'success': True, 'token': token}
                # response = app.response_class(
                #     response=json.dumps(data, indent=4),
                #     status=200,
                #     mimetype='application/json'
                # )
                # return response
                return jsonify( {'success': True, 'token': token} ), 200
                # return json.dumps(data, indent=4), 200
            else:
                return jsonify( {'success': False, 'error': 'something error'} ), 500

        else:
            return jsonify( {'success': False, 'error': 'wrong password'} ), 404
    else:
        return jsonify( {'success': False, 'error': 'wrong email'} ), 404
        
