if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('different validation rule', function() {
  it('should fail when the 2 attributes are the same', function() {
    var validator = new Validator({
      field2: 'different:field1'
    });
    expect(validator.passes({
      field1: 'abc',
      field2: 'abc'
    })).to.be.false;
    expect(validator.fails({
      field1: 'abc',
      field2: 'abc'
    })).to.be.true;
  });

  it('should pass when the 2 attributes are different', function() {
    var validator = new Validator({
      field2: 'different:field1'
    });
    expect(validator.passes({
      field1: 'abc',
      field2: 'abcd'
    })).to.be.true;
    expect(validator.fails({
      field1: 'abc',
      field2: 'abcd'
    })).to.be.false;
  });

  it('should pass if one of the 2 attributes is a nested path', function() {
    var validator = new Validator({
      username: 'different:payload.username'
    });
    expect(validator.passes({
      payload: {
        pw: 'abc123',
        username: 'test123',
      },
      username: 'test',
    })).to.be.true;
    expect(validator.fails({
      payload: {
        pw: 'abc123',
        username: 'test123',
      },
      username: 'test',
    })).to.be.false;
  });

  it('should fail if one of the 2 attributes is an invalid nested path', function() {
    var validator = new Validator({
      username: 'different:payload.username'
    });
    expect(validator.fails({
      payload: {
        pw: 'abc123',
        username: 'test123',
      },
      username: 'test123',
    })).to.be.true;
    expect(validator.passes({
      payload: {
        pw: 'abc123',
        username: 'test123',
      },
      username: 'test123',
    })).to.be.false;
    expect(validator.errors.first('username')).to.equal('The username and payload.username must be different.');
  });
});
