function reverseArray(arr) {
  return [...arr].reverse();
}

const original = [1, 2, 3];
console.log(reverseArray(original));
console.log(original);
