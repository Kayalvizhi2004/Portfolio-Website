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
    title: "Intelligent Resume Screening & Job Matching System",
    desc: "AI system that screens resumes and matches candidates to suitable jobs.",
    route: "/project4",
    tech: ["React", "CSS"],
    img: "/images/logo-4.png",
  },
];

export default function Projects() {
  const [visibleIdxs, setVisibleIdxs] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const timers = items.map((_, i) =>
      setTimeout(() => setVisibleIdxs((s) => [...s, i]), i * 120)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section
      className={`projects-root ${theme === "dark" ? "dark" : ""}`}
      id="projects"
    >
      <style>{`
        :root {
          --bg-light: #f7f9fc;
          --bg-dark: #0b1220;
          --text-dark: #0b1220;
          --text-light: #ffffff;
          --accent: #00f2fe;
          --accent2: #e00dac;
        }

        .projects-root {
          min-height: 100vh;
          padding: 40px 20px 80px;
          background: var(--bg-light);
          color: var(--text-dark);
        }

        .dark {
          background: var(--bg-dark);
          color: var(--text-light);
        }

        .projects-inner {
          max-width: 1300px;
          margin: auto;
        }

        h2 {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 40px;
          text-shadow: 0 0 14px #00fff7;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }

        /* CARD FIX */
        .card {
          background: #ffffff;
          border-radius: 14px;
          padding: 20px;
          box-shadow: 0 16px 44px rgba(12,18,30,0.08);
          opacity: 0;
          transform: translateY(14px);
          transition: all 0.45s ease;

          display: flex;
          flex-direction: column;
         
        }

        .dark .card {
          background: linear-gradient(180deg, #1b1f30, #111520);
        }

        .card.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .card-head {
          display: flex;
          gap: 14px;
          align-items: center;
        }

        .thumb {
          width: 60px;
          height: 60px;
          border-radius: 10px;
          object-fit: cover;
          background: #fff;
        }

        .title {
          font-size: 1.15rem;
          font-weight: 800;
          margin: 0 0 6px;
          color: var(--text-dark);
        }

        .dark .title {
          color: var(--text-light);
        }

        .desc {
          font-size: 0.95rem;
          line-height: 1.5;
          color: #475569;
        }

        .dark .desc {
          color: #cbd5f5;
        }

        /* FOOTER STAYS AT BOTTOM */
        .card-footer {
          margin-top: auto;
          padding-top: 18px;
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          justify-content: space-between;
        }

        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .chip {
          padding: 6px 10px;
          border-radius: 999px;
          font-size: 0.8rem;
          background: rgba(0,0,0,0.06);
          font-weight: 600;
        }

        .dark .chip {
          background: rgba(255,255,255,0.1);
        }

        .actions {
          display: flex;
          gap: 10px;
          align-items: center;
          justify-content: flex-start;
        }

        .view {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 140px;
          min-width: 140px;
          height: 44px;
          padding: 10px 16px;
          border-radius: 10px;
          font-weight: 700;
          color: #fff;
          background: linear-gradient(90deg, var(--accent), var(--accent2));
          text-decoration: none;
          cursor: pointer;
          text-align: center;
        }

        /* MOBILE FIX */
        @media (max-width: 900px) {
          .projects-root {
            height: auto !important;
            min-height: auto !important;
            display: block !important;
            align-items: stretch !important;
            padding: 24px 12px 80px;
            overflow-x: hidden;
            overflow-y: visible;
            width: 100%;
          }

          .projects-inner {
            padding: 0 6px;
          }

          h2 {
            font-size: 1.8rem;
            margin-bottom: 28px;
          }

          .grid {
            gap: 22px;
            grid-template-columns: 1fr;
            width: 100%;
          }

          .card {
            min-height: 280px;
            padding: 16px;
          }

          .card-head {
            gap: 12px;
            align-items: flex-start;
            margin-bottom: 12px;
          }

          .thumb {
            width: 50px;
            height: 50px;
          }

          .title {
            font-size: 1.1rem;
            margin: 0 0 8px;
          }

          .desc {
            font-size: 0.9rem;
            line-height: 1.4;
            margin-bottom: 16px;
          }

          .card-footer {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
            margin-top: 0;
            padding-top: 0;
          }

          .actions {
            width: 100%;
            justify-content: center;
          }

          .view {
            width: 100%;
            max-width: none;
            height: 48px;
            font-size: 1rem;
            padding: 12px 18px;
            white-space: nowrap;
            align-self: center;
          }

          .chips {
            justify-content: flex-start;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .card {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <div className="projects-inner">
        <h2 id="projects-heading">Projects</h2>

        <div className="grid">
          {items.map((p, i) => (
            <article
              key={p.id}
              className={`card ${visibleIdxs.includes(i) ? "visible" : ""}`}
            >
              <div className="card-head">
                <img src={p.img} alt={p.title} className="thumb" />
                <div>
                  <h3 className="title">{p.title}</h3>
                  <p className="desc">{p.desc}</p>
                </div>
              </div>

              <div className="card-footer">
                <div className="chips">
                  {p.tech.map((t) => (
                    <span key={t} className="chip">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="actions">
                  <Link to={p.route} className="view">
                    View
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
