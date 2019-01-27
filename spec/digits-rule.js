if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('digits rule', function() {
  it('should be numeric and must have an exact length of 5', function() {
    var validation = new Validator({
      zip: 'digits:5'
    });

    expect(validation.passes({
      zip: '90989'
    })).to.be.true;
    expect(validation.fails({
      zip: '90989'
    })).to.be.false;
  });

  it('should not pass if non-digits are present', function() {
    var validation = new Validator({
      zip: 'digits:5'
    });

    expect(validation.fails({
      zip: '9098a'
    })).to.be.true;
    expect(validation.errors.first('zip')).to.equal('The zip must be 5 digits.');
    expect(validation.passes({
      zip: '9098a'
    })).to.be.false;
  });
});
