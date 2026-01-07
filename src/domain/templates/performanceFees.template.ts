import type { TemplateConfig } from "./templateTypes";

export const performanceFeesTemplate: TemplateConfig = {
  id: "performanceFees",
  name: "Performance Fees",
  labels: {
    projectName: "Show / Event Name",
    projectDate: "Show Date",
    projectLocation: "Venue / Location",
    counterpartySingular: "Artist",
    counterpartyPlural: "Artists",
    amountLabel: "Fee Amount",
    splitTitle: "Split",
    
  },
  lineItemTypes: [
    { id: "performanceFee", label: "Performance Fee" },
    { id: "deposit", label: "Deposit" },
    { id: "bonus", label: "Bonus" },
    { id: "travel", label: "Travel" },
    { id: "other", label: "Other" },
    { id: "venueCharge", label: "Venue Charge" },

  ],
  defaultLineItemTypeId: "performanceFee",
};
