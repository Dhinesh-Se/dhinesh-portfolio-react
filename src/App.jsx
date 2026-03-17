import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Skills", "Experience", "Projects", "Achievements", "Contact"];

const SKILLS = [
  { cat: "Frontend",      items: ["Angular (v12+)", "TypeScript", "JavaScript ES6+", "HTML5", "CSS3", "Bootstrap", "AngularJS"] },
  { cat: "Backend",       items: ["Java", "Spring Boot", "Spring MVC", "Spring Security", "RESTful APIs", "Microservices", "SOAP"] },
  { cat: "Database",      items: ["MySQL", "PostgreSQL", "PL/SQL (Oracle)", "MongoDB", "Spring Data JPA", "Hibernate"] },
  { cat: "DevOps & Tools",items: ["Docker", "Kubernetes", "Git/GitHub", "Maven", "Postman", "Swagger/OpenAPI", "JIRA"] },
  { cat: "Payments",      items: ["CyberSource", "N-Genius", "e-Wallet Integration", "Installment Flows"] },
];

const EXPERIENCES = [
  {
    company: "Ernst & Young (EY)", role: "Software Engineer",
    period: "Feb 2026 – Present", location: "India", color: "#FFE600",
    desc: "Contributing to high-impact enterprise solutions at one of the world's leading professional services firms.",
    tags: ["Enterprise Solutions", "Consulting", "Full Stack"],
  },
  {
    company: "KGISL Technologies", role: "Junior Associate – Full Stack Developer",
    period: "Dec 2022 – Jan 2026", location: "Coimbatore, India", color: "#00C9A7",
    desc: "Built and delivered large-scale insurance platforms for Dubai-based clients, from policy issuance to claims and compliance.",
    tags: ["Spring Boot", "Angular", "Oracle", "Microservices", "Docker"],
  },
];

const PROJECTS = [
  {
    name: "Free Zone Portal", client: "Dubai Insurance",
    period: "Dec 2024 – Jan 2026", icon: "🏛️",
    tech: ["Spring Boot", "Angular", "Microservices", "Oracle", "Event-Driven Arch."],
    highlights: [
      "Policy issuance & claims modules compliant with Freezone regulations",
      "Tax-invoice generation with automated dispatch from DIN to Freezone entities",
      "Role-Based Access Control (RBAC) for secure data handling",
      "Optimized REST APIs for mobile & web performance",
    ],
  },
  {
    name: "Worker Health Insurance (WHI)", client: "Dubai Insurance",
    period: "Dec 2024 – Jan 2026", icon: "🏥",
    tech: ["Angular", "Java", "Spring Boot", "Oracle", "SOAP", "CyberSource", "N-Genius"],
    highlights: [
      "Delivered entire platform in 30 days under strict government deadlines",
      "Real-time MOHRE data synchronization for regulatory compliance",
      "Installment-based payment flows and COI generation",
      "Dashboard-driven admin panel with finance, audit & reporting",
    ],
  },
  {
    name: "Worker Protection Program (WPP)", client: "Dubai Insurance",
    period: "Jan 2023 – Dec 2024", icon: "🛡️",
    tech: ["Angular", "Java", "Spring Boot", "Oracle", "CyberSource", "N-Genius"],
    highlights: [
      "Reduced premium collection processing time by ~30%",
      "Secure payment gateway integrations (CyberSource, N-Genius)",
      "Automated endorsements, claims workflows & invoice generation",
      "e-Wallet payment system for seamless sponsor premium payments",
    ],
  },
];

const ACHIEVEMENTS = [
  { icon: "⚡", title: "30-Day WHI Delivery",     desc: "Delivered the entire Workers Health Insurance platform in 30 days, meeting strict government go-live deadlines." },
  { icon: "📉", title: "30% Faster Claims",        desc: "Designed a Group Claims Processing workflow that reduced settlement time by 30% — adopted by the client." },
  { icon: "🚀", title: "Bulk Policy Issuance",     desc: "Introduced bulk policy issuance functionality, dramatically improving operational throughput." },
  { icon: "💳", title: "e-Wallet Innovation",      desc: "Integrated an innovative e-wallet system in WPP enabling seamless automatic premium collection." },
];

/* ─────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────── */
function useInView(threshold = 0.1) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 768);
    fn();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return mobile;
}

/* ─────────────────────────────────────────────
   COMPONENTS
───────────────────────────────────────────── */
function FadeIn({ children, delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
    }}>
      {children}
    </div>
  );
}

/* Custom cursor — desktop only */
function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const rafRef  = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const onMove  = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onDown  = () => setClicked(true);
    const onUp    = () => setClicked(false);
    const onHover = (e) => setHovered(!!e.target.closest("a,button,[data-hover]"));

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousemove", onHover);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);

    const tick = () => {
      ringPos.current.x += (mouse.current.x - ringPos.current.x) * 0.11;
      ringPos.current.y += (mouse.current.y - ringPos.current.y) * 0.11;
      if (dotRef.current) {
        dotRef.current.style.left = `${mouse.current.x}px`;
        dotRef.current.style.top  = `${mouse.current.y}px`;
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top  = `${ringPos.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousemove", onHover);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{
        position:"fixed", pointerEvents:"none", zIndex:99999,
        width: clicked ? 6 : 10, height: clicked ? 6 : 10,
        borderRadius:"50%", background:"#FFE600",
        transform:"translate(-50%,-50%)",
        transition:"width .15s, height .15s",
        mixBlendMode:"difference", top:0, left:0,
      }}/>
      <div ref={ringRef} style={{
        position:"fixed", pointerEvents:"none", zIndex:99998,
        width: hovered ? 50 : 36, height: hovered ? 50 : 36,
        borderRadius:"50%",
        border:`1.5px solid ${hovered ? "#FFE600" : "rgba(255,230,0,0.55)"}`,
        transform:"translate(-50%,-50%)",
        transition:"width .3s cubic-bezier(0.34,1.56,0.64,1), height .3s cubic-bezier(0.34,1.56,0.64,1), border-color .2s",
        top:0, left:0,
      }}/>
    </>
  );
}

/* Resume download */
function triggerDownload() {
  const text = `DHINESH V — Full Stack Software Engineer
javadevdhinesh@gmail.com | 8754447528 | Coimbatore, India
LinkedIn: linkedin.com/in/dhineshse | GitHub: github.com/Dhinesh-Se

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROFILE SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Full Stack Software Engineer with 3+ years of experience delivering scalable,
high-performance applications in insurance & financial domains.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WORK EXPERIENCE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ernst & Young (EY) — Software Engineer | Feb 2026 – Present
KGISL Technologies — Junior Associate / Full Stack Developer | Dec 2022 – Jan 2026

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PROJECTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Free Zone Portal | Worker Health Insurance (WHI) | Worker Protection Program (WPP)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SKILLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Frontend:  Angular, TypeScript, JavaScript, HTML5, CSS3
Backend:   Java, Spring Boot, Spring MVC, RESTful APIs, Microservices
Database:  MySQL, Oracle, MongoDB, PostgreSQL
DevOps:    Docker, Kubernetes, Git, Maven, JIRA
Payments:  CyberSource, N-Genius, e-Wallet

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
EDUCATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
B.Tech – Information Technology (2018–2022)
Coimbatore Institute of Engineering and Technology
`;
  const blob = new Blob([text], { type: "text/plain" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href = url; a.download = "Dhinesh_V_Resume.txt"; a.click();
  URL.revokeObjectURL(url);
}

/* Theme tokens */
const THEMES = {
  dark: {
    bg:"#0A0A0F", bg2:"rgba(255,255,255,0.018)",
    card:"rgba(255,255,255,0.032)", cardBorder:"rgba(255,255,255,0.08)",
    text:"#E8E8F0", muted:"#888", faint:"#555",
    navBg:"rgba(10,10,15,0.96)", scrollTrack:"#0A0A0F",
    skillBg:"rgba(255,255,255,0.025)", skillBorder:"rgba(255,255,255,0.1)", skillText:"#aaa",
    dotGrid:"rgba(255,255,255,0.055)", menuBg:"#0D0D14",
  },
  light: {
    bg:"#F4F3EE", bg2:"rgba(0,0,0,0.025)",
    card:"#FFFFFF", cardBorder:"rgba(0,0,0,0.09)",
    text:"#111118", muted:"#555", faint:"#999",
    navBg:"rgba(244,243,238,0.96)", scrollTrack:"#F4F3EE",
    skillBg:"rgba(0,0,0,0.03)", skillBorder:"rgba(0,0,0,0.11)", skillText:"#444",
    dotGrid:"rgba(0,0,0,0.065)", menuBg:"#EFEDE6",
  },
};

/* ─────────────────────────────────────────────
   MAIN
───────────────────────────────────────────── */
export default function Portfolio() {
  const [active,   setActive]   = useState("About");
  const [scrolled, setScrolled] = useState(false);
  const [isDark,   setIsDark]   = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dlState,  setDlState]  = useState("idle");
  const isMobile = useIsMobile();

  const T   = THEMES[isDark ? "dark" : "light"];
  const ACC = "#FFE600";

  /* lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setActive(id);
    setMenuOpen(false);
  };

  const handleDownload = () => {
    setDlState("loading");
    setTimeout(() => { triggerDownload(); setDlState("done"); }, 600);
    setTimeout(() => setDlState("idle"), 2600);
  };

  /* Reusable download button */
  const DlBtn = ({ cls = "btn btn-primary", style = {} }) => (
    <button data-hover className={cls} onClick={handleDownload}
      style={{ minWidth: 148, justifyContent: "center", ...style }}>
      {dlState === "idle"    && <><span>↓</span> Download CV</>}
      {dlState === "loading" && <><span style={{ display:"inline-block", animation:"spin .8s linear infinite" }}>⟳</span> Preparing…</>}
      {dlState === "done"    && <><span>✓</span> Downloaded!</>}
    </button>
  );

  return (
    <div style={{
      fontFamily:"'DM Mono',monospace",
      background: T.bg, color: T.text,
      minHeight:"100vh", overflowX:"hidden",
      cursor: isMobile ? "auto" : "none",
      transition:"background .35s, color .35s",
    }}>
      {!isMobile && <CustomCursor />}

      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@600;700;800&display=swap');
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        html { scroll-behavior:smooth; }
        ${!isMobile ? "* { cursor:none !important; }" : ""}
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:${T.scrollTrack}; }
        ::-webkit-scrollbar-thumb { background:${ACC}; border-radius:2px; }

        .syne { font-family:'Syne',sans-serif; }

        /* Nav link */
        .nav-link {
          position:relative; font-size:12px; letter-spacing:.1em;
          color:${T.muted}; text-transform:uppercase; transition:color .2s;
          white-space:nowrap;
        }
        .nav-link:hover,.nav-link.active { color:${ACC}; }
        .nav-link::after {
          content:''; position:absolute; bottom:-4px; left:0;
          width:0; height:1px; background:${ACC}; transition:width .3s;
        }
        .nav-link:hover::after,.nav-link.active::after { width:100%; }

        /* Mobile nav link */
        .mobile-nav-link {
          font-family:'Syne',sans-serif; font-weight:700;
          font-size:clamp(28px,8vw,40px); letter-spacing:-.01em;
          color:${T.muted}; text-transform:uppercase;
          transition:color .2s, transform .2s;
          display:block; padding:10px 0;
        }
        .mobile-nav-link:hover { color:${ACC}; transform:translateX(8px); }

        /* Card */
        .card {
          background:${T.card}; border:1px solid ${T.cardBorder};
          border-radius:6px;
          transition:border-color .3s, transform .3s, background .35s, box-shadow .3s;
        }
        .card:hover { border-color:rgba(255,230,0,.32); transform:translateY(-3px); box-shadow:0 8px 32px rgba(0,0,0,.15); }

        /* Skill pill */
        .skill-pill {
          padding:5px 12px; border:1px solid ${T.skillBorder}; border-radius:3px;
          font-size:11px; color:${T.skillText}; background:${T.skillBg};
          transition:all .2s; white-space:nowrap;
        }
        .skill-pill:hover { border-color:${ACC}; color:${ACC}; background:rgba(255,230,0,.05); transform:translateY(-1px); }

        /* Tag */
        .tag {
          display:inline-block; padding:3px 9px;
          background:rgba(255,230,0,.07); border:1px solid rgba(255,230,0,.22);
          color:${ACC}; font-size:10px; letter-spacing:.07em; border-radius:3px;
        }

        /* Section labels */
        .section-label { font-size:10px; letter-spacing:.22em; color:${ACC}; text-transform:uppercase; }
        .section-h { font-family:'Syne',sans-serif; font-weight:800; font-size:clamp(28px,5vw,52px); line-height:1.05; color:${T.text}; }

        /* Buttons */
        .btn {
          display:inline-flex; align-items:center; gap:7px;
          padding:11px 22px; font-family:'DM Mono',monospace;
          font-size:12px; letter-spacing:.1em; text-transform:uppercase;
          border-radius:3px; border:2px solid; transition:all .22s; text-decoration:none;
        }
        .btn-primary { background:${ACC}; color:#0A0A0F; border-color:${ACC}; font-weight:500; }
        .btn-primary:hover { background:transparent; color:${ACC}; }
        .btn-outline { background:transparent; color:${T.text}; border-color:${T.cardBorder}; }
        .btn-outline:hover { border-color:${ACC}; color:${ACC}; }
        .btn-full { width:100%; justify-content:center; }

        /* Dot grid */
        .dot-grid { background-image:radial-gradient(${T.dotGrid} 1px,transparent 1px); background-size:28px 28px; }

        /* Project bg number */
        .pnum {
          font-family:'Syne',sans-serif; font-weight:800; font-size:72px;
          color:${isDark?"rgba(255,230,0,.035)":"rgba(0,0,0,.04)"};
          position:absolute; top:-12px; right:18px; line-height:1;
          pointer-events:none; user-select:none;
        }

        /* Animations */
        @keyframes pulse  { 0%,100%{opacity:1} 50%{opacity:.3} }
        @keyframes spin   { to{transform:rotate(360deg)} }
        @keyframes slideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeUp    { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }

        .pulse { animation:pulse 2s infinite; }

        /* Hamburger bars */
        .bar { display:block; width:24px; height:2px; background:${T.text}; border-radius:2px; transition:all .3s; }

        /* Toggle */
        .toggle-track {
          width:44px; height:23px; border-radius:12px;
          border:1.5px solid ${isDark?"rgba(255,255,255,.15)":"rgba(0,0,0,.15)"};
          background:${isDark?"rgba(255,255,255,.06)":"rgba(0,0,0,.07)"};
          position:relative; transition:all .3s; flex-shrink:0;
        }
        .toggle-thumb {
          position:absolute; top:3px;
          left:${isDark?"3px":"19px"};
          width:15px; height:15px; border-radius:50%;
          background:${ACC}; transition:left .3s cubic-bezier(.34,1.56,.64,1);
          box-shadow:0 0 8px rgba(255,230,0,.45);
        }

        /* Responsive helpers */
        @media(max-width:768px){
          .hide-mobile { display:none !important; }
          .btn { padding:10px 18px; font-size:11px; }
          .card:hover { transform:none; }
        }
        @media(min-width:769px){
          .hide-desktop { display:none !important; }
        }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:200, height:60,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        padding:"0 clamp(16px,5vw,72px)",
        background: scrolled || menuOpen ? T.navBg : "transparent",
        backdropFilter: scrolled || menuOpen ? "blur(14px)" : "none",
        borderBottom: scrolled && !menuOpen ? `1px solid ${T.cardBorder}` : "none",
        transition:"background .3s, border-color .3s",
      }}>
        {/* Logo */}
        <span data-hover onClick={() => scrollTo("About")} style={{
          fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:20,
          color:ACC, letterSpacing:".02em", cursor:"pointer",
        }}>DV<span style={{color:T.text}}>.</span></span>

        {/* Desktop nav */}
        <div className="hide-mobile" style={{ display:"flex", alignItems:"center", gap:24 }}>
          {NAV_LINKS.map(l => (
            <span key={l} data-hover className={`nav-link ${active===l?"active":""}`} onClick={() => scrollTo(l)}>{l}</span>
          ))}
          {/* Theme toggle */}
          <div style={{ display:"flex", alignItems:"center", gap:7 }}>
            <span style={{ fontSize:13 }}>{isDark?"🌙":"☀️"}</span>
            <div data-hover className="toggle-track" onClick={() => setIsDark(d=>!d)} title="Toggle theme">
              <div className="toggle-thumb"/>
            </div>
          </div>
          <DlBtn style={{ padding:"7px 14px", fontSize:11 }}/>
        </div>

        {/* Mobile right: theme toggle + hamburger */}
        <div className="hide-desktop" style={{ display:"flex", alignItems:"center", gap:14 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ fontSize:13 }}>{isDark?"🌙":"☀️"}</span>
            <div data-hover className="toggle-track" onClick={() => setIsDark(d=>!d)}>
              <div className="toggle-thumb"/>
            </div>
          </div>
          {/* Hamburger button */}
          <button
            data-hover
            onClick={() => setMenuOpen(o=>!o)}
            style={{ background:"none", border:"none", padding:6, display:"flex", flexDirection:"column", gap:5, zIndex:201 }}
            aria-label="Menu"
          >
            <span className="bar" style={{ transform: menuOpen?"rotate(45deg) translate(5px,5px)":"none" }}/>
            <span className="bar" style={{ opacity: menuOpen?0:1, transform: menuOpen?"scaleX(0)":"none" }}/>
            <span className="bar" style={{ transform: menuOpen?"rotate(-45deg) translate(5px,-5px)":"none" }}/>
          </button>
        </div>
      </nav>

      {/* ── MOBILE FULLSCREEN MENU ── */}
      {menuOpen && (
        <div style={{
          position:"fixed", inset:0, zIndex:199,
          background:T.menuBg,
          display:"flex", flexDirection:"column",
          justifyContent:"center", alignItems:"flex-start",
          padding:"80px clamp(28px,8vw,60px) 40px",
          animation:"slideDown .3s ease",
        }}>
          <nav style={{ display:"flex", flexDirection:"column", gap:4, marginBottom:48 }}>
            {NAV_LINKS.map((l,i) => (
              <span key={l} className="mobile-nav-link"
                onClick={() => scrollTo(l)}
                style={{ animationDelay:`${i*0.05}s`, color: active===l ? ACC : T.muted }}>
                <span style={{ fontSize:"0.45em", color:ACC, marginRight:8, verticalAlign:"middle" }}>▸</span>{l}
              </span>
            ))}
          </nav>
          <DlBtn cls="btn btn-primary btn-full" style={{ maxWidth:280 }}/>
          <div style={{ marginTop:36, display:"flex", flexDirection:"column", gap:10 }}>
            {[["📧","javadevdhinesh@gmail.com"],["📱","8754447528"],["📍","Coimbatore, India"]].map(([ic,v])=>(
              <div key={v} style={{ color:T.muted, fontSize:12, display:"flex", alignItems:"center", gap:8 }}>
                <span>{ic}</span>{v}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="about" className="dot-grid" style={{
        minHeight:"100vh", display:"flex", alignItems:"center",
        padding:"100px clamp(20px,7vw,120px) 72px",
        position:"relative", overflow:"hidden",
      }}>
        <div style={{ position:"absolute", top:"10%", right:"4%", width:"min(420px,50vw)", height:"min(420px,50vw)", background:"radial-gradient(circle,rgba(255,230,0,.065) 0%,transparent 70%)", pointerEvents:"none" }}/>
        <div style={{ position:"absolute", bottom:"12%", left:"2%", width:"min(300px,40vw)", height:"min(300px,40vw)", background:"radial-gradient(circle,rgba(0,201,167,.045) 0%,transparent 70%)", pointerEvents:"none" }}/>

        <div style={{ maxWidth:880, width:"100%" }}>
          {/* Status */}
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
            <div className="pulse" style={{ width:8, height:8, borderRadius:"50%", background:"#00C9A7", flexShrink:0 }}/>
            <span className="section-label">Available for Opportunities</span>
          </div>

          {/* Name */}
          <h1 className="syne" style={{
            fontWeight:800, lineHeight:.88, letterSpacing:"-.03em",
            fontSize:"clamp(52px,11vw,124px)", marginBottom:20, color:T.text,
          }}>
            DHINESH<br/>
            <span style={{ color:ACC, textShadow:"0 0 50px rgba(255,230,0,.28)" }}>V.</span>
          </h1>

          {/* Role line */}
          <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:22, flexWrap:"wrap" }}>
            <div style={{ width:36, height:2, background:ACC, flexShrink:0 }}/>
            <p style={{ fontSize:"clamp(12px,1.8vw,16px)", color:T.muted, letterSpacing:".04em" }}>
              Senior Software Engineer <span style={{ color:ACC }}>@</span> Ernst & Young
            </p>
          </div>

          {/* Bio */}
          <p style={{ fontSize:"clamp(13px,1.5vw,16px)", color:T.muted, maxWidth:580, lineHeight:1.9, marginBottom:36, fontWeight:300 }}>
            3+ years building scalable enterprise apps in insurance & fintech. Expert in{" "}
            <span style={{ color:T.text }}>Java · Spring Boot · Angular</span> — from microservices to secure payment gateways and regulatory compliance.
          </p>

          {/* CTA buttons */}
          <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:48 }}>
            <button data-hover className="btn btn-primary" onClick={() => scrollTo("Projects")}>View Projects →</button>
            <button data-hover className="btn btn-outline" onClick={() => scrollTo("Contact")}>Get In Touch</button>
            <DlBtn cls="btn btn-outline"/>
          </div>

          {/* Stats */}
          <div style={{ display:"flex", gap:"clamp(20px,5vw,44px)", flexWrap:"wrap" }}>
            {[["3+","Years Exp."],["3","Platforms"],["30%","Faster Claims"],["30d","WHI Delivery"]].map(([n,l])=>(
              <div key={l}>
                <div className="syne" style={{ fontWeight:800, fontSize:"clamp(22px,3.5vw,38px)", color:ACC }}>{n}</div>
                <div style={{ fontSize:10, color:T.faint, letterSpacing:".1em", textTransform:"uppercase", marginTop:2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" style={{ padding:"80px clamp(20px,7vw,120px)", background:T.bg2 }}>
        <FadeIn>
          <span className="section-label">Technical Arsenal</span>
          <h2 className="section-h" style={{ marginTop:6, marginBottom:40 }}>
            Skills &<br/><span style={{ color:ACC }}>Technologies</span>
          </h2>
        </FadeIn>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,260px),1fr))", gap:16 }}>
          {SKILLS.map((s,i)=>(
            <FadeIn key={s.cat} delay={i*.08}>
              <div className="card" style={{ padding:"22px 24px", height:"100%" }}>
                <div style={{ fontSize:10, letterSpacing:".16em", color:ACC, marginBottom:16, textTransform:"uppercase" }}>{s.cat}</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                  {s.items.map(item=><span key={item} data-hover className="skill-pill">{item}</span>)}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" style={{ padding:"80px clamp(20px,7vw,120px)" }}>
        <FadeIn>
          <span className="section-label">Career Path</span>
          <h2 className="section-h" style={{ marginTop:6, marginBottom:40 }}>
            Work<br/><span style={{ color:ACC }}>Experience</span>
          </h2>
        </FadeIn>
        <div style={{ position:"relative", paddingLeft: isMobile ? 20 : 28 }}>
          <div style={{ position:"absolute", left:0, top:8, bottom:8, width:1, background:`linear-gradient(to bottom,${ACC},rgba(255,230,0,.08))` }}/>
          {EXPERIENCES.map((exp,i)=>(
            <FadeIn key={exp.company} delay={i*.13}>
              <div style={{ position:"relative", marginBottom:36 }}>
                <div style={{ position:"absolute", left: isMobile ? -26 : -34, top:8, width:11, height:11, borderRadius:"50%", background:exp.color, boxShadow:`0 0 14px ${exp.color}80` }}/>
                <div className="card" style={{ padding: isMobile ? "20px 18px" : "24px 28px" }}>
                  {/* Company + period */}
                  <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:6, marginBottom:6 }}>
                    <div>
                      <h3 className="syne" style={{ fontWeight:700, fontSize:"clamp(15px,2.5vw,19px)", color:T.text }}>{exp.company}</h3>
                      <div style={{ color:exp.color, fontSize:12, marginTop:2 }}>{exp.role}</div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <div style={{ fontSize:11, color:T.faint }}>{exp.period}</div>
                      <div style={{ fontSize:10, color:T.faint, marginTop:2 }}>📍 {exp.location}</div>
                    </div>
                  </div>
                  <p style={{ color:T.muted, fontSize:13, lineHeight:1.75, margin:"10px 0 14px" }}>{exp.desc}</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {exp.tags.map(t=><span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" style={{ padding:"80px clamp(20px,7vw,120px)", background:T.bg2 }}>
        <FadeIn>
          <span className="section-label">Featured Work</span>
          <h2 className="section-h" style={{ marginTop:6, marginBottom:40 }}>
            Key<br/><span style={{ color:ACC }}>Projects</span>
          </h2>
        </FadeIn>
        <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
          {PROJECTS.map((p,i)=>(
            <FadeIn key={p.name} delay={i*.1}>
              <div className="card" style={{ padding: isMobile ? "24px 20px" : "30px 34px", position:"relative", overflow:"hidden" }}>
                {!isMobile && <div className="pnum">{String(i+1).padStart(2,"0")}</div>}
                {/* Header */}
                <div style={{ display:"flex", alignItems:"flex-start", gap:12, marginBottom:14, flexWrap:"wrap" }}>
                  <span style={{ fontSize:28, lineHeight:1, flexShrink:0 }}>{p.icon}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <h3 className="syne" style={{ fontWeight:700, fontSize:"clamp(15px,2.5vw,20px)", color:T.text }}>{p.name}</h3>
                    <div style={{ color:T.faint, fontSize:11, marginTop:2 }}>{p.client} · {p.period}</div>
                  </div>
                </div>
                {/* Tech tags */}
                <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:16 }}>
                  {p.tech.map(t=><span key={t} className="tag">{t}</span>)}
                </div>
                {/* Highlights — single col on mobile, 2 col on desktop */}
                <ul style={{
                  listStyle:"none",
                  display:"grid",
                  gridTemplateColumns: isMobile ? "1fr" : "repeat(2,1fr)",
                  gap:"6px 20px",
                }}>
                  {p.highlights.map((h,j)=>(
                    <li key={j} style={{ display:"flex", gap:8, alignItems:"flex-start", color:T.muted, fontSize:12, lineHeight:1.65 }}>
                      <span style={{ color:ACC, marginTop:2, flexShrink:0, fontSize:9 }}>▸</span>{h}
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section id="achievements" style={{ padding:"80px clamp(20px,7vw,120px)" }}>
        <FadeIn>
          <span className="section-label">Impact</span>
          <h2 className="section-h" style={{ marginTop:6, marginBottom:40 }}>
            Key<br/><span style={{ color:ACC }}>Achievements</span>
          </h2>
        </FadeIn>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(min(100%,240px),1fr))", gap:16 }}>
          {ACHIEVEMENTS.map((a,i)=>(
            <FadeIn key={a.title} delay={i*.08}>
              <div className="card" style={{ padding:"22px 24px", height:"100%" }}>
                <div style={{ fontSize:32, marginBottom:12 }}>{a.icon}</div>
                <h3 className="syne" style={{ fontWeight:700, fontSize:15, marginBottom:8, color:ACC }}>{a.title}</h3>
                <p style={{ color:T.muted, fontSize:12, lineHeight:1.75 }}>{a.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section style={{ padding:"52px clamp(20px,7vw,120px)", background:T.bg2 }}>
        <FadeIn>
          <div className="card" style={{ padding: isMobile ? "22px 20px" : "28px 34px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:16, alignItems:"center" }}>
              <div>
                <div className="section-label" style={{ marginBottom:7 }}>Education</div>
                <h3 className="syne" style={{ fontWeight:700, fontSize:"clamp(15px,2.5vw,19px)", color:T.text }}>B.Tech – Information Technology</h3>
                <p style={{ color:T.muted, fontSize:13, marginTop:3 }}>Coimbatore Institute of Engineering and Technology</p>
              </div>
              <div style={{ textAlign: isMobile ? "left" : "right" }}>
                <div style={{ color:ACC, fontSize:13 }}>2018 – 2022</div>
                <div style={{ marginTop:8 }}><span className="tag">Java Programming – Beginner to Master</span></div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding:"80px clamp(20px,7vw,120px)", textAlign:"center" }}>
        <FadeIn>
          <span className="section-label">Let's Connect</span>
          <h2 className="section-h" style={{ marginTop:6, marginBottom:14 }}>
            Get In<br/><span style={{ color:ACC }}>Touch</span>
          </h2>
          <p style={{ color:T.muted, fontSize:14, maxWidth:440, margin:"0 auto 40px", lineHeight:1.85 }}>
            Open to new opportunities, collaborations, or just a good tech conversation.
          </p>

          {/* Buttons */}
          <div style={{ display:"flex", justifyContent:"center", gap:10, flexWrap:"wrap", marginBottom:40 }}>
            <a data-hover href="mailto:javadevdhinesh@gmail.com" className="btn btn-primary" style={{ textDecoration:"none" }}>✉ Email Me</a>
            <a data-hover href="https://linkedin.com/in/dhineshse" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ textDecoration:"none" }}>LinkedIn ↗</a>
            <a data-hover href="https://github.com/Dhinesh-Se" target="_blank" rel="noreferrer" className="btn btn-outline" style={{ textDecoration:"none" }}>GitHub ↗</a>
            <DlBtn cls="btn btn-outline"/>
          </div>

          {/* Contact info — stack vertically on mobile */}
          <div style={{ display:"flex", justifyContent:"center", gap: isMobile ? 16 : 36, flexWrap:"wrap", flexDirection: isMobile ? "column" : "row", alignItems:"center" }}>
            {[["📧","javadevdhinesh@gmail.com"],["📱","8754447528"],["📍","Coimbatore, India"]].map(([ic,v])=>(
              <div key={v} style={{ color:T.faint, fontSize:12, display:"flex", alignItems:"center", gap:7 }}>
                <span>{ic}</span>{v}
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        padding:"22px clamp(20px,7vw,120px)",
        borderTop:`1px solid ${T.cardBorder}`,
        display:"flex", justifyContent:"space-between", alignItems:"center",
        flexWrap:"wrap", gap:10,
        flexDirection: isMobile ? "column" : "row",
        textAlign: isMobile ? "center" : "left",
      }}>
        <span className="syne" style={{ fontWeight:800, color:ACC, fontSize:19 }}>DV.</span>
        <span style={{ color:T.faint, fontSize:11 }}>© 2026 Dhinesh V · Full Stack Software Engineer @ EY</span>
        <DlBtn cls="btn btn-outline" style={{ padding:"6px 14px", fontSize:10 }}/>
      </footer>
    </div>
  );
}
