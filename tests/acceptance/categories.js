process.env.NODE_ENV = 'test'

const chai      = require('chai')
    , should    = chai.should()
    , chaiHttp  = require('chai-http')
    , server    = require('../../app/run')

chai.use(chaiHttp)

describe('Categories API', () => {

    describe('GET /api/categories', () => {

        it('returns success true', done => {
            chai.request(server)
            .get('/api/categories')
            .then(res => {
                res.should.have.status(200)
                res.body.success.should.be.eql(true)
                done()
            })
            .catch(done)
        })
    })
})
