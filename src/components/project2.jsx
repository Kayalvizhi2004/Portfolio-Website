import React, { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Project2() {
  const [mounted, setMounted] = useState(false);

  // Replace these with your actual dashboard screenshots
  const screenshots = [
    { src: "/images/Dashboard.png", alt: "Overview dashboard - vote share trends" },
    { src: "/images/Empathy Map.png", alt: "Constituency empathy map" },
    { src: "/images/Brainstorming Map.png", alt: "Election-level analysis - brainstorming map" },
  ];

  const [index, setIndex] = useState(0);
  const autoplayRef = useRef(null);
  const carouselRef = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    // mount animation
    setMounted(true);

    // autoplay (respect reduced-motion)
    const mq = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq || !mq.matches) startAutoplay();

    // keyboard shortcuts for slide nav + close
    function onKey(e) {
      if (lightboxOpen && e.key === "Escape") return setLightboxOpen(false);
      if (e.key === "ArrowLeft") return prev();
      if (e.key === "ArrowRight") return next();
    }
    window.addEventListener("keydown", onKey);
    return () => {
      stopAutoplay();
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxOpen]);
  
  useEffect(() => {
  window.scrollTo(0, 0);
}, []);

  function startAutoplay() {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % screenshots.length);
    }, 3800);
  }
  function stopAutoplay() {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  }

  function goTo(i) {
    setIndex(((i % screenshots.length) + screenshots.length) % screenshots.length);
  }
  function prev() {
    setIndex((i) => (i - 1 + screenshots.length) % screenshots.length);
  }
  function next() {
    setIndex((i) => (i + 1) % screenshots.length);
  }
  function openLightbox(i) {
    setIndex(i);
    setLightboxOpen(true);
    stopAutoplay();
  }
  function closeLightbox() {
    setLightboxOpen(false);
    startAutoplay();
  }

  const { theme } = useContext(ThemeContext);

  const mainStyle = { padding: "28px 20px", maxWidth: 1200, margin: "0 auto", background: theme === "dark" ? "#000" : "transparent" };

  return (
    <main style={mainStyle}>
      <style>{`
        :root { --accent1:#00f2fe; --accent2:#e00dacff; }

        .wrap { opacity:0; transform: translateY(18px); transition: all 520ms cubic-bezier(.2,.9,.3,1); }
        .wrap.mounted { opacity:1; transform: translateY(0); }

        .back { display:inline-block; color:var(--accent1); font-weight:700; margin-bottom:12px; text-decoration:none; }

        .grid { display:grid; grid-template-columns: 1fr 420px; gap:26px; align-items:start; }
        @media (max-width:1020px) { .grid { grid-template-columns: 1fr; } }

        .title { font-size:2rem; margin:0 0 6px; color:#0b1220; }
        .lead { color:#475569; line-height:1.6; margin:0 0 12px; }

        .panel { background:linear-gradient(180deg,#fff,#fbfdff); border-radius:12px; padding:14px; box-shadow:0 14px 36px rgba(12,18,30,0.06); border:1px solid rgba(12,18,30,0.03); }

        /* KPI row */
        .kpis { display:flex; gap:12px; margin-top:8px; flex-wrap:wrap; }
        .kpi { padding:10px 12px; border-radius:10px; background:linear-gradient(90deg,#fff,#fbfdff); box-shadow:0 8px 20px rgba(12,18,30,0.04); min-width:140px; transform: translateY(6px); opacity:0; transition: all 420ms ease; }
        .kpi.visible { transform: translateY(0); opacity:1; }
        .kpi .num { font-weight:800; color:#0b1220; font-size:1.05rem; }
        .kpi .lbl { color:#6b7280; font-size:0.9rem; }

        .wrap.dark .kpi { background: linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02)); box-shadow: 0 10px 30px rgba(0,0,0,0.6); }
        .wrap.dark .kpi .num { color: #ffffff !important; font-weight:900; font-size:1.08rem; text-shadow: 0 2px 6px rgba(0,0,0,0.6) !important; }
        .wrap.dark .kpi .label { color: #cbd5e1 !important; font-weight:600 !important; }

        /* carousel */
        .carousel { margin-top:14px; border-radius:10px; overflow:hidden; position:relative; }
        .viewport { height:300px; display:flex; align-items:center; justify-content:center; background:linear-gradient(180deg,#eef6ff,#f7f6fb); position:relative; }
        .shot {
          width:100%; max-width:860px; height:260px; object-fit:cover; border-radius:8px;
          transform: scale(.98) translateY(6px); opacity:0; transition: transform 520ms cubic-bezier(.2,.9,.3,1), opacity 520ms ease, filter 360ms ease;
          box-shadow: 0 16px 44px rgba(8,12,24,0.08);
        }
        .shot.active { transform:scale(1) translateY(0); opacity:1; filter:none; }

        .carousel-controls { position:absolute; right:12px; bottom:12px; display:flex; gap:8px; }
        .ctrl { background: rgba(255,255,255,0.9); border-radius:999px; padding:8px; cursor:pointer; box-shadow:0 8px 18px rgba(8,12,20,0.06); }
        
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
        .thumbs { display:flex; gap:8px; margin-top:10px; flex-wrap:wrap; }
        .thumb { width:96px; height:64px; object-fit:cover; border-radius:6px; cursor:pointer; opacity:0.76; border:2px solid transparent; transition: transform 220ms ease, opacity 220ms ease, border-color 220ms ease; }
        .thumb:hover { transform: translateY(-4px); opacity:0.95; }
        .thumb.active { opacity:1; border-color: rgba(0,0,0,0.06); box-shadow:0 10px 26px rgba(0,0,0,0.06); }

        /* Dark mode: full page black background and higher contrast */
        .wrap.dark { background: #000; color: #eaf6ff; }
        .wrap.dark .title, .wrap.dark .lead, .wrap.dark .kpi .num, .wrap.dark .chip { color: #eaf6ff; }
        .wrap.dark .panel { background: linear-gradient(180deg,#070707,#030303); border: 1px solid rgba(255,255,255,0.04); box-shadow: 0 26px 80px rgba(0,0,0,0.7); }
        .wrap.dark .btn { background: linear-gradient(90deg,#00f2fe,#e00dacff); color: #07101a; box-shadow: 0 12px 36px rgba(0,242,254,0.12); }
        .wrap.dark .viewport { background: linear-gradient(180deg,#03040a,#071018); }
        /* Ensure chips, KPI labels and meta text are readable in dark mode */
        .wrap.dark .chip { background: rgba(255,255,255,0.03); color: #eaf6ff !important; }
        .wrap.dark .kpi .lbl { color: #cbd5e1 !important; }
        .wrap.dark .kpi .num { color: #e6fbff !important; }
        .wrap.dark .meta-list div, .wrap.dark .meta-list .meta-item div div { color: #cbd5e1 !important; }

        /* List items – light mode (no change) */
li {
  color: inherit;
}

/* List items – dark mode */
.dark li {
  color: #e5e7eb;              /* light gray */
}

/* Bullet color fix */
.dark li::marker {
  color: #9ca3af;
}


        /* right column */
        .right { display:flex; flex-direction:column; gap:12px; }
        .meta-list { list-style:none; padding:0; margin:0; display:grid; gap:8px; }
        .meta-item { display:flex; gap:10px; align-items:flex-start; }
        .badge { width:36px; height:36px; border-radius:8px; display:grid; place-items:center; color:white; background: linear-gradient(90deg,var(--accent1),var(--accent2)); font-weight:800; }

        .techs { display:flex; gap:8px; flex-wrap:wrap; margin-top:6px; }
        .chip { padding:6px 8px; border-radius:999px; background:#eef6fb; font-weight:700; color:#0b1220; }

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



        .cta { margin-top:10px; display:flex; gap:8px; }
        .btn { padding:10px 12px; border-radius:10px; background: linear-gradient(90deg,var(--accent1),var(--accent2)); color:white; font-weight:800; text-decoration:none; }

        /* lightbox */
        .lightbox {
          position:fixed; inset:0; display:grid; place-items:center; background: rgba(4,6,16,0.72);
          z-index:2000; padding:24px;
        }
        .lightbox img { max-width:100%; max-height:88vh; border-radius:8px; box-shadow:0 30px 80px rgba(2,6,23,0.6); transform:scale(.98); opacity:0; transition: transform 360ms ease, opacity 360ms ease; }
        .lightbox img.open { transform:scale(1); opacity:1; }

        /* reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .wrap, .kpi, .shot, .feature, .metric { transition: none !important; transform: none !important; opacity:1 !important;}
        }
      `}</style>

      <div className={`wrap ${mounted ? "mounted" : ""} ${theme === "dark" ? "dark" : ""}`}>
        <Link to="/" state={{ scrollTo: "projects" }} className="back">← Back to Projects</Link>

        <div className="grid">
          <div>
            <h1 className="title">Political Juggernauts — 2019 Lok Sabha Quantitative Analysis</h1>

            <p className="lead">
              Deep exploratory analysis and interactive dashboards built to understand candidate-level
              performance, vote-share shifts, and regional trends in the 2019 Lok Sabha election.
              Delivered as a set of Tableau dashboards plus analysis notebooks for reproducible preprocessing.
            </p>

            <div className="kpis" aria-hidden="true">
              <div className={`kpi ${mounted ? "visible" : ""}`} style={{ transitionDelay: "120ms" }}>
                <div className="num">3</div>
                <div className="lbl">Datasets combined</div>
              </div>
              <div className={`kpi ${mounted ? "visible" : ""}`} style={{ transitionDelay: "220ms" }}>
                <div className="num">3+</div>
                <div className="lbl">Interactive dashboards</div>
              </div>
              <div className={`kpi ${mounted ? "visible" : ""}`} style={{ transitionDelay: "320ms" }}>
                <div className="num">100k+</div>
                <div className="lbl">Rows processed</div>
              </div>
            </div>

            <div className="carousel panel" onMouseEnter={stopAutoplay} onMouseLeave={startAutoplay} aria-roledescription="carousel">
              <div className="viewport" ref={carouselRef}>
                {screenshots.map((s, i) => (
                  <img
                    key={s.src}
                    src={s.src}
                    alt={s.alt}
                    className={`shot ${i === index ? "active" : ""}`}
                    style={{ position: i === index ? "relative" : "absolute", left: 0, right: 0 }}
                    aria-hidden={i === index ? "false" : "true"}
                    onClick={() => openLightbox(i)}
                  />
                ))}
              </div>

              <div className="carousel-controls" aria-hidden="true">
                <div className="ctrl" onClick={prev} aria-label="Previous screenshot" title="Previous">◀</div>
                <div className="ctrl" onClick={next} aria-label="Next screenshot" title="Next">▶</div>
              </div>

              <div style={{ padding: 12 }}>
                <div className="thumbs" role="tablist" aria-label="Screenshots">
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

            <div style={{ marginTop: 18 }}>
              <h3>Approach & Pipeline</h3>
              <ol style={{ color: "#475569", lineHeight: 1.7 }}>
                <li>Data ingestion: collected constituency results, candidate metadata, and demographic layers (CSV, scraped sources).</li>
                <li>Cleaning & enrichment: standardized party/candidate names, engineered features (incumbency, margin, swing), and merged external demographic attributes.</li>
                <li>Analysis: candidate-level regressions, vote-share trend analysis, and cluster-based constituency grouping.</li>
                <li>Visualization: built interactive Tableau dashboards with filters (state, party, candidate) and storytelling sheets for insights.</li>
              </ol>
            </div>
          </div>

          <aside className="right">
            <div className="panel">
              <strong style={{ display: "block", marginBottom: 6 }}>Project Summary</strong>

              <div className="techs" aria-hidden="true" style={{ marginTop: 12 }}>
                <span className="chip">Tableau</span>
                <span className="chip">Mural</span>
              </div>

              <div className="features">
  <div className={`feature ${mounted ? "visible" : ""}`} style={{ transitionDelay: "120ms" }}>
    <div className="badge">📂</div>
    <div>
      <div style={{ fontWeight: 800 }}>Data</div>
      <div style={{ fontSize: 13 }}>
        Election results, candidate CSV files, demographic datasets
      </div>
    </div>
  </div>

  <div className={`feature ${mounted ? "visible" : ""}`} style={{ transitionDelay: "220ms" }}>
    <div className="badge">🛠️</div>
    <div>
      <div style={{ fontWeight: 800 }}>Tools</div>
      <div style={{ fontSize: 13 }}>
        Tableau dashboards, Mural for exploratory mapping
      </div>
    </div>
  </div>

  <div className={`feature ${mounted ? "visible" : ""}`} style={{ transitionDelay: "320ms" }}>
    <div className="badge">🎯</div>
    <div>
      <div style={{ fontWeight: 800 }}>Deliverables</div>
      <div style={{ fontSize: 13 }}>
        Interactive dashboards, analysis notebooks, final report
      </div>
    </div>
  </div>
</div>

              <div className="cta" style={{ marginTop: 12 }}>
                <a className="btn" href="https://public.tableau.com/app/profile/kayalvizhi.n3009/viz/Book2_16965212567800/Dashboard1" target="_blank" rel="noopener noreferrer">
  View Dashboard
</a>

                <a className="btn" href="/datasets.csv" target="_blank" rel="noreferrer">Download Dataset</a>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot preview"
          onClick={closeLightbox}
        >
          <div style={{ position: "relative" }}>
            <img src={screenshots[index].src} alt={screenshots[index].alt} className={`open`} />
            <div style={{ position: "absolute", right: -8, top: -8 }}>
              <button
                onClick={(e) => { e.stopPropagation(); closeLightbox(); }}
                style={{
                  background: "rgba(255,255,255,0.95)",
                  borderRadius: 8,
                  padding: 8,
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 8px 18px rgba(0,0,0,0.12)"
                }}
                aria-label="Close preview"
              >
                ✕
              </button>
            </div>
            {/* lightbox nav */}
            <div style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)" }}>
              <button onClick={(e) => { e.stopPropagation(); prev(); }} aria-label="Previous" style={lightboxBtnStyle}>◀</button>
            </div>
            <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)" }}>
              <button onClick={(e) => { e.stopPropagation(); next(); }} aria-label="Next" style={lightboxBtnStyle}>▶</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

/* inline style for lightbox nav buttons to keep code tidy */
const lightboxBtnStyle = {
  background: "rgba(255,255,255,0.9)",
  borderRadius: 8,
  padding: 10,
  border: "none",
  cursor: "pointer",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
};
