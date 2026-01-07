// src/components/common/Select.tsx
import { select } from "../../styles";

type Props = React.SelectHTMLAttributes<HTMLSelectElement> & {
  small?: boolean;
};

export default function Select({ 
  small = false, 
  style, 
  ...props 
}: Props) {
  return (
    <select
      {...props}
      style={{
        ...select.base,
        ...(small ? select.small : {}),
        ...style,
      }}
    />
  );
}
