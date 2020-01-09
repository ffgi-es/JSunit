(function(exports) {
  function describe(suite, description, contextFunc) {
    suite.addContext(description);
    contextFunc();
    suite.exitContext();
  };

  exports.describe = describe;
})(this);
