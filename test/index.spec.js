import test from "../src/testit.js";

export default test.it({
    "'like' should do truthy evaluation via ==": function () {
        test.assert(1 == '1');
        test.assert(1);
    },
    "'equal' should do === evaluation exist": function () {
        test.assert(1 === 1);
        test.assert('hello' === 'hello');
    },
    "you should be able to 'pass' a test": function () {
        test.assert(1);
    },
    "you should be able to fail' a test too": function () {
        try {
            test.assert(0);
        } catch (e) {
        }
    },
    "you should be able to test if something 'exists'": function () {
        test.assert({});
        test.assert(typeof ({}) === 'object');
    },
    "should be able to check types": function () {

        test.assert(Array.isArray([]));
        test.assert(typeof (123) === 'number');

        test.assert(typeof ({}) === 'object');
        test.assert(typeof (true) === 'boolean');
        test.assert(typeof (false) === 'boolean');
        test.assert(typeof (undefined) === 'undefined');
    }
});
