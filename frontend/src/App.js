import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Navbar from './components/Navbar'
import Landing from './components/Landing'
import Login from './components/Login'
import Register from './components/Register'
import Catalogue from './components/Catalogue'
import AjoutEngin from './components/AjoutEngin'
import Reservations from './components/Reservations'
import UserReservation from './components/UserReservation'
import UserResa from './components/UserResa'
import PassReinitialisation from './components/PassReinitialisation'


/*
appel de Navbar => routage selon qu'on soit loggué (possibilité de se dé-logguer) ou pas (possibilité de se logguer ou s'enregistrer)
de la page d'atterrissage => message de bienvenue
et des composants potentiels accessibles à partir de la page Home => Login, Register, Profile
*/
class App extends Component {
    render() {
      return (
        <Router>

            <div className="App">
                <Navbar />
                <Route exact path="/" component={Landing} />
                <Route exact path="/passinitialisation" component={PassReinitialisation} />
    {/*            <Route exact path="/reinitMDP/:id" component={Reinit} />         */}
                <div className="Container">
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/catalogue" component={Catalogue} />
                    <Route exact path="/ajoutproduit" component={AjoutEngin} />
                    <Route exact path="/ajout" component={AjoutEngin} />
                    <Route exact path="/reservation" component={Reservations} />
                    <Route exact path="/fairesa" component={UserReservation} />
                    <Route       path="/fairesa/:id" component={UserResa} />
                </div>
            </div>
        </Router>
      );
    }
}

export default App;
