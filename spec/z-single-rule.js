if (typeof require !== 'undefined') {
    var Validator = require('../src/validator.js');
    var expect = require('chai').expect;
} else {
    var Validator = window.Validator;
    var expect = window.chai.expect;
}

describe('Z single rule', function() {
    it('simple', function() {
        var validator = new Validator({
            name: [{
                required_if: ['age', 30],
                min: 2
            }],
            age: 'min:18'
        });

        console.log('test', validator.single(16, 'age'));
        expect(validator.single(16, 'age')).to.be.true;
        // validator.setInput({
        //     age: 30,
        //     name: 'Joe'
        // });
        expect(validator.single(null, 'name')).to.be.false;
        //
        // expect(validator.passes({
        //     age: 30,
        //     name: 'Joe'
        // })).to.be.true;
        // expect(validator.fails({
        //     age: 30,
        //     name: 'Joe'
        // })).to.be.false;
    });

    // it('mixed rule definition (only object, no string rules) with message', function() {
    //     var validator = new Validator({
    //         name: [{
    //             required_if: {
    //                 value: ['age', 30],
    //                 message: 'Required if age is 30'
    //             },
    //             min: {
    //                 value: 2,
    //                 message: 'Minimum value is 2'
    //             }
    //         }, 'max:3']
    //     });
    //     expect(validator.passes({
    //         age: 30,
    //     })).to.be.false;
    //     expect(validator.errors.first('name')).to.be.equal('Required if age is 30');
    //     expect(validator.fails({
    //         age: 30,
    //         name: ''
    //     })).to.be.true;
    //     expect(validator.errors.first('name')).to.be.equal('Required if age is 30');
    // });
    //
    // it('type checking', function() {
    //     var validator = new Validator({
    //         age: [{
    //             'in': [30, 31],
    //             not_in: [29, 40]
    //         }]
    //     });
    //     expect(validator.passes({
    //         age: 30
    //     })).to.be.true;
    //     expect(validator.fails({
    //         age: 30
    //     })).to.be.false;
    // });
    //
    // it('type checking with message', function() {
    //     var validator = new Validator({
    //         age: [{
    //             'in': {
    //                 value: [30, 31],
    //                 message: 'Age has to be either 30 or 31'
    //             },
    //             not_in: {
    //                 value: [29, 40],
    //                 message: 'Age cannot be 29 or 40'
    //             }
    //         }]
    //     });
    //     expect(validator.passes({
    //         age: 29
    //     })).to.be.false;
    //     expect(validator.errors.first('age')).to.be.equal('Age has to be either 30 or 31');
    //     expect(validator.errors.get('age')[1]).to.be.equal('Age cannot be 29 or 40');
    //     expect(validator.fails({
    //         age: 32
    //     })).to.be.true;
    //     expect(validator.errors.first('age')).to.be.equal('Age has to be either 30 or 31');
    // });
});
