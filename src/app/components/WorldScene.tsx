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
      currentRef.current.x = lerp(
        currentRef.current.x,
        targetRef.current.x,
        0.06
      );
      currentRef.current.y = lerp(
        currentRef.current.y,
        targetRef.current.y,
        0.06
      );
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

export function WorldScene({ world, onNavigate, onReturnHome }: WorldSceneProps) {
  const [panelOpen, setPanelOpen] = useState(false);
  const [titleVisible, setTitleVisible] = useState(false);
  const mouse = useMouseParallax();

  useEffect(() => {
    setPanelOpen(false);
    setTitleVisible(false);
    const t = setTimeout(() => setTitleVisible(true), 600);
    return () => clearTimeout(t);
  }, [world.id]);

  const handleHotspotClick = useCallback(() => {
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.0, ease: "easeInOut" }}
    >
      {/* Background image with parallax */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ transform: "scale(1.12)" }}
      >
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

      {/* Atmospheric overlay gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: world.overlayGradient, zIndex: 2 }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 30%, rgba(8,5,3,0.5) 100%)",
          zIndex: 3,
        }}
      />

      {/* Top chrome */}
      <div
        className="absolute top-0 left-0 right-0 flex justify-between items-start px-10 pt-9"
        style={{ zIndex: 20 }}
      >
        {/* Logo / home */}
        <button
          onClick={onReturnHome}
          className="flex flex-col gap-1 group transition-opacity duration-300"
          style={{
            color: "rgba(240,235,224,0.35)",
            fontSize: "9px",
            letterSpacing: "0.3em",
            fontFamily: "'DM Sans', sans-serif",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "rgba(240,235,224,0.7)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "rgba(240,235,224,0.35)")
          }
        >
          <span
            className="font-japanese"
            style={{ fontSize: "14px", letterSpacing: "0.2em", color: "rgba(240,235,224,0.35)" }}
          >
            日本
          </span>
          JOURNEY THROUGH JAPAN
        </button>

        {/* World title pill */}
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
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: world.accentColor,
              opacity: 0.8,
            }}
          />
          WORLD {String(world.index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Center title card — fades in after scene loads */}
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
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 1,
                  background: `linear-gradient(to right, transparent, ${world.accentColor})`,
                }}
              />
              <p
                style={{
                  color: "rgba(240,235,224,0.35)",
                  fontSize: "10px",
                  letterSpacing: "0.3em",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {world.era}
              </p>
              <div
                style={{
                  width: 40,
                  height: 1,
                  background: `linear-gradient(to left, transparent, ${world.accentColor})`,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium glass interaction element */}
      <AnimatePresence>
        {titleVisible && !panelOpen && (
          <motion.div
            className="absolute"
            style={{
              left: world.hotspot.x,
              top: world.hotspot.y,
              transform: "translate(-50%, -50%)",
              zIndex: 15,
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ delay: 1.0, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Outer ambient glow ring */}
            <span
              style={{
                position: "absolute",
                inset: -28,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${world.accentColor}18 0%, transparent 70%)`,
                animation: "glass-breathe 3s ease-in-out infinite",
                pointerEvents: "none",
              }}
            />
            {/* Pulsing orbit ring */}
            <span
              style={{
                position: "absolute",
                inset: -18,
                borderRadius: "50%",
                border: `1px solid ${world.accentColor}40`,
                animation: "orbit-pulse 2.8s ease-out infinite",
                pointerEvents: "none",
              }}
            />
            <span
              style={{
                position: "absolute",
                inset: -10,
                borderRadius: "50%",
                border: `1px solid ${world.accentColor}30`,
                animation: "orbit-pulse 2.8s ease-out infinite 0.7s",
                pointerEvents: "none",
              }}
            />

            {/* Glass button */}
            <GlassButton
              accentColor={world.accentColor}
              onClick={handleHotspotClick}
              label={`Explore ${world.title}`}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Info panel */}
      <InfoPanel
        world={world}
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
      />

      {/* Bottom navigation */}
      <WorldNav
        currentIndex={world.index}
        onNavigate={onNavigate}
        accentColor={world.accentColor}
      />

      <style>{`
        @keyframes orbit-pulse {
          0%   { transform: scale(0.85); opacity: 0.7; }
          60%  { transform: scale(1.4); opacity: 0; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes glass-breathe {
          0%, 100% { opacity: 0.6; transform: scale(0.95); }
          50%       { opacity: 1;   transform: scale(1.05); }
        }
      `}</style>
    </motion.div>
  );
}

interface GlassButtonProps {
  accentColor: string;
  onClick: () => void;
  label: string;
}

function GlassButton({ accentColor, onClick, label }: GlassButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 10,
        background: "transparent",
        border: "none",
        cursor: "pointer",
        padding: 0,
      }}
    >
      {/* Glass disc */}
      <div
        className="glass-btn"
        style={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.07)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid rgba(255,255,255,0.18)`,
          boxShadow: `0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15), 0 0 20px ${accentColor}28`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          transition: "all 0.35s ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.background = "rgba(255,255,255,0.13)";
          el.style.boxShadow = `0 6px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.22), 0 0 32px ${accentColor}45`;
          el.style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.background = "rgba(255,255,255,0.07)";
          el.style.boxShadow = `0 4px 24px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15), 0 0 20px ${accentColor}28`;
          el.style.transform = "scale(1)";
        }}
        onMouseDown={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "scale(0.94)";
        }}
        onMouseUp={(e) => {
          (e.currentTarget as HTMLDivElement).style.transform = "scale(1.08)";
        }}
      >
        {/* Specular highlight arc */}
        <div
          style={{
            position: "absolute",
            top: 6,
            left: "50%",
            transform: "translateX(-50%)",
            width: "55%",
            height: "28%",
            borderRadius: "50%",
            background: "rgba(255,255,255,0.18)",
            filter: "blur(4px)",
            pointerEvents: "none",
          }}
        />
        {/* Core accent dot */}
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            background: accentColor,
            boxShadow: `0 0 12px ${accentColor}90`,
          }}
        />
      </div>

      {/* Label */}
      <span
        style={{
          color: "rgba(240,235,224,0.45)",
          fontSize: "9px",
          letterSpacing: "0.32em",
          fontFamily: "'DM Sans', sans-serif",
          transition: "color 0.3s ease",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(240,235,224,0.75)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "rgba(240,235,224,0.45)")}
      >
        EXPLORE
      </span>
    </button>
  );
}
