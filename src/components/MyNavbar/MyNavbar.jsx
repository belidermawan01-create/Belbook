import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../../assets/Logooo.png";

const T = {
  cream:    "#F5EFE0",
  gold:     "#C9A84C",
  goldLt:   "#E8C96A",
  dark:     "#0E0B07",
  darkMid:  "#1A1410",
  darkCard: "#221C14",
  muted:    "#8A7D68",
  serif:    "'Cormorant Garamond', Georgia, serif",
  sans:     "'DM Sans', sans-serif",
};

const NAV_LINKS = [
  { label: "Home",  href: "/"      },
  { label: "About", href: "/about" },
];

const MyNavbar = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const isActive = (href) => location.pathname === href;

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position:        "fixed",
          top:             0,
          left:            0,
          right:           0,
          zIndex:          1000,
          padding:         "0 clamp(20px, 5vw, 80px)",
          height:          68,
          display:         "flex",
          alignItems:      "center",
          justifyContent:  "space-between",
          background:      scrolled
            ? "rgba(14,11,7,0.92)"
            : "transparent",
          backdropFilter:  scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom:    scrolled
            ? "1px solid rgba(201,168,76,0.12)"
            : "1px solid transparent",
          transition:      "background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
        }}
      >
        <motion.a
          href="/"
          whileHover={{ opacity: 0.85 }}
          style={{
            textDecoration: "none",
            display:        "flex",
            alignItems:     "center",
            gap:            10,
          }}
        >
          <div style={{
            width:        32,
            height:       32,
            borderRadius: 6,
            display:      "flex",
            alignItems:   "center",
            justifyContent:"center",
            fontSize:     15,
            flexShrink:   0,
            boxShadow:    `0 2px 12px rgba(201,168,76,0.3)`,
          }}>
            <img style={{width:"35px"}} src={Logo} alt="" />
          </div>
          <span style={{
            fontFamily:    T.serif,
            fontSize:      "1.35rem",
            fontWeight:    600,
            color:         T.cream,
            letterSpacing: "0.02em",
          }}>
            Bel<span style={{ color: T.gold, fontStyle: "italic" }}>book</span>
          </span>
        </motion.a>

        <div style={{
          display:    "flex",
          alignItems: "center",
          gap:        4,
        }}
          className="navbar-desktop-links"
        >
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHoveredLink(link.href)}
              onMouseLeave={() => setHoveredLink(null)}
              style={{
                textDecoration: "none",
                position:       "relative",
                padding:        "8px 16px",
                fontFamily:     T.sans,
                fontSize:       13,
                fontWeight:     isActive(link.href) ? 500 : 400,
                letterSpacing:  "0.06em",
                color:          isActive(link.href)
                  ? T.gold
                  : hoveredLink === link.href
                    ? T.cream
                    : T.muted,
                transition:     "color 0.25s ease",
              }}
            >
              {link.label}

              <motion.span
                layoutId="nav-underline"
                style={{
                  position:     "absolute",
                  bottom:       2,
                  left:         "16px",
                  right:        "16px",
                  height:       1,
                  background:   T.gold,
                  borderRadius: 1,
                  display:      "block",
                  transformOrigin: "left",
                }}
                animate={{
                  scaleX: isActive(link.href) || hoveredLink === link.href ? 1 : 0,
                  opacity: isActive(link.href) ? 1 : hoveredLink === link.href ? 0.5 : 0,
                }}
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            </motion.a>
          ))}

          <div style={{
            width:      1,
            height:     20,
            background: "rgba(201,168,76,0.2)",
            margin:     "0 8px",
          }} />

          {/* Logout */}
          <motion.button
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{
              scale:      1.04,
              borderColor: "rgba(201,168,76,0.6)",
            }}
            whileTap={{ scale: 0.96 }}
            onClick={handleLogout}
            style={{
              background:    "transparent",
              border:        "1px solid rgba(201,168,76,0.25)",
              borderRadius:  100,
              padding:       "7px 20px",
              color:         T.muted,
              fontFamily:    T.sans,
              fontSize:      12,
              fontWeight:    500,
              letterSpacing: "0.08em",
              cursor:        "pointer",
              transition:    "border-color 0.25s ease, color 0.25s ease",
              display:       "flex",
              alignItems:    "center",
              gap:           6,
            }}
            onMouseEnter={e => e.currentTarget.style.color = T.cream}
            onMouseLeave={e => e.currentTarget.style.color = T.muted}
          >
            <span style={{ fontSize: 11, opacity: 0.7 }}>↩</span>
            Logout
          </motion.button>
        </div>

        <motion.button
          className="navbar-hamburger"
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          style={{
            background:  "transparent",
            border:      "1px solid rgba(201,168,76,0.2)",
            borderRadius: 8,
            padding:     "8px 10px",
            cursor:      "pointer",
            display:     "none",
            flexDirection: "column",
            gap:         5,
          }}
        >
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{
                rotate:  mobileOpen && i !== 1 ? (i === 0 ? 45 : -45) : 0,
                y:       mobileOpen ? (i === 0 ? 9 : i === 2 ? -9 : 0) : 0,
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }}
              transition={{ duration: 0.25 }}
              style={{
                display:      "block",
                width:        22,
                height:       1.5,
                background:   T.gold,
                borderRadius: 1,
                transformOrigin: "center",
              }}
            />
          ))}
        </motion.button>

      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position:      "fixed",
              top:           68,
              left:          0,
              right:         0,
              zIndex:        999,
              background:    "rgba(14,11,7,0.97)",
              backdropFilter:"blur(24px)",
              borderBottom:  "1px solid rgba(201,168,76,0.15)",
              padding:       "24px clamp(20px, 5vw, 80px) 32px",
            }}
          >
            <div style={{
              position:   "absolute",
              top:        0, left: "10%", right: "10%",
              height:     1,
              background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)`,
            }} />

            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  display:        "block",
                  textDecoration: "none",
                  fontFamily:     T.serif,
                  fontSize:       "1.8rem",
                  fontWeight:     300,
                  fontStyle:      isActive(link.href) ? "italic" : "normal",
                  color:          isActive(link.href) ? T.gold : T.cream,
                  padding:        "10px 0",
                  borderBottom:   "1px solid rgba(201,168,76,0.07)",
                  letterSpacing:  "-0.01em",
                }}
              >
                {link.label}
                {isActive(link.href) && (
                  <span style={{ color: T.gold, marginLeft: 8, fontSize: "1rem" }}>✦</span>
                )}
              </motion.a>
            ))}

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onClick={handleLogout}
              style={{
                marginTop:     24,
                background:    "transparent",
                border:        "1px solid rgba(201,168,76,0.25)",
                borderRadius:  100,
                padding:       "10px 28px",
                color:         T.muted,
                fontFamily:    T.sans,
                fontSize:      13,
                fontWeight:    500,
                letterSpacing: "0.08em",
                cursor:        "pointer",
              }}
            >
              ↩ Logout
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ height: 68 }} />

      <style>{`
        @media (max-width: 640px) {
          .navbar-desktop-links { display: none !important; }
          .navbar-hamburger      { display: flex !important; }
        }
      `}</style>
    </>
  );
};

export default MyNavbar;