import React, {Component} from 'react'
import { Link, withRouter } from 'react-router-dom'
/*import jsonwebtoken_decode from 'jsonwebtoken'*/

class Navbar extends Component {
/*
userLink donne la possibilité de se dé-logguer
*/
    logOut(e) {
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/')
    }
/*
renvoie de 2 possibilités d'embranchements, les objets apparaissant sur la page localhost/ sont définis ci-dessous
*/
    render() {

        const loginRegLink = (
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className='nav-link' to="/login">Login</Link>
                </li>
            </ul>
        )
        const userLink = (
            <ul className="navbar-nav" >
                <li className="nav-item">
                    <Link className='nav-link' to="/ajout">Ajout Engin</Link>
                </li>
                <li className="nav-item">
                    <Link className='nav-link' to="/register">Ajout Utilisateur</Link>
                </li>
                <li className="nav-item">
                    <Link className='nav-link' to="/catalogue">Catalogue</Link>
                </li>
                <li className="nav-item">
                    <Link className='nav-link' to="/reservation">Réservations PDF</Link>
                </li>
                <li className="nav-item">
                    <Link className='nav-link' to="/fairesa">User Réservation</Link>
                </li>
                <li className="nav-item">
                    <a href="#" onClick={this.logOut.bind(this)} className='nav-link' >Logout</a>
                </li>
            </ul>
        )
/*
bouton et un lien pour revenir à la HOME
embranchement si loggué, on va vers profile, si pas loggué on va vers Login/Register
*/
        return (
            <nav>
                <button type="button" data-toggle="collapse"></button>
                <Link to='/'>Home</Link>
                {localStorage.usertoken ? userLink : loginRegLink}
            </nav>
        )
    }
}
export default withRouter(Navbar)