import { useState, useEffect, useRef } from "react";

const C = {
  bg: "#F7F6F2",
  surface: "#FFFFFF",
  border: "#E8E4DC",
  borderSubtle: "#F0EDE8",
  text: "#1A1916",
  textSecondary: "#7A756C",
  textTertiary: "#B5B0A6",
  accent: "#8C7B65",
  accentLight: "#F0EAE0",
  faint: "#FAF7F3",
};

const FONTS = {
  display: "'Cormorant', Georgia, serif",
  body: "'DM Sans', sans-serif",
};

// ─── ENSO ────────────────────────────────────────────────────────────
function Enso({ size = 600, opacity = 0.07, animate = false }) {
  const circumference = Math.PI * (size * 0.44) * 2;
  return (
    <svg width={size} height={size} viewBox="0 0 600 600"
      style={{ position: "absolute", pointerEvents: "none", userSelect: "none" }}>
      <defs>
        <filter id="roughen">
          <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="3" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
      <circle cx="300" cy="300" r="240"
        fill="none" stroke={C.text} strokeWidth="28" strokeLinecap="round"
        opacity={opacity} filter="url(#roughen)"
        strokeDasharray={`${circumference * 0.88} ${circumference * 0.12}`}
        strokeDashoffset={circumference * 0.06}
        style={animate ? {
          animation: "drawEnso 2.4s cubic-bezier(0.4, 0, 0.2, 1) forwards",
          strokeDasharray: `0 ${circumference}`,
        } : {}}
      />
      {animate && (
        <style>{`
          @keyframes drawEnso {
            to { stroke-dasharray: ${circumference * 0.88} ${circumference * 0.12}; }
          }
        `}</style>
      )}
    </svg>
  );
}

// ─── FADE IN ─────────────────────────────────────────────────────────
function FadeIn({ children, delay = 0, style = {} }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(16px)",
      transition: "opacity 0.9s ease, transform 0.9s ease",
      ...style,
    }}>
      {children}
    </div>
  );
}

// ─── NAV ─────────────────────────────────────────────────────────────
function Nav({ active, setActive }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "0 40px", height: 60,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: `${C.bg}ee`, backdropFilter: "blur(8px)",
      borderBottom: `1px solid ${C.borderSubtle}`,
    }}>
      <button onClick={() => setActive("hero")} style={{
        fontFamily: FONTS.display, fontSize: 18, fontWeight: 500,
        color: C.text, background: "none", border: "none",
        cursor: "pointer", letterSpacing: "0.04em",
      }}>
        Sunyata
      </button>
      <div style={{ display: "flex", gap: 32 }}>
        {["work", "about"].map(l => (
          <button key={l} onClick={() => setActive(l)} style={{
            fontFamily: FONTS.body, fontSize: 13,
            color: active === l ? C.text : C.textTertiary,
            background: "none", border: "none", cursor: "pointer",
            textTransform: "capitalize", letterSpacing: "0.04em",
            borderBottom: active === l ? `1px solid ${C.accent}` : "1px solid transparent",
            paddingBottom: 2, transition: "color 0.2s",
          }}>{l}</button>
        ))}
      </div>
    </nav>
  );
}

// ─── HERO ────────────────────────────────────────────────────────────
function Hero({ setActive }) {
  return (
    <section style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      padding: "120px 40px 80px",
    }}>
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -54%)",
        pointerEvents: "none",
      }}>
        <Enso size={640} opacity={0.07} animate={true} />
      </div>

      <div style={{ position: "relative", textAlign: "center", maxWidth: 560 }}>
        <FadeIn delay={400}>
          <div style={{
            fontFamily: FONTS.body, fontSize: 11, letterSpacing: "0.16em",
            textTransform: "uppercase", color: C.textTertiary, marginBottom: 24,
          }}>
            tools built with intention
          </div>
        </FadeIn>

        <FadeIn delay={700}>
          <h1 style={{
            fontFamily: FONTS.display,
            fontSize: "clamp(56px, 10vw, 88px)",
            fontWeight: 400, color: C.text, lineHeight: 1,
            letterSpacing: "-0.02em", margin: "0 0 28px",
          }}>
            Sunyata
          </h1>
        </FadeIn>

        <FadeIn delay={1000}>
          <p style={{
            fontFamily: FONTS.body, fontSize: 17, color: C.textSecondary,
            lineHeight: 1.7, margin: "0 0 48px", fontWeight: 300,
          }}>
            For those who want less noise.
          </p>
        </FadeIn>

        <FadeIn delay={1300}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setActive("work")} style={{
              fontFamily: FONTS.body, fontSize: 13, fontWeight: 500,
              background: C.text, color: C.bg,
              border: "none", borderRadius: 100, padding: "12px 28px",
              cursor: "pointer", letterSpacing: "0.04em",
            }}>
              See the work
            </button>
            <button onClick={() => setActive("about")} style={{
              fontFamily: FONTS.body, fontSize: 13, fontWeight: 500,
              background: "transparent", color: C.textSecondary,
              border: `1px solid ${C.border}`, borderRadius: 100, padding: "12px 28px",
              cursor: "pointer", letterSpacing: "0.04em",
            }}>
              The why
            </button>
          </div>
        </FadeIn>
      </div>

      <FadeIn delay={2200} style={{ position: "absolute", bottom: 32 }}>
        <div style={{
          width: 1, height: 32, background: C.textTertiary, opacity: 0.4,
          margin: "0 auto",
          animation: "scrollPulse 2s ease infinite",
        }} />
      </FadeIn>
    </section>
  );
}

// ─── WORK ────────────────────────────────────────────────────────────
function Work() {
  const [hovered, setHovered] = useState(false);

  return (
    <section style={{ padding: "100px 40px", maxWidth: 720, margin: "0 auto" }}>
      <FadeIn delay={100}>
        <div style={{ marginBottom: 64 }}>
          <div style={{
            fontFamily: FONTS.body, fontSize: 11, letterSpacing: "0.12em",
            textTransform: "uppercase", color: C.textTertiary, marginBottom: 16,
          }}>Work</div>
          <h2 style={{
            fontFamily: FONTS.display, fontSize: 40, fontWeight: 400,
            color: C.text, lineHeight: 1.1, margin: 0,
          }}>
            Something is<br />taking shape.
          </h2>
        </div>
      </FadeIn>

      {/* Brewing card */}
      <FadeIn delay={300}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            background: hovered ? C.surface : C.faint,
            border: `1px solid ${hovered ? C.border : C.borderSubtle}`,
            borderRadius: 20, padding: "48px 40px",
            transition: "all 0.3s ease",
            transform: hovered ? "translateY(-2px)" : "none",
            boxShadow: hovered ? "0 8px 32px rgba(0,0,0,0.05)" : "none",
            textAlign: "center",
            cursor: "default",
          }}
        >
          {/* Small enso */}
          <div style={{
            position: "relative", width: 64, height: 64,
            margin: "0 auto 28px",
          }}>
            <Enso size={64} opacity={0.3} />
          </div>

          <div style={{
            fontFamily: FONTS.display, fontSize: 28, color: C.text,
            marginBottom: 12, fontWeight: 400,
          }}>
            Brewing
          </div>

          <p style={{
            fontFamily: FONTS.body, fontSize: 15, color: C.textSecondary,
            lineHeight: 1.7, margin: "0 auto", maxWidth: 380, fontWeight: 300,
          }}>
            A suite of quiet tools for everyday life. Built slowly, built well. Each one will find its place here when it's ready.
          </p>

          <div style={{
            marginTop: 28,
            display: "inline-block",
            fontFamily: FONTS.body, fontSize: 11,
            letterSpacing: "0.1em", textTransform: "uppercase",
            color: C.textTertiary,
            background: C.borderSubtle,
            borderRadius: 100, padding: "6px 16px",
          }}>
            In progress
          </div>
        </div>
      </FadeIn>

      {/* Changelog */}
      <FadeIn delay={500}>
        <div style={{
          marginTop: 40, padding: "20px 24px",
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: 14,
        }}>
          <div style={{
            fontFamily: FONTS.body, fontSize: 11, letterSpacing: "0.1em",
            textTransform: "uppercase", color: C.textTertiary, marginBottom: 16,
          }}>Changelog</div>

          <div style={{
            display: "flex", gap: 24, alignItems: "flex-start",
            padding: "10px 0",
          }}>
            <div style={{
              fontFamily: FONTS.body, fontSize: 11, color: C.textTertiary,
              minWidth: 72, paddingTop: 1,
            }}>Mar 2026</div>
            <div style={{
              fontFamily: FONTS.body, fontSize: 13, color: C.textSecondary,
              lineHeight: 1.6,
            }}>
              Sunyata — the idea takes shape.
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

// ─── ABOUT ───────────────────────────────────────────────────────────
function About() {
  return (
    <section style={{ padding: "100px 40px", maxWidth: 620, margin: "0 auto" }}>
      <FadeIn delay={100}>
        <div style={{
          fontFamily: FONTS.body, fontSize: 11, letterSpacing: "0.12em",
          textTransform: "uppercase", color: C.textTertiary, marginBottom: 16,
        }}>About</div>

        <h2 style={{
          fontFamily: FONTS.display, fontSize: 40, fontWeight: 400,
          color: C.text, lineHeight: 1.1, margin: "0 0 48px",
        }}>
          The why behind<br />the work.
        </h2>
      </FadeIn>

      <FadeIn delay={300}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {[
            "I build tools because most of the ones I need don't exist in the form I want them. They're bloated, noisy, designed for engagement rather than clarity.",
            "Sunyata started from a simple question — what if software could feel the way a clean room feels? Not empty, but intentional. Everything there for a reason.",
            "These tools are built for myself first. If they solve my problem, they'll solve yours too.",
          ].map((para, i) => (
            <p key={i} style={{
              fontFamily: FONTS.body, fontSize: 16, color: C.textSecondary,
              lineHeight: 1.85, margin: 0, fontWeight: 300,
            }}>{para}</p>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}

// ─── FOOTER ──────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      padding: "32px 40px",
      borderTop: `1px solid ${C.borderSubtle}`,
      display: "flex", justifyContent: "space-between",
      alignItems: "center", flexWrap: "wrap", gap: 16,
    }}>
      <div style={{ position: "relative", width: 28, height: 28 }}>
        <Enso size={28} opacity={0.35} />
      </div>
      <div style={{
        fontFamily: FONTS.body, fontSize: 12,
        color: C.textTertiary, letterSpacing: "0.04em",
      }}>
        Sunyata · {new Date().getFullYear()}
      </div>
      <div style={{
        fontFamily: FONTS.body, fontSize: 12,
        color: C.textTertiary, letterSpacing: "0.04em",
      }}>
        sunyata.app
      </div>
    </footer>
  );
}

// ─── MAIN ────────────────────────────────────────────────────────────
export default function Sunyata() {
  const [active, setActive] = useState("hero");

  const sections = {
    hero: <Hero setActive={setActive} />,
    work: <Work />,
    about: <About />,
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant:ital,wght@0,300;0,400;0,500;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        button:hover { opacity: 0.8; }
        @keyframes scrollPulse {
          0%,100% { opacity: 0.3; transform: scaleY(1); }
          50% { opacity: 0.8; transform: scaleY(1.3); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.border}; border-radius: 2px; }
      `}</style>

      <Nav active={active} setActive={setActive} />

      <main style={{ paddingTop: active === "hero" ? 0 : 60 }}>
        {sections[active]}
      </main>

      <Footer />
    </div>
  );
}