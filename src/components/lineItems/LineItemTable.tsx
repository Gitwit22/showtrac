import type { Counterparty, LineItem } from "../../domain/types";
import LineItemRow from "./LineItemRow";
import { colors, spacing, table } from "../../styles";

type Props = {
  counterparties: Counterparty[];
  lineItems: LineItem[];
  typeOptions: { id: string; label: string }[];
  onUpdateLineItem: (id: string, patch: Partial<LineItem>) => void;
  onDeleteLineItem: (id: string) => void;
};

export default function LineItemTable({
  counterparties,
  lineItems,
  typeOptions,
  onUpdateLineItem,
  onDeleteLineItem,
}: Props) {
  const cpById = new Map(counterparties.map(c => [c.id, c]));

  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ ...table.container, borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: `1px solid ${colors.borderGray}` }}>
            <th style={{ padding: spacing.md }}>Artist</th>
            <th style={{ padding: spacing.md }}>Type</th>
            <th style={{ padding: spacing.md }}>Amount</th>
            <th style={{ padding: spacing.md }}>Status</th>
            <th style={{ padding: spacing.md }}>Split</th>
            <th style={{ padding: spacing.md }}>Notes</th>
            <th style={{ padding: spacing.md }} />
          </tr>
        </thead>
        <tbody>
          {lineItems.map(li => {
            const cp = cpById.get(li.counterpartyId);
            if (!cp) return null;
            return (
              <LineItemRow
                key={li.id}
                counterparty={cp}
                lineItem={li}
                typeOptions={typeOptions}
                onChange={(patch) => onUpdateLineItem(li.id, patch)}
                onDelete={() => onDeleteLineItem(li.id)}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
