const promisify = require('../../helpers/promisify')
    , fs       = require('fs')
    , type     = require('file-type')
    , write    = promisify(fs.writeFile)
    , unlink   = promisify(fs.unlink)
    , router   = require('express').Router()
    , routes   = require('../../helpers/resource/routes')
    , Resource = require('../picture')
    , Picture  = Resource.model
    , short    = Resource.methods.short

require('../../helpers/array')

const all = routes.all('Picture', Picture, Resource.methods)

const add = (req, res) => {
    if (! req.body.picture) {
        res.status(400)
        return res.json({ error: 'The picture is missing' })
    }

    var buffer   = Buffer.from(req.body.picture, 'base64'),
        dataType = type(buffer)
    if (! dataType) {
        res.status(400)
        return res.json({ error: 'Unknown file type'})
    }
    if (! ['jpg', 'png', 'bmp', 'flif', 'tif'].contains(dataType.ext)) {
        res.status(400)
        return res.json({ error: 'The file type is not supported'})
    }

    var url = null, picture = null
    Picture.create({
        ext: dataType.ext,
        type: req.body.type,
        description: req.body.description
    })
    .then(saved => {
        picture = saved
        return write(picture.path, buffer)
    })
    .then(() => {
        res.json(short(picture))
    })
    .catch(err => {
        console.error(err)
        res.status(500)
        res.json({ error: 'Error while saving the picture' })
    })
}

const edit = (req, res) => {
    if (! req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(400)
        return res.json({ error: `Unable to find picture with id '${req.params.id}' !` })
    }

    var buffer = null, dataType = null
    if (req.body.picture) {
        buffer   = Buffer.from(req.body.picture, 'base64')
        dataType = type(buffer)
        if (! dataType || ! ['jpg', 'png', 'bmp', 'flif', 'tif'].contains(dataType.ext)) {
            req.body.picture = undefined
        }
    }

    Picture.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    .then(picture => {
        if (null == picture) {
            res.status(404)
            return res.json({ error: `Unable to find Picture with id '${req.params.id}' !` })
        }
        if (req.body.picture) {
            return write(picture.path, buffer)
                .then(() => res.json(short(picture)))
        }
        res.json(short(picture))
    })
    .catch(err => {
        console.error(err)
        res.status(500)
        res.json({ error: 'Internal Server Error'})
    })
}

const get = (req, res) => {
    if (! req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(400)
        return res.json({ error: `Unable to find picture with id '${req.params.id}' !` })
    }

    Picture.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    .then(picture => {
        if (null == picture) {
            res.status(404)
            return res.json({ error: `Unable to find Picture with id '${req.params.id}' !` })
        }
        res.json(short(picture))
    })
    .catch(err => {
        console.error(err)
        res.status(500)
        res.json({ error: 'Internal Server Error'})
    })
}

const remove = (req, res) => {
    if (! req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.json({})
    }
    Picture.findOne({ _id: req.params.id })
    .then(picture => {
        if (null != picture)
            return unlink(`${picture.path}`).then(() => Picture.remove({ _id: picture.id }))
    })
    .then(() => {
        res.json({})
    })
    .catch(err => {
        console.error(err)
        res.status(500)
        res.json({ error: 'Internal Server Error'})
    })
}

router
    .get('/pictures', all)
    .post('/pictures', add)
    .get('/pictures/:id', get)
    .put('/pictures/:id', edit)
    .delete('/pictures/:id', remove)

module.exports = router
