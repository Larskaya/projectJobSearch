from __main__ import get_db, app

from flask import jsonify, request
from database.Vacancy import VacancyDB
from database.Review import ReviewDB
from database.AccessToken import AccessTokenDB


@app.route('/api/vacancies/<vacancy_id>', methods=['GET'])
def get_vacancy(vacancy_id):
    access_token_db = AccessTokenDB( get_db() )
    print('attempt to get a vacancy')
    token = None
    try:
        token = request.headers['Authorization']
    except Exception as e:
        print('token has been received with error:', e)

    if not token:
        return jsonify( {'success': False, 'error': 'not found token'} ), 401

    if not access_token_db._check_token(token):
        return jsonify( {'success': False, 'error': 'incorrect token'} ), 401

    vacancy_db = VacancyDB( get_db() )
    review_db = ReviewDB( get_db() )

    vacancy = vacancy_db._get_vacancy_from_id(vacancy_id)
    # if vacancy:
    reviews = review_db._get_reviews_for_vacancy(vacancy_id)
    if not reviews: 
        all_reviews = {}
    else:
        all_reviews = list()
        for review in reviews:
            rev = dict()
            r = {
                'id': review[0],
                'description': review[1],
                'vacancy_id': review[2],
                'user_id': review[3],
                'created_at': review[4]
            }
            for key in r.keys():
                rev[key] = r[key]
            all_reviews.append(rev)
            
    return jsonify( {'title': vacancy[1], 'description': vacancy[2], 'owner': vacancy[3], 'reviews': all_reviews} ), 200
    # return jsonify( {'success': False, 'error': 'page not found'} ), 404
