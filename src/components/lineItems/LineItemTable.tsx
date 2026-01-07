import type { Counterparty, LineItem } from "../../domain/types";
import LineItemRow from "./LineItemRow";

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
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
            <th style={{ padding: 8 }}>Artist</th>
            <th style={{ padding: 8 }}>Type</th>
            <th style={{ padding: 8 }}>Amount</th>
            <th style={{ padding: 8 }}>Status</th>
            <th style={{ padding: 8 }}>Notes</th>
            <th style={{ padding: 8 }} />
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
