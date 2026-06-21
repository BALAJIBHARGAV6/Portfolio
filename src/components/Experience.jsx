import { experience, education } from "../data/portfolioData.js";
import useReveal from "../hooks/useReveal.js";
import "../styles/experience.css";

function ExpCard({ exp }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal exp-card brut-box">
      <div className="exp-card__top">
        <div>
          <div className="exp-card__tag">{exp.tag}</div>
          <h3 className="exp-card__role">{exp.role}</h3>
          <div className="exp-card__company">{exp.company}</div>
        </div>
        <div className="exp-card__period">
          <div>{exp.period}</div>
          <div className="exp-card__duration">{exp.duration}</div>
          <div className="exp-card__location">{exp.location}</div>
        </div>
      </div>

      <p className="exp-card__summary">{exp.summary}</p>

      <div className="exp-card__narrative">
        {exp.narrative.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="exp-card__stack">
        {exp.stack.map((s) => (
          <span key={s} className="tag-chip">
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="section section-alt">
      <div className="wrap">
        <div className="eyebrow">03 / EXPERIENCE</div>
        <h2 className="h2">
          WHERE I'VE
          <br />
          <span>WORKED.</span>
        </h2>

        <div className="exp-list">
          {experience.map((exp) => (
            <ExpCard exp={exp} key={exp.company} />
          ))}
        </div>

        <div className="exp-edu brut-box">
          <span className="exp-edu__label">EDUCATION</span>
          <div className="exp-edu__row">
            <span className="exp-edu__degree">{education.degree}</span>
            <span className="exp-edu__school">{education.school}</span>
            <span className="exp-edu__period">{education.period}</span>
          </div>
        </div>
      </div>
    </section>
  );
}