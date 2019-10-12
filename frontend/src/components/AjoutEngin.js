import React, {Component} from 'react'

const SERVER_URL = 'http://localhost:5000'
const API_URL = SERVER_URL + '/api'

class AjoutEngin extends Component {
    constructor() {
        super()
        this.state = {
            idEngin:'',
            nom:'',
            gamme:'',
            puissance:'',
            image: '',
            submitResult:''
        }

        this.onChange = this.onChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }
    onSubmit(e){
        e.preventDefault()

        let image_produit = "";
        let image_input_element = document.querySelector("#image")
        if (image_input_element.value !== "") {
        image_produit = image_input_element.files[0]; //Info + Contenu du fichier
        }

        let nom = this.state.nom;
        let gamme = this.state.gamme;
        let puissance =  this.state.puissance;

        let data = new FormData();
        data.append('nom', nom);
        data.append('image', image_produit);
        data.append('gamme', gamme);
        data.append('puissance', puissance);

        console.log("data : " + nom)

        if (!(nom && gamme && puissance))
            return  this.setState({
                        submitResult: 'Un problème est survenu - l\'engin n\'a pas pu être enregistré'
                    })

        return fetch(API_URL + '/ajout',
        {
        method: 'POST',
        headers: {
          'Authorization': window.sessionStorage["token"]
        },
        body: data
        }).then(response => {
        if (response.status !== 200) {
            throw new Error(response)
        }
        return  response.json(),
                this.setState({
                    idEngin:'',
                    nom:'',
                    gamme:'',
                    puissance:'',
                    image: '',
                    submitResult: 'Le nouvel engin a bien été ajouté.'
                })
            }
        );
    }

    render (){
        return(
            <div>
                <form noValidate onSubmit={this.onSubmit}>

                   <div className="login">
                    <div className="login-screen">
                    <div className="app-title"><h1>Ajoutez un nouvel engin</h1></div>
                    <div className="login-form">

                        <div className="control-group">
                            <input type="text" name="nom" value={this.state.nom} onChange={this.onChange} placeholder="nom Engin"/>
                        </div>
                         <div className="control-group">
                            <input type="text" name="gamme" value={this.state.gamme} onChange={this.onChange} placeholder="gamme"/>
                        </div>
                        <div className="control-group">
                            <input type="text" name="puissance" value={this.state.puissance} onChange={this.onChange} placeholder="puissance"/>
                        </div>
                         <div className="control-group">
                            <input id="image" type="file" name="image" onChange={this.onChange} placeholder="image"/>
                        </div>
                        <p>{this.state.submitResult}</p>
                        <input type="submit" value="Ajouter nouveau produit" className="btn btn-primary btn-large btn-block" />

                        </div>
                        </div>
                        </div>

                </form>
            </div>
        )
    }
}

export default AjoutEngin