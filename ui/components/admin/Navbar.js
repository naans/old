import React  from 'react'
import {Link} from 'react-router-dom'

export default class Navbar extends React.Component {
    render() {
        return (
        <ul className="navbar">
            <li><Link to="/admin/home">Home</Link></li>
            <li><Link to="/admin/categories">Categories</Link></li>
            <li className="right"><Link to="/">Acceuil</Link></li>
        </ul>
        )
    }
}
