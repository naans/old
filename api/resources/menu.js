const resource = require('../helpers/resource')
    , Schema   = require('mongoose').Schema

const schema = new Schema({
    picture: { type: Schema.Types.ObjectId, ref: 'Picture'},
    extras: [{ type: Schema.Types.ObjectId, ref: 'Extra' }],
    meals: [{ type: Schema.Types.ObjectId, ref: 'Meal' }],
    name: String,
    price: Number,
    description: String,
    hidden: Boolean
})

const faker = {
    suplements: { constant: [] },
    meals: { constant: [] },
    picture: { model: 'Picture' },
    name: 'lorem.words',
    price: 'random.number',
    description: 'lorem.paragraph',
    hidden: 'random.boolean'
}

const Menu = resource('Menu', {schema, faker})

module.exports = Menu
