const products = [
  { id: 1, name: "Laptop", price: 3499.99, category: "elektronika" },
  { id: 2, name: "Słuchawki", price: 299.0, category: "elektronika" },
  { id: 3, name: "Koszulka", price: 49.99, category: "odzież" },
  { id: 4, name: "Buty sportowe", price: 189.0, category: "odzież" },
  { id: 5, name: "Kawa 1kg", price: 39.9, category: "spożywcze" },
  { id: 6, name: "Herbata", price: 19.9, category: "spożywcze" },
  { id: 7, name: "Monitor", price: 1299.0, category: "elektronika" },
  { id: 8, name: "Plecak", price: 159.0, category: "akcesoria" },
];

const people = [
  {
    id: 1,
    name: "Anna",
    cart: [
      { productId: 1, quantity: 1 },
      { productId: 2, quantity: 2 },
    ],
  },
  {
    id: 2,
    name: "Marek",
    cart: [
      { productId: 3, quantity: 3 },
      { productId: 5, quantity: 2 },
      { productId: 6, quantity: 1 },
    ],
  },
  {
    id: 3,
    name: "Kasia",
    cart: [
      { productId: 4, quantity: 1 },
      { productId: 8, quantity: 1 },
      { productId: 7, quantity: 1 },
    ],
  },
];

module.exports = { products, people };
