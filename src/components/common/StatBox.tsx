// src/components/common/StatBox.tsx
import { statBox, colors } from "../../styles";

type Props = {
  label: string;
  value: string | number;
  sublabel?: string;
  variant?: "default" | "success" | "warning";
  style?: React.CSSProperties;
};

export default function StatBox({ 
  label, 
  value, 
  sublabel,
  variant = "default",
  style,
}: Props) {
  const borderColors = {
    default: colors.yellow,
    success: colors.success,
    warning: colors.yellow,
  };

  const valueColors = {
    default: colors.white,
    success: colors.success,
    warning: colors.yellow,
  };

  return (
    <div
      style={{
        ...statBox.base,
        borderTopColor: borderColors[variant],
        ...style,
      }}
    >
      <div style={statBox.label}>{label}</div>
      <div style={{ ...statBox.value, color: valueColors[variant] }}>{value}</div>
      {sublabel && <div style={statBox.sublabel}>{sublabel}</div>}
    </div>
  );
}
