import React, { useEffect, useRef, useState } from "react";

function Certifications() {
  const initialItems = [
    {
      title: "Teams",
      issuer: "Microsoft",
      year: "2023",
      type: "Certificate",
      img: "/images/cert-4.jpg",
    },
    {
      title: "OneDrive",
      issuer: "Microsoft",
      year: "2023",
      type: "Certificate",
      img: "/images/cert-5.jpg",
    },
    {
      title: "Micrsoft Excel",
      issuer: "Microsoft",
      year: "2023",
      type: "Certificate",
      img: "/images/cert-2.jpg",
    },
    {
      title: "Micrsoft Word",
      issuer: "Microsoft",
      year: "2023",
      type: "Certificate",
      img: "/images/cert-1.jpg",
    },
    {
      title: "Micrsoft Powerpoint",
      issuer: "Microsoft",
      year: "2023",
      type: "Certificate",
      img: "/images/cert-3.jpg",
    },
    {
      title: "Outlook",
      issuer: "Microsoft",
      year: "2023",
      type: "Certificate",
      img: "/images/cert-6.jpg",
    },
    {
      title: "Sharepoint",
      issuer: "Microsoft",
      year: "2023",
      type: "Certificate",
      img: "/images/cert-7.jpg",
    },
    {
      title: "Micrsoft Office 365 Productivity Suite Offerings",
      issuer: "Microsoft",
      year: "2023",
      type: "Certificate",
      img: "/images/cert-8.jpg",
    },
    {
      title: "Cyber Security and Digital Safety Essentials",
      issuer: "Microsoft",
      year: "2023",
      type: "Certificate",
      img: "/images/cert-9.jpg",
    },
    {
      title: "Data Analytics using Power BI",
      issuer: "Microsoft,SAP,Edunet",
      year: "2024",
      type: "Certificate",
      img: "/images/cert-10.jpg",
    },
    {
      title: "The Joy of Computing Using Python",
      issuer: "NPTEL",
      year: "2024",
      type: "Certificate",
      img: "/images/cert-11.jpg",
    },
    {
      title: "Foudations: Data, Data, Everywhere",
      issuer: "Coursera",
      year: "2025",
      type: "Certificate",
      img: "/images/cert-12.jpg",
    },
    {
      title: "Ask Questions to Make Data-Driven Decisions",
      issuer: "Coursera",
      year: "2025",
      type: "Certificate",
      img: "/images/cert-13.jpg",
    },
    {
      title: "Python",
      issuer: "Tamilnadu Computer Development Academy",
      year: "2023",
      type: "Internship",
      img: "/images/cert-intern1.jpg",
    },
    {
      title: "Full Stack Web Development",
      issuer: "Viswa Digital Technology",
      year: "2025",
      type: "Internship",
      img: "/images/cert-intern2.jpg",
    },
  ];

  const [items] = useState(initialItems);
  const [flipped, setFlipped] = useState({});
  const [visible, setVisible] = useState(false);
  const [lightbox, setLightbox] = useState({ open: false, src: "", alt: "" });
  const containerRef = useRef(null);

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
    <section
      id="certifications"
      ref={containerRef}
      style={{ padding: "10px 20px", background: "#fafbfc" }}
    >
      <style>{`
        .wrap {
          max-width: 1200px;
          margin: 0 auto;
        }

        h2 {
          margin: 0 0 10px 0;
          font-size: 28px;
          text-align: center;
          color: #071124;
        }

        .subtitle {
          text-align: center;
          color: #4b5563;
          margin-bottom: 24px;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 25px;
        }

        .card-3d {
          perspective: 1000px;
        }

        .card {
          height: 180px;
          border-radius: 12px;
          background: linear-gradient(180deg,#ffffff,#fbfdff);
          padding: 14px;
          box-shadow: 0 6px 18px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.04);
          cursor: pointer;
          opacity: 0;
          transform: translateY(20px);
          transition: transform 0.4s ease, opacity 0.4s ease;
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
          transition: transform 0.5s;
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
          color: #071124;
          font-size: 1rem;
          margin-bottom: 6px;
        }

        .front .meta {
          color: #6b7280;
          font-size: 0.9rem;
        }

        .type {
          background: linear-gradient(90deg,#00f2fe,#a933d8);
          color: #fff;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .back {
          background: #fff;
          transform: rotateY(180deg);
          align-items: center;
          justify-content: center;
        }

        .cert-img {
          max-width: 100%;
          max-height: 100%;
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          cursor: zoom-in;
        }

        /* Lightbox */
        .lightbox {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }

        .lightbox img {
          max-width: 90%;
          max-height: 85vh;
          border-radius: 10px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.6);
        }
      `}</style>

      <div className="wrap">
        <h2>Certifications & Internships</h2>
        <div className="subtitle">
          Click a card to flip and view the certificate image.
        </div>

        <div className="grid">
          {items.map((c, i) => (
            <div key={i} className="card-3d">
              <div
                className={`card ${visible ? "visible" : ""} ${
                  flipped[i] ? "flipped" : ""
                }`}
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
                  <div className="card-face back">
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
  );
}

export default Certifications;
