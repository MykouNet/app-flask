import React, { Component } from 'react'
import { Button, Item, Grid } from 'semantic-ui-react'

import ReservationPDF from './ReservationPDF'
import { STATIC_URL } from '../Constantes';
import style from './reservation.module.css'

const ShopItem = (props) => {
// console.log(props)
    return (
        <Item>
            <Item.Image size='small' alt={props.data.image}  src={STATIC_URL + '/uploads/produits/' + props.data.image}  />

            <Item.Content verticalAlign='middle'>
                <Item.Header>ID Reservation : {props.data.idReservation}</Item.Header>
                <Item.Description className={style.itemDesc}>ID Engin: {props.data.idEngin}</Item.Description>
                <Item.Description className={style.itemDesc}>ID Matricule: {props.data.idMatricule}</Item.Description>
                <Item.Description className={style.itemDesc}>Date de réservation: {new Intl.DateTimeFormat('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(props.data.dateReservation))}</Item.Description>
                <Item.Description className={style.itemDesc}>Date de début: {new Intl.DateTimeFormat('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(props.data.dateDebut))}</Item.Description>
                <Item.Description className={style.itemDesc}>Date de fin: {new Intl.DateTimeFormat('fr-FR', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(props.data.dateFin))}</Item.Description>
                <Item.Extra>
                    <Button floated='right'><ReservationPDF data={props.data} /></Button>
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}

export default class Reservation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            resas: [],
        }
    }

    componentDidMount() {
        fetch("http://localhost:5000/api/reservation", {method: "GET"})
            .then(result => result.json())
   //         .then(data => {console.log('resas: ', data); this.setState({resas: data, loading: false})})
            .then(data => {this.setState({resas: data, loading: false})})
    }

    render() {
    let items = null
    if (!this.state.loading) {
        items = this.state.resas.map(resa =>
            <ShopItem
                data={resa}
                key={resa.idReservation}
            />)
    }
 //   console.log(this.state.resas.length > 0)
        return (
            <div>
                <Grid centered>
                    <Grid.Column width={12}>
                        <Item.Group relaxed>
                            {items}
                        </Item.Group>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}