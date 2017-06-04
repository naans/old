const should = require('chai').should()
require('../../../app/helpers/array')

describe('Array Helpers', () => {
    it('ordered(): sorts and returns the array', () => {
        [3, 2, 4, 1, 5].ordered()
        .should.be.eql([1, 2, 3, 4, 5]);

        ['Hey', 'Yo', 'Hello'].ordered()
        .should.be.eql(['Hello', 'Hey', 'Yo']);

        [{val: 1}, {val: -1}, {val: 5}].ordered((a, b) => a.val - b.val)
        .should.be.eql([{val: -1}, {val: 1}, {val: 5}])
    })

    it('contains(): tells if the array contains an item', () => {
        [3, 2, 4, 1, 5].contains(4)
        .should.be.eql(true);

        ['Hey', 'Yo', 'Hello'].contains('Yo')
        .should.be.eql(true);

        ['Hey', 'Yo', 'Hello'].contains('Baaka')
        .should.be.eql(false);

    })
})
