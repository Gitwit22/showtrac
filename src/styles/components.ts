import type { CSSProperties } from "react";
import { colors, spacing, radii } from "./theme";
import { fonts, fontSizes, fontWeights } from "./typography";

export const layout = {
  page: {
    minHeight: "100vh",
    padding: spacing.xl,
    background: colors.black,
    color: colors.white,
    fontFamily: fonts.body,
  } as CSSProperties,

  container: {
    maxWidth: 1100,
    margin: "0 auto",
    position: "relative" as const,
  } as CSSProperties,

  containerWide: {
    maxWidth: 1200,
    margin: "0 auto",
    position: "relative" as const,
  } as CSSProperties,

  gridTexture: {
    position: "fixed" as const,
    inset: 0,
    backgroundImage: `
      linear-gradient(${colors.borderGray}22 1px, transparent 1px),
      linear-gradient(90deg, ${colors.borderGray}22 1px, transparent 1px)
    `,
    backgroundSize: "40px 40px",
    pointerEvents: "none" as const,
    zIndex: 0,
  } as CSSProperties,
};

export const card = {
  base: {
    background: colors.darkGray,
    borderRadius: radii.lg,
    border: `1px solid ${colors.borderGray}`,
    padding: spacing.xxl,
  } as CSSProperties,

  accent: {
    background: colors.darkGray,
    borderRadius: radii.lg,
    border: `1px solid ${colors.borderGray}`,
    borderLeft: `3px solid ${colors.yellow}`,
    padding: spacing.xl,
    transition: "all 0.15s ease",
    cursor: "pointer",
  } as CSSProperties,

  accentHover: {
    borderColor: colors.yellow,
    background: colors.midGray,
  } as CSSProperties,
};

export const input = {
  base: {
    width: "100%",
    padding: "12px 14px",
    background: colors.midGray,
    border: `1px solid ${colors.borderGray}`,
    borderRadius: radii.sm,
    color: colors.white,
    fontSize: fontSizes.md,
    fontFamily: fonts.body,
    outline: "none",
    transition: "border-color 0.15s",
    boxSizing: "border-box",
  } as CSSProperties,

  small: {
    padding: "8px 12px",
    fontSize: fontSizes.sm,
  } as CSSProperties,

  mono: {
    fontFamily: fonts.mono,
  } as CSSProperties,

  focus: {
    borderColor: colors.yellow,
  } as CSSProperties,
};

export const select = {
  base: {
    width: "100%",
    padding: "12px 14px",
    background: colors.midGray,
    border: `1px solid ${colors.borderGray}`,
    borderRadius: radii.sm,
    color: colors.white,
    fontSize: fontSizes.md,
    fontFamily: fonts.body,
    outline: "none",
    cursor: "pointer",
    boxSizing: "border-box",
    appearance: "none" as const,
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23666' d='M6 8L1 3h10z'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 12px center",
  } as CSSProperties,

  small: {
    padding: "8px 12px",
    fontSize: fontSizes.sm,
  } as CSSProperties,
};

export const button = {
  base: {
    padding: "10px 18px",
    borderRadius: radii.sm,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    fontFamily: fonts.body,
    cursor: "pointer",
    transition: "all 0.15s",
    border: "none",
    display: "inline-flex",
    alignItems: "center",
    gap: spacing.sm,
  } as CSSProperties,

  small: {
    padding: "6px 12px",
    fontSize: fontSizes.xs,
  } as CSSProperties,

  primary: {
    background: colors.yellow,
    color: colors.black,
  } as CSSProperties,

  ghost: {
    background: "transparent",
    border: `1px solid ${colors.borderGray}`,
    color: colors.white,
  } as CSSProperties,

  ghostHover: {
    borderColor: colors.yellow,
    color: colors.yellow,
  } as CSSProperties,

  danger: {
    background: colors.dangerMuted,
    color: colors.danger,
  } as CSSProperties,

  dangerHover: {
    background: colors.danger,
    color: colors.white,
  } as CSSProperties,
};

export const badge = {
  base: {
    padding: "4px 10px",
    borderRadius: radii.sm,
    fontSize: fontSizes.xs,
    fontWeight: fontWeights.semibold,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
    display: "inline-block",
  } as CSSProperties,

  success: {
    background: colors.successMuted,
    color: colors.success,
  } as CSSProperties,

  warning: {
    background: colors.yellowMuted,
    color: colors.yellow,
  } as CSSProperties,

  danger: {
    background: colors.dangerMuted,
    color: colors.danger,
  } as CSSProperties,
};

export const statBox = {
  base: {
    border: `1px solid ${colors.borderGray}`,
    background: colors.darkGray,
    borderRadius: radii.md,
    padding: spacing.lg,
  } as CSSProperties,
  label: {
    color: colors.textMuted,
    fontSize: fontSizes.xs,
    marginBottom: spacing.xs,
  } as CSSProperties,
  value: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.bold,
  } as CSSProperties,
  sublabel: {
    color: colors.textDim,
    fontSize: fontSizes.sm,
    marginTop: spacing.xs,
  } as CSSProperties,
};

export const tabs = {
  container: {
    display: "inline-flex",
    gap: spacing.sm,
    background: colors.darkGray,
    border: `1px solid ${colors.borderGray}`,
    padding: spacing.xs,
    borderRadius: radii.md,
  } as CSSProperties,
  tab: {
    padding: "8px 12px",
    color: colors.white,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    borderRadius: radii.sm,
  } as CSSProperties,
  tabActive: {
    background: colors.midGray,
    border: `1px solid ${colors.borderGray}`,
  } as CSSProperties,
};

export const header = {
  accentBar: {
    width: 4,
    height: 24,
    background: colors.yellow,
    borderRadius: radii.sm,
  } as CSSProperties,
  accentBarSmall: {
    width: 3,
    height: 18,
    background: colors.yellow,
    borderRadius: radii.sm,
  } as CSSProperties,
  title: {
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.black,
  } as CSSProperties,
  titleMd: {
    fontSize: fontSizes.lg,
    fontWeight: fontWeights.black,
  } as CSSProperties,
  subtitle: {
    color: colors.textMuted,
  } as CSSProperties,
};

export const text = {
  sectionLabel: {
    color: colors.textMuted,
    fontSize: fontSizes.sm,
    marginBottom: spacing.sm,
  } as CSSProperties,
  sectionLabelMuted: {
    color: colors.textDim,
    fontSize: fontSizes.sm,
    marginBottom: spacing.sm,
  } as CSSProperties,
  muted: {
    color: colors.textMuted,
    fontSize: fontSizes.sm,
  } as CSSProperties,
  yellow: {
    color: colors.yellow,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
  } as CSSProperties,
  fieldLabel: {
    color: colors.textMuted,
    fontSize: fontSizes.xs,
    marginBottom: spacing.xs,
  } as CSSProperties,
};

export const misc = {
  footerNote: {
    color: colors.textDim,
    fontSize: fontSizes.sm,
  } as CSSProperties,
  dot: {
    color: colors.textDim,
  } as CSSProperties,
  splitRow: {
    display: "grid",
    gridTemplateColumns: "1fr 80px 24px 1fr 80px",
    alignItems: "center",
    gap: spacing.sm,
  } as CSSProperties,
  splitDivider: {
    color: colors.textDim,
    textAlign: "center" as const,
  } as CSSProperties,
};

// Optional table styles placeholder for future use
export const table = {
  container: {
    width: "100%",
  } as CSSProperties,
};
