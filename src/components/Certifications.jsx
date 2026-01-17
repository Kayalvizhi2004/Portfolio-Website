// src/components/Certifications.jsx
import React, { useEffect, useRef, useState, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

function Certifications() {
  const initialItems = [
    { title: "Teams", issuer: "Microsoft", year: "2023", type: "Certificate", img: "/images/cert-4.jpg" },
    { title: "OneDrive", issuer: "Microsoft", year: "2023", type: "Certificate", img: "/images/cert-5.jpg" },
    { title: "Micrsoft Excel", issuer: "Microsoft", year: "2023", type: "Certificate", img: "/images/cert-2.jpg" },
    { title: "Micrsoft Word", issuer: "Microsoft", year: "2023", type: "Certificate", img: "/images/cert-1.jpg" },
    { title: "Micrsoft Powerpoint", issuer: "Microsoft", year: "2023", type: "Certificate", img: "/images/cert-3.jpg" },
    { title: "Outlook", issuer: "Microsoft", year: "2023", type: "Certificate", img: "/images/cert-6.jpg" },
    { title: "Sharepoint", issuer: "Microsoft", year: "2023", type: "Certificate", img: "/images/cert-7.jpg" },
    { title: "Micrsoft Office 365 Productivity Suite Offerings", issuer: "Microsoft", year: "2023", type: "Certificate", img: "/images/cert-8.jpg" },
    { title: "Cyber Security and Digital Safety Essentials", issuer: "Microsoft", year: "2023", type: "Certificate", img: "/images/cert-9.jpg" },
    { title: "Data Analytics using Power BI", issuer: "Microsoft,SAP,Edunet", year: "2024", type: "Certificate", img: "/images/cert-10.jpg" },
    { title: "The Joy of Computing Using Python", issuer: "NPTEL", year: "2024", type: "Certificate", img: "/images/cert-11.jpg" },
    { title: "Foudations: Data, Data, Everywhere", issuer: "Coursera", year: "2025", type: "Certificate", img: "/images/cert-12.jpg" },
    { title: "Ask Questions to Make Data-Driven Decisions", issuer: "Coursera", year: "2025", type: "Certificate", img: "/images/cert-13.jpg" },
    { title: "Python", issuer: "Tamilnadu Computer Development Academy", year: "2023", type: "Internship", img: "/images/cert-intern1.jpg" },
    { title: "Full Stack Web Development", issuer: "Viswa Digital Technology", year: "2025", type: "Internship", img: "/images/cert-intern2.jpg" },
  ];

  const [items] = useState(initialItems);
  const [flipped, setFlipped] = useState({});
  const [visible, setVisible] = useState(false);
  const [lightbox, setLightbox] = useState({ open: false, src: "", alt: "" });
  const containerRef = useRef(null);

  // theme is provided globally by ThemeContext
  const { theme } = useContext(ThemeContext);

  // intersection observer to animate in
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
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function toggleFlip(i) {
    setFlipped((p) => ({ ...p, [i]: !p[i] }));
  }

  function openLightbox(item) {
    if (!item.img) return;
    setLightbox({ open: true, src: item.img, alt: item.title });
  }

  function closeLightbox() {
    setLightbox({ open: false, src: "", alt: "" });
  }

  return (
    <div>
      {/* Theme is controlled globally from the navbar */}

      <section id="certifications" ref={containerRef} style={{ padding: "20px 16px", background: "var(--bg)" }}>
        <style>{`
          :root {
            --bg: #fafbfc;
            --text-title: #071124;
            --text-subtitle: #4b5563;
            --card-bg: linear-gradient(180deg,#ffffff,#fbfdff);
            --card-border: rgba(0,0,0,0.04);
            --card-shadow: rgba(0,0,0,0.06);
            --type-bg: linear-gradient(90deg,#00f2fe,#e00dacff);
            --type-text: #fff;
            --glow-color: #00fff7;
          }

          [data-theme="dark"] {
            --bg: #0b1220;
            --text-title: #f0f0f0;
            --text-subtitle: #cbd5e1;
            --card-bg: linear-gradient(180deg,#11141c,#1b1f2b);
            --card-border: rgba(255,255,255,0.08);
            --card-shadow: rgba(0,0,0,0.5);
            --glow-color: #66fff0;
          }

          .wrap {
            max-width: 1200px;
            margin: 0 auto;
            padding: 6px;
          }

          /* Glowing heading (uses the exact text-shadow + animation you asked for) */
          h2.cert-heading {
            margin: 8px 0 6px;
            font-size: 2rem;
            text-align: center;
            color: var(--text-title);
            text-shadow: 0 0 10px var(--glow-color), 0 0 20px var(--glow-color), 0 0 30px var(--glow-color);
            animation: glowAnim 2s ease-in-out infinite alternate;
          }

          .subtitle {
            text-align: center;
            color: var(--text-subtitle);
            margin-bottom: 18px;
          }

          .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 20px;
          }

          .card-3d {
            perspective: 1000px;
          }

          .card {
            height: 180px;
            border-radius: 12px;
            background: var(--card-bg);
            padding: 14px;
            box-shadow: 0 6px 18px var(--card-shadow);
            border: 1px solid var(--card-border);
            cursor: pointer;
            opacity: 0;
            transform: translateY(20px);
            transition: transform 0.4s ease, opacity 0.4s ease;
            display: flex;
            align-items: stretch;
          }

          .card.visible {
            opacity: 1;
            transform: translateY(0);
          }

          .card-inner {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
            transition: transform 0.6s;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }

          .card.flipped .card-inner {
            transform: rotateY(180deg);
          }

          .card-face {
            position: absolute;
            inset: 0;
            backface-visibility: hidden;
            border-radius: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 12px;
          }

          .front .title {
            font-weight: 700;
            color: var(--text-title);
            font-size: 1rem;
            margin-bottom: 6px;
          }

          .front .meta {
            color: var(--text-subtitle);
            font-size: 0.9rem;
          }

          .type {
            background: var(--type-bg);
            color: var(--type-text);
            padding: 4px 10px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
            align-self: flex-start;
            box-shadow: 0 6px 22px rgba(0,0,0,0.08);
          }

          .back {
            background: var(--card-bg);
            transform: rotateY(180deg);
            align-items: center;
            justify-content: center;
            display: flex;
          }

          .cert-img {
            max-width: 100%;
            max-height: 100%;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            cursor: zoom-in;
            transition: transform 300ms ease, box-shadow 300ms ease;
          }
          .cert-img:hover { transform: scale(1.02); box-shadow: 0 18px 50px rgba(0,0,0,0.28); }

          .lightbox {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 20px;
          }

          .lightbox img {
            max-width: 90%;
            max-height: 85vh;
            border-radius: 10px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.6);
          }

          /* small screens */
          @media (max-width: 480px) {
            .card { height: 160px; }
            .grid { gap: 15px; }
            h2.cert-heading { font-size: 2rem; }
          }

          /* Glow keyframes */
          @keyframes glowAnim {
            0% { text-shadow: 0 0 5px var(--glow-color), 0 0 10px var(--glow-color); }
            100% { text-shadow: 0 0 20px var(--glow-color), 0 0 40px var(--glow-color); }
          }
        `}</style>

        <div className="wrap">
          <h2 className="cert-heading">Certifications & Internships</h2>
          <div className="subtitle">Click a card to flip and view the certificate image.</div>

          <div className="grid">
            {items.map((c, i) => (
              <div key={i} className="card-3d">
                <div
                  className={`card ${visible ? "visible" : ""} ${flipped[i] ? "flipped" : ""}`}
                  onClick={() => toggleFlip(i)}
                >
                  <div className="card-inner">
                    <div className="card-face front">
                      <div>
                        <div className="title">{c.title}</div>
                        <div className="meta">
                          {c.issuer} · {c.year}
                        </div>
                      </div>
                      <span className="type">{c.type}</span>
                    </div>

                    <div className="card-face back" onClick={(e) => e.stopPropagation()}>
                      {c.img ? (
                        <img
                          src={c.img}
                          alt={c.title}
                          className="cert-img"
                          onClick={(e) => {
                            e.stopPropagation();
                            openLightbox(c);
                          }}
                        />
                      ) : (
                        <p>No image available</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {lightbox.open && (
          <div className="lightbox" onClick={closeLightbox}>
            <img src={lightbox.src} alt={lightbox.alt} />
          </div>
        )}
      </section>
    </div>
  );
}

export default Certifications;
