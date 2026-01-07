import { downloadText } from "./exportUtils";

export function downloadMarkdown(filename: string, md: string) {
  downloadText(filename, md, "text/markdown");
}
