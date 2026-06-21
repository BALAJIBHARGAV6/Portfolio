import { useEffect, useState } from "react";
import "../styles/navbar.css";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" }
];

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_ITEMS.map((n) => document.getElementById(n.id)).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const goTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
        <button className="nav__logo" onClick={() => goTo("home")} aria-label="Go to top">
          BB<span>.dev</span>
        </button>

        <div className="nav__links">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`nav__link ${active === item.id ? "is-active" : ""}`}
              onClick={() => goTo(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="nav__right">
          <button
            className="theme-switch"
            role="switch"
            aria-checked={theme === "light"}
            aria-label="Toggle color theme"
            onClick={onToggleTheme}
          >
            <span className="theme-switch__label">DARK</span>
            <span className="theme-switch__track">
              <span className="theme-switch__thumb" />
            </span>
            <span className="theme-switch__label">LIGHT</span>
          </button>

          <button
            className={`burger ${open ? "is-open" : ""}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${open ? "is-open" : ""}`}>
        {NAV_ITEMS.map((item, i) => (
          <button
            key={item.id}
            className="mobile-menu__link"
            style={{ transitionDelay: `${i * 45}ms` }}
            onClick={() => goTo(item.id)}
          >
            <span className="mobile-menu__index">0{i + 1}</span>
            {item.label}
          </button>
        ))}
      </div>
    </>
  );
}
