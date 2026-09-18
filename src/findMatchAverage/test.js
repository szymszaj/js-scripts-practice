import { test } from "node:test";
import assert from "node:assert/strict";
import { task1 } from "./task1.js";
import { task2 } from "./task2.js";

const data = "side,currency,value\nIN,PLN,1\nIN,EUR,2\nOUT,ANY,3";

test("task1 returns value on full match", () => {
  assert.equal(task1({ side: "IN", currency: "PLN" }, data), "1");
});

test("task1 returns -1 when nothing matches", () => {
  assert.equal(task1({ side: "IN", currency: "GBP" }, data), "-1");
});

test("task1 ignores column order in search", () => {
  assert.equal(task1({ currency: "EUR", side: "IN" }, data), "2");
});

test("task1 works with unordered/renamed-position columns in header", () => {
  const reordered = "currency,value,side\nPLN,1,IN\nEUR,2,IN\nANY,3,OUT";
  assert.equal(task1({ side: "IN", currency: "PLN" }, reordered), "1");
});

test("task1 throws Key mismatch on extra search key", () => {
  assert.throws(
    () => task1({ side: "IN", currency: "PLN", extra: "x" }, data),
    /Key mismatch/,
  );
});

test("task1 throws Key mismatch on missing search key", () => {
  assert.throws(() => task1({ side: "IN" }, data), /Key mismatch/);
});

test("task2 computes weighted average (odd=10, even=20)", () => {
  const result = task2(
    [
      { side: "IN", currency: "PLN" }, // value 1 (odd -> weight 10)
      { side: "IN", currency: "EUR" }, // value 2 (even -> weight 20)
    ],
    data,
  );
  // (1*10 + 2*20) / (10+20) = 50/30 = 1.666... -> "1.7"
  assert.equal(result, "1.7");
});

test("task2 returns first match when duplicate rows exist", () => {
  const dupData = "side,currency,value\nIN,PLN,4\nIN,PLN,999";
  const result = task2([{ side: "IN", currency: "PLN" }], dupData);
  // must use the first match (4, even -> weight 20), not the later duplicate
  assert.equal(result, "4.0");
});

test("task2 excludes unmatched search entries from the average", () => {
  const result = task2(
    [
      { side: "IN", currency: "PLN" }, // value 1
      { side: "OUT", currency: "EUR" }, // no such row -> excluded
    ],
    data,
  );
  assert.equal(result, "1.0");
});

test("task2 throws Key mismatch if any search item has wrong keys", () => {
  assert.throws(
    () => task2([{ side: "IN", currency: "PLN" }, { side: "OUT" }], data),
    /Key mismatch/,
  );
});
