(function(exports) {
  function Test(exception, description, testFunc) {
    this.description = description;
    this.test = function() {
      try {
        testFunc();
      } catch (ex) {
        if (ex.name !== exception) throw ex;
        return [false, ex.message];
      }
      return [true];
    }
  }
  Test.prototype.run = function() {
    return this.test();
  }

  function it(suite, exception, description, testFunc) {
    suite.addTest(new Test(exception, description, testFunc));
  }

  exports.it = it;
})(this);
