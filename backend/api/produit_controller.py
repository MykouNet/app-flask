from flask import jsonify
from . import routesAPIREST
from flask import session, redirect, request, render_template

from .services import ProduitService
from werkzeug import secure_filename

import os
import uuid

# Create a directory in a known location to save files to.
uploads_dir_produits = os.path.join(os.path.dirname(__file__), '../static/uploads/produits')
os.makedirs(uploads_dir_produits, exist_ok=True)

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
@routesAPIREST.route('/ajout', methods=['POST'])
def create_catalogue_controlleur():
    #Ajouter le produit dans la base de données
    #Fonctionnel

    # Fonctionne avec un Content-Type: application/json
    # produit = request.json

    ##Code traitant la récupération en FormData les données
    nom_produit = request.form.get('nom')
    print("nom produit ", nom_produit)
    gamme_produit = request.form.get('gamme')
    puissance_produit = request.form.get('puissance')

    produit = {}
    produit['nom'] = nom_produit
    produit['gamme'] = gamme_produit
    produit['puissance'] = puissance_produit
    produit['image'] = ""

    ## Gestion de l'upload
    if 'image' in request.files:
        # récupération de l'objet contenant les informations
        # du fichier uploadé
        image_produit = request.files['image']

        # Enregistrer le fichier dans le dossier upload de l'utilisateur
        filename_final = secure_filename(image_produit.filename)
        extension_filename = ""
        if "." in filename_final:
            extension_filename = filename_final.split(".")[-1]
        # uuid.uuid4().hex --> '9fe2c4e93f654fdbb24c02b15259716c'
        filename_final = uuid.uuid4().hex + "." + extension_filename

        destination_filename = os.path.join(uploads_dir_produits, filename_final)
        image_produit.save(destination_filename)
        print("Filename upload : ", filename_final)

        produit['image'] = filename_final



    # ajout du produit dans la BD
    produitService = ProduitService()
    isOk = produitService.createProduit(produit)

    if not isOk:
        return jsonify({ "message": "Problème de création du produit." })

    return jsonify({ "message": "Le produit a bien été créé." })

