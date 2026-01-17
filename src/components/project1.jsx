import React, { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Project1() {
  const [mounted, setMounted] = useState(false);

  // carousel state
  const screenshots = [
    { src: "/images/portfolio-1.png", alt: "Home / Hero section screenshot" },
    { src: "/images/portfolio-2.png", alt: "Projects grid and project cards screenshot" },
    { src: "/images/portfolio-3.png", alt: "Contact form and footer screenshot" },
  ];
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    startAutoplay();
    return stopAutoplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

   useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  function startAutoplay() {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % screenshots.length);
    }, 3500);
  }
  function stopAutoplay() {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }

  function goTo(i) {
    setIndex(i % screenshots.length);
  }

  function prev() {
    setIndex((i) => (i - 1 + screenshots.length) % screenshots.length);
  }
  function next() {
    setIndex((i) => (i + 1) % screenshots.length);
  }

  // keyboard navigation when carousel focused
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    function onKey(e) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    }
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, []);

  const { theme } = useContext(ThemeContext);

  const mainStyle = { padding: "28px 20px", maxWidth: 1200, margin: "0 auto", background: theme === "dark" ? "#000" : "transparent" };

  return (
    <main style={mainStyle}>
      <style>{`
        :root {
          --accent1: #00f2fe;
          --accent2: #e00dacff;
          --glass: rgba(255,255,255,0.7);
        }

        .wrap {
          opacity:0;
          transform: translateY(18px);
          transition: opacity 520ms ease, transform 520ms cubic-bezier(.2,.9,.3,1);
        }
        .wrap.mounted { opacity:1; transform: translateY(0); }

        .back { display:inline-block; color:var(--accent1); font-weight:700; margin-bottom:14px; text-decoration:none; }

        .layout { display:grid; grid-template-columns: 1fr 440px; gap:28px; align-items:start; }
        @media (max-width:1020px) { .layout { grid-template-columns: 1fr; } }

        .left { }
        .title { font-size:2rem; margin:0 0 8px; color:#0b1220; }
        .subtitle { color:#475569; margin:0 0 14px; line-height:1.6; }

        .panel { background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(250,250,252,0.95)); border-radius:14px; padding:16px; box-shadow: 0 16px 46px rgba(8,12,20,0.06); border: 1px solid rgba(12,18,30,0.03); }

        /* metrics row */
        .metrics { display:flex; gap:16px; margin-top:12px; flex-wrap:wrap; }
        .metric {
          background: linear-gradient(90deg,#fff,#fbfdff);
          border-radius:10px; padding:10px 12px; min-width:120px;
          display:flex; flex-direction:column; gap:6px; align-items:flex-start;
          box-shadow: 0 8px 24px rgba(12,18,30,0.04);
          transform: translateY(6px); opacity:0; transition: transform 420ms cubic-bezier(.2,.9,.3,1), opacity 420ms ease;
        }
        .metric.visible { transform: translateY(0); opacity:1; }
        .metric .num { font-size:1.05rem; font-weight:800; color: #0b1220; }
        .metric .label { font-size:0.85rem; color:#6b7280; }

        /* carousel */
        .carousel { margin-top:14px; position:relative; border-radius:12px; overflow:hidden; }
        .carousel .viewport { position:relative; height: 320px; display:flex; align-items:center; justify-content:center; background: linear-gradient(180deg,#eef8ff,#f8f6fb); }
        .shot {
          width:100%; max-width:820px; height:300px; object-fit:cover; border-radius:10px;
          transform: scale(.98) translateY(6px); opacity:0; transition: transform 520ms cubic-bezier(.2,.9,.3,1), opacity 520ms ease, filter 480ms ease;
          box-shadow: 0 18px 48px rgba(8,12,24,0.08);
          border: 6px solid rgba(255,255,255,0.6);
          background: #f3f7fb;
        }
        .shot.active { transform: scale(1) translateY(0); opacity:1; filter:none; }

        /* Dark mode: full page black background and higher contrast */
        .wrap.dark { background: #000; color: #eaf6ff; }
        .wrap.dark .title, .wrap.dark .subtitle, .wrap.dark .chip { color: #eaf6ff; }
        .wrap.dark .panel { background: linear-gradient(180deg,#070707,#050505); border: 1px solid rgba(255,255,255,0.04); box-shadow: 0 26px 80px rgba(0,0,0,0.7); }
        .wrap.dark .btn { background: linear-gradient(90deg,#00f2fe,#e00dacff); color: #07101a; box-shadow: 0 12px 36px rgba(0,242,254,0.12); }
        .wrap.dark .carousel .viewport { background: linear-gradient(180deg,#040406,#071018); }

        /* Force higher contrast for small labels and chips (override inline styles) */
        .wrap.dark .chip { background: rgba(255,255,255,0.03); color: #eaf6ff !important; }
        .wrap.dark .techs .chip { background: rgba(255,255,255,0.03); color: #eaf6ff !important; }

        /* Make metric boxes slightly translucent and ensure text is bright and legible */
        .wrap.dark .metric { background: linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02)); box-shadow: 0 10px 30px rgba(0,0,0,0.6); }
        .wrap.dark .metric .num { color: #ffffff !important; font-weight:900; font-size:1.08rem; text-shadow: 0 2px 6px rgba(0,0,0,0.6) !important; }
        .wrap.dark .metric .label { color: #cbd5e1 !important; font-weight:600 !important; }

        .wrap.dark .meta-list div, .wrap.dark .meta-list .meta-item div div { color: #cbd5e1 !important; }

        /* Force feature title + description contrast in dark mode (override inline styles) */
        .wrap.dark .feature > div:nth-child(2) > div:first-child { color: #eaf6ff !important; font-weight:800 !important; }
        .wrap.dark .feature > div:nth-child(2) > div:last-child { color: #cbd5e1 !important; font-weight:600 !important; }

        /* Fallbacks: specifically target inline-styled title/description inside the feature container */
        .wrap.dark .feature > div:nth-child(2) > div[style]:first-child { color: #eaf6ff !important; font-weight:800 !important; }
        .wrap.dark .feature > div:nth-child(2) > div[style]:last-child { color: #cbd5e1 !important; font-weight:600 !important; }

        .carousel-controls {
          position:absolute; inset:auto 12px 12px auto; display:flex; gap:12px; right:12px; bottom:12px;
        }
        .ctrl {
          background: linear-gradient(90deg, rgba(255,255,255,0.92), rgba(255,255,255,0.96));
          border-radius:999px; padding:8px; display:inline-grid; place-items:center; cursor:pointer; border:1px solid rgba(12,18,30,0.04);
          box-shadow: 0 8px 18px rgba(8,12,20,0.06);
        }
        /* Dark mode – carousel control buttons */
.wrap.dark .ctrl {
  background: linear-gradient(180deg, #1a1a1a, #0a0a0a);
  color: #ffffff;
  border: 1px solid rgba(255,255,255,0.18);
  box-shadow: 0 10px 28px rgba(0,0,0,0.8);
}

/* Optional: subtle hover for better visibility */
.wrap.dark .ctrl:hover {
  background: linear-gradient(180deg, #222222, #0f0f0f);
}

        .ctrl:active { transform: translateY(2px); }

        .thumbs { display:flex; gap:8px; margin-top:10px; justify-content:flex-start; flex-wrap:wrap; }
        .thumb {
          width:92px; height:64px; object-fit:cover; border-radius:8px; cursor:pointer; opacity:0.7;
          border: 2px solid transparent; transition: transform 220ms ease, opacity 220ms ease, border-color 220ms ease;
         }
        .thumb:hover { transform: translateY(-4px); opacity:0.95; }
        .thumb.active { opacity:1; border-color: linear-gradient(90deg,var(--accent1),var(--accent2)); box-shadow: 0 10px 24px rgba(12,18,30,0.06); }

        /* Fix unordered list text contrast */
.wrap ul {
  color: #0b1220; /* dark text for LIGHT mode */
}

/* Dark mode keeps light text */
.wrap.dark ul {
  color: #e0eaf7ff;
}
        /* Fix list item text in LIGHT mode */
.wrap li {
  color: #0b1220; /* dark text for light mode */
}

/* Keep list item text light in DARK mode */
.wrap.dark li {
  color: #e0eaf7ff;
}

        /* right column */
        .right { position:relative; display:flex; flex-direction:column; gap:12px; }
        .techs { display:flex; gap:8px; flex-wrap:wrap; margin-top:6px; }
        .chip { padding:8px 10px; border-radius:999px; background: linear-gradient(90deg,#f6fbff,#f3f7fb); font-weight:700; color:#0b1220; }
        .features { margin-top:12px; display:grid; gap:20px; }
        /* Feature cards – LIGHT MODE */
        .feature {
            display:flex;
            gap:10px;
            align-items:flex-start;
            background: linear-gradient(180deg,#ffffff,#f8fafc);
            border-radius:10px;
            padding:10px;
            box-shadow: 0 10px 28px rgba(8,12,20,0.06);
            transform: translateY(6px);
            opacity:0;
            transition: all 420ms ease;
            color: #0b1220; /* dark text */
        }

/* Feature cards – DARK MODE */
.wrap.dark .feature {
  background: linear-gradient(180deg,#070707,#020202);
  box-shadow: 0 18px 60px rgba(0,0,0,0.75);
  border: 1px solid rgba(255,255,255,0.06);
  color: #ffffff; /* white text */
}

/* Feature title */
.feature > div:nth-child(2) > div:first-child {
  color: inherit;
  font-weight: 800;
}

/* Feature description */
.feature > div:nth-child(2) > div:last-child {
  color: inherit;
  opacity: 0.85;
  font-size: 13px;
}

        .feature.visible { transform: translateY(0); opacity:1; }
        .feature {transition: background 300ms ease, color 300ms ease, box-shadow 300ms ease;}

        .badge { width:36px; height:36px; border-radius:9px; display:grid; place-items:center; font-weight:800; color:#fff; background: linear-gradient(90deg, var(--accent1), var(--accent2)); }

        .cta-row { margin-top:12px; display:flex; gap:10px; }
        .btn { padding:10px 14px; border-radius:10px; background: linear-gradient(90deg,var(--accent1),var(--accent2)); color:#fff; font-weight:800; text-decoration:none; display:inline-flex; gap:8px; align-items:center; }

        /* small responsive tweaks */
        @media (max-width:720px) {
          .metrics { justify-content:space-between; }
          .shot { height:220px; }
        }

        /* reduce motion */
        @media (prefers-reduced-motion: reduce) {
          .wrap, .metric, .feature, .shot { transition: none !important; transform: none !important; opacity: 1 !important; }
        }
      `}</style>

      <div className={`wrap ${mounted ? "mounted" : ""} ${theme === "dark" ? "dark" : ""}`}>
        <Link to="/" state={{ scrollTo: "projects" }} className="back">← Back to Projects</Link>

        <div className="layout" >
          <div className="left">
            <h1 className="title">Portfolio Website</h1>
            <p className="subtitle">
              A polished, responsive personal portfolio built with React. It highlights projects, includes an animated hero, a project details section, and a contact form that can send messages. Designed for accessibility, performance and to present data & ML work clearly.
            </p>

            {/* metrics */}
            <div className="metrics" aria-hidden="true">
              <div className={`metric ${mounted ? "visible" : ""}`} style={{ transitionDelay: "120ms" }}>
                <div className="num">3+</div>
                <div className="label">Projects showcased</div>
              </div>
              <div className={`metric ${mounted ? "visible" : ""}`} style={{ transitionDelay: "220ms" }}>
                <div className="num">100ms</div>
                <div className="label">Hero animation latency (perf tuned)</div>
              </div>
              <div className={`metric ${mounted ? "visible" : ""}`} style={{ transitionDelay: "320ms" }}>
                <div className="num">Accessible</div>
                <div className="label">Keyboard + screen reader friendly</div>
              </div>
            </div>

            {/* carousel */}
            <div
              className="carousel panel"
              onMouseEnter={stopAutoplay}
              onMouseLeave={startAutoplay}
              ref={carouselRef}
              tabIndex={0}
              aria-roledescription="carousel"
              aria-label="Portfolio screenshots"
            >
              <div className="viewport" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                {screenshots.map((s, i) => (
                  <img
                    key={s.src}
                    src={s.src}
                    alt={s.alt}
                    className={`shot ${i === index ? "active" : ""}`}
                    style={{ position: i === index ? "relative" : "absolute", left: 0, right: 0 }}
                    aria-hidden={i === index ? "false" : "true"}
                  />
                ))}
              </div>

              <div className="carousel-controls" aria-hidden="true">
                <div className="ctrl" onClick={prev} title="Previous screenshot" aria-label="Previous screenshot">◀</div>
                <div className="ctrl" onClick={next} title="Next screenshot" aria-label="Next screenshot">▶</div>
              </div>

              <div style={{ padding: 12 }}>
                <div className="thumbs" role="tablist" aria-label="Screenshot thumbnails">
                  {screenshots.map((s, i) => (
                    <img
                      key={s.src}
                      src={s.src}
                      alt={s.alt}
                      className={`thumb ${i === index ? "active" : ""}`}
                      onClick={() => goTo(i)}
                      role="tab"
                      aria-selected={i === index}
                      tabIndex={0}
                      onKeyDown={(e) => (e.key === "Enter" ? goTo(i) : null)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* more detail */}
            <div style={{ marginTop: 18 }}>
              <h3 style={{ margin: "6px 0"}}>What I built</h3>
              <ul style={{ color: "#e0eaf7ff", lineHeight: 1.7 }}>
                <li>Responsive layout with animated hero and smooth micro-interactions.</li>
                <li>Projects grid with dedicated detail pages (this page) and easy content updates.</li>
                <li>Contact form with client-side validation — pluggable to EmailJS or a server endpoint.</li>
                <li>Accessible keyboard support, aria attributes and reduced-motion respect.</li>
              </ul>
            </div>

          </div>

          <aside className="right">
            <div className="panel">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong style={{ fontSize: 16 }}>Tech & Tools</strong>
                <span style={{ color: "#6b7280", fontSize: 13 }}>Frontend · Design</span>
              </div>
              <div className="techs" aria-hidden="true" style={{ marginTop: 12 }}>
                <span className="chip">React</span>
                <span className="chip">React Router</span>
                <span className="chip">CSS</span>
                <span className="chip">Nodemailer</span>
              </div>

              <div className="features">
                <div className={`feature ${mounted ? "visible" : ""}`} style={{ transitionDelay: "120ms" }}>
                  <div className="badge">⚡</div>
                  <div>
                    <div style={{ fontWeight: 800 }}>Performance</div>
                    <div style={{ color: "#484d57ff", fontSize: 13 }}>Lazy images, small bundle, smooth 60fps animations</div>
                  </div>
                </div>

                <div className={`feature ${mounted ? "visible" : ""}`} style={{ transitionDelay: "220ms" }}>
                  <div className="badge">🔒</div>
                  <div>
                    <div style={{ fontWeight: 800 }}>Secure contact</div>
                    <div style={{ color: "#484d57ff", fontSize: 13 }}>Option to send via server backend (recommended) to protect keys</div>
                  </div>
                </div>

                <div className={`feature ${mounted ? "visible" : ""}`} style={{ transitionDelay: "320ms" }}>
                  <div className="badge">🧭</div>
                  <div>
                    <div style={{ fontWeight: 800 }}>Accessible</div>
                    <div style={{ color: "#484d57ff", fontSize: 13 }}>Keyboard navigation, aria labels and reduced-motion handling</div>
                  </div>
                </div>
              </div>

              <div className="cta-row">
                <a className="btn" href="#demo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 900, behavior: "smooth" }); }}>
                  Live Demo
                </a>
                <a className="btn" href="https://github.com/Kayalvizhi2004/Portfolio-Website" target="_blank" rel="noreferrer">View Repo</a>
              </div>
            </div>

            {/* short changelog / notes */}
           
          </aside>
        </div>
      </div>
    </main>
  );
}
