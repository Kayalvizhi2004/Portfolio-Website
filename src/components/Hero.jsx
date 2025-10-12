import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  const roles = [
    {
      title: "Python Developer",
      description:
        "I build efficient backend solutions, automate workflows, and implement data pipelines using Python (Pandas, NumPy) and frameworks like Flask/Django. I optimize scripts, write unit tests, and integrate APIs.",
    },
    {
      title: "Data Analyst",
      description:
        "I analyze and interpret complex datasets to uncover insights and drive data-led decisions. Skilled in SQL, Python, Excel, Power BI, and Tableau to create dashboards and actionable reports.",
    },
  ];

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Show each role for `displayMs`, fade out for `fadeMs` and switch
    const displayMs = 2800; // time role is fully visible
    const fadeMs = 400;     // fade duration (should match CSS transition)
    const total = displayMs + fadeMs;

    const timer = setInterval(() => {
      // start fade-out
      setVisible(false);
      // after fade duration, switch role and fade-in
      setTimeout(() => {
        setIndex((i) => (i + 1) % roles.length);
        setVisible(true);
      }, fadeMs);
    }, total);

    return () => clearInterval(timer);
  }, [roles.length]);

  return (
    <section className="hero-section" role="region" aria-label="Hero">
      <style>{`
        .hero-section{
          position:relative;
          padding:48px 20px 120px;
          min-height:52vh;
          display:flex;
          align-items:center;
          justify-content:center;
          background:linear-gradient(180deg,#0b0f17 0%,#07101a 100%);
          color:#fff;
        }
        .hero-inner{
          z-index:2;
          width:100%;
          max-width:1100px;
          display:flex;
          gap:28px;
          align-items:center;
          justify-content:space-between;
        }
        .hero-left{
         flex:1;
         padding-left:60px;
         }
        .eyebrow{
         color:#7ee7ff; 
         font-weight:700; 
         margin:0 0 10px 
         }
        .hero-title{
         font-size:clamp(1.8rem,3.2vw,2.6rem); 
         margin:0 0 12px 
         }
        .accent{
         color:#00f2fe
         }
        /* role / crossfade container */
        .role-wrap{
         height:30px; 
         position:relative; 
         margin-left:6px; 
         display:inline-block; 
         vertical-align:bottom;
         }
        .role {
          position:absolute;
          left:0;
          top:0;
          white-space:nowrap;
          font-weight:700;
          font-size:2.00rem;
          color:#00f2fe;
          transition: opacity 400ms ease, transform 400ms ease;
          opacity:0;
          transform: translateY(6px);
        }
        .role.visible {
         opacity:1; 
         transform: translateY(0); 
         }
        .hero-sub{
          max-width:50ch;
          opacity:.95;
          margin-top:20px;
          transition: opacity 400ms ease;
          font-size:20px;
        }
        .hero-sub.dim{ 
         opacity:0; 
         transform: translateY(6px); 
         }
        .hero-cta{ 
         display:flex; 
         gap:12px; 
         margin-top:14px 
         }
        .btn{ 
         border:none; 
         padding:10px 16px; 
         border-radius:10px; 
         font-weight:700; 
         cursor:pointer 
         }
        .primary{ 
        background: linear-gradient(90deg,#00f2fe,#a933d8);
         color:#fff 
         }
        .outline{ 
         background: linear-gradient(90deg,#00f2fe,#a933d8); 
         color:#fff; 
         border:1.5px solid rgba(255,255,255,0.12) 
         }
        .hero-right{ 
         flex:0 0 260px; 
         display:flex; 
         align-items:center; 
         justify-content:center;
         padding-right:90px;
         }
        .hero-social {
         display: flex;
         gap: 12px;
         margin-top: 14px; 
         opacity: 0; 
         transform: translateY(18px); 
         animation: enterUp 1s ease forwards .55s; 
         }
        .social-link {
         display: inline-grid; 
         place-items: center; 
         width: 46px; 
         height: 46px;
         border-radius: 10px;
         background-color: rgba(238, 239, 240, 0.06); 
         color: #00f2fe; 
         transition: transform .18s, box-shadow .18s;
          } 
        .social-link:hover {
         transform: translateY(-3px); 
         box-shadow: 0 10px 30px rgba(0,242,254,0.12);
         color: #fff; 
         }
        .profile-photo{
          width:270px;
          height:270px; 
          border-radius:50%;
          object-fit:cover; 
          border:6px solid #00f2fe
           }
        @media (max-width:900px){
          .hero-inner{ flex-direction:column-reverse; text-align:center }
          .hero-right{ margin-bottom:12px }
          .role { font-size:1.05rem }
        }
      `}</style>

      <div className="hero-inner">
        <div className="hero-left">
          <p className="eyebrow">Hi, my name is</p>

          <h1 className="hero-title">
            Kayalvizhi
            <span className="accent"> —{" "}
              <span className="role-wrap" aria-live="polite">
                {roles.map((r, i) => (
                  <span
                    key={r.title}
                    className={`role ${i === index && visible ? "visible" : ""}`}
                    aria-hidden={i === index ? "false" : "true"}
                  >
                    {r.title}
                  </span>
                ))}
              </span>
            </span>
          </h1>

          {/* description switches in sync: fade out/in */}
          <p className={`hero-sub ${visible ? "" : "dim"}`} aria-live="polite">
            {roles[index].description}
          </p>

          <div className="hero-cta">
            <button className="btn primary" onClick={() => navigate("/projects")}>
              View Projects
            </button>
            <a className="btn outline" href="/resume.pdf" target="_blank" rel="noreferrer">
              Download CV
            </a>
          </div>
        

        <div className="hero-social"> 
          <a href="https://github.com/Kayalvizhi2004/" target="_blank" rel="noreferrer" aria-label="GitHub" className="social-link"> {/* GitHub SVG */} 
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"> 
          <path d="M12 .5C5.73.5.75 5.48.75 11.77c0 4.94 3.2 9.13 7.64 10.61.56.1.76-.24.76-.53 0-.26-.01-1.12-.02-2.02-3.11.68-3.77-1.5-3.77-1.5-.51-1.3-1.25-1.64-1.25-1.64-1.02-.7.08-.69.08-.69 1.13.08 1.72 1.16 1.72 1.16 1 .17 1.56.98 1.56.98.9 1.54 2.36 1.1 2.93.84.09-.66.35-1.1.64-1.36-2.48-.28-5.09-1.24-5.09-5.53 0-1.22.44-2.21 1.16-2.99-.12-.28-.5-1.42.11-2.95 0 0 .95-.3 3.12 1.15a10.8 10.8 0 0 1 2.84-.38c.96.01 1.93.13 2.84.38 2.16-1.45 3.11-1.15 3.11-1.15.62 1.53.24 2.67.12 2.95.72.78 1.16 1.77 1.16 2.99 0 4.3-2.62 5.24-5.11 5.52.36.31.68.92.68 1.86 0 1.34-.01 2.42-.01 2.75 0 .29.2.64.77.53C19.06 20.9 22.25 16.7 22.25 11.77 22.25 5.48 17.27.5 12 .5z" /> 
          </svg> 
          </a> 
            <a href="https://www.linkedin.com/in/kayalvizhi-neelanarayanan-2804at2004/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-link"> {/* LinkedIn SVG */} <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"> 
            <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 24V7.98h5V24H0zm7.5 0h5V15.5c0-4.42 6-4.77 6 0V24h5V14.5c0-7.72-8.33-7.43-11-3.62V7.98h-5V24z" /> 
            </svg> 
            </a> 
        </div>
        </div> 
        
        <div className="hero-right">
          <img src="/images/profile.jpg" alt="Kayalvizhi profile" className="profile-photo" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
