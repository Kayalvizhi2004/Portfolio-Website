import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  const roles = [
    { title: "Python Developer" },
    { title: "Data Analyst" },
    { title: "ML / Automation" },
  ];

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    try {
      return localStorage.getItem("hero-theme") === "dark";
    } catch {
      return false;
    }
  });

  // Cycle roles
  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (prefersReducedMotion) return;
    const displayMs = 2600;
    const fadeMs = 420;
    const total = displayMs + fadeMs;

    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % roles.length);
        setVisible(true);
      }, fadeMs);
    }, total);

    return () => clearInterval(interval);
  }, [roles.length, prefersReducedMotion]);

  // Close drawer on Esc
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setNavOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Persist theme in localStorage
  useEffect(() => {
    try {
      localStorage.setItem("hero-theme", darkMode ? "dark" : "light");
    } catch {}
    // Apply theme to body
    document.body.style.background = darkMode ? "#0b1220" : "#ffffff";
    document.body.style.color = darkMode ? "#ffffff" : "#0b1220";
  }, [darkMode]);

  return (
    <section className={`hero-root ${darkMode ? "dark" : ""}`} aria-label="Hero region">
      <style>{`
        :root {
          --bg-white: #ffffff;
          --text-dark: #0b1220;
          --text-light: #ffffff;
          --muted: rgba(11,18,32,0.7);
          --accent: #00f2fe;
          --accent2: #e00dacff;
        }

        .hero-root {
          background: var(--bg-white);
          color: var(--text-dark);
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding-top: 100px;
          transition: background .3s ease, color .3s ease;
        }

        .dark { background: var(--text-dark); color: var(--text-light); }

        /* Theme toggle button */
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
        .dark .theme-toggle { background: rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.3); color: #fff; }

        /* Topbar */
        .topbar {
          position: fixed;
          top:0; left:0; right:0;
          height:50px;
          display:flex;
          align-items:center;
          justify-content:space-between;
          padding:4px 16px;
          z-index:120;
          background: rgba(255,255,255,0.9);
          backdrop-filter: blur(6px);
          transition: background .3s ease;
        }
        .dark .topbar { background: rgba(11,18,32,0.9); }

        /* Hamburger */
        .hamburger { width:22px; height:14px; position:relative; display:inline-block; cursor:pointer; color: var(--text-dark); }
        .dark .hamburger { color: var(--text-light); }
        .hamburger span { position:absolute; left:0; right:0; height:2px; background: currentColor; border-radius:6px; transition: transform .28s, opacity .18s ease; }
        .hamburger span:nth-child(1){ top:60px }
        .hamburger span:nth-child(2){ top:66px }
        .hamburger span:nth-child(3){ top:72px }
        .hamburger.open span:nth-child(1){ transform: translateY(6px) rotate(45deg) }
        .hamburger.open span:nth-child(2){ opacity:0 }
        .hamburger.open span:nth-child(3){ transform: translateY(-6px) rotate(-45deg) }

        /* Drawer */
        .drawer { position: fixed; top:0; left:0; bottom:0; width:80%; max-width:320px; background: var(--bg-white); transform: translateX(-120%); transition: transform .42s; z-index:105; padding:18px; }
        .dark .drawer { background: var(--text-dark); color: var(--text-light); }
        .drawer.open { transform: translateX(0); }
        .drawer nav a { display:block; padding:12px 10px; margin-bottom:6px; color:var(--text-dark); text-decoration:none; border-radius:8px; transition: background .14s; }
        .dark .drawer nav a { color: var(--text-light); }
        .drawer nav a:hover { background: rgba(0,0,0,0.03) }

        .backdrop { position:fixed; inset:0; background: rgba(11,18,32,0.12); opacity:0; pointer-events:none; transition: opacity .28s ease; z-index:100; }
        .backdrop.show { opacity:1; pointer-events:auto; }

        /* Profile photo */
        .profile-wrap {
          width:200px; height:200px; border-radius:999px;
          display:grid; place-items:center;
          margin-bottom:24px;
          transition: box-shadow .4s ease;
        }
        .profile-wrap:hover { box-shadow: 0 24px 80px rgba(0,242,254,0.2); }
        .profile-photo { width:190px; height:190px; border-radius:999px; object-fit:cover; }

        /* Text content */
        .eyebrow { font-weight:700; font-size:2rem; color:var(--accent); text-align:center; margin:0 0 8px; }
        .hero-title { font-weight:900; font-size:3rem; text-align:center; margin:0; }
        .role-wrap { margin-top:8px; height:1.5em; position:relative; text-align:center; }
        .role { position:absolute; left:50%; transform:translateX(-50%); top:0; font-weight:700; font-size:1.6rem; color: var(--accent); opacity:0; transition: opacity 420ms ease, text-shadow 420ms ease; white-space:nowrap; }
        .role.visible { opacity:1; text-shadow: 0 8px 28px rgba(0,242,254,0.10), 0 0 40px rgba(170,8,97,0.06); }

        .hero-sub { max-width:600px; text-align:center; font-size:1rem; line-height:1.5; margin:16px auto; color:var(--muted); }
        .dark .hero-sub { color: #ddd; }

        .hero-cta { display:flex; gap:12px; justify-content:center; margin-top:16px; flex-wrap:wrap; }
        .btn { padding:10px 18px; border-radius:12px; font-weight:800; cursor:pointer; border:0; background: linear-gradient(90deg,var(--accent),var(--accent2)); color: white; transition: all 0.2s ease; }
        .btn.secondary { background: linear-gradient(90deg,var(--accent),var(--accent2)); color:white; }

        /* Social links */
        .hero-social { display:flex; gap:24px; justify-content:center; margin-top:32px; }
        .social-link { width:56px; height:56px; display:grid; place-items:center; border-radius:12px; background: rgba(2,6,23,0.02); color:var(--accent); transition: transform .18s, box-shadow .18s; }
        .social-link:hover { transform: translateY(-6px); box-shadow:0 16px 40px rgba(0,242,254,0.06); color:white; }

        @media(min-width:900px){
          .hero-root { padding-top:140px; }
          .hero-inner { display:flex; flex-direction:column; align-items:center; }
        }
      `}</style>

      {/* Hamburger */}
      <header className="topbar">
        <button
          className={`hamburger ${navOpen ? "open" : ""}`}
          aria-label="Menu"
          onClick={() => setNavOpen((s) => !s)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </header>

      {/* Theme toggle */}
      <button
        className="theme-toggle"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "☀️" : "🌙"}
      </button>

      {/* Drawer */}
      <div className={`drawer ${navOpen ? "open" : ""}`}>
        <strong style={{display:"block", marginBottom:12}}>Menu</strong>
        <nav>
          <a href="#home" onClick={()=>setNavOpen(false)}>Home</a>
          <a href="#projects" onClick={()=>setNavOpen(false)}>Projects</a>
          <a href="#about" onClick={()=>setNavOpen(false)}>About</a>
          <a href="#contact" onClick={()=>setNavOpen(false)}>Contact</a>
        </nav>
      </div>
      <div className={`backdrop ${navOpen ? "show" : ""}`} onClick={()=>setNavOpen(false)}/>

      {/* Profile */}
      <div className="profile-wrap">
        <img src="/images/profile.jpg" alt="Kayalvizhi profile" className="profile-photo"/>
      </div>

      {/* Name & roles */}
      <p className="eyebrow">Hi, my name is</p>
      <h1 className="hero-title">Kayalvizhi</h1>
      <div className="role-wrap" aria-live="polite" aria-atomic="true">
        {roles.map((r,i)=>(
          <span key={r.title} className={`role ${i===index&&visible?"visible":""}`}>{r.title}</span>
        ))}
      </div>

      {/* Description */}
      <p className="hero-sub">
        I build efficient backend solutions, automate workflows, and implement data pipelines using Python (Pandas, NumPy) and frameworks like Flask/Django.
        I analyze and interpret datasets to uncover insights and drive data-led decisions. Skilled in SQL, Python, Excel, Power BI, and Tableau.
      </p>

      {/* Buttons */}
      <div className="hero-cta">
        <button className="btn glow" onClick={()=>navigate("/projects")}>View Projects</button>
        <a className="btn secondary" href="/resume.pdf" target="_blank" rel="noreferrer">Download CV</a>
      </div>

      {/* Social icons */}
      <div className="hero-social">
        <a className="social-link" href="https://github.com/Kayalvizhi2004" target="_blank" rel="noreferrer">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5C5.73.5.75 5.48.75 11.77c0 4.94 3.2 9.13 7.64 10.61.56.1.76-.24.76-.53 0-.26-.01-1.12-.02-2.02-3.11.68-3.77-1.5-3.77-1.5-.51-1.3-1.25-1.64-1.25-1.64-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .17 1.56.98 1.56.98.9 1.54 2.36 1.1 2.93.84.09-.66.35-1.36.64-1.64-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.21 1.16-2.99-.12-.28-.5-1.42.11-2.95 0 0 .95-.3 3.12 1.15a10.8 10.8 0 0 1 2.84-.38c.96.01 1.93.13 2.84.38 2.16-1.45 3.11-1.15 3.11-1.15.62 1.53.24 2.67.12 2.95.72.78 1.16 1.77 1.16 2.99 0 4.3-2.62 5.24-5.11 5.52.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .29.2.64.77.53C19.06 20.9 22.25 16.7 22.25 11.77 22.25 5.48 17.27.5 12 .5z"/>
          </svg>
        </a>
        <a className="social-link" href="https://www.linkedin.com/in/kayalvizhi-neelanarayanan-2804at2004/" target="_blank" rel="noreferrer">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 24V7.98h5V24H0zm7.5 0h5V15.5c0-4.42 6-4.77 6 0V24h5V14.5c0-7.72-8.33-7.43-11-3.62V7.98h-5V24z"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
