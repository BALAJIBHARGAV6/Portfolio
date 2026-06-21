import { useState } from "react";
import { profile } from "../data/portfolioData.js";
import useReveal from "../hooks/useReveal.js";
import "../styles/contact.css";

export default function Contact() {
  const ref = useReveal();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);

  const handleChange = (field) => (e) => setFormData((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus("sent");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section">
      <div className="wrap wrap--narrow">
        <div className="eyebrow">06 / CONTACT</div>
        <h2 className="h2">
          LET'S BUILD
          <br />
          <span>SOMETHING.</span>
        </h2>
        <p className="contact__intro">
          Open to <mark className="kw">full-time opportunities</mark> and{" "}
          <mark className="kw">freelance projects</mark>. Send a message and I'll reply within 24
          hours.
        </p>

        <div ref={ref} className="reveal contact__panel brut-box">
          {status === "sent" ? (
            <div className="contact__success">
              <div className="contact__success-title">MESSAGE SENT</div>
              <p>Thanks for reaching out — I'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact__form">
              <div className="contact__field">
                <label>NAME</label>
                <input
                  type="text"
                  required
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange("name")}
                />
              </div>
              <div className="contact__field">
                <label>EMAIL</label>
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange("email")}
                />
              </div>
              <div className="contact__field">
                <label>MESSAGE</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  value={formData.message}
                  onChange={handleChange("message")}
                />
              </div>
              <button className="btn btn-solid" type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Sending..." : "Send Message →"}
              </button>
              {status === "error" && (
                <p className="contact__error">
                  Something went wrong. Email me directly at {profile.email}
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}