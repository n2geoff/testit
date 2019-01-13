var test = test || require("../src/testit");

test.it({
    "'like' should do truthy evaluation via ==": function() {
        test.expects(1).to.be.like('1');
        test.expects("1").to.be.like(1);
        test.expects(1).to.be.ok();
    },
    "'equal' should do === evaluation exist": function() {
        test.expects(1).to.equal(1);
        test.expects('hello').to.equal('hello');
    },
    "you should be able to 'pass' a test": function() {
        test.expects().to.pass();
    },
    "you should be able to fail' a test too": function() {
        try {
            test.expects().to.fail();
        } catch(e) {
            test.expects().to.pass();
        }
    },
    "you should be able to test if something 'exists'": function() {
        test.expects({}).to.exist();
        test.expects({}).to.be.ok();
        test.expects({}).to.be.a('object');
    },
    "should be able to check types": function() {
        test.expects(123).to.be.a('number');
        test.expects([]).to.be.an('array');
        test.expects({}).to.be.a('object');
        test.expects(true).to.be.a('boolean');
        test.expects(false).to.be.a('boolean');
        test.expects(undefined).to.be.a('undefined');
    }
});
