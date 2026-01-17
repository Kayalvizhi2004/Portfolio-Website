import React, { useEffect, useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";

export default function Project3() {
  const [mounted, setMounted] = useState(false);

  // replace with your actual screenshots
  const screenshots = [
    { src: "/images/plant1.png", alt: "Demo UI: upload and prediction" },
    { src: "/images/plant2.png", alt: "Training curves & confusion matrix" },
    { src: "/images/plant3.png", alt: "Sample predictions on test images" },
  ];

  const [index, setIndex] = useState(0);
  const autoplayRef = useRef(null);
  const carouselRef = useRef(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    setMounted(true);

    // autoplay unless prefers-reduced-motion
    const mq = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq || !mq.matches) startAutoplay();

    function onKey(e) {
      if (e.key === "Escape") {
        if (lightboxOpen) setLightboxOpen(false);
      }
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
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
    // resume autoplay if allowed
    const mq = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq || !mq.matches) startAutoplay();
  }

  const { theme } = useContext(ThemeContext);

  const mainStyle = { padding: "28px 20px", maxWidth: 1200, margin: "0 auto", background: theme === "dark" ? "#000" : "transparent" };

  return (
    <main style={mainStyle}>
      <style>{`
        :root { --accent1: #00f2fe; --accent2: #e00dacff; }

        .wrap { opacity:0; transform: translateY(18px); transition: all 520ms cubic-bezier(.2,.9,.3,1); }
        .wrap.mounted { opacity:1; transform: translateY(0); }

        .back { color: var(--accent1); font-weight:700; display:inline-block; margin-bottom:12px; text-decoration:none; }

        .hero { display:grid; grid-template-columns: 1fr 380px; gap:24px; align-items:start; }
        @media (max-width:1000px) { .hero { grid-template-columns: 1fr; } }

        .title { font-size:2rem; margin:0 0 8px; color:#0b1220; }
        .lead { color:#475569; margin:0 0 12px; line-height:1.6; }

        .panel { background: linear-gradient(180deg,#fff,#fbfdff); border-radius:12px; padding:14px; box-shadow:0 16px 44px rgba(12,18,30,0.06); border:1px solid rgba(12,18,30,0.03); }

        /* left column content */
        .section { margin-top:12px; }
        .section h3 { margin: 6px 0; color:#0b1220; }
        .section p, .section li { color:#475569; line-height:1.7; }

        .metrics { display:flex; gap:12px; margin-top:8px; flex-wrap:wrap; }
        .metric { min-width:120px; background:linear-gradient(90deg,#fff,#fbfdff); padding:10px 12px; border-radius:10px; box-shadow:0 8px 20px rgba(12,18,30,0.04); transform: translateY(6px); opacity:0; transition: all 420ms ease; }
        .metric.visible { transform: translateY(0); opacity:1; }
        .metric .num { font-weight:800; font-size:1.05rem; color:#0b1220; }
        .metric .lbl { color:#6b7280; font-size:0.9rem; }

        .wrap.dark .metric { background: linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02)); box-shadow: 0 10px 30px rgba(0,0,0,0.6); }
        .wrap.dark .metric .num { color: #ffffff !important; font-weight:900; font-size:1.08rem; text-shadow: 0 2px 6px rgba(0,0,0,0.6) !important; }
        .wrap.dark .metric .label { color: #cbd5e1 !important; font-weight:600 !important; }

        /* carousel */
        .carousel { margin-top:14px; border-radius:10px; overflow:hidden; position:relative; }
        .viewport { height:340px; display:flex; align-items:center; justify-content:center; background:linear-gradient(180deg,#eef6ff,#faf8fb); position:relative; }
        .shot {
          width:100%; max-width:900px; height:320px; object-fit:cover; border-radius:8px;
          transform: scale(.98) translateY(6px); opacity:0; transition: transform 520ms cubic-bezier(.2,.9,.3,1), opacity 520ms ease, filter 360ms ease;
          box-shadow: 0 16px 44px rgba(8,12,24,0.08);
          cursor: zoom-in;
        }
        .shot.active { transform: scale(1) translateY(0); opacity:1; filter:none; }

        /* Dark mode: black background and clearer text */
        .wrap.dark { background: #000; color: #eaf6ff; }
        .wrap.dark .title, .wrap.dark .lead, .wrap.dark .metric .num, .wrap.dark .chip { color: #eaf6ff; }
        .wrap.dark .panel { background: linear-gradient(180deg,#050506,#07070a); border: 1px solid rgba(255,255,255,0.04); box-shadow: 0 28px 88px rgba(0,0,0,0.72); }
        .wrap.dark .btn { background: linear-gradient(90deg,#00f2fe,#e00dacff); color:#07101a; box-shadow: 0 12px 40px rgba(0,242,254,0.12); }
        .wrap.dark .viewport { background: linear-gradient(180deg,#040611,#061018); }
        /* Force readable chips/labels in dark mode */
        .wrap.dark .chip { background: rgba(255,255,255,0.03); color: #eaf6ff !important; }
        .wrap.dark .metric .label { color: #cbd5e1 !important; }
        .wrap.dark .metric .num { color: #e6fbff !important; }
        .wrap.dark .meta-list div, .wrap.dark .meta-list .meta-item div div { color: #cbd5e1 !important; }

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



/* Light mode – unchanged (inherits existing colors) */
.section h3,
.section p,
.section li {
  color: #475569;
}

/* Dark mode – paragraph & list SAME color */
.wrap.dark .section h3,
.wrap.dark .section p,
.wrap.dark .section li {
  color: #e5e7eb;        /* consistent light gray */
}

/* Bullet / number color in dark mode */
.wrap.dark .section li::marker {
  color: #9ca3af;
}




        /* right column */
        .right { display:flex; flex-direction:column; gap:12px; }
        .chip { padding:8px 10px; border-radius:999px; background:#eef6fb; font-weight:700; color:#0b1220; display:inline-block; margin-right:6px; }
         
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
        .badge { width:36px; height:36px; border-radius:8px; display:grid; place-items:center; color:white; background: linear-gradient(90deg,var(--accent1),var(--accent2)); font-weight:800; }

        .cta { margin-top:10px; display:flex; gap:8px;}
        .btn { padding:10px 12px; border-radius:10px; background: linear-gradient(90deg,var(--accent1),var(--accent2)); color:white; font-weight:800; text-decoration:none; }

        /* lightbox */
        .lightbox { position:fixed; inset:0; display:grid; place-items:center; background: rgba(4,6,16,0.8); z-index:2000; padding:24px; }
        .lightbox img { max-width:100%; max-height:88vh; border-radius:8px; box-shadow:0 30px 80px rgba(2,6,23,0.6); transform:scale(.98); opacity:0; transition: transform 360ms ease, opacity 360ms ease; }
        .lightbox img.open { transform:scale(1); opacity:1; }

        @media (prefers-reduced-motion: reduce) {
          .wrap, .metric, .shot, .feature { transition:none !important; transform:none !important; opacity:1 !important; }
        }
      `}</style>

      <div className={`wrap ${mounted ? "mounted" : ""} ${theme === "dark" ? "dark" : ""}`}>
        <Link to="/" state={{ scrollTo: "projects" }} className="back">← Back to Projects</Link>

        <div className="hero">
          <div>
            <h1 className="title">Plant Disease Detection — CNN powered</h1>
            <p className="lead">
              An end-to-end deep learning pipeline that classifies plant leaf images into disease categories.
              Trained using TensorFlow/Keras and deployed as a lightweight Django app.
            </p>

            <div className="metrics" aria-hidden="true">
              <div className={`metric ${mounted ? "visible" : ""}`} style={{ transitionDelay: "120ms" }}>
                <div className="num">~95%</div>
                <div className="lbl">Peak validation accuracy</div>
              </div>
              <div className={`metric ${mounted ? "visible" : ""}`} style={{ transitionDelay: "220ms" }}>
                <div className="num">78%</div>
                <div className="lbl">Mean F1 (per class)</div>
              </div>
              <div className={`metric ${mounted ? "visible" : ""}`} style={{ transitionDelay: "320ms" }}>
                <div className="num">1.5k+</div>
                <div className="lbl">Augmented samples</div>
              </div>
            </div>

            <div className="section">
              <h3>Dataset & preprocessing</h3>
              <p>
                •	Collect datasets from  public repositories. Capture real-time images using  High quality cameras.
 Key steps:
              </p>
              <ul>
                <li>Resize images for CNN input.</li>
                <li>Normalize pixel values to improve model training.</li>
                <li>Augmentation: random flip, rotation, random crop, and contrast enhancement to increase model robustness.</li>
              </ul>
            </div>

            <div className="section">
              <h3>Model architecture</h3>
              <p>
                Implemented a CNN based on a lightweight encoder (MobileNetV2 backbone) with a classification head.
                Key choices:
              </p>
              <ul>
                <li>Pretrained backbone (transfer learning) then fine-tuned on leaf data.</li>
                <li>Cross-entropy loss, Adam optimizer, ReduceLROnPlateau learning-rate schedule with warmup.</li>
                <li>Early stopping on validation loss and model checkpointing.</li>
              </ul>
            </div>

            <div className="section">
              <h3>Training & evaluation</h3>
              <ul>
                <li>Split: train / val / test with stratified sampling to preserve class distribution.</li>
                <li>Monitored accuracy, precision, recall, F1, and confusion matrices — saved visual artifacts (see screenshots).</li>
                <li>Exported the final model as a TF SavedModel.</li>
              </ul>
            </div>

            {/* carousel */}
            <div
              className="carousel panel"
              onMouseEnter={stopAutoplay}
              onMouseLeave={startAutoplay}
              ref={carouselRef}
              aria-roledescription="carousel"
              aria-label="Project screenshots"
            >
              <div className="viewport">
                {screenshots.map((s, i) => (
                  <img
                    key={s.src}
                    src={s.src}
                    alt={s.alt}
                    className={`shot ${i === index ? "active" : ""}`}
                    style={{ position: i === index ? "relative" : "absolute", left: 0, right: 0 }}
                    onClick={() => openLightbox(i)}
                    aria-hidden={i === index ? "false" : "true"}
                  />
                ))}
              </div>

              <div className="carousel-controls" aria-hidden="true">
                <div className="ctrl" onClick={prev} aria-label="Previous">◀</div>
                <div className="ctrl" onClick={next} aria-label="Next">▶</div>
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

            <div className="section">
              <h3>Web Application Development</h3>
              <p>
                The inference service runs behind a Django:
              </p>
              <ol style={{ color: "#e5e7eb", lineHeight: 1.7 }}>
                <li>Build a Django-based web interface for disease detection.</li>
                <li>Allow users to upload images and receive real-time results.</li>
                <li>Display disease classification with possible treatment suggestions.</li>
              </ol>
              <p style={{ marginTop: 8 }}>
                Through data collection, preprocessing, model training, and deployment, the project achieves accurate disease detection, helping farmers and agricultural experts identify plant health issues early.
              </p>
            </div>
          </div>

          <aside className="right">
            <div className="panel">
              <strong style={{ display: "block", marginBottom: 6 }}>Quick summary</strong>
              <div style={{ marginTop: 12 }} >
                <span className="chip">Django</span>
                <span className="chip">Tensorflow/keras</span>
                <span className="chip">OpenCV</span>
              </div>

              <div className="features">
                <div className={`feature ${mounted ? "visible" : ""}`} style={{ transitionDelay: "120ms" }}>
                  <div className="badge">🧠</div>
                  <div>
                    <div style={{ fontWeight: 800 }}>Model</div>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>MobileNetV2 backbone (fine-tuned)</div>
                  </div>
                </div>

                <div className={`feature ${mounted ? "visible" : ""}`} style={{ transitionDelay: "220ms" }}>
                  <div className="badge">⚙️</div>
                  <div>
                    <div style={{ fontWeight: 800 }}>Pipeline</div>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>Augmentation, stratified split, model checkpoints</div>
                  </div>
                </div>

                <div className={`feature ${mounted ? "visible" : ""}`} style={{ transitionDelay: "320ms" }}>
                  <div className="badge">🚀</div>
                  <div>
                    <div style={{ fontWeight: 800 }}>Deploy</div>
                    <div style={{ color: "#6b7280", fontSize: 13 }}>Django</div>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 25, marginBottom: 10 }}>
                <a className="btn" href="/Dataset.zip" target="_blank" rel="noreferrer">Download Dataset</a>
                <a className="btn" href="https://github.com/Kayalvizhi2004/Plant-Disease-Detection" target="_blank" rel="noreferrer" style={{ marginLeft: 8 }}>View Repo</a>
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
            <img src={screenshots[index].src} alt={screenshots[index].alt} className="open" />
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

const lightboxBtnStyle = {
  background: "rgba(255,255,255,0.9)",
  borderRadius: 8,
  padding: 10,
  border: "none",
  cursor: "pointer",
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
};
