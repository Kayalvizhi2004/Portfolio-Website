import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Project1 from "./components/Project1";
import Project2 from "./components/Project2";
import Project3 from "./components/Project3";
import Project4 from "./components/Project4";
import Certifications from "./components/Certifications";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  const [singlePage, setSinglePage] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  
  /* ---------- MOBILE STACK MODE ---------- */
  useEffect(() => {
    const check = () => setSinglePage(window.innerWidth <= 900);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ---------- HASH SCROLL HANDLER ---------- */
 /* ---------- GLOBAL SCROLL HANDLER (NAVBAR + BACK TO PROJECTS) ---------- */
useEffect(() => {
  const target = location.state?.scrollTo;
  if (!target) return;

  let attempts = 0;
  const maxAttempts = 15;

  const scrollToSection = () => {
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      navigate("/", { replace: true, state: {} }); // clear state
      return;
    }
    if (++attempts < maxAttempts) {
      setTimeout(scrollToSection, 120);
    }
  };

  setTimeout(scrollToSection, 80);
}, [location, navigate]);



  return (
    <>
      

      <Navbar />

      <main style={{ paddingTop: 72 }}>
        {singlePage ? (
          <div className="app-container">
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Certifications />
            <Contact />
          </div>
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <About />
                  <Skills />
                  <Projects />
                  <Certifications />
                  <Contact />
                </>
              }
            />
            <Route path="/project1" element={<Project1 />} />
            <Route path="/project2" element={<Project2 />} />
            <Route path="/project3" element={<Project3 />} />
            <Route path="/project4" element={<Project4 />} />
          </Routes>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
