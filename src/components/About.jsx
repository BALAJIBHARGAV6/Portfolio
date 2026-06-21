import { aboutParagraphs, infoCards } from "../data/portfolioData.js";
import useReveal from "../hooks/useReveal.js";
import "../styles/about.css";

function renderHighlighted(text) {
  const parts = text.split("|");
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <mark className="kw" key={i}>
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function About() {
  const ref = useReveal();

  return (
    <section id="about" className="section">
      <div className="wrap">
        <div className="eyebrow">02 / ABOUT</div>
        <h2 className="h2">
          WEB VISIONARY.
          <br />
          <span>PROBLEM SOLVER.</span>
        </h2>

        <div ref={ref} className="reveal about__grid">
          <div className="about__copy">
            {aboutParagraphs.map((p, i) => (
              <p key={i} className="about__para">
                {renderHighlighted(p.text)}
              </p>
            ))}
          </div>

          <div className="about__cards">
            {infoCards.map((c) => (
              <div key={c.label} className="about__card brut-box">
                <div className="about__card-label">{c.label.toUpperCase()}</div>
                <div className="about__card-value">{c.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
