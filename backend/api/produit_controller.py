from flask import jsonify
from . import routesAPIREST
from flask import session, redirect, request, render_template

from .services import ProduitService
    
#Pour tester : Utiliser POSTMAN
@routesAPIREST.route('/catalogue', methods=['GET'])
def list_produits_controlleur(): 
    #Fonctionnel
    produitService = ProduitService()
    listProduits = produitService.getListProduits()

    listProduitsJSON = []

    for produit in listProduits:
        p = {}
        p['idEngin'] = produit.idEngin
        p['nom'] = produit.nom
        p['gamme'] = produit.gamme
        p['puissance'] = produit.puissance
        p['image'] = produit.image
        listProduitsJSON.append(p)

    return jsonify(listProduitsJSON)

#Pour tester : Utiliser POSTMAN
@routesAPIREST.route('/catalogue/<int:id>', methods=['GET'])
def get_produit_controlleur(id): 
    #Fonctionnel
    produitService = ProduitService()
    produit = produitService.getProduit(id)

    if produit is None:
        return jsonify({ "message": "Le produit n'existe pas." })

    p = {}
    p['id'] = produit.id
    p['nom'] = produit.nom
    p['image'] = produit.image
    p['qty'] = produit.qty
    p['prix'] = produit.prix

    return jsonify(p)


#Pour tester : Utiliser POSTMAN
@routesAPIREST.route('/catalogue/<int:id>', methods=['PUT'])
def update_produit_controlleur(id): 
    #Mettre à jour le produit dans la base de données
    #Fonctionnel
    print(id)
    produitService = ProduitService()
    produit = request.json
    print ("json :", produit )
    produit['idEngin'] = id
    isOk = produitService.updateProduit(produit)
    print (isOk)
    if not isOk:
        return jsonify({ "message": "Le produit n'existe pas ou n'a pas besoin d'être à jour." })

    return jsonify({ "message": "Le produit a bien été mis à jour." })


#Pour tester : Utiliser POSTMAN
@routesAPIREST.route('/catalogue/<int:id>', methods=['DELETE'])
def delete_produit_controlleur(id): 
    #Fonctionnel
    produitService = ProduitService()
    isOk = produitService.deleteProduit(id)

    if not isOk:
        return jsonify({ "message": "Le produit n'existe pas." })

    return jsonify({ "message": "Le produit a bien été supprimé." })


#Pour tester : Utiliser POSTMAN
@routesAPIREST.route('/catalogue', methods=['POST'])
def create_catalogue_controlleur():
    #Ajouter le produit dans la base de données
    #Fonctionnel
    produitService = ProduitService()
    produit = request.json
    isOk = produitService.createProduit(produit)

    if not isOk:
        return jsonify({ "message": "Problème de création du produit." })

    return jsonify({ "message": "Le produit a bien été créé." })

