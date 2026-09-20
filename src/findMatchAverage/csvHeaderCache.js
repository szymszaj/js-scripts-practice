const HEADER_CACHE_LIMIT = 32;
const headerCache = new Map();

export function getFirstLine(data) {
  const idx = data.indexOf("\n");
  let line = idx === -1 ? data : data.slice(0, idx);
  if (line.endsWith("\r")) line = line.slice(0, -1);
  return { line, bodyStart: idx === -1 ? data.length : idx + 1 };
}

export function getHeaderInfo(headerLine) {
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

export function validateSearchKeys(search, keyColumns) {
  const searchKeys = Object.keys(search);
  if (searchKeys.length !== keyColumns.length) throw new Error("Key mismatch");
  const keyColumnSet = new Set(keyColumns);
  for (const key of searchKeys) {
    if (!keyColumnSet.has(key)) throw new Error("Key mismatch");
  }
}

export function* iterateRows(data, bodyStart) {
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

export function rowMatchesSearch(fields, columns, valueIndex, search) {
  for (let i = 0; i < columns.length; i++) {
    if (i === valueIndex) continue;
    if (fields[i] !== String(search[columns[i]])) return false;
  }
  return true;
}
