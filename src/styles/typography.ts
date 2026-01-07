// src/styles/typography.ts
// Typography tokens for ShowTrac

export const fonts = {
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', 'Fira Code', 'Consolas', monospace",
} as const;

export const fontSizes = {
  xs: 11,
  sm: 13,
  md: 14,
  lg: 16,
  xl: 20,
  xxl: 28,
} as const;

export const fontWeights = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  black: 800,
} as const;

export const lineHeights = {
  tight: 1.2,
  normal: 1.5,
  relaxed: 1.6,
} as const;
