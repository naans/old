import R from 'ramda'
import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {Navbar, Panel, Table, Form, Input, Alert, Button} from '../bootstrap'
import Alerts from '../parts/Alerts'

import {errors, infos} from '../../helpers/notifiers'
import validate from '../../helpers/validate'
import '../../helpers/array'

const crud = (store, fields, texts) => {

    const urls = {
        all: `/admin/${store.route}/all`,
        add: `/admin/${store.route}/add`,
        edit: `/admin/${store.route}/edit/:id`,
        remove: `/admin/${store.route}/remove/:id`
    }

    class List extends React.Component {
        constructor() {
            super()
            this.state = {items: []}
        }
        componentWillMount() {
            const models = fields.where({inTable: true, type: 'select' })
                , custom = fields.where({inTable: true, custom: true })
            store.all()
                .then(R.clone)
                .then(items => Promise.all(items.map(item => {
                    if (item.modelsAlreadyResolved == true)
                        return Promise.resolve(item)
                    if (! item.displayAlreadyDone) {
                        custom.map(customField => {
                            item[customField.name] = customField.display(item[customField.name])
                        })
                        item.displayAlreadyDone = true
                    }
                    return Promise.all(models.map(model => {
                        const id = item[model.name]
                        return Promise.all([Promise.resolve(model), model.store.at(id)])
                    })).then(pairs => {
                        pairs.forEach(pair => {
                            item[pair[0].name] = pair[1][pair[0].optionLabel]
                        })
                        item.modelsAlreadyResolved = true
                        return item
                    })
                })))
                .then(items => this.setState({items}))
        }
        render() {
            const titles  = fields.where({inTable: true}).pick(['name', 'displayName'])
            const buttons = [
                { type: 'success', icon: 'pencil', url: urls.edit, text: texts.btns.edit},
                { type: 'danger', icon: 'trash', url: urls.remove, text: texts.btns.remove}
            ]
            return (
            <Panel type="default" title={texts.titles.all}>
                <Table titles={titles} items={this.state.items} buttons={buttons} />
            </Panel>
            )
        }
    }

    const form = type => class extends React.Component {
        constructor(props) {
            super()
            this.history = props.history
            this.state = { index: {} }
            this.handle = this.handle.bind(this)
            this.changed = this.changed.bind(this)
            if (type == 'add')
                this.fill()
            else {
                this.id = props.match.params.id
                store.at(this.id)
                .then(this.fill.bind(this))
                .catch(err => {
                    console.error(err)
                    this.history.push(urls.all)
                })
            }
            infos.clear()
            errors.clear()
        }

        fill(data) {
            fields.forEach((field, index) => {
                if (! field.inForm)
                    return
                if (undefined == data)
                    field.value = field.default || ''
                else {
                    if (field.aliasOf)
                        field.value = data[field.aliasOf] || ''
                    else
                        field.value = data[field.name] || ''
                }
                field.error = false
                this.state.index[field.name] = index
                if (field.type == 'select' && field.store !== undefined) {
                    const $this = this
                    field.store.all().then(items => {
                        items.forEach(item => field.options.push(item))
                        if (type == 'add')
                            field.value = (items.length) ? items[0].id : null
                        $this.setState({})
                    })
                }
            })
            this.setState({})
        }

        handle() {
            if (this.validate()) {
                const data = fields.reduce((result, field) => {
                    result[field.name] = field.value
                    return result
                }, {})
                    , success = (type == 'add') ? texts.msgs.added(data) : texts.msgs.edited(data)
                    , failure = (type == 'add') ? texts.msgs.addError(data) : texts.msgs.editError(data)
                    , request = (type == 'add') ? store.add(data) : store.save(this.id, data)

                request
                    .then(() => {
                        infos.add(success)
                        this.history.push(urls.all)
                    })
                    .catch(err => {
                        errors.add(failure)
                        console.error(err)
                    })
            }
        }
        validate() {
            errors.clear()
            fields.forEach(validate)
            return fields.where({error: true}).length === 0
        }
        changed(e) {
            var field = fields[this.state.index[e.target.name]]
            if (field.handle !== undefined) {
                field.handle(e.target)
                .then(result => {
                    field.value = result
                    this.setState({})
                })
            } else {
                field.value = e.target.value
                this.setState({})
            }
            // console.log(fields.map(field => `${field.name} = ${field.value}`))
        }
        render() {
            return (
            <div>
                <Panel type="success" title={texts.titles[type]}>
                    <Form action={this.handle} submitText={texts.btns[type]}>
                    { fields.where({inForm: true}).map(field =>
                        <Input
                            key={field.type == 'picture' ? field.name + field.value : field.name}
                            {...field}
                            onChange={this.changed}
                        />
                    )}
                    </Form>
                </Panel>
            </div>
            )
        }
    }

    const Add = form('add')
    const Edit = form('edit')

    class Remove extends React.Component {
        constructor(props) {
            super()
            this.history = props.history
            this.state = {data: {id: props.match.params.id}}
            this.cancel = this.cancel.bind(this)
        }
        confirm() {
            store.remove(this.state.data.id)
                .then(() => {
                    infos.add(texts.msgs.removed(this.state.data))
                    this.cancel()
                })
                .catch(err => {
                    errors.add(texts.msgs.removeError(this.state.data))
                    this.cancel()
                })
        }
        cancel() {
            this.history.push(urls.all)
        }
        componentWillMount() {
            store.at(this.state.data.id)
                .then(data => this.setState({data}))
                .catch(this.cancel)
        }
        render() {
            return (
            <Alert type="warning" onClose={this.cancel}>
                <p> {texts.msgs.removing(this.state.data)} </p><br/>
                <Button type="danger" icon="trash" onClick={this.confirm.bind(this)}>{texts.msgs.yesReomve}</Button>
                <Button type="default" onClick={this.cancel}>{texts.msgs.noCancel}</Button>
            </Alert>
            )
        }
    }

    return props =>
        <div>
            <Navbar inverse links={[
                [urls.all, texts.menu.all],
                [urls.add, texts.menu.add]
            ]} />
            <Alerts />
            <Route path={urls.all} component={List} />
            <Route path={urls.add} component={Add} />
            <Route path={urls.edit} component={Edit} />
            <Route path={urls.remove} component={Remove} />
        </div>
}

export default crud
