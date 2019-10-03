import React, { useState, useEffect } from 'react'

import '../App.css';
import { STATIC_URL } from '../Constantes';

function UserResa({match}) {
    const dateDebut = '';
    const dateFin = '';

    useEffect(() => {
        fetchItem ()
    }, []);

    const [itemResa, setItem] = useState({});

    const fetchItem = async () => {
        const fetchItem = await fetch(
            `http://localhost:5000/api/catalogue/${match.params.id}`, {method: "GET"}
        )
        const itemResa = await fetchItem.json();
        setItem(itemResa);
        console.log("item après fetch",itemResa )
    };

    return (
        <div>
        <form>
            <h1>Item Reservation {match.params.id} {itemResa.nom}</h1>
            <h1> Gamme : {itemResa.gamme}</h1>
            <h1>Puissance : {itemResa.puissance}</h1>
            <img  src={STATIC_URL + '/uploads/produits/' + itemResa.image} />
            <br />
            <span>"Date de début"</span>
            <br />
            <input type="date" name="dateDebut" value={dateDebut} />
            <br />
            <span>"Date de fin"</span>
            <br />
            <input type="date" name="dateFin" value={dateFin}/>
            <br />
            <br />
            <button onClick={this.fetchItem.bind(this)} >Réserver</button>
        </frorm>
        </div>
    )
}

export default UserResa;