(function() {
  const expect = require('../lib/expect.js').expect;

  (function testEqualsPass() {
    try {
      expect(1).toEqual(1);
      console.log("test toEqual pass: passed");
    } catch (ex) {
      if (ex.name === "ExpectationFailure")
        throw new Error("expect should not have failed");
      else
        throw ex;
    }
  })();

  (function testEqualsFail() {
    try {
      expect(1).toEqual(3);
      throw new Error("expect should have failed");
    } catch (ex) {
      if (ex.name !== "ExpectationFailure")
        throw ex;
      console.log("test toEqual fail: passed");
    }
  })();
})();
