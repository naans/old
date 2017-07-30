import React  from 'react'
import auth from '../../helpers/auth'
import {errors} from '../../helpers/notifiers'
import {Panel, Form, Input} from '../bootstrap'

const ADMIN_HOME = '/admin/meals/all'

export default class Home extends React.Component {
    constructor(props) {
        super()
        if(auth.check())
            props.history.push(ADMIN_HOME)
        this.history = props.history
        this.state = {
            username: '',
            password: '',
            error: ''
        }
        this.changed = this.changed.bind(this)
        this.handle = this.handle.bind(this)
    }
    changed(e) {
        const data = {}
        data[e.target.name] = e.target.value
        this.setState(data)
    }
    handle() {
        auth.login(this.state)
        .then(() => this.history.push(ADMIN_HOME))
        .catch(err => errors.add('Les informations saisis sont incorrectes; Veuillez ressayer !'))
    }
    render() {
        return (
        <Panel type="success" title="Se connecter">
            <Form action={this.handle} submitText="Entrer">
                <Input
                    type="text"
                    name="username"
                    onChange={this.changed}
                    placeholder="Nom d'utilisateur"
                />
                <Input
                    type="password"
                    name="password"
                    onChange={this.changed}
                    placeholder="Mot de passe"
                />
            </Form>
        </Panel>
        )
    }
}
