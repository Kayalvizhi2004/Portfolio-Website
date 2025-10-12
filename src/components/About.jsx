import React, { useEffect, useRef, useState } from "react";

function About() {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const skills = [
    { name: "Python", level: 90 },
    { name: "Tableau & Power BI", level: 80 },
    { name: "SQL", level: 56 },
    { name: "Excel", level: 88 },
    { name: "HTML & CSS", level: 72 },
    { name: "React", level: 68 },
  ];

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="about-container" ref={containerRef}>
      <style>{`
        .about-container {
          padding:0px 0px;
          margin-top: 0px;
          max-width: 1500px;
          margin-left: auto;
          margin-right: auto;
        }

        .about {
          text-align: center;
          transform: translateY(18px);
          opacity: 0;
          transition: transform 650ms cubic-bezier(.2,.9,.3,1), opacity 650ms ease;
          padding-top:0px;
        }
        .about.visible {
          transform: translateY(0);
          opacity: 1;
        }

        h2 { 
          margin-bottom: 14px; 
          color:#111; 
          font-size: 2rem;
        }
        .about p {
          max-width: 85ch;
          color: #444;
          line-height: 1.6;
          margin: 0 auto 26px;
          text-align:justify;
        }

        /* Skills grid */
        .skills {
          margin-top: 28px;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          align-items: start;
        }
        @media (max-width:720px) {
          .skills { grid-template-columns: 1fr; }
        }

        .skill-card {
          background: linear-gradient(180deg,#fcfcff,#f9fbff);
          border-radius: 10px;
          padding: 16px;
          box-shadow: 0 6px 18px rgba(10,12,22,0.04);
          border: 1px solid rgba(10,12,22,0.05);
          opacity: 0; 
          transform: translateY(10px); 
          transition: opacity 500ms ease, transform 500ms cubic-bezier(.2,.9,.3,1); 
        }
        .skill-card.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .skill-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 14px 34px rgba(2,8,23,0.08);
        }

        .skill-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
          gap: 12px;
        }
        .skill-name {
          font-weight: 700;
          color: #0b1220;
        }
        .skill-percent {
          font-weight: 700;
          color: #0b1220;
          font-size: 0.95rem;
        }

        .progress-track {
          width: 100%;
          height: 12px;
          background: #eef6fb;
          border-radius: 999px;
          overflow: hidden;
        }
        .progress-fill {
          height: 100%;
          width: 0%;
          border-radius: 999px;
          transition: width 1100ms cubic-bezier(.2,.9,.3,1);
          background: linear-gradient(90deg, #00f2fe, #a933d8);
        }

        .skill-meta {
          display: flex;
          justify-content: space-between;
          margin-top: 10px;
          font-size: 0.85rem;
          color: #6b7280;
        }

        .accent-circle {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: linear-gradient(90deg,#00f2fe,#a933d8);
          margin-left: 8px;
        }
      `}</style>

      <section className={`about ${visible ? "visible" : ""}`} id="about">
        <h2>About Me</h2>

        <p>
          Hi, I'm Kayalvizhi Neelanarayanan, a passionate and detail-oriented Python Developer / Data Analyst  with a strong interest in building creative, user-friendly, and impactful digital experiences. I enjoy turning complex problems into elegant, efficient solutions through clean code and thoughtful design.
        </p>

        <div className="skills">
          {skills.map((s, i) => {
            const delay = `${i * 100}ms`;
            return (
              <div
                key={s.name}
                className={`skill-card ${visible ? "visible" : ""}`}
                style={{ transitionDelay: visible ? delay : "0ms" }}
              >
                <div className="skill-title">
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="accent-circle" aria-hidden="true" />
                    <div className="skill-name">{s.name}</div>
                  </div>
                  <div className="skill-percent">{visible ? `${s.level}%` : "—"}</div>
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: visible ? `${s.level}%` : "0%",
                      transitionDelay: visible ? `${i * 90 + 120}ms` : "0ms",
                    }}
                  />
                </div>

                <div className="skill-meta">
                  <span>{s.level >= 85 ? "Advanced" : s.level >= 70 ? "Intermediate" : "Beginner"}</span>
                  <span>{s.level >= 85 ? "Years: 2+" : s.level >= 75 ? "1–2 yrs" : "Learning"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default About;
