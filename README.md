# Test.it

> A minimalistic testing library

**Test.it** is a small testing library for people that want to live in code, not tests.  No over engineering here.  Inspired by the simplicity of libraries like [Tape](https://github.com/substack/tape), but the implementation ideas of [TinyTest](https://github.com/joewalnes/jstinytest)

### Features

- Works in the Browser
- Works with CommonJS (aka NodeJS)
- Less than 100 lines
- Single File
- No Dependicies
- 2kb footprint (*before gzip*)
- Extend with custom reporters 

**No Bloat Here!**

- [Download Now Available](https://raw.githubusercontent.com/n2geoff/testit/master/src/testit.min.js)

## Usage

By default, you can run your tests like

```js
test.it({
    'my passing test': function() {
        test.pass();
    },
    'my failing test': function() {
        test.fail('just wanted to fail fast');
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

### Optional Next

`test.it` `.run()` method provides an optional `next` function parameter that will return the results as an `object` for you to process *however* you like

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

To stay minimal, `test.it` only provides 7 methods, 5 for assertion, 1 to capture tests
and 1 to run tests

| Methods                         | Description                             |
| ------------------------------- | --------------------------------------- |
| `test.it(tests)`                | captures test object                    |
| `test.it(tests).run(next)`      | runs tests w/ optional processing       |
| `test.pass()`                   | pass test                               |
| `test.fail(message)`            | fails test with message                 |
| `test.exists(value)`            | check if value exists                   |
| `test.assert(expected, actual)` | evaluates results using `==`            |
| `test.equals(expected, actual)` | evaluates results using `===`           |

> NOTE: wish `eval` was not so evil, `assert(expression, message)` would be ideal

## Support

Please open [an issue](https://github.com/n2geoff/testit/issues/new) for support.

## Contributing

Anyone is welcome to contribute, however, if you decide to get involved, please take a moment to realize these are early days, so...

...enter at your own peril!

## License

The code is available under the [MIT license](LICENSE).

