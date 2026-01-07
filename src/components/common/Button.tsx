import React from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
};

export default function Button({ variant = "primary", style, ...props }: Props) {
  const base: React.CSSProperties = {
    padding: "8px 12px",
    borderRadius: 10,
    border: "1px solid rgba(255,255,255,0.15)",
    cursor: "pointer",
    fontWeight: 600,
  };

  const variants: Record<string, React.CSSProperties> = {
    primary: { background: "rgba(255,255,255,0.12)", color: "white" },
    ghost: { background: "transparent", color: "white" },
    danger: { background: "rgba(255,0,0,0.15)", color: "white" },
  };

  return <button {...props} style={{ ...base, ...variants[variant], ...style }} />;
}
