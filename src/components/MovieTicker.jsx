import { useEffect, useState } from "react";

export default function MovieTicker({ quotes = [], accentColor = "#FFE600" }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!quotes.length) return undefined;
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % quotes.length);
        setVisible(true);
      }, 450);
    }, 4000);

    return () => clearInterval(timer);
  }, [quotes.length]);

  if (!quotes.length) return null;
  const quote = quotes[index];

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, overflow: "hidden", maxWidth: 360 }}>
      <span style={{ fontSize: 13, flexShrink: 0 }}>🎬</span>
      <div
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity .4s",
          fontSize: 11,
          color: "rgba(255,255,255,.4)",
          fontStyle: "italic",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        "{quote.quote}" — <span style={{ color: accentColor }}>{quote.film}</span>
      </div>
    </div>
  );
}
