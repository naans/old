const modelOf   = require('./resource/model')
    , routesOf  = require('./resource/routes')
    , methodsOf = require('./resource/methods')

/**
 * Creates or gets a resource by name.
 *
 * @param  {String} name        The same as the mongoose model name.
 * @param  {Object} opts.schema The mongoose Schema.
 * @param  {Object} opts.faker  Object associating each fakable field with the rule to fake it.
 * @return {Object}             { name: [name of the resource], model: [mongoose model],
 *                                routes: [express router], methods: [resource methods]}
 */
const resource = (name, {schema, faker, methods, routes} = {}) => {
    if (undefined === schema) { // Getter
        return {
            name:    name,
            model:   modelOf(name),
            routes:  routesOf(name),
            methods: methodsOf(name)
        }
    }
    // Setter
    const model = modelOf(name, schema)
    methods = methodsOf(name, {schema, faker}, methods)
    if (undefined === routes) {
        routes  = routesOf(name, {model, methods})
    }

    return {name, model, routes, methods}
}

module.exports = resource
