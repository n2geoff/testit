/*! Test.it v1.2.0 | MIT | https://github.com/n2geoff/testit */
export const test = {
    log: console.log,
    version: "v1.2.0",
    _tests: {},
    run(errors, next) {
        // TODO: rewrite to allow show errors flag (optional)
        if(typeof errors !== "boolean") {
            next = errors;
            errors = true;
        }

        let tests = this._tests || [];
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
            test.log(...passed, ...failed);
            test.log(`\n# tests ${failed.length + passed.length} pass ${passed.length} fail ${failed.length}`);

            return failed.length ? false : true;
        }
    },
    it(tests) {
        this._tests = tests;
        return this;
    },
    assert(expression, msg) {
        try {
            if(!expression) {
                throw new Error(msg || "Assertion Failed");
            }
        } catch {
            throw new Error(msg);
        }
    }
};

export default test;
