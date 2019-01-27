if (typeof require !== 'undefined') {
    var Validator = require('../src/validator.js');
    var expect = require('chai').expect;
} else {
    var Validator = window.Validator;
    var expect = window.chai.expect;
}

describe('async rule tests', function() {
    this.timeout(200);

    it('should be able to register and pass async rule', function(done) {
        Validator.registerAsync('username', function(desiredUsername, ruleValue, attribute, passes) {
            setTimeout(function() {
                if (desiredUsername == 'test') {
                    passes();
                }
            }, 50);
        }, ':attribute is an invalid username');

        var validator = new Validator({
            username: 'username'
        });
        validator.passes({
            username: 'test'
        }, done);
    });

    it('should be able to fail async rules', function(done) {
        Validator.registerAsync('username', function(desiredUsername, ruleValue, attribute, passes) {
            setTimeout(function() {
                if (desiredUsername == 'test') {
                    passes(false);
                }
            }, 50);
        }, ':attribute is an invalid username');

        var validator = new Validator({
            username: 'username'
        });
        validator.fails({
            username: 'test'
        }, done);
    });

    it('should pass on multiple async rules', function(done) {
        var passCount = 0;

        Validator.registerAsync('username1', function(desiredUsername, ruleValue, attribute, passes) {
            setTimeout(function() {
                if (desiredUsername == 'test') {
                    passCount++;
                    passes();
                }
            }, 50);
        }, ':attribute is an invalid username');

        Validator.registerAsync('username2', function(desiredUsername, ruleValue, attribute, passes) {
            setTimeout(function() {
                if (desiredUsername == 'test') {
                    passCount++;
                    passes();
                }
            }, 50);
        }, ':attribute is an invalid username');

        var validator = new Validator({
            username: 'username1|username2'
        });
        validator.passes({
            username: 'test'
        }, function() {
            expect(passCount).to.equal(2);
            done();
        });
    });

    it('should fail on mixture of pass/fail async rules', function(done) {
        var failedCount = 0;
        var passCount = 0;

        Validator.registerAsync('username1', function(desiredUsername, ruleValue, attribute, passes) {
            setTimeout(function() {
                if (desiredUsername == 'test') {
                    passCount++;
                    passes();
                }
            }, 50);
        }, ':attribute is an invalid username');

        Validator.registerAsync('username2', function(desiredUsername, ruleValue, attribute, passes) {
            setTimeout(function() {
                if (desiredUsername == 'test') {
                    failedCount++;
                    passes(false);
                }
            }, 50);
        }, ':attribute is an invalid username');

        var validator = new Validator({
            username: 'username1|username2'
        });
        validator.fails({
            username: 'test'
        }, function() {
            expect(passCount).to.equal(1);
            expect(failedCount).to.equal(1);
            done();
        });
    });

    it('should allow custom error message', function(done) {
        Validator.registerAsync('username', function(desiredUsername, ruleValue, attribute, passes) {
            setTimeout(function() {
                if (desiredUsername == 'admin') {
                    passes(false, 'This username is banned');
                }
            }, 50);
        }, ':attribute is an invalid username');

        var validator = new Validator({
            username: 'username'
        });
        validator.fails({
            username: 'admin'
        }, function() {
            expect(validator.errors.first('username')).to.equal('This username is banned');
            done();
        });
    });

    it('should allow validating by async when no async rules', function(done) {
        var validator = new Validator({
            username: 'required|min:3',
            email: 'required|email'
        });
        validator.fails({
            username: 'admin',
            email: 'blah'
        }, function() {
            done();
        });

        validator.passes({
            username: 'admin',
            email: 'blah'
        }, function() {
            throw 'Should not have passed.';
        });
    });

    it('should it pass on mixture of sync/async rules', function(done) {
        Validator.registerAsync('username', function(desiredUsername, ruleValue, attribute, passes) {
            setTimeout(function() {
                if (desiredUsername == 'test') {
                    passes();
                }
            }, 50);
        }, ':attribute is an invalid username');

        var validator = new Validator({
            username: 'required|min:3|username'
        });
        validator.passes({
            username: 'test'
        }, done);
    });

    it('should it not call passes if using just fails callback', function(done) {
        var validator = new Validator({
            name: 'required'
        });
        validator.fails({
            name: 'gary'
        }, function() {
            throw 'Should not be called.'
        });

        validator.passes({
            name: 'gary'
        }, function() {
            done();
        });
    });


    it('should it not call fails if using just passes callback', function(done) {
        var validator = new Validator({
            name: 'required'
        });
        validator.passes({
            name: ''
        }, function() {
            throw 'Should not be called.'
        });

        validator.fails({
            name: ''
        }, function() {
            done();
        });
    });

    // it('should throw exception when attempting to validate and no fail or pass callback', function() {

    // 	Validator.registerAsync('username', function() { });
    // 	var validator = new Validator({ username: 'admin' }, { username: 'username' });
    // 	expect(validator.passes).to.throw(/^passes expects.*/);

    // });

});
