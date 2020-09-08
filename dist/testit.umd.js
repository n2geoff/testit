(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define('umd', factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.umd = factory());
}(this, (function () { 'use strict';

/*! Test.it v 0.9.0 | MIT | https://github.com/n2geoff/testit */
    const test = {
        "log": console.log, 
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
        "expects": function expects(val) {
            return {
                "to": {
                    "be": {
                        "a": (type) => { return test.expects(val).to.be.an(type); },
                        "an": (type) => {

                            if(["array"].indexOf(type) !== -1) {
                                if(val.constructor.name.toLowerCase() !== "array") {
                                    throw new Error(`expected ${typeof val} to be an ${type}`);
                                }

                                return true;
                            }

                            if(typeof val !== type) {
                                throw new Error(`expected ${typeof val} to be an ${type}`);
                            }
                        },
                        "ok": () => { return test.expects(val).to.exist(); },
                        "like": (comp) => {
                            if(val != comp) {
                                throw new Error(`expected ${val} == ${comp}`);
                            }
                        }
                    },
                    "equal": (comp) => {
                        if(val !== comp) {
                            throw new Error(`expected ${val} === ${comp}`);
                        }
                    },
                    "exist": () => {
                        if(!val) {
                            throw new Error(`expected ${val} to be truthy`);
                        }
                    },
                    "pass": () => { return true; },
                    "fail": (msg) => { throw new Error(msg); }
                }
            };
        }
    };

    return test;

})));
