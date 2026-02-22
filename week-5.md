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

## Grids

Grids are another way to establish layouts quickly in CSS. Grids and flexboxes get compared often, and designers have long debated their uses. Simply put, the common advice is to use grids when you're planning a two-dimensional layouts along both the horizontal and vertical axes, and use flexboxes for one-dimensional layouts—say, when you want to arrange multiple items in a row or column.

Flexboxes and grids accomplish slightly different effects. Flexboxes arrange elements in a [masonry layout](https://css-tricks.com/piecing-together-approaches-for-a-css-masonry-layout/), which is defined by uneven widths/heights and ragged edges. Meanwhile, a rigid layout creates more rigid widths/height proportions and no uneven edges.

![diagram showing the difference between a standard CSS block layout, a masonry or flexbox layout, and a grid layout](/images/masonry-vs-grid.png)

To use grids, you work with a **grid container** and **grid items**, similar to flexboxes. In the grid container, you set the `display` property, lay out how many rows and columns you want, and set the alignment and spacing for the items within. With grid items, you can control the size and alignment of individual units within the grid.

Here are some terms to know about grids:

![diagram from Zen Invader (unfortunate name) showing the grid tracks, grid lines, grid area, and grid cell](/images/zi-css-grid-components.gif)

Grid tracks and lines are pretty intuitive—they're the columns and rows and the lines between them. In the grid system, column tracks go along what is called the **block axis** and row tracks go along the **inline axis** (not shown on diagram).

The grid cell is a single unit of the grid. The grid area is a definable region spanning any number of rows and columns.

### Grid container properties

```css
.grid-container {
  display: grid; /* initiate grid */

  grid-template-columns: 200px 1fr 2fr;
  grid-template-rows: 100px auto 100px;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";

  justify-items: stretch;
  align-items: stretch;
  justify-content: start;
  align-content: start;

  row-gap: 1rem;
  column-gap: 2rem;
  gap: 1rem 2rem; /* shorthand for the above 2 properties */
}
```

`grid-template-columns` and `grid-template-rows`

- define the structure of your grid by specifying the size of each column and row
- you can use any CSS length unit (`px`, `%`, `rem`, etc.), the keyword `auto` (which sizes based on content), or the `fr` unit
  - the **`fr` unit** represents a fraction of the available space in the grid container
    - e.g. `grid-template-columns: 1fr 2fr 1fr` creates three columns where the middle column takes up twice as much space as the outer columns
    - `fr` units are calculated _after_ fixed-size columns/rows, so `200px 1fr 2fr` means: first column is 200px, then the remaining space is divided into three parts (1 + 2), with the second column getting 1 part and the third getting 2 parts
    - think of `fr` as similar to `flex-grow`—it distributes available space proportionally
- the number of values determines how many columns or rows you have
  - e.g. `grid-template-columns: 200px 1fr 200px` creates three columns
- you can use the `repeat()` function to avoid repetition: `repeat(3, 1fr)` is equivalent to `1fr 1fr 1fr`

`grid-template-areas`

- allows you to name regions of your grid and visually map out your layout structure
- each string in quotes represents a row, and each space-separated word within the string represents a column
- the same name appearing in multiple cells creates a single area that spans those cells
  - e.g. `"header header header"` creates an area called "header" that spans all three columns
- grid items can then be placed into these named areas using the `grid-area` property (covered below)
- use a period `.` to represent an empty cell
- e.g. the grid template above creates a classic layout with a full-width header, a sidebar in the second row's first column, main content spanning two columns, and a full-width footer

`justify-items` and `align-items`

- control how grid items are positioned within their grid cells
- `justify-items` aligns items along the inline axis (rows), while `align-items` aligns them along the block axis (columns)
- the default value is `stretch`, which makes items fill their entire cell
- other valid values are `start`, `end`, and `center`
- these work similarly to flexbox's `align-items`, but apply to both axes in grids

`justify-content` and `align-content`

- control how the entire grid is positioned within the grid container, in cases where the grid is smaller than the container itself
- `justify-content` positions the grid along the inline axis, while `align-content` positions it along the block axis
- valid values include `start`, `end`, `center`, `space-between`, `space-around`, and `space-evenly`

`gap`, `row-gap`, and `column-gap`

- control the space between grid cells (the "gutter")
- these work identically to their flexbox counterparts and only apply to spaces between items, not around the edges

### Grid item properties

By default, grid items are placed automatically into cells following the order they appear in your HTML. However, you can explicitly position items or have them span multiple rows and columns.

```css
.grid-item {
  grid-column-start: 1;
  grid-column-end: 3;
  grid-column: 1 / 3; /* shorthand for the above 2 properties */

  grid-row-start: 1;
  grid-row-end: 2;
  grid-row: 1 / 2; /* shorthand for the above 2 properties */

  grid-area: header; /* places item in a named grid area */

  justify-self: stretch;
  align-self: stretch;
}
```

`grid-column` and `grid-row`

- position an item by specifying which grid lines it should start and end on
- grid lines are numbered starting from 1, and run along the edges of cells
- the shorthand syntax uses a slash: `grid-column: 1 / 3` means "start at line 1, end at line 3" (spanning two columns)
  - note: when I was first learning how to size grid items, this syntax was confusing because I thought the numbers referred to number of the unit itself, not the _line_. Take care not to make the same mistake!
- you can also use the `span` keyword: `grid-column: span 2` means "span across 2 columns from wherever this item is placed"

`grid-area`

- if the container has named grid areas via `grid-template-areas`, you can assign an item to one of those areas by name
- e.g. if your grid container defines `grid-template-areas: "header header" "sidebar main"`, then setting `grid-area: header` on an item places it in the header region (spanning the top two columns)
- this is the most semantic and readable way to position items when you have a defined layout structure
- alternatively, `grid-area` can be used as a shorthand for `grid-row-start / grid-column-start / grid-row-end / grid-column-end`, though this is less readable

`justify-self` and `align-self`

- override the grid container's `justify-items` or `align-items` for a single grid item
- `justify-self` controls alignment along the inline axis within the cell, while `align-self` controls alignment along the block axis
- values are the same: `start`, `end`, `center`, `stretch`

**Note**: Just like with flexbox's `order` property, using `grid-column`, `grid-row`, or `grid-area` to reorder content visually can create a mismatch between the visual layout and the HTML source order. Screen readers follow the HTML order, not the visual order, so avoid reordering semantically meaningful content purely through CSS positioning. Structure your HTML in a logical reading order first, then use grid to enhance the visual presentation.

### Exercise

Open up `/week-5_demo/grids.html` and test out the grid properties section by section.

### Grids in the wild

CSS grids are commonly used for arranging componentized information, like data tables, article menus, and image galleries.

Find the grids on the following webpages and try playing with the grid settings via the developer tools:

- [https://www.centreforthestudyof.net/](https://www.centreforthestudyof.net/)
- [https://liturgical-calendar.com/en/ACNA2019/](https://liturgical-calendar.com/en/ACNA2019/)
- [https://sheafitz.com/](https://sheafitz.com/)

## Positioning

The `position` property allows you to determine an element's location relative to its original flow or irrelevant to it. This property is usually paired with `top`, `bottom`, `left`, and/or `right` properties, which are used to decide the vertical and horizontal position of an element on the page.

The `position` property accepts a number of values. The ones below are the ones you'll likely be using.

```css
element {
  position: static;
  position: relative;
  position: absolute;
  position: fixed;
  position: sticky;
}
```

**`static`** is the default value. This positions an element in the normal flow of the document, whether it is inline or block. If you give a static element a `top`, `bottom`, `left`, and/or `right` property, it will be ignored.

**`relative`** is like `static` in that it positions and element following the normal flow, but unlike `static`, it accepts `top`, `bottom`, `left`, and `right`. These values are applied to the element _relative to where that element would originally show up in the normal flow_. In other words, `relative` gives an element an offset position.

![diagram showing how the top, bottom, left, and right properties correspond to the horizontal and vertical axes of the screen](/images/position-axes.png)

Note that the `top`, `bottom`, `left`, and `right` properties apply to the page as if the top left corner was the 2D point `(0, 0)` and the bottom right corner was the maximum x- and y-value.

**`absolute`** also allows an element's position to be determined by `top`, `bottom`, `left`, and/or `right`, but it also removes the element from the original flow altogether. All the surrounding elements then act as if that element did not exist and flow without any gaps. Then the `absolute` positioned element visually overlaps with the adjacent content.

**Note that if you want to set an `absolute` element's position relative to the parent element, that parent element needs to have `position: relative`.** Otherwise, whatever `top`/`bottom`/`left`/`right` values given to the element will be relative to the next nearest ancestor element.

**`fixed`** is mostly the same as `absolute`, only the element's `top`/`bottom`/`left`/`right` position is applied relative to the entire document, instead of a parent element. This is useful for things like accessibility menus, scroll-to-top buttons, and other components you need to keep visible regardless of where on the page the reader scrolls.

**`sticky`** is great for making elements "stick" to a part of the page. It's commonly used for menus and page section headers. However, it can take some finesse to get it to work properly. You can read [this blog post](https://frontendmasters.com/blog/the-weird-parts-of-position-sticky/) to learn about common issues with `sticky`—the examples are written in Tailwind CSS (a popular CSS framework) but they're paired with enough prosaic explanation that you can find your way.

### Exercise

To try out the `position` property yourself, go to `week-5_demo/position.html` and:

1. Make the tooltip `span` act like a real tooltip and appear over the rest of the text, slightly offset in position from the "Lorem Ipsum".
2. Make all the section headers stick to the top of the page as the reader scrolls.
3. Make the help button fixed to the bottom right corner of the page.

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

## Responsive Web Design

Responsive web design ensures that your website looks good and functions well across different screen sizes and devices—from mobile phones to tablets to desktop monitors.

We've already covered some ways to make our webpages responsive, including using flexible layouts (`flexbox`, `grid`), relative units (`em`, `rem`, `fr`, `%`, `vw`, `vh`), but there are a few more tricks yet.

### Viewport meta tag

You might be accustomed to seeing this HTML tag in the default `<head>` of every web page by now:

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Without this tag, mobile browsers will render your page at desktop width (usually ~980px) and scale it down to fit the screen, making everything tiny and breaking your responsive CSS. This meta tag tells the browser to use the actual device width and not to zoom in or out by default.

### Media queries

Media queries allow you to apply different CSS rules based on the characteristics of the user's device, most commonly the screen width.

```css
/* Default styles (mobile-first approach) */
.container {
  width: 100%;
  padding: 1rem;
}

/* Styles for tablets and larger */
@media (min-width: 768px) {
  .container {
    width: 80%;
    padding: 2rem;
  }
}

/* Styles for desktops and larger */
@media (min-width: 1024px) {
  .container {
    max-width: 1200px;
    margin: 0 auto;
  }
}
```

How they work:

- `@media` introduces a media query
- `(min-width: 768px)` is the condition - styles inside only apply when the viewport is at least 768px wide
- You can also use `max-width` to target smaller screens: `@media (max-width: 767px)`

Common **breakpoints**:

- `480px` - small phones
- `768px` - tablets
- `1024px` - laptops/desktops
- `1440px` - large desktops

Note: These are guidelines, not rules. Choose breakpoints based on where _your_ design breaks, not arbitrary device sizes.

**Mobile-first** vs. **desktop-first:**

- **Mobile-first**: Write default styles for mobile, then use `min-width` media queries to add complexity for larger screens
- **Desktop-first**: Write default styles for desktop, then use `max-width` media queries to simplify for smaller screens

Mobile-first is generally preferred because it's easier to add features as screen size increases than to remove them.

Other media query conditions:

```css
@media (orientation: landscape) {
  /* Styles for landscape mode */
}

@media (min-width: 768px) and (max-width: 1023px) {
  /* Styles only for tablets */
}

@media (prefers-color-scheme: dark) {
  /* Dark mode styles */
}
```

### Min and max sizing

The `min-width`, `max-width`, `min-height`, and `max-height` properties set boundaries on how small or large an element can become, which is essential for responsive design.

**`max-width`**

- Sets the maximum width an element can be
- The element will shrink below this value if its container is smaller
- Prevents content from becoming too wide and hard to read on large screens

```css
.container {
  max-width: 1200px; /* Never wider than 1200px */
  width: 100%; /* But can be narrower */
}
```

**`min-width`**

- Sets the minimum width an element can be
- The element will grow beyond this value if its container is larger
- Prevents elements from becoming unusably small

```css
.button {
  min-width: 120px; /* Never narrower than 120px */
}
```

**`max-height`** and **`min-height`**

- Work the same way but for vertical sizing
- Less commonly used but helpful for components like image containers or card layouts

```css
.card-image {
  width: 100%;
  max-height: 300px;
}
```

When you use both `width` and `max-width`, the smaller value wins:

```css
.element {
  width: 90%; /* 90% of parent */
  max-width: 600px; /* But never more than 600px */
}
```

On a 1000px screen: element would be 600px (max-width limit)
On a 500px screen: element would be 450px (90% of 500px)

### Example

Here's how these concepts would work together in a responsive layout:

```css
/* ----------------- DEFAULT MOBILE STYLING ----------------- */
html {
  font-size: 14px; /* base font size */
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr; /* single column on mobile */
  gap: 1rem;
}

img {
  max-width: 100%;
  height: auto;
}

h2 {
  font-size: 1.5rem;
}

p {
  font-size: 1rem;
}

/* ----------------- TABLET STYLING ----------------- */
@media (min-width: 768px) {
  html {
    font-size: 16px; /* bump up the font size */
  }

  .grid {
    grid-template-columns: repeat(2, 1fr); /* two columns on tablets */
    gap: 2rem;
  }
}

/* ----------------- DESKTOP STYLING ----------------- */
@media (min-width: 1024px) {
  html {
    font-size: 18px; /* bump up the font size */
  }

  .container {
    padding: 2rem; /* roomier padding */
  }

  .grid {
    grid-template-columns: repeat(3, 1fr); /* three columns on desktop */
  }
}
```

This creates a layout that:

- Is a single column on mobile
- Becomes two columns on tablets
- Becomes three columns on desktop
- Never exceeds 1200px wide
- Uses relative units for flexibility
- Scales font sizes responsively by changing the base `font-size` on the `body` element at each breakpoint (this also adapts the gaps in the grid since they are measured in `rem`)

To see this example in action, head to `week-5_demo/responsive.html`.

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

### z-index and Stacking Contexts

In CSS, you can control the order in which elements are visually stacked using the `z-index` property. The `z-index` controls the "depth" of an element relative to others on the page.

`z-index` accepts unitless integers as values, with higher integers being "closer" to you (the viewer), and lower values going "deeper" into the page.

![diagram from Interneting is Hard showing positive z-index coming out of the page and negative z-index going into the page](/images/iih-css-z-index.png)

The `z-index` property only works on elements that use flexboxes or grids or are _positioned_, meaning their `position` is set to `relative`, `absolute`, `fixed`, or `sticky`. It has no effect on statically positioned elements (the default).

The main caveat with `z-index` is that values aren't compared across your entire webpage. You can't set `z-index: -999` and `z-index: 999` on any two elements and automatically expect the latter to show up on top.

This is because CSS organizes elements into **stacking contexts**, which are isolated layering environments where `z-index` values only compete with siblings in the same context. If you apply a `z-index` to an element, it only applies relative to other elements within the same stacking context. This means that if a parent element creates a stacking context, its children's `z-index` values can't break out of that context, no matter how high or low you set them.

Stacking contexts are created by combining `position` (other than `static`) with a `z-index` value, but also by other CSS properties like `opacity` (less than 1), `transform`, `filter`, and several others. Understanding when stacking contexts are created is key to debugging unexpected layering issues.

For a comprehensive guide to stacking contexts including demos and visuals, see [Josh Comeau's post "What The Heck, z-index??"](https://www.joshwcomeau.com/css/stacking-contexts/).

Tip: The [dom3d extension](https://chromewebstore.google.com/detail/dom3d/lhdhfmkagpnfjjdgbionncpiolioknpj) visualizes the DOM of any given website in 3D. It's not all that helpful for development, but it's great for demonstration purposes to see how elements are layered relative to one another on any given webpage. If you want to see stacking contexts in more detail for development purposes, check out the [CSS Stacking Context inspector extension](https://chromewebstore.google.com/detail/css-stacking-context-insp/apjeljpachdcjkgnamgppgfkmddadcki).

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

Historically, another [reason](https://meyerweb.com/eric/thoughts/2007/04/18/reset-reasoning/) why web designers used CSS resets was because there was signification variation across browsers' default stylings. Cross-browser default styles have streamlined somewhat over the past few years, so CSS resets are not as necessary in this regard.

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
