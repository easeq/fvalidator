if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('accepted validation rule', function() {
  it('should pass if the value is yes', function() {
    var validator = new Validator({
      terms: 'accepted'
    });
    expect(validator.passes({
      terms: 'yes'
    })).to.be.true;
    expect(validator.fails({
      terms: 'yes'
    })).to.be.false;
  });

  it('should pass if the value is on', function() {
    var validator = new Validator({
      terms: 'accepted'
    });
    expect(validator.passes({
      terms: 'on'
    })).to.be.true;
    expect(validator.fails({
      terms: 'on'
    })).to.be.false
  });

  it('should pass if the value is the number 1', function() {
    var validator = new Validator({
      terms: 'accepted'
    });
    expect(validator.passes({
      terms: 1
    })).to.be.true;
    expect(validator.fails({
      terms: 1
    })).to.be.false;
  });

  it('should pass if the value is the string 1', function() {
    var validator = new Validator({
      terms: 'accepted'
    });
    expect(validator.passes({
      terms: '1'
    })).to.be.true;
    expect(validator.fails({
      terms: '1'
    })).to.be.false;
  });

  it('should pass if the value is a boolean true', function() {
    var validator = new Validator({
      terms: 'accepted'
    });
    expect(validator.passes({
      terms: true
    })).to.be.true;
    expect(validator.fails({
      terms: true
    })).to.be.false;
  });

  it('should fail if the value is not 1, on, or yes', function() {
    var validator = new Validator({
      terms: 'accepted'
    });
    expect(validator.passes({
      terms: '10'
    })).to.be.false;
    expect(validator.fails({
      terms: '10'
    })).to.be.true;
  });

  it('should fail if the value is an empty string', function() {
    var validator = new Validator({
      terms: 'accepted'
    });
    expect(validator.passes({
      terms: ''
    })).to.be.false;
    expect(validator.fails({
      terms: ''
    })).to.be.true;
  });

  it('should fail if the value is undefined', function() {
    var validator = new Validator({
      terms: 'accepted'
    });
    expect(validator.passes({})).to.be.false;
    expect(validator.fails({})).to.be.true;
  });
});
