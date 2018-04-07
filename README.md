# Test.it

> A minimalistic testing library

**Test.it** is a small testing library for people that want to live in code, not in tests.  No over engineering here.  Inspired by the simplicity of libraries like [Tape](https://github.com/substack/tape),but the implementation ideas of things like [Expect](https://github.com/Automattic/expect.js) and [TinyTest](https://github.com/joewalnes/jstinytest)

This is probally not a *cure-all* testing solution, if you want something more robust checkout [Jasmine](), [Tape]() or [Mocha]() -- this is to... 

**Test small things, with small things**

### Features

- Works in the Browser
- Works with CommonJS (aka NodeJS)
- Barely over a 100 lines
- Single File
- No Dependicies
- 2kb footprint (*before gzip*)
- Extend with custom reporters
- Has an Expect-like style BDD assertions 

**No Bloat Here!**

- [Download Now Available](https://raw.githubusercontent.com/n2geoff/testit/master/src/testit.min.js)

## Usage

By default, you can run your tests like

```js
test.it({
    'my passing test': function() {
        test.expects().to.pass();
    },
    'my failing test': function() {
        test.expects().to.fail('just wanted to fail fast');
    }
}).run();
```
> NOTE: `run()` can be called elsewhere, see [tests/](test/runner.html)

`test.it` will return `true` if the tests pass or `false` otherwise. Typical console output:

```
+ my passing test
- my failing test
- - Error: just wanted to fail fast 
    ...error stack...
# tests 1 pass 1 fail 0
```

A `+` will proceed test lines that pass and a `-` for those that fail, the trace back `file:line` is included after the failing test proceeded by `- -`

> NOTE: API still in flux, and may change to closer match TAP

### Optional Next

`test.it` `.run()` method provides an optional `next` function parameter that passes the results as an `object` for you to process *however* you like. such as a custom runner

For Example...

**For Fans of [TinyTest](https://github.com/joewalnes/jstinytest)**

```js
test.it({
    'my passing test': function() {
        test.pass();
    }
}, function(results) {
    if (window.document && document.body) {
        document.body.style.backgroundColor = (
            results.fail.length ? '#ff9999' : '#99ff99'
        );
    }
});
```

### Sample Results Object

```json
{
    "pass": ["list of passed tests", "..."],
    "fail": ["list of errored tests", "..."],
}
```

From this object you can easily find the number of tests ran `pass.length`, number of failed tests `fail.length` or the total test count by adding the two.  Simple.

## Methods

To stay minimal, `test.it` only has 3 core functions: 
- `it` to capture your tests
- `run` to execute yours tests
- and `expects` to write your test assertions

While you can use your own assertion library, the included `expects` provides the following methods for writing your tests:

| Methods                           | Description                             |
| --------------------------------- | --------------------------------------- |
| `.expects(tests).to.exist()`      | truthy evalution if value exists        |
| `.expects().to.pass()`            | pass test                               |
| `.expects().to.fail(message)`     | fails test with message                 |
| `.expects(this).to.equal(that)`   | strictly equal evaluation using `===`   |
| `.expects(this).to.be.like(that)` | loose evaluation using `==`             |
| `.expects(123).to.be.a('number')` | check typeof value (`.a()` or `.an()`)  |

> NOTE: wish `eval` was not so evil, `assert(expression, message)` would be ideal

if you want to shorten test typing try

    let expect = test.expects;

putting that above your tests will allow you to write like

```js
test.it({
    "my test should work": function() {
        expect().to.pass();
    }
});

```

## Support

Please open [an issue](https://github.com/n2geoff/testit/issues/new) for support.

## Contributing

Anyone is welcome to contribute, however, if you decide to get involved, please take a moment to review the [guidelines](CONTRIBUTING.md), there minimalistic;)

## License

[MIT](LICENSE)

