import { useEffect, useState } from "react";
import { profile, stats } from "../data/portfolioData.js";
import "../styles/hero.css";

function useTypewriter(words, typeSpeed = 55, pause = 1600) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    let timeout;
    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), typeSpeed);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(current.slice(0, text.length - 1)), typeSpeed / 1.6);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setWordIndex((i) => i + 1);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typeSpeed, pause]);

  return text;
}

const BOOT = [
  "balaji@dev ~ %",
  "$ whoami",
  "Full Stack Developer — React, Node.js, React Native",
  "$ status --check",
  "open_to_full_time : True",
  "experience : 1.5+ years",
  "$ run portfolio.sh"
];

function GlowLines() {
  useEffect(() => {
    const container = document.getElementById("glowLines");
    if (!container) return;

    // Simple mulberry32 PRNG seeded from Date.now() + Math.random(),
    // so every single mount/generate gets a fresh, independent sequence
    // (avoids any chance of engine-level Math.random patterns repeating
    // across quick reloads in dev).
    function makeRng() {
      let seed = (Date.now() ^ (Math.random() * 0xffffffff)) >>> 0;
      return function () {
        seed |= 0;
        seed = (seed + 0x6d2b79f5) | 0;
        let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
      };
    }

    function generate() {
      container.innerHTML = "";

      const rng = makeRng();
      const GRID = 64;
      const W = window.innerWidth;
      const H = window.innerHeight;
      const cols = Math.max(1, Math.floor(W / GRID));
      const rows = Math.max(1, Math.floor(H / GRID));

      // Build the full list of available column/row slots, shuffle them,
      // then take however many lines we want from the front. This removes
      // any retry-bias toward low indices that a do/while loop can cause.
      function shuffledIndices(count) {
        const arr = Array.from({ length: count }, (_, idx) => idx + 1);
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(rng() * (i + 1));
          [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
      }

      const totalLines = 4 + Math.floor(rng() * 3); // 4–6 lines total
      const vCount = Math.round(rng() * totalLines);
      const hCount = totalLines - vCount;

      const colSlots = cols > 1 ? shuffledIndices(cols - 1) : [];
      const rowSlots = rows > 1 ? shuffledIndices(rows - 1) : [];

      colSlots.slice(0, vCount).forEach((i) => {
        const el = document.createElement("div");
        el.className = "hero__glow-line";
        el.style.left = (i * GRID) + "px";
        el.style.setProperty("--dur", (5 + rng() * 7).toFixed(1) + "s");
        el.style.setProperty("--delay", (rng() * 12).toFixed(1) + "s");
        container.appendChild(el);
      });

      rowSlots.slice(0, hCount).forEach((j) => {
        const el = document.createElement("div");
        el.className = "hero__glow-line--h";
        el.style.top = (j * GRID) + "px";
        el.style.setProperty("--dur", (5 + rng() * 7).toFixed(1) + "s");
        el.style.setProperty("--delay", (rng() * 12).toFixed(1) + "s");
        container.appendChild(el);
      });
    }

    generate();

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(generate, 250);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return <div className="hero__glow-lines" id="glowLines" />;
}

export default function Hero() {
  const typed = useTypewriter(profile.taglineWords);

  return (
    <section id="home" className="hero">

      <GlowLines />

      <div className="wrap hero__grid">
        <div className="hero__copy">
          <div className="hero__badge">
            <span className="hero__dot" />
            {profile.status.toUpperCase()}
          </div>

          <div className="hero__eyebrow">FULL STACK DEVELOPER · HYDERABAD, INDIA</div>

          <h1 className="hero__title">
            BALAJI
            <br />
            <span className="hero__title-accent">BHAR</span>
            GAV
          </h1>

          <div className="hero__typed">
            <span className="hero__typed-prefix">&gt;</span> {typed}
            <span className="hero__typed-caret">|</span>
          </div>

          <p className="hero__desc">
            Building <mark className="kw">production-ready</mark> web and mobile applications for{" "}
            <mark className="kw">healthcare</mark>, <mark className="kw">e-commerce</mark> and{" "}
            <mark className="kw">government</mark> sectors. 1.5+ years across freelance and
            internship work. Currently <mark className="kw">open to full-time roles</mark>.
          </p>

          <div className="hero__actions">
            <button className="btn btn-solid" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
              View Projects →
            </button>
            <a href={profile.resume} download>
              <button className="btn">Download Resume</button>
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer">
              <button className="btn">GitHub ↗</button>
            </a>
          </div>
        </div>

        <div className="hero__panel brut-box">
          <div className="hero__panel-head">
            <span className="hero__panel-dot" />
            <span className="hero__panel-dot" />
            <span className="hero__panel-dot" />
          </div>
          <div className="hero__panel-body">
            {BOOT.map((line, i) => (
              <div key={i} className="hero__panel-line" style={{ animationDelay: `${i * 0.18 + 0.2}s` }}>
                {line.startsWith("$") ? <span className="hero__panel-cmd">{line}</span> : line}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="wrap hero__stats">
        {stats.map((s) => (
          <div className="hero__stat" key={s.label}>
            <div className="hero__stat-num">{s.num}</div>
            <div className="hero__stat-label">{s.label.toUpperCase()}</div>
          </div>
        ))}
      </div>
    </section>
  );
}