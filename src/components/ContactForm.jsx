import { useState } from "react";

const ACC = "#FFE600";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = "Name is required";
    if (!form.email.trim())   e.email   = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Message is required";
    return e;
  };

  const send = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setStatus("sending");

    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ "form-name": "contact", ...form }).toString(),
      });
      if (!res.ok) throw new Error("form submission failed");
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
    setTimeout(() => setStatus("idle"), 5000);
  };

  const field = (key, placeholder, type="text", rows=null) => (
    <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      {errors[key] && <span style={{ fontSize: 10, color: "#ff6b6b", fontFamily: "'DM Mono',monospace", letterSpacing: ".05em" }}>⚠ {errors[key]}</span>}
      {rows ? (
        <textarea
          value={form[key]} onChange={e => setForm(f => ({...f, [key]: e.target.value}))}
          placeholder={placeholder} rows={rows}
          style={{
            background: "rgba(255,255,255,.04)", border: `1px solid ${errors[key] ? "#ff6b6b" : "rgba(255,255,255,.1)"}`,
            borderRadius: 6, padding: "10px 14px", color: "#E8E8F0",
            fontFamily: "'DM Mono',monospace", fontSize: 12, outline: "none",
            resize: "vertical", minHeight: 100, caretColor: ACC,
            transition: "border-color .2s",
          }}
          onFocus={e => e.target.style.borderColor = ACC}
          onBlur={e => e.target.style.borderColor = errors[key] ? "#ff6b6b" : "rgba(255,255,255,.1)"}
        />
      ) : (
        <input
          type={type} value={form[key]} onChange={e => setForm(f => ({...f, [key]: e.target.value}))}
          placeholder={placeholder}
          style={{
            background: "rgba(255,255,255,.04)", border: `1px solid ${errors[key] ? "#ff6b6b" : "rgba(255,255,255,.1)"}`,
            borderRadius: 6, padding: "10px 14px", color: "#E8E8F0",
            fontFamily: "'DM Mono',monospace", fontSize: 12, outline: "none",
            caretColor: ACC, transition: "border-color .2s", width: "100%",
          }}
          onFocus={e => e.target.style.borderColor = ACC}
          onBlur={e => e.target.style.borderColor = errors[key] ? "#ff6b6b" : "rgba(255,255,255,.1)"}
        />
      )}
    </div>
  );

  return (
    <form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" onSubmit={send} style={{ display: "flex", flexDirection: "column", gap: 14, textAlign: "left" }}>
      <input type="hidden" name="form-name" value="contact" />
      <p style={{ position: "absolute", left: "-9999px" }} aria-hidden="true">
        <label>Don't fill this out: <input tabIndex={-1} autoComplete="off" name="bot-field" /></label>
      </p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        {field("name",    "Your Name *")}
        {field("email",   "Your Email *", "email")}
      </div>
      {field("subject",  "Subject (optional)")}
      {field("message",  "Your message… *", "text", 5)}

      <button type="submit" data-hover
        disabled={status === "sending"}
        style={{
          background: status === "success" ? "#00C9A7" : ACC,
          color: "#080810", border: "none", borderRadius: 4,
          padding: "12px 24px", fontFamily: "'DM Mono',monospace",
          fontSize: 12, letterSpacing: ".1em", textTransform: "uppercase",
          fontWeight: 600, cursor: status === "sending" ? "not-allowed" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
          transition: "background .3s, transform .2s",
          transform: status === "sending" ? "scale(.98)" : "scale(1)",
          alignSelf: "flex-start",
        }}>
        {status === "idle"    && <><span>✉</span> Send Message</>}
        {status === "sending" && <><span style={{ display:"inline-block", animation:"spin .8s linear infinite" }}>⟳</span> Sending…</>}
        {status === "success" && <><span>✓</span> Message Sent!</>}
        {status === "error"   && <><span>⚠</span> Try Again</>}
      </button>

      {status === "success" && (
        <p style={{ fontSize: 12, color: "#00C9A7", fontFamily: "'DM Mono',monospace" }}>
          ✓ Thanks! Dhinesh will get back to you soon. 🎬
        </p>
      )}
      {status === "error" && (
        <p style={{ fontSize: 12, color: "#ff6b6b", fontFamily: "'DM Mono',monospace" }}>
          ⚠ Something went wrong. Please email <a href="mailto:javadevdhinesh@gmail.com" style={{ color: "#ff6b6b" }}>javadevdhinesh@gmail.com</a> directly.
        </p>
      )}

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </form>
  );
}
