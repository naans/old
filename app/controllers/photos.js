const promisify = require('../helpers/promisify')
    , fs     = require('fs')
    , type   = require('file-type')
    , write  = promisify(fs.writeFile)
    , unlink = promisify(fs.unlink)
    , Photo  = require('../models/photo')

require('../helpers/array')

const add = (res, params, data) => {
    if (! data.photo) {
        res.status(400)
        return res.json({ error: 'The photo is missing' })
    }

    var buffer   = Buffer.from(data.photo, 'base64'),
        dataType = type(buffer)
    if (! dataType) {
        res.status(400)
        return res.json({ error: 'Unknown file type'})
    }
    if (! ['jpg', 'png', 'bmp', 'flif', 'tif'].contains(dataType.ext)) {
        res.status(400)
        return res.json({ error: 'The file type is not supported'})
    }

    var url = null, photo = null
    Photo.create({
        ext: dataType.ext,
        size: buffer.length
    })
    .then(saved => {
        photo = saved
        return write(photo.path, buffer)
    })
    .then(() => {
        res.json(photo.toObject())
    })
    .catch(err => {
        console.error(err)
        res.status(500)
        res.json({ error: 'Error while saving the photo' })
    })
}

const edit = (res, params) => {
    if (! params.id.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(400)
        return res.json({ error: `Unable to find photo with id '${params.id}' !` })
    }
    Photo.findOne({ _id: params.id })
    .then(photo => {
        if (null == photo) {
            res.status(400)
            return res.json({ error: `Unable to find photo with id '${params.id}' !` })
        }
        // TODO: Handle picture manipulation based on params
        // ...
        // Just returning the original photo for now
        res.json(photo.toObject())
    })
    .catch(err => {
        console.error(err)
        res.status(500)
        res.json({ error: 'Internal Server Error'})
    })
}

const remove = (res, params) => {
    if (! params.id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.json({})
    }
    Photo.findOne({ _id: params.id })
    .then(photo => {
        if (null == photo)
            return
        return unlink(`${photo.path}`).then(() => Photo.remove({ _id: photo.id }))
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

module.exports = {add, edit, remove}
