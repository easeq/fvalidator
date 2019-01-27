if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('max validation rule', function() {
  it('should fail with the name "David". Maximum size is 3 letters.', function() {
    var validator = new Validator({
      name: 'max:3'
    });
    expect(validator.passes({
      name: 'David'
    })).to.be.false;
  });

  it('should pass with the name "David". Maximum size is 5 letters.', function() {
    var validator = new Validator({
      name: 'max:5'
    });
    expect(validator.passes({
      name: 'Da'
    })).to.be.true;
  });

  it('should fail with the age "18". Max is 12.', function() {
    var validator = new Validator({
      age: 'max:12'
    });
    expect(validator.fails({
      age: 18
    })).to.be.true;
  });

  it('should pass with the age "12". Max is 12.', function() {
    var validator = new Validator({
      age: 'max:12'
    });
    expect(validator.passes({
      age: 12
    })).to.be.true;
  });

  it('should fail with boolean true value', function() {
    var validator = new Validator({
      val: 'max:5'
    });
    expect(validator.fails({
      val: true
    })).to.be.true;
  });

  it('should fail with boolean false value', function() {
    var validator = new Validator({
      val: 'max:5'
    });
    expect(validator.fails({
      val: false
    })).to.be.true;
  });

  it('should pass when the age is 0', function() {
    var validator = new Validator({
      age: 'max:2'
    });
    expect(validator.passes({
      age: 0
    })).to.be.true;
    expect(validator.fails({
      age: 0
    })).to.be.false;
  });

  it('should pass when the field is an empty string', function() {
    var validator = new Validator({
      email: 'max:2'
    });
    expect(validator.passes({
      email: ''
    })).to.be.true;
    expect(validator.fails({
      email: ''
    })).to.be.false;
  });

  it('should pass when the field does not exist', function() {
    var validator = new Validator({
      email: 'max:2'
    });
    expect(validator.passes({})).to.be.true;
    expect(validator.fails({})).to.be.false;
  });

  it('should fail when given string-integer value', function() {
    var validator = new Validator({
      val: 'integer|max:16'
    });
    expect(validator.passes({
      val: '18'
    })).to.be.false;
  });

  it('should fail when given string-float value', function() {
    var validator = new Validator({
      val: 'numeric|max:17.5'
    });
    expect(validator.passes({
      val: '17.56'
    })).to.be.false;
  });
});
