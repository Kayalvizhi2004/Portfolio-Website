// src/components/Contact.jsx
import React, { useEffect, useRef, useContext } from "react";
import emailjs from "@emailjs/browser";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { ThemeContext } from "../contexts/ThemeContext";

function Contact() {
  const form = useRef();

  const { theme } = useContext(ThemeContext);

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_9buyjza",
        "template_dqmq34i",
        form.current,
        "h2tGgERAN6RbUmuyp"
      )
      .then(
        () => {
          alert("Email sent successfully!");
          form.current.reset();
        },
        (error) => {
          alert("Failed to send email: " + (error?.text || error));
        }
      );
  };

  /* Inline styling kept to keep single-file component */
  const pageStyles = {
    minHeight: "100vh",
    padding: "48px 20px",
    transition: "background 400ms ease, color 400ms ease",
    fontFamily: "'Poppins', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const containerStyles = {
    display: "flex",
    flexWrap: "wrap",
    gap: "28px",
    justifyContent: "center",
    width: "100%",
    maxWidth: 1100,
  };

  const cardBase = {
    borderRadius: 14,
    padding: 28,
    flex: "1 1 320px",
    maxWidth: 420,
    minWidth: 280,
    boxSizing: "border-box",
    transition: "transform 280ms ease, box-shadow 280ms ease, background 280ms ease",
  };

  const inputStyles = {
    width: "100%",
    padding: "12px 14px",
    marginBottom: 14,
    borderRadius: 10,
    border: "1px solid",
    outline: "none",
    fontSize: 15,
    boxSizing: "border-box",
    transition: "box-shadow 180ms ease, border-color 180ms ease, background 180ms ease",
  };

  const buttonStyles = {
    padding: "12px 18px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: 600,
    fontSize: 15,
    letterSpacing: "0.2px",
    transition: "transform 180ms ease, box-shadow 180ms ease, opacity 180ms ease",
  };

  return (
    <div
      id="contact"
      style={{
        ...pageStyles,
        background: theme === "dark" ? "#0b0d10" : "#f6f8fb",
        color: theme === "dark" ? "#e6f7f7" : "#081227",
      }}
    >
      {/* Theme is controlled globally from the navbar */}

      {/* Title */}
      <h1
        style={{
          fontSize: "2rem",
          margin: "12px 0 26px",
          textAlign: "center",
          letterSpacing: "-0.5px",
          lineHeight: 1.05,
          animation: "glowAnim 2s ease-in-out infinite alternate",
          textShadow:
            theme === "dark"
              ? "0 0 10px #00fff7, 0 0 20px #00fff7, 0 0 30px #00fff7"
              : "0 1px 0 rgba(255,255,255,0.6)",
        }}
      >
        <span style={{ display: "block", fontSize: 18, opacity: 0.75, marginBottom: 6 }}>
          Let's build something together
        </span>
        Contact Me
      </h1>

      {/* Container */}
      <div style={containerStyles}>
        {/* Contact Info Card with Image above details */}
        <div
          style={{
            ...cardBase,
            background: theme === "dark"
              ? "linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))"
              : "linear-gradient(180deg,#ffffff,#fbfdff)",
            border: theme === "dark" ? "1px solid rgba(0,255,247,0.08)" : "1px solid rgba(10,25,60,0.06)",
            boxShadow:
              theme === "dark"
                ? "0 8px 30px rgba(0,0,0,0.6), 0 0 36px rgba(0,255,247,0.04)"
                : "0 10px 30px rgba(20,30,60,0.06)",
            color: "inherit",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          {/* Photo - replace the src with your image path */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: 999,
              overflow: "hidden",
              marginBottom: 16,
              border: theme === "dark" ? "3px solid rgba(0,255,247,0.12)" : "3px solid rgba(0,120,255,0.12)",
              boxShadow: theme === "dark" ? "0 10px 30px rgba(0,255,247,0.06)" : "0 8px 24px rgba(0,120,255,0.06)",
              transition: "transform 300ms, box-shadow 300ms",
            }}
          >
            {/* Use a local image or external URL. Replace path below. */}
            <img
              src="/images/profile.jpg"
              alt="KAYALVIZHI"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                transform: "scale(1)",
                transition: "transform 400ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.06)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              onError={(e) => {
                // graceful fallback if image not found
                e.currentTarget.onerror = null;
                e.currentTarget.src =
                  "data:image/svg+xml;charset=UTF-8," +
                  encodeURIComponent(
                    `<svg xmlns='http://www.w3.org/2000/svg' width='400' height='400'><rect width='100%' height='100%' fill='${theme === "dark" ? "#0b0d10" : "#f6f8fb"}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='${theme === "dark" ? "#e6f7f7" : "#081227"}' font-family='Arial,sans-serif' font-size='20'>Your Photo</text></svg>`
                  );
              }}
            />
          </div>

          <h3 style={{ margin: "6px 0 4px" }}>Get in Touch</h3>
          <div style={{ fontSize: 14, opacity: 0.85, marginBottom: 14 }}>I'd love to hear from you — message me or use the details.</div>

          <div style={{ width: "100%", marginTop: 6 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
              <span
                style={{
                  width: 44,
                  height: 44,
                  display: "inline-grid",
                  placeItems: "center",
                  borderRadius: 10,
                  background: theme === "dark" ? "rgba(0,255,247,0.06)" : "rgba(0,123,255,0.06)",
                  boxShadow: theme === "dark" ? "0 6px 20px rgba(0,255,247,0.03)" : "0 6px 18px rgba(0,125,255,0.04)",
                  color: theme === "dark" ? "#00fff7" : "#0066ff",
                }}
              >
                <FiPhone size={18} />
              </span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 600 }}>Phone</div>
                <div style={{ fontSize: 14, opacity: 0.85 }}>+91 8807606633</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center", marginBottom: 12 }}>
              <span
                style={{
                  width: 44,
                  height: 44,
                  display: "inline-grid",
                  placeItems: "center",
                  borderRadius: 10,
                  background: theme === "dark" ? "rgba(0,255,247,0.04)" : "rgba(255,125,125,0.06)",
                  color: theme === "dark" ? "#a7fff8" : "#e44",
                  boxShadow: theme === "dark" ? "0 6px 20px rgba(0,255,247,0.02)" : "0 6px 18px rgba(255,100,100,0.03)",
                }}
              >
                <FiMail size={18} />
              </span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 600 }}>Email</div>
                <div style={{ fontSize: 14, opacity: 0.85 }}>nkayalvizhi2004@gmail.com</div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "center" }}>
              <span
                style={{
                  width: 44,
                  height: 44,
                  display: "inline-grid",
                  placeItems: "center",
                  borderRadius: 10,
                  background: theme === "dark" ? "rgba(0,255,247,0.03)" : "rgba(80,200,120,0.05)",
                  color: theme === "dark" ? "#bffaf4" : "#148f5a",
                  boxShadow: theme === "dark" ? "0 6px 20px rgba(0,255,247,0.02)" : "0 6px 18px rgba(20,120,70,0.03)",
                }}
              >
                <FiMapPin size={18} />
              </span>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontWeight: 600 }}>Address</div>
                <div style={{ fontSize: 14, opacity: 0.85 }}>Valli Nagar, Dharmapuri, Tamilnadu</div>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card */}
        <form
          ref={form}
          onSubmit={sendEmail}
          style={{
            ...cardBase,
            background: theme === "dark"
              ? "linear-gradient(180deg, rgba(255,255,255,0.01), rgba(255,255,255,0.007))"
              : "#ffffff",
            border: theme === "dark" ? "1px solid rgba(0,255,247,0.06)" : "1px solid rgba(10,25,60,0.06)",
            boxShadow:
              theme === "dark"
                ? "0 10px 30px rgba(0,0,0,0.6)"
                : "0 10px 30px rgba(20,30,60,0.06)",
            color: "inherit",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-8px)")}
          onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
        >
          <h2 style={{ margin: "0 0 12px" }}>Send a Message</h2>

          <input
            name="user_name"
            type="text"
            placeholder="Your name"
            required
            style={{
              ...inputStyles,
              background: theme === "dark" ? "rgba(255,255,255,0.02)" : "#fbfdff",
              borderColor: theme === "dark" ? "rgba(0,255,247,0.12)" : "rgba(10,25,60,0.08)",
              color: "inherit",
            }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = theme === "dark" ? "0 6px 20px rgba(0,255,247,0.06)" : "0 6px 20px rgba(0,120,255,0.06)")}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          />

          <input
            name="user_email"
            type="email"
            placeholder="Your email"
            required
            style={{
              ...inputStyles,
              background: theme === "dark" ? "rgba(255,255,255,0.02)" : "#fbfdff",
              borderColor: theme === "dark" ? "rgba(0,255,247,0.12)" : "rgba(10,25,60,0.08)",
              color: "inherit",
            }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = theme === "dark" ? "0 6px 20px rgba(0,255,247,0.06)" : "0 6px 20px rgba(0,120,255,0.06)")}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          />

          <textarea
            name="message"
            placeholder="Your message"
            required
            style={{
              ...inputStyles,
              height: 128,
              resize: "vertical",
              background: theme === "dark" ? "rgba(255,255,255,0.02)" : "#fbfdff",
              borderColor: theme === "dark" ? "rgba(0,255,247,0.12)" : "rgba(10,25,60,0.08)",
              color: "inherit",
            }}
            onFocus={(e) => (e.currentTarget.style.boxShadow = theme === "dark" ? "0 6px 20px rgba(0,255,247,0.06)" : "0 6px 20px rgba(0,120,255,0.06)")}
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          />

          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 8 }}>
            <button
              type="submit"
              style={{
                ...buttonStyles,
                background: theme === "dark" ? "linear-gradient(90deg,#00fff7,#00b3ff)" : "linear-gradient(90deg,#00aaff,#0077ff)",
                color: theme === "dark" ? "#081227" : "#fff",
                boxShadow: theme === "dark" ? "0 8px 30px rgba(0,183,255,0.12)" : "0 10px 28px rgba(3,102,255,0.18)",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              Send Message
            </button>
          </div>
        </form>
      </div>

      <div style={{ marginTop: 28, opacity: 0.75, fontSize: 13 }}>
        You can also reach me at <strong>nkayalvizhi@gmail.com</strong>
      </div>

      <style>{`
        @media (max-width: 820px) {
          h1 { font-size: 28px !important; }
        }
        input:focus, textarea:focus, button:focus {
          outline: 3px solid rgba(0,0,0,0.06);
          outline-offset: 3px;
        }
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>
    </div>
  );
}

export default Contact;
