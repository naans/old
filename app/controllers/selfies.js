const User   = require('../models/user')
    , Selfie = require('../models/selfie')
    , Photo = require('../models/photo')

const all = res => {
    Selfie.find({})
    .then(selfies => res.json(selfies))
    .catch(err => {
        console.error(err)
        res.status(500)
        res.json({})
    })
}

const add = (res, params, data) => {
    if (! data.author) {
        res.status(400)
        return res.json({ error: `The author is missing !` })
    }
    if (! data.photo) {
        res.status(400)
        return res.json({ error: `The photo is missing !` })
    }
    if (! data.photo.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(400)
        return res.json({ error: `Unable to find the photo !` })
    }
    User.findOne({ username: data.author })
    .then(user => {
        if (null == user) {
            res.status(400)
            return res.json({ error: `Unable to find user with username '${data.author}' !` })
        }
        data.author = user._id
        Photo.findOne({ _id: data.photo })
        .then(photo => {
            if (null == photo) {
                res.status(400)
                return res.json({ error: `Unable to find the photo !` })
            }
            Selfie.create(data)
            .then(selfie => res.json(selfie))
            .catch(err => {
                console.error(err)
                res.status(400)
                res.json({ error: 'Unable to create the selfie !'})
            })
        })
        .catch(err => {
            console.error(err)
            res.status(400)
            res.json({ error: 'Unable to create the selfie !'})
        })
    })
    .catch(err => {
        console.error(err)
        res.status(500)
        res.json({ error: 'Internal Server Error'})
    })
}

const get = (res, params) => {
    if (! params.id.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(400)
        return res.json({ error: `Unable to find selfie with id '${params.id}' !` })
    }
    Selfie.findOne({ _id: params.id })
    .then(selfie => {
        if (null == selfie) {
            res.status(400)
            return res.json({ error: `Unable to find selfie with id '${params.id}' !` })
        }
        res.json(selfie)
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
    Selfie.remove({ _id: params.id })
    .then(() => {
        res.json({})
    })
    .catch(err => {
        console.error(err)
        res.status(500)
        res.json({ error: 'Internal Server Error'})
    })
}

const edit = (res, params, data) => {
    if (! params.id.match(/^[0-9a-fA-F]{24}$/)) {
        res.status(400)
        return res.json({ error: `Unable to find selfie with id '${params.id}' !` })
    }
    Selfie.findOneAndUpdate({ _id: params.id }, data, { new: true, runValidators: true })
    .then(selfie => {
        if (null == selfie) {
            res.status(400)
            return res.json({ error: `Unable to find selfie with id '${params.id}' !` })
        }
        res.json(selfie)
    })
    .catch(err => {
        console.error(err)
        res.status(500)
        res.json({ error: 'Internal Server Error'})
    })
}

module.exports = {all, add, get, edit, remove}
