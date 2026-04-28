let list;

// fetch data from json file
async function fetchData() {
  const response = await fetch("./data.json");

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  const data = await response.json();

  // just to make the demo easier — filter for only the first listed subject/genre for each book
  const cleanedBooks = data.map((book) => {
    let firstGenre = "Unknown";

    if (book.subject && book.subject.length > 0) {
      firstGenre = book.subject[0].split(",")[0].trim();
    }

    return {
      ...book,
      genre: firstGenre,
    };
  });

  return cleanedBooks;
}

// initialize list.js list
function initList(data) {
  const container = document.getElementById("list-container");

  const options = {
    valueNames: Object.keys(data[0]), // derive column names from first record
    item: `<li>
    <p class="title"></p>
    <p class="author_name"></p>
    <p class="first_publish_year"></p>
    <span class="genre"></genre>
    </li>`,
    // item: function (value) {
    //   return `<li>
    //                 <p class="author_name">${value.author_name}</p>
    //                 <p class="title">${value.title}</p>
    //                 <span class="first_publish_year">${value.first_publish_year}</span>
    //                 <span class="genre">${value.genre}</span>
    //             </li>`;
    // },
  };

  list = new List(container, options, data);
}

// fetch data + init list
async function initPage() {
  try {
    const parsedData = await fetchData();
    initList(parsedData);
  } catch (error) {
    console.error(`Error initializing page: ${error}`);
  }
}

initPage();

// update the sort button text whenever the sort is toggled on/off
let sortAuthorAZ = false;
const authorSortBtn = document.querySelector('[data-sort="author_name"]');
authorSortBtn.addEventListener("click", () => {
  if (!sortAuthorAZ) {
    authorSortBtn.textContent = "Sort by author (Z-A)";
    sortAuthorAZ = true;
  } else if (sortAuthorAZ) {
    authorSortBtn.textContent = "Sort by author (A-Z)";
    sortAuthorAZ = false;
  }
});

// apply filter via checkbox element
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

// button to clear all filters
const clearFilterBtn = document.getElementById("clear-filters");
clearFilterBtn.addEventListener("click", () => {
  list.filter();
  fictionFilter.checked = false;
  filtered = false;
});
