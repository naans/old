const chai   = require('chai')
    , should = chai.should()
    , R      = require('ramda')
    , plural  = require('pluralize').plural

const isSuccess = status => 2 == Math.floor(status / 100)

const test = R.curry((server, method, url, {status, data, body, done, check}) => {
    if (undefined === status)
        status = 200
    var onSuccess = res => done('Failed !')
    var onFailure = done
    if (isSuccess(status)) {
        onSuccess = res => {
            res.should.have.status(status)
            if (body != undefined)
                res.body.should.be.eql(body)
            if (check != undefined) {
                return check(res)
            }
            done()
        }
    } else {
        onFailure = err => {
            try {
                const res = err.response.res
                err.should.have.status(status)
                if (body != undefined)
                    res.body.should.be.eql(body)
                if (undefined != check)
                    return check(res)
                done()
            } catch(err) {
                done(err)
            }
        }
    }
    var query = chai.request(server)[method](url)
    if (undefined !== data)
        query = query.send(data)
    query.then(onSuccess).catch(onFailure)
})

const equals = R.curry((expected, actual) => actual.should.be.eql(expected))

const all = (server, Resource, collection, prefix = '/api') => {
    const names = plural(Resource.name).toLowerCase()
        , url = `${prefix}/${names}`
    describe(`GET ${url}`, () => {
        const is = test(server, 'get', url)

        it('gets all ${names}', done => {
            is({
                body: collection.map(Resource.methods.short),
                done: done
            })
        })

        it(`returns empty list if no ${names}`, done => {
            Resource.model.remove({})
            .then(() => is({
                body: [],
                done: done
            }))
        })
    })
}

const add = (server, Resource, collection, prefix = '/api') => {
    const names = plural(Resource.name).toLowerCase()
        , url = `${prefix}/${names}`

    describe(`POST ${url}`, () => {
        const is = test(server, 'post', url)

        it(`adds a new ${Resource.name}`, done => {
            Resource.methods.generate()
            .then(instance => {
                is({
                    data: instance,
                    check: res => {
                        res.body.id.should.match(/^[0-9a-fA-F]{24}$/)
                        instance.id = res.body.id
                        res.body.should.be.eql(instance)
                        Resource.model.findOne({_id: instance.id})
                        .then(foundInstance => {
                            instance.should.be.eql(Resource.methods.short(foundInstance))
                            done()
                        })
                        .catch(done)
                    }
                })
            })
        })

        it('returns error if missing field', done => {
            const fields = R.join(', ', R.keys(Resource.model.schema.obj))
            is({
                data: {},
                status: 400,
                body: {error: `Missing fields [${fields}] for ${Resource.name}`},
                done: done
            })
        })
    })
}

const get = (server, Resource, collection, prefix = '/api') => {
    const names = plural(Resource.name).toLowerCase()
        , url = `${prefix}/${names}`

    describe(`GET ${url}/:id`, () => {
        const is = (id, options) => test(server, 'get', `${url}/${id}`, options)

        it(`gets a ${Resource.name}`, done => {
            const instance = Resource.methods.short(collection[0])
            is(instance.id, {
                body: instance,
                done: done
            })
        })

        it('returns error if invalid id', done => {
            is('invalidId', {
                status: 400,
                body: {error: `Unable to find ${Resource.name} with id 'invalidId' !`},
                done: done
            })
        })

        it('returns error if id not found', done => {
            is('0123456789abcdefABCDEF11', {
                status: 404,
                body: {error: `Unable to find ${Resource.name} with id '0123456789abcdefABCDEF11' !`},
                done: done
            })
        })
    })
}

const edit = (server, Resource, collection, prefix = '/api') => {
    const names = plural(Resource.name).toLowerCase()
        , url = `${prefix}/${names}`

    describe(`PUT ${url}/:id`, () => {
        const is = (id, options) => test(server, 'put', `${url}/${id}`, options)

        it(`changes a ${Resource.name}`, done => {
            const id = `${collection[0]._id}`
            Resource.methods.generate().then(data => {
                const instance = R.merge(data, {id})
                is(id, {
                    data: data,
                    body: instance,
                    done: done,
                    check: res => {
                        Resource.model.findOne({_id: id})
                        .then(foundInstance => {
                            equals(instance, Resource.methods.short(foundInstance))
                            done()
                        })
                        .catch(done)
                    }
                })
            })
        })

        it('returns error if invalid id', done => {
            Resource.methods.generate().then(data => {
                is('invalidId', {
                    data: data,
                    status: 400,
                    body: {error: `Unable to find ${Resource.name} with id 'invalidId' !`},
                    done: done
                })
            })
        })

        it('returns error if id not found', done => {
            Resource.methods.generate().then(data => {
                is('0123456789abcdefABCDEF11', {
                    data: data,
                    status: 404,
                    body: {error: `Unable to find ${Resource.name} with id '0123456789abcdefABCDEF11' !`},
                    done: done
                })
            })
        })
    })
}

const remove = (server, Resource, collection, prefix = '/api') => {
    const names = plural(Resource.name).toLowerCase()
        , url = `${prefix}/${names}`

    describe(`DELETE ${url}/:id`, () => {
        const is = (id, options) => test(server, 'delete', `${url}/${id}`, options)

        it(`removes a ${Resource.name}`, done => {
            const id = `${collection[0]._id}`
            is(id, {
                body: {},
                done: done,
                check: res => {
                    Resource.model.findOne({_id: id})
                    .then(foundInstance => {
                        equals(true, null === foundInstance)
                        done()
                    })
                    .catch(done)
                }
            })
        })

        it('returns error if invalid id', done => {
            is('invalidId', {
                status: 401,
                body: {},
                done: done
            })
        })
    })
}
module.exports = {test, actions: {all, add, get, edit, remove}, equals}
