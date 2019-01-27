if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('in validation rule', function() {
  it('should fail when the value is not in the set of comma separated values', function() {
    var validator = new Validator({
      state: 'in:CA,TX,FL'
    });
    expect(validator.passes({
      state: 'fakeState',
    })).to.be.false;
    expect(validator.fails({
      state: 'fakeState',
    })).to.be.true;
    expect(validator.errors.first('state')).to.equal('The selected state is invalid.');
  });

  it('should pass when the value is in the set of comma separated values', function() {
    var validator = new Validator({
      state: 'in:CA,TX,FL'
    });
    expect(validator.passes({
      state: 'CA'
    })).to.be.true;
    expect(validator.fails({
      state: 'CA'
    })).to.be.false;
  });

  it('should pass when the value is undefined', function() {
    var validator = new Validator({
      state: 'in:CA,TX,FL'
    });
    expect(validator.passes({})).to.be.true;
    expect(validator.fails({})).to.be.false;
  });

  it('should pass when the value is an empty string', function() {
    var validator = new Validator({
      state: 'in:CA,TX,FL'
    });
    expect(validator.passes({
      state: ''
    })).to.be.true;
    expect(validator.fails({
      state: ''
    })).to.be.false;
  });

  it('should fail when the numeric value is not in the set of comma separated values', function() {
    var validator = new Validator({
      quantity: 'in:0,1,2'
    });
    expect(validator.passes({
      quantity: 10
    })).to.be.false;
    expect(validator.fails({
      quantity: 10
    })).to.be.true;
    expect(validator.errors.first('quantity')).to.equal('The selected quantity is invalid.');
  });

  it('should pass when the value is in the set of comma separated values', function() {
    var validator = new Validator({
      quantity: 'in:0,1,2'
    });
    expect(validator.passes({
      quantity: 1
    })).to.be.true;
    expect(validator.fails({
      quantity: 1
    })).to.be.false;
  });

  it('should pass when all values are present', function() {
    var validator = new Validator({
      fruits: 'array|in:apple,strawberry,kiwi'
    });

    expect(validator.passes({
      fruits: ['apple', 'strawberry']
    })).to.be.true;
  });

  it('should fail when not all values are present', function() {
    var validator = new Validator({
      fruits: 'array|in:apple,strawberry'
    });

    expect(validator.passes({
      fruits: ['strawberry', 'kiwi']
    })).to.be.false;
  });
});
