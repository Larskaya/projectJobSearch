
from __main__ import app, get_db
from flask import jsonify, request

from database.Vacancy import *
from database.AccessToken import *


@app.route('/api/vacancies', methods=['GET'])
def vacancies():
    access_token_db = AccessTokenDB( get_db() )
    
    if request.method == 'GET':
        
        token = None
        try:
            token = request.headers['Authorization']
            print('token', token)
        except Exception as e:
            print('token has been received with error:', e)

        if not token:
            return jsonify( {'success': False, 'error': 'not found token'} ), 401

        if not access_token_db._check_token(token):
            return jsonify( {'success': False, 'error': 'incorrect token'} ), 401

        vacancy_db = VacancyDB( get_db() )
        
        vacancies = vacancy_db._get_vacancies()
        if not vacancies: 
            return jsonify( {'success': False, 'error': 'vacancies not found'} )

        data = list()
        for vacancy in vacancies:
            vac = dict()
            v = {
                'id': vacancy[0],
                'title': vacancy[1],
                'description': vacancy[2],
                'user_id': vacancy[3]
            }
            for key in v.keys():
                vac[key] = v[key]
            data.append(vac)
            
        return jsonify( data )
    return None, 405


