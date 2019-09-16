import React, { Component } from 'react';

//import RNHTMLtoPDF from 'react-native-html-to-pdf';

const SERVER_URL = 'http://localhost:5000'
const API_URL = SERVER_URL + '/api'

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
      "image_produit_update": ""
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

/*  ajouterProduit() {
    return fetch(API_URL + '/produits', 
    { 
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(
        {'nom': this.state.nom_produit_add, 'image': this.state.image_produit_add,
        'qty': this.state.qty_produit_add, 'prix': this.state.prix_produit_add})
    }).then(response => response.json())
    .then(data => { 
      this.setState({"message": data.message}); 
      return this.getListProduits(); 
    })
  }
*/
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

  handlePDFClick = (produit, e) => {
    e.preventDefault();
    console.log('The link PDF was clicked.', produit);
    const generateHTML = produit =>
        <div><span>${produit}</span></div>

    const html = generateHTML(this.state.produit)
    console.log('The link PDF was clicked.', produit)

    const options = {html,
        fileName: "test",
        directory: "Documents"
    };
   // const file = RNHTMLtoPDF.convert(options);

  }

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
{/*
        <h2>Ajout de produit</h2>
        <form align="center">
          Nom Produit : <input onChange={this.handleFormInputChange} type="text" name="nom_produit_add" value={this.state.nom_produit_add}  />          
          <br />
          Image Produit : <input onChange={this.handleFormInputChange} type="text" name="image_produit_add" value={this.state.image_produit_add} />
          <br />
          Quantité : <input onChange={this.handleFormInputChange} type="number" name="qty_produit_add" value={this.state.qty_produit_add} />
          <br />
          Prix : <input onChange={this.handleFormInputChange} type="number" name="prix_produit_add" value={this.state.prix_produit_add} />
          <br />
          <button onClick={this.handleAddClick}>Ajouter</button>         
        </form>
*/}
        <div style={this.state.display_update_form ? {} : { display: 'none' }}>
        <h2>Modifier le produit d'id = {this.state.idEngin_produit_update}</h2>
        <a href='' onClick={this.handleHideUpdateFormClick.bind(this)}>Fermer le formulaire de mise à jour</a>
        <br />
        <br />
        <form align="center">
          Nom Produit : <input onChange={this.handleFormInputChange} type="text" name="nom_produit_update" value={this.state.nom_produit_update}  />          
          <br />
          Gamme : <input onChange={this.handleFormInputChange} type="text" name="gamme_produit_update" value={this.state.gamme_produit_update} />
          <br />
          Puissance : <input onChange={this.handleFormInputChange} type="text" name="puissance_produit_update" value={this.state.puissance_produit_update} />
          <br />
          Image  : <input onChange={this.handleFormInputChange} type="text" name="image_produit_update" value={this.state.image_produit_update} />
          <br />
          <button onClick={this.handleUpdateClick.bind(this, this.state.idEngin_produit_update)}>Mettre à jour</button>
        </form>
        </div>
        <h2>Liste des produits</h2>
        <center>
        <table border="1">
            <thead>
            <tr>
                <td>ID Produit</td>
                <td>Nom Produit</td>
                <td>Gamme</td>
                <td>Puissance</td>
                <td>Image </td>
                <td>Modifier Produit</td>                
                <td>Supprimer Produit</td>
                <td>PDF Produit</td>
            </tr>
            </thead>
            <tbody>
                {data.map((produit, i) =>
                <tr align="center" key={produit.id}>
                  <td>{ produit.idEngin }</td>
                  <td>{ produit.nom }</td>
                  <td>{ produit.gamme }</td>
                  <td>{ produit.puissance }</td>
                  <td>{ produit.image }</td>
                  <td><a href="#" onClick={this.handleDisplayFormUpdateClick.bind(this, produit.idEngin)}>Modifier Produit</a></td>
                  <td><a href="#" onClick={this.handleDeleteClick.bind(this, produit.idEngin)}>Supprimer</a></td>
                  <td><a href="#" onClick={this.handlePDFClick.bind(this, produit)}>PDF</a></td>
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
