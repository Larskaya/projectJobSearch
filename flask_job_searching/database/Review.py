import psycopg2
from datetime import datetime

class ReviewDB:
    def __init__(self, db):
        self.__db = db
        self.__cur = db.cursor()

    def _add_review(self, text, vacancy_id, user_id):
        try:
            # now.year, now.month, now.day, now.hour, now.minute if now = datetime.now()
            self.__cur.execute('''
                insert into reviews (
                    description, 
                    vacancy_id, 
                    user_id, 
                    created_at
                ) values (%s, %s, %s, %s)''', (text, vacancy_id, user_id, datetime.now()))
            self.__db.commit()

        except psycopg2.Error as e:
            print('error adding - '+ str(e))
            return False
        return True

    def _get_reviews_for_vacancy(self, vacancy_id):
        self.__cur.execute('select * from reviews where vacancy_id=%s', (vacancy_id, ))
        reviews = self.__cur.fetchall()
        if reviews:
            return reviews[0]
        return False