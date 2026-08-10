function reverseArray(arr) {
  return [...arr].reverse();
}

const original = [1, 2, 3];
console.log(reverseArray(original));
console.log(original);

function reverseArrayInPlace(arr) {
  for (let i = 0; i < Math.floor(arr.length / 2); i++) {
    const temp = arr[i];
    arr[i] = arr[arr.length - 1 - i];
    arr[arr.length - 1 - i] = temp;
  }
}

const originalInPlace = [1, 2, 3];
reverseArrayInPlace(originalInPlace);
console.log(originalInPlace);
