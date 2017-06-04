const express    = require('express')
    , bodyParser = require('body-parser')
    , mongoose   = require('mongoose')
    , config     = require('config')
    , app        = express()

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

app.use('/api/categories', require('./routes/categories'))

app.listen(config.get('port'))

module.exports = app
