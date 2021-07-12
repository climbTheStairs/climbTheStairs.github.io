# My JavaScript style guide

## Variables

- Always declare variables before use to avoid accidental globals.

- Use `const` to declare variables, unless it must be reassigned; then, use `let`. Never use `var`.

    ```javascript
    // avoid
    var x = 1
    var y = 2
    
    // okay
    const x = 1
    let y = 2
    ```
    
- Use one `const` or `let` per variable definition; never combine definitions with `,` ([outside of control statements](#iterators)).
    
    ```javascript
    // avoid
    const x = 1, y = 2
    
    // okay
    const x = 1
    const y = 2
    ```

- Group all `const`s and then all `let`s.

    ```javascript
    // avoid
    let x = 1
    const y = 2
    let z = 3
    
    // okay
    const y = 2
    let x = 1
    let z = 3
    ```

- Never save references to `this`. Use instead arrow functions or `Function.prototype.bind()`.
    
    ```javascript
    // avoid
    const that = this
    fn(function() {
        that.method()
    })
    
    // okay
    fn(() => {
        this.method()
    })
    fn(function() {
        this.method()
    }.bind(this))
    ```

- Use explanatory variables.

- Use object and array destructuring.

    ```javascript
    // avoid
    const x = obj.x
    const y = arr[0]
    
    // okay
    const { x } = obj
    const [y] = arr
    ```
    
- All declared or defined variables must be used; unused variables are forbidden.

## Objects

- Use computed property names when creating objects with dynamic property names.

    > Why? They allow all the properties of an object to be defined in one place.
    
    ```javascript
    // avoid
    const obj = {
        x: 1,
    }
    obj[key] = 2
    
    // okay
    const obj = {
        x: 1,
        [key]: 2,
    }
    ```

- Use object method shorthand.

    ```javascript
    // avoid
    const obj = {
        method: function() {},
    }
    
    // okay
    const obj = {
        method() {},
    }
    ```

- Use property value shorthand.
    
    > Why? It is shorter and more descriptive.

    ```javascript
    // avoid
    const obj = { x: x, y: y }
    
    // okay
    const obj = { x, y }
    ```

- Only quote properties that are invalid identifiers.

    ```javascript
    // avoid
    const obj = {
        "x": 1,
        "#": 2,
    }
    
    // okay
    const obj = {
        x: 1,
        "#": 2,
    }
    ```

- Use trailing commas on multiline objects.

    ```javascript
    // avoid
    const obj = {
        x: 1
    }
    
    // okay
    const obj = {
        x: 1,
    }
    ```

## Arrays

- Use spread to clone arrays.

    ```javascript
    // avoid
    const newArr = arr.slice()
    
    // okay
    const newArr = [...arr]
    ```

- Use spread to convert an iterable object to an array.

    ```javascript
    const obj = document.querySelectorAll("*")
    
    // avoid
    const arr = Array.prototype.slice.call(obj)
    const arr = Array.from(obj)
    
    // okay
    const arr = [...obj]
    ```

- Use `Array.prototype.from()` instead of spread for mapping over an iterable object.

    > Why? It avoids creating an intermediate array.
    
    ```javascript
    const obj = document.querySelectorAll("*")
    
    // avoid
    const arr = [...obj].map(processArr)
    
    // okay
    const arr = Array.from(obj, processArr)
    ```
    
- Use `Array.prototype.from()` for converting an array-like object to an array.
    
    > Why? Spreads do not work on non-iterable objects.

    ```javascript
    const obj = { 0: 1, 1: 2, 2: 3 }
    
    // avoid
    const arr = Array.prototype.slice.call(obj)
    
    // throws error
    const arr = [...obj]
    
    // okay
    const arr = Array.from(obj)
    ```
    
- Place a space after each comma in single-line arrays.

    ```javascript
    // avoid
    const arr = [1,2,3]
    
    // okay
    const arr = [1, 2, 3]
    ```

- Use trailing commas in multiline arrays.

    ```javascript
    // avoid
    const arr = [
        1,
        2, 
        3
    ]
    
    // okay
    const arr= [
        1,
        2,
        3,
    ]
    ```

## Strings

- Use double quotes `""` for strings instead of single quotes `''` (and instead of templates when they are unnecessary).

    ```javascript
    // avoid
    const str = 'string'
    const str = `string`
    
    // okay
    const str = "string"
    ```

- When programmatically building up strings, use template strings when that is clearer.

    ```javascript
    // avoid
    const str = "text " + x + " more text " + y + "!!!1!1"
    
    // okay
    const str = `text ${x} more text ${y}!!!1!1`
    ```
    
- Use template strings to avoid escaping.

    ```javascript
    // avoid
    const str = "<div class=\"box\"></div>"
    
    // okay
    const str = `<div class="box"></div>`
    ```

## Functions

- Use anonymous function expressions assigned to a `const` variable instead of function declarations.

    ```javascript
    // avoid
    function fn() {}
    
    // okay
    const fn = function() {}
    ```

- Use arrow notation when no `this` bindings are needed.

    ```javascript
    // avoid
    const fn = function() {}
    
    // okay
    const fn = () => {}
    ```

- In arrow functions consist of a single, *short* statement, braces may be omitted to use the implicit return.

    ```javascript
    // avoid
    const fn = () => {
        fn()
    }
    
    // okay
    const fn = () => fn()
    ```
    
- Never use `arguments`, use rest syntax instead.
    
    > Why? `arguments` is not an array, and it does not exist inside arrow functions.

    ```javascript
    // avoid
    const fn = function() {
        return arguments
    }
    
    // okay
    const fn = (...args) => args
    ```

- Use default parameter syntax.

    ```javascript
    // avoid
    const fn = (x) => {
        x = x || 1
    }
    
    // okay
    const fn = (x = 1) => {}
    ```
    
- Avoid side effects with default parameters.

    > Why? They are confusing to reason about.

    ```javascript
    // avoid
    let y = 0
    const fn = (x = ++y) => {}
    ```
    
- Use spread to call variadic functions.

    > Why? It is much cleaner and simpler, and `new` does not easily work with `Function.prototype.apply()`.

    ```javascript
    // avoid
    console.log.apply(console, args)
    const d = new (Function.prototype.bind.apply(Date, args))

    // okay
    console.log(...args)
    const d = new Date(...args)
    ```

- When calling a function, arguments (both single-line and multiline) should be [formatted the same as an array](#arrays).

    ```javascript
    // avoid
    fn(x,y,z)
    fn(
        x, y, y,
    )

    // okay
    fn(x, y, z)
    fn(
        x,
        y,
        z,
    )
    ```

- In arrow functions, always include parentheses around arguments for consistency.

    ```javascript
    // avoid
    const fn = x => {}
    
    // okay
    const fn = (x) => {}
    ```

## Classes and constructors

- Use anonymous class expressions assigned to a `const` variable instead of class declarations.

    ```javascript
    // avoid
    class C {}
    
    // okay
    const C = class {}
    ```

- Always use `class`. Avoid manipulating `prototype` directly.

    ```javascript
    // avoid
    const C = function() {}
    C.prototype.method = function() {}
    
    // okay
    const C = class {
        method() {}
    }
    ```
    
- Use extends for inheritance.

    ```javascript
    const C = class extends D {}
    ```
    
- Methods can return `this` to allow method chaining.

    ```javascript
    const C = {
        method() {
            // do stuff
            return this
        }
    }
    ```
    
- Classes have a default constructor if one is not specified. Avoid unnecessary constructor functions.

## Iterators

- Use built-in methods instead of loops like `for-in` or `for-of`.

    ```javascript
    // avoid
    for (key in obj)
        // do stuff
    for (x of arr)
        // do stuff
    
    // okay
    Object.keys(obj).forEach((key) => {
        // do stuff
    })
    arr.forEach((x) => {
        // do stuff
    })
    ```
    
- Reduce activity in loops. Assign properties that are accessed each iteration to variables.
    
    > Why? Accessing a property each iteration can be inefficient.
    
    ```javascript
    // avoid
    for (let i = 0; i < arr.length; i++)
        // do stuff
        
    // okay
    for (let i = 0, l = arr.length; i < l; i++)
        // do stuff
    ```

## Operators

- Separate binary operators from expressions with a space.

    ```javascript
    // avoid
    const x = 1+2
    
    // okay
    const x = 1 + 2
    ```
    
- Use `===` and `!==` and never `==` and `!=`.

    ```javascript
    // avoid
    if (x == 1 && y != 2)
        // do stuff
    
    // okay
    if (x === 1 && y !== 2)
        // do stuff
    ```

- Avoid Yoda conditionals.

    ```javascript
    // avoid
    if (1 === x)
        // do stuff
    
    // okay
    if (x === 1)
        // do stuff
    ```
    
- Use shortcuts in control statements, as expressions will be coerced into booleans.

    ```javascript
    // avoid
    if (arr.length !== 0)
        // do stuff
    
    // okay
    if (arr.length)
        // do stuff
    ```
    
- When mixing operators, enclose them in parentheses if that improves clarity.

    ```javascript
    // avoid
    const condition = fn(x) + y * 10 > z || x && arr.length
    
    // okay
    const condition = (fn(x) + (y * 10) > z) || (x && arr.length)
    ```

- When a multiline expression with logical operators, the operators must end lines.

    ```javascript
    // okay
    if (
        condition1 ||
        (x > y && condition2) ||
        condition3
    )
        // Do stuff
    ```
    
- Avoid nested or unclear ternaries.

- Spread ternaries on multiple lines if that improves clarity.

    ```javascript
    // okay
    const x = condition
        ? valueIfTrue
        : valueIfFalse
    ```
    
- Use exponential operator `**` instead of `Math.pow()`.
    
    ```javascript
    // avoid
    const x = Math.pow(1, 2)
    
    // okay
    const x = 1 ** 2
    ```

## Blocks

- Never use braces or create multiline blocks with control statements.

    ```javascript
    // avoid
    if (condition) {
        // do stuff
        // do more stuff
    }
    while (condition) {
        // do stuff
        // do more stuff
    }
    
    // okay
    const fn = () => {
        // do stuff
        // do more stuff
    }
    if (condition)
        fn()
    while (condition)
        fn()
    ```
    
- Never use `switch` statements.

    ```javascript
    // avoid
    switch (x) {
        case "succ":
            // do stuff
            break
        case "err":
            // do stuff
            break
    }
    
    // okay
    const obj = {
        succ() {
            // do stuff
        },
        err() {
            // do stuff
        },
    }
    obj[x]()
    ```
    
- If an `if` block returns or throws an error, do not use subsequent `else` or `else if` blocks.

    ```javascript
    // avoid
    if (condition1)
        return 1
    else if (condition2)
        throw new Error()
    else
        fn()
    
    // okay
    if (condition1)
        return 1
    if (condition2)
        throw new Error()
    fn()
    ```
    
- The use of short circuits in place of conditionals is discouraged.

    ```javascript
    // discouraged
    condition && fn()
    
    // okay
    if (condition)
        fn()
    ```

## Comments

- Use `/** ... */` for multiline comments

    ```javascript
    // avoid
    /* This is a comment */
    /* Here is a comment and here
    is a uh what */
    
    // okay
    /**
     * Here is a comment and here
     * is a uh what?
     */
    ```
    
- Use `//` for single-line comments. Always place single-line comments on a separate line above the subject of the comment.

    ```javascript
    // avoid
    fn() // this is a comment
    
    // okay
    // this is a comment
    fn()
    ```
    
- Start all comments with a space.

    ```javascript
    // avoid
    //this is a commnet
    
    // okay
    // this is a comment
    ```
    
- Use `// FIXME:` to annotate problems.

- Use `// TODO:` to annotate solutions to problems.

## Lines

- Related code may be grouped with one blank line. Never leave multiple blank lines together.

    ```javascript
    // avoid
    "use strict"
    
    
    const x = 1
    fn(x)
    
    // okay
    "use strict"
    
    const x = 1
    fn(x)
    ```

- Lines of code *should* be kept short and *must* be under eighty characters.

- Comments and strings must not cause their lines to exceed seventy-two characters. If they do, they must be broken up into multiple lines.

    ```javascript
    // avoid
    /**
     * Pretend this comment is really really long
     */
    const str = "pretend this string is really really long"
    
    // okay
    /**
     * Pretend this comment is
     * really really
     * long
     */
    const str = (
        "pretend this string is" +
        "really really" +
        "long"
    )
    ```

- Never end a line with an `=` assignment. If the line is too long, surround the assigned value in parentheses.

    ```javascript
    // avoid
    const str =
        "a long line"
    
    // okay
    const str = (
        "a long line"
    )
    ```

- Control statements must not be on the same line as their body.

    ```javascript
    // avoid
    if (condition) // do something
    
    // okay
    if (condition)
        // do something
    ```

- Short functions *may* be on the same line as their body.

    ```javascript
    // okay
    const fn = (x) => { console.log(x) }
    ```

## Space

- Indent with soft tabs (spaces) of size four.

    > Why? Soft tabs ensure the code always appears the same, and four spaces makes the code more readable and discourages excessive nesting.
    
    ```javascript
    (() => {
        fn(() => {
            if (condition)
                console.log(
                    "How far do you have to nest?",
                )
        })
    })()
    ```

- Never have trailing whitespace.

- Never use spaces to pad the inside of parentheses or square brackets.

    ```javascript
    // avoid
    const arr = [ 1, 2, 3 ]
    fn( x )
    // okay
    const arr = [1, 2, 3]
    fn(x)
    ```

- Never use spaces to pad the inside of curly braces in template literals.

    ```javascript
    // avoid
    const str = `thank you, ${ user }`
    
    // okay
    const str = `thank you, ${user}`
    ```
    
- Use one space to pad the inside of curly braces in objects and functions, unless they are empty.

    ```javascript
    // avoid
    const obj1 = {x: 1, y: 2}
    const obj2 = { }
    
    // okay
    const obj1 = { x: 1, y: 2 }
    const obj2 = {}
    ```

- Never use vertical alignment.

    > Why? It's difficult to manage as the code changes.

    ```javascript
    // avoid
    const short        = { x: 1,     y: 2    }
    const veryLongName = { x: 12345, y: 6789 }
    
    // okay
    const short = { x: 1, y: 2 }
    const veryLongName = { x: 12345, y: 6789 }
    ```

- Place one space between the keyword and opening parenthesis in control statements.

    > Why? This visually distinguishes keywords from function invocations.

    ```javascript
    // avoid
    if(condition)
        // Do stuff
    
    // okay
    if (condition)
        // Do stuff
    ```

- Never place a space between the function name and opening parenthesis in function expressions and invocations.

    > Why? This visually distinguishes functions from keywords.

    ```javascript
    // avoid
    const fn = function () {}
    fn ()

    // okay
    const fn = function() {}
    fn()
    ```

- Place one space before function braces.

    ```javascript
    // avoid
    const fn = function(){}
    
    // okay
    const fn = function() {}
    ```

## Naming conventions

- Use camel case for regular variables.

    ```javascript
    // okay
    const varName = 1
    let anotherLongerVarName = 2
    ```

- Use Pascal case for constructors or classes.

    ```javascript
    // okay
    const VarName = class {}
    let AnotherLongerVarName = {}
    ```

- Use uppercase for constants. Properties within constants must be written normally (in camel case).

    ```javascript
    // okay
    const VAR_NAME = "constant value"
    const ANOTHER_LONGER_VAR_NAME = { property: 1 }
    ```

- Prefix variables that are private properties or methods with `_`.

    ```javascript
    // okay
    const _varName = "secret"
    ```

- Prefix variables that hold an `HTMLElement` with `$`.

    ```javascript
    // okay
    const $varName = document.querySelector(".box")
    ```

- Prefix variabies that both are private and hold an `HTMLElement` with `_$`.

    ```javascript
    // okay
    const _$varName = document.querySelector(".secret")
    ```

- Acronyms and initialisms should be treated as regular words instead of always being written in uppercase.

    ```javascript
    // avoid
    const customerID = 1234
    const CSSInput = { color: "red" }
    
    // okay
    const customerId = 1234
    const cssInput = { color: "red }
    ```

## Others

- Never end lines with semicolons.

    ```javascript
    // avoid
    console.log();

    // okay
    console.log()
    ```

- Never start a line with `[`, `(`, `` ` ``, `+`, `*`, `/`, `-`, `,`, or `.`.

    > Why? They may cause unexpected behavior when semicolons are omitted.
    
    ```javascript
    // avoid
    (() => {
        // do stuff
    })()
    
    // okay
    ;(() => {
        // do stuff
    })()
    ```
    
- Use literal syntax instead of constructors.

    ```javascript
    // avoid
    const str = new String()
    const arr = new Array()
    
    // okay
    const str = ""
    const arr = []
    ```

- Use `"use strict"`.

    ```javascript
    "use strict"
    
    // do stuff
    ```

- Use `Number.isNaN` and `Number.isFinite` instead of `isNaN` and `isFinite`.

    ```javascript
    // avoid
    const condition1 = isNaN(x)
    const condition2 = isFinite(x)
    
    // okay
    x = parseInt(x)
    const condition1 = Number.isNaN(x)
    const condition2 = Number.isFinite(x)
    ```

- Do not use bloated or unnecessary libraries like jQuery.

## Sources of influence

- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)<sup>[[w](https://web.archive.org/web/20201124045135/https://github.com/airbnb/javascript)]</sup>
- [MediaWiki's JavaScript coding conventions](https://mediawiki.org/wiki/Manual:Coding_conventions/JavaScript)<sup>[[w](https://web.archive.org/web/20201025061629/https://www.mediawiki.org/wiki/Manual:Coding_conventions/JavaScript)]</sup>
- [*Clean Code* by Robert C. Martin](https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29)<sup>[[w](https://web.archive.org/web/20201222180855/https://gist.github.com/wojteklu/73c6914cc446146b8b533c0988cf8d29)]</sup>
- ["JavaScript Performance" on W3Schools](https://www.w3schools.com/js/js_performance.asp)<sup>[[w](https://web.archive.org/web/20201225175144/https://www.w3schools.com/js/js_performance.asp)]</sup>
- [JavaScript Standard Style](https://standardjs.com/rules.html)<sup>[[w](https://web.archive.org/web/20201223042111/https://standardjs.com/rules.html)]</sup>

## License

(The MIT License)

Copyright (c) 2012 Airbnb

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
