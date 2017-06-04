const router = require('express').Router()
    , photos  = require('../controllers/photos')
    , call   = require('../helpers/router').call

router.post('/', call(photos.add))

router.put('/:id', call(photos.edit))

router.delete('/:id', call(photos.remove))

module.exports = router
