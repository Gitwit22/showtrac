import { csvEscapeCell, downloadText } from "./exportUtils";

export function downloadCsv(filename: string, rows: string[][]) {
  const csv = rows
    .map(row => row.map(cell => csvEscapeCell(String(cell ?? ""))).join(","))
    .join("\n");
  downloadText(filename, csv, "text/csv");
}
