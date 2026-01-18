import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FiSun, FiMoon, FiMenu, FiX } from "react-icons/fi";
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
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (e, id) => {
    e.preventDefault();
    setOpen(false); // close menu on click

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
          min-height: 56px;
          padding: 0 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .navbar-logo {
          font-size: 1.15rem;
          font-weight: 800;
          color: #e6eef8;
        }

        .navbar-logo span {
          color: #00f2fe;
        }

        /* DESKTOP NAV */
        .nav-links {
          display: flex;
          gap: 1rem;
        }

        .nav-links a {
          color: #e6eef8;
          text-decoration: none;
          font-weight: 600;
        }

        /* THEME TOGGLE */
        .theme-toggle {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: none;
          display: grid;
          place-items: center;
          cursor: pointer;
          background: ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)"};
          color: ${isDark ? "#f8f9fa" : "#f59e0b"};
        }

        /* MOBILE */
        .menu-toggle {
          display: none;
          background: none;
          border: none;
          color: #fff;
          font-size: 1.5rem;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .nav-links {
            position: absolute;
            top: 56px;
            left: 0;
            width: 100%;
            background: ${isDark ? "#0b1220" : "#ffffff"};
            flex-direction: column;
            padding: 16px;
            gap: 14px;
            display: ${open ? "flex" : "none"};
            box-shadow: 0 12px 30px rgba(0,0,0,0.3);
          }

          .nav-links a {
            color: ${isDark ? "#e6eef8" : "#0b1220"};
          }

          .menu-toggle {
            display: block;
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
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDark ? <FiMoon /> : <FiSun />}
          </button>

          <button className="menu-toggle" onClick={() => setOpen(!open)}>
            {open ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </div>
    </header>
  );
}
