import React  from 'react'
import {
  BrowserRouter as Router,
  Route, Redirect, Link
} from 'react-router-dom'

import Navbar from './parts/Navbar'

import Home from './pages/Home'
import Menu from './pages/Menu'
import ContactUs from './pages/ContactUs'

import AdminHome from './pages/AdminHome'
import AdminCategories from './pages/AdminCategories'
import AdminMeals from './pages/AdminMeals'
import AdminPictures from './pages/AdminPictures'

const menu = {
    site: [
        ['/contact-us', 'Contacter Nous'],
        ['/admin/home', 'Admin']
    ],
    admin: [
        ['/', 'Accueil'],
        ['/admin/pictures/all', 'Photos'],
        ['/admin/categories/all', 'Categories'],
        ['/admin/meals/all', 'Repas']
    ]
}

export default class App extends React.Component {
    render() {
        return (
        <Router>
            <div>
            <Route path="/" component={props => <Navbar {...props} links={menu} />} />
            <Route exact path="/" component={Menu} />
            <Route path="/contact-us" component={ContactUs} />

            <Route path="/admin/home" component={AdminHome} />
            <Route path="/admin/pictures" component={AdminPictures} />
            <Route path="/admin/categories" component={AdminCategories} />
            <Route path="/admin/meals" component={AdminMeals} />
            </div>
         </Router>
        )
    }
}
