const R        = require('ramda')
    , mongoose = require('mongoose')
    , fake     = require('faker').fake
    , modelOf  = require('./model')

/**
 * Object storing the resources methods.
 *
 * @type {Object}
 */
const store = {}

/**
 * Creates or gets methods for a resource.
 *
 * @param  {String} name        The resource's name.
 * @param  {Object} opts.schema The mongoose schema.
 * @param  {Object} opts.faker  The faker rules {field: rule, ...}
 * @return {Object}             {
 *     short: [transforms a Document to json object to send in response],
 *     generate: [generates fake data of the resource which once sent to
 *                 `POST /resources` will create the resource properly]
 * }
 */
const methods = (name, {schema, faker}, methods = {}) => {
    if (undefined !== schema) {
        store[name] = {
            short:    methods.short    || short(schema),
            generate: methods.generate || generate(faker)
        }
    }
    return store[name]
}

const short = schema => resource => R.pipe(
    R.prop('obj'),
    R.keys,
    R.reduce((result, field) => {
        result[field] = shorten(resource[field])
        return result
    }, {id: resource._id + ''})
)(schema)

const shorten = value =>
    (value instanceof mongoose.Document) ? value._id + ''
    : (value instanceof mongoose.Types.ObjectId) ? value + ''
    : (value instanceof Array)  ? value.map(shorten)
    : value

const generate = fields => number => (undefined === number)
    ? map(generateField, fields)
    : Promise.all(R.times(() => map(generateField, fields), number))

const map = (fn, collection) => {
    if (R.type(collection) === 'Array') {
        return Promise.all(collection.map(fn))
    }
    const keys = R.keys(collection)
    return Promise.all(R.values(collection).map(fn))
        .then(vals => R.zipObj(keys, vals))
}

const generateField = field => {
    if (R.type(field) == 'Object') {
        if (field.model) {
            return modelOf(field.model).findOne({})
                .then(resource => (null === resource) ? null : resource._id + '')
        }
        if (field.constant) {
            return field.constant
        }
        if (field.choices) {
            return field.choices[Math.floor(Math.random() * field.choices.length)]
        }
        return null
    }
    var value = fake(`{{${field}}}`)
    if (field === 'random.boolean')
        value = ('true' === value)
    if (field === 'random.number')
        value = parseFloat(value)
    return value
}

module.exports = methods
