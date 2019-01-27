if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('required unless', function() {
  it('should fail', function() {
    var validator = new Validator({
      flavour: 'required_unless:desert,cake'
    });
    expect(validator.fails({
      desert: 'icecream',
      flavour: ''
    })).to.be.true;
    expect(validator.passes({
      desert: 'icecream',
      flavour: ''
    })).to.be.false;
    expect(validator.errors.first('flavour')).to.equal('The flavour field is required when desert is not cake.');
  });

  it('should pass', function() {
    var validator = new Validator({
      flavour: 'required_unless:desert,cake'
    });
    expect(validator.passes({
      desert: 'icecream',
      flavour: 'chocolate'
    })).to.be.true;
    expect(validator.fails({
      desert: 'icecream',
      flavour: 'chocolate'
    })).to.be.false;
  });
});
