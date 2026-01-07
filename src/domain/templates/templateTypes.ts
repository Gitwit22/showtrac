import type { TemplateId } from "../types";

export interface TemplateLineItemType {
  id: string;
  label: string;
}

export interface TemplateLabels {
  projectName: string;
  projectDate: string;
  projectLocation: string;

  counterpartySingular: string; // "Artist"
  counterpartyPlural: string;   // "Artists"

  amountLabel: string;          // "Amount"
  splitTitle: string;           // "Split"
}

export interface TemplateConfig {
  id: TemplateId;
  name: string;
  labels: TemplateLabels;
  lineItemTypes: TemplateLineItemType[];
  defaultLineItemTypeId: string;
}
