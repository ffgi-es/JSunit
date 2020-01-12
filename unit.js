(function() {
  const Suite = require('./lib/suite.js').Suite;

  const rawDescribe = require('./lib/describe.js').describe;
  const rawIt = require('./lib/it.js').it;

  const rawExpect = require('./lib/expect.js').expect;

  const suite = new Suite();

  const context = {
    describe: rawDescribe.bind(null, suite),
    it: rawIt.bind(null, suite, "ExpectationFailure"),
    expect: rawExpect
  };

  const path = require('path');
  const fs = require('fs');
  const vm = require('vm');

  const directoryPath = path.join(__dirname, 'spec');
  vm.createContext(context);

  fs.readdirSync(directoryPath).forEach(function(file) {
    const data = fs.readFileSync(`./spec/${file}`);
    const script = new vm.Script(data);
    script.runInContext(context);
  });

  const report = suite.run();

  console.log(report);
})();
