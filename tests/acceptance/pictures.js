process.env.NODE_ENV = 'test'

const fs        = require('fs')
    , chai      = require('chai')
    , read      = require('fs').readFileSync
    , config    = require('config')
    , should    = chai.should()
    , chaiHttp  = require('chai-http')
    , Picture   = require('../../api/resources/picture').model
    , promisify = require('../../api/helpers/promisify')
    , execute   = promisify(require('child_process').exec)
    , test      = require('../helpers').test(require('../../api/run'))
    , {generate, short}  = require('../../api/resources/picture').methods

require('../../api/helpers/array')

const FILES_PATH = `${config.get('root')}/tests/resources/files`
    , GOOGLE     = read(`${FILES_PATH}/google.jpg`, 'base64')
    , GITHUB     = read(`${FILES_PATH}/github.png`, 'base64')
    , TEXT       = read(`${FILES_PATH}/text.txt`, 'base64')

chai.use(chaiHttp)

describe('Pictures API', () => {

    var googlePictureID = null

    describe('GET /api/pictures', () => {
        const is = test('get', '/api/pictures')
        const pictures = []

        before(done => {
            pictures.length = 0
            Picture.remove({})
            .then(() => generate(3))
            .then(generated => Picture.insertMany(generated))
            .then(inserted => {
                inserted.forEach(p => pictures.push(p))
                done()
            })
            .catch(done)
        })

        it('gets all pictures', done => {
            is({
                body: pictures.map(short),
                done: done
            })
        })

        it(`returns empty list if no pictures`, done => {
            Picture.remove({})
            .then(() => is({
                body: [],
                done: done
            }))
        })

        after(done => {
            Picture.remove({})
            .then(() => done())
            .catch(done)
        })

    })

    describe('POST /api/pictures', () => {
        const is = test('post', '/api/pictures')

        it('uploads JPG picture', done => {
            generate()
            .then(data => {
                data.picture = GOOGLE
                is({
                    data: data,
                    check: res => {
                        res.body.ext.should.be.eql('jpg')
                        var filename = `${res.body.id}.${res.body.ext}`
                        read(`${config.get('root')}/${config.get('photos_path')}/${filename}`, 'base64')
                            .should.be.eql(GOOGLE)
                        googlePictureID = res.body.id
                        done()
                    }
                })
            })
        })

        it('uploads PNG picture', done => {
            generate()
            .then(data => {
                data.picture = GITHUB
                is({
                    data: data,
                    check: res => {
                        res.body.ext.should.be.eql('png')
                        var filename = `${res.body.id}.${res.body.ext}`
                        read(`${config.get('root')}/${config.get('photos_path')}/${filename}`, 'base64')
                        .should.be.eql(GITHUB)
                        done()
                    }
                })
            })
        })

        it('returns error if picture is missing', done => {
            is({
                data: {foo: 'bar'},
                status: 400,
                body: {error: 'The picture is missing'},
                done
            })
        })

        it('returns error if type is not supported', done => {
            generate()
            .then(data => {
                data.picture = TEXT
                is({
                    data: data,
                    status: 400,
                    body: {error: 'Unknown file type'},
                    done
                })
            })
        })

    })

    // describe('PUT /api/pictures/:id', () => {})

    describe('DELETE /api/pictures/:id', () => {
        const is = (id, opts) => test('delete', '/api/pictures/' + id, opts)

        it('removes the picture', done => {
            Picture.findOne({ _id: googlePictureID })
            .then(picture => {
                if (null == picture) {
                    return done('Failed !')
                }
                fs.existsSync(picture.path).should.be.eql(true)
                is(googlePictureID, {
                    body: {},
                    check: res => {
                        fs.existsSync(picture.path).should.be.eql(false)
                        Picture.findOne({ _id: googlePictureID })
                        .then(picture => {
                            should.equal(picture, null)
                            done()
                        })
                        .catch(done)
                    }
                })
            })
            .catch(done)
        })

    })

    after(done => {
        Picture.remove({})
        .then(() => execute(`rm ${config.get('root')}/${config.get('photos_path')}/*`))
        .then(() => done())
    })
})
