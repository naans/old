const chai      = require('chai')
    , should    = chai.should()
    , chaiHttp  = require('chai-http')
    , Category  = require('../../api/resources/category')
    , Picture   = require('../../api/resources/picture')
    , Meal      = require('../../api/resources/meal')
    , server    = require('../../api/run')
    , actions   = require('../helpers').actions

chai.use(chaiHttp)

describe('Meals API', () => {

    var meals = []

    before(done => {
        Picture.model.remove({})
        .then(() => Category.model.remove({}))
        .then(() => Picture.methods.generate(3))
        .then(pictures => Picture.model.insertMany(pictures))
        .then(() => Category.methods.generate(3))
        .then(categories => Category.model.insertMany(categories))
        .then(() => done())
    })

    beforeEach(done => {
        meals.length = 0
        Meal.model.remove({})
        .then(() => Meal.methods.generate(3))
        .then(Meal.model.insertMany)
        .then(insertedMeals => {
            insertedMeals.forEach(m => meals.push(m))
            done()
        })
        .catch(done)
    })

    actions.all(server, Meal, meals)
    actions.add(server, Meal, meals)
    actions.get(server, Meal, meals)
    actions.edit(server, Meal, meals)
    actions.remove(server, Meal, meals)
})
