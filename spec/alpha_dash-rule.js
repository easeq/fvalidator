if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('alpha_dash validation rule', function() {
  it('should fail with non alpha dash characters', function() {
    var validator = new Validator({
      name: 'alpha_dash'
    });
    expect(validator.passes({
      name: 'David *'
    })).to.be.false;
    expect(validator.fails({
      name: 'David *'
    })).to.be.true;
  });

  it('should fail with non-alphabetic characters', function() {
    var validator = new Validator({
      name: 'alpha_dash'
    });
    expect(validator.fails({
      name: 12
    })).to.be.false;
    expect(validator.passes({
      name: 12
    })).to.be.true;
  });

  it('should pass with only alpha dash characters', function() {
    var validator = new Validator({
      name: 'alpha_dash'
    });
    expect(validator.passes({
      name: 'David9_-'
    })).to.be.true;
    expect(validator.fails({
      name: 'David9_-'
    })).to.be.false;
  });

  it('should pass when the field is blank / optional', function() {
    var validator = new Validator({
      name: 'alpha_dash'
    });
    expect(validator.passes({
      name: ''
    })).to.be.true;
  });

  it('should pass when the field does not exist', function() {
    var validator = new Validator({
      name: 'alpha_dash'
    });
    expect(validator.passes({})).to.be.true;
    expect(validator.fails({})).to.be.false;
  });
});
