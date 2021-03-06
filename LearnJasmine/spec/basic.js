describe("A suite for value", function() {

  it("The ‘toBe’ matcher compares with ‘===' ", function() {
    expect(true).toBe(true);
  });

  it("chaining the call to ‘expect' with a ‘not' before calling the matcher", function() {
    expect(false).not.toBe(true);
  });

  it("toEqual should work for object", function() {
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

  it("The 'toBeDefined’, 'toBeUndefined', 'toBeNull' matcher", function() {
    var a = {
      foo: "foo"
    };
    expect(a.foo).toBeDefined();
    expect(a.bar).toBeUndefined();
    expect(null).toBeNull();
  });

  it("The 'toBeTruthy', 'toBeFalsy' matcher are for boolean casting testing", function() {
    expect(true).toBeTruthy();
    expect(false).toBeFalsy();
  });

  it("The 'toContain' matcher is for finding an item in an Array", function() {
    var a = ["foo", "bar", "baz"];

    expect(a).toContain("bar");
    expect(a).not.toContain("quux");

  });

  it("The 'toBeLessThan', 'toBeGreaterThan' matcher are for mathematical comparisons", function() {
    var pi = 3.1415926, e = 2.78;
    expect(e).toBeLessThan(pi);
    expect(pi).toBeGreaterThan(e);
  });

  it("The 'toBeCloseTo' matcher is for precision math comparison", function() {
    var pi = 3.1415926, e = 2.78;
    expect(pi).toBeCloseTo(e, 0);

  });
});

describe("The life cycle of variable in different suite different spec", function(){
  var definedInSuit = 37;
  it("variable declared in the describe, can be used in any it block", function(){
      expect(definedInSuit).toBe(37);
      definedInSuit = 99;
  });
  it("variable will be effect each other when changed by last test", function(){
      expect(definedInSuit).toBe(99);
  });
 describe("nested inside a second describe", function() {
    var definedInNestSuit;

    beforeEach(function() {
      definedInNestSuit = 99;
    });

    it("can reference both scopes as needed", function() {
      expect(definedInSuit).toEqual(definedInNestSuit);
    });
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

  describe("A spy without any configure but with all track properties", function() {
    var foo, bar = null;

    beforeEach(function() {
      foo = {
        setBar: function(value) {
          bar = value;
        }
      };
    });

    it("tracks that the spy was called twice", function() {
      spyOn(foo, 'setBar');
      expect(foo.setBar.calls.any()).toEqual(false);
      expect(foo.setBar.calls.count()).toEqual(0);

      foo.setBar(123);
      expect(foo.setBar).toHaveBeenCalled();
      expect(foo.setBar.calls.any()).toEqual(true);

      expect(foo.setBar).toHaveBeenCalledTimes(1);
      expect(foo.setBar.calls.count()).toEqual(1);


      expect(foo.setBar).toHaveBeenCalledWith(123);
      expect(foo.setBar.calls.argsFor(0)).toEqual([123]);

      expect(foo.setBar.calls.first()).toEqual({object: foo, args: [123], returnValue: undefined});
      expect(foo.setBar.calls.all()).toEqual([{object: foo, args: [123], returnValue: undefined}]);

      expect(bar).toBeNull();


      foo.setBar(456, 'baz');
      expect(foo.setBar).toHaveBeenCalled();
      expect(foo.setBar.calls.any()).toBe(true);

      expect(foo.setBar).toHaveBeenCalledTimes(2);
      expect(foo.setBar.calls.count()).toEqual(2);

      expect(foo.setBar).toHaveBeenCalledWith(123);
      expect(foo.setBar.calls.argsFor(0)).toEqual([123]);

      expect(foo.setBar).toHaveBeenCalledWith(456, 'baz');
      expect(foo.setBar.calls.argsFor(1)).toEqual([456, "baz"]);

      expect(foo.setBar.calls.mostRecent()).toEqual({object: foo, args: [456, "baz"], returnValue: undefined});
      expect(foo.setBar.calls.allArgs()).toEqual([[123],[456, "baz"]]);

      expect(bar).toBeNull();


      foo.setBar.calls.reset();
      expect(foo.setBar.calls.any()).toBe(false);
    });

    it("tracks the context of spy called", function() {
      spyOn(foo, "setBar");
      var baz = {
        fn: foo.setBar
      };
      var quux = {
        fn: foo.setBar
      };
      baz.fn(123);
      quux.fn(456);

      expect(foo.setBar.calls.first().object).toBe(baz);
      expect(foo.setBar.calls.mostRecent().object).toBe(quux);
    });
  });

  describe("A spy with configured", function() {
    var foo, bar;

    beforeEach(function() {
      bar = undefined;
      foo = {
        setBar: function(value) {
          bar = value;
        },
        getBar: function() {
          return bar;
        }
      };
    });

    it("when it is call through", function() {
      spyOn(foo, 'getBar').and.callThrough();
      foo.setBar(123);
      var v = foo.getBar();
      expect(foo.getBar).toHaveBeenCalled();
      expect(bar).toEqual(123);
      expect(v).toBe(123);
    });

    it("when it is return value", function() {
      spyOn(foo, "getBar").and.returnValue(745);
      foo.setBar(123);
      var v = foo.getBar();
      expect(foo.getBar).toHaveBeenCalled();
      expect(bar).toEqual(123);
      expect(v).toEqual(745);
    });

    it("when it return a series of values", function() {
      spyOn(foo, "getBar").and.returnValues("fetched first", "fetched second");

      foo.setBar(123);
      var v1 = foo.getBar(123);
      var v2 = foo.getBar(123);
      var v3 = foo.getBar(123);
      expect(foo.getBar).toHaveBeenCalled();
      expect(bar).toEqual(123);
      expect(v1).toEqual("fetched first");
      expect(v2).toEqual("fetched second");
      expect(v3).toBeUndefined();
    });

    it("when configured with an alternate implementation", function() {
      spyOn(foo, "getBar").and.callFake(function() {
        return 1001;
      });

      foo.setBar(123);
      var v = foo.getBar();
      expect(foo.getBar).toHaveBeenCalled();
      expect(bar).toEqual(123);
      expect(v).toEqual(1001);
    });

    it("when configured to throw an error", function() {
      spyOn(foo, "setBar").and.throwError("quux");
      expect(function(){foo.setBar(123)}).toThrowError("quux");
    });

    it("when configured with stub using call through before", function() {
      spyOn(foo, 'setBar').and.callThrough();//must be, before stub
      foo.setBar(123);
      expect(bar).toEqual(123);

      foo.setBar.and.stub();
      bar = null;
 
      foo.setBar(123);
      expect(bar).toBe(null);
    });

    it("when configured with stub using call before", function() {
      spyOn(foo, 'setBar');//must be, before stub
      expect(bar).toBeUndefined();
      foo.setBar.and.stub();
      bar = null;

      foo.setBar(123);
      expect(bar).toBe(null);
    });
  });
});

describe("spy created manually", function() {

  it("only a spy", function() {
    var whatAmI = jasmine.createSpy('IamQ');
    whatAmI("I", "am", "a", "spy");

    expect(whatAmI.and.identity()).toEqual('IamQ');
    expect(whatAmI).toHaveBeenCalled();
    expect(whatAmI.calls.count()).toEqual(1);
    expect(whatAmI).toHaveBeenCalledWith("I", "am", "a", "spy");
    expect(whatAmI.calls.mostRecent().args[0]).toEqual("I");
  });

  it("Multiple spies", function() {
    var tape = jasmine.createSpyObj('tape', ['play', 'pause', 'stop', 'rewind']);

    tape.play();
    tape.pause();
    tape.rewind(0);
    expect(tape.play).toBeDefined();
    expect(tape.pause).toBeDefined();
    expect(tape.stop).toBeDefined();
    expect(tape.rewind).toBeDefined();

    expect(tape.play).toHaveBeenCalled();
    expect(tape.pause).toHaveBeenCalled();
    expect(tape.rewind).toHaveBeenCalled();
    expect(tape.stop).not.toHaveBeenCalled();
  });
});

describe("DRY(prepare before) any duplicate setup and teardown code", function(){

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

  describe("this", function(){
    beforeEach(function(){
      this.definedInBeforeEach = 37;
    });
    
    it("share variable through this between beforeEach, it, afterEach", function(){
      expect(this.definedInBeforeEach).toEqual(37);
      this.definedInIt = 33;
    });

    it("not share variable through this between different it", function(){
      expect(this.definedInBeforeEach).toEqual(37);
      expect(this.definedInIt).toBeUndefined();
    })
  });

  describe("beforeAll and afterAll", function() {
    var definedInSuit;

    beforeAll(function() {
      definedInSuit = 1;
    });

    afterAll(function() {
      definedInSuit = 0;
    });

    it("sets the initial value of definedInSuit before all specs run", function() {
      expect(definedInSuit).toEqual(1);
      definedInSuit += 1;
    });

    it("does not reset definedInSuit between specs", function() {
      expect(definedInSuit).toEqual(2);
    });
  });
})

describe("Pending specs", function() {
  xit("can be declared 'xit'", function() {
    expect(true).toBe(false);
  });

  it("can be declared with 'it' but without a function");

  it("can be declared by calling 'pending' in the spec body", function() {
    expect(true).toBe(false);
    pending('this is why it is pending');
  });

  xdescribe("A spec will not run", function() {
    it("will not run alrought test maybe failed", function() {
      expect(foo).toEqual(1);
    });
  });
});

describe("match any", function() {
  it("matches any value", function() {
    expect({}).toEqual(jasmine.any(Object));
    expect(12).toEqual(jasmine.any(Number));
    expect(1).toEqual(jasmine.anything());

  });

  describe("matches with func parameter", function() {
    it("is useful for comparing arguments", function() {
      var foo = jasmine.createSpy('foo');
      foo(12, function() {
        return true;
      });

      expect(foo).toHaveBeenCalledWith(jasmine.any(Number), jasmine.any(Function));
      expect(foo).toHaveBeenCalledWith(12, jasmine.anything());
    });
  });
});

describe("jasmine.objectContaining", function() {
  var foo;

  beforeEach(function() {
    foo = {
      a: 1,
      b: 2,
      bar: "baz"
    };
  });

  it("matches objects with the expect key/value pairs", function() {
    expect(foo).toEqual(jasmine.objectContaining({
      bar: "baz"
    }));
    expect(foo).not.toEqual(jasmine.objectContaining({
      c: 37
    }));
  });

  describe("when used with a spy", function() {
    it("is useful for comparing arguments", function() {
      var callback = jasmine.createSpy('callback');

      callback({
        bar: "baz"
      });

      expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
        bar: "baz"
      }));
      expect(callback).not.toHaveBeenCalledWith(jasmine.objectContaining({
        c: 37
      }));
    });
  });
});

describe("jasmine.arrayContaining", function() {
  var foo;

  beforeEach(function() {
    foo = [1, 2, 3, 4];
  });

  it("matches arrays with some of the values", function() {
    expect(foo).toEqual(jasmine.arrayContaining([3, 1]));
    expect(foo).not.toEqual(jasmine.arrayContaining([6]));
  });

  describe("when used with a spy", function() {
    it("is useful when comparing arguments", function() {
      var callback = jasmine.createSpy('callback');

      callback([1, 2, 3, 4]);

      expect(callback).toHaveBeenCalledWith(jasmine.arrayContaining([4, 2, 3]));
      expect(callback).not.toHaveBeenCalledWith(jasmine.arrayContaining([5, 2]));
    });
  });
});

describe('jasmine.stringMatching', function() {
  it("matches as a regexp", function() {
    expect({foo: 'bar'}).toEqual({foo: jasmine.stringMatching(/^bar$/)});
    expect({foo: 'foobarbaz'}).toEqual({foo: jasmine.stringMatching('bar')});
  });

  describe("when used with a spy", function() {
    it("is useful for comparing arguments", function() {
      var callback = jasmine.createSpy('callback');

      callback('foobarbaz');

      expect(callback).toHaveBeenCalledWith(jasmine.stringMatching('bar'));
      expect(callback).not.toHaveBeenCalledWith(jasmine.stringMatching(/^bar$/));
    });
  });
});

describe("over write toEqual", function() {

  it("custom asymmetry dives in deep", function() {
    var tester = {
      asymmetricMatch: function(actual) {
        var secondValue = actual.split(',')[1];
        return secondValue === 'bar';
      }
    };
    expect("foo,bar,baz,quux").toEqual(tester);
  });
});

describe("Manually ticking the Jasmine Clock", function() {
  var timerCallback;

  beforeEach(function() {
    timerCallback = jasmine.createSpy("timerCallback");
    jasmine.clock().install();
  });

  afterEach(function() {
    jasmine.clock().uninstall();
  });
  
  it("causes a timeout to be called synchronously", function() {
    setTimeout(function() {
      timerCallback();
    }, 100);

    expect(timerCallback).not.toHaveBeenCalled();

    jasmine.clock().tick(101);

    expect(timerCallback).toHaveBeenCalled();
    expect(timerCallback.calls.count()).toEqual(1);

    jasmine.clock().tick(50);
    expect(timerCallback.calls.count()).toEqual(1);

    jasmine.clock().tick(100);
    expect(timerCallback.calls.count()).toEqual(1);
  });

  it("causes an interval to be called synchronously", function() {
    setInterval(function() {
      timerCallback();
    }, 100);

    expect(timerCallback).not.toHaveBeenCalled();

    jasmine.clock().tick(101);
    expect(timerCallback.calls.count()).toEqual(1);

    jasmine.clock().tick(50);
    expect(timerCallback.calls.count()).toEqual(1);

    jasmine.clock().tick(50);
    expect(timerCallback.calls.count()).toEqual(2);
  });

  describe("Mocking the Date object", function(){
    it("mocks the Date object and sets it to a given time", function() {
      var baseTime = new Date(2013, 9, 23);

      jasmine.clock().mockDate(baseTime);

      jasmine.clock().tick(50);
      expect(new Date().getTime()).toEqual(baseTime.getTime() + 50);
    });
  });
});

describe("Asynchronous specs", function(){

  describe("run specs after done has been finished", function(){
    var value = 10;
    beforeEach(function(done){
      setTimeout(function(){
        value = 0;
        done();//comment this line and try
      }, 4000);
    });

    it("should support async execution of test preparation and expectations", function(done){
      expect(value).toBe(0);
      value++;
      expect(value).toBe(1);
      done()
    });
  });

  describe("will run specs and throw timeout exception wait done finished for 5 seconds", function(){
    var value = 10;
    beforeEach(function(done){
      setTimeout(function(){
        value = 0;
        done();
      }, 6000);
    });

    it("throw timeout exception and run the specs", function(done){
      expect(value).toBe(10);
      value++;
      expect(value).toBe(11);
      done()
    });
  });

  describe("set spec run in a specific time", function(){
    beforeEach(function(done){
      setTimeout(function(){
        done();
      }, 1000);
    });

    it("should support async execution of test preparation and expectations", function(done){
      setTimeout(function() {
        done();
      }, 9000);
    }, 10000);
  });
});

describe("A spec using done.fail", function() {
  var foo = function(x, callBack1, callBack2) {
    if (x) {
      setTimeout(callBack1, 0);
    } else {
      setTimeout(callBack2, 0);
    }
  };

  it("should not call the second callBack", function(done) {
    foo(true,
      done,
      function() {
        done.fail("Second callback has been called");
      }
    );
  });
});

describe("Define own custom matcher", function(){
  beforeEach(function(){
    var customMatchers = {
      toBeGoofy: function(util, customEqualityTesters) {
        return {
          compare: function(actual, expected) {
            if (expected === undefined) {
              expected = '';
            }
            var result = {};
            result.pass = util.equals(actual.hyuk, "gawrsh" + expected, customEqualityTesters);
            if (result.pass) {
              result.message = "Expected " + actual + " not to be quite so goofy";
            } else {
              result.message = "Expected " + actual + " to be goofy, but it was not very goofy";
            }
            return result;
          }
        };
      }
    };

  });
  describe("Custom matcher: 'toBeGoofy'", function() {
    beforeEach(function() {
      jasmine.addMatchers(customMatchers);
    });

    it("is available on an expectation", function() {
      expect({
        hyuk: 'gawrsh'
      }).toBeGoofy();
    });
     it("can take an 'expected' parameter", function() {
    expect({
      hyuk: 'gawrsh is fun'
    }).toBeGoofy(' is fun');
  });

  it("can be negated", function() {
    expect({
        hyuk: 'this is fun'
      }).not.toBeGoofy();
    });
  });


});