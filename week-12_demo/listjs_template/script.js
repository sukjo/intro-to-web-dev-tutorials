// fetch data from json file
async function fetchData() {
  const response = await fetch("./data.json");

  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.status}`);
  }

  const data = await response.json();

  // just to make the demo easier — pre-filter data for only the first listed subject/genre for each book
  // map() is a method of creating a copy of an array that has undergone a transformation
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
