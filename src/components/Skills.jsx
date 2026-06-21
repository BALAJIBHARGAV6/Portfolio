import { skills, certifications } from "../data/portfolioData.js";
import useReveal from "../hooks/useReveal.js";
import "../styles/skills.css";

function SkillCard({ cat, items }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal skill-card brut-box">
      <div className="skill-card__cat">{cat.toUpperCase()}</div>
      <div className="skill-card__items">
        {items.map((s) => (
          <span key={s} className="skill-card__item">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="wrap">
        <div className="eyebrow">04 / SKILLS</div>
        <h2 className="h2">
          TECHNICAL
          <br />
          <span>ARSENAL.</span>
        </h2>

        <div className="skills-grid">
          {Object.entries(skills).map(([cat, items]) => (
            <SkillCard cat={cat} items={items} key={cat} />
          ))}
        </div>

        <div className="certs">
          <span className="certs__label">CERTIFICATIONS</span>
          <div className="certs__list">
            {certifications.map((c) => (
              <span key={c} className="tag-chip">
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
