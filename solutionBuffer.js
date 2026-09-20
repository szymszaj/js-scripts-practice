"use strict";

const COMMA = 44;
const NEWLINE = 10;
const CR = 13;

const HEADER_CACHE_LIMIT = 32;
const headerCache = new Map();

function toBuffer(data) {
  return Buffer.isBuffer(data) ? data : Buffer.from(data, "latin1");
}

function getFirstLine(buf) {
  const idx = buf.indexOf(NEWLINE);
  let end = idx === -1 ? buf.length : idx;
  if (end > 0 && buf[end - 1] === CR) end -= 1;
  return { line: buf.subarray(0, end), bodyStart: idx === -1 ? buf.length : idx + 1 };
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

function buildSearchStrs(search, columns, valueIndex) {
  const strs = new Array(columns.length);
  for (let i = 0; i < columns.length; i++) {
    if (i === valueIndex) continue;
    strs[i] = String(search[columns[i]]);
  }
  return strs;
}

function* iterateRows(buf, bodyStart) {
  const len = buf.length;
  let start = bodyStart;
  while (start < len) {
    let end = buf.indexOf(NEWLINE, start);
    if (end === -1) end = len;
    let rowEnd = end;
    if (rowEnd > start && buf[rowEnd - 1] === CR) rowEnd -= 1;
    if (rowEnd > start) yield buf.subarray(start, rowEnd);
    start = end + 1;
  }
}

function splitFields(rowBuf) {
  const fields = [];
  let fieldStart = 0;
  for (let i = 0; i < rowBuf.length; i++) {
    if (rowBuf[i] === COMMA) {
      fields.push(rowBuf.subarray(fieldStart, i));
      fieldStart = i + 1;
    }
  }
  fields.push(rowBuf.subarray(fieldStart, rowBuf.length));
  return fields;
}

function fieldEqualsStr(fieldBuf, str) {
  if (fieldBuf.length !== str.length) return false;
  for (let i = 0; i < str.length; i++) {
    if (fieldBuf[i] !== str.charCodeAt(i)) return false;
  }
  return true;
}

function rowMatchesSearch(fields, columns, valueIndex, searchStrs) {
  for (let i = 0; i < columns.length; i++) {
    if (i === valueIndex) continue;
    if (!fieldEqualsStr(fields[i], searchStrs[i])) return false;
  }
  return true;
}

function task1(search, data) {
  const buf = toBuffer(data);
  const { line: headerBuf, bodyStart } = getFirstLine(buf);
  const { columns, valueIndex, keyColumns } = getHeaderInfo(headerBuf.toString("latin1"));

  validateSearchKeys(search, keyColumns);
  const searchStrs = buildSearchStrs(search, columns, valueIndex);

  for (const rowBuf of iterateRows(buf, bodyStart)) {
    const fields = splitFields(rowBuf);
    if (rowMatchesSearch(fields, columns, valueIndex, searchStrs)) {
      return fields[valueIndex].toString("latin1");
    }
  }

  return "-1";
}

function weightFor(value) {
  return value % 2 === 0 ? 20 : 10;
}

function task2(searchList, data) {
  const buf = toBuffer(data);
  const { line: headerBuf, bodyStart } = getFirstLine(buf);
  const { columns, valueIndex, keyColumns } = getHeaderInfo(headerBuf.toString("latin1"));

  const queries = searchList.map((search) => {
    validateSearchKeys(search, keyColumns);
    return {
      searchStrs: buildSearchStrs(search, columns, valueIndex),
      found: false,
      value: null,
    };
  });

  let remaining = queries.length;
  if (remaining > 0) {
    for (const rowBuf of iterateRows(buf, bodyStart)) {
      const fields = splitFields(rowBuf);
      for (const query of queries) {
        if (query.found) continue;
        if (rowMatchesSearch(fields, columns, valueIndex, query.searchStrs)) {
          query.found = true;
          query.value = fields[valueIndex].toString("latin1");
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
