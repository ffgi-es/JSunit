(function() {
  const describe = require('../lib/describe.js').describe;

  function SuiteDouble() {
    this.contexts = [];
    this.exitContextCounter = 0;
  }
  SuiteDouble.prototype.addContext = function(description) {
    this.contexts.push(description);
  };
  SuiteDouble.prototype.exitContext = function() {
    this.exitContextCounter++
  };

  (function testAddsContext() {
    const suite = new SuiteDouble();

    describe(suite, 'Hello', function() {});

    if (suite.contexts.length === 0)
      throw new Error('No contexted added');
    if (suite.contexts.length > 1)
      throw new Error('More than one context added');

    console.log('Adding context passed');
  })();

  (function testExitsContext() {
    const suite = new SuiteDouble();

    describe(suite, 'Goodbye', function() {});

    if (suite.exitContextCounter === 0)
      throw new Error('Did not exit context');
    if (suite.exitContextCounter > 1)
      throw new Error('Exited more than one context');

    console.log('Exiting context passed');
  })();

  (function testRunsContextCode() {
    const suite = new SuiteDouble();
    let runCounter = 0;

    describe(suite, 'Run this', function() {
      runCounter++;
    });

    if (runCounter === 0)
      throw new Error('Did not run context');
    if (runCounter > 1)
      throw new Error('Ran context more than once');

    console.log('Context code executed passed');
  })();

  (function testRunsCodeInsideContext() {
    const suite = new SuiteDouble();

    describe(suite, 'In the correct order', function() {
      if (suite.contexts.length !== 1)
        throw new Error('Context has not been added before execution');
      if (suite.exitContextCounter > 0)
        throw new Error('Context has been exited before execution');
    });

    console.log('Execute order passed');
  })();
})();
