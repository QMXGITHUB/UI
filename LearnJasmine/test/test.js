describe("A suite for value", function() {
  it(“The ‘toBe’ matcher compares with ‘===' ", function() {
    expect(true).toBe(true);
  });

  it(“variables declared in describe are available to any it block inside the suite", function() {
    expect(a).toBe(true);
  });

  it(“chaining the call to ‘expect' with a ‘not' before calling the matcher", function() {
    expect(false).not.toBe(true);
  });

  it(“toEqual should work for object", function() {
      var foo = {
        a: 12,
        b: 34
      };
      var bar = {
        a: 12,  
        b: 34
      };
      expect(foo).toEqual(bar);
  });

  it("The 'toMatch' matcher is for regular expressions", function() {
    var message = "foo bar baz";

    expect(message).toMatch(/bar/);
    expect(message).toMatch("bar");
    expect(message).not.toMatch(/quux/);

  });

  it("The ‘toBeDefined’, ’toBeUndefined’, ’toBeNull' matcher", function() {
    var a = 1;
    expect(a).toBeDefined();
    expect(b).toBeUndefined();
    expect(null).toBeNull();
  });

  it("The ‘toBeTruthy’, ’toBeFalsy' matcher are for boolean casting testing", function() {
    expect(true).toBeTruthy();
    expect(false).toBeFalsy();
  });

  it("The 'toContain' matcher is for finding an item in an Array", function() {
    var a = ["foo", "bar", "baz"];

    expect(a).toContain("bar");
    expect(a).not.toContain("quux");

  });

  it("The ‘toBeLessThan’, ’toBeGreaterThan' matcher are for mathematical comparisons", function() {
    var pi = 3.1415926, e = 2.78;
    expect(e).toBeLessThan(pi);
    expect(pi).toBeGreaterThan(e);
  });

  it("The 'toBeCloseTo' matcher is for precision math comparison", function() {
    var pi = 3.1415926, e = 2.78;
    expect(pi).toBeCloseTo(e, 0);

  });
});

describe("variable in same suite different spec", function(){
  var definedInSuit = true;
  it("variable declared in the describe, can be used in any it block", function(){
      expect(definedInSuit).toBeTruthy();
      definedInSuit = false;
  });
  it("variable will be effect each other when changed by last test", function(){
      expect(definedInSuit).toBeFalsy();
  });
});

describe("A suite for test function called or not, success or fail", function() {

  describe("A spec using the fail()", function() {
    var foo = function(x, callBack) {
      if (x) {
        callBack();
      }
    };

    it("should not call the callBack", function() {
      foo(false, function() {
        fail("Callback has been called");
      });
    });
  }); 

  describe("verify function throw exception", function(){
    it("The 'toThrow' matcher is for testing if a function throws an exception", function() {
      var foo = function() {
        return 1 + 2;
      };
      var bar = function() {
        return a + 1;
      };

      expect(foo).not.toThrow();
      expect(bar).toThrow();
    });

    it("The 'toThrowError' matcher is for testing a specific thrown exception", function() {
      var foo = function() {
        throw new TypeError("foo bar baz");
      };

      expect(foo).toThrowError("foo bar baz");
      expect(foo).toThrowError(/bar/);
      expect(foo).toThrowError(TypeError);
      expect(foo).toThrowError(TypeError, "foo bar baz");
    });
  });
});

describe("DRY any duplicate setup and teardown code", function(){

  describe("beforeEach and afterEach", function(){
    var definedInSuit = 0;
    beforeEach(function(){
      definedInSuit += 1;
    });
    afterEach(function(){
      definedInSuit = 0;
    });
    
    it("should use variable beforeEach set", function(){
      expect(definedInSuit).toEqual(1);
      definedInSuit =37;
    });

    it("should variable be cleared by afterEach and set by beforeEach", function(){
      expect(definedInSuit).toEqual(1);
    });
  });

})



