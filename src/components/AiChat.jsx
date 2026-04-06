import { useState, useRef, useEffect } from "react";

const ACC = "var(--accent-cyan)";

const SYSTEM_PROMPT = `You are Dhinesh V's portfolio assistant. You answer questions about Dhinesh concisely and professionally. Here is everything about him:

NAME: Dhinesh V
EMAIL: javadevdhinesh@gmail.com | PHONE: 8754447528 | LOCATION: Coimbatore, India
LINKEDIN: linkedin.com/in/dhineshse | GITHUB: github.com/Dhinesh-Se

CURRENT ROLE: Software Engineer at Ernst & Young (EY) — Feb 2026 to Present
PREVIOUS ROLE: Junior Associate / Full Stack Developer at KGISL Technologies — Dec 2022 to Jan 2026

SKILLS:
- Frontend: Angular (v12+), TypeScript, JavaScript ES6+, HTML5, CSS3, Bootstrap, AngularJS
- Backend: Java, Spring Boot, Spring MVC, Spring Security, RESTful APIs, Microservices, SOAP
- Database: MySQL, PostgreSQL, PL/SQL (Oracle), MongoDB, Spring Data JPA, Hibernate
- DevOps: Docker, Kubernetes, Git/GitHub, Maven, Postman, Swagger/OpenAPI, JIRA
- Payments: CyberSource, N-Genius, e-Wallet Integration, Installment Flows

PROJECTS:
1. Free Zone Portal (Dubai Insurance, Dec 2024–Jan 2026): Spring Boot, Angular, Microservices, Oracle. Policy issuance & claims, RBAC, tax-invoice generation.
2. Worker Health Insurance — WHI (Dubai Insurance, Dec 2024–Jan 2026): Delivered in 30 days, MOHRE sync, installment payments, admin dashboard.
3. Worker Protection Program — WPP (Dubai Insurance, Jan 2023–Dec 2024): ~30% faster premium processing, CyberSource/N-Genius payments, e-wallet integration.

KEY ACHIEVEMENTS:
- Delivered WHI platform in 30 days under government deadline
- Group Claims workflow reduced settlement time by 30%
- Introduced Bulk Policy Issuance
- Innovative e-wallet system in WPP

EDUCATION: B.Tech Information Technology, Coimbatore Institute of Engineering and Technology (2018–2022)
CERTIFICATE: Learn Java Programming – Beginner to Master

PERSONAL: Dhinesh is a huge Hollywood movie fan. Favourite genres include action, thriller and sci-fi. He loves the cinematic experience.

Answer questions only about Dhinesh. Be friendly, concise (2-3 sentences max unless more detail is asked). If asked about something unrelated, politely redirect to portfolio topics.`;

export default function AiChat({ externalOpen = false, onExternalClose = () => {} }) {
  const [open, setOpen] = useState(false);
  useEffect(() => { if (externalOpen) { setOpen(true); onExternalClose(); } }, [externalOpen]);
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hey! 👋 I'm Dhinesh's AI assistant. Ask me anything about his skills, projects, experience, or even his taste in movies! 🎬" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 100); }
  }, [open]);

  // Pulse badge after 3s to attract attention
  useEffect(() => {
    const t = setTimeout(() => setUnread(1), 3000);
    return () => clearTimeout(t);
  }, []);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg = { role: "user", content: text };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const history = [...messages, userMsg]
        .filter(m => m.role !== "assistant" || messages.indexOf(m) > 0) // skip greeting
        .map(m => ({ role: m.role, content: m.content }));

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: history,
        }),
      });
      const data = await res.json();
      const reply = data.content?.map(b => b.text).join("") || "Sorry, I couldn't get a response right now.";
      setMessages(m => [...m, { role: "assistant", content: reply }]);
      if (!open) setUnread(u => u + 1);
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "Oops! Something went wrong. Try again in a moment. 🎬" }]);
    } finally {
      setLoading(false);
    }
  };

  const SUGGESTIONS = [
    "What tech does Dhinesh know?",
    "Tell me about the WHI project",
    "What movies does he love?",
    "Is he open to work?",
  ];

  return (
    <>
      {/* Floating trigger */}
      <button
        data-hover
        onClick={() => setOpen(o => !o)}
        style={{
          position: "fixed", bottom: 88, right: 28, zIndex: 400,
          width: 52, height: 52, borderRadius: "50%",
          background: open ? "#222" : ACC, border: open ? `2px solid ${ACC}` : "none",
          fontSize: 22, cursor: "pointer",
          boxShadow: `0 4px 24px rgba(255,230,0,${open ? ".15" : ".45"})`,
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: "all .3s cubic-bezier(.34,1.56,.64,1)",
          transform: open ? "rotate(10deg) scale(1.05)" : "scale(1)",
        }}
        title="Ask about Dhinesh"
      >
        {open ? "✕" : "🤖"}
        {!open && unread > 0 && (
          <span style={{
            position: "absolute", top: -3, right: -3,
            width: 16, height: 16, borderRadius: "50%",
            background: "#ff4444", fontSize: 9, color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "monospace", fontWeight: 700,
            animation: "pulse 2s infinite",
          }}>{unread}</span>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div style={{
          position: "fixed", bottom: 152, right: 28, zIndex: 400,
          width: "min(380px, calc(100vw - 40px))",
          background: "#0E0E18",
          border: `1px solid rgba(255,230,0,.25)`,
          borderRadius: 12,
          boxShadow: "0 24px 80px rgba(0,0,0,.7), 0 0 0 1px rgba(255,230,0,.08)",
          display: "flex", flexDirection: "column",
          overflow: "hidden",
          animation: "slideUp .3s cubic-bezier(.34,1.56,.64,1)",
          maxHeight: "70vh",
        }}>
          {/* Header */}
          <div style={{
            padding: "14px 16px", background: "rgba(255,230,0,.05)",
            borderBottom: "1px solid rgba(255,255,255,.07)",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg,${ACC},#00C9A7)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🤖</div>
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 13, color: "#E8E8F0" }}>Ask Dhinesh's AI</div>
              <div style={{ fontSize: 10, color: "#00C9A7", display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00C9A7", display: "inline-block", animation: "pulse 2s infinite" }} />
                Online · Powered by Claude
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ marginLeft: "auto", background: "none", border: "none", color: "rgba(255,255,255,.4)", fontSize: 16, cursor: "pointer", padding: 4 }}>✕</button>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "14px 14px 8px", display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "82%",
                  padding: "9px 13px",
                  borderRadius: msg.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                  background: msg.role === "user" ? ACC : "rgba(255,255,255,.06)",
                  color: msg.role === "user" ? "#080810" : "#E8E8F0",
                  fontSize: 12, lineHeight: 1.65,
                  fontFamily: "'DM Mono',monospace",
                  border: msg.role === "assistant" ? "1px solid rgba(255,255,255,.08)" : "none",
                }}>
                  {msg.content}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ padding: "9px 13px", borderRadius: "12px 12px 12px 2px", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.08)", display: "flex", gap: 5, alignItems: "center" }}>
                  {[0,1,2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: ACC, display: "inline-block", animation: `bounce 1.2s ease ${i*.15}s infinite` }} />)}
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggestions (only when no user messages yet) */}
          {messages.filter(m => m.role === "user").length === 0 && (
            <div style={{ padding: "0 14px 10px", display: "flex", flexWrap: "wrap", gap: 6 }}>
              {SUGGESTIONS.map(s => (
                <button key={s} data-hover onClick={() => { setInput(s); setTimeout(() => inputRef.current?.focus(), 50); }}
                  style={{ background: "rgba(255,230,0,.07)", border: "1px solid rgba(255,230,0,.2)", borderRadius: 20, padding: "4px 10px", fontSize: 10, color: ACC, fontFamily: "'DM Mono',monospace", cursor: "pointer", transition: "background .2s" }}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,.07)", display: "flex", gap: 8, alignItems: "center" }}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
              placeholder="Ask anything about Dhinesh…"
              style={{
                flex: 1, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)",
                borderRadius: 8, padding: "8px 12px", color: "#E8E8F0",
                fontFamily: "'DM Mono',monospace", fontSize: 12, outline: "none",
                caretColor: ACC,
              }}
            />
            <button data-hover onClick={send} disabled={!input.trim() || loading}
              style={{
                width: 34, height: 34, borderRadius: 8, background: input.trim() && !loading ? ACC : "rgba(255,255,255,.06)",
                border: "none", cursor: input.trim() && !loading ? "pointer" : "not-allowed",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14,
                transition: "background .2s",
                color: input.trim() && !loading ? "#080810" : "#444",
              }}>
              {loading ? <span style={{ animation: "spin .8s linear infinite", display: "inline-block" }}>⟳</span> : "↑"}
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp { from { opacity:0; transform:translateY(16px) scale(.97); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes bounce { 0%,80%,100% { transform:translateY(0); } 40% { transform:translateY(-6px); } }
        @keyframes pulse { 0%,100%{opacity:1}50%{opacity:.3} }
        @keyframes spin { to{transform:rotate(360deg)} }
      `}</style>
    </>
  );
}
