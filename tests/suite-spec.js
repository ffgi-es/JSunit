(function() {
  const Suite = require('../lib/suite.js').Suite;
  console.log('Testing Suite');

  (function testAddContext() {
    const suite = new Suite();

    let currContext = suite.addContext('Test Context Description');

    if (currContext.description !== "Test Context Description")
      throw new Error(`Incorrect description '${currContext.description}' not 'Test Context Description'`);
    if (currContext.parentContext !== undefined)
      throw new Error('Base context should not have a parent context');

    let oldContext = currContext;

    currContext = suite.addContext('Inner Context Description');

    if (currContext.description !== 'Inner Context Description')
      throw new Error(`Incorrect description '${currContext.description}' not 'Inner Context Description'`);
    if (currContext.parentContext !== oldContext)
      throw new Error(`Incorrect parent context '${currContext.parentContext}' not '${oldContext}'`);

    console.log('--addContext tests passed');
  })();

  (function testExitContext() {
    const suite = new Suite();

    const targetContext = suite.addContext('Outer Context');
    suite.addContext('Inner Context');

    let currContext = suite.exitContext();

    if (currContext !== targetContext)
      throw new Error('Not the correct context upon exiting inner context');

    currContext = suite.exitContext();

    if (currContext !== undefined)
      throw new Error('There should be no context upon exiting outer context');

    console.log('--exitContext tests passed');
  })();

  (function testAddTestAndRun() {
    const suite = new Suite();

    let testOneCounter = 0;
    const testOne = {
      description: "Test One",
      run: function() {
        testOneCounter++;
        return [true];
      }
    };

    let testTwoCounter = 0;
    const testTwo = {
      description: "Test Two",
      run: function() {
        testTwoCounter++;
        return [false, "Error Message"];
      }
    }

    suite.addContext("Outer Context");
    const testOneContext = suite.addContext("Test One Context");

    suite.addTest(testOne);

    suite.exitContext();
    const testTwoContext = suite.addContext("Test Two Context");

    suite.addTest(testTwo);

    suite.exitContext();
    suite.exitContext();

    if (testOneCounter !== 0)
      throw new Error('Test One run too early');
    if (testTwoCounter !== 0)
      throw new Error('Test Two run too early');

    if (testOne.context !== testOneContext)
      throw new Error('Test One not given the correct context');
    if (testTwo.context !== testTwoContext)
      throw new Error('Test Two not given the correct context');

    const report = suite.run();

    if (testOneCounter !== 1)
      throw new Error(`Test One run ${testOneCounter} times`);
    if (testTwoCounter !== 1)
      throw new Error(`Test Two run ${testTwoCounter} times`);

    const string = "Outer Context Test Two Context Test Two:\n  Error Message\n\n2 tests run | 1 failure"

    if (report !== string)
      throw new Error(`Incorrect Report:\n\n${report}\n\ninstead of:\n\n${string}\n\n`);

    console.log('--addTest tests passed');
  })();

  console.log('All Suite tests passed');
})();
