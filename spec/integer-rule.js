if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('integer pass rules', function() {
  it('should pass if no value is entered', function() {
    var validator = new Validator({
      age: 'integer'
    });
    expect(validator.fails({})).to.be.false;
    expect(validator.passes({})).to.be.true;
  });

  it('should pass with an integer value', function() {
    var validator = new Validator({
      age: 'integer'
    });
    expect(validator.fails({
      age: 18
    })).to.be.false;
    expect(validator.passes({
      age: 18
    })).to.be.true;
  });

  it('should pass with a string containing an integer value', function() {
    var validator = new Validator({
      age: 'integer'
    });
    expect(validator.fails({
      age: '18'
    })).to.be.false;
    expect(validator.passes({
      age: '18'
    })).to.be.true;
  });

  it('should pass with unsigned integer', function() {
    var validator = new Validator({
      num: 'integer'
    });
    expect(validator.passes({
      num: -123
    })).to.be.true;
    expect(validator.fails({
      num: -123
    })).to.be.false;
  });

});

describe('integer fail rules', function() {

  it('should fail with a decimal value', function() {
    var validator = new Validator({
      age: 'integer'
    });
    expect(validator.fails({
      age: 18.9
    })).to.be.true;
    expect(validator.passes({
      age: 18.9
    })).to.be.false;
    expect(validator.errors.first('age')).to.equal('The age must be an integer.')
  });

  it('should fail with a string value containing numbers and letters', function() {
    var validator = new Validator({
      age: 'integer'
    });
    expect(validator.fails({
      age: '18d'
    })).to.be.true;
    expect(validator.passes({
      age: '18d'
    })).to.be.false;
    expect(validator.errors.first('age')).to.equal('The age must be an integer.')
  });

  it('should fail with a boolean true value', function() {
    var validator = new Validator({
      age: 'integer'
    });
    expect(validator.fails({
      age: true
    })).to.be.true;
    expect(validator.passes({
      age: true
    })).to.be.false;
  });

  it('should fail with a boolean false value', function() {
    var validator = new Validator({
      age: 'integer'
    });
    expect(validator.fails({
      age: false
    })).to.be.true;
    expect(validator.passes({
      age: false
    })).to.be.false;
  });

  it('should fail if the value is an array', function() {
    var validator = new Validator({
      age: 'required|integer'
    });
    expect(validator.fails({
      age: []
    })).to.be.true;
    expect(validator.passes({
      age: []
    })).to.be.false;
  });

  it('should fail if the value is an object', function() {
    var validator = new Validator({
      age: 'integer'
    });
    expect(validator.fails({
      age: {}
    })).to.be.true;
    expect(validator.passes({
      age: {}
    })).to.be.false;
  });

  it('should fail with unsigned float-integer', function() {
    var validator = new Validator({
      num: 'integer'
    });
    expect(validator.fails({
      num: -70.36
    })).to.be.true;
    expect(validator.passes({
      num: -70.36
    })).to.be.false;
  });
});
