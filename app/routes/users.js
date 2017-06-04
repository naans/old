const router = require('express').Router()
    , users  = require('../controllers/users')
    , call   = require('../helpers/router').call

router.get('/', call(users.all))

router.post('/', call(users.add))

router.get('/:id', call(users.get))

router.put('/:id', call(users.edit))

router.delete('/:id', call(users.remove))

module.exports = router
