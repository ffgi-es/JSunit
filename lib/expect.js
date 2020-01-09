(function(exports) {
  function ExpectationFailure(message) {
    const error = new Error(message);
    this.name = 'ExpectationFailure';
    this.message = message;
    this.stack = error.stack;
  }
  ExpectationFailure.prototype = Object.create(Error.prototype);

  function Expectation(expected) {
    this.expected = expected;
  }
  Expectation.prototype.toEqual = function(value) {
    if (this.expected !== value)
      throw new ExpectationFailure(`expected ${value} to equal ${this.expected}`);
  }

  function expect(num) {
    return new Expectation(num);
  };

  exports.expect = expect;
})(this);
