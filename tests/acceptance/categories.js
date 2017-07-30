const chai      = require('chai')
    , should    = chai.should()
    , chaiHttp  = require('chai-http')
    , Resource  = require('../../api/resources/category')
    , Category  = Resource.model
    , generate  = Resource.methods.generate
    , server    = require('../../api/run')
    , actions   = require('../helpers').actions

chai.use(chaiHttp)

describe('Categories API', () => {

    var categories = []

    beforeEach(done => {
        categories.length = 0
        Category.remove({})
        .then(() => generate())
        .then(generatedCategory => Category.create(generatedCategory))
        .then(insertedCategory => {
            categories.push(insertedCategory)
            return generate(2)
        })
        .then(generatedCategories => Category.insertMany(generatedCategories))
        .then(insertedCategories => {
            insertedCategories.forEach(c => categories.push(c))
            done()
        })
        .catch(done)
    })

    actions.all(server, Resource, categories)
    actions.add(server, Resource, categories)
    actions.get(server, Resource, categories)
    actions.edit(server, Resource, categories)
    actions.remove(server, Resource, categories)
})
