from flask import jsonify
from . import routesAPIREST
from flask import session, redirect, request, render_template

from .services import *

'''
from .services import LoginService
# Pour tester : Utiliser POSTMAN
@routesAPIREST.route('/login/<int:id>', methods=['GET'])
def get_login_controlleur(id):
    # Fonctionnel
    loginService = LoginService()
    login = loginService.getLogin(id)

    if login is None:
        return jsonify({"message": "Le login n'existe pas."})

    p = {}
    p['idMatricule'] = login.idMatricule
    p['motDePasse'] = login.motDePasse
    p['fonction'] = login.fonction

    return jsonify(p)


'''


# Pour tester : Utiliser POSTMAN
@routesAPIREST.route('/register', methods=['POST'])
def create_login_controlleur():
    # Ajouter le login dans la base de données
    # Fonctionnel
    loginService = LoginService()
    login = request.json
    PSWD = login['motDePasse']
    idMat = login['idMatricule']

    isOk = loginService.createLogin(login)

    if not isOk:
        return jsonify({"message": "Problème de création du login."})

    return  (jsonify({"message": "Le login a bien été créé."}),
            EnvoiMail(PSWD, idMat))


#Pour tester : Utiliser POSTMAN
@routesAPIREST.route('/register', methods=['GET'])
def get_password_controlleur():
    #Fonctionnel
    passwordService = PasswordService()
    password = passwordService.passwordService()
    print(password)
    if password is None:
        return jsonify({ "message": "problème de génération du mot de passe" })
    return jsonify(password)

# Pour tester : Utiliser POSTMAN
@routesAPIREST.route('/login/<int:id>', methods=['DELETE'])
def delete_login_controlleur(idMatricule):
    # Fonctionnel
    loginService = LoginService()
    isOk = loginService.deleteLogin(idMatricule)

    if not isOk:
        return jsonify({"message": "Le login n'existe pas."})

    return jsonify({"message": "Le login a bien été supprimé."})

@routesAPIREST.route('/login', methods=['GET', 'POST'])
def authentificateLogin():
    print("passage authentif")
    idMatricule = request.get_json()['idMatricule']
    motDePasse  = request.get_json()['motDePasse']
    loginService = LoginService()
    myresult = loginService.authentification(idMatricule, motDePasse)

    print(myresult)
    if not myresult:
        return jsonify({"message" : "id / mdp incorrects."})
    else:
        return jsonify({"data": myresult})


@routesAPIREST.route('/passinitialisation', methods=['GET', 'POST'])
def authentificateReinit():
        print("passage authentif")
        idMatricule = request.get_json()['idMatricule']
        motDePasse = request.get_json()['motDePasse']
        loginService = LoginService()
        myresult = loginService.authentification(idMatricule, motDePasse)

        print(myresult)
        if not myresult:
            return jsonify({"message": "id / mdp incorrects."})
        else:
            return jsonify({"data": myresult})

@routesAPIREST.route('/passinitialisation/<string:idMatricule>', methods=['PUT'])
def majMDPReinit():
        print("passage majMDPReinit")
        loginService = LoginService()
        login = request.json
        login['idMatricule'] = login.idMatricule
        login['motDePasse'] = login.motDePasse
        isOk = loginService.updateLogin(login)

        if not isOk:
            return jsonify({"message": "Le MDP n'existe pas ou n'a pas besoin d'être mis à jour."})

        return jsonify({"message": "Le MDP a bien été mis à jour."})
