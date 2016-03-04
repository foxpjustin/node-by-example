# Contributing to Node by Example

Thank you for your interest in contributing! Here are the guidelines we'd like you to follow:

* [Code of Conduct](#coc)
* [Want an Example?](#new-example)
* [Have an Example?](#submit-example)
* [Example Style Guide](#style-guide)


## <a name="coc"></a> Code of Conduct
Help us keep Node by Example open and inclusive. Please read and follow our [Code of Conduct][coc].

## <a name="new-example"></a> Want an Example?

You can request new examples by [submitting an issue][issues] to this repository.

## <a name="submit-example"></a> Have an Example?

If you have an example, please make sure to submit a pull request and follow our [Pull Request Guidelines][pull-request]. This will be pre-filled in your PR when you start.

## <a name="style-guide"></a> Example Style Guide

Because of the nature of the project, we're targeting newbies, intermediate and advanced Node.js developers. While we all have our own preferences, we aim to show best practices when it comes to the examples.

* **ALWAYS** use semicolons. It's important to understand how ASI works, but for the sake of
these examples, we don't want the end user to have to go digging for info about it.
* **ALWAYS** use current LTS versions features. As a goal we want to keep these docs up to date
and not let them get stale. Make sure that if you use a new ECMAScript feature, its
can be ran in vanilla node REPL.
* **ALWAYS** start with `'use strict';`.
* **ALWAYS** indent with 2 spaces.
* **ALWAYS** use curly braces for multi-line if statements.
* **ALWAYS** use single quotes for strings - except to avoid escaping.
* **ALWAYS** use spaces after keywords `if (condition) { ... }`.
* **ALWAYS** use spaces after function name `function foo (bar) { ... }`.
* **ALWAYS** use spaces after commas `const foo = [1, 2, 3];`.
* **ALWAYS** write each variable declaration on it's own statement.
* **ALWAYS** leave a blank line after blocks and before the next statement.
* **ALWAYS** add spaces inside curly braces `const foo = { bar: 'baz' };`.
* **ALWAYS** use trailing commas over leading commas.
* **DO NOT** pad your blocks with blank lines.
* **DO NOT** add spaces inside parentheses `function foo ( bar )`.
* **DO NOT** add spaces inside brackets `const foo = [ 1, 2, 3 ];`.

[coc]: https://github.com/joshmanders/node-by-example/blob/master/CODE_OF_CONDUCT.md
[issues]: https://github.com/joshmanders/node-by-example/issues
[pull-request]: https://github.com/joshmanders/node-by-example/blob/master/PULL_REQUEST_TEMPLATE.md
