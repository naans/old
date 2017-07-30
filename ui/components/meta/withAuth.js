import React from 'react'
import auth  from '../../helpers/auth'
import AdminLogin from '../pages/AdminLogin'

const withAuth = Component => class extends React.Component {
    constructor(props) {
        super()
        this.props = props
    }
    componentWillMount() {
        if (!auth.check())
            this.props.history.push('/admin')
    }
    render() {
        const props = this.props
        return <Component {...props}/>
    }
}

export default withAuth
