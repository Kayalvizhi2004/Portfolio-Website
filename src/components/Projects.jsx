import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const timers = items.map((_, i) =>
      setTimeout(() => setVisibleIdxs((s) => [...s, i]), i * 110 + 80)
    );
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <section className="projects" id="projects" aria-labelledby="projects-heading">
      <style>{`
        .projects{ padding:36px 20px 80px; background: linear-gradient(180deg,#f7f9fc,#f4f6fb); }
        .projects-inner{ max-width:1100px; margin:0 auto; }
        h2{ text-align:center; font-size:2rem; margin-bottom:35px; color:#0b1220; padding-top:5px; }

        /* Force 2 columns layout */
        .grid{ 
          display:grid; 
          grid-template-columns: repeat(2, 1fr); 
          gap:24px; 
          margin-top:35px; 
        }

        .card{
          background: linear-gradient(180deg,#ffffff,#fbfdff);
          border-radius:12px; padding:18px; box-shadow: 0 12px 36px rgba(12,18,30,0.06);
          transform: translateY(14px) scale(.996);
          opacity:0;
          transition: transform 480ms cubic-bezier(.2,.9,.3,1), opacity 420ms ease, box-shadow 260ms ease;
          overflow:hidden;
        }
        .card.visible { transform: translateY(0) scale(1); opacity:1; }
        .card:hover { transform: translateY(-8px) scale(1.01); box-shadow: 0 28px 70px rgba(12,18,30,0.12); }

        .card-head { display:flex; gap:12px; align-items:center; }
        .thumb {
          width:82px; height:68px; border-radius:8px; object-fit:cover; flex-shrink:0;
          box-shadow: 0 8px 30px rgba(0,0,0,0.06); transition: transform 420ms ease, box-shadow 320ms ease;
        }
        .card:hover .thumb { transform: scale(1.03); box-shadow: 0 18px 48px rgba(0,0,0,0.08); }

        .title { font-size:1.05rem; margin:0; color:#0b1220; font-weight:700; }
        .desc { margin:10px 0 14px; color:#475569; min-height:48px; line-height:1.45; }

        .actions { display:flex; gap:10px; align-items:center; flex-wrap:wrap; }
        .view {
          display:inline-flex; align-items:center; justify-content:center;
          padding:8px 14px; border-radius:10px; background: linear-gradient(90deg,#00f2fe,#a933d8);
          color:white; font-weight:700; text-decoration:none; transition: transform 140ms ease;
        }
        .view:active { transform: translateY(2px); }

        .chips { margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;}
        .chip { padding:6px 8px; border-radius:999px; background:rgba(12,20,28,0.04); font-weight:600; color:#0b1220; font-size:.82rem; }

        @media (max-width: 768px) {
          .grid { grid-template-columns: 1fr; }
        }

        @media (prefers-reduced-motion: reduce) {
          .card { transition:none; transform:none; opacity:1; }
        }
      `}</style>

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
