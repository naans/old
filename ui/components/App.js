import React  from 'react'
import {
  BrowserRouter as Router,
  Route, Redirect, Link
} from 'react-router-dom'

import AdminNavbar from './parts/AdminNavbar'

import Home from './pages/Home'
import Menu from './pages/Menu'
import ContactUs from './pages/ContactUs'

import AdminLogin from './pages/AdminLogin'
import AdminCategories from './pages/AdminCategories'
import AdminMeals from './pages/AdminMeals'
import AdminPictures from './pages/AdminPictures'

import withAuth from './meta/withAuth'

export default class App extends React.Component {
    render() {
        return (
        <Router>
            <div>
            <Route exact path="/" component={Menu} />
            <Route path="/contact-us" component={ContactUs} />

            <Route path="/admin" component={AdminNavbar} />
            <Route exact path="/admin" component={AdminLogin} />
            <Route path="/admin/pictures" component={withAuth(AdminPictures)} />
            <Route path="/admin/categories" component={withAuth(AdminCategories)}/>
            <Route path="/admin/meals" component={withAuth(AdminMeals)} />
            </div>
         </Router>
        )
    }
}
