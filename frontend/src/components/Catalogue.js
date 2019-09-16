import React, {Component} from 'react'
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
                <form noValidate onSubmit={this.onSubmit}>
                    <h1>entrez un nouvel Engin</h1>
{/*                        <div>
                            <label htmlFor="idEngin">idEngin</label>
                            <input type="text" name="idEngin" value={this.state.idEngin} onChange={this.onChange} />
                        </div>*/}
                        <div>
                            <label htmlFor="nom">nom</label>
                            <input type="text" name="nom" value={this.state.nom} onChange={this.onChange} />
                        </div>
                         <div>
                            <label htmlFor="gamme">gamme</label>
                            <input type="text" name="gamme" value={this.state.gamme} onChange={this.onChange} />
                        </div>
                        <div>
                            <label htmlFor="puissance">puissance</label>
                            <input type="text" name="puissance" value={this.state.puissance} onChange={this.onChange} />
                        </div>
                         <div>
                            <label htmlFor="image">image</label>
                            <input type="text" name="image" value={this.state.image} onChange={this.onChange} />
                        </div>
                        <button type="submit">Ajouter nouveau produit</button>
                </form>
                <ToDoCatalogue />
            </div>
        )
    }
}

export default Catalogue