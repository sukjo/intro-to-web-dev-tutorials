# APIs Continued

## Demo #1: opensheet API

The [opensheet API](https://github.com/benborgers/opensheet?tab=readme-ov-file) by Ben Borgers allows you to retrieve a Google Sheet as a JSON file and then pull it into your website. Storing your website's main contents in a Google Sheet can be super handy when you have data that you update often, or if your data already exists in a Google Sheet.

Before we begin, note that in order for the opensheet API to work, your Google Sheet has to be shared so that "anyone with the link can view" it. This is because the API does not have any built-in authentication steps (e.g. asking you for a key or login credentials). This also means that your Google Sheets database is read-only: you can only read data from it, but you cannot create, update, or delete data from your website alone. [^1]

To start, create or locate a Google Spreadsheet and set the sharing permissions to "anyone with the link can view". For this example, we'll use this [template](https://docs.google.com/spreadsheets/d/1seml7EpmC5s0zlXxEF_viGl8zYniSReNp4olegODom8/edit?usp=sharing). Copy the link and paste it into your JS file. Erase every part of the link aside from the string of characters between `/d/` and `/edit?`. This is your spreadsheet's unique ID.

```markdown
https://docs.google.com/spreadsheets/d/1seml7EpmC5s0zlXxEF_viGl8zYniSReNp4olegODom8/edit?usp=sharing
```

Store the ID in a variable, as well as a tab index. The tab index keeps track of which tab within your spreadsheet you are calling. For this API, tab indexes start at `1`.

```javascript
const sheetID = "1seml7EpmC5s0zlXxEF_viGl8zYniSReNp4olegODom8";
const tabIndex = "1";
```

Then write a simple async function that calls the API using your specific sheet ID, parses the data, and logs it to the console.

```javascript
async function fetchData() {
  const response = await fetch(
    `https://opensheet.elk.sh/${sheetID}/${tabIndex}`,
  );
  const data = await response.json(); // parse the data
  console.log(data);
}
```

If you look at the data that is printed to the console, each row of your spreadsheet should be printed as a JS object, with the header row (row #1) as keys and the corresponding cells' contents as the value. This makes it pretty easy for us to grab select values from each row, and to iterate through all the rows.

Now let's update the function to account for errors. We also want to update it to `return` the parsed data, rather than printing it to the console, because we're soon going to use it in another function. `return` is a statement that stops a function from executing beyond where it is called and returns a value.

```javascript
async function fetchData() {
  const response = await fetch(
    `https://opensheet.elk.sh/${sheetID}/${tabIndex}`,
  );

  if (!response.ok) {
    throw new Error(`HTTP error: ${response.status}`);
    // if the response does not send a success message, "throw" an error
  } else {
    const data = await response.json(); // parse the data
    return data; // "return" the parsed data
  }
}
```

Then create a separate function that takes the data from `fetchData()` and adds it to the DOM by looping through each item (or row) within the spreadsheet and adding its contents to a `#container` div within our HTML. You can access each value within each row by the name of the header, exactly as it is written in the spreadsheet. The example spreadsheet contains image data from Wikimedia, so we'll place them into the DOM as headings and images.

```javascript
const container = document.getElementById("container");

function renderData(data) {
  data.forEach((row) => {
    const title = document.createElement("h2");
    title.textContent = row.Title; // grab the value from the "Title" column of your spreadsheet
    container.appendChild(title);

    const img = document.createElement("img");
    img.setAttribute("src", row.Image_URL); // grab the Image_URL value
    img.setAttribute("alt", row.Alt_Text); // grab the Alt_Text value
    container.appendChild(img);
  });
}
```

Now combine the two functions by passing the data returned by `fetchData()` into `renderData()` and wrapping the whole thing in another `async` function. The `async` function is required here because you can only use the keyword `await` within an async function—basically, any time there are instructions that are waiting on a promise to execute, they need to be inside an `async` function.

```javascript
async function initializeData() {
  const parsedData = await fetchData();
  renderData(parsedData);
}

initializeData();
```

If all went accordingly, you should see your webpage populate with the contents of the spreadsheet. Cheers!

## Demo #2: Smithsonian API

Another common way to use APIs is access existing datasets, such as weather data, government data, or data from a museum's digital archive. You can see an extensive list of free, public APIs at this (somewhat dated) [repository by Todd Motto](https://github.com/toddmotto/public-apis?tab=readme-ov-file#government). There are also a number listed in this [DH Resources page by Alan Liu](http://dhresourcesforprojectbuilding.pbworks.com/w/page/69244469/Data%20Collections%20and%20Datasets).

Public APIs are designed to have external users, so they usually come with documentation on how to use them. Reading the documentation is an essential part to working with APIs, since not all are guaranteed to have the same data structure. That said, some APIs' documentation is better than others. The [Smithsonian Open Access API](https://www.si.edu/openaccess/devtools) has less verbose [documentation](https://edan.si.edu/openaccess/apidocs/), so let's practice using it together.

Usually, the first step to working with a public API will be to **request an API key** by registering on their website. Open / free APIs usually require registration via email for the purposes of monitoring usage and communicating with users (i.e. in the case of security breaches). Other APIs will have a paid tier that is priced by request volume, special features, or number of users. For the Smithsonian API, you can register for a key at [https://api.data.gov/signup/](https://api.data.gov/signup/).

APIs usually have **rate limits** (how many times you can request data per minute), which exist because every API request requires the provider to use their own electricity, processing power, and bandwidth, and they need to manage their resources. Rate limits also exist to prevent bad actors (or bad programmers) from crashing their servers with too many requests in a short amount of time.

Returning to Smithsonian's Open Access as an example, the site has a number of different APIs, including ones for content, metrics, and search. We're going to practice using the search API.

With any API, you usually specify your request via the URL, formally known as the **API endpoint**. Just as we added our spreadsheet ID and tab index to the opensheet API endpoint, we can add filters and search terms to the Smithsonian search API to specify what data we want in return.

This is the base for the Smithsonian search API endpoint:

```
https://api.si.edu/openaccess/api/v1.0/search
```

From there, you add a `?` to indicate the beginning of your specific query. Then you add things like your API key and a simple search query.

```javascript
const API_key = [insert API key];
const query = "cats";

fetch(`https://api.si.edu/openaccess/api/v1.0/search?q=${query}&api_key=${API_key}`)
```

You can build on top of it by searching for multiple keywords (connected via boolean operators):

```javascript
const API_key = [insert API key];
const query = "cats&dogs";

fetch(`https://api.si.edu/openaccess/api/v1.0/search?q=${query}&api_key=${API_key}`)
```

... and then add more parameters to your search to further specify the results...

```javascript
const API_key = [insert API key];
const query = "cats&dogs";
const rows = 20;

fetch(`https://api.si.edu/openaccess/api/v1.0/search?q=${query}&api_key=${API_key}&rows=${rows}`)
```

... and even sort the results in a certain order, in the case of this particular API...

```javascript
const API_key = [insert API key];
const query = "cats&dogs";
const rows = 20;
const sort = "newest";

fetch(`https://api.si.edu/openaccess/api/v1.0/search?q=${query}&api_key=${API_key}&rows=${rows}&sort=${sort}`)
```

... and so forth. Once you have your endpoint set up, you can start parsing and rendering the data into your webpage.

It can take some trial and error to find out how to grab specific data from the resulting JSON response. Usually, I inspect the response by parsing it and viewing it in the console, or by copy/pasting the entire endpoint URL directly in the browser to view the raw API response. Once you start seeing what data is stored under which keys, you can drill down to them using bracket notation (i.e. `data[row]`) or dot notation (i.e. `data.row`).

---

[^1]: If you try out the opensheet API and find that you really like the workflow of using Google Sheets to store your website data, and/or you need the ability to create/update/delete data from your website, I recommend you try out [SheetDB](https://sheetdb.io/), which lets you do all the above, and from a private spreadsheet. There is also always the [official Google Sheets API](https://www.exceldemy.com/create-web-app-google-sheets-api-simple-frontend/), which has the same affordances with a slightly different an authentication protocol.
