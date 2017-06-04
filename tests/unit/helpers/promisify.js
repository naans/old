const should    = require('chai').should()
    , promisify = require('../../../app/helpers/promisify')
    , DELAY     = 21

describe('Promisify Helper', () => {
    it('promisifies asynchronous function without arguments', done => {
        const foo = callback => setTimeout(callback, DELAY, null, 'Working')
        const bar = promisify(foo)
        bar().then(data => {
            data.should.be.eql('Working')
            done()
        }).catch(done)
    })

    it('promisifies asynchronous function with one argument', done => {
        const foo = (n, callback) => setTimeout(callback, DELAY, null, n + 1)
        const bar = promisify(foo)
        bar(1).then(data => {
            data.should.be.eql(2)
            done()
        }).catch(done)
    })

    it('promisifies asynchronous function with multiple arguments', done => {
        const foo = (a, b, c, callback) => setTimeout(callback, DELAY, null, a + b + c)
        const bar = promisify(foo)
        bar(1, 2, 3).then(data => {
            data.should.be.eql(6)
            done()
        }).catch(done)
    })

    it('handles the failure', done => {
        const foo = (a, b, c, callback) => setTimeout(callback, DELAY, 'Failed', a + b + c)
        const bar = promisify(foo)
        bar(1, 2, 3).then(data => {
            done('Test Failed !')
        }).catch(err => {
            err.should.be.eql('Failed')
            done()
        })
    })

})
