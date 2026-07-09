import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { WORLDS } from "../data/worlds";

interface WorldNavProps {
  currentIndex: number;
  onNavigate: (index: number) => void;
  accentColor: string;
}

export function WorldNav({ currentIndex, onNavigate, accentColor }: WorldNavProps) {
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex <= WORLDS.length - 1;

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 flex items-end justify-between px-10 pb-9"
      style={{ zIndex: 30 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.8 }}
    >
      {/* Prev button */}
      <button
        onClick={() => hasPrev && onNavigate(currentIndex - 1)}
        className="flex items-center gap-3 transition-all duration-300"
        style={{
          color: hasPrev ? "rgba(240,235,224,0.45)" : "rgba(240,235,224,0.12)",
          fontSize: "10px",
          letterSpacing: "0.25em",
          fontFamily: "'DM Sans', sans-serif",
          background: "transparent",
          border: "none",
          cursor: hasPrev ? "pointer" : "default",
          padding: 0,
        }}
        onMouseEnter={(e) => {
          if (hasPrev) e.currentTarget.style.color = "rgba(240,235,224,0.85)";
        }}
        onMouseLeave={(e) => {
          if (hasPrev) e.currentTarget.style.color = "rgba(240,235,224,0.45)";
        }}
      >
        <ChevronLeft size={14} strokeWidth={1} />
        PREV
      </button>

      {/* World dots + counter */}
      <div className="flex flex-col items-center gap-4">
        {/* Dots */}
        <div className="flex items-center gap-3">
          {WORLDS.map((w, i) => (
            <button
              key={w.id}
              onClick={() => onNavigate(i)}
              className="transition-all duration-400"
              style={{
                width: i === currentIndex ? 24 : 6,
                height: 1,
                background:
                  i === currentIndex
                    ? accentColor
                    : i < currentIndex
                    ? "rgba(240,235,224,0.35)"
                    : "rgba(240,235,224,0.15)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.4s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>

        {/* Counter */}
        <p
          style={{
            color: "rgba(240,235,224,0.25)",
            fontSize: "9px",
            letterSpacing: "0.3em",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {String(currentIndex + 1).padStart(2, "0")} / {String(WORLDS.length).padStart(2, "0")}
        </p>
      </div>

      {/* Next button */}
      <button
        onClick={() => hasNext && onNavigate(currentIndex + 1)}
        className="flex items-center gap-3 transition-all duration-300"
        style={{
          color: hasNext ? "rgba(240,235,224,0.45)" : "rgba(240,235,224,0.15)",
          fontSize: "10px",
          letterSpacing: "0.25em",
          fontFamily: "'DM Sans', sans-serif",
          background: "transparent",
          border: "none",
          cursor: hasNext ? "pointer" : "default",
          padding: 0,
        }}
        onMouseEnter={(e) => {
          if (hasNext) e.currentTarget.style.color = "rgba(240,235,224,0.85)";
        }}
        onMouseLeave={(e) => {
          if (hasNext) e.currentTarget.style.color = "rgba(240,235,224,0.45)";
        }}
      >
        NEXT
        <ChevronRight size={14} strokeWidth={1} />
      </button>
    </motion.div>
  );
}
