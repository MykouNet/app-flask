import React, { Component } from 'react';
import style from './todocatalogue.module.css'

const SERVER_URL = 'http://localhost:5000'
const API_URL = SERVER_URL + '/api'
export const STATIC_URL = SERVER_URL + '/static'



class ToDoCatalogue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "data": [],
      "message": "",

      "display_update_form": false,
      "idEngin_produit_update": 0,
      "nom_produit_update": "",
      "gamme_produit_update": "",
      "puissance_produit_update": "",
      "image_produit_update": "",
      "valueHref": ""
    };
    //avec un seul hangleFormChange : OK
    this.handleFormInputChange = this.handleFormInputChange.bind(this);
  }

  componentDidMount() {
    this.getListProduits();
  }

  getListProduits() {
    return fetch(API_URL + '/catalogue', { method: 'GET' })
    .then(response => response.json())
    .then(data => this.setState({"data": data}))
  }

  supprimerProduit(id) {
    return fetch(API_URL + '/catalogue/' + id, { method: 'DELETE' })
    .then(response => response.json())
    .then(data => {
      this.setState({"message": data.message});
      this.getListProduits();
    })
  }

  modifierProduit(id) {
    return fetch(API_URL + '/catalogue/' + id,
    {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        {'nom': this.state.nom_produit_update, 'gamme': this.state.gamme_produit_update,
        'puissance': this.state.puissance_produit_update, 'image': this.state.image_produit_update})
    }).then(response => response.json())
    .then(data => {
      this.setState({"message": data.message});
      this.getListProduits().then(() => {
        this.setState({
          "display_update_form": false,
          "idEngin_produit_update": 0,
          "nom_produit_update": "",
          "gamme_produit_update": "",
          "puissance_produit_update": "",
          "image_produit_update": ""
        });
      });
    })
  }
  handleDeleteClick = (id, e) => {
    e.preventDefault();
    console.log('The link delete was clicked.');
    this.supprimerProduit(id);

    //Cacher le formulaire d'update si on a supprimé le produit sélectionné
    if(id === this.state.id_produit_update) {
      this.setState({
        "display_update_form": false,
        "idEngin_produit_update": 0,
        "nom_produit_update": "",
        "gamme_produit_update": "",
        "puissance_produit_update": "",
        "image_produit_update": ""
      });
    }
  };

  handleUpdateClick = (id, e) => {
    e.preventDefault();
    console.log('The link update was clicked.');
    this.modifierProduit(id);
  };
/*
  handleAddClick = (e) => {
    e.preventDefault();
    this.ajouterProduit();
  };
*/
  handleDisplayFormUpdateClick = (id, e) => {
    e.preventDefault();
    for(let index_produit in this.state.data) {
      let produit = this.state.data[index_produit];
      console.log(produit)
      if(produit['idEngin'] === id) {
        this.setState({
          display_update_form: true,
          idEngin_produit_update : id,
          nom_produit_update : produit['nom'],
          gamme_produit_update : produit['gamme'],
          puissance_produit_update : produit['puissance'],
          image_produit_update : produit['image']
        });
        break;
      }
    }
  };

  handleHideUpdateFormClick = (e) => {
    e.preventDefault();
    this.setState({
      "display_update_form": false,
      "id_produit_update": 0,
      "nom_produit_update": "",
      "gamme_produit_update": "",
      "puissance_produit_update": "",
      "image_produit_update": ""
    });
  };

  //handleFormInput générique :)
  handleFormInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const {data, message} = this.state;
    return (
      <div className="App">

        <h2>{message}</h2>

        <div style={this.state.display_update_form ? {} : { display: 'none' }}>
            <h2>Modifier le produit d'id = {this.state.idEngin_produit_update}</h2>
            <a href='valueHref' onClick={this.handleHideUpdateFormClick.bind(this)}>Fermer le formulaire de mise à jour</a>
            <br />
            <br />
            <form align="center">
                <div className="login">
                    <div className="login-screen">
                        <div className="app-title"><h1>Formulaire de modification</h1></div>
                        <div className="login-form">
                            Nom Produit : <input className="control-group" onChange={this.handleFormInputChange} type="text" name="nom_produit_update" value={this.state.nom_produit_update}  />
                            <br />
                            Gamme : <input className="control-group" onChange={this.handleFormInputChange} type="text" name="gamme_produit_update" value={this.state.gamme_produit_update} />
                            <br />
                            Puissance : <input className="control-group" onChange={this.handleFormInputChange} type="text" name="puissance_produit_update" value={this.state.puissance_produit_update} />
                            <br />
                            Image  : <input className="control-group" onChange={this.handleFormInputChange} type="text" name="image_produit_update" value={this.state.image_produit_update} />
                            <br />
                            <button onClick={this.handleUpdateClick.bind(this, this.state.idEngin_produit_update)} className="btn btn-primary btn-large btn-block" >Mettre à jour</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>

        <h2 className={style.titreH2}>Liste des produits</h2>
            <center>
                <table border="1">
                    {/* en-tête tableau */}
                    <thead>
                        <tr>
                            <td>ID Produit</td>
                            <td>Nom Produit</td>
                            <td>Gamme</td>
                            <td>Puissance</td>
                            <td>Image </td>
                            <td>Modifier Produit</td>
                            <td>Supprimer Produit</td>
                        </tr>
                    </thead>
                    {/* corps du tableau */}
                    <tbody>
                    {data.map((produit, i) =>
                    <tr align="center" key={produit.idEngin}>
                        <td>{ produit.idEngin }</td>
                        <td>{ produit.nom }</td>
                        <td>{ produit.gamme }</td>
                        <td>{ produit.puissance }</td>
                        <td>{produit.image !== "" ?
                        <img width="50px" height="50px" alt={produit.image} src={STATIC_URL + '/uploads/produits/' + produit.image} />
                        : "Pas d'image"}
                        </td>
                        <td><a href="valueHref" onClick={this.handleDisplayFormUpdateClick.bind(this, produit.idEngin)}>Modifier Produit</a></td>
                        <td><a href="valueHref" onClick={this.handleDeleteClick.bind(this, produit.idEngin)}>Supprimer</a></td>
                    </tr>)
                    }
                    </tbody>
                </table>
            </center>
        </div>
    );
  }
}

export default ToDoCatalogue;
