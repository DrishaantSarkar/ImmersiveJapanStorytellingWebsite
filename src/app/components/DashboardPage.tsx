import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  User, BookOpen, Library, Settings, ChevronRight,
  MapPin, Globe, Edit3, Check, BookMarked, Lock, Play,
  TrendingUp, Award, Clock, ArrowLeft
} from "lucide-react";

interface DashboardPageProps {
  onBackToJourney: () => void;
}

type Tab = "profile" | "lessons" | "library" | "settings";

// ── Mock data ──

const LESSONS = [
  {
    id: "l1",
    world: "Itsukushima Shrine",
    kanji: "厳島神社",
    module: "Sacred Architecture of Japan",
    progress: 72,
    status: "in_progress" as const,
    accentColor: "#C23B22",
    chapters: 8,
    completedChapters: 6,
    duration: "45 min",
    lastAccessed: "2 days ago",
  },
  {
    id: "l2",
    world: "Arashiyama Bamboo Grove",
    kanji: "嵐山竹林",
    module: "Zen Aesthetics & Nature",
    progress: 100,
    status: "completed" as const,
    accentColor: "#4a7c59",
    chapters: 6,
    completedChapters: 6,
    duration: "32 min",
    lastAccessed: "1 week ago",
  },
  {
    id: "l3",
    world: "Fushimi Inari Taisha",
    kanji: "伏見稲荷大社",
    module: "Shinto Faith & Ritual",
    progress: 20,
    status: "in_progress" as const,
    accentColor: "#D4580A",
    chapters: 10,
    completedChapters: 2,
    duration: "58 min",
    lastAccessed: "Today",
  },
  {
    id: "l4",
    world: "Mount Fuji",
    kanji: "富士山",
    module: "Sacred Mountains of Asia",
    progress: 0,
    status: "locked" as const,
    accentColor: "#4a6fa5",
    chapters: 9,
    completedChapters: 0,
    duration: "52 min",
    lastAccessed: "—",
  },
  {
    id: "l5",
    world: "Maruyama Sakura Garden",
    kanji: "円山公園の桜",
    module: "Mono no Aware — Beauty of Impermanence",
    progress: 0,
    status: "locked" as const,
    accentColor: "#d4789a",
    chapters: 7,
    completedChapters: 0,
    duration: "40 min",
    lastAccessed: "—",
  },
];

const GRAPHIC_NOVELS = [
  {
    id: "gn1",
    title: "The Vermillion Gate",
    subtitle: "A tale of Fushimi Inari",
    kanji: "朱の鳥居",
    status: "available" as const,
    accentColor: "#D4580A",
    coverGradient: "linear-gradient(135deg, #2a0e04 0%, #6b2108 50%, #D4580A 100%)",
    chapters: 12,
    readChapters: 4,
  },
  {
    id: "gn2",
    title: "Whispers of Bamboo",
    subtitle: "Arashiyama chronicles",
    kanji: "竹の囁き",
    status: "available" as const,
    accentColor: "#4a7c59",
    coverGradient: "linear-gradient(135deg, #030d06 0%, #1a4028 50%, #4a7c59 100%)",
    chapters: 8,
    readChapters: 8,
  },
  {
    id: "gn3",
    title: "The Floating Shrine",
    subtitle: "Itsukushima at high tide",
    kanji: "浮かぶ社",
    status: "coming_soon" as const,
    accentColor: "#C23B22",
    coverGradient: "linear-gradient(135deg, #0d0502 0%, #481208 50%, #C23B22 100%)",
    chapters: 14,
    readChapters: 0,
  },
  {
    id: "gn4",
    title: "Crown of Snow",
    subtitle: "Mount Fuji — a pilgrim's ascent",
    kanji: "雪の冠",
    status: "coming_soon" as const,
    accentColor: "#4a6fa5",
    coverGradient: "linear-gradient(135deg, #020510 0%, #0d2040 50%, #4a6fa5 100%)",
    chapters: 10,
    readChapters: 0,
  },
  {
    id: "gn5",
    title: "Flower Blizzard",
    subtitle: "The cherry blossom season",
    kanji: "花吹雪",
    status: "coming_soon" as const,
    accentColor: "#d4789a",
    coverGradient: "linear-gradient(135deg, #0d0308 0%, #3d1228 50%, #d4789a 100%)",
    chapters: 9,
    readChapters: 0,
  },
  {
    id: "gn6",
    title: "The Fox Messenger",
    subtitle: "Kitsune legends of ancient Japan",
    kanji: "狐の使者",
    status: "coming_soon" as const,
    accentColor: "#c4862a",
    coverGradient: "linear-gradient(135deg, #0d0602 0%, #4a2208 50%, #c4862a 100%)",
    chapters: 11,
    readChapters: 0,
  },
];

// ── Sub-components ──

function SidebarNavItem({
  icon: Icon,
  label,
  active,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        width: "100%",
        padding: "10px 16px",
        borderRadius: 10,
        background: active ? "rgba(194,59,34,0.12)" : "transparent",
        border: active ? "1px solid rgba(194,59,34,0.22)" : "1px solid transparent",
        color: active ? "#f0ebe0" : "rgba(240,235,224,0.42)",
        fontSize: "11px",
        letterSpacing: "0.15em",
        fontFamily: "'DM Sans', sans-serif",
        cursor: "pointer",
        transition: "all 0.25s ease",
        textAlign: "left",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.background = "rgba(255,255,255,0.04)";
          e.currentTarget.style.color = "rgba(240,235,224,0.75)";
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "rgba(240,235,224,0.42)";
        }
      }}
    >
      <Icon size={14} strokeWidth={1.5} />
      {label}
      {active && <ChevronRight size={10} style={{ marginLeft: "auto", opacity: 0.5 }} />}
    </button>
  );
}

function ProgressRing({ progress, color, size = 44 }: { progress: number; color: string; size?: number }) {
  const r = (size - 6) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (progress / 100) * circumference;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={3} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={3}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s ease" }}
      />
    </svg>
  );
}

// ── Profile Tab ──
function ProfileTab() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "Yuki Tanaka",
    email: "yuki@example.com",
    location: "Tokyo, Japan",
    language: "English / 日本語",
    bio: "Passionate about Japanese culture, architecture, and the quiet beauty of transience.",
    interest: "Architecture · Zen · History",
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div style={{ maxWidth: 680 }}>
      {/* Header */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <h2 className="font-display" style={{ color: "#f0ebe0", fontSize: "1.8rem", fontWeight: 300, marginBottom: 4 }}>
            Personal Profile
          </h2>
          <p style={{ color: "rgba(240,235,224,0.38)", fontSize: "12px", fontFamily: "'DM Sans', sans-serif" }}>
            Your journey identity and preferences
          </p>
        </div>
        <button
          onClick={() => editing ? handleSave() : setEditing(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 20px",
            borderRadius: 100,
            background: editing ? "rgba(194,59,34,0.15)" : "rgba(255,255,255,0.05)",
            border: `1px solid ${editing ? "rgba(194,59,34,0.4)" : "rgba(255,255,255,0.1)"}`,
            color: editing ? "#f0ebe0" : "rgba(240,235,224,0.55)",
            fontSize: "10px",
            letterSpacing: "0.2em",
            fontFamily: "'DM Sans', sans-serif",
            cursor: "pointer",
            transition: "all 0.3s",
          }}
        >
          {editing ? <Check size={12} strokeWidth={1.5} /> : <Edit3 size={12} strokeWidth={1.5} />}
          {editing ? "SAVE CHANGES" : "EDIT PROFILE"}
        </button>
      </div>

      {/* Avatar + stats row */}
      <div className="flex items-center gap-8 mb-10">
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: "linear-gradient(135deg, rgba(194,59,34,0.3) 0%, rgba(61,90,122,0.3) 100%)",
            border: "2px solid rgba(194,59,34,0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span className="font-display" style={{ color: "#f0ebe0", fontSize: "2rem", fontWeight: 300 }}>
            {form.name.charAt(0)}
          </span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {[
            { label: "Worlds Visited", value: "3" },
            { label: "Lessons Complete", value: "1" },
            { label: "Hours Explored", value: "4.2" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-display" style={{ color: "#f0ebe0", fontSize: "1.5rem", fontWeight: 300 }}>
                {stat.value}
              </div>
              <div style={{ color: "rgba(240,235,224,0.35)", fontSize: "9px", letterSpacing: "0.2em", fontFamily: "'DM Sans', sans-serif" }}>
                {stat.label.toUpperCase()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Form fields */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        {[
          { label: "FULL NAME", field: "name", icon: User },
          { label: "EMAIL ADDRESS", field: "email", icon: Globe },
          { label: "LOCATION", field: "location", icon: MapPin },
          { label: "LANGUAGE", field: "language", icon: Globe },
        ].map(({ label, field, icon: Icon }) => (
          <div key={field}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "rgba(240,235,224,0.3)",
                fontSize: "9px",
                letterSpacing: "0.22em",
                fontFamily: "'DM Sans', sans-serif",
                marginBottom: 8,
              }}
            >
              <Icon size={9} strokeWidth={1.5} />
              {label}
            </div>
            {editing ? (
              <input
                value={form[field as keyof typeof form]}
                onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                style={{
                  width: "100%",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(194,59,34,0.35)",
                  color: "#f0ebe0",
                  padding: "10px 14px",
                  fontSize: "13px",
                  fontFamily: "'DM Sans', sans-serif",
                  borderRadius: 6,
                  outline: "none",
                }}
              />
            ) : (
              <div style={{ color: "#f0ebe0", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", padding: "10px 0" }}>
                {form[field as keyof typeof form]}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bio */}
      <div style={{ marginBottom: 16 }}>
        <div style={{ color: "rgba(240,235,224,0.3)", fontSize: "9px", letterSpacing: "0.22em", fontFamily: "'DM Sans', sans-serif", marginBottom: 8 }}>
          ABOUT
        </div>
        {editing ? (
          <textarea
            value={form.bio}
            onChange={(e) => setForm((f) => ({ ...f, bio: e.target.value }))}
            rows={3}
            style={{
              width: "100%",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(194,59,34,0.35)",
              color: "#f0ebe0",
              padding: "10px 14px",
              fontSize: "13px",
              fontFamily: "'DM Sans', sans-serif",
              borderRadius: 6,
              outline: "none",
              resize: "vertical",
            }}
          />
        ) : (
          <div style={{ color: "rgba(240,235,224,0.7)", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.7 }}>
            {form.bio}
          </div>
        )}
      </div>

      {/* Interests */}
      <div>
        <div style={{ color: "rgba(240,235,224,0.3)", fontSize: "9px", letterSpacing: "0.22em", fontFamily: "'DM Sans', sans-serif", marginBottom: 8 }}>
          CULTURAL INTERESTS
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {form.interest.split(" · ").map((tag) => (
            <span
              key={tag}
              style={{
                padding: "5px 14px",
                borderRadius: 100,
                background: "rgba(194,59,34,0.1)",
                border: "1px solid rgba(194,59,34,0.22)",
                color: "rgba(240,235,224,0.65)",
                fontSize: "10px",
                letterSpacing: "0.12em",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {saved && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            marginTop: 20,
            padding: "10px 18px",
            borderRadius: 8,
            background: "rgba(74,124,89,0.15)",
            border: "1px solid rgba(74,124,89,0.3)",
            color: "rgba(240,235,224,0.7)",
            fontSize: "11px",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          ✓ Profile updated successfully
        </motion.div>
      )}
    </div>
  );
}

// ── Lessons Tab ──
function LessonsTab() {
  const completed = LESSONS.filter((l) => l.status === "completed").length;
  const inProgress = LESSONS.filter((l) => l.status === "in_progress").length;

  return (
    <div style={{ maxWidth: 720 }}>
      {/* Stats row */}
      <div className="flex items-start justify-between mb-10">
        <div>
          <h2 className="font-display" style={{ color: "#f0ebe0", fontSize: "1.8rem", fontWeight: 300, marginBottom: 4 }}>
            My Lessons
          </h2>
          <p style={{ color: "rgba(240,235,224,0.38)", fontSize: "12px", fontFamily: "'DM Sans', sans-serif" }}>
            Track your cultural journey through each world
          </p>
        </div>
        <div style={{ display: "flex", gap: 20 }}>
          {[
            { label: "IN PROGRESS", value: inProgress, color: "#C23B22" },
            { label: "COMPLETED", value: completed, color: "#4a7c59" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ color: s.color, fontSize: "1.6rem", fontFamily: "'Crimson Pro', serif", fontWeight: 300 }}>{s.value}</div>
              <div style={{ color: "rgba(240,235,224,0.3)", fontSize: "8px", letterSpacing: "0.2em", fontFamily: "'DM Sans', sans-serif" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Lesson cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {LESSONS.map((lesson, i) => (
          <motion.div
            key={lesson.id}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "18px 22px",
              borderRadius: 12,
              background: lesson.status === "locked" ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${lesson.status === "locked" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.08)"}`,
              opacity: lesson.status === "locked" ? 0.5 : 1,
              transition: "all 0.3s ease",
              cursor: lesson.status === "locked" ? "not-allowed" : "pointer",
            }}
            onMouseEnter={(e) => {
              if (lesson.status !== "locked") {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.borderColor = `${lesson.accentColor}40`;
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = lesson.status === "locked" ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.04)";
              (e.currentTarget as HTMLElement).style.borderColor = lesson.status === "locked" ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.08)";
            }}
          >
            {/* Progress ring */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <ProgressRing progress={lesson.progress} color={lesson.accentColor} size={48} />
              {lesson.status === "locked" && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Lock size={14} style={{ color: "rgba(240,235,224,0.3)" }} strokeWidth={1.5} />
                </div>
              )}
              {lesson.status !== "locked" && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ color: lesson.accentColor, fontSize: "9px", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>
                    {lesson.progress}%
                  </span>
                </div>
              )}
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="font-japanese"
                  style={{ color: "rgba(240,235,224,0.3)", fontSize: "11px", letterSpacing: "0.15em" }}
                >
                  {lesson.kanji}
                </span>
                <div style={{ width: 1, height: 10, background: "rgba(255,255,255,0.1)" }} />
                <span style={{ color: "rgba(240,235,224,0.35)", fontSize: "9px", letterSpacing: "0.18em", fontFamily: "'DM Sans', sans-serif" }}>
                  {lesson.world.toUpperCase()}
                </span>
              </div>
              <div style={{ color: "#f0ebe0", fontSize: "14px", fontFamily: "'Crimson Pro', serif", fontWeight: 400, marginBottom: 4 }}>
                {lesson.module}
              </div>
              <div style={{ display: "flex", gap: 14 }}>
                {[
                  { icon: BookMarked, text: `${lesson.completedChapters}/${lesson.chapters} chapters` },
                  { icon: Clock, text: lesson.duration },
                  { icon: TrendingUp, text: lesson.lastAccessed },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: 4, color: "rgba(240,235,224,0.3)", fontSize: "10px", fontFamily: "'DM Sans', sans-serif" }}>
                    <Icon size={9} strokeWidth={1.5} />
                    {text}
                  </div>
                ))}
              </div>
            </div>

            {/* Status badge */}
            <div style={{ flexShrink: 0 }}>
              {lesson.status === "completed" && (
                <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 100, background: "rgba(74,124,89,0.15)", border: "1px solid rgba(74,124,89,0.3)", color: "#4a7c59", fontSize: "9px", letterSpacing: "0.18em", fontFamily: "'DM Sans', sans-serif" }}>
                  <Award size={9} strokeWidth={1.5} />
                  COMPLETE
                </div>
              )}
              {lesson.status === "in_progress" && (
                <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 100, background: `${lesson.accentColor}18`, border: `1px solid ${lesson.accentColor}40`, color: lesson.accentColor, fontSize: "9px", letterSpacing: "0.18em", fontFamily: "'DM Sans', sans-serif" }}>
                  <Play size={9} strokeWidth={1.5} />
                  CONTINUE
                </div>
              )}
              {lesson.status === "locked" && (
                <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 100, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(240,235,224,0.25)", fontSize: "9px", letterSpacing: "0.18em", fontFamily: "'DM Sans', sans-serif" }}>
                  <Lock size={9} strokeWidth={1.5} />
                  LOCKED
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Library Tab ──
function LibraryTab() {
  const [reading, setReading] = useState<string | null>(null);

  return (
    <div style={{ maxWidth: 780 }}>
      <div className="flex items-start justify-between mb-10">
        <div>
          <h2 className="font-display" style={{ color: "#f0ebe0", fontSize: "1.8rem", fontWeight: 300, marginBottom: 4 }}>
            Graphic Novel Library
          </h2>
          <p style={{ color: "rgba(240,235,224,0.38)", fontSize: "12px", fontFamily: "'DM Sans', sans-serif" }}>
            Illustrated cultural stories — read when you explore
          </p>
        </div>
        <div style={{ padding: "5px 14px", borderRadius: 100, background: "rgba(194,59,34,0.1)", border: "1px solid rgba(194,59,34,0.2)", color: "rgba(194,59,34,0.8)", fontSize: "9px", letterSpacing: "0.2em", fontFamily: "'DM Sans', sans-serif" }}>
          MORE COMING SOON
        </div>
      </div>

      {/* Reader placeholder modal */}
      <AnimatePresence>
        {reading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(5,4,8,0.96)",
              backdropFilter: "blur(20px)",
              zIndex: 200,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => setReading(null)}
              style={{
                position: "absolute",
                top: 28,
                left: 28,
                display: "flex",
                alignItems: "center",
                gap: 8,
                color: "rgba(240,235,224,0.5)",
                fontSize: "10px",
                letterSpacing: "0.2em",
                fontFamily: "'DM Sans', sans-serif",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <ArrowLeft size={12} strokeWidth={1.5} />
              BACK TO LIBRARY
            </button>

            {/* Reader content area */}
            <div
              style={{
                width: "min(840px, 90vw)",
                height: "70vh",
                borderRadius: 16,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 20,
              }}
            >
              <div className="font-japanese" style={{ color: "rgba(240,235,224,0.15)", fontSize: "4rem" }}>
                {GRAPHIC_NOVELS.find(g => g.id === reading)?.kanji}
              </div>
              <div className="font-display" style={{ color: "rgba(240,235,224,0.6)", fontSize: "1.4rem", fontWeight: 300 }}>
                {GRAPHIC_NOVELS.find(g => g.id === reading)?.title}
              </div>
              <div
                style={{
                  padding: "8px 20px",
                  borderRadius: 100,
                  background: "rgba(194,59,34,0.1)",
                  border: "1px solid rgba(194,59,34,0.25)",
                  color: "rgba(194,59,34,0.7)",
                  fontSize: "9px",
                  letterSpacing: "0.25em",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                READER RENDERING IN PROGRESS
              </div>
              <p style={{ color: "rgba(240,235,224,0.25)", fontSize: "11px", fontFamily: "'DM Sans', sans-serif", textAlign: "center", maxWidth: 300, lineHeight: 1.7 }}>
                The graphic novel reader is being illustrated by our artists. This placeholder marks where content will appear.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Novel grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {GRAPHIC_NOVELS.map((novel, i) => (
          <motion.div
            key={novel.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.5 }}
            onClick={() => novel.status === "available" && setReading(novel.id)}
            style={{
              borderRadius: 12,
              overflow: "hidden",
              background: novel.coverGradient,
              border: `1px solid ${novel.accentColor}22`,
              cursor: novel.status === "available" ? "pointer" : "default",
              transition: "all 0.35s ease",
              position: "relative",
            }}
            onMouseEnter={(e) => {
              if (novel.status === "available") {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px rgba(0,0,0,0.4), 0 0 20px ${novel.accentColor}30`;
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            {/* Cover art placeholder */}
            <div style={{ height: 180, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(ellipse at 50% 40%, ${novel.accentColor}30 0%, transparent 70%)`,
                }}
              />
              <span className="font-japanese" style={{ color: "rgba(255,255,255,0.15)", fontSize: "3rem", position: "relative" }}>
                {novel.kanji}
              </span>

              {novel.status === "coming_soon" && (
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    padding: "4px 10px",
                    borderRadius: 100,
                    background: "rgba(5,4,8,0.7)",
                    backdropFilter: "blur(8px)",
                    color: "rgba(240,235,224,0.55)",
                    fontSize: "8px",
                    letterSpacing: "0.2em",
                    fontFamily: "'DM Sans', sans-serif",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  COMING SOON
                </div>
              )}

              {novel.status === "available" && novel.readChapters === novel.chapters && (
                <div
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    padding: "4px 10px",
                    borderRadius: 100,
                    background: "rgba(74,124,89,0.3)",
                    color: "#4a7c59",
                    fontSize: "8px",
                    letterSpacing: "0.2em",
                    fontFamily: "'DM Sans', sans-serif",
                    border: "1px solid rgba(74,124,89,0.4)",
                  }}
                >
                  READ
                </div>
              )}
            </div>

            {/* Meta */}
            <div style={{ padding: "14px 16px 16px" }}>
              <div style={{ color: "#f0ebe0", fontSize: "14px", fontFamily: "'Crimson Pro', serif", fontWeight: 400, marginBottom: 4 }}>
                {novel.title}
              </div>
              <div style={{ color: "rgba(240,235,224,0.4)", fontSize: "10px", fontFamily: "'DM Sans', sans-serif", marginBottom: 8 }}>
                {novel.subtitle}
              </div>

              {/* Progress bar (only for available) */}
              {novel.status === "available" && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", color: "rgba(240,235,224,0.28)", fontSize: "8px", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.15em", marginBottom: 5 }}>
                    <span>{novel.readChapters}/{novel.chapters} CHAPTERS</span>
                    <span style={{ color: novel.accentColor }}>{Math.round((novel.readChapters / novel.chapters) * 100)}%</span>
                  </div>
                  <div style={{ height: 2, background: "rgba(255,255,255,0.06)", borderRadius: 1 }}>
                    <div
                      style={{
                        height: "100%",
                        width: `${(novel.readChapters / novel.chapters) * 100}%`,
                        background: novel.accentColor,
                        borderRadius: 1,
                        transition: "width 0.8s ease",
                      }}
                    />
                  </div>
                </div>
              )}

              {novel.status === "coming_soon" && (
                <div style={{ display: "flex", alignItems: "center", gap: 5, color: "rgba(240,235,224,0.2)", fontSize: "9px", fontFamily: "'DM Sans', sans-serif" }}>
                  <Clock size={9} strokeWidth={1.5} />
                  {novel.chapters} chapters in production
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Settings Tab ──
function SettingsTab() {
  const [notifications, setNotifications] = useState(true);
  const [autoplay, setAutoplay] = useState(false);
  const [theme, setTheme] = useState("dark");

  const Toggle = ({ on, onToggle }: { on: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      style={{
        width: 40,
        height: 22,
        borderRadius: 11,
        background: on ? "rgba(194,59,34,0.6)" : "rgba(255,255,255,0.08)",
        border: `1px solid ${on ? "rgba(194,59,34,0.5)" : "rgba(255,255,255,0.1)"}`,
        position: "relative",
        cursor: "pointer",
        transition: "all 0.3s ease",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 2,
          left: on ? 20 : 2,
          width: 16,
          height: 16,
          borderRadius: "50%",
          background: on ? "#f0ebe0" : "rgba(240,235,224,0.3)",
          transition: "left 0.25s ease",
        }}
      />
    </button>
  );

  return (
    <div style={{ maxWidth: 520 }}>
      <div className="mb-10">
        <h2 className="font-display" style={{ color: "#f0ebe0", fontSize: "1.8rem", fontWeight: 300, marginBottom: 4 }}>
          Preferences
        </h2>
        <p style={{ color: "rgba(240,235,224,0.38)", fontSize: "12px", fontFamily: "'DM Sans', sans-serif" }}>
          Manage your experience settings
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {[
          { label: "Journey Notifications", description: "Get notified when new worlds unlock", value: notifications, toggle: () => setNotifications((v) => !v) },
          { label: "Autoplay Ambient Sound", description: "Start ambient audio on scene enter", value: autoplay, toggle: () => setAutoplay((v) => !v) },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "18px 20px",
              borderRadius: 10,
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div>
              <div style={{ color: "#f0ebe0", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", marginBottom: 3 }}>{s.label}</div>
              <div style={{ color: "rgba(240,235,224,0.35)", fontSize: "11px", fontFamily: "'DM Sans', sans-serif" }}>{s.description}</div>
            </div>
            <Toggle on={s.value} onToggle={s.toggle} />
          </div>
        ))}

        <div
          style={{
            padding: "18px 20px",
            borderRadius: 10,
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.06)",
            marginTop: 4,
          }}
        >
          <div style={{ color: "#f0ebe0", fontSize: "13px", fontFamily: "'DM Sans', sans-serif", marginBottom: 12 }}>Interface Theme</div>
          <div style={{ display: "flex", gap: 8 }}>
            {["dark", "night", "dawn"].map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                style={{
                  padding: "6px 18px",
                  borderRadius: 100,
                  background: theme === t ? "rgba(194,59,34,0.15)" : "transparent",
                  border: `1px solid ${theme === t ? "rgba(194,59,34,0.4)" : "rgba(255,255,255,0.08)"}`,
                  color: theme === t ? "#f0ebe0" : "rgba(240,235,224,0.38)",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  fontFamily: "'DM Sans', sans-serif",
                  cursor: "pointer",
                  transition: "all 0.25s",
                  textTransform: "uppercase",
                }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Danger zone */}
        <div
          style={{
            padding: "18px 20px",
            borderRadius: 10,
            background: "rgba(212,24,61,0.04)",
            border: "1px solid rgba(212,24,61,0.1)",
            marginTop: 16,
          }}
        >
          <div style={{ color: "rgba(240,235,224,0.5)", fontSize: "11px", letterSpacing: "0.2em", fontFamily: "'DM Sans', sans-serif", marginBottom: 10 }}>
            ACCOUNT
          </div>
          <button
            style={{
              padding: "8px 20px",
              borderRadius: 6,
              background: "transparent",
              border: "1px solid rgba(212,24,61,0.25)",
              color: "rgba(212,24,61,0.65)",
              fontSize: "10px",
              letterSpacing: "0.18em",
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
              transition: "all 0.25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(212,24,61,0.08)";
              e.currentTarget.style.color = "rgba(212,24,61,0.9)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "rgba(212,24,61,0.65)";
            }}
          >
            SIGN OUT
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main Dashboard ──
export function DashboardPage({ onBackToJourney }: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState<Tab>("profile");

  const NAV_ITEMS: { id: Tab; icon: React.ElementType; label: string }[] = [
    { id: "profile", icon: User, label: "Profile" },
    { id: "lessons", icon: BookOpen, label: "My Lessons" },
    { id: "library", icon: Library, label: "Novel Library" },
    { id: "settings", icon: Settings, label: "Settings" },
  ];

  const content: Record<Tab, React.ReactNode> = {
    profile: <ProfileTab />,
    lessons: <LessonsTab />,
    library: <LibraryTab />,
    settings: <SettingsTab />,
  };

  return (
    <motion.div
      className="fixed inset-0 flex overflow-hidden"
      style={{ background: "#060408" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
    >
      {/* Ambient background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 15% 20%, rgba(194,59,34,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 85% 80%, rgba(61,90,122,0.06) 0%, transparent 60%)",
        }}
      />

      {/* ── SIDEBAR ── */}
      <div
        style={{
          width: 240,
          flexShrink: 0,
          borderRight: "1px solid rgba(240,235,224,0.06)",
          display: "flex",
          flexDirection: "column",
          padding: "32px 16px",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: 32, paddingLeft: 16 }}>
          <div className="font-japanese" style={{ color: "rgba(240,235,224,0.22)", fontSize: "11px", letterSpacing: "0.2em", marginBottom: 2 }}>
            日本の旅
          </div>
          <div style={{ color: "rgba(240,235,224,0.45)", fontSize: "8px", letterSpacing: "0.28em", fontFamily: "'DM Sans', sans-serif" }}>
            JOURNEY THROUGH JAPAN
          </div>
        </div>

        {/* Avatar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28, paddingLeft: 8 }}>
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(194,59,34,0.3) 0%, rgba(61,90,122,0.3) 100%)",
              border: "1px solid rgba(194,59,34,0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <span className="font-display" style={{ color: "#f0ebe0", fontSize: "1.1rem", fontWeight: 300 }}>Y</span>
          </div>
          <div>
            <div style={{ color: "#f0ebe0", fontSize: "12px", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>Yuki Tanaka</div>
            <div style={{ color: "rgba(240,235,224,0.3)", fontSize: "9px", letterSpacing: "0.15em", fontFamily: "'DM Sans', sans-serif" }}>EXPLORER</div>
          </div>
        </div>

        {/* Hairline */}
        <div style={{ height: 1, background: "rgba(240,235,224,0.06)", marginBottom: 20 }} />

        {/* Nav */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4, flex: 1 }}>
          {NAV_ITEMS.map((item) => (
            <SidebarNavItem
              key={item.id}
              icon={item.icon}
              label={item.label}
              active={activeTab === item.id}
              onClick={() => setActiveTab(item.id)}
            />
          ))}
        </div>

        {/* Back to experience */}
        <div style={{ marginTop: "auto" }}>
          <div style={{ height: 1, background: "rgba(240,235,224,0.06)", marginBottom: 16 }} />
          <button
            onClick={onBackToJourney}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              width: "100%",
              padding: "10px 16px",
              borderRadius: 10,
              background: "transparent",
              border: "1px solid transparent",
              color: "rgba(240,235,224,0.3)",
              fontSize: "10px",
              letterSpacing: "0.18em",
              fontFamily: "'DM Sans', sans-serif",
              cursor: "pointer",
              transition: "all 0.25s ease",
              textAlign: "left",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "rgba(240,235,224,0.65)";
              e.currentTarget.style.background = "rgba(255,255,255,0.03)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "rgba(240,235,224,0.3)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            <ArrowLeft size={12} strokeWidth={1.5} />
            BACK TO JOURNEY
          </button>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          padding: "48px 52px",
          position: "relative",
          zIndex: 10,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
          >
            {content[activeTab]}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
