export function downloadText(filename: string, content: string, mime = "text/plain") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function csvEscapeCell(s: string): string {
  const needs = /[",\n]/.test(s);
  const safe = s.replace(/"/g, '""');
  return needs ? `"${safe}"` : safe;
}
