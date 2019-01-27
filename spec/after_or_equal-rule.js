if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('after or equal rule', function() {
  it('should fail when the comparing attribute are greather', function() {
    var validator = new Validator({
      date2: 'after_or_equal:date'
    });

    expect(validator.fails({
      date: '1996-12-09',
      date2: '1995-08-09',
    })).to.be.true;
    expect(validator.passes({
      date: '1996-12-09',
      date2: '1995-08-09',
    })).to.be.false;
    expect(validator.errors.first('date2')).to.equal('The date2 must be equal or after date.');
  });

  it('should pass when the comparing attribute are equal', function() {
    var validator = new Validator({
      date2: 'after_or_equal:date'
    });

    expect(validator.fails({
      date: '1995-08-09',
      date2: '1995-08-09',
    })).to.be.false;
    expect(validator.passes({
      date: '1995-08-09',
      date2: '1995-08-09',
    })).to.be.true;
  
  });

  it('should pass when the comparing attribute are smaller', function() {
    var validator = new Validator({
      date2: 'after_or_equal:date'
    });

    expect(validator.fails({
      date: '1995-08-09',
      date2: '1996-12-09',
    })).to.be.false;
    expect(validator.passes({
      date: '1995-08-09',
      date2: '1996-12-09',
    })).to.be.true;
  });
});
