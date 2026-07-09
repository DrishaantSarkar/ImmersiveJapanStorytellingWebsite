import { useEffect, useRef } from "react";

interface PetalDef {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  driftX: number;
  blur: number;
  opacity: number;
  rotateStart: number;
  rotateDelta: number;
  layer: "far" | "mid" | "near";
}

// 12 total petals — restrained, cinematic, less is more
const PETALS: PetalDef[] = [
  // Far — 4 petals: small, heavily blurred, very slow, very low opacity
  { id: 0, left: 12,  size: 6,  duration: 22, delay: 0,   driftX: -55,  blur: 3,   opacity: 0.14, rotateStart: 20,  rotateDelta: 210, layer: "far" },
  { id: 1, left: 38,  size: 5,  duration: 26, delay: 4.5, driftX:  70,  blur: 3.5, opacity: 0.12, rotateStart: 140, rotateDelta: 180, layer: "far" },
  { id: 2, left: 64,  size: 7,  duration: 20, delay: 8,   driftX: -80,  blur: 2.8, opacity: 0.16, rotateStart: 60,  rotateDelta: 240, layer: "far" },
  { id: 3, left: 82,  size: 5,  duration: 24, delay: 1.5, driftX:  45,  blur: 3.2, opacity: 0.11, rotateStart: 200, rotateDelta: 170, layer: "far" },
  // Mid — 4 petals: medium, slight blur
  { id: 4, left: 8,   size: 9,  duration: 17, delay: 2,   driftX: -95,  blur: 1.2, opacity: 0.28, rotateStart: 45,  rotateDelta: 260, layer: "mid" },
  { id: 5, left: 32,  size: 11, duration: 15, delay: 7,   driftX:  85,  blur: 0.8, opacity: 0.32, rotateStart: 170, rotateDelta: 220, layer: "mid" },
  { id: 6, left: 58,  size: 8,  duration: 18, delay: 3.5, driftX: -70,  blur: 1,   opacity: 0.26, rotateStart: 90,  rotateDelta: 200, layer: "mid" },
  { id: 7, left: 76,  size: 10, duration: 16, delay: 10,  driftX:  110, blur: 0.6, opacity: 0.3,  rotateStart: 310, rotateDelta: 250, layer: "mid" },
  // Near — 4 petals: larger, sharp, faster
  { id: 8,  left: 22, size: 14, duration: 12, delay: 1,   driftX: -120, blur: 0,   opacity: 0.52, rotateStart: 80,  rotateDelta: 290, layer: "near" },
  { id: 9,  left: 46, size: 16, duration: 11, delay: 6,   driftX:  100, blur: 0,   opacity: 0.48, rotateStart: 200, rotateDelta: 260, layer: "near" },
  { id: 10, left: 68, size: 13, duration: 13, delay: 9,   driftX: -90,  blur: 0,   opacity: 0.45, rotateStart: 130, rotateDelta: 310, layer: "near" },
  { id: 11, left: 88, size: 15, duration: 12, delay: 3,   driftX:  115, blur: 0,   opacity: 0.5,  rotateStart: 260, rotateDelta: 280, layer: "near" },
];

// Organic 5-petal blossom — sized by layer for depth of field realism
function Blossom({ size, layer }: { size: number; layer: PetalDef["layer"] }) {
  const petalFill = layer === "near" ? "rgba(220,155,178,0.82)" : layer === "mid" ? "rgba(210,140,168,0.75)" : "rgba(195,120,152,0.65)";
  const centerFill = layer === "near" ? "rgba(250,225,232,0.96)" : "rgba(240,210,220,0.85)";
  const r = size / 2;

  return (
    <svg viewBox="-14 -14 28 28" width={size} height={size} style={{ display: "block", overflow: "visible" }}>
      {[0, 72, 144, 216, 288].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const cx = Math.cos(rad) * r * 0.82;
        const cy = Math.sin(rad) * r * 0.82;
        return (
          <ellipse
            key={angle}
            cx={cx}
            cy={cy}
            rx={r * 0.72}
            ry={r * 0.44}
            fill={petalFill}
            transform={`rotate(${angle + 18},${cx},${cy})`}
          />
        );
      })}
      {/* Subtle center vein lines */}
      {[0, 72, 144, 216, 288].map((angle) => {
        const rad = (angle * Math.PI) / 180;
        return (
          <line
            key={`v-${angle}`}
            x1={0} y1={0}
            x2={Math.cos(rad) * r * 1.3}
            y2={Math.sin(rad) * r * 1.3}
            stroke={centerFill}
            strokeWidth="0.4"
            strokeOpacity="0.4"
          />
        );
      })}
      {/* Center stamen cluster */}
      <circle r={r * 0.25} fill={centerFill} />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <circle
          key={a}
          cx={Math.cos((a * Math.PI) / 180) * r * 0.4}
          cy={Math.sin((a * Math.PI) / 180) * r * 0.4}
          r={r * 0.09}
          fill={centerFill}
          opacity={0.75}
        />
      ))}
    </svg>
  );
}

export function SakuraPetals() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <style>{`
        @keyframes petal-cinematic {
          0%   { transform: translateY(var(--sy)) translateX(0px)               rotate(var(--r0)); opacity: 0; }
          7%   { opacity: var(--op); }
          35%  { transform: translateY(35vh) translateX(calc(var(--dx)*0.35)) rotate(calc(var(--r0) + var(--rd)*0.35)); }
          68%  { transform: translateY(68vh) translateX(calc(var(--dx)*0.72)) rotate(calc(var(--r0) + var(--rd)*0.72)); }
          93%  { opacity: var(--op); }
          100% { transform: translateY(112vh) translateX(var(--dx))              rotate(calc(var(--r0) + var(--rd))); opacity: 0; }
        }
      `}</style>

      {PETALS.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            top: 0,
            left: `${p.left}%`,
            filter: p.blur > 0 ? `blur(${p.blur}px)` : undefined,
            animationName: "petal-cinematic",
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            animationTimingFunction: "ease-in",
            animationIterationCount: "infinite",
            willChange: "transform, opacity",
            ["--sy" as string]: "-5vh",
            ["--dx" as string]: `${p.driftX}px`,
            ["--op" as string]: p.opacity,
            ["--r0" as string]: `${p.rotateStart}deg`,
            ["--rd" as string]: `${p.rotateDelta}deg`,
          }}
        >
          <Blossom size={p.size} layer={p.layer} />
        </div>
      ))}
    </div>
  );
}
