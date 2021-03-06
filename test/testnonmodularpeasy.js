// Generated by CoffeeScript 1.6.2
(function() {
  var a, addRecursiveCircles, b, char, computeLeftRecursives, hasOwnProperty, initialize, memo, memoA, p, parse1, parse2, parse3, parser, setRules, x, xexports, _ref;

  _ref = parser = p = require("../lib/nonmodularpeasy.js"), initialize = _ref.initialize, char = _ref.char, memo = _ref.memo, setRules = _ref.setRules, addRecursiveCircles = _ref.addRecursiveCircles, computeLeftRecursives = _ref.computeLeftRecursives;

  hasOwnProperty = Object.hasOwnProperty;

  a = char('a');

  b = char('b');

  x = char('x');

  memoA = memo('A');

  parse1 = function(text) {
    var rules;

    rules = {
      A: function(start) {
        var m;

        return (m = memoA(start)) && x(p.cur()) && m + 'x' || m || a(start);
      },
      rootSymbol: 'A'
    };
    initialize();
    addRecursiveCircles(rules, ['A']);
    computeLeftRecursives(rules);
    return parser.parse(text, rules);
  };

  parse2 = function(text) {
    var rules;

    rules = {
      A: function(start) {
        var m;

        return (m = rules.B(start)) && x(p.cur()) && m + 'x' || m || a(start);
      },
      B: function(start) {
        return memoA(start) || b(start);
      },
      rootSymbol: 'A'
    };
    initialize();
    addRecursiveCircles(rules, ['A', 'B']);
    computeLeftRecursives(rules);
    return parser.parse(text, rules);
  };

  parse3 = function(text) {
    var rules;

    rules = {
      A: function(start) {
        var m;

        return (m = rules.B(start)) && x(p.cur()) && m + 'x' || m || a(start);
      },
      B: function(start) {
        return rules.C(start);
      },
      C: function(start) {
        return memoA(start) || b(start);
      },
      rootSymbol: 'A'
    };
    initialize();
    addRecursiveCircles(rules, ['A', 'B', 'C']);
    computeLeftRecursives(rules);
    return parser.parse(text, rules);
  };

  xexports = {};

  exports.Test = {
    "test A: Ax|a": function(test) {
      var parse;

      parse = parse1;
      test.equal(parse('a'), 'a');
      test.equal(parse('ax'), 'ax');
      test.equal(parse('axx'), 'axx');
      test.equal(parse('axxx'), 'axxx');
      return test.done();
    },
    "test A: Bx|a; B:A|b": function(test) {
      var parse;

      parse = parse2;
      test.equal(parse('a'), 'a');
      test.equal(parse('ax'), 'ax');
      test.equal(parse('axx'), 'axx');
      test.equal(parse('axxx'), 'axxx');
      test.equal(parse('b'), 'b');
      test.equal(parse('bx'), 'bx');
      test.equal(parse('bxxx'), 'bxxx');
      test.equal(parse('bxg'), 'bx');
      test.equal(parse('bxxg'), 'bxx');
      test.equal(parse('bxxxg'), 'bxxx');
      test.equal(parse('fg'), void 0);
      test.equal(parse(''), void 0);
      return test.done();
    },
    "test A: Bx|a; B:C; C:A|b": function(test) {
      var parse;

      parse = parse3;
      test.equal(parse('a'), 'a');
      test.equal(parse('ax'), 'ax');
      test.equal(parse('axx'), 'axx');
      test.equal(parse('axxx'), 'axxx');
      test.equal(parse('b'), 'b');
      test.equal(parse('bx'), 'bx');
      test.equal(parse('bxxx'), 'bxxx');
      test.equal(parse('bxg'), 'bx');
      test.equal(parse('bxxg'), 'bxx');
      test.equal(parse('bxxxg'), 'bxxx');
      test.equal(parse('fg'), void 0);
      test.equal(parse(''), void 0);
      return test.done();
    }
  };

  exports.Test = {
    "test class member": function(test) {
      var A;

      A = (function() {
        function A() {}

        A.prototype.a = 1;

        return A;

      })();
      test.equal(A.prototype.a, 1);
      return test.done();
    }
  };

}).call(this);

/*
//@ sourceMappingURL=testnonmodularpeasy.map
*/
