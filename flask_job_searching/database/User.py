import psycopg2


class UserDB:
    def __init__(self, db):
        self.__db = db
        self.__cur = db.cursor()

    def _add_user(self, login, hpsw, email, type_):
        try:
            print('try add user')
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


    def _get_user_id_by_email(self, email):
        self.__cur.execute('select id from users where email = %s', (email, ))
        user_id = self.__cur.fetchone()
        if user_id[0] > 0:
            return user_id[0]
        return False

    