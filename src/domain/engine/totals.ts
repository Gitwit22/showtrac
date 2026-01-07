import type { LineItem, Money } from "../types";

export function sumAll(items: LineItem[]): Money {
  return items.reduce((acc, x) => acc + (Number.isFinite(x.amount) ? x.amount : 0), 0);
}

export function sumPaid(items: LineItem[]): Money {
  return items.reduce((acc, x) => acc + (x.status === "paid" ? x.amount : 0), 0);
}

export function sumUnpaid(items: LineItem[]): Money {
  return items.reduce((acc, x) => acc + (x.status !== "paid" ? x.amount : 0), 0);
}

export function sumSplitPool(items: LineItem[]): Money {
  return items.reduce((acc, x) => {
    const behavior = x.splitBehavior ?? "split";
    if (behavior !== "split") return acc;
    return acc + (Number.isFinite(x.amount) ? x.amount : 0);
  }, 0);
}
