from .db_utils import getDB
from .models import Reservation


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
        print("Liste des résultats : ", myresults)

        for p in myresults:
            print("reservation : ", p)

            # Creation d'une instance de la classe Produit
            reservation = Reservation()
            reservation.idReservation = p['idReservation']
            reservation.idMatricule = p['idMatricule']
            reservation.idEngin = p['idEngin']
            reservation.dateDebut = p['dateDebut']
            reservation.dateFin = p['dateFin']
            reservation.dateReservation = p['dateReservation']
            reservation.image=p['image']

            listReservations.append(reservation)

        return listReservations