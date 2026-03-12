# CSS Wrap-up (Advanced Selectors, Interactive Styling, Functions)

## Advanced Selectors

You've already learned how to style elements based on tags, classes, ids, and any combination of combinators. Now let's tackle some more advanced selectors that will help you add style your site based on interactive states and other aspects not seen in the DOM.

### Pseudo-classes

**Pseudo-classes** let you style elements based on their state or position without adding extra classes to your HTML. Pseudo-classes are denoted after another selector and start with a `:` followed by a keyword, such as `hover` (i.e. `div:hover`). We'll walk through the different types one by one.

#### State-based pseudo-classes

A **state** in CSS pertains to how an element has been / is being interacted with by a user. A state tells you whether an element is being hovered over by the user's cursor, whether an element is opened or closed, or whether its links have been visited or not, just to name a few examples.

Some key state-based pseudo-classes are:

```CSS
.box:hover {
    background-color: lightsteelblue;
}
/* applies when a user hovers over .box */

.box:active {
    background-color: lightslategray;
}
/* applies when a user is actively clicking on .box */

.box:focus-visible {
    border: 2px solid lightslategray;
}
/* applies when a user focuses on .box using the tab key */
```

`:hover`, `:active`, and `:focus-visible`[^1] usually go hand-in-hand and are applied to any element that is interactive, such as a hyperlink or button. Applying different styles to each state gives your site's user feedback on 1) whether an element is interactive and 2) whether their interaction happened. Without these differentiated styles, your site will violate the normal expectations that users have of a website, leaving them disoriented and giving them the sense that your site is broken.

There are also pseudo-classes specific to `<a>` tags:

```CSS
a:link {
    color: black
}
/* applies to any link that has NOT been visited by the user yet */

a:visited {
    color: gray;
}
/* applies to any link that HAS been visited */
```

`:visited` styles aren't used too frequently these days but they are distinguished from unvisited links in the browser's default styling, so it's good to know `:visited` exists if only to override it with your own style.

#### Structural pseudo-classes

Structural pseudo-classes include those that grab specific child elements depending on their relative order in the DOM...

```CSS
p:first-child {
    margin-top: 1rem;
}
/*  applies only to the first sibling among <p> elements */

p:last-child {
    margin-bottom: 1rem;
}
/*  applies only to the last sibling among <p> elements */

p:nth-child(2) {
    text-decoration: underline;
}
/*  applies only to the second sibling among <p> elements */
```

... and those that grab elements depending on their relative order to elements of a similar tag type...

```CSS
.grocery-list li:first-of-type {
    background-color: yellow;
}
/* applies only to the first <li> within .grocery-list */

.grocery-list li:last-of-type {
    background-color: yellow;
}
/* applies only to the last <li> within .grocery-list */

.grocery-list li:nth-of-type(5) {
    background-color: yellow;
}
/* applies only to the fifth <li> within .grocery-list */
```

These kinds of pseudo-classes can help you select and style specific elements within a given set (of children or siblings) without creating a new class or id.

#### Logical pseudo-classes

The following pseudo-classes give you a compact way to select or exclude elements.

```CSS
article:is(.featured, .highlighted) {
    color: darkgreen;
}
/* applies to all articles whose class is .featured and/or .highlighted */

article:not(.featured) {
    font-size: 1rem;
}
/* applies to all articles that do NOT have the class .featured */

article:has(img) {
    flex-direction: column;
}
/* applies to all articles that have an <img> nested within */
```

The arguments for these pseudo-classes can be any selector or comma-separated list of selectors by tag name, class, id, or even the pseudo-classes in the previous sections.

### Pseudo-elements

**Pseudo-elements** AKA **virtual elements** allow you to create new elements on the page without adding any HTML. The most commonly used pseudo-elements are `::before` and `::after`.

```CSS
div::before {
    content: "🌸",
}

div::after {
    content: "url(grass-background.png)",
}
```

Here, the `::before` and `::after` insert an element onto the page that is either the first or last child of `div`. Each one needs a `content` property to show up on the page. Even that property contains nothing (`content: ""`), the pseudo-element can still be assigned a `width`, `height`, and other properties.

The contents of the pseudo-element can be text or even an image URL, which can be handy for layering backgrounds. However, **it is not recommended to put any meaningful text in the contents of pseudo-elements**, since they can't be guaranteed to be read by screen readers. Use them for decorative purposes only, like adding fancy quotation marks around a blockquote or adding a gradient over an image.

You can read more about the possibilities of `::before` and `::after` at this [CSS Tricks article](https://css-tricks.com/pseudo-element-roundup/) or this [Coder's Block blog post](https://codersblock.com/blog/diving-into-the-before-and-after-pseudo-elements/).

Some other pseudo-elements are `::first-letter` and `::first-line`:

```CSS
p::first-letter {
    font-size: 3rem;
    font-family: serif;
}

p::first-line {
    font-size: 1.2rem;
}
```

Here, `::first-letter` can be used to style just the first character within an element. The standard use case is to create a [drop cap](https://css-tricks.com/snippets/css/drop-caps/), like this:

![An example of a drop cap showing a paragraph with a large green letter D.](/images/drop-cap.png)

`::first-line` is a similarly intuitive method for grabbing and styling just the first line of text within an element. Keep in mind exactly which characters are in the first line of text is dependent on factors like the viewport size, font size, and letter spacing. The neat thing is that `::first-line` can dynamically detect which letters are on the first line as these factors change.

As a last note on pseudo-elements, these cannot be applied to self-closing tags like `<img>` and `<br>`.

### Attribute selectors

You can select any HTML element by its attribute. When you select an element by its class or id, technically you're also selecting it by an attribute—the class or id attribute. To select an element by other attributes, the syntax looks a little different.

```CSS
a[href="myhomepage.com"] {
    color: pink;
}
```

Here, we're looking for any `<a>` that leads to "myhomepage.com" via the `href` attribute.

You can also select any links that lead to external sites:

```CSS
a[href^="http"]::after {
    content: ↗️;
}
```

The `^` here is a special selector that grabs any attribute that begins with the value between quotes. So the `href^="http"` grabs any link that begins with "http" and inserts a northeast arrow after it using `::after` to indicate that it leads off the site.

Using attribute selectors, you can also highlight any images that don't have an alt text assigned yet. You can combine a pseudo-class selector and an attribute selector to get it done:

```CSS
img:not([alt]) {
    border: 5px solid red;
}
```

This select any image element that does _not_ have an `alt` attribute.

Tip: you're not just limited to the given attributes of an element. You can assign your own attributes to any HTML tag, so long as its name begins with `data-`. To illustrate:

```HTML
<section class="recipes" data-category="dessert"></section>
```

Then you could style all and only all dessert recipes in CSS as such:

```CSS
section[data-category="dessert"] {
    background-color: periwinkle;
}
```

These custom `data-*` attributes let you store extra information in HTML elements that isn't visible to users but can be useful for styling or scripting. For example, you might categorize content (as shown above), track state (`data-status="active"`), or add metadata (`data-price="15"`).

For now, you can use these attributes as selectors to apply different styles to different categories of tags. Later, when we cover JavaScript, you'll see that `data-*` attributes are also the standard way to pass information from your HTML to your JavaScript code.

## Functions

There are a number of **functions**[^2] baked into CSS. You can distinguish functions as any keyword(s) followed by parentheses that contain an argument.

![diagram of the property, function, and argument within a CSS declaration](/images/css-function.png)

We've already used a number of functions to assign values to CSS properties...

```CSS
color: rgb(255, 255, 0)
blur(5px)
rotate(90DEG)
translate(40px, -40px)
```

... and to create and assign custom properties...

```
font-family: var(--font-bebas-neue)
```

and even as selectors...

```
p:not(:first-child)
```

Now let's take a look at a few more.

### calc()

One function that you should definitely have in your toolbelt is `calc()`. The `calc()` function accepts two or more values that can be added, subtracted, multiplied, and/or divided. You can then pass in the whole `calc()` as a value to a property.

```CSS
main {
    width: calc(100vw - 20px);
}
```

The cool thing about `calc()` is that you can mix units, as shown above, and it'll automatically calculate the result. This allows you to combine relative units and absolute units seamlessly. This is probably the #1 most useful aspect of `calc()`.

`calc()` is usually used with properties that deal with numeric values like length, size, time, and degrees. Here are some more examples:

```CSS
width: calc(100vw / 3);
/* use with unitless values */

margin: 10px calc(2vw + 5px);
/* use as one part of a property */

font-size: calc(3vw + 2px);
/* use for responsive font sizes */

transition: transform calc(1s - 120ms);
/* use with units of time */

transform: rotate(calc(10deg * 5));
/* use with degrees, and within another function */

--spacing: 1rem;
margin-bottom: calc(var(--spacing) * 2);
/* pass in variables AKA custom properties */
```

As you're playing around with `calc()`, keep in mind there are some slight nuances to which units you can use with which operators (+, -, \*, /). You can read about these rules in this [MDN article](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/calc#css_typed_arithmetic).

### Filter functions

Filter functions allow you to add graphical effects to an element. Filter functions are specifically assigned as values to the `filter` property. Here's a list of different filter functions and examples of acceptable arguments from [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/filter):

```CSS
filter: blur(5px);
filter: brightness(0.4);
filter: contrast(200%);
filter: drop-shadow(16px 16px 20px blue);
filter: grayscale(50%);
filter: hue-rotate(90deg);
filter: invert(75%);
filter: opacity(25%);
filter: saturate(30%);
filter: sepia(60%);
```

You can stack multiple functions together within the `filter` property by separating them with a space: `filter: blur(5px) brightness(0.9)`.

### Transformation functions

Transformation functions allow you to rotate, resize, distort, or shift elements. These are assigned to the `transform` property. Examples include:

```CSS
transform: rotate(90deg);
/* turns your element/image 90• clockwise */

transform: scale(2);
/* makes your element/image twice as large */

transform: translate(-40px, 18px);
/* repositions your element along the x- and y-axes */
```

Out of these examples, `translate()` is probably the function that you'll most likely encounter a need for. It helps you reposition an element relative to its original location, similar to `position: absolute` paired with the `top`/`bottom`/`left`/`right` properties. The difference between the two is that applying `translate()` doesn't change the layout of the elements around a given element.

Developers mostly use `translate()` for animations (i.e. [slide-in effects](https://codepen.io/gabrieleromanato/pen/DOxzYY)) and occasionally to center elements on a page as such:

```CSS
.box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
```

## Extras!

### Transitions

Within CSS, both transitions and animations can be used to animate your webpage's elements. **Transitions** animate changes between two states (like hover), while **animations** can run continuously or on page load without user interaction.

Starting with transitions, these are applied through the `transition` property, which is a shorthand that captures various arguments at once. They're usually used to animate changes in the hover, focus, and active states.

```CSS
.box {
    background-color: white;
    transition: background-color 0.5s ease-in;
}

.box:hover {
   background-color: yellow;
}
```

Let's breakdown the shorthand.

- `background-color`
  - This is the CSS property that you want to apply the transition to.
- `0.5s`
  - This is the duration of the transition, or how long it will take to complete, usually measured in seconds `s` or milliseconds `ms`.
- `ease-in`
  - Optionally, you can choose the transition timing function. This basically controls the acceleration of the transition. Some other values would be `linear` (constant speed), `ease-out` (starts fast then slows down), and `ease-in-out` (starts slow, picks up in the middle, then ends slow).[^3]

In order for transitions to take effect, you need to assign a value to the named property in both the base state and the alternative state of the element. In the example above, the starting state was `.box` and the final state was `.box:hover`, and the `background-color` property was declared in both. The `transition` property only needs to be declared in one state (usually the base state).

Transitions apply both ways. So in the example above, the backgroun color will change both when the user hovers over the box and hovers off of it.

### Animations

Animations can run automatically when the page loads, loop indefinitely, or trigger based on user actions (which you'll learn with JavaScript). To use animations, you first need to define the animation in a `@keyframes` at-rule. Then you can designate the rule by name in the `animation` shorthand property.

In this example, the text in `.disappearing-text` will fade into transparency over 10 seconds, quickly at first and then gradually as the opacity reaches 0:

```CSS
@keyframes fadeAway {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

.disappearing-text {
    color: black;
    animation: 10s fadeAway ease-out;
}
```

You can delineate more specific steps within the animation using percentages. In this example, the opacity falls to `0.5` a quarter of the way through the animation, giving it the effect of an ease-out function—it transitions quickly at first, then gradually toward the end:

```CSS
@keyframes fadeAway {
    0% {
        opacity: 1;
    }
    25% {
        opacity: 0.5;
    }
    100% {
        opacity: 0;
    }
}

.disappearing-text {
    color: black;
    animation: 10s fadeAway ease-out;
}
```

You can pack a lot more into the `animation` property, like if you want it to be delayed, loop infinitely, or even pause. For a more robust tutorial on keyframe animations, I'll defer to [Josh Comeau's post](https://www.joshwcomeau.com/animation/keyframe-animations/), which includes interactive examples and elaborates on the various animation properties.

### Using audio files

You can insert audio into your webpage using the `<audio>` element.

```HTML
<audio controls muted src="sample.mp3"></audio>
```

Everything the browser needs to create the audio tag is described in attributes in the opening tag. There is typically no content between the opening and closing tags.

The audio element comes with a few attributes, one of them being the audio source, designated with `src`. For file formats, stick with MP3 to be safe—it's the file format compatible with most browsers and devices. WAV or OGG files would also suffice, though WAV files tend to be larger in size and might take longer to load.

Another attribute is `controls`. When `controls` is present, that means the audio player will give the user buttons to control the playback, including volume, seeking, and pause/resume methods. If you don't include `controls`, these affordances won't show up. I would recommend always giving the user access to audio controls, but at the bare minimum, always include a pause/resume method.

The `muted` attribute determines if the audio file will initially be muted. If `muted` is present, the audio will be silenced. If it is not present, it will play aloud.

The `autoplay` attribute starts audio playback as soon as the source file loads. However, **it's generally not recommended to autoplay sound files when a webpage loads because it can be a startling experience for the user**. Many browsers actually having settings in place to block audio files from autoplaying, so if audio is an integral component to your webpage's experience, you have to get consent from the user before playing the audio. Consent can be a click, tap, or key press from the user. Sometimes this is effectively no different from asking the user to hit the "play" button on the audio player. You can see some examples of the consent-seeking process at [Talk with Urban Landscape](https://twul.ch/), [A Parade at the End of the World](https://i-n-g-a.com/pages/parade), or [Phantom Islands – A Sonic Atlas](https://andrewpekler.com/phantom-islands/).

The default style for the audio element will vary depending on the browser.

![default audio players for Chrome, Firefox, and Safari stacked vertically against a white background](/images/default-audio-players.png)

If you want more control over the appearance of the player, you can hide the default player and built your own audio interface. However, you'll need to know JavaScript in order to give the user the ability to pause/resume, adjust the volume, and so forth. If you're feeling ambitious, or want a preview of what this will entail, check out [Codepen user EmNudge's example of a custom audio player](https://codepen.io/EmNudge/pen/rRbLJQ).

---

[^1]: There is also a separate `:focus` pseudo-class, which achieves virtually the same purpose as `:focus-visible`. However, we use the latter because the `:focus` can be activated by key presses or mouse clicks, and `:focus-visible` is only activated by key presses. That way, we prevent focus effects from interfering with hover or active effects if a user is navigating with a mouse.

[^2]: Functions are pieces of code that perform a specific task. Any language can come with its own native functions, but they're more essential for scripting languages like JavaScript. We'll learn more about functions and how to write them in the next section of our curriculum.

[^3]: You can find some visual demonstrations of the different transition functions at [curveeditor.com](https://www.curveeditor.com/). The site is a bit overpowered for our needs, but just focus on the first couple presets and see the differences in their rates of change.
