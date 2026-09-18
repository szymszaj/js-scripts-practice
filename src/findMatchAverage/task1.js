import {
  getFirstLine,
  getHeaderInfo,
  validateSearchKeys,
  iterateRows,
  rowMatchesSearch,
} from "./csvHeaderCache.js";

export function task1(search, data) {
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
