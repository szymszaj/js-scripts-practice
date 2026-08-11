const numbers = [1, 2, 3, 4, 5];

const doubled = numbers.map((n) => n * 2);
console.log(doubled);

const evens = numbers.filter((n) => n % 2 === 0);
console.log(evens);

const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); 
