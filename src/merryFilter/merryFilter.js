const merry = [
  {
    name: "Merry",
    id: 1,
    age: 25,
    city: "New York",
  },
  {
    name: "Merry",
    id: 2,
    age: 30,
    city: "Los Angeles",
  },
  {
    name: "Merry",
    id: 3,
    age: 28,
    city: "Chicago",
  },
];

const filterMerryByAge = (arr, age) => {
  return arr.filter((merry) => merry.age > age);
};

const myMerry = filterMerryByAge(merry, 26);
console.log(myMerry);

const myWife = merry.filter((merry) => merry.city === "Los Angeles");
console.log(myWife);
