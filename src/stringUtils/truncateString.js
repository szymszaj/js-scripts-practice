function truncateString(str, maxLength) {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + "...";
}

console.log(truncateString("This is a fairly long sentence to truncate", 15));
console.log(truncateString("Short text", 15));
