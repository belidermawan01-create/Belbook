import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaHourglassEnd, FaLock, FaUser } from "react-icons/fa";
import { GoEyeClosed } from "react-icons/go";
import Logo from "../../assets/Logooo.png";
import { IoIosWarning } from "react-icons/io";

const T = {
  cream:    "#F5EFE0",
  gold:     "#C9A84C",
  goldLt:   "#E8C96A",
  dark:     "#0E0B07",
  darkMid:  "#1A1410",
  darkCard: "#221C14",
  green:    "#1E4D2B",
  muted:    "#8A7D68",
  error:    "#E07070",
  serif:    "'Cormorant Garamond', Georgia, serif",
  sans:     "'DM Sans', sans-serif",
};

const FloatingSpine = ({ color, height, left, top, delay, tilt }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    style={{
      position: "absolute", left, top,
      width: 22, height,
      background: color,
      borderRadius: "3px 3px 2px 2px",
      transform: `rotate(${tilt}deg)`,
      transformOrigin: "bottom center",
      boxShadow: "3px 0 10px rgba(0,0,0,0.5), inset -2px 0 6px rgba(0,0,0,0.3)",
      pointerEvents: "none",
    }}
  >
    <div style={{
      position: "absolute", left: 3, top: 0, bottom: 0,
      width: 1.5, background: "rgba(255,255,255,0.07)",
    }} />
  </motion.div>
);

/* ── Dust mote ── */
const Dust = ({ x, y, size, delay }) => (
  <motion.div
    style={{
      position: "absolute", left: `${x}%`, top: `${y}%`,
      width: size, height: size, borderRadius: "50%",
      background: T.gold, pointerEvents: "none",
    }}
    animate={{ y: [0, -35, 0], opacity: [0, 0.28, 0], x: [0, 7, -3, 0] }}
    transition={{ duration: 7 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

export default function Login() {
  const [username,  setUsername]  = useState("");
  const [password,  setPassword]  = useState("");
  const [showPass,  setShowPass]  = useState(false);
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState("");
  const [focusedField, setFocusedField] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        navigate(decoded.role === "user" ? "/home" : "/dashboard", { replace: true });
      } catch (_) {}
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post("https://petikbook.petik.or.id/api/login", { username, password });
      const token    = response.data.data.token;
      const decoded  = jwtDecode(token);
      localStorage.setItem("token", token);
      navigate(decoded.role === "user" ? "/home" : "/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Username atau password salah.");
    } finally {
      setLoading(false);
    }
  };

  const spines = [
    { color: T.green,   height: 140, left: "8%",  top: "55%", delay: 0.4, tilt: -8  },
    { color: "#3B2A1A", height: 160, left: "12%", top: "48%", delay: 0.55, tilt: -4 },
    { color: "#1C2E4A", height: 120, left: "16%", top: "58%", delay: 0.7,  tilt: -6 },
    { color: "#4A1C1C", height: 150, left: "20%", top: "52%", delay: 0.85, tilt: -3 },
    { color: "#2C2A1A", height: 130, left: "24%", top: "56%", delay: 1.0,  tilt: -7 },
    { color: "#1A3040", height: 165, left: "76%", top: "50%", delay: 0.5,  tilt:  5 },
    { color: "#2E1A3A", height: 135, left: "80%", top: "56%", delay: 0.65, tilt:  8 },
    { color: "#1A2C20", height: 155, left: "84%", top: "52%", delay: 0.8,  tilt:  3 },
    { color: "#3A2A10", height: 125, left: "88%", top: "58%", delay: 0.95, tilt:  6 },
  ];

  const dusts = Array.from({ length: 10 }, (_, i) => ({
    x: (i * 41 + 13) % 100, y: (i * 57 + 9) % 100,
    size: (i % 3) + 1.2, delay: i * 0.7,
  }));

  return (
    <div style={{
      minHeight: "100vh",
      background: T.dark,
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      fontFamily: T.sans,
    }}>

      <div style={{
        position: "absolute", inset: 0,
        backgroundImage:
          `linear-gradient(rgba(201,168,76,0.035) 1px, transparent 1px),
           linear-gradient(90deg, rgba(201,168,76,0.035) 1px, transparent 1px)`,
        backgroundSize: "80px 80px",
        pointerEvents: "none",
      }} />

      <div style={{
        position: "absolute", inset: 0,
        background:
          `radial-gradient(ellipse 50% 60% at 50% 50%, rgba(30,77,43,0.18) 0%, transparent 70%),
           radial-gradient(ellipse 30% 40% at 20% 20%, rgba(201,168,76,0.06) 0%, transparent 60%)`,
        pointerEvents: "none",
      }} />

      {dusts.map((d, i) => <Dust key={i} {...d} />)}

      {spines.map((s, i) => <FloatingSpine key={i} {...s} />)}

      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "absolute", bottom: "22%", left: "5%", right: "5%",
          height: 12,
          background: "linear-gradient(180deg, #3A2E1E 0%, #2A200E 100%)",
          borderRadius: 4,
          boxShadow: "0 8px 30px rgba(0,0,0,0.7)",
          pointerEvents: "none",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position:     "relative",
          zIndex:       10,
          width:        "100%",
          maxWidth:     440,
          margin:       "0 clamp(16px, 5vw, 40px)",
          background:   T.darkCard,
          border:       "1px solid rgba(201,168,76,0.15)",
          borderRadius: 24,
          padding:      "52px 48px 44px",
          boxShadow:    "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.05)",
          overflow:     "hidden",
        }}
      >
        <div style={{
          position: "absolute", top: -1, left: "20%", right: "20%",
          height: 2,
          background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)`,
        }} />
        <div style={{
          position: "absolute", top: 0, left: "10%", right: "10%",
          height: 80,
          background: `radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.1), transparent)`,
          pointerEvents: "none",
        }} />

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          style={{ textAlign: "center", marginBottom: 36 }}
        >
          <div style={{
            width: 52, height: 52,
            borderRadius: 12,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, margin: "0 auto 16px",
            boxShadow: `0 4px 20px rgba(201,168,76,0.3)`,
          }}>
            <img style={{width:"65px"}} src={Logo} alt="" />
          </div>

          <div style={{ overflow: "hidden", marginBottom: 4 }}>
            <motion.p
              initial={{ y: "100%" }} animate={{ y: 0 }}
              transition={{ delay: 0.55, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: T.sans, fontSize: 11,
                letterSpacing: "0.25em", color: T.gold,
                margin: 0, textTransform: "uppercase",
              }}
            >Selamat Datang di</motion.p>
          </div>

          <div style={{ overflow: "hidden" }}>
            <motion.h1
              initial={{ y: "100%" }} animate={{ y: 0 }}
              transition={{ delay: 0.65, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                fontFamily: T.serif, fontWeight: 600,
                fontSize: "2.6rem", color: T.cream,
                margin: 0, letterSpacing: "-0.01em", lineHeight: 1,
              }}
            >
              Bel<span style={{ fontStyle: "italic", color: T.gold }}>book</span>
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.85 }}
            style={{
              fontFamily: T.sans, fontSize: 12,
              color: T.muted, margin: "8px 0 0",
              letterSpacing: "0.03em", fontWeight: 300,
            }}
          >
            Perpustakaan Digital by Beli Dermawan
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          style={{
            height: 1, marginBottom: 32,
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
          }}
        />

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.95 }}
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: 20 }}
        >
          <div>
            <label style={{
              display: "block",
              fontFamily: T.sans, fontSize: 11,
              letterSpacing: "0.15em", color: T.muted,
              textTransform: "uppercase", marginBottom: 8, fontWeight: 500,
            }}>
              Username
            </label>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute", left: 16, top: "50%",
                transform: "translateY(-50%)",
                fontSize: 14, pointerEvents: "none",
                color: focusedField === "username" ? T.gold : T.muted,
                transition: "color 0.25s",
              }}><FaUser /></span>
              <input
                type="text"
                placeholder="Masukkan username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onFocus={() => setFocusedField("username")}
                onBlur={() => setFocusedField(null)}
                required autoFocus
                style={{
                  width: "100%",
                  background: "rgba(201,168,76,0.04)",
                  border: `1px solid ${focusedField === "username"
                    ? "rgba(201,168,76,0.5)"
                    : "rgba(201,168,76,0.15)"}`,
                  borderRadius: 12,
                  padding: "13px 16px 13px 44px",
                  color: T.cream,
                  fontFamily: T.sans,
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.25s ease, background 0.25s ease",
                }}
              />
            </div>
          </div>

          <div>
            <label style={{
              display: "block",
              fontFamily: T.sans, fontSize: 11,
              letterSpacing: "0.15em", color: T.muted,
              textTransform: "uppercase", marginBottom: 8, fontWeight: 500,
            }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute", left: 16, top: "50%",
                transform: "translateY(-50%)",
                fontSize: 14, pointerEvents: "none",
                color: focusedField === "password" ? T.gold : T.muted,
                transition: "color 0.25s",
              }}><FaLock /></span>
              <input
                type={showPass ? "text" : "password"}
                placeholder="Masukkan password..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                required
                style={{
                  width: "100%",
                  background: "rgba(201,168,76,0.04)",
                  border: `1px solid ${focusedField === "password"
                    ? "rgba(201,168,76,0.5)"
                    : "rgba(201,168,76,0.15)"}`,
                  borderRadius: 12,
                  padding: "13px 44px 13px 44px",
                  color: T.cream,
                  fontFamily: T.sans,
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.25s ease",
                }}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{
                  position: "absolute", right: 14, top: "50%",
                  transform: "translateY(-50%)",
                  background: "none", border: "none",
                  cursor: "pointer", fontSize: 14,
                  color: T.muted, padding: 4,
                  lineHeight: 1,
                }}
              >
                {showPass ? <GoEyeClosed /> : <FaEye />
}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -8, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -8, height: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  background: "rgba(224,112,112,0.1)",
                  border: "1px solid rgba(224,112,112,0.3)",
                  borderRadius: 10,
                  padding: "10px 14px",
                  fontSize: 12,
                  color: T.error,
                  fontFamily: T.sans,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span><IoIosWarning/></span> {error}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.03, boxShadow: `0 0 42px rgba(201,168,76,0.35)` }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            disabled={loading}
            style={{
              background:    loading
                ? "rgba(201,168,76,0.4)"
                : `linear-gradient(135deg, ${T.gold}, #A8832E)`,
              color:         T.dark,
              border:        "none",
              borderRadius:  100,
              padding:       "15px",
              fontSize:      13,
              fontFamily:    T.sans,
              fontWeight:    700,
              cursor:        loading ? "not-allowed" : "pointer",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              boxShadow:     `0 4px 24px rgba(201,168,76,0.2)`,
              marginTop:     4,
              display:       "flex",
              alignItems:    "center",
              justifyContent:"center",
              gap:           10,
              transition:    "background 0.3s ease",
            }}
          >
            {loading ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  style={{ display: "inline-block" }}
                ><FaHourglassEnd /></motion.span>
                Memproses...
              </>
            ) : (
              <>Masuk ke Belbook</>
            )}
          </motion.button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          style={{
            textAlign: "center",
            marginTop: 28, marginBottom: 0,
            fontFamily: T.sans, fontSize: 12,
            color: T.muted,
          }}
        >
          Belum punya akun?{" "}
          <span style={{
            color: T.gold, cursor: "default",
            fontStyle: "italic",
          }}>
            Hubungi Admin
          </span>
        </motion.p>
      </motion.div>

      <style>{`
        input::placeholder { color: ${T.muted}; opacity: 0.7; }
        input:-webkit-autofill {
          -webkit-box-shadow: 0 0 0 100px ${T.darkCard} inset !important;
          -webkit-text-fill-color: ${T.cream} !important;
        }
      `}</style>
    </div>
  );
}