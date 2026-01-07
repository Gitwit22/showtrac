import { useEffect, useMemo, useState } from "react";
import type { Counterparty, LineItem, Project } from "../domain/types";
import { getTemplate } from "../domain/templates/templateRegistry";
import { uid } from "../utils/ids";
import { nowISO } from "../utils/dates";
import { toMoney } from "../utils/money";
import Select from "../components/common/Select";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import ProjectHeader from "../components/projects/ProjectHeader";
import LineItemTable from "../components/lineItems/LineItemTable";
import { sumAll, sumPaid, sumUnpaid, sumSplitPool } from "../domain/engine/totals";
import { calcSplit } from "../domain/engine/splits";
import { buildCsvRows, buildMarkdown } from "../domain/engine/eports";
import { downloadCsv } from "../services/export/exportCsv";
import { downloadMarkdown } from "../services/export/exportMarkdown";
import ArtistsTab from "../components/projects/ArtistTab";
import { layout, card, spacing, text, header, colors, radii, fontSizes, fontWeights } from "../styles";



type Props = {
  project: Project;
  onUpdate: (project: Project) => void;
  onBack: () => void;
};

export default function ProjectDetailPage({ project, onUpdate, onBack }: Props) {
  const t = getTemplate(project.templateId);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
const [activeTab, setActiveTab] = useState<"lineItems" | "artists">("lineItems");
const [artistQuery, setArtistQuery] = useState("");
const [artistFilter, setArtistFilter] = useState<"all" | "hasUnpaid" | "hasItems" | "noItems">("all");
const [selectedCpId, setSelectedCpId] = useState<string>("");
const [cpSearch, setCpSearch] = useState<string>("");

  const totals = useMemo(() => {
    const total = sumAll(project.lineItems);
    const paid = sumPaid(project.lineItems);
    const unpaid = sumUnpaid(project.lineItems);
    const splitPool = sumSplitPool(project.lineItems);
const split = calcSplit(splitPool, project.split);
    return { total, paid, unpaid, split };
  }, [project.lineItems, project.split]);

  // Ensure a 'venue' counterparty always exists for selection
  useEffect(() => {
    const hasVenue = project.counterparties.some((c) => c.id === "venue");
    if (!hasVenue) {
      patchProject({
        counterparties: [
          { id: "venue", name: project.venueName?.trim() || "Venue" },
          ...project.counterparties,
        ],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [project.id]);

  function patchProject(patch: Partial<Project>) {
    onUpdate({ ...project, ...patch, updatedAtISO: nowISO() });
  }

  function addCounterparty() {
    const name = newName.trim();
    if (!name) return;

    const cp: Counterparty = {
      id: uid("cp"),
      name,
      email: newEmail.trim() || undefined,
    };

    patchProject({
      counterparties: [cp, ...project.counterparties],
    });

    setNewName("");
    setNewEmail("");
  }

  function addLineItem(counterpartyId: string) {
    const li: LineItem = {
      id: uid("li"),
      counterpartyId,
      typeId: t.defaultLineItemTypeId,
      amount: 0,
      status: "unpaid",
      createdAtISO: nowISO(),
      description: "",
    };

    patchProject({
      lineItems: [li, ...project.lineItems],
    });
  }

  function updateLineItem(id: string, patch: Partial<LineItem>) {
    patchProject({
      lineItems: project.lineItems.map(li => (li.id === id ? { ...li, ...patch } : li)),
    });
  }

  function deleteLineItem(id: string) {
    patchProject({
      lineItems: project.lineItems.filter(li => li.id !== id),
    });
  }

  function exportMarkdown() {
    const md = buildMarkdown(project);
    const safeName = project.name.replace(/[^\w\-]+/g, "_").slice(0, 60) || "project";
    downloadMarkdown(`showtrac_${safeName}_${project.dateISO}.md`, md);
  }

  function exportCsv() {
    const { filename, rows } = buildCsvRows(project);
    downloadCsv(filename, rows);
  }

 





function markAllAsPaid() {
  if (project.lineItems.length === 0) return;

  const unpaidCount = project.lineItems.filter((li) => li.status !== "paid").length;
  if (unpaidCount === 0) return;

  const ok = window.confirm(`Mark ${unpaidCount} line item(s) as paid?`);
  if (!ok) return;

  patchProject({
    lineItems: project.lineItems.map((li) =>
      li.status === "paid" ? li : { ...li, status: "paid" }
    ),
  });
}





function removeArtistAndItems(counterpartyId: string) {
  const cp = project.counterparties.find((c) => c.id === counterpartyId);
  const name = cp?.name ?? "this artist";

  const count = project.lineItems.filter((li) => li.counterpartyId === counterpartyId).length;

  const ok = window.confirm(
    `Remove ${name}? This will also delete ${count} line item(s).`
  );
  if (!ok) return;

  patchProject({
    counterparties: project.counterparties.filter((c) => c.id !== counterpartyId),
    lineItems: project.lineItems.filter((li) => li.counterpartyId !== counterpartyId),
  });
}

  return (
  <div style={layout.page}>
    <div style={layout.gridTexture} />
    <div style={{ ...layout.containerWide }}>
      {/* Left-side background image overlay */}
      <div
        style={{
          position: "absolute",
          left: spacing.lg,
          top: spacing.xl,
          width: 420,
          height: 520,
          backgroundImage: "url('/background.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          opacity: 0.08,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content wrapper above background image */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: spacing.lg }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: spacing.md }}>
        <Button variant="ghost" onClick={onBack}>← Back</Button>
        <div style={{ display: "flex", gap: spacing.sm }}>
          <Button onClick={exportMarkdown}>Export Markdown</Button>
          <Button onClick={exportCsv}>Export CSV</Button>
        </div>
      </div>

      <div style={card.base}>
        <ProjectHeader project={project} />

       <div
  style={{
    marginTop: spacing.md,
    display: "grid",
    gridTemplateColumns: "2fr 1fr 1fr 1.5fr",
    gap: spacing.lg,
  }}
>
  {/* Project Name */}
  <div>
    <div style={text.fieldLabel}>{t.labels.projectName}</div>
    <Input
      value={project.name}
      onChange={(e: any) => patchProject({ name: e.target.value })}
    />
  </div>

  {/* Date */}
  <div>
    <div style={text.fieldLabel}>{t.labels.projectDate}</div>
    <Input
      type="date"
      value={project.dateISO}
      onChange={(e: any) => patchProject({ dateISO: e.target.value })}
    />
  </div>

  {/* Location */}
  <div>
    <div style={text.fieldLabel}>{t.labels.projectLocation}</div>
    <Input
      value={project.location ?? ""}
      onChange={(e: any) => patchProject({ location: e.target.value })}
    />
  </div>

  {/* Venue */}
  <div>
    <div style={text.fieldLabel}>Venue</div>
    <Input
      placeholder="Venue name"
      value={project.venueName ?? ""}
      onChange={(e: any) => {
        const venueName = e.target.value;

        patchProject({
          venueName,
          counterparties: project.counterparties.map((c) =>
            c.id === "venue" ? { ...c, name: venueName || "Venue" } : c
          ),
        });
      }}
    />
  </div>
</div>


            <div style={{ height: spacing.lg }} />

            <div style={{ display: "grid", gridTemplateColumns: "1fr 96px", gap: spacing.md, alignItems: "center" }}>
              <Input
                value={project.split.ownerName}
                onChange={(e) => patchProject({ split: { ...project.split, ownerName: e.target.value } })}
              />
              <Input
                inputMode="numeric"
                value={String(project.split.ownerPercent)}
                onChange={(e) => patchProject({ split: { ...project.split, ownerPercent: toMoney(e.target.value) } })}
              />
            </div>

            <div
              style={{
                marginTop: spacing.md,
                border: `1px solid ${colors.yellowBorder}`,
                background: colors.yellowMuted,
                borderRadius: radii.md,
                padding: spacing.md,
              }}
            >
              <div style={{ fontSize: fontSizes.lg, fontWeight: fontWeights.semibold }}>
                Total: ${totals.total.toFixed(2)} • Paid: ${totals.paid.toFixed(2)} • Outstanding: ${totals.unpaid.toFixed(2)}
              </div>
              <div style={{ marginTop: spacing.xs, opacity: 0.95 }}>
                {project.split.yourName}: ${totals.split.your.toFixed(2)} • {project.split.ownerName}: ${totals.split.owner.toFixed(2)}
              </div>
            </div>
          </div>

          <div style={card.base}>
            <div style={text.sectionLabel}>+ Add {t.labels.counterpartySingular}</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 140px", gap: spacing.sm }}>
              <Input placeholder="Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
              <Input placeholder="Email (optional)" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
              <Button onClick={addCounterparty}>Add</Button>
            </div>

            <div style={{ marginTop: spacing.sm, opacity: 0.8, fontSize: 12 }}>
              Tip: You can add multiple line items per artist (deposit + fee + clip pack, etc.)
            </div>
          </div>

      

<div style={card.base}>
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: spacing.md }}>
    <div style={{ display: "flex", alignItems: "center", gap: spacing.sm }}>
      <div style={header.accentBarSmall} />
      <div style={header.titleMd}>Manage</div>
    </div>

    <div style={{ display: "flex", gap: spacing.sm, alignItems: "center" }}>
      <Button
        variant={activeTab === "lineItems" ? "primary" : "ghost"}
        onClick={() => setActiveTab("lineItems")}
      >
        Line Items
      </Button>

      <Button
        variant={activeTab === "artists" ? "primary" : "ghost"}
        onClick={() => setActiveTab("artists")}
      >
        Artists
      </Button>
    </div>
  </div>

  {activeTab === "lineItems" ? (
    <div style={{ marginTop: spacing.md }}>
      {/* Quick controls */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: spacing.md, alignItems: "center" }}>
        <div style={{ minWidth: 240 }}>
          <Input
            placeholder="Search artist/venue..."
            value={cpSearch}
            onChange={(e: any) => setCpSearch(e.target.value)}
          />
        </div>

        <div style={{ minWidth: 260 }}>
          <Select value={selectedCpId} onChange={(e: any) => setSelectedCpId(e.target.value)}>
            <option value="">Select counterparty</option>

            {project.counterparties
              .slice()
              .sort((a, b) => {
                const aIsVenue = a.id === "venue" || a.name.trim().toLowerCase() === "venue";
                const bIsVenue = b.id === "venue" || b.name.trim().toLowerCase() === "venue";
                if (aIsVenue && !bIsVenue) return -1;
                if (!aIsVenue && bIsVenue) return 1;
                return a.name.localeCompare(b.name);
              })
              .filter((cp) => {
                const q = cpSearch.trim().toLowerCase();
                if (!q) return true;
                return cp.name.toLowerCase().includes(q) || (cp.email ?? "").toLowerCase().includes(q);
              })
              .map((cp) => (
                <option key={cp.id} value={cp.id}>
                  {cp.name}
                </option>
              ))}
          </Select>
        </div>

        <Button variant="ghost" disabled={!selectedCpId} onClick={() => addLineItem(selectedCpId)}>
          + Add Item
        </Button>

        <Button
          variant="ghost"
          onClick={markAllAsPaid}
          disabled={project.lineItems.length === 0 || project.lineItems.every((li) => li.status === "paid")}
        >
          Mark All Received
        </Button>
      </div>

      {/* Table */}
      <div style={{ marginTop: spacing.md }}>
        {project.lineItems.length === 0 ? (
          <div style={text.muted}>No line items yet. Add one above.</div>
        ) : (
          <LineItemTable
            counterparties={project.counterparties}
            lineItems={project.lineItems}
            typeOptions={t.lineItemTypes}
            onUpdateLineItem={updateLineItem}
            onDeleteLineItem={deleteLineItem}
          />
        )}
      </div>
    </div>
  ) : (
    <div style={{ marginTop: spacing.md }}>
      <ArtistsTab
        project={project}
        query={artistQuery}
        setQuery={setArtistQuery}
        filter={artistFilter}
        setFilter={setArtistFilter}
        onUpdateProject={patchProject}
        onAddLineItem={addLineItem}
        onRemoveArtist={removeArtistAndItems}
      />
    </div>
  )}
</div>
    </div>
  </div>
  </div>
  );
}