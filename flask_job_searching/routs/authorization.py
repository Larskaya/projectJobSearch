import secrets
from __main__ import app, get_db
from database.User import *
from database.AccessToken import *
from flask import g, jsonify, request

from base import Base 


@app.route('/api/auth', methods=['POST'])
def authorization():
    print('\tauth')
    g.auth = AccessTokenDB( get_db() )
    g.user = UserDB( get_db() )
    g.base = Base()

    if request.method == 'POST':
        email = request.json['email']
        user_id = g.user._get_user_id_by_email(email)
        token = secrets.token_urlsafe(64)
        if g.auth._auth_user(user_id, token):
            print('user logged in')
            return jsonify( {'success': 'true', 'token': token} ), 200
        else:
            return jsonify( {'success': 'false', 'error': 'cannot to add an user'} )
    
    return None, 405