import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function Project4() {
  const [mounted, setMounted] = useState(false);
  const screenshots = [
    { src: "/images/typing-1.png", alt: "Typing game main screen" },
    { src: "/images/typing-2.png", alt: "Typing in progress screenshot" },
    { src: "/images/typing-3.png", alt: "Result screen showing WPM and accuracy" },
  ];
  const [index, setIndex] = useState(0);
  const autoplayRef = useRef(null);
  const carouselRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    startAutoplay();
    return stopAutoplay;
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

  return (
    <main style={{ padding: "28px 20px", maxWidth: 1200, margin: "0 auto" }}>
      <style>{`
        :root {
          --accent1: #00f2fe;
          --accent2: #a933d8;
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
        .title { font-size:1.8rem; margin:0 0 8px; color:#0b1220; }
        .subtitle { color:#475569; margin:0 0 14px; line-height:1.6; }

        .panel { background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(250,250,252,0.95)); border-radius:14px; padding:16px; box-shadow: 0 16px 46px rgba(8,12,20,0.06); border: 1px solid rgba(12,18,30,0.03); }

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

        .carousel-controls {
          position:absolute; inset:auto 12px 12px auto; display:flex; gap:12px; right:12px; bottom:12px;
        }
        .ctrl {
          background: linear-gradient(90deg, rgba(255,255,255,0.92), rgba(255,255,255,0.96));
          border-radius:999px; padding:8px; display:inline-grid; place-items:center; cursor:pointer; border:1px solid rgba(12,18,30,0.04);
          box-shadow: 0 8px 18px rgba(8,12,20,0.06);
        }
        .ctrl:active { transform: translateY(2px); }

        .thumbs { display:flex; gap:8px; margin-top:10px; justify-content:flex-start; flex-wrap:wrap; }
        .thumb {
          width:92px; height:64px; object-fit:cover; border-radius:8px; cursor:pointer; opacity:0.7;
          border: 2px solid transparent; transition: transform 220ms ease, opacity 220ms ease, border-color 220ms ease;
        }
        .thumb:hover { transform: translateY(-4px); opacity:0.95; }
        .thumb.active { opacity:1; border-color: linear-gradient(90deg,var(--accent1),var(--accent2)); box-shadow: 0 10px 24px rgba(12,18,30,0.06); }

        .right { position:relative; display:flex; flex-direction:column; gap:12px; }
        .techs { display:flex; gap:8px; flex-wrap:wrap; margin-top:6px; }
        .chip { padding:8px 10px; border-radius:999px; background: linear-gradient(90deg,#f6fbff,#f3f7fb); font-weight:700; color:#0b1220; }
        .features { margin-top:12px; display:grid; gap:10px; }
        .feature {
          display:flex; gap:10px; align-items:flex-start; background: linear-gradient(180deg,#fff,#fbfdff);
          border-radius:10px; padding:10px; box-shadow: 0 10px 28px rgba(8,12,20,0.04); transform: translateY(6px); opacity:0; transition: all 420ms ease;
        }
        .feature.visible { transform: translateY(0); opacity:1; }
        .badge { width:36px; height:36px; border-radius:9px; display:grid; place-items:center; font-weight:800; color:#fff; background: linear-gradient(90deg, var(--accent1), var(--accent2)); }

        .cta-row { margin-top:12px; display:flex; gap:10px; }
        .btn { padding:10px 14px; border-radius:10px; background: linear-gradient(90deg,var(--accent1),var(--accent2)); color:#fff; font-weight:800; text-decoration:none; display:inline-flex; gap:8px; align-items:center; }

        @media (max-width:720px) {
          .metrics { justify-content:space-between; }
          .shot { height:220px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .wrap, .metric, .feature, .shot { transition: none !important; transform: none !important; opacity: 1 !important; }
        }
      `}</style>

      <div className={`wrap ${mounted ? "mounted" : ""}`}>
        <Link to="/projects" className="back">← Back to Projects</Link>

        <div className="layout" >
          <div className="left">
            <h1 className="title">Typing Speed Game</h1>
            <p className="subtitle">
              A fun, interactive typing game with real-time WPM & accuracy calculation. Includes particle & emoji effects for motivation and smooth animations.
            </p>

            <div className="metrics" aria-hidden="true">
              <div className={`metric ${mounted ? "visible" : ""}`} style={{ transitionDelay: "120ms" }}>
                <div className="num">WPM</div>
                <div className="label">Calculated in real-time</div>
              </div>
              <div className={`metric ${mounted ? "visible" : ""}`} style={{ transitionDelay: "220ms" }}>
                <div className="num">Accuracy</div>
                <div className="label">Instant feedback on errors</div>
              </div>
              <div className={`metric ${mounted ? "visible" : ""}`} style={{ transitionDelay: "320ms" }}>
                <div className="num">Fun</div>
                <div className="label">Particles & emojis on correct words</div>
              </div>
            </div>

            <div
              className="carousel panel"
              onMouseEnter={stopAutoplay}
              onMouseLeave={startAutoplay}
              ref={carouselRef}
              tabIndex={0}
              aria-roledescription="carousel"
              aria-label="Typing game screenshots"
            >
              <div className="viewport">
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
                <div className="ctrl" onClick={prev}>◀</div>
                <div className="ctrl" onClick={next}>▶</div>
              </div>

              <div style={{ padding: 12 }}>
                <div className="thumbs" role="tablist">
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
              <h3 style={{ margin: "6px 0" }}>Game Features</h3>
              <ul style={{ color: "#475569", lineHeight: 1.7 }}>
                <li>Real-time WPM & accuracy tracking.</li>
                <li>Random phrases for unlimited practice.</li>
                <li>Interactive particle & emoji effects.</li>
                <li>Responsive & keyboard-friendly design.</li>
                <li>Smooth micro-interactions and animations.</li>
              </ul>
            </div>
          </div>

          <aside className="right">
            <div className="panel">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <strong style={{ fontSize: 16 }}>Tech & Tools</strong>
                <span style={{ color: "#6b7280", fontSize: 13 }}>Frontend · Animation</span>
              </div>
              <div className="techs" aria-hidden="true">
                <span className="chip">React</span>
                <span className="chip">Emojisplosion</span>
                <span className="chip">tsparticles</span>
                <span className="chip">CSS Animations</span>
              </div>

              <div style={{ marginTop: 10 }}>
                <div className={`feature ${mounted ? "visible" : ""}`} style={{ transitionDelay: "120ms" }}>
                  <div className="badge">⚡</div>
                  <div>
                    <div style={{ fontWeight: 800 }}>Fast & Interactive</div>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>Smooth typing experience with instant feedback.</div>
                  </div>
                </div>

                <div className={`feature ${mounted ? "visible" : ""}`} style={{ transitionDelay: "220ms" }}>
                  <div className="badge">🎯</div>
                  <div>
                    <div style={{ fontWeight: 800 }}>Accuracy</div>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>Highlights mistakes in real-time.</div>
                  </div>
                </div>

                <div className={`feature ${mounted ? "visible" : ""}`} style={{ transitionDelay: "320ms" }}>
                  <div className="badge">✨</div>
                  <div>
                    <div style={{ fontWeight: 800 }}>Animations</div>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>Particles & emojis for motivation & fun.</div>
                  </div>
                </div>
              </div>

              <div className="cta-row">
                <a className="btn" href="#demo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 900, behavior: "smooth" }); }}>Live Demo</a>
                <a className="btn" href="https://github.com/Kayalvizhi2004/Typing-Speed-Game" target="_blank" rel="noreferrer">View Repo</a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
