function findMax(arr) {
  return Math.max(...arr);
}

console.log(findMax([1, 2, 3, 4, 5, 20, 24, 30]));

function findMaxInPlace(arr) {
  let max = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      max = arr[i];
    }
  }

  return max;
}

console.log(findMaxInPlace([1, 2, 3, 4, 5, 20, 24, 30]));

function findMaxIndex(arr) {
  let maxIndex = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[maxIndex]) {
      maxIndex = i;
    }
  }

  return maxIndex;
}

console.log(findMaxIndex([1, 2, 3, 4, 5, 20, 24, 30]));