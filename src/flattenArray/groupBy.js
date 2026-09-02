function groupBy(arr, keyFn) {
  return arr.reduce((groups, item) => {
    const key = keyFn(item);
    groups[key] = groups[key] || [];
    groups[key].push(item);
    return groups;
  }, {});
}

const people = [
  { name: "Anna", age: 25 },
  { name: "Bartek", age: 30 },
  { name: "Celina", age: 25 },
];

console.log(groupBy(people, (p) => p.age));
