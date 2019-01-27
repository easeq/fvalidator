if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('numeric validation rule', function() {
  it('should pass with a numeric value', function() {
    var validator = new Validator({
      age: 'numeric'
    });
    expect(validator.passes({
      age: 44
    })).to.be.true;
  });

  it('should pass with a decimal numeric value', function() {
    var validator = new Validator({
      measurement: 'numeric'
    });
    expect(validator.passes({
      measurement: 0.5454
    })).to.be.true;
  });

  it('should pass with a string numeric value', function() {
    var validator = new Validator({
      age: 'numeric'
    });
    expect(validator.passes({
      age: '44'
    })).to.be.true;
  });

  it('should pass with a string decimal numeric value', function() {
    var validator = new Validator({
      measurement: 'numeric'
    });
    expect(validator.passes({
      measurement: '0.5454'
    })).to.be.true;
  });

  it('should fail with a string value', function() {
    var validator = new Validator({
      age: 'numeric'
    });
    expect(validator.fails({
      age: '18something'
    })).to.be.true;
  });

  it('should fail with a boolean true value', function() {
    var validator = new Validator({
      age: 'numeric'
    });
    expect(validator.fails({
      age: true
    })).to.be.true;
  });

  it('should fail with a boolean false value', function() {
    var validator = new Validator({
      age: 'numeric'
    });
    expect(validator.fails({
      age: false
    })).to.be.true;
  });

  it('should pass with no value', function() {
    var validator = new Validator({
      age: 'numeric'
    });
    expect(validator.passes({})).to.be.true;
    expect(validator.fails({})).to.be.false;
  });

  it('should pass with an empty string value', function() {
    var validator = new Validator({
      age: 'numeric'
    });
    expect(validator.passes({
      age: ''
    })).to.be.true;
    expect(validator.fails({
      age: ''
    })).to.be.false;
  });
});
