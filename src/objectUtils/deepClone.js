function deepClone(value) {
  if (value === null || typeof value !== "object") {
    return value;
  }

  if (Array.isArray(value)) {
    return value.map(deepClone);
  }

  const result = {};
  for (const key in value) {
    if (Object.hasOwn(value, key)) {
      result[key] = deepClone(value[key]);
    }
  }

  return result;
}

const original = {
  name: "Anna",
  hobbies: ["JS", "chess"],
  address: { city: "Warszawa" },
};

const shallow = { ...original };
const deep = deepClone(original);

shallow.address.city = "Zmieniony przez shallow copy";
deep.address.city = "Zmieniony przez deep clone";

console.log("original:", original.address.city);
console.log("shallow (dzieli referencje!):", shallow.address.city);
console.log("deep (niezależna kopia):", deep.address.city);
