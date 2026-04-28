# Special Topic: JS Libraries (Leaflet, List.js)

## Demo #1: Leaflet

Leaflet is an open-source, regularly updated, and well-documented JavaScript library that builds mobile-friendly interactive maps. These are all attributes that make it a great candidate for a library, as you'll rely on documentation, forums, and regular updates to learn and keep using any JS library.

### Setup

To get started with the demo, go to `/week-12_demo/leaflet_template`. The files within are already connected to a spreadsheet via the opensheet API. If you serve the site, you'll see that there is already a general structure to the page, with a heading and a menu of buttons. Now it's time to add our map.

To install Leaflet, go to [https://leafletjs.com/](https://leafletjs.com/) and find your way to the "Tutorials" page. Any time there's a "quick start" guide in a software's documentation, it's an indication that's a good place to start.

Within the quick start guide, you'll find that the CDN links are already prepared to be copy/pasted into your project template. Go ahead and follow the first few steps until you have the Leaflet JS and CSS files linked and yxour `#map` div set up in the HTML body (your map's id can be anything you want, not just "map").

Then add the following line to your `script.js`.

```javascript
let map = L.map("map").setView(startingLatLng, 0);
```

The first argument for `setView()` is the latitude and longitude you want your map to be centered on when it first initiates. In this case, we have it set to the `startingLatLng` that is stored as a constant variable in the template. The second argument is the zoom level at which you want your map to initiate. A zoom level of `0` equates to no zoom, which will be the widest possible view of the map (the full mercator projection). A higher zoom level will be more zoomed in.

At this point, you'll see a gray box on your page, but no map-like images. This is because you need to call in the images that comprise the map via a tile layer, which relies on an external **basemap**, which is the building block that provides spatialized, contextual data for maps. There are many [open-source basemaps](https://wiki.openstreetmap.org/wiki/Raster_tile_providers) out there, but we'll start with OpenStreetMap. You can paste the following directly into your script:

```javascript
L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);
```

Note the `.addTo(map)` at the end. This is a pattern you'll see throughout Leaflet. Most Leaflet objects are created first and then explicitly added to the map instance. If you forget `.addTo(map)`, the object is created in memory but never rendered to the page.

At this point you should see a working, pannable, zoomable map in your browser. Change the zoom level from `0` to `6` and re-serve the page to see the difference.

You can also try changing the tile source to any of the open-source basemaps above to see the difference.

### Setting up our functions

Right now our script is just a few loose lines at the top level. Before we go further, let's pause to organize our code into functions, and plan out upcoming functions we'll need, too. This is good practice for a number of reasons:

- A map page typically has several distinct phases: fetching data, building the map, setting up interactions. Keeping these in separate functions makes it much easier to understand the structure of the program at a glance.
- Functions can accept inputs and return outputs, which lets us pass data from one phase to the next in a controlled way rather than relying on global variables that any part of the script can overwrite.
- When something breaks, a well-organized function structure helps you isolate exactly where the problem is.

We'll structure the script around four functions:

- `getData()` — already in the template; fetches our spreadsheet data and returns it
- `initMap(data)` — takes that data, builds the map, and returns the markers
- `initListeners(loadedMarkers)` — takes the markers and wires up the navigation buttons
- `initPage()` — contains all the above functions; runs when the page loads

Notice that each function only does one job, and each receives everything it needs (i.e. data, markers) as an argument rather than reaching out to grab global variables.

Go ahead and restructure your script so it matches this shape:

```javascript
async function getData() {
  // fetch and return data
}

async function initMap(data) {
  // build map, add markers, return markers
}

function initListeners(loadedMarkers) {
  // wire up buttons
}

async function initPage() {
  const data = await getData();
  const loadedMarkers = await initMap(data);
  initListeners(loadedMarkers);
}

initPage();
```

In the above, `initPage()` uses `await` before both `getData()` and `initMap()`, because both of them rely on a Promise object that contains the data-to-come. Setting it up this way guarantees the data will be fully fetched before the map tries to use it, and all markers are fully placed on the map before the navigation buttons try to reference them. Without `await`, the next line would run immediately regardless of whether the previous one had finished, leading to errors because you'd be trying to use data or markers that don't exist yet.

### Fetching the data

The template provided already has the `fetch()` set up with a connection to a spreadsheet via the opensheet API. The data in the spreadsheet is sourced from [https://www.slavevoyages.org/](https://www.slavevoyages.org/). The only work here is to simply move the fetch call into your new `getData()` function.

```javascript
async function getData() {
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }
  return response.json();
}
```

### Adding markers

**Markers** in Leaflet are like pins that demarcate specific locations on the map. We can create a marker for each of the locations specified in the data. First, let's move our existing `L.map()` and `L.tileLayer()` lines inside the `initMap(data)` function. Then, to place a marker for each row in the spreadsheet, we'll loop through the data array and create a `L.marker()` for each record.

Look up `L.marker()` in [Leaflet's documentation](https://leafletjs.com/reference.html) to see what arguments it expects. You'll find it takes a `LatLng` — in practice, an array of `[latitude, longitude]` — as its first argument. Each row of our spreadsheet has `Latitude` and `Longitude` columns we can use directly:

```javascript
data.forEach((row) => {
  const lat = row.Latitude;
  const lng = row.Longitude;
  const marker = L.marker([lat, lng]);
  marker.addTo(map);
});
```

Serve the page and you should see individual markers appearing on the map.

### Binding popups to markers

A marker on its own doesn't tell us much. Leaflet lets you bind a **popup** to any marker, which is a small overlay that appears when the marker is clicked. Look up `.bindPopup()` in the [Leaflet documentation](https://leafletjs.com/reference.html#marker-bindpopup) and you'll see it accepts either a plain string or an HTML string, which means we can format our popup content however we like.

Replace `marker.addTo(map)` inside your loop with the following, which builds an HTML string from the row's data and binds it to the marker before adding it to the map:

```javascript
const popupContents = `
  Vessel: ${row["Name of vessel"]}
  Year of Arrival: ${row["Year arrived with captives"]}
  Nature of the resistance: ${row["Resistance"]}
`;

marker.bindPopup(popupContents);
marker.addTo(map);
```

Click a marker in the browser and you should see the popup appear. At this point it's worth thinking about the data a little: some fields in the spreadsheet use `0` to indicate an unknown value rather than leaving the field blank. Rather than displaying a literal `0` to the reader, we can check for this and substitute something more readable:

```javascript
let vesselName;
if (row["Name of vessel"] && row["Name of vessel"] !== 0) {
  vesselName = row["Name of vessel"];
} else {
  vesselName = "name unknown";
}
```

Apply the same pattern to the crossing duration field. This is a good habit when working with real-world datasets, which often encode missing data in inconsistent ways.

### Adding a plugin

With many markers in a small area, the map quickly becomes difficult to read — markers overlap and it's hard to click individual ones. This is a common enough problem that a Leaflet plugin exists specifically to address it: **Leaflet.markercluster**.

**Plugins** extend a library's functionality beyond what the core library provides. For Leaflet, they're distributed separately and loaded via their own CDN links, which are already included in your HTML template. Take a look at the [markercluster documentation on GitHub](https://github.com/Leaflet/Leaflet.markercluster) to get a sense of how the plugin works before we implement it.

The core idea is that instead of adding markers directly to the map, we add them to a `L.markerClusterGroup()`, and add that group to the map. Clusters of markers automatically merge and splinter as you zoom in and out.

Replace your existing marker logic with the following. Note that this should happen _outside_ the loop, because you only want to create one `markerClusterGroup`, not one for each data point. So you create one cluster group, then add each marker to it inside the `forEach` loop, then add the whole group to the map after the loop finishes:

```javascript
const markers = L.markerClusterGroup();

data.forEach((row) => {
  const lat = row.Latitude;
  const lng = row.Longitude;
  const marker = L.marker([lat, lng]);

  const popupContents = `
      <p>${row["Name of vessel"]}</p>
      <p>Year arrived with captives: ${row["Year arrived with captives"]}</p>
    `;

  marker.bindPopup(popupContents);
  markers.addLayer(marker); // add to cluster group, not directly to map
});

map.addLayer(markers); // add the whole cluster group to the map
```

Now `initMap` should return `markers` at the very end, so `initPage` can pass the markers along to `initListeners`:

```javascript
map.addLayer(markers);
return markers;
```

### Adding custom interactivity

The HTML template already includes "previous" and "next" buttons in the `<nav>`. Now we'll fill in the `initListeners(loadedMarkers)` function to make them work.

The idea is to keep track of an index (`currentMarker`) that represents which marker we're currently viewing. Each button click increments or decrements that index and then programmatically opens the popup for the corresponding marker.

First, `getLayers()` gives us a flat array of all the individual markers inside the cluster group, which we can index into:

```javascript
function initListeners(loadedMarkers) {
  const fwdBtn = document.getElementById("fwd-btn");
  const backBtn = document.getElementById("back-btn");
  backBtn.classList.add("inactive");

  const markersArray = loadedMarkers.getLayers();

  fwdBtn.addEventListener("click", () => {
    if (currentMarker < markersArray.length - 1) {
      currentMarker++;
      const thisMarker = markersArray[currentMarker];
      loadedMarkers.zoomToShowLayer(thisMarker, function () {
        thisMarker.openPopup();
      });
    }
  });

  backBtn.addEventListener("click", () => {
    if (currentMarker > 0) {
      currentMarker--;
      const thisMarker = markersArray[currentMarker];
      loadedMarkers.zoomToShowLayer(thisMarker, function () {
        thisMarker.openPopup();
      });
    }
  });
}
```

`zoomToShowLayer()` is a markercluster method. You can look it up in the [plugin documentation](https://github.com/Leaflet/Leaflet.markercluster#other-methods) to understand what it does. Basically, because markers might be hidden inside a cluster at the current zoom level, calling `openPopup()` directly on a hidden marker won't work. `zoomToShowLayer()` first zooms and pans the map until the marker is visible, and _then_ runs the **callback function** you pass it. A callback function is a function that is invoked by another function and only runs when that original function completes. In this case, the callback function opens the popup only once the zooming is complete.

### Handling button state

Try clicking the "next" button all the way to the last marker. How do you know you've reached the last marker? So far, you only know because clicking on the button no longer modifies anything on the screen, but this isn't a very helpful indicator, because it could just as well be read as an error. We can improve this user interaction by toggling an `inactive` class on the buttons when they reach the boundaries of the array. The CSS for this class is already defined in your stylesheet.

Add the following state checks inside each button's event listener, after incrementing or decrementing `currentMarker`:

```javascript
// inside fwdBtn listener, after currentMarker++:
backBtn.classList.remove("inactive");
if (currentMarker === markersArray.length - 1) {
  fwdBtn.classList.add("inactive");
}

// inside backBtn listener, after currentMarker--:
fwdBtn.classList.remove("inactive");
if (currentMarker === 0) {
  backBtn.classList.add("inactive");
}
```

The "back" button should also start in an inactive state since there's nowhere to go back to on load. Add this line near the top of `initListeners`, before the event listeners are attached:

```javascript
backBtn.classList.add("inactive");
```

### Wrapping up

Serve the final page and verify that:

- The map loads centered on Cuba at zoom level 6
- Markers are clustered and clicking a cluster zooms in to reveal individual markers
- Clicking a marker opens a popup with the voyage data
- The "next" and "previous" buttons step through the markers in sequence
- The buttons visually disable at the start and end of the list

The final `script.js` and supporting files are available in `/week-12_demo/leaflet_final` for reference. As you review them, notice how the functions we set up earlier makes the overall program organized and easy to read even before you look at any individual line of code. Knowing how to create modular functions is helpful not only for debugging the runtime code but also for human readers!

## Demo #2: List.js

[List.js](https://listjs.com/) is a lightweight JavaScript library for adding search, filtering, and sorting to any HTML list. Where Leaflet gave us a way to render and interact with spatial data, List.js gives us tools to render and interact with tabular data.

The setup will be similar. Go to `/week-12_demo/listjs_template` to start. For this example, the library is already linked via CDN in the `<head>`, and `script.js` once again already contains a `fetchData()` function. If you open the [List.js documentation](https://listjs.com/docs/), you'll find it concise and well-organized. Keep it open throughout this demo.

### What's in the template

Before writing any code, let's take a moment to look at what's already set up in the template. In `script.js`, `fetchData()` fetches from `data.json`, checks for errors, and returns the parsed data—the same pattern as `getData()` in the Leaflet demo. The only new thing happening inside it is a loop that cleans up each book record before returning it.

```javascript
const cleanedBooks = data.map((book) => {
  let firstGenre = "Unknown";
  if (book.subject && book.subject.length > 0) {
    firstGenre = book.subject[0].split(",")[0].trim();
  }
  return { ...book, genre: firstGenre };
});
```

The "subject" field in the raw data is an array of genre strings, some of which contain comma-separated values. This code extracts just the first genre from the first entry and stores it in a new field called "genre". You don't need to fully understand this code right now; the key thing is that after `fetchData()` runs, each record in your data has a clean "genre" field alongside its other properties. We'll be using this instead of the "subject" field. Open `data.json` and look at a few records to get a sense of the shape of the data.

### Setting up the HTML structure

List.js has one requirement: the HTML structure it manages must exist in the DOM before you initialize the library. This is because in order to manipulate elements, List.js looks for them and their containers, usually by class name or id. At minimum List.js needs to see:

1. A container element with an `id` it can reference
2. An element with `class="list"` inside that container, where it will render items
3. Optionally, a search input with `class="search"` or `class="fuzzy-search"`, and sort buttons with `class="sort"`

Add the following to your `<body>` to start:

```html
<div id="list-container">
  <menu>
    <input class="fuzzy-search" placeholder="Search..." />
  </menu>
  <ul class="list"></ul>
</div>
```

The `<ul class="list">` is where List.js will inject your items. It starts empty, and the library populates it from your data. The search input will work automatically just by having the right class name, with no additional code required. This is similar to how Leaflet's sort buttons work: the library looks for elements with specific class names and wires up behavior to them.

If you serve the page now, nothing will be visible yet. That's because we still need to initialize the list in JS.

### Initializing List.js

Just as we used `initMap(data)` in the Leaflet demo to set up the map after fetching data, we'll write an `initList(data)` function here. Add it to your script:

```javascript
function initList(data) {
  const container = document.getElementById("list-container");

  const options = {
    valueNames: ["title", "author_name", "first_publish_year", "genre"],
    item: `<li>
      <p class="title"></p>
      <p class="author_name"></p>
      <p class="first_publish_year"></p>
      <span class="genre"></span>
    </li>`,
  };

  list = new List(container, options, data);
}
```

There are two things to pay attention to in `options`.

`valueNames` tells List.js which fields in your data to display. The names here must match the property names in the JSON file exactly, and each one must correspond to a class name on an element inside your `item` template.

`item` is an HTML string that defines the template for a single list item. List.js creates one copy of this template per record and fills in each element's text content by matching class names to `valueNames`. The elements start empty (no text context within opening and closing tags) because List.js automatically fills them in for you.

Now add an `initPage()` function that calls both `fetchData()` and `initList()` in sequence, the same way `initPage()` did in the Leaflet demo:

```javascript
async function initPage() {
  try {
    const data = await fetchData();
    initList(data);
  } catch (error) {
    console.error(`Error initializing page: ${error}`);
  }
}

initPage();
```

Serve the page. You should now see—with just a few lines of code and barely any JS—a list of books and a working search input!

### Standard search vs. fuzzy search

If you set up your input field with `class="fuzzy-search"` rather than `class="search"`, you might see more flexible search results that accept misspelled words and non-exact keyword matches.

**Standard search** (`class="search"`) matches only items that contain the exact string you type. **Fuzzy search** (`class="fuzzy-search"`) uses approximate matching, so a query like "hemmingway" will still produce "Hemingway" results. For a dataset where users might not know exact titles or spellings, fuzzy search is often a better choice. Fuzzy search is generally a better choice considering people make mistakes. You can try swapping the class name in your HTML between the two to see the difference directly.

### Deriving valueNames from data

Rather than listing field names manually in `valueNames`, you can derive them automatically from the first record in your dataset. This is useful when working with large or unfamiliar datasets where you don't want to type out every field name by hand. The key is to reference only the keys within the data, not the values themselves. In JS, you can do this using the following:

```javascript
valueNames: Object.keys(data[0]),
```

`Object.keys()` returns an array of an object's keys, or property names. Since every record in a well-formed dataset should have the same structure, the first record's keys give you all the field names. Try swapping out the array of key names with this line, or print it to the console first if you want to see what it represents. The result should be identical, since the field names match. For a dataset with many fields and fields that may change often, this approach saves time and reduces the chance of error.

### Sorting data via buttons

Sort buttons in List.js work the same way as the search input: the library looks for elements with `class="sort"` and a `data-sort` attribute matching a value name, and sets up click behavior automatically. Add the following inside your `<menu>`:

```html
<div id="sort-container">
  <button class="sort" data-sort="author_name">Sort by author (A-Z)</button>
  <button class="sort" data-sort="first_publish_year">
    Sort by publication year
  </button>
</div>
```

Serve the page and try clicking the buttons. The first click on each button sorts ascending, the second click sorts descending. No additional JavaScript required.

Optionally, you can update the button label to reflect the current sort direction. This requires a small event listener that tracks state with a boolean variable—the same pattern we used in the Leaflet demo for button state.

```javascript
let sortAuthorAZ = false;
const authorSortBtn = document.querySelector('[data-sort="author_name"]');

authorSortBtn.addEventListener("click", () => {
  if (!sortAuthorAZ) {
    authorSortBtn.textContent = "Sort by author (Z-A)";
    sortAuthorAZ = true;
  } else {
    authorSortBtn.textContent = "Sort by author (A-Z)";
    sortAuthorAZ = false;
  }
});
```

### Filtering with a checkbox

List.js's `list.filter()` method accepts a callback function and hides any item for which the callback returns `false`. Unlike sorts and search, filters require you to write your own logic. List.js only provides the mechanism, but the condition is yours to define.

First add the checkbox to your HTML, inside `<menu>`. There are no exact class names or ids we have to follow in this case.

```html
<div id="genre-filters">
  <div class="checkbox">
    <input type="checkbox" name="genre-filter" />
    <label>Fiction</label>
  </div>
</div>
```

Then add the listener in your script. Note that `list` is declared at the top of the file as a global variable — this is what allows the event listener to reference it even though it was assigned inside `initList()`:

```javascript
let filtered = false;
const fictionFilter = document.querySelector('input[type="checkbox"]');

fictionFilter.addEventListener("change", () => {
  if (!filtered) {
    list.filter(function (item) {
      if (item.values().genre === "Fiction") {
        return true;
      } else {
        return false;
      }
    });
    fictionFilter.checked = true;
    filtered = true;
  } else {
    list.filter();
    fictionFilter.checked = false;
    filtered = false;
  }
});
```

`item.values()` returns a plain object of that item's data, which are the same fields you defined in `valueNames`. So calling `list.filter()` with no argument clears the filter and restores all items. The `filtered` boolean tracks whether a filter is currently active, so clicking the checkbox toggles it on and off.

Try it in the browser. Then try changing "Fiction" to another genre present in your data to confirm the filter condition is working correctly.

### Adding a reset button

When you have multiple filters or sort states active, it's useful to give users a single button that clears everything at once. Add it to your HTML:

```html
<button id="clear-filters">Reset filters</button>
```

Then add the listener in your script:

```javascript
const clearFilterBtn = document.getElementById("clear-filters");

clearFilterBtn.addEventListener("click", () => {
  list.filter();
  fictionFilter.checked = false;
  filtered = false;
});
```

This manually resets both the List.js filter and the checkbox's visual state. Note that it doesn't reset the sort order. List.js doesn't have a built-in method for that. If you wanted to restore the original order, you'd need to either reinitialize the list entirely or store the original data order and re-sort to it. For now, the reset button only resets the filter.

### Other List.js features

In addition to search, sorting, and filtering, List.js also comes with a number of other handy features.

**Pagination** is one. If your dataset is large, List.js can break it into pages automatically. You define `page` and `pagination` in your options:

```javascript
const options = {
  valueNames: [...],
  item: `...`,
  page: 10, // how many items you want on each page
  pagination: true, // boolean
};
```

You'll need to add `<ul class="pagination"></ul>` to your container so List.js can generate page controls. Look up the [pagination plugin](https://listjs.com/docs/pagination/) in the documentation to see the available options.

You can also **write item templates with a function** instead of passing a static HTML string as `item`. That function will receive each data record and return a string. This lets you add conditional logic to your template, such as rendering a field differently depending on its value:

```javascript
item: function(values) {
  return `<li>
    <p class="title">${values.title}</p>
    <span class="genre" style="background-color: ${values.genre === 'Fiction' ? 'tomato' : 'steelblue'}">
      ${values.genre}
    </span>
  </li>`;
},
```

The static string template is simpler and covers most cases, but the function form gives you more control when you need it.

### Wrapping up

Serve the final page and verify that:

- All book records are rendered from `data.json`
- The fuzzy search input filters results as you type
- Both sort buttons work and toggle direction on repeated clicks
- The Fiction checkbox filters the list and toggling it restores all items
- The reset button clears the checkbox filter

The final files are in `/week-12_demo/listjs_final` for reference. Compare your `script.js` to the final version and notice that the overall structure mirrors the structure we used in the Leaflet demo. This pattern of separating data fetching, rendering, and interaction into distinct functions is worth carrying into any project you build with external data.
