test.it({
    "'assert' should exist": function() {
        test.exists(test.assert);
    },
    "truty assert should work": function() {
        test.assert(1, '1');
        test.assert('1', 1);
    },
    "'equals' should exist": function() {
        test.exists(test.equals);
    },
    "'equals' should be exact": function() {
        test.equals(1,1);
        test.equals('hello', 'hello');
    },
    "'pass' should exist": function() {
        test.exists(test.pass);
    },
    "'fail' should exist": function() {
        test.exists(test.fail);
    },
    "'exists' should exist": function() {
        test.exists(test.exists);
    }
});