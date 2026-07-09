import { useState } from "react";
import { motion } from "motion/react";
import { SakuraPetals } from "./SakuraPetals";
import { ArrowRight } from "lucide-react";

interface WaitlistPageProps {
  onNavigateAuth: () => void;
  onBack: () => void;
}

const FUTURE_WORLDS = [
  {
    title: "Kyoto Temples",
    kanji: "京都の寺院",
    desc: "Ancient Zen gardens and wooden sanctuaries hidden in the hills of Higashiyama.",
    color: "#8b5e3c",
    imageUrl: "https://images.unsplash.com/photo-1578469645742-46cae010e5d4?w=800&h=500&fit=crop&auto=format&q=85",
  },
  {
    title: "Himeji Castle",
    kanji: "姫路城",
    desc: "The White Heron fortress of feudal Japan, rising above a sea of cherry blossoms.",
    color: "#7a7a8a",
    imageUrl: "https://images.unsplash.com/photo-1708656376421-8db46939bcfe?w=800&h=500&fit=crop&auto=format&q=85",
  },
  {
    title: "Nara Deer Park",
    kanji: "奈良公園",
    desc: "Sacred deer roam freely among ancient Tōdai-ji temple and cedar groves.",
    color: "#4a7c59",
    imageUrl: "https://images.unsplash.com/photo-1732629558278-f527fc461a3b?w=800&h=500&fit=crop&auto=format&q=85",
  },
  {
    title: "Gion District",
    kanji: "祇園",
    desc: "Lantern-lit machiya townhouses and stone-paved alleys of old Kyoto.",
    color: "#C23B22",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=500&fit=crop&auto=format&q=85",
  },
  {
    title: "Japanese Festivals",
    kanji: "日本の祭り",
    desc: "The living traditions of Obon, Gion Matsuri, and seasonal rites across Japan.",
    color: "#d4789a",
    imageUrl: "https://images.unsplash.com/photo-1710216106278-a64505ca2141?w=800&h=500&fit=crop&auto=format&q=85",
  },
];

const WHY_JOIN = [
  {
    number: "01",
    title: "Interactive Cultural Worlds",
    desc: "Step inside living recreations of Japan's most sacred and celebrated locations, built with cinematic precision.",
  },
  {
    number: "02",
    title: "Digital Tourism Experiences",
    desc: "Explore destinations before you visit — or experience places otherwise impossible to access.",
  },
  {
    number: "03",
    title: "Educational Storytelling",
    desc: "Deep historical narratives, architectural analysis, and cultural context woven seamlessly into every world.",
  },
  {
    number: "04",
    title: "Exclusive Early Access",
    desc: "Members receive access to new worlds before public release, along with invitations to live exhibition events.",
  },
];

const PARTNERS = [
  "MUSEUM OF CULTURAL HERITAGE",
  "JAPAN TOURISM AGENCY",
  "NATIONAL CULTURAL FOUNDATION",
  "INSTITUTE FOR DIGITAL ARTS",
  "HERITAGE PRESERVATION FUND",
  "GLOBAL CULTURAL EXCHANGE",
];

const fadeIn = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 1, delay },
});

export function WaitlistPage({ onNavigateAuth, onBack }: WaitlistPageProps) {
  const [formData, setFormData] = useState({ name: "", email: "", country: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email) setSubmitted(true);
  };

  return (
    <motion.div
      className="fixed inset-0 overflow-y-auto"
      style={{ background: "#080705" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      {/* Top nav */}
      <div
        className="sticky top-0 flex justify-between items-center px-10 py-6"
        style={{
          zIndex: 50,
          background: "rgba(8,7,5,0.88)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(240,235,224,0.06)",
        }}
      >
        <button
          onClick={onBack}
          className="font-japanese"
          style={{
            color: "rgba(240,235,224,0.35)",
            fontSize: "12px",
            letterSpacing: "0.2em",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            transition: "color 0.3s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(240,235,224,0.7)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(240,235,224,0.35)")}
        >
          ← 日本
        </button>
        <button
          onClick={onNavigateAuth}
          style={{
            color: "rgba(240,235,224,0.35)",
            fontSize: "9px",
            letterSpacing: "0.28em",
            fontFamily: "'DM Sans', sans-serif",
            background: "transparent",
            border: "1px solid rgba(240,235,224,0.1)",
            cursor: "pointer",
            padding: "8px 20px",
            transition: "all 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = "rgba(240,235,224,0.7)";
            e.currentTarget.style.borderColor = "rgba(240,235,224,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = "rgba(240,235,224,0.35)";
            e.currentTarget.style.borderColor = "rgba(240,235,224,0.1)";
          }}
        >
          SIGN IN
        </button>
      </div>

      {/* ── HERO SECTION ── */}
      <section
        className="relative flex flex-col items-center justify-center text-center px-6 overflow-hidden"
        style={{ minHeight: "100vh", paddingTop: 80, paddingBottom: 80 }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 60%, rgba(60,20,35,0.3) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 35%, rgba(8,7,5,0.8) 100%)",
          }}
        />
        <SakuraPetals />

        <motion.p
          className="font-japanese"
          style={{ color: "rgba(194,59,34,0.65)", fontSize: "11px", letterSpacing: "0.55em", marginBottom: 24, position: "relative", zIndex: 2 }}
          {...fadeIn(0)}
        >
          参加する
        </motion.p>
        <motion.h1
          className="font-display"
          style={{
            color: "#f0ebe0",
            fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
            fontWeight: 300,
            lineHeight: 1.08,
            marginBottom: 12,
            position: "relative",
            zIndex: 2,
          }}
          {...fadeIn(0.15)}
        >
          Join the Journey
        </motion.h1>
        <motion.p
          className="font-display"
          style={{
            color: "#c8a882",
            fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)",
            fontWeight: 300,
            fontStyle: "italic",
            marginBottom: 32,
            position: "relative",
            zIndex: 2,
          }}
          {...fadeIn(0.25)}
        >
          Be among the first to experience immersive digital cultural exploration.
        </motion.p>

        <motion.div className="flex items-center gap-5 mb-8" style={{ position: "relative", zIndex: 2 }} {...fadeIn(0.35)}>
          <div style={{ width: 40, height: 1, background: "linear-gradient(to right, transparent, rgba(194,59,34,0.45))" }} />
          <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(194,59,34,0.55)" }} />
          <div style={{ width: 40, height: 1, background: "linear-gradient(to left, transparent, rgba(194,59,34,0.45))" }} />
        </motion.div>

        <motion.p
          style={{
            color: "rgba(240,235,224,0.45)",
            fontSize: "clamp(0.82rem, 1.3vw, 0.95rem)",
            fontWeight: 300,
            lineHeight: 1.8,
            maxWidth: 480,
            letterSpacing: "0.05em",
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 56,
            position: "relative",
            zIndex: 2,
          }}
          {...fadeIn(0.4)}
        >
          Gain early access to future worlds, cultural experiences, historical
          locations, and platform updates.
        </motion.p>

        {/* Waitlist form */}
        <motion.div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: 460,
          }}
          {...fadeIn(0.5)}
        >
          {submitted ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, rgba(194,59,34,0.6), transparent)" }} />
              <p
                className="font-display"
                style={{ color: "#c8a882", fontSize: "1.4rem", fontWeight: 300, fontStyle: "italic" }}
              >
                Your journey begins.
              </p>
              <p style={{ color: "rgba(240,235,224,0.4)", fontSize: "10px", letterSpacing: "0.25em", fontFamily: "'DM Sans', sans-serif" }}>
                WE WILL REACH OUT SOON
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {(["name", "email", "country"] as const).map((field) => (
                <input
                  key={field}
                  type={field === "email" ? "email" : "text"}
                  placeholder={field === "name" ? "Full Name" : field === "email" ? "Email Address" : "Country"}
                  value={formData[field]}
                  onChange={(e) => setFormData((p) => ({ ...p, [field]: e.target.value }))}
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(240,235,224,0.1)",
                    color: "#f0ebe0",
                    padding: "14px 20px",
                    fontSize: "13px",
                    fontFamily: "'DM Sans', sans-serif",
                    letterSpacing: "0.05em",
                    outline: "none",
                    transition: "border-color 0.3s",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(194,59,34,0.5)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(240,235,224,0.1)")}
                />
              ))}
              <button
                type="submit"
                className="flex items-center justify-center gap-3"
                style={{
                  background: "rgba(194,59,34,0.12)",
                  border: "1px solid rgba(194,59,34,0.5)",
                  color: "#f0ebe0",
                  padding: "15px 24px",
                  fontSize: "10px",
                  letterSpacing: "0.28em",
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: "pointer",
                  marginTop: 8,
                  transition: "all 0.35s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(194,59,34,0.22)";
                  e.currentTarget.style.borderColor = "rgba(194,59,34,0.8)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(194,59,34,0.12)";
                  e.currentTarget.style.borderColor = "rgba(194,59,34,0.5)";
                }}
              >
                JOIN THE WAITLIST
                <ArrowRight size={12} strokeWidth={1.5} />
              </button>
            </form>
          )}
        </motion.div>
      </section>

      {/* ── FUTURE WORLDS ── */}
      <section className="px-10 py-24" style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.div className="flex items-center gap-5 mb-16" {...fadeIn(0)}>
          <div style={{ width: 20, height: 1, background: "rgba(194,59,34,0.5)" }} />
          <p style={{ color: "rgba(240,235,224,0.3)", fontSize: "9px", letterSpacing: "0.35em", fontFamily: "'DM Sans', sans-serif" }}>
            COMING SOON
          </p>
        </motion.div>
        <motion.h2
          className="font-display"
          style={{ color: "#f0ebe0", fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", fontWeight: 300, marginBottom: 48 }}
          {...fadeIn(0.1)}
        >
          Future Worlds
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(240,235,224,0.06)" }}>
          {FUTURE_WORLDS.map((w, i) => (
            <motion.div
              key={w.title}
              className="relative overflow-hidden group"
              style={{
                background: "#080705",
                cursor: "default",
              }}
              {...fadeIn(i * 0.08)}
            >
              {/* Photo */}
              <div style={{ position: "relative", paddingBottom: "58%", overflow: "hidden", background: "#0a0806" }}>
                <img
                  src={w.imageUrl}
                  alt={w.title}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "saturate(1.3) brightness(0.55) contrast(1.1)",
                    transition: "filter 0.6s ease, transform 0.6s ease",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLImageElement).style.filter = "saturate(1.6) brightness(0.7) contrast(1.1)";
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLImageElement).style.filter = "saturate(1.3) brightness(0.55) contrast(1.1)";
                    (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                  }}
                />
                {/* Gradient fade bottom */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to bottom, transparent 40%, rgba(8,7,5,0.85) 100%)",
                    pointerEvents: "none",
                  }}
                />
                {/* Kanji watermark */}
                <p
                  className="font-japanese"
                  style={{
                    position: "absolute",
                    bottom: 12,
                    left: 16,
                    color: "rgba(240,235,224,0.22)",
                    fontSize: "11px",
                    letterSpacing: "0.2em",
                    pointerEvents: "none",
                  }}
                >
                  {w.kanji}
                </p>
                {/* Coming Soon badge */}
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    padding: "3px 10px",
                    border: `1px solid ${w.color}60`,
                    color: w.color,
                    fontSize: "7px",
                    letterSpacing: "0.28em",
                    fontFamily: "'DM Sans', sans-serif",
                    background: "rgba(8,7,5,0.6)",
                    backdropFilter: "blur(8px)",
                    pointerEvents: "none",
                  }}
                >
                  COMING SOON
                </div>
              </div>
              {/* Text */}
              <div style={{ padding: "20px 20px 24px" }}>
                <div style={{ width: 18, height: 1, background: w.color, marginBottom: 14, opacity: 0.7 }} />
                <p
                  className="font-display"
                  style={{ color: "#f0ebe0", fontSize: "1.05rem", fontWeight: 400, marginBottom: 8, lineHeight: 1.25 }}
                >
                  {w.title}
                </p>
                <p
                  style={{ color: "rgba(240,235,224,0.42)", fontSize: "12px", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7, fontWeight: 300 }}
                >
                  {w.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── WHY JOIN ── */}
      <section
        style={{
          background: "rgba(255,255,255,0.018)",
          borderTop: "1px solid rgba(240,235,224,0.06)",
          borderBottom: "1px solid rgba(240,235,224,0.06)",
          padding: "80px 40px",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.h2
            className="font-display"
            style={{ color: "#f0ebe0", fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", fontWeight: 300, marginBottom: 56 }}
            {...fadeIn(0)}
          >
            Why Join
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
            {WHY_JOIN.map((item, i) => (
              <motion.div key={item.number} className="flex gap-8" {...fadeIn(i * 0.1)}>
                <span
                  style={{ color: "rgba(194,59,34,0.45)", fontSize: "11px", letterSpacing: "0.1em", fontFamily: "'DM Sans', sans-serif", flexShrink: 0, paddingTop: 3 }}
                >
                  {item.number}
                </span>
                <div>
                  <p
                    className="font-display"
                    style={{ color: "#f0ebe0", fontSize: "1.15rem", fontWeight: 300, marginBottom: 10 }}
                  >
                    {item.title}
                  </p>
                  <p
                    style={{ color: "rgba(240,235,224,0.45)", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.75, fontWeight: 300 }}
                  >
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PARTNERSHIPS ── */}
      <section className="px-10 py-20" style={{ maxWidth: 1100, margin: "0 auto" }}>
        <motion.p
          style={{ color: "rgba(240,235,224,0.25)", fontSize: "9px", letterSpacing: "0.35em", fontFamily: "'DM Sans', sans-serif", marginBottom: 40 }}
          {...fadeIn(0)}
        >
          INSTITUTIONAL PARTNERS & COLLABORATORS
        </motion.p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-px" style={{ border: "1px solid rgba(240,235,224,0.06)" }}>
          {PARTNERS.map((name, i) => (
            <motion.div
              key={name}
              className="flex items-center justify-center"
              style={{
                padding: "28px 20px",
                border: "1px solid rgba(240,235,224,0.05)",
                background: "rgba(255,255,255,0.015)",
                color: "rgba(240,235,224,0.18)",
                fontSize: "8px",
                letterSpacing: "0.22em",
                fontFamily: "'DM Sans', sans-serif",
                textAlign: "center",
                lineHeight: 1.6,
                transition: "color 0.3s, background 0.3s",
                cursor: "default",
              }}
              {...fadeIn(i * 0.07)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.color = "rgba(240,235,224,0.4)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.color = "rgba(240,235,224,0.18)";
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.015)";
              }}
            >
              {name}
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section
        className="relative flex flex-col items-center text-center px-6 py-32 overflow-hidden"
        style={{ borderTop: "1px solid rgba(240,235,224,0.06)" }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(50,15,30,0.35) 0%, transparent 70%)",
          }}
        />
        <motion.h2
          className="font-display"
          style={{
            color: "#f0ebe0",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 300,
            lineHeight: 1.1,
            marginBottom: 16,
            position: "relative",
            zIndex: 2,
          }}
          {...fadeIn(0)}
        >
          The Journey Continues
        </motion.h2>
        <motion.p
          style={{
            color: "rgba(240,235,224,0.42)",
            fontSize: "clamp(0.82rem, 1.3vw, 0.95rem)",
            fontWeight: 300,
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: "0.07em",
            maxWidth: 400,
            lineHeight: 1.8,
            marginBottom: 44,
            position: "relative",
            zIndex: 2,
          }}
          {...fadeIn(0.15)}
        >
          Help shape the future of immersive cultural exploration.
        </motion.p>
        <motion.button
          onClick={onNavigateAuth}
          style={{
            padding: "14px 52px",
            border: "1px solid rgba(194,59,34,0.5)",
            color: "#f0ebe0",
            fontSize: "10px",
            letterSpacing: "0.28em",
            fontFamily: "'DM Sans', sans-serif",
            background: "transparent",
            cursor: "pointer",
            position: "relative",
            zIndex: 2,
            transition: "all 0.4s",
          }}
          {...fadeIn(0.25)}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(194,59,34,0.14)";
            e.currentTarget.style.borderColor = "rgba(194,59,34,0.8)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(194,59,34,0.5)";
          }}
        >
          JOIN WAITLIST
        </motion.button>
      </section>

      {/* Footer */}
      <div
        className="flex justify-between items-center px-10 py-6"
        style={{ borderTop: "1px solid rgba(240,235,224,0.05)" }}
      >
        <span style={{ color: "rgba(240,235,224,0.15)", fontSize: "9px", letterSpacing: "0.2em", fontFamily: "'DM Sans', sans-serif" }}>
          JAPAN WORLDS — CULTURAL IMMERSION PLATFORM
        </span>
        <span style={{ color: "rgba(240,235,224,0.15)", fontSize: "9px", letterSpacing: "0.2em", fontFamily: "'DM Sans', sans-serif" }}>
          © 2024
        </span>
      </div>
    </motion.div>
  );
}
