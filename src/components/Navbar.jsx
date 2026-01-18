import React, { useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiSun, FiMoon } from "react-icons/fi";
import { ThemeContext } from "../contexts/ThemeContext";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (e, id) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: id } });
      return;
    }

    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className="navbar">
      <style>{`
        /* ===== NAVBAR BASE ===== */
        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          z-index: 1000;
          backdrop-filter: blur(12px);
          background: rgba(10,10,15,0.9);
          box-shadow: 0 4px 18px rgba(0,0,0,0.6);
        }

        .navbar-inner {
          max-width: 1200px;
          margin: auto;
          min-height: 48px; /* ✅ FIX */
          padding: 0 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
        }

        .navbar-logo {
          font-size: 1.15rem;
          font-weight: 800;
          white-space: nowrap;
          color: #e6eef8;
        }

        .navbar-logo span {
          color: #00f2fe;
        }

        .nav-links {
          display: flex;
          gap: 1rem;
          flex: 1;
          justify-content: center;
          overflow-x: auto;
          white-space: nowrap;
          scrollbar-width: none;
        }

        .nav-links::-webkit-scrollbar {
          display: none;
        }

        .nav-links a {
          text-decoration: none;
          font-weight: 600;
          color: #e6eef8;
          cursor: pointer;
          position: relative;
        }

        .nav-links a::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 0;
          height: 2px;
          background: #00f2fe;
          transition: width 0.3s ease;
        }

        .nav-links a:hover::after {
          width: 100%;
        }

        /* ===== THEME TOGGLE ===== */
        .theme-toggle {
          width: 38px;
          height: 38px;
          flex-shrink: 0;
          border-radius: 10px;
          border: none;
          display: grid;
          place-items: center;
          cursor: pointer;
          background: ${isDark
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.06)"};
          color: ${isDark ? "#f8f9fa" : "#f59e0b"};
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .theme-toggle:hover {
          transform: rotate(10deg) scale(1.05);
          box-shadow: 0 0 12px #00f2fe;
        }

        /* ===== MOBILE FIXES ===== */
        @media (max-width: 768px) {
          .navbar-inner {
            min-height: 56px; /* ✅ more tap-safe */
            padding: 0 0.75rem;
          }

          .nav-links {
            justify-content: flex-start;
            gap: 0.5rem;
          }

          .nav-links a {
            padding: 6px 12px;
            border-radius: 999px;
            background: rgba(255,255,255,0.12);
          }

          .theme-toggle {
            width: 34px;   /* ✅ slightly smaller */
            height: 34px;
            border-radius: 8px;
          }
        }
      `}</style>

      <div className="navbar-inner">
        {/* LEFT */}
        <div className="navbar-logo">
          <span>M</span>y <span>P</span>ortfolio
        </div>

        {/* CENTER */}
        <nav className="nav-links">
          {sections.map((sec) => (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              onClick={(e) => handleScroll(e, sec.id)}
            >
              {sec.label}
            </a>
          ))}
        </nav>

        {/* RIGHT */}
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {isDark ? <FiMoon size={16} /> : <FiSun size={16} />}
        </button>
      </div>
    </header>
  );
}
