from .db_utils import getDB
from .models import Login

class LoginDao:

    def __init__(self):
        self.mydb = getDB()

    def getListLogins(self):
        query = 'SELECT * FROM utilisateurs'
        mycursor = self.mydb.cursor(dictionary=True)
        mycursor.execute(query)
        myresults = mycursor.fetchall()

        mycursor.close()

        listLogins = []
        print("Liste des résultats : ", myresults)

        for p in myresults:
            print("Login : ", p)

            # Creation d'une instance de la classe Login
            login = Login()
            login.idMatricule = p['idMatricule']
            login.motDePasse = p['motDePasse']
            login.fonction = p['fonction']
            listLogins.append(login)

        return listLogins

    def getLogin(self, id):
        query = 'SELECT * FROM utilisateurs WHERE idMatricule = {0}'.format(id)
        mycursor = self.mydb.cursor(dictionary=True)
        mycursor.execute(query)
        myresult = mycursor.fetchone()
        mycursor.close()

        print("Login : ", myresult)

        if myresult is None:
            return None

        # Creation d'une instance de la classe Login
        login = Login()
        login.idMatricule = myresult['idMatricule']
        login.motDePasse = myresult['motDePasse']
        login.fonction = myresult['fonction']

        return login

    def createLogin(self, Login):
        query = 'INSERT INTO utilisateurs (`idMatricule`, `motDePasse`, `fonction`) VALUES (%s, MD5(%s), %s)'
        mycursor = self.mydb.cursor()
        vals = (Login['idMatricule'], Login['motDePasse'], Login['fonction'])
        mycursor.execute(query, vals)

        self.mydb.commit()
        rows_added = mycursor.rowcount
        mycursor.close()

        print(rows_added, "record(s) added")

        return rows_added > 0

    def updateLogin(self, Login):
        query = 'UPDATE utilisateurs SET idMatricule = %s, motDePasse = %s, fonction = %s WHERE idMatricule = %s'
        mycursor = self.mydb.cursor()
        vals = (Login['idMatricule'], Login['motDePasse'], Login['fonction'])
        mycursor.execute(query, vals)

        self.mydb.commit()
        rows_updated = mycursor.rowcount
        mycursor.close()

        print(rows_updated, "record(s) updated")

        return rows_updated > 0

    def deleteLogin(self, id):
        query = 'DELETE FROM utilisateurs WHERE idMatricule = {0}'.format(id)
        mycursor = self.mydb.cursor()
        mycursor.execute(query)

        self.mydb.commit()
        rows_deleted = mycursor.rowcount
        mycursor.close()

        print(rows_deleted, "record(s) deleted")

        return rows_deleted > 0


    def authentificateLogin(self, id, mdp):
        query = 'SELECT * FROM utilisateurs WHERE `idMatricule` = %s  AND `motDePasse` = MD5(%s)'
        mycursor = self.mydb.cursor(dictionary=True)
        vals = (id, mdp)
        mycursor.execute(query, vals)
        myresult = mycursor.fetchone()
        mycursor.close()
  #      isOk = True

        if myresult is None:
            myresult = False
            return myresult
        return myresult