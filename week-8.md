# Intro to JavaScript (Data Types, Variables, Arrays)

## Connecting JavaScript and HTML

Just as CSS goes in the `<style>` tag, JavaScript lives in the `<script>` tag.

The `<script>` tag can either go in the `<head>` or the `<body>`, depending on how large the script is.

For our purposes, we can start by putting it inside the `<body>` for now. The `<script>` usually goes right before the closing tag and after all your page's visible contents.[^1] The `<script>` can either contain actual JavaScript code, or link to an external script via the `src` attribute.

```HTML
<body>
    ...
    <script>
        console.log("Hello, world")
    </script>
</body>
```

```HTML
<body>
    ...
    <script src="script.js"></script>
</body>
```

If you have a heftier script, you can put the script tag in the `<head>` with the attribute `defer`, which tells the browser to start downloading the script as it is parsing the HTML, but waits for the script to execute until all the HTML is loaded. This is the more standard practice for web apps today, since they tend to be complex.

```HTML
<head>
...
<script defer src="script.js"></script>
</head>
```

## The Console

You might be wondering what that first line of JavaScript above means. `console.log()` prints any argument you give it to what is called the console.

The **console** is your #1 helper when working with JavaScript. You can access the console through your web browser's developer tools, by going to the "Console" tab.

The console is used to log error messages, warnings, and any information of your choice that will help you understand what your script's output looks like.

## Data

### Data Types

In JavaScript, data are categorized into several types. Here are some of the main "primitive" data types:

- **numbers**
  - any floating-point numbers
  - e.g. `5`, `-5.5555`
- **strings**
  - any sequence of characters (text); must be between single or double quotes
  - e.g. `"hello"`
- **boolean**
  - true or false, without quotes; used to convey logic and states
  - e.g. `true`

If you're unsure what the data type of something is, you can check using the `typeof` operator.

```javascript
console.log(typeof "hello"); // string
console.log(typeof 43110); // number
console.log(typeof false); // boolean
```

In JS, different data types can be combined through a process is called **type coercion**. JavaScript automatically converts one data type to another (usually to a string) so the operation can finish instead of throwing an error. This is why JavaScript is considered a forgiving language.

```javascript
// string + string
console.log("Timor" + " " + "Leste");
// 'Timor Leste' (string)

// string + number
console.log(75 + "cents");
// '75cents' (string)

// number + number
console.log(75 + 25);
// 100 (number)

// string + boolean
console.log(true + " to form");
// 'true to form' (string)

// boolean + number
console.log(true + 75);
// '76' (number)
// this is because false = 0 and true = 1
```

### Data Structures

Data structures are objects within JavaScript that house multiple datum.

- **arrays**
  - a list of data
  - e.g. `[2, 3, 5, 7, 11, 13]`
- **objects**
  - a list of categorized data
  - e.g.
  ```javascript
  {
    "name": "Sam",
    "age": 33,
    "employed": false
  }
  ```
- **nested structures**
  - a list of categorized data, which may themselves be lists
  - e.g. an array within an object

  ```javascript
  {
    "name": "Leya",
    "cats": ["monkey", "samson", "socks"]
  }
  ```

  - e.g. an array of objects

  ```javascript
  [
    {
      name: "Leya",
      age: 10,
      cat_names: ["monkey", "samson", "socks"],
    },
    {
      name: "Jordan",
      age: 58,
      cat_names: ["mimi", "buttercup"],
    },
    {
      name: "Sora",
      age: 25,
      cat_names: ["doorknob", "gray cat"],
    },
  ];
  ```

## Variables

**Variables** are the bread and butter of JavaScript, and programming languages generally. They help you abstract your script away from hard values, making it more adaptable to different cases.

To create a variable in JavaScript, you precede its name by `const` or `let`. `const` is used for constant variables whose values will not change. `let` is used for variables whose values can be updated late in the script.

```javascript
const feet_per_mile = 5280;
let feet_driven = 138864;
...
feet_driven = 179520;
```

Variables can be named essentially anything, save a few syntactical rules. If your variable name exceeds one word, combine the words using snake case (`this_is_snake_case`) or camel case (`thisIsCamelCase`). In JavaScript, variables and functions (which we'll learn about next week) cannot include a `-`, `.`, or any special characters, and they cannot start with a number.

You might also occasionally see variables declared using `var`. `var` is a dated but valid variable declaration that has some nuances compared to `let`. Stick to using `let`, since it's the most updated variable declaration for mutable variables.

Because variable names will compute to their values, you can use them to sub-in for multiple instances of the same value, or a dynamic value.

```javascript
const pageType = "gallery";

console.log("Welcome to the " + pageType + " page");
// 'Welcome to the gallery page'
```

Switching between strings and variables can get tiring, so you can use **string literals** to combine them without concatenators. String literals are surrounded by backticks (`` ` ``) and any variables within them are denoted with `${}`.

```javascript
console.log(`Welcome to the ${pageType} page`);
// 'Welcome to the gallery page'
```

## Properties and Methods

In JS, objects have properties and methods. **Properties** convey static information about the object, which can include its state.

**Methods** are actions that can be taken on a given object. Many objects in JS come with a set of built-in methods.

### Properties and methods for strings

```javascript
let townName = "Worthinghamptonshireton";

console.log(townName.length);
// '23' (number of characters, including spaces)

console.log(townName.toUpperCase());
// 'WORTHINGHAMPTONSHIRETON'

console.log(townName.toLowerCase());
// 'worthinghamptonshireton'

console.log(townName.split("o"));
// ['W', 'rthinghampt', 'nshiret', 'n']
```

`length` is a property of a string object, which is why we call it without an argument. On the other hand, methods like `.toUpperCase()`, `.toLowerCase()`, and `.split()` can optionally take an argument that will factor into its intended task.

### Properties and methods for arrays

```javascript
let authors = [
  "Virginia Woolf",
  "Charlotte Bronte",
  "Toni Morrison",
  "Zora Neale Hurston",
  "Jane Austen",
];

console.log(authors.length);
// '5'

console.log(authors.toString());
// 'Virginia Woolf,Charlotte Bronte,Toni Morrison,Zora Neale Hurston,Jane Austen'

// JOINS

console.log(authors.join());
// 'Virginia Woolf,Charlotte Bronte,Toni Morrison,Zora Neale Hurston,Jane Austen'

console.log(authors.join("*"));
// 'Virginia Woolf*Charlotte Bronte*Toni Morrison*Zora Neale Hurston*Jane Austen'

console.log(authors.join(""));
// 'Virginia WoolfCharlotte BronteToni MorrisonZora Neale HurstonJane Austen'

// PUSH vs. POP

authors.push("Sylvia Plath");
// adds an item to the end of the authors array

console.log(authors);
// ["Virginia Woolf","Charlotte Bronte","Toni Morrison","Zora Neale Hurston","Jane Austen","Sylvia Plath"]

console.log(authors.pop());
// 'Sylvia Plath' (removes the last array item)

console.log(authors);
// ["Virginia Woolf","Charlotte Bronte","Toni Morrison","Zora Neale Hurston","Jane Austen"]
```

You can also grab specific items from within an array based on zero-based indexes (start from 0) and increase in increments of 1 with each next item.

```javascript
let authors = [
  "Virginia Woolf",
  "Charlotte Bronte",
  "Toni Morrison",
  "Zora Neale Hurston",
  "Jane Austen",
];

console.log(authors[0]);
// 'Virginia Woolf'

console.log(authors[3]);
// 'Zora Neale Hurston'
```

Technically, strings within JS are arrays of characters, so you can use array methods on them too.

```javascript
let townName = "Worthinghamptonshireton";

console.log(townName[11]);
// 'p'

console.log(townName.split(""));
//  ["W","o","r","t","h","i","n","g","h","a","m","p","t","o","n","s","h","i","r","e","t","o","n"]
```

## Random

`Math` is a built-in object in JavaScript that comes with a number of handy methods. These include methods that can accept any numerical value(s) and return its sine or cosine, its square root, or the minimum or maximum. They can also return the value of pi or give you a random number. The last method is what we'll touch on now.

`Math.random()` gives you a random value[^2] between 0 and 1. Even though it looks like it accepts an argument, usually none is provided. However, because the value is usually a floating-point value with many decimal places, and because the actual figure is quite small, it's usually used in combination with `Math.floor()` and multiplied by an integer to result in a more useful random value. `Math.floor()` rounds any number down to the nearest integer.

```javascript
console.log(Math.floor(Math.random() * 3));
// returns a random number between 0 and 3
```

You can then use this to, say, pull a random value out of an array:

```javascript
let authors = [
  "Virginia Woolf",
  "Charlotte Bronte",
  "Toni Morrison",
  "Zora Neale Hurston",
  "Jane Austen",
];

console.log(authors[Math.floor(Math.random() * authors.length)]);
// returns a random author!
```

---

[^1]: Technically, the `<script>` can work from any position within the `<body>`, but it's recommended to place it before the closing `</body>` because it ensures the HTML is fully parsed and the visual elements are loaded before the script tries to manipulate them. This prevents errors where the script tries to grab an element that doesn't "exist" yet, preventing the rest of the script of executing. We'll learn more about how JavaScript interacts with the DOM next week.

[^2]: If we want to be precise, `Math.random()` returns a pseudo-random number. You can read more about psuedo- vs. true random numbers at [random.org](https://www.random.org/).
