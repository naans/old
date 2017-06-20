const config   = require('config')
    , resource = require('../helpers/resource')
    , Schema   = require('mongoose').Schema

const schema = new Schema({
    ext: String,
    type: String,
    description: String,
    hidden: Boolean
})

schema.virtual('url').get(function () {
    return `${config.get('domain')}/pictures/${this.id}.${this.ext}`
})

schema.virtual('path').get(function () {
    return `${config.get('root')}/${config.get('photos_path')}/${this.id}.${this.ext}`
})

const short = picture => ({
    id:  picture.id,
    ext: picture.ext,
    url: picture.url
})

const faker = {
    ext: {choices: ['jpg', 'png', 'bmp', 'flif', 'tif']},
    type: 'lorem.word',
    description: 'lorem.paragraph',
    hidden: 'random.boolean'
}

const Picture = resource('Picture', {schema, faker, routes: null, methods: {short}})

module.exports = Picture
