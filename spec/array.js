if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('array rule', function() {
  it('should pass when array', function() {
    var validator = new Validator({
      users: 'array'
    });
    expect(validator.passes({
      users: []
    })).to.be.true;
    expect(validator.fails({
      users: []
    })).to.be.false;
  });

  it('should fail when given object', function() {
    var validator = new Validator({
      users: 'array'
    });
    expect(validator.fails({
      users: {}
    })).to.be.true;
    expect(validator.passes({
      users: {}
    })).to.be.false;
  });

  it('should fail when given boolean', function() {
    var validator = new Validator({
      users: 'array'
    });
    expect(validator.fails({
      users: true
    })).to.be.true;
    expect(validator.passes({
      users: true
    })).to.be.false;
  });
});
