# JSunit

## Installation

Requires Node.js

copy the `lib` files to a `lib` folder in your project.
copy the `unit.js` file to the root folder of your project.

## Usage

Tests must be saved in a `spec` folder at the root of your project. An example
spec file is below:

`spec/testAddition.js`
```
describe("Addition", function() {
  describe("Adding positive numbers", function() {
    it("Should return 4", function() {
      expect(2 + 2).toEqual(4);
    });

    it("Should return 3", function() {
      expect(1 + 3).toEqual(3); //this is wrong so should fail
    });
  });

  describe("Adding negative numbers", function() {
    it("should return 3", function() {
      expect(5 + (-2)).toEqual(3);
    });

    it("should return 4", function() {
      expect(7 + (-4)).toEqual(4); //this is wrong so should fail
    });
  });
});
```

To run the tests, use the runner script `unit.js` like so:
```
> node unit.js
```

For the above test file you should get the following report:

```
Addition Adding positive numbers Should return 3:
  Expected 4 to equal 3;

Addition Adding negative numbers should return 4:
  Expected 3 to equal 4;

4 tests run | 2 failure
```
