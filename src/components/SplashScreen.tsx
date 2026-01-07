import { useEffect, useState } from "react";
import { colors, spacing, fontSizes, fontWeights } from "../styles";

type Props = {
  durationMs?: number; // total time visible
  fadeMs?: number;     // fade-out duration
  onDone: () => void;
};

export default function SplashScreen({ durationMs = 4000, fadeMs = 600, onDone }: Props) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const startFade = setTimeout(() => setFading(true), Math.max(0, durationMs - fadeMs));
    const finish = setTimeout(onDone, durationMs);
    return () => {
      clearTimeout(startFade);
      clearTimeout(finish);
    };
  }, [durationMs, fadeMs, onDone]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: colors.black,
        color: colors.white,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        zIndex: 9999,
        opacity: fading ? 0 : 1,
        transition: `opacity ${fadeMs}ms ease`,
      }}
    >
      <img
        src="/background.jpg"
        alt="Welcome"
        style={{
          width: "80vw",
          height: "80vh",
          objectFit: "contain",
          borderRadius: 12,
          boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
          marginBottom: spacing.md,
        }}
      />
      <div style={{ fontSize: fontSizes.md, fontWeight: fontWeights.semibold, opacity: 0.9 }}>
        brought to you by Next Level Technology Solutions
      </div>
    </div>
  );
}
