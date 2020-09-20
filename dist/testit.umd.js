(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('umd', factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.umd = factory());
}(this, (function () { 'use strict';

    /*! Test.it v1.0.0 | MIT | https://github.com/n2geoff/testit */
    const test = {
        "log": console.log, 
        "version": "v1.0.0",
        "_tests": {},
        "run": function run(errors, next) {
            if(typeof errors !== "boolean") {
                next = errors;
                errors = true;
            }

            let tests = this._tests || [];
            let failed = [];
            let passed = [];

            Object.keys(tests).forEach((name) => {
                let test = tests[name];

                try {
                    test();
                    passed.push(`\n+OK ${name}`);
                } catch (err) {
                    if (errors) {
                        failed.push(`\n-ERR ${name} \n --- \n ${err.stack} \n ---`);
                    } else {
                        failed.push(`\n-ERR ${name}`);
                    }
                }
            });

            if(typeof next === "function") {
                return next({
                    pass: passed,
                    fail: failed
                });
            } else {
                test.log(...passed, ...failed);
                test.log(`\n# tests ${failed.length + passed.length} pass ${passed.length} fail ${failed.length}`);

                return failed.length ? false : true;
            }
        },
        "it": function it(tests) {
            this._tests = tests;
            return this;
        },
        "assert": (expression, msg) => {
            try {
                if(!expression) {
                    throw new Error(msg || "Assertion Failed");
                }
            } catch (e) {
                throw new Error(msg);
            }
        }
    };

    return test;

})));
