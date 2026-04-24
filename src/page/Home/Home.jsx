import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import MyNavbar from "../../components/MyNavbar/MyNavbar";
import Footer from "../../components/Footer/Footer";
import { FaBookOpen,FaMoon } from "react-icons/fa";
import { FaBoltLightning } from "react-icons/fa6";
import { MdFiberSmartRecord } from "react-icons/md";
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

function Counter({ target, suffix = "" }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(target / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(start);
    }, 24);
    return () => clearInterval(timer);
  }, [target]);
  return <>{count}{suffix}</>;
}

function BookSpine({ color, title, width = 28, height = 160, delay = 0, tilt = 0 }) {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -18, transition: { duration: 0.28 } }}
      style={{
        width, height,
        background: color,
        borderRadius: "3px 3px 2px 2px",
        cursor: "pointer",
        position: "relative",
        transform: `rotate(${tilt}deg)`,
        transformOrigin: "bottom center",
        boxShadow: "4px 0 12px rgba(0,0,0,0.55), inset -3px 0 8px rgba(0,0,0,0.3)",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", left: 4, top: 0, bottom: 0,
        width: 2, background: "rgba(255,255,255,0.07)",
      }} />
      <span style={{
        writingMode: "vertical-rl",
        textOrientation: "mixed",
        transform: "rotate(180deg)",
        fontSize: "9px",
        fontFamily: T.serif,
        color: "rgba(255,255,255,0.5)",
        letterSpacing: "0.12em",
        fontWeight: 600,
        padding: "8px 0",
        whiteSpace: "nowrap",
        overflow: "hidden",
        maxHeight: "90%",
      }}>
        {title}
      </span>
    </motion.div>
  );
}

/* ── Dust mote ── */
function Dust({ x, y, size, delay }) {
  return (
    <motion.div
      style={{
        position: "absolute", left: `${x}%`, top: `${y}%`,
        width: size, height: size, borderRadius: "50%",
        background: T.gold, pointerEvents: "none", zIndex: 0,
      }}
      animate={{ y: [0, -40, 0], opacity: [0, 0.3, 0], x: [0, 8, -4, 0] }}
      transition={{ duration: 6 + delay, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}

/* ════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════ */
const Home = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const bgY   = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const txtY  = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const fade  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const [activeTag, setActiveTag] = useState("Novel");

  const books = [
    { color: T.green,   title: "Laskar Pelangi",    width: 24, height: 158, tilt: -3 },
    { color: "#3B2A1A", title: "Sapiens",            width: 30, height: 172, tilt:  1 },
    { color: "#1C2E4A", title: "Atomic Habits",      width: 26, height: 150, tilt: -1 },
    { color: "#4A1C1C", title: "Bumi Manusia",       width: 28, height: 164, tilt:  2 },
    { color: "#2C2A1A", title: "Filosofi Teras",     width: 22, height: 145, tilt: -2 },
    { color: "#1A3040", title: "Dune",               width: 32, height: 178, tilt:  0 },
    { color: "#2E1A3A", title: "Harry Potter",       width: 26, height: 160, tilt:  3 },
    { color: "#1A2C20", title: "Rich Dad Poor Dad",  width: 24, height: 148, tilt: -1 },
    { color: "#3A2A10", title: "Negeri 5 Menara",    width: 28, height: 168, tilt:  2 },
    { color: "#1E3340", title: "The Alchemist",      width: 22, height: 155, tilt: -2 },
  ];

  const dusts = Array.from({ length: 14 }, (_, i) => ({
    x: (i * 37 + 11) % 100,
    y: (i * 53 + 7)  % 100,
    size: (i % 3) + 1.5,
    delay: i * 0.55,
  }));

  const categories = ["Novel", "Sains", "Sejarah", "Filsafat", "Bisnis", "Fiksi Ilmiah"];

  const features = [
    { icon: <FaBookOpen />, title: "Koleksi Kuratif",   desc: "Ribuan buku pilihan dari berbagai genre, dikurasi khusus untuk kamu." },
    { icon: <MdFiberSmartRecord />, title: "Bookmark Pintar",   desc: "Simpan posisi baca dan lanjutkan kapan saja dari perangkat apa pun." },
    { icon: <FaMoon />, title: "Mode Malam",         desc: "Desain nyaman di mata, baik siang hari maupun larut malam." },
    { icon: <FaBoltLightning />, title: "Akses Instan",       desc: "Tanpa antre, tanpa batas. Pinjam dan baca buku dalam hitungan detik." },
  ];

  return (
    <div style={{
      background: T.dark, color: T.cream,
      minHeight: "100vh", fontFamily: T.sans,
      overflowX: "hidden",
    }}>

      <MyNavbar />

      {/* ══════════════════════ HERO ══════════════════════ */}
      <section ref={heroRef} style={{
        minHeight: "100vh", position: "relative",
        display: "flex", alignItems: "center", overflow: "hidden",
      }}>

        {/* Parallax BG */}
        <motion.div style={{ y: bgY, position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{
            position: "absolute", inset: 0,
            background:
              `radial-gradient(ellipse 70% 60% at 62% 50%, rgba(30,77,43,0.22) 0%, transparent 70%),
               radial-gradient(ellipse 40% 40% at 18% 30%, rgba(201,168,76,0.07) 0%, transparent 60%)`,
          }} />
          {/* Grid lines */}
          <div style={{
            position: "absolute", inset: 0, opacity: 1,
            backgroundImage:
              `linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px),
               linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }} />
          {/* Grain */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.035,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "180px",
          }} />
        </motion.div>

        {/* Dust motes */}
        {dusts.map((d, i) => <Dust key={i} {...d} />)}

        {/* Decorative large ring */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }}
          style={{
            position: "absolute", right: "-12%", top: "50%",
            transform: "translateY(-50%)",
            width: 600, height: 600, borderRadius: "50%",
            border: "1px solid rgba(201,168,76,0.07)",
            pointerEvents: "none",
          }}
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
          style={{
            position: "absolute", right: "-5%", top: "50%",
            transform: "translateY(-50%)",
            width: 400, height: 400, borderRadius: "50%",
            border: "1px solid rgba(201,168,76,0.1)",
            pointerEvents: "none",
          }}
        />

        {/* MAIN CONTENT */}
        <motion.div
          style={{
            y: txtY, opacity: fade,
            width: "100%", position: "relative", zIndex: 2,
            padding: "80px clamp(24px, 6vw, 100px) 60px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "60px",
            alignItems: "center",
            maxWidth: 1320,
            margin: "0 auto",
          }}
        >

          {/* ─── LEFT ─── */}
          <div>

            {/* Overline */}
            <motion.div
              initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}
            >
              <div style={{ width: 36, height: 1, background: T.gold }} />
              <span style={{
                fontSize: 11, letterSpacing: "0.25em",
                color: T.gold, fontWeight: 500,
                fontFamily: T.sans, textTransform: "uppercase",
              }}>
                Belbook — Perpustakaan Digital
              </span>
            </motion.div>

            {/* Headline — 3 lines animated */}
            {[
              { text: "Dunia Tanpa",  italic: false, outlined: false, delay: 0.35 },
              { text: "Batas",        italic: true,  outlined: true,  delay: 0.5  },
              { text: "Ada di Sini.", italic: false,  outlined: false, delay: 0.65 },
            ].map((line, i) => (
              <div key={i} style={{ overflow: "hidden", marginBottom: i === 2 ? 32 : 6 }}>
                <motion.h1
                  initial={{ y: "110%" }} animate={{ y: 0 }}
                  transition={{ duration: 0.85, delay: line.delay, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontFamily: T.serif,
                    fontWeight: line.italic ? 300 : (i === 2 ? 700 : 300),
                    fontStyle: line.italic ? "italic" : "normal",
                    fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
                    lineHeight: 1.08, margin: 0,
                    color: line.outlined ? "transparent" : T.cream,
                    WebkitTextStroke: line.outlined ? `1.5px ${T.gold}` : undefined,
                    letterSpacing: "-0.015em",
                  }}
                >
                  {line.text}
                </motion.h1>
              </div>
            ))}

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9 }}
              style={{
                color: T.muted, fontSize: "1rem", lineHeight: 1.82,
                maxWidth: 420, marginBottom: 36,
                fontFamily: T.sans, fontWeight: 300,
              }}
            >
              Belbook oleh Beli Dermawan menghadirkan ribuan judul buku pilihan —
              dari novel sastra hingga referensi ilmiah — langsung ke genggaman kamu,
              kapan pun dan di mana pun.
            </motion.p>

            {/* Genre tags */}
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 1.05 }}
              style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 40 }}
            >
              {categories.map((cat) => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveTag(cat)}
                  style={{
                    background:   activeTag === cat ? T.gold : "transparent",
                    color:        activeTag === cat ? T.dark : T.muted,
                    border:       `1px solid ${activeTag === cat ? T.gold : "rgba(201,168,76,0.2)"}`,
                    borderRadius: 100,
                    padding:      "6px 16px",
                    fontSize:     12,
                    fontFamily:   T.sans,
                    fontWeight:   500,
                    cursor:       "pointer",
                    letterSpacing:"0.04em",
                    transition:   "all 0.22s ease",
                  }}
                >
                  {cat}
                </motion.button>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              style={{ display: "flex", gap: 16, alignItems: "center" }}
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: `0 0 42px rgba(201,168,76,0.32)` }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate("/daftarBuku")}
                style={{
                  background:    `linear-gradient(135deg, ${T.gold}, #A8832E)`,
                  color:         T.dark,
                  border:        "none",
                  borderRadius:  100,
                  padding:       "15px 38px",
                  fontSize:      13,
                  fontFamily:    T.sans,
                  fontWeight:    700,
                  cursor:        "pointer",
                  letterSpacing: "0.06em",
                  textTransform: "uppercase",
                  boxShadow:     `0 4px 24px rgba(201,168,76,0.22)`,
                }}
              >
                Jelajahi Koleksi
              </motion.button>

              <motion.button
                whileHover={{ opacity: 0.8 }}
                style={{
                  background:    "transparent",
                  border:        "none",
                  color:         T.cream,
                  display:       "flex",
                  alignItems:    "center",
                  gap:           10,
                  fontSize:      13,
                  fontFamily:    T.sans,
                  cursor:        "pointer",
                  fontWeight:    400,
                  letterSpacing: "0.04em",
                }}
              >
                <span style={{
                  width: 44, height: 44, borderRadius: "50%",
                  border: `1px solid rgba(245,239,224,0.2)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 14,
                }}>▶</span>
                Cara Pakai
              </motion.button>
            </motion.div>

          </div>

          {/* ─── RIGHT: Bookshelf ─── */}
          <div>

            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              style={{
                display: "flex", justifyContent: "space-between",
                alignItems: "center", marginBottom: 18,
              }}
            >
              <span style={{ fontSize: 11, color: T.muted, letterSpacing: "0.2em", fontFamily: T.sans }}>
                KOLEKSI UNGGULAN
              </span>
              <motion.span
                whileHover={{ color: T.goldLt }}
                style={{ fontSize: 11, color: T.gold, letterSpacing: "0.1em", cursor: "pointer", fontFamily: T.sans }}
              >
                Lihat Semua →
              </motion.span>
            </motion.div>

            {/* Shelf box */}
            <motion.div
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{
                background: T.darkCard,
                border: "1px solid rgba(201,168,76,0.12)",
                borderRadius: 20,
                padding: "40px 28px 0 28px",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top glow */}
              <div style={{
                position: "absolute", top: -1, left: "20%", right: "20%",
                height: 2,
                background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)`,
              }} />
              <div style={{
                position: "absolute", top: 0, left: "15%", right: "15%",
                height: 90,
                background: `radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.09), transparent)`,
                pointerEvents: "none",
              }} />

              {/* Books */}
              <div style={{
                display: "flex", alignItems: "flex-end", gap: 5,
                justifyContent: "center", position: "relative", zIndex: 1,
              }}>
                {books.map((b, i) => (
                  <BookSpine key={i} {...b} delay={0.75 + i * 0.07} />
                ))}
              </div>

              {/* Shelf plank */}
              <div style={{
                height: 14, marginTop: -1,
                background: "linear-gradient(180deg, #3A2E1E 0%, #2A200E 100%)",
                borderRadius: "0 0 4px 4px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.6)",
                position: "relative", zIndex: 2,
              }} />

              {/* Stats */}
              <div style={{
                display: "flex", justifyContent: "space-between",
                padding: "20px 8px 24px",
              }}>
                {[
                  { val: 3498800,  suf: "+", label: "Judul Buku" },
                  { val: 1200, suf: "",  label: "Pembaca"    },
                  { val: 24,   suf: "/7",label: "Akses"      },
                ].map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.7 + i * 0.15 }}
                    style={{ textAlign: "center" }}
                  >
                    <div style={{
                      fontFamily: T.serif, fontSize: "1.9rem",
                      fontWeight: 600, color: T.gold, lineHeight: 1,
                    }}>
                      <Counter target={s.val} suffix={s.suf} />
                    </div>
                    <div style={{
                      fontSize: 11, color: T.muted, marginTop: 4,
                      letterSpacing: "0.12em", fontFamily: T.sans,
                    }}>
                      {s.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Floating quote card */}
            <motion.div
              initial={{ opacity: 0, y: 24, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ delay: 2.1, duration: 0.7 }}
              whileHover={{ rotate: 0, y: -5 }}
              style={{
                background: T.darkMid,
                border: "1px solid rgba(201,168,76,0.18)",
                borderRadius: 16,
                padding: "20px 24px",
                marginTop: 20,
                maxWidth: 300,
                marginLeft: "auto",
                cursor: "default",
              }}
            >
              <div style={{
                fontFamily: T.serif, fontSize: "2.8rem",
                color: T.gold, lineHeight: 0.6, marginBottom: 12,
              }}>"</div>
              <p style={{
                fontFamily: T.serif, fontStyle: "italic",
                fontSize: "0.92rem", lineHeight: 1.65,
                color: T.cream, margin: "0 0 12px",
              }}>
                Buku adalah jendela dunia — dan Belbook membuka setiap jendelanya untukmu.
              </p>
              <div style={{
                fontSize: 11, color: T.muted,
                fontFamily: T.sans, letterSpacing: "0.08em",
              }}>
                — Beli Dermawan
              </div>
            </motion.div>
          </div>

        </motion.div>

        {/* Scroll line */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 2.6 }}
          style={{
            position: "absolute", bottom: 32, left: "50%",
            transform: "translateX(-50%)",
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: 8, zIndex: 10,
          }}
        >
          <span style={{
            fontSize: 10, letterSpacing: "0.22em",
            color: T.muted, fontFamily: T.sans,
          }}>SCROLL</span>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            style={{
              width: 1, height: 50,
              background: `linear-gradient(180deg, ${T.gold}, transparent)`,
            }}
          />
        </motion.div>
      </section>

      {/* ══════════════════════ MARQUEE ══════════════════════ */}
      <div style={{
        borderTop:    "1px solid rgba(201,168,76,0.12)",
        borderBottom: "1px solid rgba(201,168,76,0.12)",
        padding:      "14px 0",
        overflow:     "hidden",
        background:   T.darkMid,
      }}>
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", whiteSpace: "nowrap" }}
        >
          {Array(4).fill([
            "Novel Terbaik", "Sains & Alam", "Sejarah Dunia",
            "Filsafat Hidup", "Fiksi Ilmiah", "Literasi Keuangan",
            "Psikologi", "Biografi",
          ]).flat().map((item, i) => (
            <span key={i} style={{
              fontFamily: T.serif,
              fontSize:   "0.9rem",
              color:      i % 3 === 1 ? T.gold : T.muted,
              fontStyle:  i % 3 === 1 ? "italic" : "normal",
              padding:    "0 30px",
            }}>
              {item} {i % 3 === 1 ? "✦" : "—"}
            </span>
          ))}
        </motion.div>
      </div>

      {/* ══════════════════════ FEATURES ══════════════════════ */}
      <section style={{
        padding:   "100px clamp(24px, 6vw, 100px)",
        maxWidth:  1320,
        margin:    "0 auto",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: "center", marginBottom: 72 }}
        >
          <span style={{
            fontSize: 11, letterSpacing: "0.25em", color: T.gold,
            fontFamily: T.sans, display: "block", marginBottom: 16,
          }}>
            MENGAPA BELBOOK
          </span>
          <h2 style={{
            fontFamily: T.serif,
            fontSize: "clamp(2rem, 4vw, 3.4rem)",
            fontWeight: 300, color: T.cream, margin: 0,
          }}>
            Pengalaman Membaca yang{" "}
            <span style={{ fontStyle: "italic", color: T.gold }}>Berbeda</span>
          </h2>
        </motion.div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 24,
        }}>
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -8, borderColor: "rgba(201,168,76,0.4)" }}
              style={{
                background:   T.darkCard,
                border:       "1px solid rgba(201,168,76,0.1)",
                borderRadius: 20,
                padding:      "40px 32px",
                transition:   "border-color 0.3s ease",
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 20 }}>{f.icon}</div>
              <h3 style={{
                fontFamily: T.serif, fontSize: "1.3rem",
                fontWeight: 600, color: T.cream, margin: "0 0 12px",
              }}>
                {f.title}
              </h3>
              <p style={{
                color: T.muted, fontSize: "0.88rem",
                lineHeight: 1.75, margin: 0,
                fontFamily: T.sans, fontWeight: 300,
              }}>
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════ CTA BAND ══════════════════════ */}
      <section style={{
        margin:     "0 clamp(24px, 6vw, 100px) 100px",
        background: `linear-gradient(135deg, ${T.green} 0%, #0A2E16 100%)`,
        borderRadius: 28,
        padding:    "80px clamp(32px, 5vw, 80px)",
        position:   "relative",
        overflow:   "hidden",
        border:     "1px solid rgba(201,168,76,0.15)",
      }}>
        {[300, 450, 600].map((s, i) => (
          <div key={i} style={{
            position: "absolute", right: -s / 3, top: "50%",
            transform: "translateY(-50%)",
            width: s, height: s, borderRadius: "50%",
            border: "1px solid rgba(201,168,76,0.07)",
            pointerEvents: "none",
          }} />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ position: "relative", zIndex: 1, maxWidth: 640 }}
        >
          <h2 style={{
            fontFamily: T.serif, fontWeight: 300,
            fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
            color: T.cream, margin: "0 0 16px",
          }}>
            Mulai Petualangan Membacamu{" "}
            <span style={{ fontStyle: "italic", color: T.goldLt }}>Sekarang</span>
          </h2>
          <p style={{
            color: "rgba(245,239,224,0.55)", fontSize: "1rem",
            lineHeight: 1.75, margin: "0 0 40px",
            fontFamily: T.sans, fontWeight: 300, maxWidth: 480,
          }}>
            Bergabung bersama lebih dari 1.200 pembaca aktif yang sudah merasakan
            kemudahan membaca bersama Belbook.
          </p>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: `0 0 52px rgba(201,168,76,0.38)` }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/daftarBuku")}
            style={{
              background:    `linear-gradient(135deg, ${T.gold}, #A8832E)`,
              color:         T.dark,
              border:        "none",
              borderRadius:  100,
              padding:       "16px 46px",
              fontSize:      13,
              fontFamily:    T.sans,
              fontWeight:    700,
              cursor:        "pointer",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              boxShadow:     `0 6px 28px rgba(201,168,76,0.24)`,
            }}
          >
            Jelajahi Koleksi Buku
          </motion.button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;