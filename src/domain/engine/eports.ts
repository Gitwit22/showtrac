import type { Project } from "../types";
import { getTemplate } from "../templates/templateRegistry";
import { sumAll, sumPaid, sumUnpaid } from "./totals";
import { calcSplit } from "./splits";

export function buildMarkdown(project: Project): string {
  const t = getTemplate(project.templateId);
  const total = sumAll(project.lineItems);
  const paid = sumPaid(project.lineItems);
  const unpaid = sumUnpaid(project.lineItems);
  const split = calcSplit(total, project.split);

  const counterpartyById = new Map(project.counterparties.map(c => [c.id, c]));

  const lines: string[] = [];
  lines.push(`# ${t.name} — ${project.name}`);
  lines.push(`- ${t.labels.projectDate}: ${project.dateISO}`);
  if (project.location) lines.push(`- ${t.labels.projectLocation}: ${project.location}`);
  lines.push("");
  lines.push(`## Totals`);
  lines.push(`- Total: $${total.toFixed(2)}`);
  lines.push(`- Paid: $${paid.toFixed(2)}`);
  lines.push(`- Unpaid: $${unpaid.toFixed(2)}`);
  lines.push("");
  lines.push(`## ${t.labels.splitTitle}`);
  lines.push(`- ${project.split.yourName} (${project.split.yourPercent}%): $${split.your.toFixed(2)}`);
  lines.push(`- ${project.split.ownerName} (${project.split.ownerPercent}%): $${split.owner.toFixed(2)}`);
  lines.push("");
  lines.push(`## Line Items`);
  lines.push(`| ${t.labels.counterpartySingular} | Type | Amount | Status | Notes |`);
  lines.push(`|---|---|---:|---|---|`);

  for (const li of project.lineItems) {
    const cp = counterpartyById.get(li.counterpartyId);
    const name = cp?.name ?? "Unknown";
    const typeLabel = getTemplate(project.templateId).lineItemTypes.find(x => x.id === li.typeId)?.label ?? li.typeId;
    const notes = (li.description ?? "").replace(/\|/g, "\\|");
    lines.push(`| ${name} | ${typeLabel} | $${li.amount.toFixed(2)} | ${li.status} | ${notes} |`);
  }

  return lines.join("\n");
}

export function buildCsvRows(project: Project): { filename: string; rows: string[][] } {
  const t = getTemplate(project.templateId);
  const counterpartyById = new Map(project.counterparties.map(c => [c.id, c]));

  const header = [
    "Project",
    "Template",
    "Date",
    "Location",
    t.labels.counterpartySingular,
    "Email",
    "Type",
    "Amount",
    "Status",
    "Notes",
    "CreatedAt",
  ];

  const rows: string[][] = [header];

  for (const li of project.lineItems) {
    const cp = counterpartyById.get(li.counterpartyId);
    const typeLabel = t.lineItemTypes.find(x => x.id === li.typeId)?.label ?? li.typeId;

    rows.push([
      project.name,
      t.name,
      project.dateISO,
      project.location ?? "",
      cp?.name ?? "",
      cp?.email ?? "",
      typeLabel,
      li.amount.toFixed(2),
      li.status,
      li.description ?? "",
      li.createdAtISO,
    ]);
  }

  const safeName = project.name.replace(/[^\w\-]+/g, "_").slice(0, 60) || "project";
  const filename = `showtrac_${safeName}_${project.dateISO}.csv`;
  return { filename, rows };
}
