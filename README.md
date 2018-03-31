# Test.it

> A minimalistic testing library

**Test.it** is a small testing library for people that want to live in code, not tests.  No over engineering here.  Inspired by the simplicity of libraries like [Tape](https://github.com/substack/tape), but the implementation ideas of [TinyTest](https://github.com/joewalnes/jstinytest)

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
});
```

`test.it` will return `true` if the tests pass or `false` otherwise, in addition you should see the following console output

```
+ my passing test
- my failing test
- - Error: just wanted to fail fast 
    ...error stack...
# tests 1 pass 1 fail 0
```

A `+` will proceed test lines that pass and a `-` for those that fail, the trace back `file:line` is included after the failing test proceeded by `- -`

### Optional Next

In addition to the default operation, `test.it` provides an optional `next` functional parameter that will return the results as an `object` for you to process *however* you like

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
    "pass": ['list of passed tests', ...],
    "fail": ['list of errored tests', ...],
}
```

From this you can easily find the number of tests ran `pass.length`, number of failed tests `fail.length` or the total test count by adding the two.  Simple.

## Methods

To stay minimal, `test.it` only provides 6 testing methods

| Method                          | Description                   |
| ------------------------------- | ----------------------------- |
| `test.pass()`                   | pass test                     |
| `test.fail(message)`            | fails test with message       |
| `test.exists(value)`            | check if value exists         |
| `test.assert(expected, actual)` | evaluates results using `==`  |
| `test.equals(expected, actual)` | evaluates results using `===` |

> NOTE: wish `eval` was not so evil, `assert(expression, message)` would be ideal

## License

MIT

