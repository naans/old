const express = require('express')
    , plural  = require('pluralize').plural
/**
 * Object storing the routes of resources.
 *
 * @type {Object}
 */
const store = {}

/**
 * Creates or gets restful routes for a resource.
 * @param  {String} name            The resource's name.
 * @param  {Object} options.model   The mongoose model.
 * @param  {Object} options.methods The resource methods {short, generate}.
 * @return {Object}                 The express router.
 */
const routes = (name, {model, methods}) => {
    if (undefined !== model) {
        const names  = plural(name).toLowerCase()
            , router = express.Router()

        router.route(`/${names}`)
            .get(all(name, model, methods))
            .post(add(name, model, methods))
        router.route(`/${names}/:id`)
            .get(get(name, model, methods))
            .put(edit(name, model, methods))
            .delete(remove(name, model, methods))

        store[name] = router
    }
    return store[name]
}

const all = (name, model, methods) => (req, res) => {
    model.find({})
    .then(resources => res.json(resources.map(methods.short)))
    .catch(err => {
        console.error(err)
        res.status(500)
        res.json({})
    })
}

const add = (name, model, methods) => {
    const fields = Object.keys(model.schema.obj)
    return (req, res) => {
        console.log(req.body)
        console.log(req.query)
        const missing = fields.filter(name => (undefined === req.body[name]))
        if (missing.length > 0) {
            res.status(400)
            return res.json({error: `Missing fields [${missing.join(', ')}] for ${name}`})
        }
        model.create(req.body)
        .then(resource => res.json(methods.short(resource)))
        .catch(err => {
            console.error(err)
            res.status(400)
            res.json({ error: `Unable to create the ${name} !`})
        })
    }
}

const get = (name, model, methods) => (req, res) => {
    if (! req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(400)
        return res.json({ error: `Unable to find ${name} with id '${req.params.id}' !` })
    }
    model.findOne({ _id: req.params.id })
    .then(resource => {
        if (null == resource) {
            res.status(404)
            return res.json({ error: `Unable to find ${name} with id '${req.params.id}' !` })
        }
        res.json(methods.short(resource))
    })
    .catch(err => {
        console.error(err)
        res.status(500)
        res.json({ error: 'Internal Server Error'})
    })
}

const edit = (name, model, methods) => (req, res) => {
    if (! req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(400)
        return res.json({ error: `Unable to find ${name} with id '${req.params.id}' !` })
    }
    model.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    .then(resource => {
        if (null == resource) {
            res.status(404)
            return res.json({ error: `Unable to find ${name} with id '${req.params.id}' !` })
        }
        res.json(methods.short(resource))
    })
    .catch(err => {
        console.error(err)
        res.status(500)
        res.json({ error: 'Internal Server Error'})
    })
}

const remove = (name, model) => (req, res) => {
    if (! req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(401)
        return res.json({})
    }
    model.remove({ _id: req.params.id })
    .then(() => {
        res.json({})
    })
    .catch(err => {
        console.error(err)
        res.status(500)
        res.json({ error: 'Internal Server Error'})
    })
}

routes.all = all
routes.add = add
routes.get = get
routes.edit = edit
routes.remove = remove

module.exports = routes
