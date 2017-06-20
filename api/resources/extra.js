const resource = require('../helpers/resource')
    , Schema   = require('mongoose').Schema

const schema = new Schema({
    menu: { type: Schema.Types.ObjectId, ref: 'Menu'},
    name: String,
    price: Number,
    description: String,
    hidden: Boolean
})

const faker = {
    menu: { model: 'Menu' },
    name: 'lorem.words',
    price: 'random.number',
    description: 'lorem.paragraph',
    hidden: 'random.boolean'
}

const Extra = resource('Extra', {schema, faker})

module.exports = Extra
