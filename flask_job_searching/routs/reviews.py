from __main__ import app, get_db
from flask import jsonify, request
from database.AccessToken import AccessTokenDB
from database.Review import ReviewDB

@app.route('/api/vacancies/<vacancy_id>/reviews', methods=['GET'])
def get_reviews(vacancy_id):
    access_token_db = AccessTokenDB( get_db() )
    token = None
    try:
        token = request.headers['Authorization']
    except Exception as e:
        print('token has been received with error:', e)

    if not token:
        return jsonify( {'success': False, 'error': 'not found token'} ), 401

    if not access_token_db._check_token(token):
        return jsonify( {'success': False, 'error': 'incorrect token'} ), 401

    review_db = ReviewDB( get_db() )
    reviews = review_db._get_reviews_for_vacancy(vacancy_id)
    if not reviews: 
        all_reviews = []
    else:
        all_reviews = []
        for review in reviews:
            rev = dict()
            r = {
                'id': review[0],
                'description': review[1],
                'vacancy_id': review[2],
                'user_id': review[3],
                'created_at': review[4],
                'login': review[5]
            }
            for key in r.keys():
                rev[key] = r[key]
            all_reviews.append(rev)
    return jsonify( {'success': True, 'reviews': all_reviews} ), 200


@app.route('/api/vacancies/<vacancy_id>/reviews', methods=['POST'])
def add_review(vacancy_id):
    access_token_db = AccessTokenDB( get_db() )
    token = None
    try:
        token = request.headers['Authorization']
    except Exception as e:
        print('token has been received with error:', e)

    if not token:
        return jsonify( {'success': False, 'error': 'not found token'} ), 401

    if not access_token_db._check_token(token):
        return jsonify( {'success': False, 'error': 'incorrect token'} ), 401
    reviews_db = ReviewDB( get_db() )

    review_text = request.json['text']
    user_id = access_token_db._get_user_id_by_token(token)

    if reviews_db._add_review(review_text, vacancy_id, user_id):
        return jsonify( {'success': True} ), 200
    return jsonify( {'success': False} ), 409