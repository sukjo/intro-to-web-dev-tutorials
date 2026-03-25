// console.log(typeof "hello");
// console.log(typeof true);
// console.log(typeof 9);

// console.log("Timor" + " " + "Leste");
// console.log(typeof (75 + "cents"));
// console.log(5 + 75);
// console.log(true + " to form");
// console.log(true + 75);

// console.log([2, 9, 10]);
// console.log({
//   name: "Sam",
//   age: 33,
//   employed: false,
// });
// console.log({
//   name: ["Sam", "Ann", "Cyrus"],
//   age: [33, 50, 74],
//   employed: [false, true, true],
// });
// console.log([
//   {
//     name: "Leya",
//     age: 10,
//     cat_names: ["monkey", "samson", "socks"],
//   },
//   {
//     name: "Jordan",
//     age: 58,
//     cat_names: ["mimi", "buttercup"],
//   },
//   {
//     name: "Sora",
//     age: 25,
//     cat_names: ["doorknob", "gray cat"],
//   },
// ]);

// const feet_per_mile = 5280;
// let feet_driven = 138864;
// // feet_driven = 0;
// console.log(feet_driven);
// console.log("I drove " + feet_driven + " feet");
// console.log(`I drove ${feet_driven} feet`);

// let townName = "Worthinghamptonshireton";
// console.log(townName.length);
// console.log(townName.toUpperCase());
// console.log(townName.split(""));
// console.log(townName.split("o"));

let authors = [
  "Virginia Woolf",
  "Charlotte Bronte",
  "Toni Morrison",
  "Zora Neale Hurston",
  "Jane Austen",
];
console.log(authors.length);
console.log(authors.toString());
console.log(authors.join());
console.log(authors.join(" ! "));

authors.push("Sylvia Plath");
console.log(authors);

authors.pop();
console.log(authors);

console.log(authors[1]);
