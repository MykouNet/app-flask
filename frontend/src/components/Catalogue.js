import React, {Component} from 'react'
import ToDoCatalogue from './ToDoCatalogue'

const SERVER_URL = 'http://localhost:5000'
const API_URL = SERVER_URL + '/api'

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

        return fetch(API_URL + '/catalogue',
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
        return response.json();
      });
    }

    render (){
        return(
            <div>
               <ToDoCatalogue />
            </div>
        )
    }
}

export default Catalogue