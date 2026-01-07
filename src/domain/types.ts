export type ID = string;
export type Money = number;

export type TemplateId = "videoShoots" | "performanceFees";

export type PaymentStatus = "unpaid" | "paid";

export type SplitBehavior = "split" | "noSplit";




export interface SplitRule {
  yourName: string;
  yourPercent: number; // 0-100
  ownerName: string;
  ownerPercent: number; // 0-100
}

export interface Counterparty {
  id: ID;
  name: string;
  email?: string;
}

export interface LineItem {
  id: ID;
  counterpartyId: ID;
  typeId: string; // template-defined
  description?: string;
  amount: Money;
  status: PaymentStatus;
  createdAtISO: string;
splitBehavior?: SplitBehavior; // default "split"

  // Template-specific extras (kept generic)
  metadata?: Record<string, unknown>;
}

export interface Project {
  id: ID;
  templateId: TemplateId;
  name: string;
  dateISO: string; // YYYY-MM-DD
  location?: string;
 venueName?: string;
  venueContactName?: string;
  venueEmail?: string;
  venuePhone?: string;
  split: SplitRule;

  counterparties: Counterparty[];
  lineItems: LineItem[];

  createdAtISO: string;
  updatedAtISO: string;
}

export interface AppState {
  projects: Project[];
}
