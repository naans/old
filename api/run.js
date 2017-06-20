const express    = require('express')
    , bodyParser = require('body-parser')
    , mongoose   = require('mongoose')
    , config     = require('config')
    , app        = express()
    , Category   = require('./resources/category')
    , Meal       = require('./resources/meal')
    , Picture    = require('./resources/picture')

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

app.use('/pictures', express.static(`${config.get('root')}/${config.get('photos_path')}`))
app.use('/', express.static(`${config.get('root')}/public`))

app.use('/api', Category.routes)
app.use('/api', Meal.routes)
app.use('/api', require('./resources/routes/picture'))

app.listen(config.get('port'))

module.exports = app
