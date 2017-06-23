import React   from 'react'
import {pictures} from '../../helpers/store'

export default class Picture extends React.Component {
    constructor(props) {
        super()
        this.state = {
            id: props.id,
            url: null
        }
        this.props = props
    }

    choose(id) {
        pictures.at(id).then(picture => {
            this.setState({id: id, url: picture.url})
        })
        .catch(err => {
            errors.add(`Erreur lors de l'affichage de la photo dont le id est '${id}'`)
            console.error(err)
        })
    }

    componentWillMount() {
        this.choose(this.state.id)
    }

    render() {
        return <a href={this.state.url}><img src={this.state.url} {...this.props}/></a>
    }
}
