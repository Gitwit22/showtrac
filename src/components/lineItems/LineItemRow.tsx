import React from "react";
import type { Counterparty, LineItem, PaymentStatus } from "../../domain/types";
import Select from "../common/Select";
import Input from "../common/Input";
import Button from "../common/Button";
import { toMoney } from "../../utils/money";

type Props = {
  counterparty: Counterparty;
  lineItem: LineItem;
  typeOptions: { id: string; label: string }[];
  onChange: (patch: Partial<LineItem>) => void;
  onDelete: () => void;
};

export default function LineItemRow({ counterparty, lineItem, typeOptions, onChange, onDelete }: Props) {
  const status: PaymentStatus = lineItem.status;

  return (
    <tr>
      <td style={{ padding: 8 }}>{counterparty.name}</td>
      <td style={{ padding: 8, width: 180 }}>
        <Select
          value={lineItem.typeId}
onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
  onChange({ typeId: e.target.value })
}
        >
          {typeOptions.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </Select>
      </td>
      <td style={{ padding: 8, width: 140 }}>
        <Input
          inputMode="decimal"
          value={String(lineItem.amount)}
          onChange={(e) => onChange({ amount: toMoney(e.target.value) })}
        />
      </td>
      <td style={{ padding: 8, width: 140 }}>
        <Select
          value={status}
          onChange={(e) => onChange({ status: e.target.value as PaymentStatus })}
        >
          <option value="unpaid">unpaid</option>
          <option value="paid">paid</option>
        </Select>
      </td>

<td style={{ padding: 8, width: 140 }}>
  <Select
    value={lineItem.splitBehavior ?? "split"}
    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
      onChange({ splitBehavior: e.target.value as any })
    }
  >
    <option value="split">Split</option>
    <option value="noSplit">No split</option>
  </Select>
</td>


      <td style={{ padding: 8 }}>
        <Input
          placeholder="Notes (optional)"
          value={lineItem.description ?? ""}
          onChange={(e) => onChange({ description: e.target.value })}
        />
      </td>
      <td style={{ padding: 8, width: 90 }}>
        <Button variant="danger" onClick={onDelete}>Delete</Button>
      </td>
    </tr>
  );
}
