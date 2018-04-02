/* Test.it v 0.5.1 | MIT | https://github.com/n2geoff/testit */
(function(root, factory) {
    // support  browser & commonjs
    if(typeof module === "object" && module.exports) {
        module.exports = factory(root.test);
    } else {
        root.test = factory(root.test);
    }
}(this, function() {
    'use strict';

    const test = {
        _tests: {},
        run: function(next) {
    
            let tests = this._tests;
            // capture results
            let failed = [];
            let passed = [];
    
            // loop through tests
            Object.keys(tests).forEach(function(name) {
                let test = tests[name];
    
                // execute
                try {
                    test();
                    passed.push(`\n+ ${name}`);
                } catch (err) {
                    // TODO: include error stack option
                    // let back = err.stack.split('\n')[2];
                    // let re = /(?<=\()(.*?)(?=\))/g;
                    // let trace = re.exec(back)[0];
                    failed.push(`\n- ${name}`);
                    console.error(err);
                    // failed.push(`\n- ${name} - - ${trace}`);
                }
            });
    
            // summary
            if(typeof next === 'function') {
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
        it: function(tests) {
            this._tests = tests;
            return this;
        },
        assert: function (e, a) { if (e != a) throw Error(`expected ${e} == ${a}`); },
        equals: function (e, a) { if (e !== a) throw Error(`expected ${e} === ${a}`); },
        exists: function (v) { if (!v) throw Error(`exists value ${v}`); },
        pass: function () { return true; },
        fail: function (m) { throw Error(m); }
    }

    return test;
}));
