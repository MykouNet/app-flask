from ..dao import LoginDao

class LoginService:

    def __init__(self):
        self.dao = LoginDao()

    def getListLogins(self):
        return self.dao.getListLogins()

    def getLogin(self, id):
        return self.dao.getLogin(id)

    def createLogin(self, login):
        return self.dao.createLogin(login)

    def updateLogin(self, login):
        return self.dao.updateLogin(login)

    def deleteLogin(self, idMatricule):
        return self.dao.deleteLogin(idMatricule)

    def authentification(self, id, mdp):
        return self.dao.authentificateLogin(id, mdp)
