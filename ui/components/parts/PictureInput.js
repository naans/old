import React   from 'react'
import {Popup, Button, Panel} from '../bootstrap'
import {pictures} from '../../helpers/store'
import {errors} from '../../helpers/notifiers'
import '../../helpers/array'

export default class PictureInput extends React.Component {
    constructor(props) {
        super()
        this.onChange = props.onChange
        this.name = props.name
        this.category = props.category
        this.state = {
            id: props.value|| null,
            url: null,
            choosing: false,
            pictures: []
        }

        this.closePopup = this.closePopup.bind(this)
        this.openPopup = this.openPopup.bind(this)
        this.choose = this.choose.bind(this)

        this.loadPictures()
    }

    closePopup() {
        this.setState({ choosing: false })
    }

    openPopup() {
        this.setState({ choosing: true })
    }

    loadPictures() {
        var promise = pictures.all()
        if (this.category) {
            promise = promise.then(items => items.where({type: this.category}))
        }
        promise.then(items => {
            this.setState({pictures: items})
        })
        .catch(err => {
            errors.add(`Erreur lors du chargements des photos`)
            console.error(err)
        })
    }

    choose(id) {
        if (id) {
            pictures.at(id).then(picture => {
                this.onChange({target: {name: this.name, value: id}})
                this.setState({id: id, url: picture.url, choosing: false})
            })
            .catch(err => {
                errors.add(`Erreur lors du choix de la photo dont le id est '${id}'`)
                console.error(err)
            })
        }
    }

    componentWillMount() {
        this.choose(this.state.id)
    }

    render() {
        return (
        <div>
            {this.state.id === null
                ? <Button type="primary" icon="picture" onClick={this.openPopup}> Choisir une photo </Button>
                : <img src={this.state.url} onClick={this.openPopup} className="img-thumbnail" style={{cursor: 'pointer'}} width="160" />
            }
            {this.state.choosing ?
            <Popup type="primary" title="Choisir une photo" onClose={this.closePopup}>
                <div className="row">
                    { this.state.pictures.map(picture =>
                        <div key={picture.id} className="col-md-3 col-sm-6 col-sx-12">
                            <img src={picture.url} onClick={() => this.choose(picture.id)} className="img-thumbnail" style={{cursor: 'pointer'}} width="100%" />
                        </div>
                    )}
                </div>
            </Popup>
            : null }
        </div>
        )
    }
}
