from __main__ import app, get_db
# from database.User import *
from database.AccessToken import *
from flask import request, jsonify


@app.route('/api/logout', methods=['DELETE'])
def logout():
    # user_db = UserDB( get_db() )
    access_token_db = AccessTokenDB( get_db() )

    token = None
    try:
        token = request.json['token']
    except Exception as e:
        print('token has been received with error:', e)

    if not token:
        return jsonify( {'success': False, 'error': 'not found token'} ), 404

    if access_token_db._delete_token(token):
        return jsonify( {'success': True} ), 200

