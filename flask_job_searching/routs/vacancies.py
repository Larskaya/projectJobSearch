
from __main__ import app, get_db
from database.Vacancy import *
from flask import g, jsonify, request

# from error import api_error


@app.route('/api/vacancies', methods=['GET'])
def vacancies():
    print('func on get vacancies')
    if request.method == 'GET':
        print('\tget vacancies')
        g.vacancy = VacancyDB( get_db() )
        vacancies = g.vacancy._get_vacancies()
        if vacancies: 
            data = list()
            print(f'vacancies {vacancies}')
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
    # return api_error.methodNotAllowed(405)

