from flask import jsonify
from . import routesAPIREST
from .services import ReservationService
from flask import request

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

@routesAPIREST.route('/fairesa', methods=['POST'])
def verifyDisponibility():
    print("passage verifyDisponibility")
    idEngin  = request.get_json()['idEngin']
    dateDebut  = request.get_json()['dateDebut']
    dateFin  = request.get_json()['dateFin']

    reservationService = ReservationService()

    isOk = reservationService.verifyReservation(idEngin, dateDebut, dateFin)

    print(isOk)
    if not isOk:
        return jsonify({"message" : "non disponible"})
    else:
        return jsonify({"message": "disponible."})


@routesAPIREST.route('/reservation', methods=['POST'])
def createReservation():
    print("passage createReservation")
    idMatricule     = request.get_json()['idMatricule']
    idEngin         = int(request.get_json()['idEngin'])
    dateDebut       = request.get_json()['dateDebut']
    dateFin         = request.get_json()['dateFin']

    reservationService = ReservationService()

    isOk = reservationService.createReservation(idMatricule, idEngin, dateDebut, dateFin)

    print(isOk)
    if not isOk:
        return jsonify({"message" : "non disponible"})
    else:
        return jsonify({"message": "disponible."})