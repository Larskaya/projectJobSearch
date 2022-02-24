import psycopg2


class VacancyDB:
    def __init__(self, db):
        self.__db = db
        self.__cur = db.cursor()

    def _get_vacancies(self):
        self.__cur.execute('select * from vacancies')
        vacancies = self.__cur.fetchall()
        if vacancies:
            return vacancies
        return None

    def _get_vacancy_from_id(self, vacancy_id):
        self.__cur.execute('select * from vacancies where id=%s', (vacancy_id, ))
        vacancy = self.__cur.fetchone()
        print('vacancy from db:', vacancy)
        if vacancy:
            return vacancy
        return None