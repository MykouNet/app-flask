import React from 'react'
import { Card, Icon, Sticky } from 'semantic-ui-react'


const Cart = ({items}) => {

    return (
        <Sticky>
            <Card>
                <Card.Content header='Panier' />
                <Card.Content description={"Description du produit"} />
                {items.map(item => {
                    const title = fetch(`http://localhost:4000/products/${item.id}`)
                        .then(result => result.json())
                        .then(data => {
                            console.log(data)
                            return data.title
                        })
                        console.log(title)
                    return (<p>{item.id} - Quantité: {item.quantity}</p>)
                })}
                <Card.Content extra>
                    <Icon name='plus square outline' />Ajouter
                </Card.Content>
            </Card>
        </Sticky>
    )
}


export default Cart