import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LandingScene } from "./components/LandingScene";
import { WorldScene } from "./components/WorldScene";
import { EndJourney } from "./components/EndJourney";
import { WaitlistPage } from "./components/WaitlistPage";
import { AuthPage } from "./components/AuthPage";
import { DashboardPage } from "./components/DashboardPage";
import { WORLDS } from "./data/worlds";

type Scene = "landing" | "end" | "waitlist" | "auth" | "dashboard" | number;

// World-specific transition overlay color
function transitionColorFor(target: Scene): string {
  if (typeof target === "number" && WORLDS[target]) {
    return WORLDS[target].accentColor + "cc"; // 80% opacity
  }
  if (target === "end")       return "rgba(60,20,35,0.96)";
  if (target === "waitlist")  return "rgba(12,8,20,0.96)";
  if (target === "auth")      return "rgba(6,4,8,0.98)";
  if (target === "dashboard") return "rgba(8,5,14,0.98)";
  return "rgba(8,6,4,0.98)";
}

// Kanji shown during transition flash (world-to-world only)
function transitionKanjiFor(target: Scene): string | null {
  if (typeof target === "number" && WORLDS[target]) {
    return WORLDS[target].kanji;
  }
  return null;
}

export default function App() {
  const [scene, setScene] = useState<Scene>("landing");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionColor, setTransitionColor] = useState("rgba(8,6,4,0.98)");
  const [transitionKanji, setTransitionKanji] = useState<string | null>(null);

  const navigateTo = (target: Scene) => {
    if (transitioning) return;
    setTransitionColor(transitionColorFor(target));
    setTransitionKanji(transitionKanjiFor(target));
    setTransitioning(true);
    setTimeout(() => {
      setScene(target);
      setTransitioning(false);
      setTransitionKanji(null);
    }, 480);
  };

  const currentWorld = typeof scene === "number" ? WORLDS[scene] : null;

  return (
    <div className="fixed inset-0 overflow-hidden" style={{ background: "#080705" }}>
      {/* MARKER-MAKE-KIT-INVOKED */}

      {/* Cinematic world-specific transition overlay */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center"
            style={{ background: transitionColor, zIndex: 200, pointerEvents: "none" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {transitionKanji && (
              <motion.span
                className="font-japanese"
                style={{
                  color: "rgba(255,255,255,0.15)",
                  fontSize: "clamp(4rem, 12vw, 9rem)",
                  letterSpacing: "0.2em",
                  userSelect: "none",
                }}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                {transitionKanji}
              </motion.span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {scene === "landing" && (
          <LandingScene
            key="landing"
            onStart={() => navigateTo(0)}
            soundEnabled={soundEnabled}
            onToggleSound={() => setSoundEnabled((s) => !s)}
          />
        )}

        {typeof scene === "number" && currentWorld && (
          <WorldScene
            key={currentWorld.id}
            world={currentWorld}
            onNavigate={(index) => {
              if (index >= WORLDS.length) {
                navigateTo("end");
              } else {
                navigateTo(index);
              }
            }}
            onReturnHome={() => navigateTo("landing")}
          />
        )}

        {scene === "end" && (
          <EndJourney
            key="end"
            onContinue={() => navigateTo("auth")}
          />
        )}

        {scene === "waitlist" && (
          <WaitlistPage
            key="waitlist"
            onNavigateAuth={() => navigateTo("auth")}
            onBack={() => navigateTo("end")}
          />
        )}

        {scene === "auth" && (
          <AuthPage
            key="auth"
            onBack={() => navigateTo("waitlist")}
            onSuccess={() => navigateTo("dashboard")}
          />
        )}

        {scene === "dashboard" && (
          <DashboardPage
            key="dashboard"
            onBackToJourney={() => navigateTo("landing")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
