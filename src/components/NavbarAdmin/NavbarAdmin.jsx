import { useEffect, useState, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const T = {
  cream:    "#F5EFE0",
  gold:     "#C9A84C",
  goldLt:   "#E8C96A",
  dark:     "#0E0B07",
  darkMid:  "#1A1410",
  darkCard: "#221C14",
  green:    "#1E4D2B",
  muted:    "#8A7D68",
  serif:    "'Cormorant Garamond', Georgia, serif",
  sans:     "'DM Sans', sans-serif",
};

const NavbarAdmin = ({ search = "", setSearch }) => {
  const navigate   = useNavigate();
  const dropRef    = useRef(null);
  const inputRef   = useRef(null);

  const [username,   setUsername]   = useState("");
  const [open,       setOpen]       = useState(false);
  const [focused,    setFocused]    = useState(false);
  const [shortcut,   setShortcut]   = useState(false);   

  useEffect(() => {
    try {
      const token   = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      setUsername(decoded.username || "Admin");
    } catch (_) {
      setUsername("Admin");
    }
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (e.key === "Escape") {
        inputRef.current?.blur();
        setFocused(false);
      }
    };
    setShortcut(navigator.platform.includes("Mac") ? "⌘K" : "Ctrl K");
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const clearSearch = () => {
    setSearch?.("");
    inputRef.current?.focus();
  };

  const initials = username
    ? username.slice(0, 2).toUpperCase()
    : "AD";

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0,   opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position:      "sticky",
        top:           0,
        zIndex:        100,
        height:        64,
        background:    "rgba(14,11,7,0.9)",
        backdropFilter:"blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom:  "1px solid rgba(201,168,76,0.1)",
        display:       "flex",
        alignItems:    "center",
        padding:       "0 clamp(16px, 3vw, 40px)",
        gap:           16,
        fontFamily:    T.sans,
      }}
    >

      <div style={{
        marginLeft: "auto",
        display:    "flex",
        alignItems: "center",
        gap:        14,
        flexShrink: 0,
      }}>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={{
            background:    "transparent",
            border:        "1px solid rgba(201,168,76,0.12)",
            borderRadius:  "50%",
            width:         36,
            height:        36,
            display:       "flex",
            alignItems:    "center",
            justifyContent:"center",
            cursor:        "pointer",
            fontSize:      14,
            color:         T.muted,
            position:      "relative",
          }}
        >
          🔔
          <span style={{
            position:   "absolute",
            top:        6, right: 7,
            width:      7, height: 7,
            borderRadius:"50%",
            background: T.gold,
            border:     `2px solid ${T.dark}`,
          }} />
        </motion.button>

        <div style={{
          width:      1, height: 24,
          background: "rgba(201,168,76,0.12)",
        }} />

        <div ref={dropRef} style={{ position: "relative" }}>
          <motion.button
            whileHover={{ opacity: 0.85 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setOpen(!open)}
            style={{
              background:    "transparent",
              border:        "none",
              cursor:        "pointer",
              display:       "flex",
              alignItems:    "center",
              gap:           9,
              padding:       "4px 8px 4px 4px",
              borderRadius:  100,
              transition:    "background 0.2s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(201,168,76,0.06)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
          >
            <div style={{
              width:          34,
              height:         34,
              borderRadius:   "50%",
              background:     `linear-gradient(135deg, ${T.green}, #0A2E16)`,
              border:         `1.5px solid rgba(201,168,76,0.3)`,
              display:        "flex",
              alignItems:     "center",
              justifyContent: "center",
              fontFamily:     T.sans,
              fontSize:       12,
              fontWeight:     700,
              color:          T.goldLt,
              flexShrink:     0,
              letterSpacing:  "0.05em",
            }}>
              {initials}
            </div>

            <div style={{ textAlign: "left" }}>
              <div style={{
                fontFamily: T.sans,
                fontSize:   13,
                fontWeight: 500,
                color:      T.cream,
                lineHeight: 1.2,
              }}>{username}</div>
              <div style={{
                fontFamily:    T.sans,
                fontSize:      10,
                color:         T.muted,
                letterSpacing: "0.06em",
              }}>Administrator</div>
            </div>

            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ fontSize: 9, color: T.muted, marginLeft: 2 }}
            >▼</motion.span>
          </motion.button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0,  scale: 1 }}
                exit={{ opacity: 0,  y: -8, scale: 0.96 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position:     "absolute",
                  top:          "calc(100% + 10px)",
                  right:        0,
                  minWidth:     180,
                  background:   T.darkCard,
                  border:       "1px solid rgba(201,168,76,0.15)",
                  borderRadius: 14,
                  overflow:     "hidden",
                  boxShadow:    "0 16px 40px rgba(0,0,0,0.5)",
                  zIndex:       200,
                }}
              >
                <div style={{
                  height:     1,
                  background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)`,
                }} />

                <div style={{
                  padding:      "14px 16px 10px",
                  borderBottom: "1px solid rgba(201,168,76,0.08)",
                }}>
                  <div style={{
                    fontFamily: T.sans,
                    fontSize:   11,
                    color:      T.muted,
                    letterSpacing:"0.1em",
                    textTransform:"uppercase",
                    marginBottom: 2,
                  }}>Masuk sebagai</div>
                  <div style={{
                    fontFamily: T.serif,
                    fontSize:   "1rem",
                    fontWeight: 600,
                    color:      T.cream,
                    fontStyle:  "italic",
                  }}>{username}</div>
                </div>

                {[
                  { label: "👤  Profil",  action: () => {}, danger: false },
                  { label: "⚙️  Pengaturan", action: () => {}, danger: false },
                ].map((item, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ background: "rgba(201,168,76,0.06)", color: T.cream }}
                    onClick={() => { item.action(); setOpen(false); }}
                    style={{
                      display:       "block",
                      width:         "100%",
                      background:    "transparent",
                      border:        "none",
                      padding:       "10px 16px",
                      textAlign:     "left",
                      fontFamily:    T.sans,
                      fontSize:      13,
                      color:         T.muted,
                      cursor:        "pointer",
                      transition:    "background 0.2s, color 0.2s",
                      letterSpacing: "0.03em",
                    }}
                  >{item.label}</motion.button>
                ))}

                <div style={{
                  height:  1, margin: "4px 0",
                  background: "rgba(201,168,76,0.07)",
                }} />

                <motion.button
                  whileHover={{ background: "rgba(224,112,112,0.08)", color: "#E07070" }}
                  onClick={() => { handleLogout(); setOpen(false); }}
                  style={{
                    display:       "block",
                    width:         "100%",
                    background:    "transparent",
                    border:        "none",
                    padding:       "10px 16px 14px",
                    textAlign:     "left",
                    fontFamily:    T.sans,
                    fontSize:      13,
                    color:         T.muted,
                    cursor:        "pointer",
                    transition:    "background 0.2s, color 0.2s",
                    letterSpacing: "0.03em",
                  }}
                >↩  Logout</motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        input::placeholder { color: ${T.muted}; opacity: 0.6; }
      `}</style>
    </motion.header>
  );
};

export default NavbarAdmin;