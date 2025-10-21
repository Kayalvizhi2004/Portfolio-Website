// About.jsx
import React, { useEffect, useRef, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

export default function About() {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const skills = [
    { name: "Python", level: 90, desc: "Experience in writing clean, efficient Python scripts and automation." },
    { name: "Tableau & Power BI", level: 80, desc: "Creating interactive dashboards and visual analytics reports." },
    { name: "SQL", level: 56, desc: "Querying databases, data extraction, and basic optimization." },
    { name: "Excel", level: 88, desc: "Advanced formulas, pivot tables, charts, and data analysis." },
    { name: "HTML & CSS", level: 72, desc: "Building responsive and accessible web interfaces." },
    { name: "React", level: 68, desc: "Developing dynamic single-page applications using React.js." },
  ];

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("theme") || "light";
    } catch {
      return "light";
    }
  });

  const isDark = theme === "dark";

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  const getLevelText = (level) =>
    level >= 85 ? "Advanced" : level >= 70 ? "Intermediate" : "Beginner";

  return (
    <div
      ref={containerRef}
      id="about"
      className={`about-page ${isDark ? "theme-dark" : "theme-light"}`}
    >
      <style>{`
        .theme-light { background: #ffffff; color: #0b1220; }
        .theme-dark  { background: #07101a; color: #eaf6ff; }

        .theme-toggle {
          position: fixed;
          top: 60px;
          right: 16px;
          z-index: 130;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          cursor: pointer;
          font-size: 1.5rem;
          background: rgba(255,255,255,0.88);
          border: 1px solid rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        h2.about-heading {
          text-align: center;
          font-size: 2.05rem;
          font-weight: 800;
          margin: 0 0 20px;
          color: var(--text-dark);
          text-shadow: 0 0 10px #00fff7, 0 0 20px #00fff7, 0 0 30px #00fff7;
          animation: glowAnim 2s ease-in-out infinite alternate;
        }

        p.lead {
           text-align: center;
           margin: 30px;
        }

        @keyframes glowAnim {
          0% { text-shadow: 0 0 10px #00fff7, 0 0 20px #00fff7, 0 0 30px #00fff7; }
          100% { text-shadow: 0 0 20px #00fff7, 0 0 40px #00fff7, 0 0 60px #00fff7; }
        }

        .skills { display:grid; grid-template-columns:repeat(2,minmax(300px,1fr)); gap:24px; max-width:1200px; margin:0 auto; padding:0 20px; }
        @media(max-width:820px){.skills{grid-template-columns:1fr; gap:18px; padding:0 12px;} .theme-toggle{right:12px; top:60px; width:44px; height:44px;}}

        .skill-card {
          background:#f9f9ff;
          border-radius:12px;
          padding:16px;
          min-height:80px;
          opacity:${visible ? 1 : 0};
          transform: translateY(${visible ? "0" : "18px"});
          transition: opacity .48s ease, transform .48s cubic-bezier(.2,.9,.2,1);
        }
        .theme-dark .skill-card { background: rgba(255,255,255,0.02); }

        .skill-title { display:flex; align-items:center; gap:12px; margin-bottom:6px; justify-content: space-between; }
        .skill-name { font-weight:700; }
        .skill-percent { font-weight:700; }

        .progress-track { width:100%; height:12px; background:#eef6fb; border-radius:999px; overflow:hidden; margin-bottom:4px; }
        .theme-dark .progress-track { background:#0f1317; }
        .progress-fill { height:100%; width:0%; border-radius:999px; background: linear-gradient(90deg,#00f2fe,#e00dacff); transition: width 1.2s cubic-bezier(.2,.9,.2,1); }

        .level-text { font-size:0.85rem; color:#475569; margin-bottom:6px; text-align:left; }
        .theme-dark .level-text { color:#ccc; }

        .desc { font-size:0.9rem; text-align: justify; margin:8px 12px 0 12px; color:#475569; }
        .theme-dark .desc { color:#ccc; }
      `}</style>

      {/* Theme toggle */}
      <button
        className="theme-toggle"
        onClick={() => setTheme(isDark ? "light" : "dark")}
        title={isDark ? "Switch to light" : "Switch to dark"}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {isDark ? <FiMoon size={28} color="#ff9100" /> : <FiSun size={28} color="#ff9100" />}
      </button>

      <h2 className="about-heading">About Me</h2>

      <p className="lead">
        Hi, I'm <strong>Kayalvizhi Neelanarayanan</strong> — a passionate Python Developer / Data Analyst. I enjoy building creative, user-friendly, and impactful digital experiences. I turn complex problems into elegant, efficient solutions through clean code and robust data work.
      </p>

      <div className="skills" role="list">
        {skills.map((s) => (
          <article key={s.name} className="skill-card" role="listitem">
            <div className="skill-title">
              <div className="skill-name">{s.name}</div>
              <div className="skill-percent">{s.level}%</div>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: visible ? `${s.level}%` : "0%" }}></div>
            </div>
            <div className="level-text">{getLevelText(s.level)}</div>
            <div className="desc">{s.desc}</div>
          </article>
        ))}
      </div>
    </div>
  );
}




/* "service_9buyjza",
        "template_dqmq34i",
        form.current,
        "h2tGgERAN6RbUmuyp"  
        
        textShadow: "0 0 10px #00fff7, 0 0 20px #00fff7, 0 0 30px #00fff7",
         animation: "glowAnim 2s ease-in-out infinite alternate",
         
         const glowCardStyles = {
    background: "rgba(0, 255, 247, 0.1)",
    border: "1px solid rgba(0, 255, 247, 0.3)",
    borderRadius: "15px",
    padding: "30px",
    flex: "1 1 300px",
    maxWidth: "400px",
    boxShadow: "0 0 20px rgba(0, 255, 247, 0.5)",
    transition: "transform 0.3s, box-shadow 0.3s",
  };
  
  const pageStyles = {
    background: theme === "dark" ? "#111" : "#f0f0f0",
    color: theme === "dark" ? "#fff" : "#111",
    minHeight: "100vh",
    padding: "50px",
    transition: "0.5s",
    fontFamily: "'Poppins', sans-serif",
  };

  const containerStyles = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "30px",
  };

  const glowCardStyles = {
    background: "rgba(0, 255, 247, 0.1)",
    border: "1px solid rgba(0, 255, 247, 0.3)",
    borderRadius: "15px",
    padding: "30px",
    flex: "1 1 300px",
    maxWidth: "400px",
    boxShadow: "0 0 20px rgba(0, 255, 247, 0.5)",
    transition: "transform 0.3s, box-shadow 0.3s",
  };

  const inputStyles = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid rgba(0,255,247,0.5)",
    borderRadius: "8px",
    background: "transparent",
    color: "inherit",
    outline: "none",
    transition: "0.3s",
  };

  const buttonStyles = {
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    background: "linear-gradient(90deg, #00fff7, #00b3ff)",
    color: "#111",
    fontWeight: "bold",
    transition: "0.3s",
  };

  const titleStyles = {
    textAlign: "center",
    fontSize: "3rem",
    marginBottom: "50px",
    textShadow: "0 0 10px #00fff7, 0 0 20px #00fff7, 0 0 30px #00fff7",
    animation: "glowAnim 2s ease-in-out infinite alternate",
  };

  const themeButtonStyles = {
    position: "fixed",
    top: "20px",
    right: "20px",
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "inherit",
  };
  
  
  
  
  
  
  
  
  
  <button
          className="theme-toggle"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          onClick={() => setDarkMode((s) => !s)}
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          style={{ color: iconOrange }}
        >
    
          {!darkMode ? <FiSun size={20} color={iconOrange} /> : <FiMoon size={20} color={iconOrange} />}
        </button>
  
       
        <div className="profile-wrap" aria-hidden>
          <div className="profile-inner">
            <img src="/images/profile.jpg" alt="Kayalvizhi profile" className="profile-photo" />
          </div>
        </div>
  
  <style >     
         .theme-toggle { position: fixed; top:60px; right:16px; z-index:130; width:50px; height:50px; display:flex; align-items:center; justify-content:center; border-radius:50%; cursor:pointer; background: rgba(255,255,255,0.92); border:1px solid rgba(0,0,0,0.06); box-shadow: 0 6px 18px rgba(0,0,0,0.06); }
          .dark .theme-toggle { background: rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); color: #e6eef8; }
          .theme-toggle:active { transform: scale(.96); }
  
          .profile-wrap { border-radius:999px; padding:6px; background: var(--btn-grad); display:grid; place-items:center; margin-bottom:18px; }
          .profile-inner { width:200px; height:200px; border-radius:999px; padding:6px; background: #fff; display:grid; place-items:center; }
          .dark .profile-inner { background:#071021; }
          .profile-photo { width:182px; height:182px; border-radius:999px; object-fit:cover; display:block; }
  </style>*/