import React, { useEffect, useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Project1() {
  const [mounted, setMounted] = useState(false);
  const [index, setIndex] = useState(0);

  const autoplayRef = useRef(null);
  const carouselRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const { theme } = useContext(ThemeContext);

  const screenshots = [
    { src: "/images/portfolio-1.png", alt: "Hero section" },
    { src: "/images/portfolio-2.png", alt: "Projects section" },
    { src: "/images/portfolio-3.png", alt: "Contact section" },
  ];

  useEffect(() => {
    setMounted(true);
    window.scrollTo(0, 0);
    startAutoplay();
    return stopAutoplay;
    // eslint-disable-next-line
  }, []);

  function startAutoplay() {
    stopAutoplay();
    autoplayRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % screenshots.length);
    }, 3500);
  }

  function stopAutoplay() {
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }

  function next() {
    setIndex((i) => (i + 1) % screenshots.length);
  }

  function prev() {
    setIndex((i) => (i - 1 + screenshots.length) % screenshots.length);
  }

  function goTo(i) {
    setIndex(i);
  }

  /* ---------- Swipe support ---------- */
  function onTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchMove(e) {
    touchEndX.current = e.touches[0].clientX;
  }
  function onTouchEnd() {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  }

  return (
    <main className={`page ${theme}`}>
      <style>{`
        :root {
          --accent1:#00f2fe;
          --accent2:#e00dac;
          --bg-light:#f7f9fc;
          --bg-dark:#000;
          --card-light:#ffffff;
          --card-dark:#0b0b0b;
          --text-light:#0b1220;
          --text-dark:#eaf6ff;
        }

        /* ---------- PAGE ---------- */
        .page {
          min-height:100vh;
          padding:28px 20px;
          background:var(--bg-light);
          color:var(--text-light);
        }
        .page.dark {
          background:var(--bg-dark);
          color:var(--text-dark);
        }

        .wrap {
          max-width:1200px;
          margin:auto;
          opacity:0;
          transform:translateY(18px);
          transition:.5s ease;
        }
        .wrap.mounted { opacity:1; transform:none; }

        .back {
          color:var(--accent1);
          font-weight:700;
          text-decoration:none;
          display:inline-block;
          margin-bottom:16px;
        }

        /* ---------- LAYOUT ---------- */
        .layout {
          display:grid;
          grid-template-columns:1fr 440px;
          gap:28px;
        }
        @media(max-width:1020px){
          .layout{grid-template-columns:1fr;}
        }

        /* ---------- TEXT ---------- */
        h1 { margin:0 0 8px; }
        .subtitle { opacity:.85; line-height:1.6; }

        /* ---------- METRICS ---------- */
        .metrics {
          display:flex;
          gap:16px;
          margin-top:14px;
          flex-wrap:wrap;
        }
        .metric {
          background:var(--card-light);
          padding:12px;
          border-radius:10px;
          min-width:140px;
          box-shadow:0 8px 24px rgba(0,0,0,.06);
          opacity:0;
          transform:translateY(8px);
          transition:.4s ease;
        }
        .page.dark .metric {
          background:var(--card-dark);
          box-shadow:0 10px 30px rgba(0,0,0,.8);
        }
        .metric.visible { opacity:1; transform:none; }
        .metric .num { font-weight:900; }
        .metric .label { font-size:.85rem; opacity:.7; }

        /* ---------- CAROUSEL ---------- */
        .carousel {
          margin-top:18px;
          border-radius:12px;
          overflow:hidden;
          position:relative;
        }

        .viewport {
          aspect-ratio:16/9;
          background:linear-gradient(180deg,#eef8ff,#f8f6fb);
          display:flex;
          justify-content:center;
          align-items:center;
        }
        .page.dark .viewport {
          background:linear-gradient(180deg,#040406,#071018);
        }

        .shot {
          width:100%;
          max-width:820px;
          aspect-ratio:16/9;
          object-fit:cover;
          border-radius:10px;
          position:absolute;
          opacity:0;
          transition:.5s ease;
          box-shadow:0 18px 48px rgba(0,0,0,.2);
        }
        .shot.active {
          position:relative;
          opacity:1;
        }

        .carousel-controls {
          position:absolute;
          bottom:12px;
          right:12px;
          display:flex;
          gap:10px;
        }
        .ctrl {
          background:#fff;
          border-radius:999px;
          padding:8px;
          cursor:pointer;
          user-select:none;
        }
        .page.dark .ctrl {
          background:#111;
          color:#fff;
        }

        .thumbs {
          display:flex;
          gap:8px;
          margin-top:12px;
          flex-wrap:wrap;
        }
        .thumb {
          width:92px;
          height:64px;
          object-fit:cover;
          border-radius:8px;
          opacity:.6;
          cursor:pointer;
        }
        .thumb.active { opacity:1; }

        /* ---------- RIGHT PANEL ---------- */
        .panel {
          background:var(--card-light);
          padding:16px;
          border-radius:14px;
          box-shadow:0 16px 46px rgba(0,0,0,.08);
        }
        .page.dark .panel {
          background:var(--card-dark);
          box-shadow:0 18px 60px rgba(0,0,0,.9);
        }

        .techs {
          display:flex;
          gap:8px;
          flex-wrap:wrap;
          margin-top:10px;
        }
        .chip {
          padding:8px 10px;
          border-radius:999px;
          font-weight:700;
          background:#f3f7fb;
        }
        .page.dark .chip {
          background:rgba(255,255,255,.08);
        }

        .features {
          display:grid;
          gap:14px;
          margin-top:14px;
        }
        .feature {
          display:flex;
          gap:10px;
          padding:12px;
          border-radius:10px;
          background:#f8fafc;
          opacity:0;
          transform:translateY(6px);
          transition:.4s ease;
        }
        .page.dark .feature {
          background:#050505;
        }
        .feature.visible { opacity:1; transform:none; }

        .badge {
          width:36px;
          height:36px;
          border-radius:8px;
          display:grid;
          place-items:center;
          background:linear-gradient(90deg,var(--accent1),var(--accent2));
          color:#fff;
        }

        .cta-row {
          display:flex;
          gap:10px;
          margin-top:12px;
        }
        .btn {
          flex:1;
          padding:10px;
          border-radius:10px;
          text-align:center;
          text-decoration:none;
          font-weight:800;
          color:#fff;
          background:linear-gradient(90deg,var(--accent1),var(--accent2));
        }

        /* ---------- MOBILE ONLY ---------- */
        @media(max-width:480px){
          .viewport,.shot { aspect-ratio:4/3; }
          .thumb { width:70px; height:48px; }
          .thumbs { justify-content:center; }
          .metrics { justify-content:center; }
          .metric { width:100%; text-align:center; }
          .cta-row { flex-direction:column; }
        }

        @media(prefers-reduced-motion:reduce){
          *{transition:none!important;}
        }
      `}</style>

      <div className={`wrap ${mounted ? "mounted" : ""}`}>
         <Link to="/" state={{ scrollTo: "projects" }} className="back">← Back to Projects</Link>
        <div className="layout">
          {/* LEFT */}
          <div>
            <h1>Portfolio Website</h1>
            <p className="subtitle">
              A polished, responsive personal portfolio built with React,
              showcasing projects, animations, accessibility and performance.
            </p>

            <div className="metrics">
              {[
                ["3+", "Projects showcased"],
                ["100ms", "Hero animation latency"],
                ["Accessible", "Keyboard & screen reader friendly"],
              ].map((m, i) => (
                <div key={i} className={`metric ${mounted ? "visible" : ""}`} style={{ transitionDelay: `${i * 120}ms` }}>
                  <div className="num">{m[0]}</div>
                  <div className="label">{m[1]}</div>
                </div>
              ))}
            </div>

            {/* CAROUSEL */}
            <div
              className="carousel"
              ref={carouselRef}
              onMouseEnter={stopAutoplay}
              onMouseLeave={startAutoplay}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className="viewport">
                {screenshots.map((s, i) => (
                  <img key={s.src} src={s.src} alt={s.alt} className={`shot ${i === index ? "active" : ""}`} />
                ))}
              </div>

              <div className="carousel-controls">
                <div className="ctrl" onClick={prev}>◀</div>
                <div className="ctrl" onClick={next}>▶</div>
              </div>

              <div className="thumbs">
                {screenshots.map((s, i) => (
                  <img
                    key={s.src}
                    src={s.src}
                    alt={s.alt}
                    className={`thumb ${i === index ? "active" : ""}`}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>
            </div>

            <h3 style={{ marginTop: 18 }}>What I built</h3>
            <ul>
              <li>Responsive layout with animated hero and smooth micro-interactions.</li>
              <li>Projects grid with dedicated detail pages.</li>
              <li>Accessible keyboard navigation and reduced-motion support.</li>
            </ul>
          </div>

          {/* RIGHT */}
          <aside>
            <div className="panel">
              <strong>Tech & Tools</strong>
              <div className="techs">
                <span className="chip">React</span>
                <span className="chip">React Router</span>
                <span className="chip">CSS</span>
                <span className="chip">Nodemailer</span>
              </div>

              <div className="features">
                {["Performance", "Secure Contact", "Accessibility"].map((f, i) => (
                  <div key={f} className={`feature ${mounted ? "visible" : ""}`} style={{ transitionDelay: `${i * 120}ms` }}>
                    <div className="badge">★</div>
                    <div>
                      <strong>{f}</strong>
                      <div style={{ fontSize: 13, opacity: .8 }}>
                        Production-ready and well optimized
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cta-row">
                <a className="btn" href="#demo">Live Demo</a>
                <a className="btn" href="https://github.com/Kayalvizhi2004/Portfolio-Website" target="_blank" rel="noreferrer">
                  View Repo
                </a>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
