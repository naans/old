const express    = require('express')
    , bodyParser = require('body-parser')
    , mongoose   = require('mongoose')
    , config     = require('config')
    , app        = express()
    , Category   = require('./resources/category')
    , Meal       = require('./resources/meal')
    , User       = require('./resources/user').model

mongoose.Promise = global.Promise
mongoose.connect(`mongodb://localhost/${config.get('database')}`)

const db = mongoose.connection

app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}))

app.use(bodyParser.json({
    limit: '50mb'
}))

app.use((req, res, next) => {
    console.log(req.body)
    if (! req.body.token) {
        req.user = null
        next()
    } else {
        User.findOne({token: req.body.token})
        .then(user => {
            const now = (new Date).getTime()
            req.user = (user && user.expire > now) ? user : null
            next()
        })
        .catch(err => {
            console.error(err)
            res.status(500)
            res.json({ error: 'Internal Server Error'})
        })
    }
})

app.use('/pictures', express.static(`${config.get('root')}/${config.get('photos_path')}`))
app.use('/', express.static(`${config.get('root')}/public`))

app.use('/api', Category.routes)
app.use('/api', Meal.routes)
app.use('/api', require('./resources/routes/picture'))
app.use('/api', require('./resources/routes/user'))

app.get('*', (req, res) => res.sendFile(`${config.get('root')}/public/index.html`))

app.listen(config.get('port'))

console.log(config.get('root'))

module.exports = app

User.find({}).then(users => console.log(users))
