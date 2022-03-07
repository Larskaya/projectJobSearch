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


    def _check_token(self, token):
        self.__cur.execute('select count(*) from access_tokens where token = %s', (token, ) )
        is_exist = self.__cur.fetchone()
        print('where check token:', is_exist)
        if is_exist:
            if is_exist[0]:
                return True
        else:
            return False


    def _delete_token(self, token):
        try:
            self.__cur.execute('delete from access_tokens where token = %s', (token, ))
            self.__db.commit()
        except psycopg2.Error as e:
            print('logout failed  - '+ str(e))
            return False
        return True


    def _get_user_id_by_token(self, token):
        self.__cur.execute('select user_id from access_tokens where token = %s', (token, ) )
        user_id = self.__cur.fetchone()
        if user_id:
            return user_id[0]
        else:
            return False