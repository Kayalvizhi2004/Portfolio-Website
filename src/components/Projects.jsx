import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Link } from "react-router-dom";

const items = [
  {
    id: "project1",
    title: "Portfolio Website",
    desc: "Personal portfolio built with React. Showcases projects and contact form.",
    route: "/project1",
    tech: ["React", "CSS", "HTML"],
    img: "/images/logo-1.jpeg",
  },
  {
    id: "project2",
    title: "Political Juggernauts (2019 Lok Sabha)",
    desc: "Quantitative analysis and dashboard for 2019 Lok Sabha elections.",
    route: "/project2",
    tech: ["Tableau"],
    img: "/images/logo-2.jpeg",
  },
  {
    id: "project3",
    title: "Plant Disease Detection",
    desc: "CNN-based system to detect and classify plant diseases from leaf images.",
    route: "/project3",
    tech: ["TensorFlow", "OpenCV", "Django"],
    img: "/images/logo-3.png",
  },
  {
    id: "project4",
    title: "Typing speed game for students",
    desc: "An interactive exercise where players type presented text as quickly and accurately.",
    route: "/project4",
    tech: ["React", "CSS"],
    img: "/images/logo-4.jpeg",
  },
];

export default function Projects() {
  const [visibleIdxs, setVisibleIdxs] = useState([]);
  const { theme } = useContext(ThemeContext);

  // Animate cards
  useEffect(() => {
    const timers = items.map((_, i) =>
      setTimeout(() => setVisibleIdxs((s) => [...s, i]), i * 110 + 80)
    );
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  // Theme handled globally by ThemeContext

  return (
    <section
      className={`projects-root ${theme === "dark" ? "dark" : ""}`}
      id="projects"
      aria-labelledby="projects-heading"
    >
      <style>{`
        :root {
          --bg-light: #f7f9fc;
          --bg-dark: #0b1220;
          --text-dark: #0b1220;
          --text-light: #ffffff;
          --accent: #00f2fe;
          --accent2: #e00dacff;
        }

        .projects-root {
          padding: 36px 20px 80px;
          background: var(--bg-light);
          color: var(--text-dark);
          transition: background .3s ease, color .3s ease;
          min-height: 100vh;
        }
        .dark { background: var(--bg-dark); color: var(--text-light); }

        .projects-inner { max-width: 1300px; margin: 0 auto; padding: 0 20px; }

        /* Heading with glowing effect */
        h2#projects-heading {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 35px;
          color: var(--text-dark);
          text-shadow: 0 0 10px #00fff7, 0 0 20px #00fff7, 0 0 30px #00fff7;
          animation: glowAnim 2s ease-in-out infinite alternate;
        }
        .dark h2#projects-heading { color: #eaf6ff; }

        @keyframes glowAnim {
          0% { text-shadow: 0 0 10px #00fff7, 0 0 20px #00fff7, 0 0 30px #00fff7; }
          100% { text-shadow: 0 0 20px #00fff7, 0 0 40px #00fff7, 0 0 60px #00fff7; }
        }

        .grid {
          display: grid;
          /* two columns with larger min width for a bigger card layout */
          grid-template-columns: repeat(2, minmax(480px, 1fr));
          gap: 40px;
          margin-top: 52px;
          align-items: start;
          justify-content: center;
          padding: 10px;
        }

        .card {
          background: #ffffff;
          border-radius:14px;
          padding:22px 22px;
          box-shadow: 0 18px 44px rgba(12,18,30,0.06);
          transform: translateY(14px) scale(.996);
          opacity:0;
          transition: transform 480ms cubic-bezier(.2,.9,.3,1), opacity 420ms ease, box-shadow 260ms ease, background .3s ease, color .3s ease;
          overflow:hidden;
          display:flex;
          flex-direction:column;
        }

        /* no standalone override for .card - use base .card styles for consistency */
        .dark .card { background: linear-gradient(180deg,#1b1f30,#111520); color:#eaf6ff; }
        .card.visible { transform: translateY(0) scale(1); opacity:1; }
        .card:hover { transform: translateY(-8px) scale(1.01); box-shadow: 0 28px 70px rgba(12,18,30,0.12); }

        .card-head { display:flex; gap:12px; align-items:center; }
        .card-head > div { flex: 1 1 auto; text-align: left; }
        .thumb {
          width:64px; height:64px; border-radius:10px; object-fit:cover; flex-shrink:0;
          padding:8px; background: #fff; box-shadow: 0 10px 30px rgba(12,18,30,0.06); transition: transform 420ms ease, box-shadow 320ms ease;
        }
        .card:hover .thumb { transform: scale(1.03); box-shadow: 0 18px 48px rgba(0,0,0,0.08); }

        .title { font-size:1.15rem; margin:0 0 6px; font-weight:800; color: #07101a; text-align: left; }
        .dark .title { color:white; }
        .desc { margin:6px 0 14px; min-height:56px; line-height:1.55; color: #334155; font-size:0.98rem; }
        .dark .desc { color:#ccc; }

        .view { font-size:0.95rem }
        .chip { padding:6px 10px; border-radius:999px; background:rgba(12,20,28,0.06); font-weight:700; font-size:0.82rem; color: #0b1220; }
        .dark .chip { background: rgba(255,255,255,0.08); color: #fff; }

        .card-footer { display:flex; justify-content:space-between; align-items:center; gap:12px; margin-top:16px; }

        .actions { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
        .view {
          display:inline-flex; align-items:center; justify-content:center;
          padding:8px 14px; border-radius:10px; background: linear-gradient(90deg,var(--accent),var(--accent2));
          color:white; font-weight:700; text-decoration:none; transition: transform 140ms ease;
        }
        .view:active { transform: translateY(2px); }

        .chips { display:flex; gap:8px; flex-wrap:wrap;}
        .chip { padding:6px 8px; border-radius:999px; background:rgba(12,20,28,0.04); font-weight:600; font-size:.82rem; color:inherit; }
        .dark .chip { background: rgba(255,255,255,0.1); }

        /* Theme is controlled globally from the navbar */

  @media (max-width: 900px) {
    .grid { grid-template-columns: 1fr; }
    .card { padding:16px; }
    .title { font-size:1.05rem }
    .desc { font-size:0.95rem; line-height:1.45 }
    .thumb { width:56px; height:56px }
  }
        @media (prefers-reduced-motion: reduce) { .card { transition:none; transform:none; opacity:1; } }
      `}</style>

      {/* Theme toggle moved to Navbar (global) */}

      <div className={`projects-inner ${theme === "dark" ? "dark" : ""}`}>
        <h2 id="projects-heading">Projects</h2>
        <div className="grid project-grid" role="list">
          {items.map((p, i) => (
            <article
              key={p.id}
              role="listitem"
              className={`card project-card ${visibleIdxs.includes(i) ? "visible" : ""}`}
              aria-labelledby={`${p.id}-title`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="card-head">
                <img src={p.img} alt={`${p.title} snapshot`} className="thumb" />
                <div>
                  <h3 id={`${p.id}-title`} className="title">{p.title}</h3>
                  <div className="desc">{p.desc}</div>
                </div>
              </div>
              <div className="card-footer">
                <div className="chips" aria-hidden="true">
                  {p.tech.map((t) => <span key={t} className="chip">{t}</span>)}
                </div>
                <div className="actions">
                  <Link to={p.route} className="view" aria-label={`Open ${p.title} details`}>View</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
