if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('alpha validation rule', function() {
  it('should fail with non-alphabetic characters', function() {
    var validator = new Validator({
      name: 'alpha'
    });
    expect(validator.fails({
      name: '12'
    })).to.be.true;
    expect(validator.passes({
      name: '12'
    })).to.be.false;
  });

  it('should fail with non-alphabetic characters', function() {
    var validator = new Validator({
      name: 'alpha'
    });
    expect(validator.fails({
      name: 12
    })).to.be.true;
    expect(validator.passes({
      name: 12
    })).to.be.false;
  });

  it('should pass with only alphabetic characters', function() {
    var validator = new Validator({
      name: 'alpha'
    });
    expect(validator.fails({
      name: 'abc'
    })).to.be.false;
    expect(validator.passes({
      name: 'abc'
    })).to.be.true;
  });

  it('should pass when the field is an empty string', function() {
    var validator = new Validator({
      name: 'alpha'
    });
    expect(validator.passes({
      name: ''
    })).to.be.true;
  });

  it('should pass when the field does not exist', function() {
    var validator = new Validator({
      name: 'alpha'
    });
    expect(validator.passes({})).to.be.true;
    expect(validator.fails({})).to.be.false;
  });
});
