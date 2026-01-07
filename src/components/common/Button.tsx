// src/components/common/Button.tsx
import { button } from "../../styles";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "danger";
  small?: boolean;
};

export default function Button({ 
  variant = "primary", 
  small = false,
  style, 
  ...props 
}: Props) {
  const variantStyles = {
    primary: button.primary,
    ghost: button.ghost,
    danger: button.danger,
  };

  return (
    <button
      {...props}
      style={{
        ...button.base,
        ...(small ? button.small : {}),
        ...variantStyles[variant],
        ...style,
      }}
    />
  );
}
