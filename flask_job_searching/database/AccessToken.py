import psycopg2, datetime


class AccessTokenDB:

    def __init__(self, db):
        self.__db = db
        self.__cur = db.cursor()

    def _auth_user(self, user_id, token):
        try:
            created_at = datetime.datetime.now()
            self.__cur.execute('insert into access_tokens (user_id, token, created_at) values (%s, %s, %s)', (user_id, token, created_at))
            self.__db.commit()
        except psycopg2.Error as e:
            print('login failed  - '+ str(e))
            return False
        return True

