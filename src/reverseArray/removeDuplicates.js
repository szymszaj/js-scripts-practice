function removeDuplicates(arr) {
  return [...new Set(arr)];
}

const numbers = [1, 2, 3, 2, 4, 1, 5];
console.log(removeDuplicates(numbers));

console.log(numbers);
