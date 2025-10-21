import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";

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
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("projects-theme") === "dark";
    } catch {
      return false;
    }
  });

  // Animate cards
  useEffect(() => {
    const timers = items.map((_, i) =>
      setTimeout(() => setVisibleIdxs((s) => [...s, i]), i * 110 + 80)
    );
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  // Persist theme
  useEffect(() => {
    try {
      localStorage.setItem("projects-theme", darkMode ? "dark" : "light");
    } catch {}
    document.body.style.background = darkMode ? "#0b1220" : "#f7f9fc";
    document.body.style.color = darkMode ? "#ffffff" : "#0b1220";
  }, [darkMode]);

  return (
    <section
      className={`projects-root ${darkMode ? "dark" : ""}`}
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

        .projects-inner { max-width: 1100px; margin: 0 auto; }

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
          display:grid;
          grid-template-columns: repeat(2, 1fr);
          gap:24px;
          margin-top:35px;
        }

        .card {
          background: linear-gradient(180deg,#ffffff,#fbfdff);
          border-radius:12px; padding:18px; box-shadow: 0 12px 36px rgba(12,18,30,0.06);
          transform: translateY(14px) scale(.996);
          opacity:0;
          transition: transform 480ms cubic-bezier(.2,.9,.3,1), opacity 420ms ease, box-shadow 260ms ease, background .3s ease, color .3s ease;
          overflow:hidden;
        }
        .dark .card { background: linear-gradient(180deg,#1b1f30,#111520); color:#eaf6ff; }
        .card.visible { transform: translateY(0) scale(1); opacity:1; }
        .card:hover { transform: translateY(-8px) scale(1.01); box-shadow: 0 28px 70px rgba(12,18,30,0.12); }

        .card-head { display:flex; gap:12px; align-items:center; }
        .thumb {
          width:82px; height:68px; border-radius:8px; object-fit:cover; flex-shrink:0;
          box-shadow: 0 8px 30px rgba(0,0,0,0.06); transition: transform 420ms ease, box-shadow 320ms ease;
        }
        .card:hover .thumb { transform: scale(1.03); box-shadow: 0 18px 48px rgba(0,0,0,0.08); }

        .title { font-size:1.05rem; margin:0; font-weight:700; color: inherit; }
        .desc { margin:10px 0 14px; min-height:48px; line-height:1.45; color: #475569; }
        .dark .desc { color:#ccc; }

        .actions { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
        .view {
          display:inline-flex; align-items:center; justify-content:center;
          padding:8px 14px; border-radius:10px; background: linear-gradient(90deg,var(--accent),var(--accent2));
          color:white; font-weight:700; text-decoration:none; transition: transform 140ms ease;
        }
        .view:active { transform: translateY(2px); }

        .chips { margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;}
        .chip { padding:6px 8px; border-radius:999px; background:rgba(12,20,28,0.04); font-weight:600; font-size:.82rem; color:inherit; }
        .dark .chip { background: rgba(255,255,255,0.1); }

        /* Theme toggle (Contact page style) */
        .theme-toggle {
          position: fixed;
          top: 60px;
          right: 24px;
          z-index: 130;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 1.5rem;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.1);
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          transition: all 0.3s ease;
          color: orange;
        }
        .theme-toggle:hover { transform: scale(1.08); box-shadow: 0 8px 20px rgba(0,0,0,0.15); }
        .dark .theme-toggle { background: #071124; border: 1px solid rgba(255,255,255,0.2); color: orange; box-shadow: 0 4px 16px rgba(0,0,0,0.5); }
        .theme-toggle svg { filter: drop-shadow(0 2px 4px rgba(0,0,0,0.25)); }

        @media (max-width: 768px) { .grid { grid-template-columns: 1fr; } }
        @media (prefers-reduced-motion: reduce) { .card { transition:none; transform:none; opacity:1; } }
      `}</style>

      {/* Theme toggle */}
      <button
        className="theme-toggle"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? <FiMoon size={22} /> : <FiSun size={22} />}
      </button>

      <div className="projects-inner">
        <h2 id="projects-heading">Projects</h2>
        <div className="grid" role="list">
          {items.map((p, i) => (
            <article
              key={p.id}
              role="listitem"
              className={`card ${visibleIdxs.includes(i) ? "visible" : ""}`}
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
              <div className="actions" style={{ marginTop: 6 }}>
                <Link to={p.route} className="view" aria-label={`Open ${p.title} details`}>View</Link>
              </div>
              <div className="chips" aria-hidden="true">
                {p.tech.map((t) => <span key={t} className="chip">{t}</span>)}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
