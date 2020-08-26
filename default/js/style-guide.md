# My JavaScript style guide
## Variables
* Always declare variables before use so as to avoid accidental globals.
* Use `const` to declare variables, unless it must be reassigned; then, use `let`. Never use `var`.
* Use one `const` or `let` per variable definition; never swap `;` for `,`.
    * The only exception is defining the index and length within `for` loops.
* Group all `const`s and then all `let`s.
* Never save references to `this`. Use instead arrow functions or `bind`.
* Use explanatory variables.
* Use object and array destructuring.
* Unused variables are forbidden.

## Objects
* Use computed property names when creating objects with dynamic property names.
* Use object method shorthand.
* Use property value shorthand.
* Group your shorthand properties at the beginning of your object declaration.
* Only quote properties that are invalid identifiers.
* Use trailing commas on multiline objects.
* Single-line objects are forbidden, unless it contains only spreads `...`, property shorthands, or one property.

## Arrays
* Use array spreads `...` to clone arrays.
* Use spreads `...` to convert an iterable object to an array.
   * If the iterable needs to be mapped, use `Array.from` instead to avoid creating an itermediate array.
* Use `Array.from` for converting an array-like object to an array.
   * This is because spreads `...` do not work on non-iterable objects.
* Use newlines after open and before close array brackets if an array has multiple lines.
* Place a space after each comma in single-line arrays.
* Use trailing commas in multiline arrays.

## Strings
* Use double quotes `""` for strings instead of single quotes `''`.
* Strings that exceed seventy-two characters must be written across multiple lines using string concatenation.
* When programmatically building up strings, use template strings when that is clearer.
* Use template strings to avoid escaping.

## Functions
* Use anonymous function expressions assigned to a `const` variable instead of function declarations.
* Wrap everything in an IIFE.
* Do not wrap IIFEs in parentheses. This will result in a syntax error for arrow functions.
```javascript
(() => {
    // Do stuff
})();
```
* Never use `arguments`, opt to use rest syntax `...` instead.
* Use default parameter syntax.
* Default parameters must not have side effects.
* Use spreads `...` to call variadic functions.
* When calling a function, arguments, whether single-line or multiline, should be formatted as an array.
* Never place a space before function parentheses.
```javascript
function() {}
```
* Place one space before function braces.

## Arrow functions
* Use arrow function notation when no bindings are needed.
* If the function body consists of a single statement spanning only one line, omit the braces and use the implicit return. Otherwise, keep the braces and use a return statement.
* Always include parentheses around arguments for consistency.

## Classes and constructors
* Use anonymous class expressions assigned to a `const` variable instead of class declarations.
* Always use `class`. Avoid manipulating `prototype` directly.
* Use extends for inheritance.
* Methods can return `this` to help with method chaining.
* Classes have a default constructor if one is not specified. Avoid unnecessary constructor functions.

## Iterators
* Use built-in functions instead of loops like `for-in` or `for-of`.
* Reduce activity in loops. Accessing a property each iteration is inefficient. Instead assign them first to variables.
```javascript
for (let i = 0, l = arr.length; i < l; i++)
     // Do stuff
```

## Operators
* Insert one space between operators and expressions.
* Use `===` and `!==` and never `==` and `!=`.
* Avoid Yoda conditionals.
* Use shortcuts in control statements, as expressions will be coerced into booleans.
* When mixing operators, enclose them in parentheses if that improves clarity.
* When an expression with logical operators span multiple lines, the logical operators must end lines.
```javascript
(
    true === false ||
    (arg[0] && arg[1]) ||
    arr.length
)
```
* Avoid unclear or nested ternaries.
* Use exponential operator `**` instead of `Math.pow`.

## Blocks
* Never use braces or create multiline blocks with control statements.
* Never use `switch` statements.
* If an `if` block executes a `return` statement (or throws and error), the subsequent `else` block is unnecessary.
* A `return` in an `else if` block following an `if` block that contains a `return` must be separated into multiple `if` blocks.
* Do not use short circuits in place of conditionals.

## Comments
* Use `/** ... */` for multiline comments
```javascript
/**
 * Here is a comment and here
 * is a uh what?
 */
```
* Use `//` for single-line comments. Always place single-line comments on a separate line above the subject of the comment.
* Start all comments with a space.
* Use `// FIXME:` to annotate problems.
* Use `// TODO:` to annotate solutions to prblems.

## Indentation
* Indent with soft tabs (spaces ` `) of four characters.
    * Soft tabs ensure the code always appears the same.
    * Four spaces makes code more readable and discourages excessive nesting.
* Use indentation when chaining methods, and they all must use a leading dot.

## Lines
* Never leave blank lines.
* Lines of code must not exceed eighty characters.
* Comments and long strings must not exceed seventy-two characters.
* Never use newlines after an `=` assignment. If the assignment is too long, surround the value in parentheses.
* Function names and control statements must not be on the same line as their body.
* Never use spaces between functions and their invocations.

## Space
* Never use trailing whitespace.
* Never use spaces to pad the inside of parentheses, square brackets, or curly braces.
* Use one space before the parentheses in control statements.
* Never use horizontal alignment.
* Use one space to separate keywords followed by parentheses.
    * This gives visual distinction between keywords and functions invocations.

## Naming conventions
* Use camelCase when naming regular variables.
* Use PascalCase when naming constructors or classes.
* Use UPPER_CASE when naming constants.
    * Otherwise, avoid underscores in identifiers.
* Acronyms and initialisms that are usually uppercase must be uppercase in code as well.

## Others
* Use semicolons.
* Use literal syntax instead of constructors.
* Use `"use strict"`.
* Use `Number.isNaN` instead of `isNaN`.
* Use `Number.isFinite` instead of `isFinite`.
* The use of jQuery and other libraries is discouraged.

## Sources of influence
* [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
* [MediaWiki Javascript coding conventions](https://mediawiki.org/wiki/Manual:Coding_conventions/JavaScript)
