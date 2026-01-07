// src/components/common/Input.tsx
import { useState } from "react";
import { input } from "../../styles";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  small?: boolean;
  mono?: boolean;
};

export default function Input({ 
  small = false, 
  mono = false,
  style, 
  ...props 
}: Props) {
  const [focused, setFocused] = useState(false);

  return (
    <input
      {...props}
      onFocus={(e) => {
        setFocused(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setFocused(false);
        props.onBlur?.(e);
      }}
      style={{
        ...input.base,
        ...(small ? input.small : {}),
        ...(mono ? input.mono : {}),
        ...(focused ? input.focus : {}),
        ...style,
      }}
    />
  );
}
