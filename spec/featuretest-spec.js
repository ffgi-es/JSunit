describe("Outer context", function() {
  describe("Inner context", function() {
    it("should pass", function() {
      expect("Hello").toEqual("Hello");
    });
    it("should fail", function() {
      expect("Help").toEqual("Hell");
    });
  });
  describe("Second inner context", function() {
    it("should pass again", function() {
      expect(1 + 1).toEqual(2);
    });
    it("should fail again", function() {
      expect(5).toEqual(3);
    });
  });
});
