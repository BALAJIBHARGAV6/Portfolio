import { profile } from "../data/portfolioData.js";
import "../styles/footer.css";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="wrap footer__top">
        <div className="footer__brand">
          BB <span>© {year} {profile.name}</span>
        </div>
        <div className="footer__loc">{profile.location.toUpperCase()}</div>
      </div>
      <div className="wrap footer__socials">
        <a href={profile.github} target="_blank" rel="noreferrer">
          <button className="btn">GitHub ↗</button>
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          <button className="btn">LinkedIn ↗</button>
        </a>
        <a href={profile.instagram} target="_blank" rel="noreferrer">
          <button className="btn">Instagram ↗</button>
        </a>
      </div>
    </footer>
  );
}