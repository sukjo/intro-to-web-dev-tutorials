# CSS (Responsive Design continued)

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

1. Make all the section headers stick to the top of the page as the reader scrolls.
2. Make the tooltip `span` act like a real tooltip and appear over the rest of the text, slightly offset in position from the "Lorem Ipsum".
3. Make the help button fixed to the bottom right corner of the page.

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

### Naming Conventions

As you create your own classes, ids, and variables, standardizing the way you name things will help you keep your code organized.

Your projects in this class will likely not reach a scale that will necessitate complex naming conventions, but CSS can get unwieldy quite quickly, so it's good to set some ground rules for how you name things before setting forth with your styling.

The sections that follow contain some best practices for naming classes, ids, and variables.

#### Class names

A popular naming convention for classes in HTML/CSS is **BEM**, which stands for **block, element, modifier**. Here's an example of BEM in action:

```CSS
/* block: the standalone component/context */
.btn {}

/* element: a part of the block whose meaning depends on the block */
.btn__icon {}

/* modifier: changes the appearance or behavior of the block */
.btn--small {}
.btn--large {}

/* combined: an element specific to the block's context with a modifier applied */
.btn__icon--large {}

```

```HTML
<button class="btn btn--large">
    <span>Search archive</span>
    <img class="btn__icon btn__icon--large" alt="search" src="https://placeholder.com"/>
</button>
```

BEM is designed to show the hierarchy between different components at a glance. For example, just by looking at `.btn__price--big`, you would know it's nested within a top-level `.btn` element, and potentially inherits styles from `.btn`. It's also a cue that `--big` isn't the default style for that element.

Notice how in the HTML, the button contains both the `.btn` and `.btn--large` classes? This is because repeating the `.btn` part of the name in more specified class names doesn't automatically transfer over the styles of `.btn`. For this reason, any modifier classes have to be accompanied by a block or block + element class.

While BEM is the industry standard for large, collaborative projects, you may find it overkill for a single-page site. For simpler projects, you might use a combination of selectors to style elements based on their location rather than a unique name:

```CSS
/* block component */
.search-btn {}

/* only images that are direct children of block */
.search-btn > img {}

/* only images with class "large" that are children of block */
.search-btn > img.large {}
```

```HTML
<button>
    <span>Search archive</span>
    <img class="large" alt="search" src="https://placeholder.com" />
</button>
```

The downside of this method is that it's less obvious how to look for the styling of a particular element just by looking at the HTML. It also makes your CSS **brittle**; if you change your HTML structure later, your styles might stop working.

BEM, on the other hand, is modular. Because the style is attached to a specific class name rather than a specific location in the HTML, you can move that button anywhere on your site and it will look exactly the same.

There are other naming conventions aside from BEM, which you can read about at this [GeeksforGeeks article](https://www.geeksforgeeks.org/css/css-naming-conventions/). Because there are so many ways to select the same element within CSS, the naming conventions are nearly endless. Start with a method that makes sense to you and watch how it endures as your code scales. Learning through practice will help you fine-tune your naming needs.

#### Id names

You can technically use BEM and other conventions for ids as well, but since they're used more sparingly and for unique elements, it's best to just prioritize choosing a specific and concise name for that individual element.

```CSS
#main-navigation {}

#article-wrapper {)

#login-btn {}
```

#### Variable names

Variable names should be concise and semantic. For example, if the primary color of your website was a particular shade of blue, you could capture it in a variable called `--blue`. However, this name doesn't tell you much about the purpose of the variable. A more informative name would be `--primary-color`, because it refers to a standing purpose within your code. It also gives you the flexibility to change the primary color to something other than blue later on, if you should so choose.

```CSS
:root {
  --color-primary: #88a8d7;
  --color-secondary: #bec7d4;
  --font-size-small: 12px;
  --font-size-medium: 16px;
  --font-size-large: 24px;
  --spacing-small: 8px;
  --spacing-medium: 16px;
  --spacing-large: 32px;
}

.text-primary {
  color: var(--color-primary);
}

.text-secondary {
  color: var(--color-secondary);
}

.small-text {
  font-size: var(--font-size-small);
}

.medium-text {
  font-size: var(--font-size-medium);
}

.large-text {
  font-size: var(--font-size-large);
}

.margin-small {
  margin: var(--spacing-small);
}

.margin-medium {
  margin: var(--spacing-medium);
}

.margin-large {
  margin: var(--spacing-large);
}
```
