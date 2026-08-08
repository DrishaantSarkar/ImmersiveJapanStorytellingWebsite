import { motion, AnimatePresence } from "motion/react";
import { X, ExternalLink } from "lucide-react";
import { WorldData } from "../data/worlds";

interface InfoPanelProps {
  world: WorldData;
  isOpen: boolean;
  onClose: () => void;
}

export function InfoPanel({ world, isOpen, onClose }: InfoPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop darkener */}
          <motion.div
            className="fixed inset-0 pointer-events-none"
            style={{ background: "rgba(0,0,0,0.3)", zIndex: 40 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          />

          {/* Panel */}
          <motion.div
            className="fixed top-0 right-0 h-full overflow-y-auto"
            style={{
              width: "min(520px, 100vw)",
              zIndex: 50,
              background:
                "linear-gradient(135deg, rgba(12,9,6,0.94) 0%, rgba(18,12,8,0.96) 100%)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderLeft: `1px solid rgba(240,235,224,0.08)`,
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Top accent bar */}
            <div
              style={{
                height: 3,
                background: `linear-gradient(to right, ${world.accentColor}, transparent)`,
              }}
            />

            <div className="relative p-10 pb-16">
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-8 right-8 flex items-center justify-center transition-all duration-200"
                style={{
                  width: 36,
                  height: 36,
                  border: "1px solid rgba(240,235,224,0.15)",
                  color: "rgba(240,235,224,0.4)",
                  background: "transparent",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(240,235,224,0.4)";
                  e.currentTarget.style.color = "#f0ebe0";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(240,235,224,0.15)";
                  e.currentTarget.style.color = "rgba(240,235,224,0.4)";
                }}
              >
                <X size={14} strokeWidth={1.5} />
              </button>

              {/* World index */}
              <p
                style={{
                  color: world.accentColor,
                  fontSize: "10px",
                  letterSpacing: "0.35em",
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: "20px",
                  opacity: 0.85,
                }}
              >
                WORLD {String(world.index + 1).padStart(2, "0")} OF 05
              </p>

              {/* Kanji display */}
              <p
                className="font-japanese"
                style={{
                  color: "rgba(240,235,224,0.25)",
                  fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                  fontWeight: 400,
                  letterSpacing: "0.15em",
                  marginBottom: "8px",
                  lineHeight: 1,
                }}
              >
                {world.kanji}
              </p>

              {/* Main title */}
              <h2
                className="font-display"
                style={{
                  color: "#f0ebe0",
                  fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                  fontWeight: 300,
                  lineHeight: 1.15,
                  marginBottom: "6px",
                }}
              >
                {world.title}
              </h2>

              {/* Era / location tag */}
              <p
                style={{
                  color: "rgba(240,235,224,0.4)",
                  fontSize: "11px",
                  letterSpacing: "0.2em",
                  fontFamily: "'DM Sans', sans-serif",
                  marginBottom: "36px",
                }}
              >
                {world.era}
              </p>

              {/* Hairline */}
              <div
                style={{
                  height: "1px",
                  background: "rgba(240,235,224,0.08)",
                  marginBottom: "32px",
                }}
              />

              {/* Gallery */}
              <div className="grid grid-cols-2 gap-3 mb-10">
                {world.panel.galleryImages.map((img, i) => (
                  <div key={i} className="relative overflow-hidden">
                    <div
                      style={{
                        paddingBottom: "62%",
                        position: "relative",
                        background: "#1a1410",
                      }}
                    >
                      <img
                        src={img.url}
                        alt={img.caption}
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          opacity: 0.85,
                          transition: "opacity 0.3s, transform 0.5s",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLImageElement).style.opacity =
                            "1";
                          (
                            e.currentTarget as HTMLImageElement
                          ).style.transform = "scale(1.04)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLImageElement).style.opacity =
                            "0.85";
                          (
                            e.currentTarget as HTMLImageElement
                          ).style.transform = "scale(1)";
                        }}
                      />
                    </div>
                    <p
                      style={{
                        color: "rgba(240,235,224,0.35)",
                        fontSize: "9px",
                        letterSpacing: "0.12em",
                        fontFamily: "'DM Sans', sans-serif",
                        marginTop: "8px",
                        lineHeight: 1.4,
                      }}
                    >
                      {img.caption}
                    </p>
                  </div>
                ))}
              </div>

              {/* Description section */}
              <Section
                label="HISTORY"
                accentColor={world.accentColor}
                content={world.panel.description}
              />

              <Section
                label="CULTURAL SIGNIFICANCE"
                accentColor={world.accentColor}
                content={world.panel.cultural}
              />

              <Section
                label="ARCHITECTURAL DETAILS"
                accentColor={world.accentColor}
                content={world.panel.architectural}
              />

              {/* Learn more button */}
              <button
                className="flex items-center gap-3 mt-10 transition-all duration-300 group"
                style={{
                  color: world.accentColor,
                  fontSize: "11px",
                  letterSpacing: "0.25em",
                  fontFamily: "'DM Sans', sans-serif",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.7";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                <span
                  style={{
                    display: "block",
                    width: 32,
                    height: 1,
                    background: world.accentColor,
                    transition: "width 0.3s",
                  }}
                />
                DISCOVER MORE
                <ExternalLink size={11} strokeWidth={1.5} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Section({
  label,
  content,
  accentColor,
}: {
  label: string;
  content: string;
  accentColor: string;
}) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <div className="flex items-center gap-3 mb-4">
        <div
          style={{
            width: 16,
            height: 1,
            background: accentColor,
            opacity: 0.7,
          }}
        />
        <p
          style={{
            color: "rgba(240,235,224,0.35)",
            fontSize: "9px",
            letterSpacing: "0.3em",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {label}
        </p>
      </div>
      <p
        style={{
          color: "rgba(240,235,224,0.72)",
          fontSize: "14px",
          fontWeight: 300,
          lineHeight: 1.85,
          fontFamily: "'Crimson Pro', Georgia, serif",
        }}
      >
        {content}
      </p>
    </div>
  );
}
