import React  from 'react'
import {
  BrowserRouter as Router,
  Route, Redirect, Link
} from 'react-router-dom'

import Navbar from './Navbar'
import Home from './Home'
import Menu from './Menu'
import ContactUs from './ContactUs'

import AdminNavbar from './admin/Navbar'
import AdminHome from './admin/Home'
// import AdminLogin from './admin/Login'
import AdminCategories from './admin/Categories'


export default class App extends React.Component {
    render() {
        return (
        <Router>
            <div className="app">
                <Route path="/" component={props => props.location.pathname.startsWith('/admin/') ? <AdminNavbar /> : <Navbar/> } />
                <Route exact path="/" component={Home} />
                <Route path="/menu" component={Menu} />
                <Route path="/contact-us" component={ContactUs} />

                <Route path="/admin/home" component={AdminHome} />
                <Route path="/admin/categories" component={AdminCategories} />
            </div>
         </Router>
        )
    }
}
