import React, { useState, useEffect } from 'react'
import axios from 'axios'

//import '../App.css';
import style from './userresa.module.css'
import { STATIC_URL } from '../Constantes';

function UserResa({match}) {
// dates en entrée
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
// message à afficher
    const [displayMessage, setDisplayMessage] = useState(null)
    let messageKO_disponible = 'l\'engin n\'est pas disponible à cette date'
    let messageKO_creation = 'problème backend de création de réservation'
    let messageKO_date = 'date non renseignée'
    let messageOK = 'la réservation a été effectuée'

// data du fetch
    const [itemResa, setItemresa] = useState({});
// stockage de l'identifiant de celui qui réserve
    let idmat = localStorage.getItem("idMatriculeLS");

    const fetchItem = async () => {
        const fetchItem2 = await fetch(
            `http://localhost:5000/api/catalogue/${match.params.id}`, {method: "GET"}
        )
        const itemResa = await fetchItem2.json();
        setItemresa(itemResa);
        console.log("item après fetch",itemResa )
    };

    const handleReservClick = (match, e) => {
     //   e.preventDefault();
        console.log(handleReservClick)
        verifyDisponibility();
    };

    const verifyDisponibility = () => {
        if (!(value1 && value2))
            return ({status: 'error'},
                    setDisplayMessage(messageKO_date))

        return axios
        .post('http://localhost:5000/api/fairesa', {
            idEngin : match.params.id,
            dateDebut: value1,
            dateFin: value2
        })
        .then(res => {
            const data = res.data
            console.log(res.data)
            if (data.message === 'disponible.') {
                createReservation()
            } else {
                setDisplayMessage(messageKO_disponible)
                console.log("verify, passe par la", displayMessage)

            }
            return res.data
        })
    }

    const createReservation = () => {
    console.log("createReservation")
        return axios
        .post('http://localhost:5000/api/reservation', {
            idMatricule:    idmat,
            idEngin:        match.params.id,
            dateDebut:      value1,
            dateFin:        value2
        })
        .then(res => {
            const data = res.data
            console.log(res.data)
            if (data.message === 'disponible.') {
                console.log("verify, passe par la", messageOK)
                setDisplayMessage(messageOK)
            } else {
                setDisplayMessage(messageKO_creation)
                console.log("verify, passepar la 2", messageKO_creation)
            }
            return res.data
        })
    }

    const onChange1 = event => setValue1(event.target.value);
    const onChange2 = event => setValue2(event.target.value);
    useEffect(() => { fetchItem(); }, [displayMessage] );
    console.log('re-render', displayMessage)

    return (
        <div className={style.usersa}>
                <h1>Item Reservation : {match.params.id} - {itemResa.nom}</h1>
                <h6>Gamme : {itemResa.gamme}</h6>
                <h6>Puissance : {itemResa.puissance}</h6>
                <img  src={STATIC_URL + '/uploads/produits/' + itemResa.image } alt="représentation manquante"/>
                <br />
                <label>Date de début
                    <input type="date" name="dateDebut" value={value1} onChange={onChange1} />
                </label>
                <label>Date de fin
                    <input type="date" name="dateFin" value={value2} onChange={onChange2} />
                </label>
                <p>{displayMessage}</p>
                <button onClick={handleReservClick}> Réserver </button>
        </div>
    )
}

export default UserResa;