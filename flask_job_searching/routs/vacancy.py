from __main__ import get_db, app

from flask import jsonify, request
from database.Vacancy import VacancyDB
from database.AccessToken import AccessTokenDB


@app.route('/api/vacancies/<vacancy_id>', methods=['GET'])
def get_vacancy(vacancy_id):
    access_token_db = AccessTokenDB( get_db() )
    print('attempt to get a vacancy')
    token = None
    try:
        token = request.headers['Authorization']
        # print('token', token)
    except Exception as e:
        print('token has been received with error:', e)

    if not token:
        return jsonify( {'success': False, 'error': 'not found token'} ), 401

    if not access_token_db._check_token(token):
        return jsonify( {'success': False, 'error': 'incorrect token'} ), 401
    vacancy_db = VacancyDB( get_db() )
    print('vacancy id:', vacancy_id)

    # vacancy_id = 10
    vacancy = vacancy_db._get_vacancy_from_id(vacancy_id)
    if vacancy:
        # vacancy = {
        #     'title': vacancy[1], 
        #     'description': vacancy[2], 
        #     'owner': vacancy[3]
        # }
        return jsonify( {'title': vacancy[1], 'description': vacancy[2], 'owner': vacancy[3]} ), 200
    return jsonify( {'success': False, 'error': 'page not found'} ), 404
