// src/components/common/Tabs.tsx
import { tabs } from "../../styles";

type TabOption = {
  id: string;
  label: string;
};

type Props = {
  options: TabOption[];
  active: string;
  onChange: (id: string) => void;
  style?: React.CSSProperties;
};

export default function Tabs({ options, active, onChange, style }: Props) {
  return (
    <div style={{ ...tabs.container, ...style }}>
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onChange(option.id)}
          style={{
            ...tabs.tab,
            ...(active === option.id ? tabs.tabActive : {}),
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
