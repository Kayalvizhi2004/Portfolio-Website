// AboutMe.jsx
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

export default function AboutMe() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <section
      id="about"
      className={`aboutme-root ${isDark ? "dark" : ""}`}
      aria-labelledby="about-heading"
    >
      <style>{`
        .aboutme-root {
          min-height: 100vh;
          padding: 70px 20px;
          background: #ffffff;
          color: #0b1220;
        }
        .aboutme-root.dark {
          background: #07101a;
          color: #eaf6ff;
        }
        h2#about-heading {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 35px;
          color: var(--text-dark);
          text-shadow: 0 0 10px #00fff7, 0 0 20px #00fff7, 0 0 30px #00fff7;
          animation: glowAnim 2s ease-in-out infinite alternate;
        }
        .dark h2#about-heading { color: #eaf6ff; }

        @keyframes glowAnim {
          0% { text-shadow: 0 0 10px #00fff7, 0 0 20px #00fff7, 0 0 30px #00fff7; }
          100% { text-shadow: 0 0 20px #00fff7, 0 0 40px #00fff7, 0 0 60px #00fff7; }
        }  

        .typewriter {
          text-align: center;
          font-size: 1.1rem;
          margin-bottom: 45px;
          opacity: 0.9;
        }

        .container {
          max-width: 900px;
          margin: auto;
          text-align:justify;
          line-height: 1.6;
          opacity: 0.95;
          padding:2px;
        }

        .section {
          margin-bottom: 50px;
        }

        .section h3 {
          font-size: 1.45rem;
          margin-bottom: 20px;
          color: #00f2fe;
        }

        .item {
          padding: 20px;
          border-left: 4px solid #00f2fe;
          background: rgba(0,242,254,0.06);
          border-radius: 14px;
          margin-bottom: 20px;
          transition: all 0.4s ease;
          position: relative;
        }

        /* Hover Glow Effect */
        .item:hover {
          transform: translateY(-4px);
          box-shadow: 0 0 25px rgba(0,242,254,0.55);
        }

        .dark .item {
          background: rgba(255,255,255,0.05);
        }

        .item strong {
          display: block;
          margin-bottom: 4px;
          font-size: 1.1rem;
        }

        .item .meta {
          font-size: 0.9rem;
          opacity: 0.8;
          margin-bottom: 8px;
        }

        .item p {
          line-height: 1.6;
          opacity: 0.9;
        }
      `}</style>

      {/* TITLE */}
      <h2
        id="about-heading"
      >
        About Me
      </h2>

      {/* TYPEWRITER */}
      <div className="typewriter">
        <Typewriter
          words={[      
               "Passionate about solving meaningful problems",
               "Turning ideas into intelligent applications",
               "Creating value through data and technology",
               "Committed to continuous learning and growth",
          ]}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={40}
          delaySpeed={1600}
        />
      </div>

      <div className="container">
        {/* INTRO */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Hello! I am currently pursuing a Master of Computer Applications (MCA) with a primary focus on Python development and strong interests in Data Analytics, Machine Learning, and Web Development. I possess a solid foundation in programming principles, data handling, and logical problem-solving, which enables me to design and develop efficient, reliable, and scalable solutions.

My technical interests include analyzing data to extract meaningful insights, building machine learning models, and developing dynamic web applications. I enjoy working on practical projects that bridge the gap between theoretical concepts and real-world applications, while continuously learning new tools and technologies to stay aligned with the rapidly evolving tech landscape.

I am actively seeking opportunities where I can apply my skills, gain hands-on experience, grow professionally, and contribute to innovative projects that create meaningful real-world impact.h
        </motion.p>

        {/* EDUCATION */}
        <div className="section">
          <h3>Education</h3>

          <motion.div
            className="item"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <strong>MCA – Master of Computer Applications</strong>
            <div className="meta">
              Periyar University | 2024 – 2026 | CGPA: 8.3
            </div>
            <p>
              Gained in-depth knowledge in software development, Python
              programming, data analytics, machine learning, and modern web
              technologies. Completed academic and real-time projects focused
              on automation, analytics, and application development.
            </p>
          </motion.div>

          <motion.div
            className="item"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <strong>B.Sc Mathematics</strong>
            <div className="meta">
              Sri Vijay Vidyalaya College of Arts & Science | 2021 – 2024 | CGPA: 9.2
            </div>
            <p>
              Built strong analytical, logical, and problem-solving skills
              through mathematics, statistics, and quantitative reasoning,
              forming a solid base for data analysis and algorithmic thinking.
            </p>
          </motion.div>
        </div>

        {/* INTERNSHIP */}
        <div className="section">
          <h3>Internships</h3>

          <motion.div
            className="item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <strong>Python Intern</strong>
            <div className="meta">2023 | 15 Days</div>
            <p>
              Worked on Python-based tasks involving data handling, scripting,
              and basic automation. Gained hands-on exposure to Pandas, NumPy,
              data cleaning techniques, and practical problem-solving.
            </p>
          </motion.div>

          <motion.div
            className="item"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <strong>Web Development Intern</strong>
            <div className="meta">2025 | 1 Month</div>
            <p>
              Developed responsive and user-friendly web interfaces using HTML,
              CSS, JavaScript, and React. Focused on UI design, component-based
              architecture, and performance optimization.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
