# CSS Continued (Layout, Positioning, Responsive Design)

## Layout

The normal flow of a HTML element generally stacks elements from the top of the page down, and from left to right. There are a number of ways to break this flow:

1. **`display`** - This property can switch an element's behavior between block and inline, and also more customizable layouts through flexboxes and grids.
2. **`position`** - This changes how an element is positioned relative to a parent element or the entire webpage.
3. **`float`** - Far less used than the other two, but this allows you to float images next to text so the text "wraps" organically around the image.

We'll learn how to implement these in the following sections.

## Display

Using the `display` property, you can change a block element to behave as an inline element, and vice versa. Here are some `display` values you're likely to use:

```css
element {
  display: block;
  display: inline;
  display: none; /* hides an element and removes it from the document flow */
}
```

The `display` also allows you to declare special layout methods like flexboxes and grids.

## Flexboxes

Flexboxes are a popular method for arranging elements in a predictable layout. Flexboxes help you accomplish three main things at once:

1. **Control the size** of a group of elements relative to each other and their parent container
2. **Control the alignment** of those elements relative to each other and the parent container
3. **Choose the direction** in which the elements flow
4. **Determine if/how the elements wrap** if there's not enough room in the parent container

The first thing to understand about flexboxes is that there is a parent container, called the **flex container**, and any number of child elements, which are **flex items**. The flex container is where you enable the flexbox method and decide on overarching properties that affect all flex items. The flex items can have differing settings that allow each one to be aligned and sized uniquely.

Within flexboxes, you can determine settings across two axes. Essentially, these are the vertical and horizontal axes, but in flexbox terminology they're called the **main axis** and the **cross axis**. The main axis can be either horizontal or vertical, and the cross axis would be perpendicular to the main. By default, the main axis is horizontal.

![diagram from CSS Tricks showing the main and cross axes of a flex container with two flex items](/images/css-tricks-flexbox-axes.svg)

### Flex container properties

The flex container and flex items have different flex properties. Here are the flex container properties:

```css
.flex-container {
  display: flex; /* initiate flexbox */

  flex-direction: row;
  flex-wrap: wrap;
  flex-flow: column wrap; /* shorthand for the above 2 properties */

  justify-content: flex-start;
  align-items: stretch;
  align-content: normal;

  row-gap: 1rem;
  column-gap: 2rem;
  gap: 1rem 2rem; /* shorthand for the above 2 properties */
}
```

`flex-direction`

- determines the main axis of the flex container
- can either run horizontally (`row`) or vertically (`column`)

`flex-wrap`

- determines whether the items should wrap once they reach the edge of the container or not (`wrap` vs. `nowrap`)

`flex-flow`

- shorthand for the `flex-direction` and `flex-wrap` properties

`justify-content`

- aligns the flex items toward the beginning, center, or end of the flex container (`flex-start`, `center`, `flex-end`), following the main axis
  - i.e. if `flex-direction: row`, then the items would shift left or right. If `flex-direction: column`, then the items would shift up or down
- can also be used to "justify" flex items but creating even space between them, around them, or both (`space-between`, `space-around`, `space-evenly`)

`align-items`

- decides how to align items against the cross axis
  - i.e. if `flex-direction: row`, then `align-items` would shift elements up or down. If `flex-direction: column`, then the items would shift left or right
- valid values are `flex-start`, `flex-end`, `center`, `stretch` (takes up all available cross axis space), and `baseline` (items are aligned along their text baseline)

`align-content`

- aligns items along the cross-axis, similar to `align-items`, but it aligns multiple lines of items at once
- applies only when there are multiple lines of flex items within a given container (so by extension `flex-wrap` would be set to `wrap`)

`gap`, `row-gap`, and `column-gap`

- controls the space between rows, columns, or both
- `gap` can take 1-2 values. If only one value is given, the value will be applied for both row gaps and column gaps. If two values are given, the first value will apply to row gaps and the second to column gaps
- only applies to spaces between items, not around the edges

### Flex item properties

By default, flex items will be sized to fit their contents. To make them more uniform, or to have more control over their sizes generally, there are a number of flex item properties dedicated to sizing.

```css
.flex-item {
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: auto;
  flex: 0 1 auto; /* shorthand for the above 2 properties */

  align-self: auto;
  order: 0;
}
```

`flex-grow`

- determines whether a flex item should expand to take up more space within the flex container, and if so, by what proportion
- the default value is `0`
- i.e. if you assign a value of `1` to a group of items, each item will expand to take up all available space within the flex container evenly
- i.e. setting the `flex-grow` of one item to `2` will make it take up double the available space of the container as those with `1`
- values are unitless since they convey proportion

`flex-shrink`

- determines how much an item will shrink relative to the others when the size of all the flex items combined exceeds that of the flex container (basically, whenever there's overflow)
- the default value is `1`
- a higher value corresponds with a greater degree of shrinking
- setting the value to `0` will make an item retain its original size

`flex-basis`

- determines the default size of an element before the remaining space is distributed via `flex-grow` and/or `flex-shrink`
- the default value is `auto`, meaning the item will adopt the `width` or `height` property as its size
- a value of `0` effectively means "ignore the content size and distribute all the space using flex-grow and/or flex-shrink"

`flex`

- a shorthand property that captures `flex-grow`, `flex-shrink`, and `flex-basis`, in that order. This is recommended over assigning all three properties individually
- altogether, the default values would be `0 1 auto` (`flex-grow: 0`, `flex-shrink: 1`, `flex-basis: auto`)
- if you only provide one value, i.e. `flex: 1`, that will be assumed to be `flex-grow: 1` and the rest will default to `flex-shrink: 1` and `flex-basis: 0%` (not `flex-basis: auto`)

`align-self`

- overrides the `align-items` property in the parent to give one flex item a special alignment
- values are the same as `align-items`: `flex-start`, `flex-end`, `center`, `stretch`, `baseline`

`order`

- controls the order of flex items, in the case that you want them to be different from the default order, which is whatever order in which they appear in your HTML document
- avoid changing the semantic order of content via CSS when possible, since it creates dissonance between how screen-readers interpret your page vs. how it is presented visually
- the values don't have to be exact; there just needs to be relativity between them
  - e.g. `order: -2` will be placed before `order: 5`
  - the default value is `0`
  - these values are unitless

Tip: this [CSS Tricks Flexbox Layout Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) is an especially handy resource for flexbox users at any stage of familiarity. I myself relied on it quite a bit while writing this section of the tutorial. Use it to your advantage!

### Flexboxes in the wild

Inspect the code in the [Indiana Graduate Workers Coalition website](https://indianagradworkers.org/) and find the flex boxes. You may have to dig through some nested elements. Try tweaking the flex container and flex item settings for any element and see how they respond.

### Exercise

Go to `/week-5_demo/flexboxes.html` and apply the flexbox properties you just learned according to the prompts set in the html.

## Floats

Floats are mainly used to wrap text around an image while retaining its original flow.

```css
img {
  float: left; /* or right, or none */
}
```

This floats an image on the left side of the page, while any text that follows wraps around on the right side.

If you find yourself using floats but want to specify exactly which text on your page should be wrapped, consult [MDN](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Floats) for deeper instructions.

Note: you can also use floats to create [drop caps](https://css-tricks.com/snippets/css/drop-caps/) !

## Extras!

### Overflow

As we're defining the size and shape of our elements, contents are bound to overflow from their containers. To control how overflowing contents are treated, you can use the `overflow` property.

```css
element {
  overflow: visible;
  /* allows content to visibily spill over the container's edge */

  overflow: hidden:
  /* hides any content that spills over */

  overflow: scroll:
  /* allows reader to scroll within the container to see overflowing content */

  overflow: auto:
  /* same as scroll, only the scrollbar is hidden if the content does not overflow */
}
```

### CSS Reset

As you gain more agency over the look and behavior of your webpage, you'll encounter CSS default styles that conflict with your own CSS rules. To get around having to override them each piecemeal, web designers will nullify the default styles all at once using a **CSS reset**.

I recommend using [Josh Comeau's Modern CSS Reset](https://www.joshwcomeau.com/css/custom-css-reset/), pasted in full here:

```css
/* 1. Use a more-intuitive box-sizing model */
*,
*::before,
*::after {
  box-sizing: border-box;
}

/* 2. Remove default margin */
*:not(dialog) {
  margin: 0;
}

/* 3. Enable keyword animations */
@media (prefers-reduced-motion: no-preference) {
  html {
    interpolate-size: allow-keywords;
  }
}

body {
  /* 4. Add accessible line-height */
  line-height: 1.5;
  /* 5. Improve text rendering */
  -webkit-font-smoothing: antialiased;
}

/* 6. Improve media defaults */
img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

/* 7. Inherit fonts for form controls */
input,
button,
textarea,
select {
  font: inherit;
}

/* 8. Avoid text overflows */
p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

/* 9. Improve line wrapping */
p {
  text-wrap: pretty;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  text-wrap: balance;
}

/*
  10. Create a root stacking context
*/
#root,
#__next {
  isolation: isolate;
}
```

As you can see, this reset includes some familiar changes, like setting the `box-sizing` to `border-box`, eliminating the default `margin` values, and setting the `line-height` to the recommended `1.5`. If you're curious about the reasoning for each of these resets, you can read about them in Comeau's post linked above.

### Variables

Last week we learned how to customize size, color, and fonts within CSS. Now we can set off declaring the styles of every element that appears on our website! Using classes and wide-net selectors can help us style more elements in fewer lines, but what happens when you decide to change a color halfway through? Or you find out that a font isn't licensed for your purposes?

Rather than `CMD`/`CTRL` + `F`-ing through your entire document to replace the values, it's easier to use **variables** AKA **custom properties**. Variables allow you to define a value by a custom name and use that name as a proxy for the actual value throughout your document.

Variable names must start with two dashes `--` and are case-sensitive. You can reference the variable by using the `var()` function.

```css
:root {
  --color-accent: #3569da;
}
button {
  background-color: var(--color-accent);
}
```

**Note:** `:root` is another way of selecting `<html>`.

Usually variables are defined in the root element so they can be "globally" available (available throughout your entire document). You can also declare variables within a more local scope, say within a `<div>`:

```css
div {
  --spacing: 8px;
  padding: var(--spacing);
}
```

You can also create variables for fonts...

```css
:root {
  --font-heading: "Playfair Display", Georgia, serif;
  --font-body: "Open Sans", "Segoe UI", Arial, sans-serif;
}

body {
  font-family: var(--font-body);
}

h1,
h2 {
  font-family: var(--font-heading);
}
```

... and sizes.

```css
:root {
  --container-sm: 640px;
  --container-md: 768px;
  --container-lg: 1024px;
  --container-xl: 1280px;
}

.card {
  width: var(--container-md);
}
```

Just as with `font-family`, you can provide a fallback value as a second argument to `var()`, in case a variable isn't defined.

```css
p {
  color: var(--text-color, #333333);
}
```

Variables are commonly used to differentiate "dark mode" vs. "light mode" styles on a webpage.
