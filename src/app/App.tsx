import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { LandingScene } from "./components/LandingScene";
import { WorldScene } from "./components/WorldScene";
import { EndJourney } from "./components/EndJourney";
import { WaitlistPage } from "./components/WaitlistPage";
import { AuthPage } from "./components/AuthPage";
import { WORLDS } from "./data/worlds";

type Scene = "landing" | "end" | "waitlist" | "auth" | number;

export default function App() {
  const [scene, setScene] = useState<Scene>("landing");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [transitioning, setTransitioning] = useState(false);

  const navigateTo = (target: Scene) => {
    if (transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setScene(target);
      setTransitioning(false);
    }, 350);
  };

  const currentWorld = typeof scene === "number" ? WORLDS[scene] : null;

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: "#080705" }}
    >
      {/* MARKER-MAKE-KIT-INVOKED */}

      {/* Cinematic black cut overlay */}
      <AnimatePresence>
        {transitioning && (
          <motion.div
            className="fixed inset-0"
            style={{ background: "#000", zIndex: 100, pointerEvents: "none" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          />
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
            onContinue={() => navigateTo("waitlist")}
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
            onSuccess={() => navigateTo("landing")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
