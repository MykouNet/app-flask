from ..dao import ReservationDao

class ReservationService:

    def __init__(self):
        self.dao = ReservationDao()

    def getListReservations(self):
        return self.dao.getListReservation()