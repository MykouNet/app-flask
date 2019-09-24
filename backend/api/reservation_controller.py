from flask import jsonify
from . import routesAPIREST
from .services import ReservationService

#Pour tester : Utiliser POSTMAN
@routesAPIREST.route('/reservation', methods=['GET'])
def list_reservations_controlleur():
    #Fonctionnel
    reservationService = ReservationService()
    listReservations = reservationService.getListReservations()

    listReservationsJSON = []

    for reservation in listReservations:
        r = {}
        r['idReservation'] = reservation.idReservation
        r['idMatricule'] = reservation.idMatricule
        r['idEngin'] = reservation.idEngin
        r['dateDebut'] = reservation.dateDebut
        r['dateFin'] = reservation.dateFin
        r['dateReservation'] = reservation.dateReservation
        r['image'] = reservation.image

        listReservationsJSON.append(r)

    return jsonify(listReservationsJSON)