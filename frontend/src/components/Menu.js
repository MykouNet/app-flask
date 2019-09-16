import React, {Component} from 'react'
import { BrowserRouter as Router, NavLink, Link } from 'react-router-dom'


    const NavBar = () => (
      <nav>
        <NavLink to="/menu"></NavLink>
        <NavLink to="/register">Utilisateurs</NavLink>
        <NavLink to="/catalogue">Catalogue</NavLink>
        <NavLink to="/contrats">Contrats</NavLink>
      </nav>
    )

class Menu extends React.Component {

    render() {

        return (
            <Router>
                <NavBar />
            </Router>
          )
    }
}

export default Menu