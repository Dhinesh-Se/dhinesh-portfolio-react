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
            onClick={() => setMenuOpen((open) => !open)}
            style={{ background: "none", border: "none", color: "white", padding: 6, display: "flex", flexDirection: "column", gap: 5, zIndex: 201 }}
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
        <>
          <div 
            onClick={() => setMenuOpen(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 195,
              background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)",
              animation: "fadeIn 0.3s ease"
            }} 
          />
          <div
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0,
              width: "280px", maxWidth: "85vw", zIndex: 199,
              background: "rgba(5, 5, 8, 0.95)", backdropFilter: "blur(20px)",
              borderLeft: `1px solid ${accentColor}40`,
              display: "flex", flexDirection: "column",
              justifyContent: "flex-start", alignItems: "flex-start",
              padding: "80px 30px 40px",
              boxShadow: "-10px 0 30px rgba(0,0,0,0.8)",
              animation: "slideInRight .3s ease",
            }}
          >
            <nav style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36, width: "100%" }}>
              {navLinks.map((link) => (
                <span
                  key={link}
                  data-hover
                  onClick={() => {
                    scrollTo(link);
                    setMenuOpen(false);
                  }}
                  style={{
                    fontFamily: "'Syne',sans-serif", fontWeight: 700,
                    fontSize: "24px", letterSpacing: "1px",
                    color: active === link ? accentColor : "#888",
                    textTransform: "uppercase", transition: "color .2s",
                    display: "block", padding: "8px 0",
                    borderBottom: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <span style={{ fontSize: "14px", color: accentColor, marginRight: 12 }}>{active === link ? "■" : "◻"}</span>
                  {link}
                </span>
              ))}
            </nav>
            <DownloadButton cls="btn-cyber" style={{ width: "100%", justifyContent: "center", marginBottom: 24 }} />
            
            <div style={{ marginTop: "auto", fontSize: 11, color: "rgba(255,255,255,.3)", fontFamily: "'DM Mono',monospace" }}>
              Press ⌘K for command palette
            </div>
          </div>
        </>
      )}
    </>
  );
}
