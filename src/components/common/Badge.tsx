// src/components/common/Badge.tsx
import { badge } from "../../styles";

type Props = {
  variant?: "success" | "warning" | "danger";
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export default function Badge({ 
  variant = "warning", 
  children,
  style,
}: Props) {
  const variantStyles = {
    success: badge.success,
    warning: badge.warning,
    danger: badge.danger,
  };

  return (
    <span
      style={{
        ...badge.base,
        ...variantStyles[variant],
        ...style,
      }}
    >
      {children}
    </span>
  );
}
