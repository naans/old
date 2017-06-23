import React  from 'react'
import {Link} from 'react-router-dom'

export default class Navbar extends React.Component {
    render() {
        const links = this.props.location.pathname.startsWith('/admin/')
            ? [['/', 'Accueil']]
            : [['/', 'Accueil'], ['/menu', 'La Carte'], ['/contact-us', 'Contacter Nous'], ['/admin/home', 'Admin']]
        return (
        <nav className="navbar navbar-default" role="navigation">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <a className="navbar-brand" href="/"> Naans </a>
                </div>
                <div className="collapse navbar-collapse navbar-right" id="navbar-collapse">
                    <ul className="nav navbar-nav">
                        {links.map(link => <li key={link[0]}><Link to={link[0]}>{link[1]}</Link></li>)}
                    </ul>
                </div>
            </div>
        </nav>
        )
    }
}
