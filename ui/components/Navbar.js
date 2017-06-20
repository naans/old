import React  from 'react'
import {Link} from 'react-router-dom'

export default class Navbar extends React.Component {
    render() {
        return (
        <ul className="navbar">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/menu">La Carte</Link></li>
            <li><Link to="/contact-us">Contacter Nous</Link></li>
            <li className="right"><Link to="/admin/home">Se connecter</Link></li>
        </ul>
        )
    }
}
