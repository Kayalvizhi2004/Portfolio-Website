import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { motion } from "framer-motion";

export default function Hero() {
  const { theme } = useContext(ThemeContext);

  const roles = [
    "Python Developer",
    "Data Analyst",
    "ML Enthusiastic",
    "Web Developer",
  ];

  const taglines = [
    "Turning Complexity into Clarity",
    "From Concepts to Code",
    "Learning. Building. Improving.",
    "Turning Ideas into Working Software",
    "Focused on Clean, Practical Code",
    "Growing Through Real-World Projects"
  ];


  const [roleIndex, setRoleIndex] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);

  const [text, setText] = useState("");
  const [tagIndex, setTagIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  /* 🔹 Role rotation */
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % roles.length);
        setRoleVisible(true);
      }, 400);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  /* 🔹 Typewriter */
  useEffect(() => {
    const current = taglines[tagIndex];
    const speed = deleting ? 40 : 70;

    const timer = setTimeout(() => {
      if (!deleting && charIndex < current.length) {
        setText(current.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (deleting && charIndex > 0) {
        setText(current.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!deleting && charIndex === current.length) {
        setTimeout(() => setDeleting(true), 1200);
      } else if (deleting && charIndex === 0) {
        setDeleting(false);
        setTagIndex((i) => (i + 1) % taglines.length);
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [charIndex, deleting, tagIndex]);

  return (
    <section
  id="home"
  className={`hero-root ${theme === "dark" ? "dark" : ""}`}
>

      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Montserrat:wght@500;600&family=Poppins:wght@700;800&display=swap');

        :root {
          --accent1: #00f2fe;
          --accent2: #e00dac;
          --dark: #0b1220;
          --white: #ffffff;
          --text-light: #0b1220;
          --text-dark: #e5e7eb;
        }

        .hero-root {
          min-height: 100vh;
          padding-top: 120px;
          background: var(--white);
          color: var(--text-light);
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: "Inter", system-ui, sans-serif;
          --name-accent: var(--accent2);
        }

        .dark {
          background: var(--dark);
          color: var(--text-dark);
          --name-accent: var(--accent1);
        }

       /* 🔹 TAGLINE (FIXED FOR LIGHT & DARK MODE) */
.tagline {
  font-family: "Montserrat", sans-serif;
  font-size: 1.6rem;
  font-weight: 600;
  margin-bottom: 45px;
  min-height: 2em;

  /* ✅ Explicit colors */
  color: #0b1220; /* visible in light mode */
}

.dark .tagline {
  color: #e5e7eb; /* visible in dark mode */
}

/* 🔹 CURSOR */
.cursor {
  display: inline-block;
  width: 2px;
  height: 1.2em;
  margin-left: 4px;
  background: currentColor;
  animation: blink 1s infinite;
}


        @keyframes blink { 50% { opacity: 0; } }

        /* 🔹 PROFILE (FIXED IMAGE, ROTATING BORDER) */
        .profile-wrap {
          position: relative;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          margin-bottom: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .profile-wrap::before {
          content: "";
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            var(--accent1),
            var(--accent2),
            var(--accent1)
          );
          animation: rotateBorder 6s linear infinite;
          z-index: 0;
        }

        @keyframes rotateBorder {
          to { transform: rotate(360deg); }
        }

        .profile-photo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
          background: black;
          position: relative;
          z-index: 1;
        }

        /* 🔹 NAME */
        .name {
          font-family: "Poppins", sans-serif;
          font-size: 3.5rem;
          font-weight: 800;
          background: linear-gradient(
            90deg,
            var(--name-accent),
            #ffffff,
            var(--name-accent)
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 3s linear infinite;
          margin-top: 8px;
        }

        @keyframes shimmer {
          to { background-position: 200%; }
        }

        /* 🔹 ROLES */
        .role-wrap {
          position: relative;
          height: 1.8em;
          margin-top: 6px;
          font-family: "Montserrat", sans-serif;
        }

        .role {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--accent1);
          opacity: 0;
          transition: opacity 0.4s ease;
          text-align:center;
        }

        .role.visible { opacity: 1; }

       /* 🔹 DESCRIPTION (FIXED FOR LIGHT & DARK MODE) */
.hero-sub {
  max-width: 680px;
  font-size: 1.05rem;
  line-height: 1.7;
  margin: 52px auto;
  opacity: 0.95;
  text-align:justify;

  /* ✅ Explicit light-mode color */
  color: #1f2937; /* slate-800 */
}

.dark .hero-sub {
  color: #e5e7eb; /* slate-200 */
}


        /* 🔹 BUTTONS */
        .hero-cta {
          display: flex;
          gap: 14px;
          margin-top: 10px;
          flex-wrap: wrap;
        }

        .btn {
          padding: 12px 22px;
          border-radius: 14px;
          background: linear-gradient(90deg, var(--accent1), var(--accent2));
          border: none;
          font-weight: 700;
          font-size: 0.95rem;
          color: white;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 35px rgba(0,242,254,0.55);
        }

        /* 🔹 SOCIAL ICONS */
        .hero-social {
          display: flex;
          gap: 24px;
          margin-top: 34px;
        }

       /* 🔹 SOCIAL ICON WRAPPER */
.social-link {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  border: 2px solid var(--accent1);
  display: grid;
  place-items: center;
  transition: all 0.3s ease;
  background: transparent;
}

/* 🔹 ICON COLOR (DEFAULT) */
.social-link svg {
  width: 26px;
  height: 26px;
  fill: var(--accent1);
  transition: fill 0.3s ease;
}

/* 🔹 LIGHT MODE HOVER */
.hero-root:not(.dark) .social-link:hover {
  background: rgba(0, 242, 254, 0.15);
  box-shadow: 0 0 30px rgba(0, 242, 254, 0.4);
}

.hero-root:not(.dark) .social-link:hover svg {
  fill: #000000; /* ✅ BLACK ICON IN LIGHT MODE */
}

/* 🔹 DARK MODE (KEEP AS IS) */
.dark .social-link:hover {
  box-shadow: 0 0 30px rgba(0, 242, 254, 0.7);
}

.dark .social-link:hover svg {
  fill: var(--accent1); /* unchanged */
}

      `}</style>

      {/* 🔹 TAGLINE */}
      <p className="tagline">
        {text}
        <span className="cursor" />
      </p>

      {/* 🔹 PROFILE */}
      <div className="profile-wrap">
        <img src="/images/profile.jpg" alt="Kayalvizhi" className="profile-photo" />
      </div>

      {/* 🔹 NAME */}
      <h1 className="name">Kayalvizhi</h1>

      {/* 🔹 ROLES */}
      <div className="role-wrap">
        {roles.map((role, i) => (
          <span
            key={role}
            className={`role ${i === roleIndex && roleVisible ? "visible" : ""}`}
          >
            {role}
          </span>
        ))}
      </div>

      {/* 🔹 DESCRIPTION */}
      <p className="hero-sub">
        Hi, I’m Kayalvizhi Neelanarayanan, a passionate Python developer with a keen interest in Data Analytics, Machine Learning, and Web Development. I enjoy turning complex problems into efficient and elegant solutions using Python and modern technologies. I’m constantly exploring new tools and frameworks to build projects that are both functional and impactful. Welcome to my portfolio — feel free to explore my work and see what I can create!
      </p>

      {/* 🔹 BUTTONS */}
      <div className="hero-cta">
        <button
  className="btn"
  onClick={() => {
    document.getElementById("projects")?.scrollIntoView({
      behavior: "smooth",
    });
  }}
>
  View Projects
</button>

        <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn">
          Download CV
        </a>
      </div>

      {/* 🔹 SOCIALS */}
      <div className="hero-social">
        <a
          className="social-link"
          href="https://github.com/Kayalvizhi2004"
          target="_blank"
          rel="noreferrer"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5C5.7.5.7 5.5.7 11.8c0 5 3.2 9.2 7.6 10.7.6.1.8-.3.8-.6v-2c-3.1.7-3.8-1.5-3.8-1.5-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .2 1.6 1 1.6 1 .9 1.5 2.4 1.1 3 .8.1-.6.4-1.1.7-1.4-2.5-.3-5.1-1.2-5.1-5.6 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.4.1-2.9 0 0 .9-.3 3 1.1a10.5 10.5 0 0 1 5.5 0c2.1-1.4 3-1.1 3-1.1.6 1.5.2 2.6.1 2.9.7.8 1.1 1.8 1.1 3 0 4.4-2.7 5.3-5.2 5.6.4.3.8 1 .8 2v3c0 .3.2.7.8.6 4.4-1.5 7.6-5.7 7.6-10.7C23.3 5.5 18.3.5 12 .5z"/>
          </svg>
        </a>

        <a
          className="social-link"
          href="https://www.linkedin.com/in/kayalvizhi-neelanarayanan-2804at2004/"
          target="_blank"
          rel="noreferrer"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4.98 3.5C4.98 4.9 3.9 6 2.5 6S0 4.9 0 3.5 1.1 1 2.5 1s2.48 1.1 2.48 2.5zM0 24V7.98h5V24H0zm7.5 0h5v-8.5c0-4.4 6-4.7 6 0V24h5V14.5c0-7.7-8.3-7.4-11-3.6V7.98h-5V24z"/>
          </svg>
        </a>
      </div>
    </section>
  );
}
