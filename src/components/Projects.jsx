import { projects } from "../data/portfolioData.js";
import useReveal from "../hooks/useReveal.js";
import "../styles/projects.css";

function ProjectCard({ p }) {
  const ref = useReveal();
  return (
    <div ref={ref} className="reveal project-card brut-box">
      <div className="project-card__top">
        <span className="project-card__highlight">{p.highlight}</span>
        <span className="tag-chip">{p.sector}</span>
      </div>
      <h3 className="project-card__title">{p.title}</h3>
      <p className="project-card__desc">{p.desc}</p>
      <div className="project-card__tags">
        {p.tags.map((t) => (
          <span key={t} className="tag-chip">
            {t}
          </span>
        ))}
      </div>
      <div className="project-card__actions">
        {p.live && (
          <a href={p.live} target="_blank" rel="noreferrer">
            <button className="btn btn-solid" style={{ padding: "9px 18px", fontSize: ".72rem" }}>
              Live ↗
            </button>
          </a>
        )}
        {p.github && (
          <a href={p.github} target="_blank" rel="noreferrer">
            <button className="btn" style={{ padding: "9px 18px", fontSize: ".72rem" }}>
              GitHub ↗
            </button>
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section section-alt">
      <div className="wrap">
        <div className="eyebrow">05 / PROJECTS</div>
        <h2 className="h2">
          SHIPPED TO
          <br />
          <span>PRODUCTION.</span>
        </h2>

        <div className="projects-grid">
          {projects.map((p) => (
            <ProjectCard p={p} key={p.title} />
          ))}
        </div>
      </div>
    </section>
  );
}
