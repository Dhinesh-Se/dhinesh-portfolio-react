import MovieTicker from "./MovieTicker";

export default function TopNavigation({
  scrolled,
  menuOpen,
  setMenuOpen,
  active,
  navLinks,
  scrollTo,
  accentColor,
  matrixOn,
  onToggleMatrix,
  neoMode,
  onToggleNeo,
  onOpenCommand,
  DlBtn,
  quotes,
  isMobile,
}) {
  const DownloadButton = DlBtn;

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "16px clamp(20px,6vw,60px)",
          background: scrolled || menuOpen ? "rgba(8,8,16,.96)" : "transparent",
          backdropFilter: scrolled || menuOpen ? "blur(16px)" : "none",
          borderBottom: scrolled && !menuOpen ? "1px solid rgba(255,230,0,.08)" : "none",
          transition: "all .3s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <img
            src="/logo.svg"
            alt="Dhinesh logo"
            width={30}
            height={30}
            style={{ borderRadius: 8, boxShadow: "0 0 18px rgba(255,230,0,.2)" }}
          />
          <div className="syne" style={{ fontSize: 16, fontWeight: 700, letterSpacing: ".08em", color: accentColor }}>
            DHINESH
          </div>
        </div>
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {navLinks.map((link) => (
            <span
              key={link}
              data-hover
              onClick={() => scrollTo(link)}
              className={`nav-link ${active === link ? "active" : ""}`}
            >
              {link}
            </span>
          ))}
        </div>
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            data-hover
            onClick={onOpenCommand}
            style={{
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.1)",
              padding: "6px 9px",
              borderRadius: 4,
              fontSize: 11,
              color: "rgba(255,255,255,.55)",
              display: "flex",
              alignItems: "center",
              gap: 3,
              fontFamily: "monospace",
            }}
            title="Command Palette"
          >
            <span>⌘</span>
            <span>K</span>
          </button>
          <button
            data-hover
            onClick={onToggleMatrix}
            style={{
              background: matrixOn ? "rgba(255,230,0,.1)" : "transparent",
              border: `1px solid ${matrixOn ? accentColor : "rgba(255,255,255,.12)"}`,
              color: matrixOn ? accentColor : "#888",
              padding: "5px 10px",
              borderRadius: 3,
              fontSize: 11,
              fontFamily: "'DM Mono',monospace",
            }}
          >
            {matrixOn ? "◼ MATRIX" : "◻ MATRIX"}
          </button>
          <button
            data-hover
            onClick={onToggleNeo}
            style={{
              background: neoMode ? accentColor : "transparent",
              border: "2px solid #111",
              color: "#111",
              padding: "5px 10px",
              borderRadius: 0,
              fontSize: 11,
              fontFamily: "'DM Mono',monospace",
              fontWeight: 700,
            }}
          >
            {neoMode ? "NEO ON" : "NEO OFF"}
          </button>
          <DownloadButton style={{ padding: "7px 14px", fontSize: 11 }} />
        </div>

        <div className="hide-desktop" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            data-hover
            onClick={onOpenCommand}
            style={{
              background: "rgba(255,255,255,.04)",
              border: "1px solid rgba(255,255,255,.1)",
              padding: "5px 8px",
              borderRadius: 4,
              fontSize: 12,
              color: "rgba(255,255,255,.5)",
              fontFamily: "monospace",
            }}
          >
            ⌘
          </button>
          <button
            data-hover
            onClick={onToggleMatrix}
            style={{
              background: matrixOn ? "rgba(255,230,0,.1)" : "rgba(255,255,255,.04)",
              border: `1px solid ${matrixOn ? accentColor : "rgba(255,255,255,.12)"}`,
              color: matrixOn ? accentColor : "rgba(255,255,255,.6)",
              padding: "5px 8px",
              borderRadius: 4,
              fontSize: 12,
              fontFamily: "'DM Mono',monospace",
            }}
          >
            ⌬
          </button>
          <button
            data-hover
            onClick={onToggleNeo}
            style={{
              background: neoMode ? accentColor : "rgba(255,255,255,.04)",
              border: "2px solid #111",
              padding: "5px 8px",
              borderRadius: 0,
              fontSize: 10,
              color: "#111",
              fontFamily: "'DM Mono',monospace",
              fontWeight: 700,
            }}
          >
            NEO
          </button>
          <button
            data-hover
            onClick={() => setMenuOpen((open) => !open)}
            style={{ background: "none", border: "none", padding: 6, display: "flex", flexDirection: "column", gap: 5, zIndex: 201 }}
            aria-label="Menu"
          >
            <span className="bar" style={{ transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span className="bar" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="bar" style={{ transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        </div>
      </nav>

      {isMobile && !menuOpen && (
        <div style={{ position: "fixed", top: 64, left: 16, right: 16, zIndex: 180 }}>
          <MovieTicker quotes={quotes} accentColor={accentColor} />
        </div>
      )}

      {menuOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 199,
            background: "#09090F",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
            padding: "80px clamp(28px,8vw,60px) 40px",
            animation: "slideDown .3s ease",
          }}
        >
          <div style={{ marginBottom: 20 }}>
            <MovieTicker quotes={quotes} accentColor={accentColor} />
          </div>
          <nav style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 36 }}>
            {navLinks.map((link) => (
              <span
                key={link}
                data-hover
                onClick={() => scrollTo(link)}
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(28px,8vw,40px)",
                  letterSpacing: "-.01em",
                  color: active === link ? accentColor : "#555",
                  textTransform: "uppercase",
                  transition: "color .2s",
                  display: "block",
                  padding: "8px 0",
                }}
              >
                <span style={{ fontSize: ".4em", color: accentColor, marginRight: 8 }}>▸</span>
                {link}
              </span>
            ))}
          </nav>
          <DownloadButton cls="btn btn-primary" style={{ maxWidth: 260, width: "100%", justifyContent: "center" }} />
          <div style={{ marginTop: 24, fontSize: 11, color: "rgba(255,255,255,.25)", fontFamily: "'DM Mono',monospace" }}>
            Press ⌘K for command palette
          </div>
        </div>
      )}
    </>
  );
}
