import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { WorldData } from "../data/worlds";
import { InfoPanel } from "./InfoPanel";
import { WorldNav } from "./WorldNav";

interface WorldSceneProps {
  world: WorldData;
  onNavigate: (index: number) => void;
  onReturnHome: () => void;
}

function useMouseParallax() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const tick = () => {
      currentRef.current.x = lerp(currentRef.current.x, targetRef.current.x, 0.06);
      currentRef.current.y = lerp(currentRef.current.y, targetRef.current.y, 0.06);
      setMouse({ ...currentRef.current });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return mouse;
}

// World-specific enter transition variants
const WORLD_TRANSITIONS: Record<string, { initial: object; animate: object; transition: object }> = {
  itsukushima: {
    initial: { opacity: 0, scale: 1.04 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] },
  },
  bamboo: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.0, ease: "easeOut" },
  },
  inari: {
    initial: { opacity: 0, x: -24 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 1.0, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  fuji: {
    initial: { opacity: 0, scale: 1.06 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1.3, ease: [0.16, 1, 0.3, 1] },
  },
  sakura: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 1.4 },
  },
};

export function WorldScene({ world, onNavigate, onReturnHome }: WorldSceneProps) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const mouse = useMouseParallax();
  const tx = WORLD_TRANSITIONS[world.id] || WORLD_TRANSITIONS.itsukushima;

  useEffect(() => {
    setPanelOpen(false);
    setTitleVisible(false);
    const t = setTimeout(() => setTitleVisible(true), 600);
    return () => clearTimeout(t);
  }, [world.id]);

  const handleExploreClick = useCallback(() => {
    setPanelOpen(true);
  }, []);

  const parallaxX = mouse.x * -18;
  const parallaxY = mouse.y * -12;
  const subtleX = mouse.x * -6;
  const subtleY = mouse.y * -4;

  return (
    <motion.div
      key={world.id}
      className="fixed inset-0"
      initial={tx.initial}
      animate={tx.animate}
      exit={{ opacity: 0 }}
      transition={tx.transition as never}
    >
      {/* Background image with parallax */}
      <div className="absolute inset-0 overflow-hidden" style={{ transform: "scale(1.12)" }}>
        <img
          src={world.imageUrl}
          alt={world.title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transform: `translate(${parallaxX}px, ${parallaxY}px)`,
            transition: "transform 0.1s linear",
            willChange: "transform",
          }}
        />
      </div>

      {/* World-tinted atmospheric overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: world.overlayGradient, zIndex: 2 }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 30%, rgba(8,5,3,0.5) 100%)",
          zIndex: 3,
        }}
      />

      {/* Top chrome */}
      <div className="absolute top-0 left-0 right-0 flex justify-between items-start px-10 pt-9" style={{ zIndex: 20 }}>
        <button
          onClick={onReturnHome}
          style={{
            color: "rgba(240,235,224,0.35)",
            fontSize: "9px",
            letterSpacing: "0.3em",
            fontFamily: "'DM Sans', sans-serif",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            gap: 4,
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(240,235,224,0.7)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(240,235,224,0.35)")}
        >
          <span className="font-japanese" style={{ fontSize: "14px", letterSpacing: "0.2em", color: "rgba(240,235,224,0.35)" }}>
            日本
          </span>
          JOURNEY THROUGH JAPAN
        </button>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            color: "rgba(240,235,224,0.35)",
            fontSize: "9px",
            letterSpacing: "0.3em",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: world.accentColor, opacity: 0.8 }} />
          WORLD {String(world.index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Center title card */}
      <AnimatePresence>
        {titleVisible && !panelOpen && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
            style={{ zIndex: 10 }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <p
              className="font-japanese"
              style={{
                color: "rgba(240,235,224,0.28)",
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                fontWeight: 400,
                letterSpacing: "0.2em",
                marginBottom: "10px",
                transform: `translate(${subtleX}px, ${subtleY}px)`,
                transition: "transform 0.15s linear",
              }}
            >
              {world.kanji}
            </p>
            <h1
              className="font-display"
              style={{
                color: "rgba(240,235,224,0.9)",
                fontSize: "clamp(2rem, 5.5vw, 4.5rem)",
                fontWeight: 300,
                lineHeight: 1.1,
                letterSpacing: "0.02em",
                textAlign: "center",
                textShadow: "0 4px 60px rgba(0,0,0,0.6)",
                transform: `translate(${subtleX * 0.7}px, ${subtleY * 0.7}px)`,
                transition: "transform 0.15s linear",
              }}
            >
              {world.title}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "20px" }}>
              <div style={{ width: 40, height: 1, background: `linear-gradient(to right, transparent, ${world.accentColor})` }} />
              <p style={{ color: "rgba(240,235,224,0.35)", fontSize: "10px", letterSpacing: "0.3em", fontFamily: "'DM Sans', sans-serif" }}>
                {world.era}
              </p>
              <div style={{ width: 40, height: 1, background: `linear-gradient(to left, transparent, ${world.accentColor})` }} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Glass pill "Explore More" button — bottom-center, clear of title */}
      <AnimatePresence>
        {titleVisible && !panelOpen && (
          <motion.div
            className="absolute left-1/2"
            style={{
              bottom: "18%",
              transform: "translateX(-50%)",
              zIndex: 15,
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ delay: 1.2, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ExploreButton accentColor={world.accentColor} onClick={handleExploreClick} />
          </motion.div>
        )}
      </AnimatePresence>

      <InfoPanel world={world} isOpen={panelOpen} onClose={() => setPanelOpen(false)} />
      <WorldNav currentIndex={world.index} onNavigate={onNavigate} accentColor={world.accentColor} />

      <style>{`
        @keyframes orbit-pulse {
          0%   { transform: scale(0.85); opacity: 0.7; }
          60%  { transform: scale(1.4);  opacity: 0; }
          100% { transform: scale(1.4);  opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
}

interface ExploreButtonProps {
  accentColor: string;
  onClick: () => void;
}

function ExploreButton({ accentColor, onClick }: ExploreButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "14px",
        padding: "12px 28px 12px 20px",
        borderRadius: 100,
        background: hovered
          ? `rgba(255,255,255,0.13)`
          : `rgba(255,255,255,0.07)`,
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: `1px solid ${hovered ? `${accentColor}80` : "rgba(255,255,255,0.18)"}`,
        boxShadow: hovered
          ? `0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2), 0 0 24px ${accentColor}30`
          : "0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.12)",
        cursor: "pointer",
        transform: pressed ? "scale(0.96)" : hovered ? "scale(1.04) translateY(-2px)" : "scale(1)",
        transition: "all 0.35s cubic-bezier(0.25,0.46,0.45,0.94)",
        whiteSpace: "nowrap",
        minWidth: 180,
      }}
    >
      {/* Accent indicator */}
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: accentColor,
          boxShadow: `0 0 10px ${accentColor}80`,
          flexShrink: 0,
          animation: "orbit-pulse 2.8s ease-out infinite",
        }}
      />

      {/* Text — left-aligned */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
        <span
          style={{
            color: "rgba(240,235,224,0.85)",
            fontSize: "10px",
            letterSpacing: "0.28em",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 400,
          }}
        >
          EXPLORE MORE
        </span>
        <span
          style={{
            color: "rgba(240,235,224,0.35)",
            fontSize: "8px",
            letterSpacing: "0.18em",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          OPEN CULTURAL ARCHIVE
        </span>
      </div>

      {/* Arrow */}
      <span
        style={{
          color: hovered ? accentColor : "rgba(240,235,224,0.4)",
          fontSize: "12px",
          marginLeft: "auto",
          transition: "all 0.35s ease",
          transform: hovered ? "translateX(3px)" : "translateX(0)",
        }}
      >
        →
      </span>
    </button>
  );
}
