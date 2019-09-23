import React, {Component} from 'react'
import { Button, Item, Grid } from 'semantic-ui-react'

import Shop from './Shop'
import { catalogue } from './UserFunctions'
import ToDoCatalogue from './ToDoCatalogue'


class Catalogue extends Component {
    constructor() {
        super()
        this.state = {
            idEngin:'',
            nom:'',
            gamme:'',
            puissance:'',
            image: ''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e){
        e.preventDefault()

        const newProduit = {
            idEngin:    this.state.idEngin,
            nom:        this.state.nom,
            gamme:      this.state.gamme,
            puissance:  this.state.puissance,
            image:      this.state.image
        }

        catalogue(newProduit).then(res => {
                console.log("retour")
                this.props.history.push('/catalogue')
        })
    }

    render (){
        return(
            <div>
                <Shop />
            </div>
        )
    }
}

export default Catalogue