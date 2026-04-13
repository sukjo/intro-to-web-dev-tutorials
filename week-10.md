# JavaScript Continued (APIs, Databases, Parsing)

Last week, we learned how to grab data from the DOM and manipulate it using functions, event listeners, loops, and conditional statements. In modern day websites, the data for a given site most likely won't be hard-coded right into the source files, but rather pulled in dynamically. This happens for a number of reasons, including 1) there is simply too much data to fit it into the website files, and/or 2) that data may be ever-changing, and/or 3) the data may live on another server entirely.

Today, we'll be learning how to use APIs to grab data from a source outside of our own website and integrate it into our webpage. In other words, we'll be making our first **dynamic websites**.

Even if your project for this class has a small enough amount of data that you can manage them directly within your `index.html` or your own `.json` file, knowing how to use JavaScript for data requests will bring you up to speed with the inner workings of most modern websites.

## APIs

An **API**, or **Application Programming Interface**, is simply a way to get one software to talk to another. For our purposes in this class, we will be using public web APIs that allow a website to request, receive, and process data directly from a data server.[^1]

## fetch()

In order to grab data from a public web API and render it on our webpage, we'll need to rely the **fetch** method in JavaScript. Technically, `fetch` is also an API: it's an interface built into the web browser allows your webpage to make HTTP requests via JavaScript.[^2]

If you recall earlier weeks' lessons, every time you navigate to a website by URL, the browser automatically submits a `GET` request to the web server for the website's source files, and then renders them visually once they are retrieved.

When you submit an HTTP request via `fetch`, it's as if your website is submitting a `GET` request to another server in the background, without leading the visitor away from the page. The difference is, instead of the browser automatically rendering the resulting data in the DOM, you (via your JavaScript code) decide what happens to that data once it is retrieved.

The base structure of a `fetch` call is as such:

```javascript
fetch("https://example-source.org").then((response) => {
  console.log(response);
});
```

First the `fetch` requests data from a specific path or URL. Then the `.then` method chained onto it does something with the response. In this case, it logs the retrieved data to the console.

To explain in a little more detail, calling `fetch()` returns what is called a **promise** in JavaScript. You can think of a promise as a receipt for something that hasn't loaded yet. The promise then "resolves" to a **response** containing the data you requested, which then you are then free to use as you wish.

The reason we need to rely on a promise for `fetch` is that it can take a few moments for our our data to be retrieved from an external source. The more data you request, the longer the request will take to resolve. Yet, even a delay of mere milliseconds can cause interruptions in our script. So instead of stalling our script as the data loads, we use a promise to continue executing the rest of our script in parallel to the `fetch`.

You'll also notice in the above example there is what's called an **arrow function**. Arrow functions are another way of writing functions in JS. There are some nuances between them but don't worry about them for now. Just recognize that these are both valid ways of writing functions.

```javascript
// function declaration
function printHello() {
  console.log("hello");
}

// arrow function
const printHello = () => {
  console.log("hello");
};

// function declaration with argument
function printMessage(msg) {
  console.log(msg);
}

// arrow function with argument
const printMessage = (msg) => {
  console.log(msg);
};
```

### Parsing data

Usually, whatever data you fetch via an external URL will arrive as raw text. If you're using a standard web API, in most cases that text will be formatted in **JSON**. JSON stands for **JavaScript Object Notation**, and it's a file format based on a subset of the JavaScript programming language designed to be easily read by humans and computers. If you inspect the syntax of a JSON file, you'll find that it's very similar (though not the same as) a JavaScript object or array.[^3]

![an object with a person's first name, last name, date of birth, and blood type in JSON vs. JavaScript](/images/json-vs-js.png)

Since JSON is a different format from JS, you first need to **parse** the data in order to convert it into an object or value that JS recognizes. If you don't, you'll have trouble accessing the contents of the request. On the lefthand side in comparison below, all you see is a bunch of metadata about the request itself, while the contents are hidden behind something called "ReadableStream". On the righthand side, you can keep drilling into the data until you start seeing attributes of individual items, like "title" and "url".

![side-by-side comparison of a request logged to the console without parsing and with parsing](/images/parsing-vs-no-parsing.png)

To parse JSON, you simply apply the `.json()` method on your fetch response.

```javascript
fetch("https://example-source.org")
  .then((response) => response.json()) // parse the data into a JS object/value
  .then((data) => console.log(data)) // log the parsed data to the console
  .catch((error) => console.error(error)); // catch any errors
```

Another new method we see here is `.catch()`. While `.then()` runs when the request is resolved successfully, `.catch()` runs when it fails. It's a good practice to include `.catch()` to help you locate bugs in your code, and/or give feedback to a user that something went wrong.

## Asynchronous Functions

Since the `fetch` API is promise-based, it keeps running while the code that follows executes. In this way, it works asynchronously.

**Asynchronous functions** are another way of using promises. Asynchronous functions are preceded by `async` and use the keyword `await` whenever there's a part of the code that requires a promise.

```javascript
async function getData() {
  const response = await fetch("https://example-source.org");
  // the fetch requires an "await" since it's a promise
  const data = await response.json();
  // the response awaits the fetch, thus it requires an "await" as well
  console.log(data);
}
```

The snippet above is effectively the same as the `fetch` example, but written in a way that is slightly more legible. Whenever you're pulling data in from a source that requires a load time, you can use either `fetch` or an `async` function.

---

[^1]: Among web APIs, there are **public APIs** and **private APIs**. As they are named, public APIs are data sources that are meant to be used externally (i.e. by laypeople outside of the hosting organization), while the private APIs are used exclusively by members of an organization.

[^2]: The terminology is a bit confusing because "API" encompasses many different methods. In this case, you can think of the fetch API as a mechanism used to talk to other servers, while the public API is a way of getting the data itself from another server.

[^3]: The main differences between JSON and JS are that in a JSON file: 1) all keys and string values must be enclosed in double quotes, 2) all items must be wrapped together in a top-level `[]` or `{}`, 3) you cannot include functions (which isn't something we've covered but yes, you can write functions into an array or object in JS).
