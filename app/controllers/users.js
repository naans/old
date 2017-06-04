const User = require('../models/user')

const all = res => {
    User.find({})
    .then(users => res.json(users))
}

module.exports = {all}
