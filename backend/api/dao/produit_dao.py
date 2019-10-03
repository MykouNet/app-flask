from .db_utils import getDB
from .models import Produit

class ProduitDao:

    def __init__(self):
        self.mydb = getDB()

    def getListProduits(self):
        query = 'SELECT * FROM catalogue'
        mycursor = self.mydb.cursor(dictionary=True)
        mycursor.execute(query)
        myresults = mycursor.fetchall()

        mycursor.close()

        listProduits = []
        print("Liste des résultats : ", myresults)

        for p in myresults:
            print("Produit : ", p)

            #Creation d'une instance de la classe Produit
            produit = Produit()
            produit.idEngin = p['idEngin']
            produit.nom = p['nom']
            produit.gamme = p['gamme']
            produit.puissance = p['puissance']
            produit.image = p['image']
            listProduits.append(produit)

        return listProduits


    def getProduit(self, id):
        query = 'SELECT * FROM catalogue WHERE idEngin = {0}'.format(id)
        mycursor = self.mydb.cursor(dictionary=True)
        mycursor.execute(query)
        myresult = mycursor.fetchone()
        mycursor.close()

        print("Produit : ", myresult)

        if myresult is None:
            return None

        #Creation d'une instance de la classe Produit
        produit = Produit()
        produit.idEngin = myresult['idEngin']
        produit.nom = myresult['nom']
        produit.gamme = myresult['gamme']
        produit.puissance = myresult['puissance']
        produit.image = myresult['image']

        return produit

    def createProduit(self, produit):
        query = 'INSERT INTO catalogue (`nom`, `gamme`, `puissance`, `image`) VALUES (%s, %s, %s, %s)'
        mycursor = self.mydb.cursor()
        vals = (produit['nom'], produit['gamme'], produit['puissance'], produit['image'])
        mycursor.execute(query, vals)

        self.mydb.commit()
        rows_added = mycursor.rowcount
        mycursor.close()

        print(rows_added, "record(s) added")

        return rows_added > 0

    def updateProduit(self, produit):
        print( "début updated")
        query = 'UPDATE catalogue SET nom = %s, gamme = %s, puissance = %s, image = %s WHERE idEngin = %s'
        mycursor = self.mydb.cursor()
        vals = ( produit['nom'], produit['gamme'], produit['puissance'], produit['image'], produit['idEngin'] )
        mycursor.execute(query, vals)

        self.mydb.commit()
        rows_updated = mycursor.rowcount
        mycursor.close()

        print(rows_updated, "record(s) updated")

        return rows_updated > 0

    def deleteProduit(self, id):
        query = 'DELETE FROM catalogue WHERE idEngin = {0}'.format(id)
        mycursor = self.mydb.cursor()
        mycursor.execute(query)

        self.mydb.commit()
        rows_deleted = mycursor.rowcount
        mycursor.close()

        print(rows_deleted, "record(s) deleted")

        return rows_deleted > 0