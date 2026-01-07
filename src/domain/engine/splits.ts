import type { Money, SplitRule } from "../types";

export function calcSplit(total: Money, split: SplitRule) {
  const your = (total * (split.yourPercent / 100));
  const owner = (total * (split.ownerPercent / 100));
  return { your, owner };
}
