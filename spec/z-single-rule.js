if (typeof require !== 'undefined') {
    var Validator = require('../src/validator.js');
    var expect = require('chai').expect;
} else {
    var Validator = window.Validator;
    var expect = window.chai.expect;
}

describe('Single rule', function() {
    it('simple', function() {
        var validator = new Validator({
            name: [{
                required_if: ['age', 30],
                min: 2
            }],
            age: 'min:18'
        });

        expect(validator.single(16, 'age')).to.be.false;
        expect(validator.single(30, 'age')).to.be.true;
        expect(validator.single(null, 'name')).to.be.true;
        expect(validator.single(null, 'name', { age: 16, name: '' })).to.be.true;
        expect(validator.single(null, 'name', { age: 30, name: 'Joe' })).to.be.false;
    });

    // it('wildcard', function() {
    //     var validator = new Validator({
    //         'foo.*.bar.*.people.*.name': 'required',
    //         'foo.*.bar.*.people.*.age': 'numeric',
    //         'foo.*.bar.*.people.*.term': 'accepted',
    //         'foo.*.bar.*.people.*.isActive': 'boolean',
    //     });
    //
    //     var wildcardInput = {
    //         foo: [{
    //             bar: [{
    //                     people: [{
    //                             name: '',
    //                             age: 'aa',
    //                             term: false,
    //                             isActive: 'not'
    //                         },
    //                         {
    //                             name: '',
    //                             age: 'aa',
    //                             term: false,
    //                             isActive: 'not'
    //                         }
    //                     ]
    //                 },
    //                 {
    //                     people: [{
    //                             name: '',
    //                             age: 'aa',
    //                             term: false,
    //                             isActive: 'not'
    //                         },
    //                         {
    //                             name: '',
    //                             age: 'aa',
    //                             term: false,
    //                             isActive: 'not'
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }]
    //     };
    //
    //     expect(validator.single(null, 'foo.*.bar.*.people.*.age', wildcardInput)).to.be.false;
    //
    //     // expect(validator.single(30, 'age')).to.be.true;
    //     // expect(validator.single(null, 'name')).to.be.true;
    //     // expect(validator.single(null, 'name', { age: 16, name: '' })).to.be.true;
    //     // expect(validator.single(null, 'name', { age: 30, name: 'Joe' })).to.be.false;
    // });
});
