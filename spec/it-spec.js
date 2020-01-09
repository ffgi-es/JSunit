(function() {
  const it = require('../lib/it.js').it;

  function SuiteDouble() {
    this.tests = [];
  }
  SuiteDouble.prototype.addTest = function(test) {
    this.tests.push(test);
  }

  function TestException(message) {
    const error = new Error(message);
    this.name = "TestException";
    this.message = message;
    this.stack = error.stack;
  }
  TestException.prototype = Object.create(Error.prototype);

  (function testItAddsTest() {
    const suite = new SuiteDouble();

    it(suite, 'TestException', "This passes", function() {
    });

    if (suite.tests.length === 0)
      throw new Error('No tests added to the suite');
    if (suite.tests.length > 1)
      throw new Error('Too many tests added to the suite');
    if (suite.tests[0].description !== "This passes")
      throw new Error(`incorrect description: '${suite.tests[0].description}' not 'This passes'`);
    if (typeof suite.tests[0].test !== 'function')
      throw new Error(`test ${suite.tests[0].test} is not a function`);

    console.log('Adding tests to suite passed');
  })();

  (function testItReturnsTrueForPass() {
    const suite = new SuiteDouble();

    it(suite, 'TestException', "This passes", function() {
    });

    result = suite.tests[0].run();

    if (result[0] !== true)
      throw new Error('Passing test should return true');

    console.log('Tests return [true] when passing passed');
  })();

  (function testItReturnsFalseAndMessageForFail() {
    const suite = new SuiteDouble();

    it(suite, 'TestException', "This fails", function() {
      throw new TestException('This is the problem');
    });

    result = suite.tests[0].run();

    if (result[0] !== false)
      throw new Error('Failing test should return false');
    if (result[1] !== 'This is the problem')
      throw new Error('Should return the error message');

    console.log('Tests return false and error message passed');
  })();

  (function testLetsOtherErrorsThrough() {
    const suite = new SuiteDouble();

    it(suite, 'TestException', "This fails", function() {
      throw new Error('This should be let through');
    });

    let errorCaught = false;
    try {
      result = suite.tests[0].run();
      throw new Error('Error has not been let through');
    } catch (ex) {
      if (ex.message !== 'This should be let through')
        throw ex;
    }

    console.log('Letting other error through passed');
  })();
})();
