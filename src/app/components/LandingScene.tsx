import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

// ── Asset imports (ES module — never use string paths in src) ──
import heroBg       from "@/imports/ChatGPT_Image_Jul_7__2026__01_19_20_AM.png";
import branchLeft   from "@/imports/ChatGPT_Image_Jul_7__2026__01_19_24_AM.png";
import branchRight  from "@/imports/ChatGPT_Image_Jul_7__2026__01_19_28_AM.png";
import petalPack    from "@/imports/ChatGPT_Image_Jul_7__2026__01_19_34_AM.png";
import mistOverlay  from "@/imports/ChatGPT_Image_Jul_7__2026__01_19_37_AM.png";
import lightRays    from "@/imports/ChatGPT_Image_Jul_7__2026__01_19_41_AM.png";
import waterRefl    from "@/imports/ChatGPT_Image_Jul_7__2026__01_19_45_AM.png";

interface LandingSceneProps {
  onStart: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

// ── Smoothed mouse parallax ──
function useParallax() {
  const target = useRef({ x: 0, y: 0 });
  const curr   = useRef({ x: 0, y: 0 });
  const raf    = useRef<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = {
        x: (e.clientX / window.innerWidth  - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
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

// ── Petal extraction from the pack image ──
// Pack estimated dimensions: 1200 × 675 px
// Three rows of 8 petals each, spaced evenly
// Row Y centers: ~148, ~310, ~462
// Col X centers (8 cols): ~100, 250, 400, 550, 700, 850, 1000, 1150
const PACK_W = 1200;
const PACK_H = 675;
const SLOT_W = 150; // ~PACK_W / 8

interface PetalCrop {
  id: number;
  // grid position in pack
  colX: number;   // center X of petal in pack (px)
  rowY: number;   // center Y of petal in pack (px)
  // display
  size: number;   // rendered size (px)
  // animation
  startLeft: number; // viewport % from left
  driftX: number;    // total horizontal drift (px)
  duration: number;  // fall duration (s)
  delay: number;     // animation delay (s)
  rotStart: number;  // initial rotation (deg)
  rotDelta: number;  // total rotation change (deg)
  startOpacity: number;
}

const PETALS: PetalCrop[] = [
  { id: 0, colX: 250,  rowY: 148, size: 50, startLeft: 12,  driftX: -55,  duration: 20, delay: 0,   rotStart: 15,  rotDelta: 220, startOpacity: 0.88 },
  { id: 1, colX: 850,  rowY: 148, size: 44, startLeft: 78,  driftX:  60,  duration: 24, delay: 4,   rotStart: 200, rotDelta: -180, startOpacity: 0.8  },
  { id: 2, colX: 400,  rowY: 310, size: 36, startLeft: 35,  driftX: -70,  duration: 22, delay: 8,   rotStart: 80,  rotDelta: 260, startOpacity: 0.72 },
  { id: 3, colX: 1000, rowY: 310, size: 40, startLeft: 62,  driftX:  50,  duration: 18, delay: 1.5, rotStart: 310, rotDelta: -200, startOpacity: 0.76 },
  { id: 4, colX: 100,  rowY: 462, size: 28, startLeft: 88,  driftX: -45,  duration: 26, delay: 6,   rotStart: 140, rotDelta: 190, startOpacity: 0.55 },
  { id: 5, colX: 700,  rowY: 462, size: 32, startLeft: 44,  driftX:  65,  duration: 21, delay: 11,  rotStart: 50,  rotDelta: -240, startOpacity: 0.6  },
  { id: 6, colX: 550,  rowY: 148, size: 46, startLeft: 55,  driftX: -40,  duration: 23, delay: 14,  rotStart: 170, rotDelta: 200, startOpacity: 0.82 },
];

function FallingPetal({ p, packUrl }: { p: PetalCrop; packUrl: string }) {
  const scale  = p.size / SLOT_W;
  const bgW    = Math.round(PACK_W * scale);
  const bgH    = Math.round(PACK_H * scale);
  const bgX    = -Math.round((p.colX - p.size / 2) * scale);
  const bgY    = -Math.round((p.rowY - p.size / 2) * scale);

  const animId = `pf-${p.id}`;

  return (
    <>
      <style>{`
        @keyframes ${animId} {
          0%   { transform: translateY(-80px) translateX(0px) rotate(${p.rotStart}deg); opacity: 0; }
          6%   { opacity: ${p.startOpacity}; }
          50%  { transform: translateY(50vh) translateX(${p.driftX * 0.45}px) rotate(${p.rotStart + p.rotDelta * 0.5}deg); }
          94%  { opacity: ${p.startOpacity * 0.85}; }
          100% { transform: translateY(112vh) translateX(${p.driftX}px) rotate(${p.rotStart + p.rotDelta}deg); opacity: 0; }
        }
      `}</style>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: `${p.startLeft}%`,
          width: p.size,
          height: p.size,
          backgroundImage: `url(${packUrl})`,
          backgroundSize: `${bgW}px ${bgH}px`,
          backgroundPosition: `${bgX}px ${bgY}px`,
          backgroundRepeat: "no-repeat",
          mixBlendMode: "screen",
          pointerEvents: "none",
          willChange: "transform, opacity",
          animationName: animId,
          animationDuration: `${p.duration}s`,
          animationDelay: `${p.delay}s`,
          animationTimingFunction: "ease-in",
          animationIterationCount: "infinite",
        }}
      />
    </>
  );
}

// ── Frosted glass button ──
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
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      style={{
        padding: wide ? "13px 52px" : "10px 32px",
        borderRadius: 100,
        background: hovered
          ? "rgba(255, 248, 238, 0.18)"
          : "rgba(255, 248, 238, 0.10)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        border: `1px solid rgba(255, 248, 238, ${hovered ? 0.38 : 0.22})`,
        boxShadow: hovered
          ? "0 8px 32px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,248,238,0.22), 0 0 0 1px rgba(255,248,238,0.06)"
          : "0 4px 20px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,248,238,0.12)",
        cursor: "pointer",
        transform: pressed ? "scale(0.97) translateY(1px)" : hovered ? "scale(1.03) translateY(-1px)" : "scale(1)",
        transition: "all 0.32s cubic-bezier(0.25,0.46,0.45,0.94)",
        color: "rgba(255, 248, 238, 0.9)",
        fontSize: "10px",
        letterSpacing: "0.26em",
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 400,
      }}
    >
      {children}
    </button>
  );
}

// ── Main component ──
export function LandingScene({ onStart, soundEnabled, onToggleSound }: LandingSceneProps) {
  const p     = useParallax();
  const [in_, setIn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIn(true), 120);
    return () => clearTimeout(t);
  }, []);

  // Parallax transform helpers
  const px = (factor: number) => `${p.x * factor}px`;
  const py = (factor: number) => `${p.y * factor}px`;

  // Transition shorthand for all parallax layers
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
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LAYER 1 — Hero background (full bleed, slight parallax)
          Pagoda · torii · mountains · lake · sunrise
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className="absolute inset-0"
        style={{ zIndex: 1, overflow: "hidden", ...para(-5, 1.06) }}
      >
        <ImageWithFallback
          src={heroBg}
          alt="Japanese landscape with pagoda, torii gate, mountains and lake at sunrise"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center center",
          }}
        />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LAYER 2 — Light rays (screen blend, 15% opacity)
          Golden sunrise rays from upper-left
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 2,
          top: 0, left: 0, right: 0,
          height: "72%",
          ...para(-8, 1.04),
          mixBlendMode: "screen",
          opacity: 0.16,
          animation: "ray-breathe 8s ease-in-out infinite",
        }}
      >
        <ImageWithFallback
          src={lightRays}
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "left top" }}
        />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LAYER 3 — Water reflection (overlay blend, lower area)
          Warm amber ripples on the lake surface
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 3,
          bottom: 0, left: 0, right: 0,
          height: "42%",
          mixBlendMode: "overlay",
          opacity: 0.28,
        }}
      >
        <ImageWithFallback
          src={waterRefl}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center bottom",
          }}
        />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LAYER 4 — Mist overlay (lower half, very slow drift)
          Softens the water / distant landscape transition
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 4,
          bottom: 0, left: "-15%", right: "-15%",
          height: "55%",
          opacity: 0.28,
          animation: "mist-drift 22s ease-in-out infinite",
        }}
      >
        <ImageWithFallback
          src={mistOverlay}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LAYER 5 — Falling petals (extracted from pack via
          CSS background-position, mix-blend-mode: screen)
          7 petals, 3 depth layers, staggered timing
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 5 }}
      >
        {PETALS.map((pet) => (
          <FallingPetal key={pet.id} p={pet} packUrl={petalPack} />
        ))}
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LAYER 6 — CENTER TEXT & UI (z = 10)
          All interactive elements — always on top of scene
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center"
        style={{ zIndex: 10 }}
      >
        {/* Top navigation strip */}
        <motion.div
          className="absolute top-0 left-0 right-0 flex justify-between items-center px-10 pt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: in_ ? 1 : 0 }}
          transition={{ delay: 1.3, duration: 1 }}
        >
          <span
            className="font-japanese"
            style={{ color: "rgba(255,245,225,0.3)", fontSize: "11px", letterSpacing: "0.22em" }}
          >
            日本の旅
          </span>
          <span
            style={{ color: "rgba(255,245,225,0.2)", fontSize: "8px", letterSpacing: "0.3em", fontFamily: "'DM Sans', sans-serif" }}
          >
            JOURNEY THROUGH JAPAN
          </span>
        </motion.div>

        {/* Text composition */}
        <div
          className="flex flex-col items-center text-center select-none"
          style={{ zIndex: 2 }}
        >
          {/* Subtle radial backdrop to ensure text legibility */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: "65%",
              height: "70%",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(10,6,2,0.52) 0%, transparent 72%)",
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

          {/* ── JOURNEY ── */}
          <motion.h1
            className="font-display"
            style={{
              color: "#faf4e8",
              fontSize: "clamp(2.8rem, 9.5vw, 8.5rem)",
              fontWeight: 600,
              lineHeight: 0.9,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textShadow: "0 2px 48px rgba(0,0,0,0.65), 0 0 100px rgba(0,0,0,0.4)",
              position: "relative",
              marginBottom: 0,
            }}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: in_ ? 1 : 0, y: 0 }}
            transition={{ delay: 0.58, duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          >
            JOURNEY
          </motion.h1>

          {/* ── — THROUGH — ── */}
          <motion.div
            className="flex items-center gap-4"
            style={{ margin: "clamp(6px,1.2vh,10px) 0" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: in_ ? 1 : 0 }}
            transition={{ delay: 0.72, duration: 1.3 }}
          >
            <div style={{ width: "clamp(24px,4vw,48px)", height: 1, background: "rgba(255,240,200,0.35)" }} />
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
            <div style={{ width: "clamp(24px,4vw,48px)", height: 1, background: "rgba(255,240,200,0.35)" }} />
          </motion.div>

          {/* ── JAPAN ── */}
          <motion.h1
            className="font-display"
            style={{
              color: "#faf4e8",
              fontSize: "clamp(4rem, 14vw, 12rem)",
              fontWeight: 300,
              lineHeight: 0.88,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textShadow: "0 2px 60px rgba(0,0,0,0.6), 0 0 120px rgba(0,0,0,0.35)",
              position: "relative",
            }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: in_ ? 1 : 0, y: 0 }}
            transition={{ delay: 0.7, duration: 1.7, ease: [0.16, 1, 0.3, 1] }}
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
            style={{ marginBottom: "clamp(22px,3.5vh,36px)", position: "relative" }}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: in_ ? 1 : 0, scale: 1 }}
            transition={{ delay: 1.05, duration: 0.8 }}
          >
            <span
              style={{
                color: "rgba(255,220,160,0.45)",
                fontSize: "14px",
                letterSpacing: "0",
                display: "block",
              }}
            >
              ✦
            </span>
          </motion.div>

          {/* Start Experience — frosted glass pill */}
          <motion.div
            className="flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: in_ ? 1 : 0, y: 0 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <GlassButton onClick={onStart} wide>
              START EXPERIENCE
            </GlassButton>

            {/* Sound toggle — same glass, smaller */}
            <button
              onClick={onToggleSound}
              className="flex items-center gap-2"
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
                e.currentTarget.style.borderColor = "rgba(255,248,238,0.28)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,248,238,0.06)";
                e.currentTarget.style.color = "rgba(255,245,220,0.5)";
                e.currentTarget.style.borderColor = "rgba(255,248,238,0.14)";
              }}
            >
              {soundEnabled
                ? <Volume2 size={10} strokeWidth={1.5} />
                : <VolumeX size={10} strokeWidth={1.5} />}
              {soundEnabled ? "SOUND ON" : "SOUND OFF"}
            </button>
          </motion.div>
        </div>

        {/* Scroll to begin — bottom right */}
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
          <span style={{ color: "rgba(255,240,200,0.25)", fontSize: "10px" }}>→</span>
        </motion.div>
      </div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LAYER 7 — Sakura branch LEFT (z = 15)
          Transparent PNG enters from upper-left corner
          Gentle ambient sway animation
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          zIndex: 15,
          top: "-6%",
          left: "-8%",
          width: "54%",
          transformOrigin: "0% 0%",
          ...para(-14, 1.0),
          animation: "branch-sway-l 12s ease-in-out infinite",
        }}
        initial={{ opacity: 0, x: -20, y: -15 }}
        animate={{ opacity: in_ ? 1 : 0, x: 0, y: 0 }}
        transition={{ delay: 0.25, duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <ImageWithFallback
          src={branchLeft}
          alt="Cherry blossom branch entering from upper left"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </motion.div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          LAYER 7b — Sakura branch RIGHT (z = 15)
          Transparent PNG enters from upper-right corner
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <motion.div
        className="absolute pointer-events-none"
        style={{
          zIndex: 15,
          top: "-5%",
          right: "-8%",
          width: "48%",
          transformOrigin: "100% 0%",
          ...para(-12, 1.0),
          animation: "branch-sway-r 14s ease-in-out infinite 1.5s",
        }}
        initial={{ opacity: 0, x: 20, y: -15 }}
        animate={{ opacity: in_ ? 1 : 0, x: 0, y: 0 }}
        transition={{ delay: 0.35, duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
      >
        <ImageWithFallback
          src={branchRight}
          alt="Cherry blossom branch entering from upper right"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </motion.div>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          CSS keyframes for ambient environmental animations
          ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
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
        @keyframes mist-drift {
          0%, 100% { transform: translateX(0px) scaleX(1); }
          40%       { transform: translateX(18px) scaleX(1.015); }
          75%       { transform: translateX(-12px) scaleX(0.99); }
        }
        @keyframes ray-breathe {
          0%, 100% { opacity: 0.16; }
          50%       { opacity: 0.21; }
        }
      `}</style>
    </motion.div>
  );
}
