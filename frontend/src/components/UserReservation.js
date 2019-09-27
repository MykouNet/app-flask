import React, { Component } from 'react'
import { Button, Item, Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { STATIC_URL } from '../Constantes';

const ShopItem = (props) => {
//onsole.log(props)
    return (
        <Item>
            <Item.Image size='small' alt={props.data.image} src={STATIC_URL + '/uploads/produits/' + props.data.image} />

            <Item.Content verticalAlign='middle'>
                <Item.Header>ID Engin: {props.data.idEngin}</Item.Header>
                <Item.Description>Gamme: {props.data.gamme}</Item.Description>
                <Item.Description>Puissance: {props.data.puissance}</Item.Description>
                <Item.Extra>
                <Link to={`/fairesa/${props.data.idEngin}`}>
                    <Button floated='right'  >Sélectionner</Button>
                    </Link>
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}

export default class UserReservation extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true,
            products: [],
        }
    }

    componentDidMount() {
        fetch("http://localhost:5000/api/catalogue", {method: "GET"})
            .then(result => result.json())
 //           .then(data => {console.log('products: ', data); this.setState({products: data, loading: false})})
            .then(data => {this.setState({products: data, loading: false})})
    }

    render() {
    let items = null
    if (!this.state.loading) {
        items = this.state.products.map(product =>
            <ShopItem
                data={product}
                key={product.idEngin}
            />)

    }
//    console.log(this.state.products.length > 0)
        return (
            <div>
                <Grid>
                    <Grid.Column width={16}>
                        <Item.Group relaxed>
                            {items}
                        </Item.Group>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}