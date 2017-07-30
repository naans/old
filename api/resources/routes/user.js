const router = require('express').Router()
    , routes = require('../../helpers/resource/routes')
    , User   = require('../user').model
    , md5    = require('md5')

const login = (req, res) => {
    console.log(req.body)
    User.findOne({ name: req.body.username, pass: req.body.password })
    .then(user => {
        if (null == user) {
            res.status(401)
            return res.json({ error: `User name or password is incorrect !` })
        }
        user.token = new Date;
        user.token = md5(JSON.stringify(user))
        user.expire = (new Date).getTime() + 24 * 3600000
        user.save(err => {
            if (err) {
                console.error(err)
                res.status(500)
                return res.json({ error: 'Internal Server Error'})
            }
            res.json({
                token: user.token,
                expire: user.expire
            })
        })
    })
    .catch(err => {
        console.error(err)
        res.status(500)
        res.json({ error: 'Internal Server Error'})
    })
}

const logout = (req, res) => {
    res.json({
        msg: `Logging out user ${req.user.name}`
    })
}

const auth = (req, res) => {
    res.json({
        success: true
    })
}

const authenticate = (req, res, next) => {
    if (! req.user) {
        res.status(401)
        return res.json({error: 'Access Denied'})
    }
    next()
}

router
    .post('/users/login', login)
    .post('/users/logout', authenticate, logout)
    .post('/users/auth', authenticate, auth)

module.exports = router
