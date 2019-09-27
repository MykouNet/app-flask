import React, { useState, useEffect } from 'react'
import axios from 'axios'

import '../App.css';
import { STATIC_URL } from '../Constantes';
//import Test from './test_input_FC';

function UserResa({match}) {
    useEffect(() => {
        fetchItem();
    });

    const [itemResa, setItem] = useState({});
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    let idmat = localStorage.getItem("idMatriculeLS");

    const fetchItem = async () => {
        const fetchItem = await fetch(
            `http://localhost:5000/api/catalogue/${match.params.id}`, {method: "GET"}
        )
        const itemResa = await fetchItem.json();
        setItem(itemResa);
        console.log("item après fetch",itemResa )
    };

    const handleReservClick = (match, e) => {
     //   e.preventDefault();
        console.log(handleReservClick)
        verifyDisponibility();
    };

    const verifyDisponibility = () => {
        console.log("verifyDisponibility", value1 )
        return axios
        .post('http://localhost:5000/api/fairesa', {
            idEngin : match.params.id,
            dateDebut: value1,
            dateFin: value2
        })
        .then(res => {
            const data = res.data
            console.log(res.data)
            if (data.message === 'disponible.') { createReservation() }
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
            if (data.message === 'reservation created.') {  }
            return res.data
        })
    }

    const onChange1 = event => setValue1(event.target.value);
    const onChange2 = event => setValue2(event.target.value);

    return (
        <div>
                <h1>Item Reservation {match.params.id} {itemResa.nom}</h1>
                <h1> Gamme : {itemResa.gamme}</h1>
                <h1>Puissance : {itemResa.puissance}</h1>
                <img  src={STATIC_URL + '/uploads/produits/' + itemResa.image } alt="représentation manquante"/>
                <br />
                <span>"Date de début"</span>
                <br />
                <input type="date" name="dateDebut" value={value1} onChange={onChange1} />
                <br />
                <span>"Date de fin"</span>
                <br />
                <input type="date" name="dateFin" value={value2} onChange={onChange2} />
                <br />
                <br />
                <button onClick={handleReservClick}> Réserver </button>
        </div>
    )
}

export default UserResa;