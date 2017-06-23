import React  from 'react'
import {Navbar} from '../bootstrap'

export default props => {
    const type = props.location.pathname.startsWith('/admin/') ? 'admin' : 'site'
    return <Navbar title="Naans" type="default" links={props.links[type]} />
}
