const resource = require('../helpers/resource')
    , Schema   = require('mongoose').Schema

const schema = new Schema({
    category: { type: Schema.Types.ObjectId, ref: 'Category'},
    picture: { type: Schema.Types.ObjectId, ref: 'Picture'},
    name: String,
    price: Number,
    description: String,
    hidden: Boolean
})

const faker = {
    category: { model: 'Category' },
    picture: { model: 'Picture' },
    name: 'lorem.words',
    price: 'random.number',
    description: 'lorem.paragraph',
    hidden: 'random.boolean'
}

const Meal = resource('Meal', {schema, faker})

module.exports = Meal
