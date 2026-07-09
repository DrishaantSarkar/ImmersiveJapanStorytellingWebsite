import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";

interface AuthPageProps {
  onBack: () => void;
  onSuccess: () => void;
}

type View = "login" | "register";

export function AuthPage({ onBack, onSuccess }: AuthPageProps) {
  const [view, setView] = useState<View>("login");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({ name: "", email: "", password: "", confirm: "" });

  return (
    <motion.div
      className="fixed inset-0 flex overflow-hidden"
      style={{ background: "#060408" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.1 }}
    >
      {/* ── LEFT: Immersive Visual Panel ── */}
      <div
        className="relative hidden lg:flex flex-col justify-end"
        style={{ width: "52%", flexShrink: 0 }}
      >
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1768822355227-e2150cdd3276?w=1200&h=900&fit=crop&auto=format&q=85"
          alt="Itsukushima Shrine torii gate"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />

        {/* Dark cinematic overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(6,4,8,0.92) 0%, rgba(6,4,8,0.35) 45%, rgba(6,4,8,0.6) 100%)",
          }}
        />

        {/* Vignette sides */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(6,4,8,0.65) 100%)",
          }}
        />

        {/* Left brand mark */}
        <div
          className="absolute top-10 left-10"
          style={{ zIndex: 10 }}
        >
          <button
            onClick={onBack}
            style={{
              color: "rgba(240,235,224,0.3)",
              fontSize: "9px",
              letterSpacing: "0.3em",
              fontFamily: "'DM Sans', sans-serif",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              gap: 4,
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(240,235,224,0.65)")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(240,235,224,0.3)")}
          >
            <span className="font-japanese" style={{ fontSize: "14px", letterSpacing: "0.2em" }}>日本</span>
            ← BACK
          </button>
        </div>

        {/* Bottom text */}
        <div className="relative p-14 pb-16" style={{ zIndex: 10 }}>
          <div style={{ width: 24, height: 1, background: "rgba(194,59,34,0.55)", marginBottom: 20 }} />
          <p
            className="font-japanese"
            style={{ color: "rgba(240,235,224,0.22)", fontSize: "13px", letterSpacing: "0.2em", marginBottom: 10 }}
          >
            厳島神社
          </p>
          <h2
            className="font-display"
            style={{ color: "rgba(240,235,224,0.85)", fontSize: "1.8rem", fontWeight: 300, lineHeight: 1.2, marginBottom: 12 }}
          >
            Begin Your Journey
          </h2>
          <p
            style={{
              color: "rgba(240,235,224,0.38)",
              fontSize: "12px",
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1.7,
              fontWeight: 300,
              maxWidth: 340,
            }}
          >
            Your account unlocks full access to every world, exclusive cultural archives, and future experiences as they are released.
          </p>
        </div>
      </div>

      {/* Vertical divider */}
      <div
        className="hidden lg:block"
        style={{ width: "1px", background: "rgba(240,235,224,0.06)", flexShrink: 0 }}
      />

      {/* ── RIGHT: Auth Panel ── */}
      <div
        className="flex flex-col justify-center flex-1 overflow-y-auto px-10 sm:px-16"
        style={{ background: "#06040a", minWidth: 0 }}
      >
        {/* Mobile back button */}
        <button
          onClick={onBack}
          className="lg:hidden mb-10 self-start"
          style={{
            color: "rgba(240,235,224,0.3)",
            fontSize: "9px",
            letterSpacing: "0.3em",
            fontFamily: "'DM Sans', sans-serif",
            background: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          ← BACK
        </button>

        <div style={{ maxWidth: 400, width: "100%", margin: "0 auto" }}>
          {/* View switcher tabs */}
          <div className="flex gap-8 mb-12">
            {(["login", "register"] as View[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  color: view === v ? "#f0ebe0" : "rgba(240,235,224,0.28)",
                  fontSize: "9px",
                  letterSpacing: "0.32em",
                  fontFamily: "'DM Sans', sans-serif",
                  background: "transparent",
                  border: "none",
                  borderBottom: view === v ? "1px solid rgba(194,59,34,0.65)" : "1px solid transparent",
                  paddingBottom: "8px",
                  cursor: "pointer",
                  transition: "color 0.3s",
                }}
              >
                {v === "login" ? "SIGN IN" : "REGISTER"}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {view === "login" ? (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                transition={{ duration: 0.4 }}
              >
                <h1
                  className="font-display"
                  style={{ color: "#f0ebe0", fontSize: "2.2rem", fontWeight: 300, marginBottom: 6 }}
                >
                  Welcome Back
                </h1>
                <p
                  style={{
                    color: "rgba(240,235,224,0.38)",
                    fontSize: "13px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontStyle: "italic",
                    marginBottom: 36,
                    fontWeight: 300,
                  }}
                >
                  Continue Your Journey
                </p>

                <form
                  className="flex flex-col gap-4"
                  onSubmit={(e) => { e.preventDefault(); onSuccess(); }}
                >
                  <AuthInput
                    type="email"
                    placeholder="Email Address"
                    value={loginForm.email}
                    onChange={(v) => setLoginForm((p) => ({ ...p, email: v }))}
                  />
                  <div className="relative">
                    <AuthInput
                      type={showPass ? "text" : "password"}
                      placeholder="Password"
                      value={loginForm.password}
                      onChange={(v) => setLoginForm((p) => ({ ...p, password: v }))}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((s) => !s)}
                      style={{
                        position: "absolute",
                        right: 16,
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "rgba(240,235,224,0.3)",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {showPass ? <EyeOff size={14} strokeWidth={1.5} /> : <Eye size={14} strokeWidth={1.5} />}
                    </button>
                  </div>

                  <div className="flex justify-end mt-1 mb-2">
                    <button
                      type="button"
                      style={{ color: "rgba(240,235,224,0.3)", fontSize: "10px", letterSpacing: "0.15em", fontFamily: "'DM Sans', sans-serif", background: "transparent", border: "none", cursor: "pointer", transition: "color 0.3s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(240,235,224,0.6)")}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(240,235,224,0.3)")}
                    >
                      FORGOT PASSWORD
                    </button>
                  </div>

                  <AuthPrimaryButton label="LOGIN" />
                  <GoogleButton />
                </form>

                <p
                  className="mt-8 text-center"
                  style={{ color: "rgba(240,235,224,0.28)", fontSize: "10px", letterSpacing: "0.15em", fontFamily: "'DM Sans', sans-serif" }}
                >
                  New here?{" "}
                  <button
                    onClick={() => setView("register")}
                    style={{ color: "rgba(194,59,34,0.8)", background: "transparent", border: "none", cursor: "pointer", letterSpacing: "0.15em", fontSize: "10px", transition: "color 0.3s" }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "#C23B22")}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLButtonElement).style.color = "rgba(194,59,34,0.8)")}
                  >
                    CREATE ACCOUNT
                  </button>
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.4 }}
              >
                <h1
                  className="font-display"
                  style={{ color: "#f0ebe0", fontSize: "2.2rem", fontWeight: 300, marginBottom: 6 }}
                >
                  Begin Your Journey
                </h1>
                <p
                  style={{
                    color: "rgba(240,235,224,0.38)",
                    fontSize: "13px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontStyle: "italic",
                    marginBottom: 36,
                    fontWeight: 300,
                  }}
                >
                  Create your account and unlock future experiences.
                </p>

                <form
                  className="flex flex-col gap-4"
                  onSubmit={(e) => { e.preventDefault(); onSuccess(); }}
                >
                  <AuthInput
                    type="text"
                    placeholder="Full Name"
                    value={registerForm.name}
                    onChange={(v) => setRegisterForm((p) => ({ ...p, name: v }))}
                  />
                  <AuthInput
                    type="email"
                    placeholder="Email Address"
                    value={registerForm.email}
                    onChange={(v) => setRegisterForm((p) => ({ ...p, email: v }))}
                  />
                  <div className="relative">
                    <AuthInput
                      type={showPass ? "text" : "password"}
                      placeholder="Password"
                      value={registerForm.password}
                      onChange={(v) => setRegisterForm((p) => ({ ...p, password: v }))}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass((s) => !s)}
                      style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(240,235,224,0.3)", background: "transparent", border: "none", cursor: "pointer" }}
                    >
                      {showPass ? <EyeOff size={14} strokeWidth={1.5} /> : <Eye size={14} strokeWidth={1.5} />}
                    </button>
                  </div>
                  <div className="relative">
                    <AuthInput
                      type={showConfirm ? "text" : "password"}
                      placeholder="Confirm Password"
                      value={registerForm.confirm}
                      onChange={(v) => setRegisterForm((p) => ({ ...p, confirm: v }))}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirm((s) => !s)}
                      style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", color: "rgba(240,235,224,0.3)", background: "transparent", border: "none", cursor: "pointer" }}
                    >
                      {showConfirm ? <EyeOff size={14} strokeWidth={1.5} /> : <Eye size={14} strokeWidth={1.5} />}
                    </button>
                  </div>
                  <div style={{ height: 4 }} />
                  <AuthPrimaryButton label="CREATE ACCOUNT" />
                  <GoogleButton />
                </form>

                <p
                  className="mt-8 text-center"
                  style={{ color: "rgba(240,235,224,0.28)", fontSize: "10px", letterSpacing: "0.15em", fontFamily: "'DM Sans', sans-serif" }}
                >
                  Already have an account?{" "}
                  <button
                    onClick={() => setView("login")}
                    style={{ color: "rgba(194,59,34,0.8)", background: "transparent", border: "none", cursor: "pointer", letterSpacing: "0.15em", fontSize: "10px", transition: "color 0.3s" }}
                  >
                    SIGN IN
                  </button>
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function AuthInput({
  type,
  placeholder,
  value,
  onChange,
}: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: "100%",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(240,235,224,0.1)",
        color: "#f0ebe0",
        padding: "14px 18px",
        fontSize: "13px",
        fontFamily: "'DM Sans', sans-serif",
        letterSpacing: "0.04em",
        outline: "none",
        transition: "border-color 0.3s",
      }}
      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(194,59,34,0.5)")}
      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(240,235,224,0.1)")}
    />
  );
}

function AuthPrimaryButton({ label }: { label: string }) {
  return (
    <button
      type="submit"
      className="flex items-center justify-center gap-3 mt-2"
      style={{
        width: "100%",
        background: "rgba(194,59,34,0.12)",
        border: "1px solid rgba(194,59,34,0.5)",
        color: "#f0ebe0",
        padding: "14px 24px",
        fontSize: "10px",
        letterSpacing: "0.28em",
        fontFamily: "'DM Sans', sans-serif",
        cursor: "pointer",
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
      {label}
      <ArrowRight size={12} strokeWidth={1.5} />
    </button>
  );
}

function GoogleButton() {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-3"
      style={{
        width: "100%",
        background: "transparent",
        border: "1px solid rgba(240,235,224,0.1)",
        color: "rgba(240,235,224,0.55)",
        padding: "13px 24px",
        fontSize: "10px",
        letterSpacing: "0.22em",
        fontFamily: "'DM Sans', sans-serif",
        cursor: "pointer",
        transition: "all 0.35s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(240,235,224,0.28)";
        e.currentTarget.style.color = "rgba(240,235,224,0.8)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(240,235,224,0.1)";
        e.currentTarget.style.color = "rgba(240,235,224,0.55)";
      }}
    >
      {/* Google 'G' mark */}
      <svg width="14" height="14" viewBox="0 0 18 18" fill="none">
        <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="currentColor" opacity="0.6"/>
        <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.909-2.258c-.806.54-1.837.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="currentColor" opacity="0.5"/>
        <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="currentColor" opacity="0.45"/>
        <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.96L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z" fill="currentColor" opacity="0.55"/>
      </svg>
      CONTINUE WITH GOOGLE
    </button>
  );
}
