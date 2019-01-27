if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('require validation pass rules', function() {
  it('should pass with non-empty strings', function() {
    var validator = new Validator({
      name: 'required'
    });
    expect(validator.passes({
      name: 'David'
    })).to.be.true;
  });

  it('should fail with empty strings', function() {
    var validator = new Validator({
      email: 'required'
    });
    expect(validator.fails({
      email: ''
    })).to.be.true;
  });

  it('should fail with strings containing only white space', function() {
    var validator = new Validator({
      name: 'required'
    });
    expect(validator.fails({
      name: '      	'
    })).to.be.true;
  });

  it('should fail when a value is equal to undefined', function() {
    var validator = new Validator({
      name: 'required'
    });
    expect(validator.fails({
      name: undefined
    })).to.be.true;
  });

  it('should fail when a value is equal to null', function() {
    var validator = new Validator({
      name: 'required'
    });
    expect(validator.fails({
      name: null
    })).to.be.true;
  });

  it('should pass when a value is numeric', function() {
    var validator = new Validator({
      age: 'required'
    });
    expect(validator.passes({
      age: 29
    })).to.be.true;
  });

  it('should fail when the attribute is not passed in', function() {
    var validator = new Validator({
      email: 'required'
    });
    expect(validator.fails({})).to.be.true;
    expect(validator.passes({})).to.be.false;
  });

  it('should fail when the array is empty', function() {
    var validator = new Validator({
      users: 'required|array'
    });
    expect(validator.fails({
      users: []
    })).to.be.true;
    expect(validator.passes({
      users: []
    })).to.be.false;
  });

  it('should not fail when not an empty array', function() {
    var validator = new Validator({
      users: 'required|array'
    });
    expect(validator.passes({
      users: [false]
    })).to.be.true;
    expect(validator.fails({
      users: [false]
    })).to.be.false;
  });
});
