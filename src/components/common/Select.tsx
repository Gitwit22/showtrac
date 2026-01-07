import React from "react";

type Props = React.SelectHTMLAttributes<HTMLSelectElement>;

export default function Select(props: Props) {
  return (
    <select
      {...props}
      style={{
        padding: "8px 10px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.15)",
        background: "rgba(15,15,15,0.9)",
        color: "white",
        outline: "none",
        width: props.style?.width ?? "100%",
        ...props.style,
      }}
    />
  );
}
