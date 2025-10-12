import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <style>{`
        .navbar{
          position:fixed;top:0;left:0;width:100%;z-index:1000;
          background:#111;padding:.75rem 1.25rem;box-shadow:0 2px 12px rgba(0,0,0,.3)
        }
        .navbar-inner{display:flex;justify-content:space-between;align-items:center;max-width:1200px;margin:0 auto}
        .navbar-logo{color:#f5fafa;font-size:1.2rem;font-weight:700}
        .navbar-logo span{color:#00f2fe;font-weight:800;font-size:1.5rem}
        .nav-links{display:flex;gap:1.25rem}
        .nav-links a{color:#fff;text-decoration:none;padding:4px 8px;font-weight:600}
        .nav-links a:hover,.nav-links a.active{color:#00f2fe;text-shadow:0 0 6px #00f2fe}
        @media (max-width:640px){
          .nav-links{gap:.6rem;font-size:.95rem}
        }
      `}</style>

      <div className="navbar-inner">
        <div className="navbar-logo">
          <span>M</span>y <span>P</span>ortfolio
        </div>

        <nav className="nav-links" aria-label="Main navigation">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>About</NavLink>
          <NavLink to="/projects" className={({ isActive }) => (isActive ? "active" : "")}>Projects</NavLink>
          <NavLink to="/certifications" className={({ isActive }) => (isActive ? "active" : "")}>Certifications</NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
