if (typeof require !== 'undefined') {
  var Validator = require('../src/validator.js');
  var expect = require('chai').expect;
} else {
  var Validator = window.Validator;
  var expect = window.chai.expect;
}

describe('regex validation rule for most common regular expressions', function() {
  it('should pass with the currency pattern: 12,500.00', function() {
    var validator = new Validator({
      currency: 'regex:/^(?!0\\.00)\\d{1,3}(,\\d{3})*(\\.\\d\\d)?$/'
    });
    expect(validator.passes({
      currency: '12,500.00'
    })).to.be.true;
  });

  it('should fail with the currency pattern: 200.0', function() {
    var validator = new Validator({
      currency: 'regex:/^(?!0\\.00)\\d{1,3}(,\\d{3})*(\\.\\d\\d)?$/'
    });
    expect(validator.fails({
      currency: '200.0'
    })).to.be.true;
  });

  it('should pass with the date pattern: 03/11/2015', function() {
    var validator = new Validator({
      pattern: ['regex:/^([1-9]|0[1-9]|[12][0-9]|3[01])\\D([1-9]|0[1-9]|1[012])\\D(19[0-9][0-9]|20[0-9][0-9])$/']
    });
    expect(validator.passes({
      pattern: '03/11/2015'
    })).to.be.true;
  });
  it('should fail with the date pattern: 0311/2015', function() {
    var validator = new Validator({
      pattern: ['regex:/^([1-9]|0[1-9]|[12][0-9]|3[01])\\D([1-9]|0[1-9]|1[012])\\D(19[0-9][0-9]|20[0-9][0-9])$/']
    });
    expect(validator.fails({
      pattern: '0311/2015'
    })).to.be.true;
  });

  it('should pass with the year pattern: 2015', function() {
    var validator = new Validator({
      pattern: ['regex:/^(19|20)[\\d]{2,2}$/']
    });
    expect(validator.passes({
      pattern: '2015'
    })).to.be.true;
  });
  it('should fail with the year pattern:: 20151', function() {
    var validator = new Validator({
      pattern: ['regex:/^(19|20)[\\d]{2,2}$/']
    });
    expect(validator.fails({
      pattern: '20151'
    })).to.be.true;
  });


  it('should pass with the email pattern: johndoe@gmail.com', function() {
    var validator = new Validator({
      pattern: ['regex:/^(([^<>()[\\]\\\.,;:\\s@\\"]+(\\.[^<>()[\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/']
    });
    expect(validator.passes({
      pattern: 'johndoe@gmail.com'
    })).to.be.true;
  });
  it('should fail with the email pattern: johndoe.gmail.com', function() {
    var validator = new Validator({
      pattern: ['regex:/^(([^<>()[\\]\\\.,;:\\s@\\"]+(\\.[^<>()[\]\\\\.,;:\\s@\\"]+)*)|(\\".+\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/']
    });
    expect(validator.fails({
      pattern: 'johndoe.gmail.com'
    })).to.be.true;
  });

  it('should pass with the url pattern: http://github.com', function() {
    var validator = new Validator({
      pattern: ['regex:/^https?:\\/\\/\\S+/']
    });
    expect(validator.passes({
      pattern: 'http://github.com'
    })).to.be.true;
  });
  it('should fail with the url pattern: http://githubcom', function() {
    var validator = new Validator({
      pattern: ['regex:/^https?:\\/\\/\\S+/']
    });
    expect(validator.fails({
      pattern: 'http:/github.com'
    })).to.be.true;
  });

  it('should pass with the hex pattern: #ff0033', function() {
    var validator = new Validator({
      pattern: ['regex:/^#?([a-f0-9]{6}|[a-f0-9]{3})$/']
    });
    expect(validator.passes({
      pattern: '#ff0033'
    })).to.be.true;
  });
  it('should fail with the hex pattern: #xx9911', function() {
    var validator = new Validator({
      pattern: ['regex:/^#?([a-f0-9]{6}|[a-f0-9]{3})$/']
    });
    expect(validator.fails({
      pattern: '#xx9911'
    })).to.be.true;
  });

  it('should pass with the slug pattern: matching-a-slug-here', function() {
    var validator = new Validator({
      pattern: ['regex:/^[a-z0-9-]+$/']
    });
    expect(validator.passes({
      pattern: 'matching-a-slug-here'
    })).to.be.true;
  });
  it('should fail with the slug pattern: not_matching_here', function() {
    var validator = new Validator({
      pattern: ['regex:/^[a-z0-9-]+$/']
    });
    expect(validator.fails({
      pattern: 'not_matching_here'
    })).to.be.true;
  });

  it('should support the case insensitive flag', function () {
    var validator = new Validator({
      pattern: ['regex:/[a-f]/i']
    });

    expect(validator.passes({
      pattern: 'A'
    })).to.be.true;
  })

  it('should not be case insensitive unless specified', function() {
    var validator = new Validator({
      pattern: ['regex:/[a-f]/']
    });

    expect(validator.fails({
      pattern: 'A'
    })).to.be.true;
  });

  it('should pass with the string: 12-500.00A', function() {
    var validator = new Validator({
      pattern: ['regex:/^[A-Za-z0-9_\\-\\.]+$/']
    });
    expect(validator.passes({
      pattern: '12-500.00A'
    })).to.be.true;
  });

  it('should fail with the string: 12-500.00/A', function() {
    var validator = new Validator({
      pattern: ['regex:/^[A-Za-z0-9_\\-\\.]+$/']
    });
    expect(validator.fails({
      pattern: '12-500.00/A'
    })).to.be.true;
  });

  it('should pass with the string: 12.500', function() {
    var validator = new Validator({
      pattern: ['regex:/^[A-Za-z0-9_\\-\\.]+$/i']
    });
    expect(validator.passes({
      pattern: '12.500'
    })).to.be.true;
  });

  it('should fail with the string: 12.500,00', function() {
    var validator = new Validator({
      pattern: ['regex:/^[A-Za-z0-9_\\-\\.]+$/i']
    });
    expect(validator.fails({
      pattern: '12.500,00'
    })).to.be.true;
  });

  it('should pass with the number: 12.500', function() {
    var validator = new Validator({
      pattern: ['regex:/^[A-Za-z0-9_\\-\\.]+$/i']
    });
    expect(validator.passes({
      pattern: 12.500
    })).to.be.true;
  });

  it('should fail with the number: -12.500', function() {
    var validator = new Validator({
      pattern: ['regex:/^[A-Za-z0-9_\\.]+$/i']
    });
    expect(validator.fails({
      pattern: -12.500
    })).to.be.true;
  });

  it('should pass with the number: 999', function() {
    var validator = new Validator({
      pattern: ['regex:/^[A-Za-z0-9_\\-\\.]+$/i']
    });
    expect(validator.passes({
      pattern: 999
    })).to.be.true;
  });

});
