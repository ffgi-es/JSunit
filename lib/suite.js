(function(exports) {
  function Context(desciption, parentContext) {
    this.description = desciption;
    this.parentContext = parentContext;
  };

  function Suite() {
    this.tests = [];
  };

  Suite.prototype.addContext = function(description) {
    this.currContext = new Context(description, this.currContext);
    return this.currContext;
  };

  Suite.prototype.exitContext = function() {
    this.currContext = this.currContext.parentContext;
    return this.currContext;
  }

  Suite.prototype.addTest = function(test) {
    test.context = this.currContext;
    this.tests.push(test);
  }

  Suite.prototype.run = function() {
    let failures = [];
    this.tests.forEach(test => {
      const result = test.run();
      if (!result[0]) failures.push(failure(test.context, test.description, result[1]));
    });

    let report = failures.reduce((rep, fail) => {return rep + fail;}, "");

    report += `${this.tests.length} tests run | ${failures.length} failure`;

    return report;
  }

  function failure(context, description, message) {
    return `${fullDescription(context)} ${description}:\n  ${message}\n\n`;
  };

  function fullDescription(context) {
    if (context.parentContext) return `${fullDescription(context.parentContext)} ${context.description}`;
    return context.description;
  }

  exports.Suite = Suite;
})(this);
