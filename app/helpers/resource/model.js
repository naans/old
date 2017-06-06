const mongoose = require('mongoose')

/**
 * Object storing models by name.
 *
 * @type {Object}
 */
const store = {}

/**
 * Creates or gets a mongoose model.
 *
 * @param  {String} name   The model's name.
 * @param  {Object} schema The mongoose schema.
 * @return {Object}        mongoose model.
 */
const model = (name, schema) => {
    if (undefined !== schema)
        store[name] = mongoose.model(name, schema)
    return store[name]
}

module.exports = model
