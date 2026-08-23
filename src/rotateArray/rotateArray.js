function rotateArray(arr) {
  const lastElement = arr[arr.length - 1];

  for (let i = arr.length - 1; i > 0; i--) {
    arr[i] = arr[i - 1];
  }

  arr[0] = lastElement;
}

const numbers = [1, 2, 3, 4, 5];

rotateArray(numbers);

console.log(numbers);
