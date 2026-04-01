# JavaScript Continued (Functions, DOM Manipulation, Event Listening, Loops)

## Functions

**Functions** are a key building block of JavaScript that allows you to group certain instructions together and reference them by name, instead of writing them over and over again.

Let's start with a simple example so we can see how functions are written.

```JavaScript
// first we declare the function
function printHello() {
    console.log("hello!")
}

// then we run it
printHello();
```

Functions can take arguments in between the parentheses. This means you can re-use the same set of instructions for multiple cases:

```JavaScript
function printMessage(msg) {
    console.log(`New message: ${msg}`);
}

printMessage("hello");
printMessage("bonjour");
printMessage("salam");
printMessage("aloha");
```

If you ever find yourself copy/pasting a line of code, you should probably store that code in a function instead, so you can call it by the function name and pass in some arguments, rather than repeating the whole thing over and over again.

## Manipulating the DOM

In order to interact with HTML elements, JavaScript references them via the DOM (Document Object Model), which is an internal representation of the HTML document.

Using JS, you can "grab" an element by their id, class name, tag name, or a CSS selector.

```HTML
<span id="question">Are human beings actually supposed to be the ones reading computer programs?</span>

<script>
    // "grab" an element by its id
    document.getElementById('question');

    // "grab" an element by its CSS selector
    document.querySelector('#question');
</script>
```

Once we've grabbed the desired element, we can do things like change its style or text content right in JavaScript.

```JavaScript
// grab the element by its id and store the reference in a variable
const question = document.getElementById('question');

// change the text contents of that
question.textContent = "Are computers actually supposed to be the ones reading human outputs?";

// update the color
question.style.color = "red";

// append text to the end
question.append(" Well maybe...");

// insert HTML inside the element
question.innerHTML = "<strong>Are human beings actually supposed to be the ones reading computer programs?</strong>";
```

You can see a list of different DOM manipulation techniques on [JavaScriptTutorial.net](https://www.javascripttutorial.net/dom/manipulating/).

## Conditionals

**Conditional functions** are functions that say "if X is true, do Y". You can think of them as a way to automate the logic behind _when_ certain instructions run or don't run within your script.

Alone, an **if statement** is structured as such:

```html
<body style="background-color: whitesmoke">
  <script>
    function changeColor() {
      const body = document.querySelector("body");

      // if the background color of <body> is "whitesmoke", change the text color to "tomato"
      if (body.style.backgroundColor === "whitesmoke") {
        body.style.color = "tomato";
      }
    }

    // run the function
    changeColor();
  </script>
</body>
```

The condition goes in between parentheses after `if`. Conditions usually include one or more comparisons between two values that amount to `true` or `false`.

In this example, the statement is true if the background color of the `<body>` is `whitesmoke`. The `===` is one of a few **comparison operators** you can use to write "if" conditions. See this [cheatsheet](https://webdevtales.com/wp-content/uploads/2024/09/Comparison-JavaScript-Operators-Cheat-Sheet.jpg.webp) for the others.

What follows in the `{}` are the actual instructions you want to run when that condition is met.

There are also **if/else statements**, which allow you to chain multiple conditions. The "else" block will only run if the "if" block is false. The "else" block thus functions as a catch-all for all cases when the if statement is _not_ true.

```javascript
function changeColor() {
  const body = document.querySelector("body");

  if (body.style.backgroundColor === "blue") {
    body.style.color = "white";
  } else {
    body.style.color = "tomato";
  }
}

changeColor();
```

From there, you can chain multiple conditions to check for different states.

```javascript
function changeColor() {
  const body = document.querySelector("body");

  if (body.style.backgroundColor === "blue") {
    body.style.color = "white";
  } else if (body.style.backgroundColor === "turquoise") {
    body.style.color = "teal";
  } else {
    body.style.color = "tomato";
  }
}

changeColor();
```

## Event Listening

In JavaScript, you can make changes happen based on **events**, or interactions that occur in the browser based on the user's input.

The way you do this is by creating a function that "listens" for a given event, and then runs a set of instructions once it does.

```HTML
<form>
    <label>
        Name:
        <input name="name" type="text" />
    </label>
    <label>
        Message:
        <input name="message" type="text" />
    </label>
    <button id="submit">Submit</button>
</form>

<script>
    const submitButton = document.getElementById("submit");

// add a function that "listens" to the button for any clicks
    submitButton.addEventListener("click", function () {
        alert("Message sent!");
    });
</script>
```

Functions that run an action based on an event are called **event handlers**. In addition to clicks, you can also listen for:

- mouse-related events (i.e. hovering, clicking button)
- keyboard-related events (i.e. close module when the user presses `esc` key)
- focus-related events (i.e. focus in, focus out)
- input field changes (i.e. slider moved, form submitted)
- when the page is fully loaded (i.e. wait to run JavaScript until the DOM tree is fully rendered)

Here's another example combining conditionals and event handlers. The following snippet listens for any changes the user makes to the slider, and then reveals or hides nodes if the slider value matches a given range (in this case, the duration of a given war).

```HTML
<div id="wwi" class="node">WWI</div>
<div id="wwii" class="node">WWII</div>
<div id="vietnam" class="node">Vietnam War</div>
<div id="korea" class="node">Korean War</div>

<input type="range" id="timeline" min="1910" max="1980" value="1900" />

<script>
    const slider = document.getElementById("timeline");

    const WWI = document.getElementById("wwi");
    const WWII = document.getElementById("wwii");
    const VietnamWar = document.getElementById("vietnam");
    const KoreanWar = document.getElementById("korea");

    slider.addEventListener("input", function () {
        // convert the slider string value into a number
        let year = parseInt(slider.value);

        // check for WWI
        if (year >= 1914 && year <= 1918) {
            WWI.style.opacity = "1";
        } else {
            WWI.style.opacity = "0";
        }

        // check for WWII
        if (year >= 1939 && year <= 1945) {
            WWII.style.opacity = "1";
        } else {
            WWII.style.opacity = "0";
        }

        // check for Vietnam War
        if (year >= 1955 && year <= 1975) {
            VietnamWar.style.opacity = "1";
        } else {
            VietnamWar.style.opacity = "0";
        }

        // check for Korean War Check
        if (year >= 1950 && year <= 1953) {
            KoreanWar.style.opacity = "1";
        } else {
            KoreanWar.style.opacity = "0";
        }
    });
</script>
```

## Loops

**Loops** are a method of repeating an instruction a number of times. It's a quick way to get through repeating tasks all at once. Say you have an array of objects containing the metadata of some visual artifacts:

```javascript
const artifacts = [
  {
    url: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/327497/711720/main-image",
    title: "Plate with a hunting scene from the tale of Bahram Gur and Azadeh",
    alt: "Plate with a hunting scene from the tale of Bahram Gur and Azadeh, Silver, mercury gilding, Sasanian",
  },
  {
    url: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/324155/713544/main-image",
    title: "Eye idol",
    alt: "Eye idol, Gypsum alabaster",
  },
  {
    url: "https://collectionapi.metmuseum.org/api/collection/v1/iiif/324917/711766/main-image",
    title: "Storage jar decorated with mountain goats",
    alt: "Storage jar decorated with mountain goats, Ceramic, paint",
  },
];
```

How would you place them on your webpage without writing any repeating code?

There are a number of ways we can do this in JS, but we're just going to focus on two methods for now: **for loops** and **forEach**.

### for loops

The **for loop** is the most classic way to create an iterative function. It acts like a manual counter that starts from a given value and increases in a given increment until it reaches a given stop value. All those values are provided by you.

```JavaScript
const container = document.querySelector("#artifacts");

// start at 0, stop at the number of artifacts, and increment up by 1
for (let i = 0; i < artifacts.length; i++) {

  // grab the metadata for the current item
  let item = artifacts[i];

  // feed the metadata into HTML tags
  container.innerHTML += `
    <div class="card">
      <img src="${item.url}" alt="${item.alt}">
      <h3>${item.title}</h3>
    </div>
  `;
}
```

### forEach

The **forEach** method is a more modern, "automatic" way to loop. Instead of managing a counter (i), you simply tell JavaScript: "For every single item in this list, run these instructions." It's also just easier to read and thus less prone to errors.

This is particularly useful when you have a folder or database of many items and you want to apply the same set of instructions to them without having to keep track of how many items are added/removed.

```JavaScript
const container = document.querySelector("#artifacts");

artifacts.forEach(function(item) {
    // 'item' automatically represents whichever object the loop is currently on
    container.innerHTML += `
    <div class="card">
        <img src="${item.url}" alt="${item.alt}">
        <h3>${item.title}</h3>
    </div>
  `;
})
```

Try adding a few more items to the array via [The Met Collection](https://www.metmuseum.org/art/collection/search?department=Ancient+West+Asian+Art) and see how they update on the page.

**Note:** When using loops, be careful not to create an **infinite loop**. This happens when the "stop condition" of a loop is never met, and it just keeps running. If this happens, your browser will attempt to run the instructions forever, which will probably cause your tab to crash. If your page ever suddenly stops responding after you save your JS, it's probably due to an infinite loop.

## Putting it all together

Using a combination of functions, event handlers, and loops, you can do things like pipe data from a JS object into HTML elements all at once.

```javascript
const poems = [
  {
    author: "Gabriela Mistral",
    year: "1925",
    title: "Ecstasy",
    language: "Spanish",
  },
  {
    author: "Maya Angelou",
    year: "1978",
    title: "Still I Rise",
    language: "English",
  },
  {
    author: "Audre Lorde",
    year: "1978",
    title: "A Woman Speaks",
    language: "English",
  },
  {
    author: "Li-Young Lee",
    year: "1986",
    title: "Persimmons",
    language: "English",
  },
  {
    author: "Forugh Farrokhzad",
    year: "1964",
    title: "I Pity the Garden",
    language: "Persian",
  },
  {
    author: "Joy Harjo",
    year: "2019",
    title: "How to Write a Poem in a Time of War",
    language: "English",
  },
];

function createPoemCard(poem) {
  // 1. Create the container for each poem
  const container = document.createElement("div");
  container.classList.add("poem__container");

  // 2. CONDITIONAL: Set background color based on language
  if (poem.language === "Spanish") {
    container.style.backgroundColor = "lightyellow";
  } else if (poem.language === "Persian") {
    container.style.backgroundColor = "lightcyan";
  } else {
    container.style.backgroundColor = "whitesmoke"; // Default for English
  }

  // 3. create new elements for  the title, author, year
  const title = document.createElement("h3");
  title.textContent = poem.title;
  container.appendChild(title);

  const author = document.createElement("h4");
  author.textContent = `${poem.author} (${poem.year})`;
  container.appendChild(author);

  // 4. inject the finished card into the body
  document.body.appendChild(container);
}

// 5. LOOP: now run the function for every poem in our array
poems.forEach((poem) => {
  createPoemCard(poem);
});
```
