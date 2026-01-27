# Intro to HTML (Elements, Tags, Hierarchy)

## What is HTML?

HTML stands for **hypertext markup language**. HTML is the so-called "building block" of the web. It was invented by Tim Berners-Lee, the inventor of the World Wide Web, in 1989 as part of a proposal to create an Internet-based hypertext system. His intention was to create a language that web browsers could use to interpret and compose text, images, and other material into web pages.

### Hypertext

**Hypertext** is text that links to other text. The notion of hypertext precedes web browsers and the internet. Encyclopedias, phone directories, user manuals, and bibliographies are all examples of hypertexts, because they guide the reader from an index to another page.

### Markup

Last week, we learned about markdown as we made our README files. This week we're learning about mark*up*. What's the difference?

**Markup languages** are used to structure, format, and create relationships between components of data. They are not technically programming languages—markup languages cannot run any logic. Rather they provide syntax for the presentation of data. Markdown is itself a markup language that is made to be lightweight and quick to write.

HTML is just one of many markup languages. Others include XML, SGML, CSS, and LaTeX.

### Language

Computer languages have their own syntax and vocabulary, just as any human language. Different types of languages serve different purposes.

In this class, we'll be learning two markup languages (HTML and CSS), as well as the scripting language JavaScript. HTML provides the "skeleton" of the web page, CSS applies the visual styling, and JavaScript adds interactivity and dynamic behavior.

## Writing HTML

### Tags

Just as an editor at a print newspaper company might mark up a journalist's article to help the typesetter understand how to print it, we can help computers understand how to format our text by tagging it.

In HTML, **tags** wrap around a given component of text as such:

![diagram showing the opening tag, content, and closing tag of an HTML element](/images/html-element.png)

Altogether, the tags and their contents can be called an **element**. People use tag or element interchangeably to refer to these units.

Tags in HTML are preordained for specific purposes. You can find an updated list of existing tags at [MDN's HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements). They can be used to provide metadata on a given document, or to demarcate sections, create hierarchy, apply styles, and add images and other non-textual content. They can also be used to create interactive elements like forms, links, and navigation menus.

Tags shake out into several categories depending on their purpose and behavior:

1. **Structural/container tags** - help organize and provide a layout for the web page.
   - `<body>`, `<div>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`, `<nav>`
2. **Text content tags** - differentiate text content. These are **block-level**, meaning they appear in "blocks" that span the width of their parent container, and thus each one begins on a new line.
   - `<h1>` - `<h6>`, `<p>`, `<blockquote>`, `<ul>`, `<ol>`, `<li>`
3. **Inline text formatting tags** - modify or add meaning to text without breaking the flow. These are **inline** elements, meaning they sit within a line of text and are only as wide as their contents.
   - `<b>` or `<strong>`, `<i>` or `<em>`, `<a>`, `<span>`, `<code>`
4. **Media tags** - embed visual and/or audio content. Images are inline by default, while video and audio are block-level.
   - `<img>`, `<video>`, `<audio>`, `<svg>`
5. **Form/input tags** - create interactive elements for user input. Forms are block-level while input elements are inline or inline-block.
   - `<form>`, `<input>`, `<button>`, `<select>`, `<textarea>`, `<label>`
6. **Metadata/head tags** - these tags go in the `<head>` section of a document and provide information about the document. They are not visible on the rendered webpage.
   - `<meta>`, `<title>`, `<link>`, `<script>`, `<style>`

Here's a visual demonstration of how block and inline elements behave:

![diagram showing block-level elements spanning the full width of a box on the left, and inline elements going left-to-right on a row and wrapping to the next line on the right](/images/block-vs-inline-elements.png)

### Attributes

Elements can contain **attributes** in their opening tag. These attributes will have a standard name are always followed by a `=` and a value within single or double quotation marks.

![diagram showing the attribute and value of an anchor tag within the opening tag, then the text content and closing tag](/images/html-element-attribute.png)

In this case, the `href` (hypertext reference) attribute of the anchor tag tells the document where the link should lead to. Anchor tags always need an `href` attribute, because their essential function is to send the user to another location.

Image tags always require `src` (source) and `alt` (alt text) attributes. `src` represents the location of the image file at hand. `alt` provides a description of the image for screen readers and also for seeing viewers, in case the image file does not load properly.

```
<img alt="four sea angels floating in a group" src="https://upload.wikimedia.org/wikipedia/commons/4/46/Campagne_IBTS_2010_-_Mollusques_anges_de_mer_%28Clione_limacina%29_%28Ifremer_00576-68796_-_27515%29.jpg" />
```

The source links for `<a>` and `<img>` can be a web URL or a local file. Web URLs are complete internet addresses that begin with `http://` or `https://`, as shown above.

To reference local files, you can use a **file path**. File paths come in two varieties:

1. **Absolute file paths** - the complete "address" of the file from the root directory[^1]. These start with a forward slash `/`.
   ```
   <img alt="lone tree in a field"
   src="/Users/myUsername/Documents/myFirstHTMLProject/images/tree.jpg" />
   ```
2. **Relative file paths** - your file's address relative to the current dcument's position.

   Say your image file is located at the same level as your HTML file...

   ```
   └── 📁 myFirstHTMLProject
       ├── 📄 index.html
       └── 🖼️ tree.jpg
   ```

   ... the `src` would be written as:

   ```
   <img alt="lone tree in a field" src="tree.jpg" />
   ```

   If your image file is located within a separate "image" folder, one level down from your index file...

   ```
   └── 📁 myFirstHTMLProject
       ├── 📁 images
       │   └── 🖼️ tree.jpg
       └── 📄 index.html
   ```

   ... then your `src` would start with a `.` to indicate the current directory[^2], then the `/images/` folder, then the file:

   ```
   <img alt="lone tree in a field" src="./images/tree.jpg" />
   ```

   If your image file is in one folder, and your HTML file is another folder...

   ```
   └── 📁 myFirstHTMLProject
       ├── 📁 images
       │   └── 🖼️ tree.jpg
       └── 📁 source
           └── 📄 index.html
   ```

   ... then you would have to go "up" a level by using `..` before going into the adjacent folder:

   ```
   <img alt="lone tree in a field" src="../images/tree.jpg" />
   ```

Not all tags require attributes, but you can apply certain attributes optionally to any tag.

**Classes** and **ids** are two attributes which are used in 90% of modern web pages. They help specify a given tag so it can be referenced in CSS or JavaScript. The id attribute applies a unique identifier to an element. Each unique id should only be used on one element. The class attribute is used as a shared identifier between multiple elements.

```
<h1 id="special">Special Header</h1>
<p class="left-aligned">Text</p>
<p class="left-aligned">Text</p>
<p class="left-aligned">Text</p>
```

We'll learn more about using classes and ids next week.

### Semantic HTML

It's important to use as specific a tag as possible for your page's contents, because each tag has an implicit role that tells browsers, web crawlers, and assistive technologies how to interpret them.

Some tags are loosely defined in their usage, and are said not to have implicit roles. `<div>` and `<span>` are two common examples. `<div>` is often used as a container for other content. `<span>` is a tag for text content. Both of these elements do not have default stylings and can transform into most any shape using CSS. If you find yourself reaching for these tags, first make sure that there is no existing HTML tag more suitable for your content.

For example, a `<div>` could be swapped for `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`, or `<nav>`.

A `<span>` could be swapped for `<strong>` or `<em>`, or even `<address>`, `<abbr>`, `<sup>`, `<s>`, or others.

Another common mistake is to use `<button>` interchangeably with `<a>` (anchor tag). Both solicit an action from the user, but with different purposes. `<a>` is used to navigate to another page, section of a page, or a different website altogether. Meanwhile, `<button>` is used to perform an action while remaining on the same page, like saving state, submitting a form, or closing a modal.

## Hierarchy

Hierarchy in HTML is conveyed in two ways: 1) the order of the elements, and 2) nesting.

### Element Order

Every HTML document begins with a `DOCTYPE` declaration. This is not an HTML element. Its function is to tell the browser what version of HTML to expect and how to render it. For our purposes, we can always use the following `DOCTYPE` declaration:

```
<!DOCTYPE html>
```

What follows is the `<html>` element. All the contents of a HTML document should be wrapped in this element. It is the top-most level in the nesting order, thus it is called the **root element**. At minimum, the `<html>` should always contain a `lang` attribute, as this tells screen readers in what language to announce the page.

```
<!DOCTYPE html>
<html lang="en"></html>
```

Within the `<html>` are the `<head>` and `<body>` tags, in that order.

The `<head>` contains the webpage title and metadata. Metadata are all contained within the `<meta>` tag, but different types are distinguished by the `name` or other attributes. These do not render to the browser visibly, aside from the title, which shows in the browser tab. The `<head>` is also where you'll link external stylesheets (CSS) and scripts (JavaScript).

```
<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="description" content="Intro to Web Dev class schedule">
    <meta name="keywords" content="HTML, CSS, JavaScript">
    <meta name="author" content="Jo Suk">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Intro to Web Dev Schedule</title>
    </head>
</html>
```

Below the `<head>` is the `<body>`, naturally. The `<body>` contains all the contents of your webpage and can be expected to render to the page visibly. This is where you can start loading in the tags we learned earlier.

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="description" content="Intro to Web Dev class schedule">
        <meta name="keywords" content="HTML, CSS, JavaScript">
        <meta name="author" content="Jo Suk">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Intro to Web Dev Schedule</title>
    </head>
    <body>
        <header>
            <h1>Welcome to Intro to Web Dev!</h1>
        </header>
        <main>
            <p>Schedule goes here...</p>
        </main>
    </body>
</html>
```

When a browser loads your HTML file, it parses the code line by line from top to bottom, constructing what is called the **Document Object Model (DOM)**. The DOM is a tree-like representation of your page's structure. Each HTML element becomes a "node" in this tree, with parent-child relationships reflected within.

![diagram of the DOM tree by W3 Schools, starting with the document at the top, leading to the child root element, and then branching out into head and body elements, and further into their respective child elements](/images/w3-dom.gif)

The browser uses the DOM to render your page visually, as well as to allow JavaScript to interact with and manipulate the page content. The DOM also informs how CSS styling is applied, since nested elements inherit style properties from their parents.

The order in which you write your elements reflects, for the most part, how they will appear on the webpage from top to bottom. Elements in HTML are dropped onto the page from top to bottom (block elements), left to right (inline elements).

HTML alone only provides structure and basic ordering. By adding CSS, we can fine-tune the visual presentation of our page, including the overall layout and element positioning. We'll see this in action in the coming weeks.

### Nesting

The first and most obvious rule of nesting is that elements with opening and closing tags should be closed in the opposite order that they are opened.

```
❌ INCORRECT NESTING
<header>
<h1>
Lorem ipsum
</header>
</h1>
```

You can nest elements within each other infinitely, but with all things, nesting order should be deliberate. We'll see once we get into CSS, but applying styles can get messy if you nest too deeply.

```
<header>
    <h1>Lorem ipsum</h1>
</header>
<main>
    <section>
        <h2>dolor sit amet</h2>
        <p>Aliquam in <strong>hendrerit</strong> urna.</p>
        <p>Curabitur pellentesque nibh nibh.</p>
    </section>
</main>
```

As you may have picked up, structural elements that go around other elements are usually called **wrappers** or **containers**. Some elements are expected to have specific tags nested within them, like `<ul>`/`<ol>` and `<table>`.

`<ul>` (unordered lists) and `<ol>` (ordered lists) elements both contain any number of `<li>` (list item) elements.

```
<ul>
    <li>One bulleted list item</li>
    <li>Another list item</li>
    <li>and another</li>
</ul>

<ol>
    <li>First list item</li>
    <li>Second list item</li>
    <li>Third</li>
</ol>
```

### Void Elements

Some elements are designed never to contain any nested elements. These are called **void elements**, and they are written without an end tag. These are some common void elements:

- `<img>` - used to embed images
  ```
  <img src="/forest.png" alt="bird's eye view of a forest" />
  ```
- `<br>` - inserts a line break
  <!-- prettier-ignore -->
  ```
  <p>This is the end of a paragraph...</p>
  <br/>
  <p>... and the beginning of another</p>
  ```

Void elements are also called **self-closing tags**, because they are usually written with the trailing character `/` (or slash) within the opening tag. This is mostly to tell the human programmer/parser not to expect a closing tag further down in the code. The HTML parser technically ignores the `/` when it appears in an opening tag.

---

[^1]: The root directory is the top-most directory within your computer's file system. In most cases, the root directory will begin at the folder one level above the `Users/` or `User/` folder.

[^2]: It's important not to forget the `.` before the forward slash, as this explicitly states your current working directory as the starting point. Without it, the parser can register your file path as an absolute file path, beginning from the root directory. This is a common reason why asset files do not load properly on webpages.
