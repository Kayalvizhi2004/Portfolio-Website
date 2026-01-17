// Skills.jsx
import React, { useEffect, useState, useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { motion } from "framer-motion";
import {
  SiPython,
  SiDjango,
  SiReact,
  SiMongodb,
  SiMysql,
  SiJavascript,
  SiJupyter,
  SiHtml5,
  SiCss3,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiTensorflow,
  SiTableau,
} from "react-icons/si";
import { FaJava, FaAws } from "react-icons/fa";
import { FaCode, FaGithub } from "react-icons/fa";




export default function Skills() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setVisible(true), 200);
  }, []);

  /* 🔹 YOUR ORIGINAL SKILLS */
  const skills = [
    { name: "Python", level: 90 },
    { name: "Tableau / Power BI", level: 80 },
    { name: "Excel", level: 88 },
    { name: "SQL", level: 56 },
    { name: "HTML & CSS", level: 72 },
    { name: "React", level: 68 },
  ];

  /* 🔹 TECHNOLOGIES */
  const technologies = [
    {
      title: "Programming Languages",
      items: [
        { name: "Python", icon: <SiPython /> },
        { name: "JavaScript (Basic)", icon: <SiJavascript /> },
        { name: "Java (Basic)", icon: <FaJava /> },
        { name: "SQL (Basic)", icon: <SiMysql /> },
      ],
    },
    {
      title: "Frameworks & Libraries",
      items: [
        { name: "Django", icon: <SiDjango /> },
        { name: "React", icon: <SiReact /> },
        { name: "NumPy", icon: <SiNumpy /> },
        { name: "Pandas", icon: <SiPandas /> },
        { name: "Scikit-learn", icon: <SiScikitlearn /> },
        { name: "TensorFlow", icon: <SiTensorflow /> },
      ],
    },
    {
      title: "Databases",
      items: [
        { name: "MongoDB", icon: <SiMongodb /> },
        { name: "MySQL", icon: <SiMysql /> },
      ],
    },
    {
      title: "Data & Visualization Tools",
      items: [
        { name: "Tableau", icon: <SiTableau /> },
        { name: "Matplotlib", icon: <SiPython /> },
        { name: "Jupyter Notebook", icon: <SiJupyter /> },
      ],
    },
    {
      title: "Developer Tools & Cloud",
      items: [
        { name: "GitHub", icon: <FaGithub /> },
        { name: "VS Code", icon: <FaCode /> },
        { name: "AWS (Basic)", icon: <FaAws /> },

      ],
    },
    {
      title: "Styling & Markup",
      items: [
        { name: "HTML5", icon: <SiHtml5 /> },
        { name: "CSS3", icon: <SiCss3 /> },
      ],
    },
  ];

  return (
    <section id="skills" className={`skills-root ${isDark ? "dark" : ""}`}>
      <style>{`
        .skills-root {
          min-height: 100vh;
          padding: 70px 20px;
          background: ${isDark ? "#07101a" : "#f9fafb"};
        }

       h2 {
          text-align: center;
          font-size: 2rem;
          margin-bottom: 35px;
          color: var(--text-dark);
          text-shadow: 0 0 10px #00fff7, 0 0 20px #00fff7, 0 0 30px #00fff7;
          animation: glowAnim 2s ease-in-out infinite alternate;
        }
        .dark h2 { color: #eaf6ff; }

        @keyframes glowAnim {
          0% { text-shadow: 0 0 10px #00fff7, 0 0 20px #00fff7, 0 0 30px #00fff7; }
          100% { text-shadow: 0 0 20px #00fff7, 0 0 40px #00fff7, 0 0 60px #00fff7; }
        }

        /* 🔹 SKILL BARS */

        .skill {
          padding: 18px;
          border-radius: 14px;
          background: ${isDark ? "#16101bff" : "#fff"};
          box-shadow: 0 20px 60px rgba(0,0,0,0.08);
        }

        .row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          font-weight: 700;
        }

        .bar {
          height: 12px;
          background: ${isDark ? "#0f1317" : "#e5edf5"};
          border-radius: 999px;
          overflow: hidden;
        }

        .fill {
  height: 100%;
  background: linear-gradient(90deg, #00f2fe, #e00dac);
  border-radius: 999px;
}


        .bars {
  max-width: 900px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(2, 2fr); /* ✅ TWO COLUMNS */
  gap: 34px;
}

/* 📱 Mobile */
@media (max-width: 640px) {
  .bars {
    grid-template-columns: 1fr; /* ONE COLUMN */
  }
}


        /* 🔹 TECHNOLOGIES */
        .tech-section {
          max-width: 1100px;
          margin: 70px auto 0;
        }

        h3 {
          font-size: 1.5rem;
          margin: 30px 0 18px;
          color: ${isDark ? "#9ffcff" : "#004e5a"};
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 18px;
        }

        .tech-card {
          padding: 18px;
          border-radius: 16px;
          background: ${isDark ? "#020202" : "#ffffff"};
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 18px 50px rgba(0,0,0,0.08);
        }

        .tech-card svg {
          font-size: 2.3rem;
          color: #00f2fe;
        }
      `}</style>

      {/* 🔹 TITLE */}
      <h2>
        Skills 
      </h2>

     <div className="bars">
  {skills.map((s, i) => (
    <motion.div
      key={s.name}
      className="skill"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: i * 0.12,
        ease: "easeOut",
      }}
      viewport={{ once: true }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 0 30px rgba(0,242,254,0.35)",
      }}
    >
      <div className="row">
        <span>{s.name}</span>
        <span>{s.level}%</span>
      </div>

      <div className="bar">
        <motion.div
          className="fill"
          initial={{ width: 0 }}
          whileInView={{ width: `${s.level}%` }}
          transition={{
            duration: 1.4,
            ease: "easeInOut",
            delay: 0.2 + i * 0.1,
          }}
          viewport={{ once: true }}
        />
      </div>
    </motion.div>
  ))}
</div>



      {/* 🔹 TECHNOLOGIES */}
      <div className="tech-section">
        {technologies.map((cat, i) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            viewport={{ once: true }}
          >
            <h3>{cat.title}</h3>

            <div className="tech-grid">
              {cat.items.map((tool) => (
                <motion.div
                  key={tool.name}
                  className="tech-card"
                  whileHover={{
                    scale: 1.08,
                    boxShadow: "0 0 40px rgba(0,242,254,0.6)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {tool.icon}
                  <span>{tool.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
