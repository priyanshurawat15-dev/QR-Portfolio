import React from "react";

const HireMe = () => {
  return (
    <section id="hire" style={{ padding: "60px 20px", textAlign: "center" }}>
      <h2>🚀 Hire Me</h2>

      <p>
        I am a passionate web developer who builds modern and responsive
        websites using React and JavaScript.
      </p>

      <h3>💼 Services</h3>

      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>Portfolio Websites</li>
        <li>Landing Pages</li>
        <li>React Projects</li>
      </ul>

      <div style={{ marginTop: "20px" }}>
        <a
          href="mailto:yourmail@gmail.com"
          style={{
            padding: "10px 20px",
            margin: "10px",
            background: "#4CAF50",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px",
          }}
        >
          Email Me
        </a>

        <a
          href="https://wa.me/91XXXXXXXXXX"
          style={{
            padding: "10px 20px",
            margin: "10px",
            background: "#25D366",
            color: "white",
            textDecoration: "none",
            borderRadius: "5px",
          }}
        >
          WhatsApp
        </a>
      </div>
    </section>
  );
};

export default HireMe;