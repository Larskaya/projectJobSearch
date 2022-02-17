import psycopg2


class VacancyDB:
    def __init__(self, db):
        self.__db = db
        self.__cur = db.cursor()

    def _get_vacancies(self):
        print('where select')
        self.__cur.execute('select * from vacancies')
        vacancies = self.__cur.fetchall()
        return vacancies