import React, { useState } from "react";
import { motion } from "framer-motion";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
      }
    } catch (err) {
      console.error("Error sending message", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.section
      className="contact"
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <style>{`
        .contact {
          padding: 10px 20px;
          text-align: center;
          background: linear-gradient(135deg, #dfe9f3 0%, #ffffff 100%);
        }
        .contact h2 {
          font-size: 2rem;
          margin-bottom: 20px;
          background: linear-gradient(90deg, #0c0c0cff, #050505ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: bold;
        }
        .contact-form {
          max-width: 500px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .contact-form input,
        .contact-form textarea {
          padding: 14px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 1rem;
          transition: all 0.3s ease;
        }
        .contact-form input:focus,
        .contact-form textarea:focus {
          border-color: #00f2fe;
          box-shadow: 0 0 8px rgba(0, 242, 254, 0.3);
          transform: scale(1.02);
        }
        .contact-form button {
          background: linear-gradient(90deg, #00f2fe, #4facfe);
          color: #fff;
          border: none;
          padding: 14px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.3s ease;
        }
        .contact-form button:hover {
          transform: translateY(-3px) scale(1.05);
        }
        .sent-msg {
          color: green;
          font-size: 1.1rem;
          margin-top: 15px;
          animation: fadeIn 1s ease-in-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <motion.h2>Contact Me</motion.h2>

      <motion.form className="contact-form" onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Your Name"
          required
          value={form.name}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Your Email"
          required
          value={form.email}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          required
          value={form.message}
          onChange={handleChange}
        />
        <button type="submit">{loading ? "Sending..." : "Send"}</button>
      </motion.form>

      {submitted && (
        <motion.p className="sent-msg">✅ Thanks! Your message has been sent.</motion.p>
      )}
    </motion.section>
  );
}

export default Contact;
