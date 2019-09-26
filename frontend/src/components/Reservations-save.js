import React, { Component } from 'react'
import { Button, Item, Grid } from 'semantic-ui-react'

import ReservationPDF from './ReservationPDF'
import { STATIC_URL } from '../Constantes';

const ShopItem = (props) => {
console.log(props)
    return (
        <Item>
            <Item.Image size='small' alt={props.data.image} src={STATIC_URL + '/uploads/produits/' + props.data.image} />

            <Item.Content>
                <Item.Header>ID Reservation : {props.data.idReservation}</Item.Header>
                <Item.Description>ID Engin: {props.data.idEngin}</Item.Description>
                <Item.Description>ID Matricule: {props.data.idMatricule}</Item.Description>
                <Item.Description>Date de réservation: {props.data.dateDebut}</Item.Description>
                <Item.Description>Date de début: {props.data.dateFin}</Item.Description>
                <Item.Description>Date de fin: {props.data.dateReservation}</Item.Description>
                <Item.Extra>
                    <Button floated='center'><ReservationPDF data={props.data} /></Button>
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
            products: [],
        }
    }

    componentDidMount() {
        fetch("http://localhost:5000/api/reservation", {method: "GET"})
            .then(result => result.json())
            .then(data => {console.log('products: ', data); this.setState({products: data, loading: false})})
    }

    render() {
    let items = null
    if (!this.state.loading) {
        items = this.state.products.map(product =>
            <ShopItem
                data={product}
                key={product.idReservation}
            />)


    }
    console.log(this.state.products.length > 0)
        return (
            <div>
                <Grid>
                    <Grid.Column width={8}>
                        <Item.Group relaxed>
                            {items}
                        </Item.Group>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}