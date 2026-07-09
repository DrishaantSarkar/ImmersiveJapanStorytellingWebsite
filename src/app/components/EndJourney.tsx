import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SakuraPetals } from "./SakuraPetals";

interface EndJourneyProps {
  onContinue: () => void;
}

export function EndJourney({ onContinue }: EndJourneyProps) {
  const [phase, setPhase] = useState<"entering" | "main" | "cta">("entering");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("main"), 1200);
    const t2 = setTimeout(() => setPhase("cta"), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 overflow-hidden flex flex-col items-center justify-center"
      style={{ background: "#060408" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.6 }}
    >
      {/* Atmospheric gradient — warm low light */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 60% at 50% 80%, rgba(60,20,35,0.4) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 50% 50%, rgba(30,10,20,0.3) 0%, transparent 60%)",
        }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(6,4,8,0.85) 100%)",
        }}
      />

      {/* Sakura petals — more restrained */}
      <SakuraPetals />

      {/* Horizontal hairline */}
      <motion.div
        className="absolute top-0 left-0 right-0"
        style={{ height: 1, background: "rgba(240,235,224,0.06)" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.4, duration: 2 }}
      />

      {/* Main content */}
      <div className="relative flex flex-col items-center text-center px-8" style={{ zIndex: 10 }}>
        {/* Decorative top element */}
        <motion.div
          className="flex items-center gap-6 mb-14"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: phase !== "entering" ? 1 : 0, y: phase !== "entering" ? 0 : 10 }}
          transition={{ duration: 1.4 }}
        >
          <div style={{ width: 60, height: 1, background: "linear-gradient(to right, transparent, rgba(212,120,154,0.4))" }} />
          <div
            className="font-japanese"
            style={{ color: "rgba(212,120,154,0.5)", fontSize: "11px", letterSpacing: "0.4em" }}
          >
            旅の終わりに
          </div>
          <div style={{ width: 60, height: 1, background: "linear-gradient(to left, transparent, rgba(212,120,154,0.4))" }} />
        </motion.div>

        {/* Primary message */}
        <motion.p
          className="font-display"
          style={{
            color: "rgba(240,235,224,0.85)",
            fontSize: "clamp(1.6rem, 4vw, 3.2rem)",
            fontWeight: 300,
            lineHeight: 1.3,
            letterSpacing: "0.02em",
            marginBottom: "12px",
            fontStyle: "italic",
            textShadow: "0 4px 40px rgba(0,0,0,0.5)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: phase !== "entering" ? 1 : 0, y: phase !== "entering" ? 0 : 20 }}
          transition={{ duration: 1.6, delay: 0.2 }}
        >
          Every journey leaves an imprint.
        </motion.p>

        {/* Japanese subtitle */}
        <motion.p
          className="font-japanese"
          style={{
            color: "rgba(240,235,224,0.3)",
            fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
            fontWeight: 400,
            letterSpacing: "0.3em",
            marginBottom: "56px",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: phase !== "entering" ? 1 : 0 }}
          transition={{ duration: 1.4, delay: 0.6 }}
        >
          旅は心に残る
        </motion.p>

        {/* Thin separator */}
        <motion.div
          style={{
            width: 1,
            height: 48,
            background: "linear-gradient(to bottom, rgba(212,120,154,0.5), transparent)",
            marginBottom: "48px",
          }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: phase === "cta" ? 1 : 0, opacity: phase === "cta" ? 1 : 0 }}
          transition={{ duration: 0.8 }}
        />

        {/* CTA */}
        <AnimatePresence>
          {phase === "cta" && (
            <motion.div
              className="flex flex-col items-center gap-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <p
                style={{
                  color: "rgba(240,235,224,0.38)",
                  fontSize: "11px",
                  letterSpacing: "0.22em",
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: "8px",
                }}
              >
                THE EXPERIENCE CONTINUES
              </p>

              <button
                onClick={onContinue}
                style={{
                  padding: "14px 52px",
                  border: "1px solid rgba(212,120,154,0.45)",
                  color: "#f0ebe0",
                  fontSize: "10px",
                  letterSpacing: "0.28em",
                  fontFamily: "'DM Sans', sans-serif",
                  background: "transparent",
                  cursor: "pointer",
                  transition: "all 0.4s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(212,120,154,0.1)";
                  e.currentTarget.style.borderColor = "rgba(212,120,154,0.8)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(212,120,154,0.45)";
                }}
              >
                JOIN THE JOURNEY
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* World nav hint — back to start */}
      <motion.button
        className="absolute bottom-10 left-1/2 flex items-center gap-3"
        style={{
          transform: "translateX(-50%)",
          color: "rgba(240,235,224,0.22)",
          fontSize: "9px",
          letterSpacing: "0.3em",
          fontFamily: "'DM Sans', sans-serif",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          zIndex: 10,
          transition: "color 0.3s",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        onClick={onContinue}
        onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(240,235,224,0.5)")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(240,235,224,0.22)")}
      >
        <span>←</span>
        <span>RETURN TO BEGINNING</span>
      </motion.button>
    </motion.div>
  );
}
