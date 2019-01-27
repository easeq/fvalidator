if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('required without', function() {
  it('should fail', function() {
    var validator = new Validator({
      flavour: 'required_without:desert.second'
    });
    expect(validator.fails({
      desert: {
        first: 'icecream'
      },
      flavour: ''
    })).to.be.true;
    expect(validator.passes({
      desert: {
        first: 'icecream'
      },
      flavour: ''
    })).to.be.false;
    expect(validator.errors.first('flavour')).to.equal('The flavour field is required when desert.second is empty.');
  });

  it('should pass', function() {
    var validator = new Validator({
      flavour: 'required_without:desert.second'
    });
    expect(validator.passes({
      desert: {
        first: 'icecream',
        second: 'icecream'
      },
      flavour: ''
    })).to.be.true;
    expect(validator.fails({
      desert: {
        first: 'icecream',
        second: 'icecream'
      },
      flavour: ''
    })).to.be.false;
  });

});
