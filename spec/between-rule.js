if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('between rule', function() {
  it('should pass between rule when 25 and between 18 - 30', function() {
    var validator = new Validator({
      num: 'between:18,30'
    });
    expect(validator.passes({
      num: 25
    })).to.be.true;
    expect(validator.fails({
      num: 25
    })).to.be.false;
  });

  it('should pass between rule when 25 and between 25 - 30', function() {
    var validator = new Validator({
      num: 'between:25,30'
    });
    expect(validator.passes({
      num: 25
    })).to.be.true;
    expect(validator.fails({
      num: 25
    })).to.be.false;
  });

  it('should fail on string 25 when between is set to 25 - 30', function() {
    var validator = new Validator({
      num: 'between:25,30'
    });
    expect(validator.passes({
      num: '25'
    })).to.be.false;
    expect(validator.fails({
      num: '25'
    })).to.be.true;
  });

  it('should pass on string 25 when between is set to 2 - 3', function() {
    var validator = new Validator({
      num: 'between:2,3'
    });
    expect(validator.passes({
      num: '25'
    })).to.be.true;
    expect(validator.fails({
      num: '25'
    })).to.be.false;
  });

  it('should threat string 25 as numeric when other numeric rules are set and pass when between is set to 25 - 30', function() {
    var validator = new Validator({
      num: 'between:25,30|numeric'
    });
    expect(validator.passes({
      num: '25'
    })).to.be.true;
    expect(validator.fails({
      num: '25'
    })).to.be.false;
  });

  it('should support floats', function() {
    var validator = new Validator({
      num1: 'between:25.11,25.13',
      num2: 'between:0.02,0.04'
    });
    expect(validator.passes({
      num1: 25.12,
      num2: 0.03
    })).to.be.true;
    expect(validator.fails({
      num1: 25.12,
      num2: 0.03
    })).to.be.false;
  });

  it('should support unsigned', function() {
    var validator = new Validator({
      num: 'between:-4,-2'
    });
    expect(validator.passes({
      num: -3
    })).to.be.true;
    expect(validator.fails({
      num: -3
    })).to.be.false;
  });

  it('should support array', function() {
    var validator = new Validator({
      array2: 'required|between:1,2'
    });
    expect(validator.passes({
      array2: ['a', 'b']
    })).to.be.true;
    expect(validator.fails({
      array2: ['a', 'b']
    })).to.be.false;
  });

  it('should generate proper error message', function() {
    var validator = new Validator({
      num: 'between:16,23'
    });
    expect(validator.fails({
      num: '14'
    })).to.be.true;
    expect(validator.errors.first('num')).to.equal('The num field must be between 16 and 23.');
  });

  it('should fail when passed invalid values', function() {
    var validator = new Validator({
      numNull: 'between:25,30',
      numUndefined: 'between:25,30',
      numEmpty: 'between:25,30',
      numOutOfBounds: 'between:25,30',
      numOutOfBoundsUnsigned: 'between:-35,150',
    });
    expect(validator.fails({
      numNull: null,
      numUndefined: undefined,
      numEmpty: '',
      numOutOfBounds: 24,
      numOutOfBoundsUnsigned: -34
    })).to.be.true;
    expect(validator.passes({
      numNull: null,
      numUndefined: undefined,
      numEmpty: '',
      numOutOfBounds: 24,
      numOutOfBoundsUnsigned: -34
    })).to.be.false;
  });
});
