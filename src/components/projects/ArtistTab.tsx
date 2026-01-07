import type { Project, Counterparty, LineItem } from "../../domain/types";
import Input from "../common/Input";
import Select from "../common/Select";
import Button from "../common/Button";
import { colors, spacing, text, table } from "../../styles";

type Filter = "all" | "hasUnpaid" | "hasItems" | "noItems";

type Props = {
  project: Project;
  query: string;
  setQuery: (v: string) => void;
  filter: Filter;
  setFilter: (v: Filter) => void;

  onUpdateProject: (patch: Partial<Project>) => void;
  onAddLineItem: (counterpartyId: string) => void;
  onRemoveArtist: (counterpartyId: string) => void;
};

function money(n: number) {
  return `$${n.toFixed(2)}`;
}

export default function ArtistsTab({
  project,
  query,
  setQuery,
  filter,
  setFilter,
  onUpdateProject,
  onAddLineItem,
  onRemoveArtist,
}: Props) {
  const q = query.trim().toLowerCase();

  const itemsByCp = new Map<string, LineItem[]>();
  for (const li of project.lineItems) {
    const arr = itemsByCp.get(li.counterpartyId) ?? [];
    arr.push(li);
    itemsByCp.set(li.counterpartyId, arr);
  }

  const rows = project.counterparties
    .map((cp) => {
      const items = itemsByCp.get(cp.id) ?? [];
      const unpaid = items
        .filter((x) => x.status !== "paid")
        .reduce((acc, x) => acc + x.amount, 0);

      return { cp, itemsCount: items.length, unpaid };
    })
    .filter(({ cp, itemsCount, unpaid }) => {
      const matchesQuery =
        !q ||
        cp.name.toLowerCase().includes(q) ||
        (cp.email ?? "").toLowerCase().includes(q);

      if (!matchesQuery) return false;

      if (filter === "hasUnpaid") return unpaid > 0;
      if (filter === "hasItems") return itemsCount > 0;
      if (filter === "noItems") return itemsCount === 0;
      return true;
    });

  function patchCounterparty(id: string, patch: Partial<Counterparty>) {
    onUpdateProject({
      counterparties: project.counterparties.map((c) =>
        c.id === id ? { ...c, ...patch } : c
      ),
    });
  }

  return (
    <div style={{ marginTop: spacing.md, display: "flex", flexDirection: "column", gap: spacing.lg }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: spacing.md }}>
        <Input
          placeholder="Search artists (name/email)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Select value={filter} onChange={(e) => setFilter(e.target.value as Filter)}>
          <option value="all">All</option>
          <option value="hasUnpaid">Has unpaid</option>
          <option value="hasItems">Has items</option>
          <option value="noItems">No items</option>
        </Select>
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ ...table.container, borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: `1px solid ${colors.borderGray}` }}>
              <th style={{ padding: spacing.md }}>Name</th>
              <th style={{ padding: spacing.md }}>Email</th>
              <th style={{ padding: spacing.md }}>Items</th>
              <th style={{ padding: spacing.md }}>Unpaid</th>
              <th style={{ padding: spacing.md }} />
            </tr>
          </thead>
          <tbody>
            {rows.map(({ cp, itemsCount, unpaid }) => (
              <tr key={cp.id}>
                <td style={{ padding: spacing.md, width: 240 }}>
                  <Input
                    value={cp.name}
                    onChange={(e) => patchCounterparty(cp.id, { name: e.target.value })}
                  />
                </td>
                <td style={{ padding: spacing.md, width: 280 }}>
                  <Input
                    placeholder="Email (optional)"
                    value={cp.email ?? ""}
                    onChange={(e) =>
                      patchCounterparty(cp.id, { email: e.target.value || undefined })
                    }
                  />
                </td>
                <td style={{ padding: spacing.md, width: 90 }}>{itemsCount}</td>
                <td style={{ padding: spacing.md, width: 120 }}>{money(unpaid)}</td>
                <td style={{ padding: spacing.md, width: 260 }}>
                  <div style={{ display: "flex", gap: spacing.md }}>
                    <Button variant="ghost" onClick={() => onAddLineItem(cp.id)}>
                      Add item
                    </Button>
                    <Button variant="danger" onClick={() => onRemoveArtist(cp.id)}>
                      Remove
                    </Button>
                  </div>
                </td>
              </tr>
            ))}

            {rows.length === 0 ? (
              <tr>
                <td style={{ padding: spacing.md, ...text.muted }} colSpan={5}>
                  No artists match your filters.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}