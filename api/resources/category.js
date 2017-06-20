const resource = require('../helpers/resource')
    , Schema   = require('mongoose').Schema

const schema = new Schema({
    parent: { type: Schema.Types.ObjectId, ref: 'Category'},
    childs: [{ type: Schema.Types.ObjectId, ref: 'Category'}],
    meals: [{ type: Schema.Types.ObjectId, ref: 'Meal'}],
    name: String,
    description: String,
    hidden: Boolean
})

const faker = {
    parent: { model: 'Category' },
    childs: { constant: [] },
    meals: { constant: [] },
    name: 'lorem.words',
    description: 'lorem.paragraph',
    hidden: 'random.boolean'
}

const Category = resource('Category', {schema, faker})

module.exports = Category
