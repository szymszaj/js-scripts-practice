function uniqueBy(arr, keyFn) {
  const seen = new Set();

  return arr.filter((item) => {
    const key = keyFn(item);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

const orders = [
  { id: 1, customer: "Anna" },
  { id: 2, customer: "Bartek" },
  { id: 3, customer: "Anna" },
];

console.log(uniqueBy(orders, (o) => o.customer));
