const config   = require('config')
    , resource = require('../helpers/resource')
    , Schema   = require('mongoose').Schema

const schema = new Schema({
    name: String,
    pass: String,
    token: String,
    expire: Number
})

const faker = {
    name: 'lorem.word',
    pass: 'lorem.word',
    token: {constant: ''},
    expire: {constant: (new Date).getTime() + 24 * 3600000}
}

const User = resource('User', {schema, faker, routes: null})

module.exports = User
