import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";
// ── Asset imports ──
import heroBg from "@/imports/ChatGPT_Image_Jul_7__2026__01_19_20_AM.png";
import branchLeft from "@/imports/ChatGPT_Image_Jul_7__2026__01_19_24_AM.png";
import branchRight from "@/imports/ChatGPT_Image_Jul_7__2026__01_19_28_AM-removebg-preview.png";

interface LandingSceneProps {
  onStart: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

function useParallax() {
  const target = useRef({ x: 0, y: 0 });
  const curr = useRef({ x: 0, y: 0 });
  const raf = useRef<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMove, {
      passive: true,
    });
    const tick = () => {
      curr.current.x += (target.current.x - curr.current.x) * 0.048;
      curr.current.y += (target.current.y - curr.current.y) * 0.048;
      setPos({ x: curr.current.x, y: curr.current.y });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);
  return pos;
}

function GlassButton({
  children,
  onClick,
  wide = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  wide?: boolean;
}) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPressed(false);
      }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        padding: wide ? "13px 52px" : "10px 32px",
        borderRadius: 100,
        background: hovered
          ? "rgba(255,248,238,0.18)"
          : "rgba(255,248,238,0.10)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: `1px solid rgba(255,248,238,${hovered ? 0.38 : 0.22})`,
        boxShadow: hovered
          ? "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,248,238,0.22)"
          : "0 4px 20px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,248,238,0.12)",
        cursor: "pointer",
        transform: pressed
          ? "scale(0.97) translateY(1px)"
          : hovered
            ? "scale(1.03) translateY(-1px)"
            : "scale(1)",
        transition: "all 0.32s cubic-bezier(0.25,0.46,0.45,0.94)",
        color: "rgba(255,248,238,0.9)",
        fontSize: "10px",
        letterSpacing: "0.26em",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 400,
        textAlign: "left" as const,
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: "10px",
      }}
    >
      {children}
    </button>
  );
}

export function LandingScene({
  onStart,
  soundEnabled,
  onToggleSound,
}: LandingSceneProps) {
  const p = useParallax();
  const [in_, setIn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIn(true), 120);
    return () => clearTimeout(t);
  }, []);

  const px = (factor: number) => `${p.x * factor}px`;
  const py = (factor: number) => `${p.y * factor}px`;

  const para = (f: number, scale = 1) => ({
    transform: `translate(${px(f)}, ${py(f * 0.65)}) scale(${scale})`,
    transition: "transform 0.12s linear",
    willChange: "transform" as const,
  });

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden"
      style={{ background: "#1a120a" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.8 }}
    >
      {/* LAYER 1 — Hero background */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          overflow: "hidden",
          ...para(-5, 1.06),
        }}
      >
        <ImageWithFallback
          src={heroBg}
          alt="Japanese landscape at golden hour"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
      </div>

      {/* Petal particles (CSS-only, no image needed) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 4 }}
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: 0,
              left: `${15 + i * 17}%`,
              width: 6 + i * 2,
              height: 6 + i * 2,
              borderRadius: "60% 40% 60% 40% / 60% 60% 40% 40%",
              background: `rgba(255,${170 + i * 10},${160 + i * 8}, ${0.35 + i * 0.06})`,
              animation: `csspt-${i} ${16 + i * 3}s ease-in ${i * 2.4}s infinite`,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </div>

      {/* LAYER 5 — CENTER TEXT & UI */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ zIndex: 10 }}
      >
        {/* Top nav strip */}
        <motion.div
          className="absolute top-0 left-0 right-0 flex justify-between items-center px-10 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: in_ ? 1 : 0 }}
          transition={{ delay: 1.3, duration: 1 }}
        >
          <span
            className="font-japanese"
            style={{
              color: "rgba(255,245,225,0.3)",
              fontSize: "11px",
              letterSpacing: "0.22em",
            }}
          >
            日本の旅
          </span>
          <span
            style={{
              color: "rgba(255,245,225,0.2)",
              fontSize: "8px",
              letterSpacing: "0.3em",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            JOURNEY THROUGH JAPAN
          </span>
        </motion.div>

        {/* Text composition */}
        <div
          className="flex flex-col items-center text-center select-none"
          style={{ zIndex: 2 }}
        >
          {/* Radial backdrop for legibility */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "65%",
              height: "70%",
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse, rgba(10,6,2,0.52) 0%, transparent 72%)",
              transform: "translateY(2%)",
            }}
          />

          {/* Kanji label */}
          <motion.p
            className="font-japanese"
            style={{
              color: "rgba(255,220,180,0.55)",
              fontSize: "clamp(9px, 0.9vw, 11px)",
              letterSpacing: "0.6em",
              marginBottom: "clamp(18px, 3vh, 28px)",
              position: "relative",
            }}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: in_ ? 1 : 0, y: 0 }}
            transition={{ delay: 0.45, duration: 1.4 }}
          >
            日本の旅
          </motion.p>

          {/* JOURNEY */}
          <motion.h1
            className="font-display"
            style={{
              color: "#faf4e8",
              fontSize: "clamp(2.8rem, 9.5vw, 8.5rem)",
              fontWeight: 600,
              lineHeight: 0.9,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textShadow:
                "0 2px 48px rgba(0,0,0,0.65), 0 0 100px rgba(0,0,0,0.4)",
              position: "relative",
              marginBottom: 0,
            }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: in_ ? 1 : 0, y: 0 }}
            transition={{
              delay: 0.58,
              duration: 1.6,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            JOURNEY
          </motion.h1>

          {/* — THROUGH — */}
          <motion.div
            className="flex items-center gap-4"
            style={{ margin: "clamp(6px,1.2vh,10px) 0" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: in_ ? 1 : 0 }}
            transition={{ delay: 0.72, duration: 1.3 }}
          >
            <div
              style={{
                width: "clamp(24px,4vw,48px)",
                height: 1,
                background: "rgba(255,240,200,0.35)",
              }}
            />
            <span
              className="font-display"
              style={{
                color: "rgba(255,235,185,0.65)",
                fontSize: "clamp(0.7rem, 1.8vw, 1.4rem)",
                fontWeight: 300,
                letterSpacing: "0.45em",
                textTransform: "uppercase",
                fontStyle: "italic",
              }}
            >
              THROUGH
            </span>
            <div
              style={{
                width: "clamp(24px,4vw,48px)",
                height: 1,
                background: "rgba(255,240,200,0.35)",
              }}
            />
          </motion.div>

          {/* JAPAN */}
          <motion.h1
            className="font-display"
            style={{
              color: "#faf4e8",
              fontSize: "clamp(4rem, 14vw, 12rem)",
              fontWeight: 300,
              lineHeight: 0.88,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textShadow:
                "0 2px 60px rgba(0,0,0,0.6), 0 0 120px rgba(0,0,0,0.35)",
              position: "relative",
            }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: in_ ? 1 : 0, y: 0 }}
            transition={{
              delay: 0.7,
              duration: 1.7,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            JAPAN
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="font-display"
            style={{
              color: "rgba(255,240,200,0.52)",
              fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)",
              fontStyle: "italic",
              fontWeight: 300,
              letterSpacing: "0.08em",
              lineHeight: 1.8,
              margin: "clamp(16px,3vh,24px) 0 clamp(28px,4.5vh,42px)",
              maxWidth: 480,
              textShadow: "0 1px 16px rgba(0,0,0,0.9)",
              position: "relative",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: in_ ? 1 : 0 }}
            transition={{ delay: 0.92, duration: 1.3 }}
          >
            Experience Japan's culture, history, and landscapes
            <br />
            through immersive interactive worlds.
          </motion.p>

          {/* Divider dot */}
          <motion.div
            style={{
              marginBottom: "clamp(22px,3.5vh,36px)",
              position: "relative",
            }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: in_ ? 1 : 0, scale: 1 }}
            transition={{ delay: 1.05, duration: 0.8 }}
          >
            <span
              style={{
                color: "rgba(255,220,160,0.45)",
                fontSize: "14px",
                display: "block",
              }}
            >
              ✦
            </span>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: in_ ? 1 : 0, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <GlassButton onClick={onStart} wide>
              <span>▶</span>
              <span>START EXPERIENCE</span>
            </GlassButton>

            <button
              onClick={onToggleSound}
              style={{
                padding: "7px 22px",
                borderRadius: 100,
                background: "rgba(255,248,238,0.06)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(255,248,238,0.14)",
                cursor: "pointer",
                color: "rgba(255,245,220,0.5)",
                fontSize: "9px",
                letterSpacing: "0.24em",
                fontFamily: "'DM Sans', sans-serif",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: 7,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,248,238,0.12)";
                e.currentTarget.style.color = "rgba(255,245,220,0.85)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,248,238,0.06)";
                e.currentTarget.style.color = "rgba(255,245,220,0.5)";
              }}
            >
              {soundEnabled ? (
                <Volume2 size={10} strokeWidth={1.5} />
              ) : (
                <VolumeX size={10} strokeWidth={1.5} />
              )}
              {soundEnabled ? "SOUND ON" : "SOUND OFF"}
            </button>
          </motion.div>
        </div>

        {/* Bottom right hint */}
        <motion.div
          className="absolute bottom-7 right-10 flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: in_ ? 1 : 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <span
            style={{
              color: "rgba(255,240,200,0.25)",
              fontSize: "8px",
              letterSpacing: "0.28em",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            SCROLL TO BEGIN
          </span>
          <span
            style={{
              color: "rgba(255,240,200,0.25)",
              fontSize: "10px",
            }}
          >
            →
          </span>
        </motion.div>
      </div>

      {/* LAYER 6 — Branch left (z = 15) */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          zIndex: 15,
          top: "-6%",
          left: "-8%",
          width: "54%",
          transformOrigin: "0% 0%",
          transform: `translate(${p.x * -14}px, ${p.y * -9}px)`,
          transition: "transform 0.12s linear",
          animation: "branch-sway-l 12s ease-in-out infinite",
        }}
        initial={{ opacity: 0, x: -20, y: -15 }}
        animate={{ opacity: in_ ? 1 : 0, x: 0, y: 0 }}
        transition={{
          delay: 0.25,
          duration: 2.2,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <ImageWithFallback
          src={branchLeft}
          alt="Cherry blossom branch left"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
          }}
        />
      </motion.div>

      {/* LAYER 7 — Branch right (z = 15) */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          zIndex: 15,
          top: "-2%",
          right: "-4%",
          width: "38%",
          transformOrigin: "100% 0%",
          transform: `translate(${p.x * 12}px, ${p.y * -8}px)`,
          transition: "transform 0.12s linear",
          animation: "branch-sway-r 14s ease-in-out infinite 1.5s",
        }}
        initial={{ opacity: 0, x: 20, y: -15 }}
        animate={{ opacity: in_ ? 0.88 : 0, x: 0, y: 0 }}
        transition={{
          delay: 0.35,
          duration: 2.2,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <ImageWithFallback
          src={branchRight}
          alt="Floral element right"
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            objectFit: "contain",
          }}
        />
      </motion.div>

      <style>{`
        @keyframes branch-sway-l {
          0%, 100% { transform: rotate(0deg) translateX(0px); }
          30%       { transform: rotate(0.6deg) translateX(2px); }
          65%       { transform: rotate(-0.4deg) translateX(-1px); }
        }
        @keyframes branch-sway-r {
          0%, 100% { transform: rotate(0deg) translateX(0px); }
          35%       { transform: rotate(-0.5deg) translateX(-2px); }
          70%       { transform: rotate(0.3deg) translateX(1px); }
        }
        @keyframes csspt-0 {
          0%   { transform: translateY(-60px) translateX(0px) rotate(0deg); opacity: 0; }
          5%   { opacity: 0.5; }
          95%  { opacity: 0.3; }
          100% { transform: translateY(110vh) translateX(-40px) rotate(320deg); opacity: 0; }
        }
        @keyframes csspt-1 {
          0%   { transform: translateY(-60px) translateX(0px) rotate(45deg); opacity: 0; }
          5%   { opacity: 0.45; }
          100% { transform: translateY(110vh) translateX(55px) rotate(280deg); opacity: 0; }
        }
        @keyframes csspt-2 {
          0%   { transform: translateY(-60px) rotate(90deg); opacity: 0; }
          5%   { opacity: 0.4; }
          100% { transform: translateY(110vh) translateX(-30px) rotate(400deg); opacity: 0; }
        }
        @keyframes csspt-3 {
          0%   { transform: translateY(-60px) rotate(0deg); opacity: 0; }
          5%   { opacity: 0.38; }
          100% { transform: translateY(110vh) translateX(45px) rotate(-240deg); opacity: 0; }
        }
        @keyframes csspt-4 {
          0%   { transform: translateY(-60px) rotate(20deg); opacity: 0; }
          5%   { opacity: 0.35; }
          100% { transform: translateY(110vh) translateX(-60px) rotate(360deg); opacity: 0; }
        }
      `}</style>
    </motion.div>
  );
}
