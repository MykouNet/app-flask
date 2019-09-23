import React, { Component } from 'react'
import { Button, Item, Grid } from 'semantic-ui-react'

import Cart from './Cart'

const ShopItem = (props) => {
    return (
        <Item>
            <Item.Image size='small' src={props.data.image} />
            <Item.Content verticalAlign='middle'>
                <Item.Header>{props.data.nom}</Item.Header>
                <Item.Description>Gamme: {props.data.gamme}</Item.Description>
                <Item.Extra>
                    <Button floated='right' onClick={() => props.onAddItem(props.data.idEngin)}>Ajouter</Button>
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}

export default class Shop extends Component {
    constructor(props) {
        super(props)
        this.state = {
            products: [],
            cart: []
        }
    }

    onAddItem = (idEngin) => {
        const result = this.state.cart.find(element => element.idEngin === idEngin)

        if (result) {
            const index = this.state.cart.indexOf(result)
            return this.setState(state => {
                const newCart = [...state.cart]
                newCart[index].quantity += 1
                return {
                    cart: newCart
                }
            })
        }

        this.setState(state => {
            return {
                cart: state.cart.concat({
                    idEngin: idEngin,
                    quantity: 1
                })
            }
        })
    }

    componentDidMount() {
        fetch("http://localhost:5000/api/catalogue", {method: "GET"})
            .then(result => result.json())
            .then(data => {console.log('products: ', data); this.setState({products: data})})
    }

    render() {
        console.log(this.state.cart)
        return (
            <div>

                <Grid>
                    <Grid.Column width={12}>
                        <Item.Group relaxed>
                            {this.state.products.map(product =>
                                <ShopItem
                                    data={product}
                                    key={product.idEngin}
                                    onAddItem={this.onAddItem}
                                />)}
                        </Item.Group>
                    </Grid.Column>

                    <Grid.Column width={4}>
                        <Cart items={this.state.cart} />
                    </Grid.Column>
                </Grid>

            </div>
        )
    }
}