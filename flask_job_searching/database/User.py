import psycopg2


class UserDB:
    def __init__(self, db):
        self.__db = db
        self.__cur = db.cursor()

    def _add_user(self, login, hpsw, email, type_):
        try:
            self.__cur.execute( "select exists( select 1 from users where login = %s or email = %s)", (login, email) )
            result = self.__cur.fetchone()
            if result[0] == False:
                self.__cur.execute('insert into users (password, login, email, type) values (%s, %s, %s, %s)', (hpsw, login, email, type_))
                self.__db.commit()
            else:
                return False
        except psycopg2.Error as e:
            print('error adding - '+ str(e))
            return False
        return True


    def _is_user_id_by_email(self, email):
        self.__cur.execute('select id from users where email = %s', (email, ))
        user_id = self.__cur.fetchone()
        if user_id:
            if user_id[0] > 0:
                return user_id[0]
        return False


    def _auth_user(self, user_id, token):
        try:
            self.__cur.execute('insert into access_tokens (id, token) values (%s, %s)', (user_id, token))
            self.__db.commit()
        except psycopg2.Error as e:
            print('error adding - '+ str(e))
            return False
        return True


    def _get_hash_password_from_id(self, user_id):
        self.__cur.execute('select password from users where id = %s', (user_id, ))
        hash = self.__cur.fetchone()
        if hash:
            if len(hash[0]) > 0:
                return hash[0]
        return False