from ..dao import ReservationDao


class ReservationService:

    def __init__(self):
        self.dao = ReservationDao()

    def getListReservations(self):

        return self.dao.getListReservation()
    
    def verifyReservation(self, idEngin, dateDebut, dateFin):

        return self.dao.verifyReservation(idEngin, dateDebut, dateFin)

    def createReservation(self, idMatricule, idEngin, dateDebut, dateFin):

        return self.dao.createReservation(idMatricule, idEngin, dateDebut, dateFin)
