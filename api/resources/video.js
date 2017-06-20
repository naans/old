const resource = require('../helpers/resource')
    , Schema   = require('mongoose').Schema

const schema = new Schema({
    name: String,
    url: String,
    description: String,
    hidden: Boolean
})

const faker = {
    name: 'lorem.words',
    url: 'internet.url',
    description: 'lorem.paragraph',
    hidden: 'random.boolean'
}

const Video = resource('Video', {schema, faker})

module.exports = Video
