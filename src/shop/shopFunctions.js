const { products, people } = require("./data");

function getProductById(id) {
  return products.find((p) => p.id === id);
}

function getCartTotal(person) {
  return person.cart.reduce((total, item) => {
    const product = getProductById(item.productId);
    return total + product.price * item.quantity;
  }, 0);
}

function getProductsByCategory(category) {
  return products.filter((p) => p.category === category);
}

function sortProductsByPrice() {
  return [...products].sort((a, b) => a.price - b.price);
}

function whoBoght(productName) {
  const product = products.find((p) => p.name === productName);
  if (!product) return [];

  return people
    .filter((person) =>
      person.cart.some((item) => item.productId === product.id),
    )
    .map((person) => person.name);
}

function getTotalRevenue() {
  return people.reduce((sum, person) => sum + getCartTotal(person), 0);
}

function printAllCarts() {
  people.forEach((person) => {
    console.log(`\n--- Koszyk: ${person.name} ---`);
    person.cart.forEach((item) => {
      const product = getProductById(item.productId);
      console.log(
        `  ${product.name} x${item.quantity}  =  ${(product.price * item.quantity).toFixed(2)} zł`,
      );
    });
    console.log(`  RAZEM: ${getCartTotal(person).toFixed(2)} zł`);
  });
}

console.log("=== Produkty elektroniczne ===");
console.log(getProductsByCategory("elektronika"));

console.log("\n=== Produkty posortowane po cenie ===");
sortProductsByPrice().forEach((p) => console.log(`  ${p.name}: ${p.price} zł`));

console.log("\n=== Kto kupił Słuchawki? ===");
console.log(whoBoght("Słuchawki"));

printAllCarts();

console.log(
  `\n=== Łączny przychód sklepu: ${getTotalRevenue().toFixed(2)} zł ===`,
);
