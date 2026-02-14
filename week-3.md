# Intro to CSS (Properties, Selectors, Combinators)

## What is CSS?

Cascading Style Sheets (CSS) are used to define the visual style of a webpage. CSS determines characteristics like fonts, colors, and spacing.

To follow along with this tutorial, download the `index.html` template in `/week-3_demo` and set it up in a new local directory. Once you're set up, create a second file called `styles.css`.

## Writing CSS

The fundamental structure of CSS rules consists of a **selector**, a **declarations block**, and **properties** and their corresponding **values**.

![diagram showing the selector, declaration, property, and value of the CSS rule "body {color: #FF0000}"](/images/css-rule.png)

The selector selects the HTML element that you want to modify. The declarations block can contain any number of property-value pairs.

Try adding the rule above into your `styles.css` and see what happens.

If you look at the webpage rendered by your `index.html`, you won't see any changes applied just yet. That's because we need to link the CSS and HTML files together.

## Linking the CSS and HTML files

To link a **stylesheet** (as CSS files are typically called), go to your `index.html` and insert the following line into the `<head>` of your document:

```
<link rel='stylesheet' href='styles.css'>
```

By now, you should be able to intuit what this means.

The `<link>` is a tag that links to a resource outside of the current document and defines their relationship using the "rel" attribute. "Stylesheet" is one of several designated link relationships, and the most commonly used.

The "href" value should be the address of the resource you're linking. If your `styles.css` is located in another folder, you should update the path to reflect the file's [absolute or relative](https://www.geeksforgeeks.org/html/html-file-paths/) location.

`<link>` tags are only used inside the `<head>` section.

After linking the stylesheet, you should see an update to your webpage.

## Properties

You can insert multiple properties into a CSS rule. Each property-value combination should end with a semi-colon to separate each line. If you forget a semi-colon between two lines, the stylesheet will break.

```
body {
  color: #ff0000; /* red */
  background-color: #f9f9f9; /* light gray */
  border: solid; /* a solid line border */
}
```

The text between `/* ... */` are comments in CSS.

There are currently [738 distinct CSS properties](https://www.w3.org/Style/CSS/all-properties.en.html) in use. These control everything from how elements are displayed to how their styles adapt to different screen sizes and interactions. We'll be covering different categories of properties in the next few weeks, including ones for fonts, colors, dynamic layouts, and even animations.

For this week, let's focus on a few key properties as we practice selecting and combining tags for CSS rules:

- `color`
- `background-color`
- `border`, `border-style`, `border-color`
- `text-align`
- `text-decoration`
- `text-transform`

## Selectors

In CSS, you can select which element(s) you want to style by using the tag name (i.e. `<h1>`), the class, the id, a universal selector, or a combination of the above.

To select a tag name, write it out verbatim.

```
main {
    border-style: solid;
    border-color: #0000FF;
}
```

To select an element by its class, write the class name with a `.` in front.

```
.single-lines {
  border-style: dotted;
  border-color: #000000;
}
```

To select an element by its id, write the id name with a `#` in front.

```
#instructions {
    background-color: #fff000;
}
```

Note that classes and ids can be named anything you want, but they are usually written without spaces or special characters. For names with multiple parts, like "single lines", sub the space for a hyphen ("single-lines") or underscore ("single_lines") or use camelcase ("singleLines"). Class names and ids can start with a letter A-Z, but not a digit. Abbreviations are common in classes and ids, just to keep things concise (i.e. "btn" for button). Try to keep names as straightforward yet descriptive as possible (i.e. "btn-primary" over "btn-1").

Classes and ids don't change the semantic meaning of your HTML, but try not to name them according to their visual presentation. For example, "btn-primary" is better than "btn-red" because if you end up changing the color of primary buttons to green later, you'll have to change both the property value and the class name. The ultimate function of the class is to demarcate primary buttons rather than red buttons, so name it accordingly.

Last week we mentioned ids can only be used once in a document, while classes can be applied to multiple elements. On the flip side, you can apply multiple classes and ids to a single element, just make sure not to use the same id twice. Multiple classes are separated by a space and go in the same "class" attribute.

```
<div class="wrapper left-column" id="calendar">
```

Going back to selectors, the universal selector, `*`, can be used to match elements of any type that follow the asterisk. If no element is specified, the `*` will grab all elements within the document.

```
* {
    text-decoration: line-through;
}
/* versus... */
* p {
    text-decoration: line-through;
}
```

If you want to apply styles to a group of different elements, you can select multiple by separating them with commas.

```
h1, h2, h3 {
    text-align: center;
}
```

## Combinators

Though using selectors can take us pretty far, there'll be many cases where we want to style multiple tags at the same time, without, say, assigning the same class to all of them. The way we can do this is by using **combinators**.

CSS combinators are used to define relationships between selectors. These go between selectors and before the declaration block in a CSS rule.

We already saw a combinator in the previous section, when we added `p` after `*` to select all `p` elements in our document. The space between the two selectors is a **descendant combinator**. This essentially says, "grab all `p` elements that are nested within `*`, or all elements."

```
* p {
    text-decoration: line-through;
}
```

Another way of explaining the descendant combinator is, "select all [second element selected] that have [first element selected] as its ancestor".

```
nav a {
    color: #00cfcf;
}
```

Notice how the above did not change the color of the anchor tags in the footer? That's because the anchor tags in the footer are not nested within the `<nav>`.

The next combinator is the **child combinator**, which is written with a `<`. This combinator only grabs elements that match the second element that are _direct children_ of the first element.

```
main > p {
    text-transform: uppercase;
}
```

The above example only applies the `text-transform` to paragraph elements that are direct children of the `<main>`. The instructions paragraph was not transformed because it is nested within a `<div>` within the `<main>`.

There are also **next-sibling** and **subsequent sibling combinators**. The next-sibling combinator `+` grabs the second element _if and only if_ it follows immediately after the first element, and both are children of the same parent element.

```
h3 + a {
    background-color: #fff000;
}
```

The subsequent sibling combinator `~` grabs all instances of the second element that comes after the first element (whether immediately or separated by a few siblings), and that share the same parent as the first element.

```
h3 ~ a {
    background-color: #fff000;
}
```

You can nest combinators to grab very specific elements. For example, the following rule grabs any paragraph elements that are grandchildren of the `<main>`.

```
main > * > p {
    color: #ffccee;
}
```

## "Cascading" style sheets

Cascading style sheets are named such because they apply rules hierarchically. When rules overlap, those closer to the bottom of the CSS document will apply over any preceding rules, since the document is read from top to bottom.

```
ul {
    list-style-type: decimal;
}
ul {
    list-style-type: square; /* this one wins */
}
```

Additionally, more specific selections will be applied over more general ones.

```
ul {
    color: #ff0000
}
main ul {
    color: #00cfcf /* this one wins */
}
```

By default, some properties are inherited from parent elements if not specified. If you apply a color property to the `<body>` and don't specify the color of any of the descendants, you'll see that all the paragraph tags and list items within will reflect the new color property. You can change inherited styles by specifying property values using tag names, classes, ids, and combinators.

## Inline and Internal Styling

So far we've been writing our CSS rules in an external `styles.css` document. This is a pretty tidy way to style, since it keeps our CSS separate from our HTML. However, there are other areas where CSS can be applied, which may be preferential in different use cases.

**Inline styling** is CSS applied directly within an .html document, within the opening tag. If this coexists with an external stylesheet, any styles applied here will override the stylesheet.

```
<header style="border-style: solid; border-color: #cc99ff">
...
</header>
```

**Internal styling** is written within a `<style>` tag within the .html document's `<head>`. Any styling applied here will override the external stylesheet as well, but _not_ the inline styling.

```
  <head>
    ...
    <style>
      header {
        border-style: solid;
        border-color: #cc99ff;
      }
    </style>
  </head>
```

Generally, the order of priority for the CSS sources covered today is, from highest to lowest:

1. Inline styles (`style=""`)
2. Internal styles (`<style>`)
3. External styles (styles.css)

Where you choose to keep your styles depends on your goals and workflow preferences. If you want to keep your code organized by language, use an external stylesheet. If you prefer to see your HTML and CSS in one place, such as when you're doing some quick testing, use inline styles. If you want to apply different styles to different pages of your website, use internal styling.

## CSS in the Wild

Go to [https://p-dpa.net/](https://p-dpa.net/). Right-click on an element on the page you want to know more about and click "inspect". What do you notice about that element based on the DOM tree? Does it have a class name or id? What are its parent/child/sibling elements? What styles are applied to that element? Are any of those styles shared with other elements?

Try the following:

1. Change the color of one element.
2. Add a border to multiple elements.
3. Change all the text on the site to uppercase.

## Quiz

1. What selector(s) could you use to style the instructions paragraph and only that paragraph?
2. What selector(s) could you use to style all of the ingredients list items _except for the first one_?
3. How can you add style to an HTML element without writing any additional CSS?
