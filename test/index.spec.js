import test from "../src/testit.js";

export default test.it({
    "'like' should do truthy evaluation via =="() {
        test.assert(1 == "1");
        test.assert(1);
    },
    "'equal' should do === evaluation exist"() {
        test.assert(1 === 1);
        test.assert("hello" === "hello");
    },
    "you should be able to 'pass' a test"() {
        test.assert(1);
    },
    "you should be able to fail' a test too"() {
        try {
            test.assert(0);
        } catch (e) {
            // correct
        }
    },
    "you should be able to test if something 'exists'"() {
        test.assert({});
        test.assert(typeof ({}) === "object");
    },
    "should be able to check types"() {

        test.assert(Array.isArray([]));
        test.assert(typeof (123) === "number");

        test.assert(typeof ({}) === "object");
        test.assert(typeof (true) === "boolean");
        test.assert(typeof (false) === "boolean");
        test.assert(typeof (undefined) === "undefined");
    }
});
