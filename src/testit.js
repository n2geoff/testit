/*! Test.it v 0.8.0 | MIT | https://github.com/n2geoff/testit */
;(function (root, factory) {
    "use strict";
    // support  browser & commonjs
    if (typeof module === "object" && module.exports) {
        module.exports = factory(root.test);
    } else {
        root.test = factory(root.test);
    }
}(this, function () {
    "use strict";

    const test = {
        "_tests": {},
        "run": function run(errors, next) {
            // TODO: rewrite to allow a show errors flag (optional)
            if(typeof errors !== "boolean") {
                next = errors;
                errors = true;
            }

            let tests = this._tests;
            // capture results
            let failed = [];
            let passed = [];

            // loop through tests
            Object.keys(tests).forEach((name) => {
                let test = tests[name];

                // execute
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

            // summary
            if(typeof next === "function") {
                return next({
                    pass: passed,
                    fail: failed
                });
            } else {
                console.log(...passed, ...failed);
                console.log(`\n# tests ${failed.length + passed.length} pass ${passed.length} fail ${failed.length}`);

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

                            if(['array'].indexOf(type) !== -1) {
                                if(val.constructor.name.toLowerCase() !== 'array') {
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
}));
