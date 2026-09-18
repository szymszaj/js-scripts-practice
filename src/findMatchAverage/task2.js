import {
  getFirstLine,
  getHeaderInfo,
  validateSearchKeys,
  iterateRows,
  rowMatchesSearch,
} from "./csvHeaderCache.js";

function weightFor(value) {
  return value % 2 === 0 ? 20 : 10;
}

export function task2(searchList, data) {
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
    if (!query.found) continue; // spec doesn't define this case; unmatched entries are excluded rather than treated as -1
    const value = parseInt(query.value, 10);
    const weight = weightFor(value);
    weightedSum += value * weight;
    weightSum += weight;
  }

  if (weightSum === 0) return "0.0";

  return (weightedSum / weightSum).toFixed(1);
}
