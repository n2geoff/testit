/*! Test.it v 0.7.0 | MIT | https://github.com/n2geoff/testit */
(function (root, factory) {
    "use strict";
    if (typeof module === "object" && module.exports) {
        module.exports = factory(root.test);
    } else {
        root.test = factory(root.test);
    }
}(this, function () {
    "use strict";

    const test = {
        "_tests": {},
        "run": function (next) {

            let tests = this._tests;
            let failed = [];
            let passed = [];

            Object.keys(tests).forEach(function (name) {
                let test = tests[name];

                try {
                    test();
                    passed.push(`\n+ ${name}`);
                } catch (err) {
                    failed.push(`\n- ${name}`);
                    console.error(err);
                }
            });

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
        "it": function (tests) {
            this._tests = tests;
            return this;
        },
        "expects": (val) => {
            return {
                "to": {
                    "be": {
                        "a": (type) => {
                            return test.expects(val).to.be.an(type);
                        },
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
                    "fail": (msg) => {  throw new Error(msg); }
                }
            };
        }
    };

    return test;
}));
