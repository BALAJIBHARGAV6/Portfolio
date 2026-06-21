# Balaji Bhargav — Portfolio (React + Vite)

A complete rebuild of your portfolio as a React single-page application,
in a dual-theme brutalist design: dark canvas with a neon-green accent,
and a bone-white canvas with a dark-yellow accent and black structural
lines. Built for speed, clarity, and to read as a real engineering
project to a hiring team — not a template.

## 1. Run it locally

You need Node.js 18+ installed.

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

## 2. Add your resume

Drop your resume PDF into the `public/` folder and name it exactly:

```
public/resume.pdf
```

The "Download Resume" button in the hero always points to `/resume.pdf`,
so whenever your CV changes, just overwrite that one file — nothing
in the code needs to change.

## 3. Edit your content

Everything text-based — experience, skills, projects, about copy, social
links, email — lives in one file:

```
src/data/portfolioData.js
```

Edit that file and the whole site updates. No need to touch any
component.

To highlight a word/phrase in the About section, wrap it in pipes:
`"I'm a |Full Stack Developer| based in..."` — anything between `|...|`
renders as a highlighted keyword.

## 4. Build for production

```bash
npm run build
```

This outputs a static site into `dist/`. `npm run preview` lets you
check the production build locally before deploying.

## 5. Deploy to the same URL (Vercel)

Since your existing site already lives at
`balajibhargav-portfolio.vercel.app`, the easiest path is:

1. Push this project to a GitHub repository.
2. In your existing Vercel project, go to **Settings → Git** and connect
   it to the new repository (or create a new Vercel project from this
   repo and then go to **Settings → Domains** on the new project and
   move `balajibhargav-portfolio.vercel.app` over to it).
3. Vercel auto-detects Vite — build command `npm run build`, output
   directory `dist`. No extra configuration needed.
4. Deploy. The same domain will now serve the new React site.

## 6. What changed from the old version

- Rebuilt from static HTML/CSS/JS into a proper React (Vite) SPA.
- Internship experience corrected: NextHub Technologies is marked as
  completed (Sep 2025 – Jan 2026), not an ongoing role.
- Freelance experience (Team5, Jul 2023 – Jan 2026) added with real
  scope and impact, pulled from your LinkedIn.
- Skills updated: Angular & AngularJS added, Supabase removed from the
  databases list, Shopify and WordPress added under a new
  "CMS & E-Commerce" category.
- New project added: Tojonline (Shopify store built for a client).
- Resume download wired up and easy to swap.
- Working contact form (FormSubmit) pointed at your current email.
- New advanced boot-sequence loading screen, typing-effect hero
  subtitle, scroll-reveal animations, and a redesigned theme switch and
  mobile menu — no emoji or icon fonts anywhere, per your request.
- SEO: meta tags, Open Graph tags, JSON-LD structured data, robots.txt.

## 7. Project structure

```
src/
  data/portfolioData.js   ← all editable content
  components/             ← one component per section
  styles/                 ← one CSS file per component
  hooks/useReveal.js       ← scroll-reveal animation hook
  App.jsx                  ← theme + loader state, section order
  main.jsx                  ← React entry point
public/
  resume.pdf                ← put your CV here (see step 2)
  robots.txt
index.html                   ← SEO tags, fonts, favicon
```
