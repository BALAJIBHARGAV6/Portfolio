import { useEffect, useState } from "react";
import "../styles/loader.css";

const BOOT_LINES = [
  "Initializing portfolio environment",
  "Loading developer profile",
  "Compiling experience timeline",
  "Indexing project repository",
  "Optimising for production",
  "Ready"
];

const TOTAL_DURATION = 3000; // ms
const TICK = 80; // ms

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const steps = TOTAL_DURATION / TICK;
    const increment = 100 / steps;
    let current = 0;

    const timer = setInterval(() => {
      current = Math.min(100, current + increment);
      setProgress(Math.round(current));

      if (current >= 100) {
        clearInterval(timer);
        setTimeout(() => setLeaving(true), 320);
        setTimeout(() => onDone(), 820);
      }
    }, TICK);

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const lineIndex = Math.min(
    BOOT_LINES.length - 1,
    Math.floor((progress / 100) * BOOT_LINES.length)
  );
  const filled = Math.round(progress / 4);

  return (
    <div className={`loader ${leaving ? "loader--leave" : ""}`}>
      <div className="loader__scan" />
      <div className="loader__inner">
        <div className="loader__mark">
          <span>BB</span>
          <span className="loader__mark-sub">PORTFOLIO.SYS — BALAJI BHARGAV</span>
        </div>

        <div className="loader__lines">
          {BOOT_LINES.slice(0, lineIndex + 1).map((l, i) => (
            <div key={l} className="loader__line">
              <span className="loader__caret">&gt;</span> {l}
              {i === lineIndex && progress < 100 && <span className="loader__blink">_</span>}
              {(i < lineIndex || progress >= 100) && <span className="loader__ok">OK</span>}
            </div>
          ))}
        </div>

        <div className="loader__bar-row">
          <div className="loader__bar">
            <div className="loader__bar-track">
              {Array.from({ length: 25 }).map((_, i) => (
                <span key={i} className={i < filled ? "on" : ""} />
              ))}
            </div>
          </div>
          <div className="loader__pct">{progress}%</div>
        </div>
      </div>
    </div>
  );
}