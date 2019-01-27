if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('required without all', function() {
  it('should fail', function() {
    var validator = new Validator({
      flavour: 'required_without_all:desert.first,desert.second'
    });
    expect(validator.fails({
      flavour: ''
    })).to.be.true;
    expect(validator.passes({
      flavour: ''
    })).to.be.false;
    expect(validator.errors.first('flavour')).to.equal('The flavour field is required when desert.first, desert.second are empty.');
  });

  it('should pass', function() {
    var validator = new Validator({
      flavour: 'required_without_all:desert.first,desert.second'
    });
    expect(validator.passes({
      flavour: 'chocolate'
    })).to.be.true;
    expect(validator.fails({
      flavour: 'chocolate'
    })).to.be.false;
  });

  it('should pass (not all required field are set)', function() {
    var validator = new Validator({
      flavour: 'required_without_all:desert.first,desert.second'
    });
    expect(validator.passes({
      desert: {
        first: 'icecream',
      },
      flavour: ''
    })).to.be.true;
    expect(validator.fails({
      desert: {
        first: 'icecream',
      },
      flavour: ''
    })).to.be.false;
  });

});
