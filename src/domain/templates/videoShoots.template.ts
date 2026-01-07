import type { TemplateConfig } from "./templateTypes";

export const videoShootsTemplate: TemplateConfig = {
  id: "videoShoots",
  name: "Video Shoots",
  labels: {
    projectName: "Shoot / Event Name",
    projectDate: "Shoot Date",
    projectLocation: "Location",
    counterpartySingular: "Artist",
    counterpartyPlural: "Artists",
    amountLabel: "Payment Amount",
    splitTitle: "Split",
  },
  lineItemTypes: [
    { id: "shootFee", label: "Shoot Fee" },
    { id: "deposit", label: "Deposit" },
    { id: "clipPack", label: "Clip Pack" },
    { id: "rush", label: "Rush Delivery" },
    { id: "travel", label: "Travel" },
    { id: "other", label: "Other" },
    { id: "venueCharge", label: "Venue Charge" },

  ],
  defaultLineItemTypeId: "shootFee",
};
