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
    isOk = loginService.createLogin(login)

    if not isOk:
        return jsonify({"message": "Problème de création du login."})

    return jsonify({"message": "Le login a bien été créé."})


# Pour tester : Utiliser POSTMAN
@routesAPIREST.route('/login/<int:id>', methods=['PUT'])
def update_login_controlleur(idMatricule):
    # Mettre à jour le login dans la base de données
    # Fonctionnel
    loginService = LoginService()
    login = request.json
    login['idMatricule'] = idMatricule
    isOk = loginService.updateLogin(login)

    if not isOk:
        return jsonify({"message": "Le login n'existe pas ou n'a pas besoin d'être à jour."})

    return jsonify({"message": "Le login a bien été mis à jour."})


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
    isOk = loginService.authentification(idMatricule, motDePasse)

    print(isOk)
    if not isOk:
        return jsonify({"message" : "id / mdp incorrects."})
    else:
        return jsonify({"message": "bien loggué."})

