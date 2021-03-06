// Generated by CoffeeScript 1.6.2
(function() {
  var a, autoComputeLeftRecursives, b, char, hasOwnProperty, initialize, p, parse1, parse2, parse3, parser, x, xexports, _ref;

  _ref = parser = p = require("../lib/autopeasy.js"), char = _ref.char, initialize = _ref.initialize, autoComputeLeftRecursives = _ref.autoComputeLeftRecursives;

  hasOwnProperty = Object.hasOwnProperty;

  a = char('a');

  b = char('b');

  x = char('x');

  parse1 = function(text) {
    var rules;

    rules = {
      A: function(start) {
        var m;

        return (m = rules.A(start)) && x(p.cur()) && m + 'x' || m || a(start);
      },
      rootSymbol: 'A'
    };
    initialize();
    autoComputeLeftRecursives(rules);
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
        return rules.A(start) || b(start);
      },
      rootSymbol: 'A'
    };
    initialize();
    autoComputeLeftRecursives(rules);
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
        return rules.A(start) || b(start);
      },
      rootSymbol: 'A'
    };
    initialize();
    autoComputeLeftRecursives(rules);
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

}).call(this);

/*
//@ sourceMappingURL=testautopeasy.map
*/
