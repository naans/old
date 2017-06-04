const router = require('express').Router()
    , selfies  = require('../controllers/selfies')
    , call   = require('../helpers/router').call

/**
 * @api {get} /api/selfies Get List of Selfies
 * @apiName AllSelfies
 * @apiGroup Selfie
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     [
 *       {
 *         path: http://domaine.com/path-to-picture.jpg
 *         location: {
 *             latitude: Number,
 *             longitude: Number
 *         },
 *         time: Date,
 *         suspended: false,
 *         author: 'some-user-name'
 *       }
 *     ]
 */
router.get('/', call(selfies.all))

router.post('/', call(selfies.add))

router.get('/:id', call(selfies.get))

router.put('/:id', call(selfies.edit))

router.delete('/:id', call(selfies.remove))

module.exports = router
