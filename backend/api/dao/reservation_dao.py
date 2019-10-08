from .db_utils import getDB
from .models import Reservation
import datetime


class ReservationDao:

    def __init__(self):
        self.mydb = getDB()

    def getListReservation(self):
        query = 'SELECT R.idReservation, R.idMatricule, R.idEngin, R.dateDebut, R.dateFin, R.dateReservation, C.image FROM reservation R, catalogue C WHERE R.idEngin = C.idEngin'
        mycursor = self.mydb.cursor(dictionary=True)
        mycursor.execute(query)
        myresults = mycursor.fetchall()

        mycursor.close()

        listReservations = []
#       print("Liste des résultats : ", myresults)

        for p in myresults:
#            print("reservation : ", p)

            # Creation d'une instance de la classe Produit
            reservation = Reservation()
            reservation.idReservation = p['idReservation']
            reservation.idMatricule = p['idMatricule']
            reservation.idEngin = p['idEngin']
            reservation.dateDebut = p['dateDebut']
            reservation.dateFin = p['dateFin']
            reservation.dateReservation = p['dateReservation']
            reservation.image = p['image']

            listReservations.append(reservation)

        return listReservations

    def verifyReservation(self, idEngin, dateDebut, dateFin):
        query = 'SELECT * FROM reservation WHERE idEngin = {0} AND ((dateDebut >= "{1}"  AND dateDebut <= "{2}") OR (dateFin >= "{1}" AND dateFin <= "{2}") OR (dateDebut <= "{1}" AND dateFin >= "{2}"));'.format(idEngin, dateDebut, dateFin)
        mycursor = self.mydb.cursor(dictionary=True)
        mycursor.execute(query)
        myresult = mycursor.fetchall()
        rows_verify = mycursor.rowcount
        mycursor.close()

        isOk = True

        if rows_verify > 0:
            isOk = False
            return isOk
        return isOk

    def createReservation(self, idMatricule, idEngin, dateDebut, dateFin):
        dateR = datetime.date.today()
#        print(dateR)
        query = 'INSERT INTO reservation (`idMatricule`, `idEngin`, `dateDebut`, `dateFin`, `dateReservation`) VALUES (%s, %s, %s, %s, %s)'
        vals = (idMatricule, idEngin, dateDebut, dateFin, dateR)
        mycursor = self.mydb.cursor()
        mycursor.execute(query, vals)

        self.mydb.commit()
        rows_added = mycursor.rowcount
        mycursor.close()

#        print(rows_added, "record(s) added")

        return rows_added > 0