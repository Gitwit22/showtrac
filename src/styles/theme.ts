// src/styles/theme.ts
// Core design tokens for ShowTrac

export const colors = {
  // Core backgrounds
  black: "#0a0a0a",
  darkGray: "#141414",
  midGray: "#1e1e1e",
  lightGray: "#2a2a2a",
  borderGray: "#333333",

  // Text
  white: "#ffffff",
  textMuted: "rgba(255,255,255,0.6)",
  textDim: "rgba(255,255,255,0.4)",

  // Accent
  yellow: "#FFD60A",
  yellowMuted: "rgba(255,214,10,0.15)",
  yellowBorder: "rgba(255,214,10,0.4)",

  // Status
  success: "#22c55e",
  successMuted: "rgba(34,197,94,0.15)",
  danger: "#ef4444",
  dangerMuted: "rgba(239,68,68,0.15)",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
} as const;

export const radii = {
  sm: 6,
  md: 10,
  lg: 14,
} as const;

export const shadows = {
  sm: "0 1px 2px rgba(0,0,0,0.3)",
  md: "0 2px 8px rgba(0,0,0,0.4)",
  lg: "0 4px 16px rgba(0,0,0,0.5)",
} as const;
