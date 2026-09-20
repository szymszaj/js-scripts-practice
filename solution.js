"use strict";

const HEADER_CACHE_LIMIT = 32;
const headerCache = new Map();

function getFirstLine(data) {
  const idx = data.indexOf("\n");
  let line = idx === -1 ? data : data.slice(0, idx);
  if (line.endsWith("\r")) line = line.slice(0, -1);
  return { line, bodyStart: idx === -1 ? data.length : idx + 1 };
}

function getHeaderInfo(headerLine) {
  const cached = headerCache.get(headerLine);
  if (cached) {
    headerCache.delete(headerLine);
    headerCache.set(headerLine, cached);
    return cached;
  }

  const columns = headerLine.split(",");
  const valueIndex = columns.indexOf("value");
  const keyColumns = columns.filter((c) => c !== "value");
  const info = { columns, valueIndex, keyColumns };

  headerCache.set(headerLine, info);
  if (headerCache.size > HEADER_CACHE_LIMIT) {
    headerCache.delete(headerCache.keys().next().value);
  }

  return info;
}

function validateSearchKeys(search, keyColumns) {
  const searchKeys = Object.keys(search);
  if (searchKeys.length !== keyColumns.length) throw new Error("Key mismatch");
  const keyColumnSet = new Set(keyColumns);
  for (const key of searchKeys) {
    if (!keyColumnSet.has(key)) throw new Error("Key mismatch");
  }
}

function* iterateRows(data, bodyStart) {
  const len = data.length;
  let start = bodyStart;
  while (start < len) {
    let end = data.indexOf("\n", start);
    if (end === -1) end = len;
    let line = data.slice(start, end);
    start = end + 1;
    if (line.length === 0) continue;
    if (line.charCodeAt(line.length - 1) === 13) line = line.slice(0, -1);
    yield line;
  }
}

function rowMatchesSearch(fields, columns, valueIndex, search) {
  for (let i = 0; i < columns.length; i++) {
    if (i === valueIndex) continue;
    if (fields[i] !== String(search[columns[i]])) return false;
  }
  return true;
}

function task1(search, data) {
  const { line: headerLine, bodyStart } = getFirstLine(data);
  const { columns, valueIndex, keyColumns } = getHeaderInfo(headerLine);

  validateSearchKeys(search, keyColumns);

  for (const line of iterateRows(data, bodyStart)) {
    const fields = line.split(",");
    if (rowMatchesSearch(fields, columns, valueIndex, search)) {
      return fields[valueIndex];
    }
  }

  return "-1";
}

function weightFor(value) {
  return value % 2 === 0 ? 20 : 10;
}

function task2(searchList, data) {
  const { line: headerLine, bodyStart } = getFirstLine(data);
  const { columns, valueIndex, keyColumns } = getHeaderInfo(headerLine);

  const queries = searchList.map((search) => {
    validateSearchKeys(search, keyColumns);
    return { search, found: false, value: null };
  });

  let remaining = queries.length;
  if (remaining > 0) {
    for (const line of iterateRows(data, bodyStart)) {
      const fields = line.split(",");
      for (const query of queries) {
        if (query.found) continue;
        if (rowMatchesSearch(fields, columns, valueIndex, query.search)) {
          query.found = true;
          query.value = fields[valueIndex];
          remaining--;
        }
      }
      if (remaining === 0) break;
    }
  }

  let weightedSum = 0;
  let weightSum = 0;
  for (const query of queries) {
    if (!query.found) continue;
    const value = parseInt(query.value, 10);
    const weight = weightFor(value);
    weightedSum += value * weight;
    weightSum += weight;
  }

  if (weightSum === 0) return "0.0";

  return (weightedSum / weightSum).toFixed(1);
}

module.exports = { task1, task2 };
