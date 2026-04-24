import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import MyNavbar from "../../components/MyNavbar/MyNavbar";
import Footer from "../../components/Footer/Footer";
import { FaSearch } from "react-icons/fa";


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

const Stars = ({ count = 4 }) => (
  <span style={{ letterSpacing: 1 }}>
    {Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < count ? T.gold : "rgba(201,168,76,0.2)", fontSize: 11 }}>★</span>
    ))}
  </span>
);
const SkeletonCard = ({ delay }) => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    transition={{ delay }}
    style={{
      background: T.darkCard,
      border: "1px solid rgba(201,168,76,0.08)",
      borderRadius: 16, overflow: "hidden",
    }}
  >
    <motion.div
      animate={{ opacity: [0.4, 0.7, 0.4] }}
      transition={{ duration: 1.6, repeat: Infinity }}
      style={{ height: 220, background: "rgba(201,168,76,0.06)" }}
    />
    <div style={{ padding: "14px 16px 18px" }}>
      {[80, 60].map((w, i) => (
        <motion.div key={i}
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.2 }}
          style={{
            height: 10, width: `${w}%`,
            background: "rgba(201,168,76,0.08)",
            borderRadius: 4, marginBottom: 8,
          }}
        />
      ))}
    </div>
  </motion.div>
);

const DaftarBuku = () => {
  const navigate = useNavigate();
  const [buku,       setBuku]       = useState([]);
  const [penulis,    setPenulis]    = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState("");
  const [activeGenre,setActiveGenre]= useState("Semua");
  const [hoveredId,  setHoveredId]  = useState(null);

  const genres = ["Semua", "Novel", "Sains", "Sejarah", "Filsafat", "Bisnis"];

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = async () => {
    try {
      const [resBuku, resPenulis] = await Promise.all([
        axios.get("/api/buku"),
        axios.get("/api/penulis"),
      ]);
      setBuku(resBuku.data.data);
      setPenulis(resPenulis.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const namePenulis = (penulis_id) => {
    const found = penulis.find((p) => p.id === penulis_id);
    return found ? found.nama_penulis : "Penulis Tidak Diketahui";
  };

  const filtered = buku.filter((b) =>
    (b.judul_buku || b.judul || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div style={{
      background: T.dark, color: T.cream,
      minHeight: "100vh", fontFamily: T.sans,
      overflowX: "hidden",
    }}>
      <MyNavbar />

      <section style={{
        padding: "72px clamp(24px,6vw,100px) 56px",
        maxWidth: 1320, margin: "0 auto",
        position: "relative",
      }}>
        {/* Background glow */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 300,
          background: "radial-gradient(ellipse 60% 80% at 50% 0%, rgba(30,77,43,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
        >
          <div style={{ width: 32, height: 1, background: T.gold }} />
          <span style={{
            fontSize: 11, letterSpacing: "0.25em",
            color: T.gold, fontFamily: T.sans,
            textTransform: "uppercase", fontWeight: 500,
          }}>Koleksi Perpustakaan</span>
        </motion.div>

        {/* Title */}
        <div style={{ overflow: "hidden", marginBottom: 8 }}>
          <motion.h1
            initial={{ y: "100%" }} animate={{ y: 0 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: T.serif, fontWeight: 300,
              fontSize: "clamp(2.8rem, 6vw, 5rem)",
              lineHeight: 1.08, margin: 0, color: T.cream,
              letterSpacing: "-0.015em",
            }}
          >
            Daftar <span style={{ fontStyle: "italic", color: T.gold }}>Buku</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            color: T.muted, fontSize: "1rem", lineHeight: 1.7,
            margin: "12px 0 40px", fontWeight: 300,
            maxWidth: 480,
          }}
        >
          Temukan buku favoritmu dari koleksi kami yang terus diperbarui.
          Pinjam dan baca kapan saja, di mana saja.
        </motion.p>

        {/* Search + filter row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          style={{
            display: "flex", gap: 16, flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          {/* Search box */}
          <div style={{ position: "relative", flexGrow: 1, maxWidth: 380 }}>
            <span style={{
              position: "absolute", left: 16, top: "50%",
              transform: "translateY(-50%)",
              color: T.muted, fontSize: 14, pointerEvents: "none",
            }}><FaSearch /></span>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari judul buku..."
              style={{
                width: "100%",
                background: T.darkCard,
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: 100,
                padding: "11px 20px 11px 42px",
                color: T.cream,
                fontFamily: T.sans,
                fontSize: 13,
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={e => e.target.style.borderColor = "rgba(201,168,76,0.45)"}
              onBlur={e  => e.target.style.borderColor = "rgba(201,168,76,0.15)"}
            />
          </div>

          {/* Genre filter pills */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {genres.map((g) => (
              <motion.button
                key={g}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveGenre(g)}
                style={{
                  background:    activeGenre === g ? T.gold : "transparent",
                  color:         activeGenre === g ? T.dark : T.muted,
                  border:        `1px solid ${activeGenre === g ? T.gold : "rgba(201,168,76,0.2)"}`,
                  borderRadius:  100, padding: "7px 18px",
                  fontSize:      12, fontFamily: T.sans, fontWeight: 500,
                  cursor:        "pointer", letterSpacing: "0.04em",
                  transition:    "all 0.22s ease",
                }}
              >{g}</motion.button>
            ))}
          </div>
        </motion.div>

        {/* Result count */}
        {!loading && (
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            style={{
              marginTop: 20, fontSize: 12, color: T.muted,
              fontFamily: T.sans, letterSpacing: "0.05em",
            }}
          >
            Menampilkan{" "}
            <span style={{ color: T.gold }}>{filtered.length}</span>
            {" "}dari {buku.length} judul
          </motion.p>
        )}
      </section>

      {/* ══════════════════ BOOK GRID ══════════════════ */}
      <section style={{
        padding: "0 clamp(24px,6vw,100px) 100px",
        maxWidth: 1320, margin: "0 auto",
      }}>

        {/* Thin gold divider */}
        <div style={{
          height: 1, marginBottom: 48,
          background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)",
        }} />

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 28,
        }}>

          {/* Loading skeletons */}
          {loading && Array.from({ length: 12 }, (_, i) => (
            <SkeletonCard key={i} delay={i * 0.05} />
          ))}

          {/* Book cards */}
          <AnimatePresence>
            {!loading && filtered.map((book, i) => (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                onMouseEnter={() => setHoveredId(book.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  background:   T.darkCard,
                  border:       `1px solid ${hoveredId === book.id ? "rgba(201,168,76,0.35)" : "rgba(201,168,76,0.08)"}`,
                  borderRadius: 16,
                  overflow:     "hidden",
                  cursor:       "pointer",
                  transition:   "border-color 0.3s ease",
                  display:      "flex",
                  flexDirection:"column",
                }}
              >
                {/* Cover image */}
                <div style={{
                  position: "relative", overflow: "hidden",
                  height: 220, flexShrink: 0,
                  background: "rgba(201,168,76,0.04)",
                }}>
                  <motion.img
                    src={book.foto}
                    alt={book.judul_buku || book.judul}
                    animate={{ scale: hoveredId === book.id ? 1.07 : 1 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    style={{
                      width: "100%", height: "100%",
                      objectFit: "cover", display: "block",
                    }}
                    onError={e => {
                      e.target.style.display = "none";
                      e.target.parentNode.style.background = T.darkMid;
                    }}
                  />

                  {/* Hover overlay */}
                  <motion.div
                    animate={{ opacity: hoveredId === book.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(0deg, rgba(14,11,7,0.85) 0%, transparent 55%)",
                      display: "flex", alignItems: "flex-end",
                      padding: "16px",
                    }}
                  >
                    <motion.button
                      animate={{
                        y: hoveredId === book.id ? 0 : 16,
                        opacity: hoveredId === book.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3, delay: 0.05 }}
                      onClick={() => navigate("/peminjaman", { state: book })}
                      style={{
                        width:         "100%",
                        background:    `linear-gradient(135deg, ${T.gold}, #A8832E)`,
                        color:         T.dark,
                        border:        "none",
                        borderRadius:  100,
                        padding:       "9px 0",
                        fontSize:      12,
                        fontFamily:    T.sans,
                        fontWeight:    700,
                        cursor:        "pointer",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                      }}
                    >
                      Pinjam Buku
                    </motion.button>
                  </motion.div>

                  {/* Badge */}
                  <div style={{
                    position:   "absolute", top: 10, right: 10,
                    background: "rgba(14,11,7,0.75)",
                    border:     "1px solid rgba(201,168,76,0.25)",
                    borderRadius: 100, padding: "3px 10px",
                    fontSize:   10, color: T.gold,
                    fontFamily: T.sans, letterSpacing: "0.08em",
                    backdropFilter: "blur(8px)",
                  }}>
                    Tersedia
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: "14px 16px 18px", flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{
                      fontFamily:    T.serif,
                      fontSize:      "1rem",
                      fontWeight:    600,
                      color:         T.cream,
                      margin:        "0 0 4px",
                      lineHeight:    1.35,
                      overflow:      "hidden",
                      display:       "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}>
                      {book.judul_buku || book.judul}
                    </h3>
                    <p style={{
                      fontFamily: T.sans, fontSize: 11,
                      color: T.muted, margin: "0 0 10px",
                      fontStyle: "italic",
                    }}>
                      {namePenulis(book.penulis_id)}
                    </p>
                  </div>

                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                    <Stars count={4} />
                    {/* Mobile pinjam button (visible when not hovering on desktop) */}
                    <button
                      className="pinjam-mobile-btn"
                      onClick={() => navigate("/peminjaman", { state: book })}
                      style={{
                        background:    "transparent",
                        border:        `1px solid rgba(201,168,76,0.3)`,
                        borderRadius:  100,
                        padding:       "4px 12px",
                        fontSize:      10,
                        color:         T.gold,
                        fontFamily:    T.sans,
                        fontWeight:    500,
                        cursor:        "pointer",
                        letterSpacing: "0.06em",
                      }}
                    >
                      Pinjam
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: "center", padding: "80px 0" }}
          >
            <div style={{ fontSize: 48, marginBottom: 20 }}>📭</div>
            <h3 style={{ fontFamily: T.serif, fontWeight: 300, color: T.cream, marginBottom: 8 }}>
              Buku Tidak Ditemukan
            </h3>
            <p style={{ color: T.muted, fontFamily: T.sans, fontSize: "0.9rem" }}>
              Coba kata kunci lain atau reset pencarian kamu.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSearch("")}
              style={{
                marginTop: 20, background: "transparent",
                border: `1px solid ${T.gold}`, borderRadius: 100,
                padding: "10px 28px", color: T.gold,
                fontFamily: T.sans, fontSize: 12,
                fontWeight: 500, cursor: "pointer", letterSpacing: "0.06em",
              }}
            >
              Reset Pencarian
            </motion.button>
          </motion.div>
        )}
      </section>

      <Footer />

      <style>{`
        input::placeholder { color: ${T.muted}; }
        @media (hover: hover) {
          .pinjam-mobile-btn { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default DaftarBuku;