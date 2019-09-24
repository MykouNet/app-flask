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

// axios
        catalogue(newProduit).then(res => {
                console.log("retour")
                this.props.history.push('/catalogue')
        })
    }

    render (){
        return(
            <div>
                <form noValidate onSubmit={this.onSubmit}>

                   <div className="login">
                    <div class="login-screen">
                    <div class="app-title"><h1>entrez un nouvel Engin</h1></div>
                    <div class="login-form">

                        <div class="control-group">
                            <label htmlFor="nom">nom</label>
                            <input type="text" name="nom" value={this.state.nom} onChange={this.onChange} />
                        </div>
                         <div class="control-group">
                            <label htmlFor="gamme">gamme</label>
                            <input type="text" name="gamme" value={this.state.gamme} onChange={this.onChange} />
                        </div>
                        <div class="control-group">
                            <label htmlFor="puissance">puissance</label>
                            <input type="text" name="puissance" value={this.state.puissance} onChange={this.onChange} />
                        </div>
                         <div class="control-group">
                            <label htmlFor="image">image</label>
                            <input id="image_produit_add" type="file" name="image_produit_add" onChange={this.onChange} />
                        </div>
                        <input type="submit" value="Ajouter nouveau produit" class="btn btn-primary btn-large btn-block" />

                        </div>
                        </div>
                        </div>

                </form>
                <ToDoCatalogue />
            </div>
        )
    }
}

export default Catalogue