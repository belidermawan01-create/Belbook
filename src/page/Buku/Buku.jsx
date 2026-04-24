import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { RiPencilFill } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { PiMailboxFill } from "react-icons/pi";

const T = {
  cream:    "#F5EFE0",
  gold:     "#C9A84C",
  goldLt:   "#E8C96A",
  dark:     "#0E0B07",
  darkMid:  "#1A1410",
  darkCard: "#221C14",
  green:    "#1E4D2B",
  muted:    "#8A7D68",
  danger:   "#C0514A",
  serif:    "'Cormorant Garamond', Georgia, serif",
  sans:     "'DM Sans', sans-serif",
};

const DeleteModal = ({ bookTitle, onConfirm, onCancel }) => (
  <motion.div
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    style={{
      position: "fixed", inset: 0, zIndex: 999,
      background: "rgba(0,0,0,0.7)", backdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "20px",
    }}
    onClick={onCancel}
  >
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.95 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      onClick={e => e.stopPropagation()}
      style={{
        background: T.darkCard,
        border: "1px solid rgba(201,168,76,0.15)",
        borderRadius: 20, padding: "36px 40px",
        maxWidth: 400, width: "100%",
        position: "relative", overflow: "hidden",
      }}
    >
      <div style={{
        position: "absolute", top: -1, left: "20%", right: "20%",
        height: 2,
        background: `linear-gradient(90deg, transparent, ${T.danger}, transparent)`,
      }} />

      <div style={{ fontSize: 36, marginBottom: 16, textAlign: "center" }}>🗑️</div>
      <h3 style={{
        fontFamily: T.serif, fontSize: "1.4rem", fontWeight: 600,
        color: T.cream, textAlign: "center", margin: "0 0 10px",
      }}>Hapus Buku?</h3>
      <p style={{
        fontFamily: T.sans, fontSize: 13, color: T.muted,
        textAlign: "center", lineHeight: 1.6, margin: "0 0 28px",
      }}>
        Kamu yakin ingin menghapus{" "}
        <span style={{ color: T.cream, fontStyle: "italic" }}>"{bookTitle}"</span>?
        Tindakan ini tidak bisa dibatalkan.
      </p>
      <div style={{ display: "flex", gap: 12 }}>
        <motion.button
          whileHover={{ opacity: 0.8 }} whileTap={{ scale: 0.97 }}
          onClick={onCancel}
          style={{
            flex: 1, background: "transparent",
            border: "1px solid rgba(201,168,76,0.2)",
            borderRadius: 100, padding: "11px",
            color: T.muted, fontFamily: T.sans,
            fontSize: 13, cursor: "pointer",
            transition: "border-color 0.2s",
          }}
        >Batal</motion.button>
        <motion.button
          whileHover={{ boxShadow: "0 0 24px rgba(192,81,74,0.35)" }}
          whileTap={{ scale: 0.97 }}
          onClick={onConfirm}
          style={{
            flex: 1,
            background: "linear-gradient(135deg, #C0514A, #8B2E2A)",
            border: "none", borderRadius: 100, padding: "11px",
            color: T.cream, fontFamily: T.sans,
            fontSize: 13, fontWeight: 600, cursor: "pointer",
          }}
        >Ya, Hapus</motion.button>
      </div>
    </motion.div>
  </motion.div>
);

const Buku = () => {
  const navigate = useNavigate();
  const [buku,      setBuku]      = useState([]);
  const [penulis,   setPenulis]   = useState([]);
  const [penerbit,  setPenerbit]  = useState([]);
  const [genre,     setGenre]     = useState([]);
  const [loading,   setLoading]   = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null); 
  const [search,    setSearch]    = useState("");

  useEffect(() => { getAllData(); }, []);

  const getAllData = async () => {
    setLoading(true);
    try {
      const [resBuku, resPenulis, resPenerbit, resGenre] = await Promise.all([
        axios.get("/api/buku"),
        axios.get("/penulis"),
        axios.get("/penerbit"),
        axios.get("/genre"),
      ]);
      setBuku(resBuku.data.data     || []);
      setPenulis(resPenulis.data.data   || []);
      setPenerbit(resPenerbit.data.data || []);
      setGenre(resGenre.data.data       || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await axios.delete(`/buku/delete/${deleteTarget.id}`);
      setDeleteTarget(null);
      getAllData();
    } catch (err) { console.error(err); }
  };

  const penulisName  = (id) => penulis.find( p => Number(p.id) === Number(id))?.nama_penulis  || "-";
  const penerbitName = (id) => penerbit.find(p => Number(p.id) === Number(id))?.nama_penerbit || "-";
  const genreName    = (id) => genre.find(   g => Number(g.id) === Number(id))?.nama_genre    || "-";

  const filtered = buku.filter(b =>
    (b.judul_buku || "").toLowerCase().includes(search.toLowerCase()) ||
    penulisName(b.penulis_id).toLowerCase().includes(search.toLowerCase())
  );

  const SkeletonRow = ({ i }) => (
    <tr>
      {Array.from({ length: 10 }, (_, j) => (
        <td key={j} style={{ padding: "14px 16px" }}>
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.08 }}
            style={{
              height: j === 1 ? 56 : 12,
              width: j === 3 ? "80%" : j === 1 ? 56 : "60%",
              background: "rgba(201,168,76,0.07)",
              borderRadius: j === 1 ? 8 : 4,
            }}
          />
        </td>
      ))}
    </tr>
  );

  return (
    <div style={{
      background: T.dark, minHeight: "100vh",
      fontFamily: T.sans, color: T.cream,
      padding: "40px clamp(20px,4vw,48px) 60px",
    }}>

      <div style={{ marginBottom: 36 }}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}
        >
          <div style={{ width: 28, height: 1, background: T.gold }} />
          <span style={{
            fontSize: 11, letterSpacing: "0.25em",
            color: T.gold, textTransform: "uppercase", fontWeight: 500,
          }}>Manajemen Koleksi</span>
        </motion.div>

        <div style={{ overflow: "hidden", marginBottom: 6 }}>
          <motion.h1
            initial={{ y: "100%" }} animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: T.serif, fontWeight: 300,
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              lineHeight: 1.1, margin: 0, color: T.cream,
              letterSpacing: "-0.015em",
            }}
          >
            Daftar <span style={{ fontStyle: "italic", color: T.gold }}>Buku</span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            display: "flex", justifyContent: "space-between",
            alignItems: "center", flexWrap: "wrap", gap: 14,
            marginTop: 24,
          }}
        >
          <div style={{ position: "relative", maxWidth: 320, flex: 1 }}>
            <span style={{
              position: "absolute", left: 14, top: "50%",
              transform: "translateY(-50%)",
              fontSize: 13, color: T.muted, pointerEvents: "none",
            }}><FaSearch /></span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Cari judul atau penulis..."
              style={{
                width: "100%", background: T.darkCard,
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: 100, padding: "9px 16px 9px 38px",
                color: T.cream, fontFamily: T.sans,
                fontSize: 13, outline: "none", boxSizing: "border-box",
              }}
              onFocus={e => e.target.style.borderColor = "rgba(201,168,76,0.45)"}
              onBlur={e  => e.target.style.borderColor = "rgba(201,168,76,0.15)"}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              fontFamily: T.sans, fontSize: 12, color: T.muted,
            }}>
              <span style={{ color: T.gold }}>{filtered.length}</span> dari {buku.length} buku
            </span>

            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <NavLink
                to="/dashboard/buku/add"
                style={{
                  background: `linear-gradient(135deg, ${T.gold}, #A8832E)`,
                  color: T.dark, textDecoration: "none",
                  borderRadius: 100, padding: "10px 24px",
                  fontSize: 13, fontFamily: T.sans,
                  fontWeight: 700, letterSpacing: "0.06em",
                  display: "inline-flex", alignItems: "center", gap: 6,
                  boxShadow: `0 4px 20px rgba(201,168,76,0.2)`,
                  whiteSpace: "nowrap",
                }}
              >+ Tambah Buku</NavLink>
            </motion.div>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{
          height: 1, marginBottom: 28,
          background: "linear-gradient(90deg, rgba(201,168,76,0.3), rgba(201,168,76,0.05), transparent)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.6 }}
        style={{
          background: T.darkCard,
          border: "1px solid rgba(201,168,76,0.1)",
          borderRadius: 20, overflow: "hidden",
          position: "relative",
        }}
      >
        <div style={{
          position: "absolute", top: -1, left: "20%", right: "20%",
          height: 2,
          background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)`,
        }} />

        <div style={{ overflowX: "auto" }}>
          <table style={{
            width: "100%", borderCollapse: "collapse",
            fontFamily: T.sans, fontSize: 13,
          }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(201,168,76,0.1)" }}>
                {["No","Foto","Judul Buku","Deskripsi","Stok","Tgl Terbit","Aksi"].map((h, i) => (
                  <th key={i} style={{
                    padding: "14px 16px",
                    textAlign: i === 0 ? "center" : "left",
                    fontFamily: T.sans, fontSize: 11,
                    fontWeight: 500, letterSpacing: "0.15em",
                    color: T.muted, textTransform: "uppercase",
                    whiteSpace: "nowrap",
                    background: "rgba(201,168,76,0.03)",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {loading && Array.from({ length: 5 }, (_, i) => <SkeletonRow key={i} i={i} />)}

              {!loading && filtered.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.04, duration: 0.4 }}
                  style={{
                    borderBottom: "1px solid rgba(201,168,76,0.06)",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(201,168,76,0.04)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "14px 16px", textAlign: "center", color: T.muted, fontSize: 12 }}>
                    {index + 1}
                  </td>

                  <td style={{ padding: "10px 16px" }}>
                    <div style={{
                      width: 52, height: 68, borderRadius: 6, overflow: "hidden",
                      border: "1px solid rgba(201,168,76,0.15)",
                      background: T.darkMid, flexShrink: 0,
                    }}>
                      <img
                        src={item.foto || "https://via.placeholder.com/100"}
                        alt={item.judul_buku}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        onError={e => e.target.style.display = "none"}
                      />
                    </div>
                  </td>

                  <td style={{ padding: "14px 16px", maxWidth: 160 }}>
                    <div style={{
                      fontFamily: T.serif, fontSize: "0.95rem",
                      fontWeight: 600, color: T.cream,
                      overflow: "hidden", display: "-webkit-box",
                      WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                    }}>{item.judul_buku}</div>
                  </td>
                  <td style={{ padding: "14px 16px", maxWidth: 180 }}>
                    <span style={{
                      color: T.muted, fontSize: 12, lineHeight: 1.5,
                      overflow: "hidden", display: "-webkit-box",
                      WebkitLineClamp: 2, WebkitBoxOrient: "vertical",
                    }}>{item.deskripsi || "—"}</span>
                  </td>

                  <td style={{ padding: "14px 16px" }}>
                    <span style={{
                      background: Number(item.stok) > 0
                        ? "rgba(30,77,43,0.3)"
                        : "rgba(192,81,74,0.15)",
                      border: `1px solid ${Number(item.stok) > 0
                        ? "rgba(30,77,43,0.5)"
                        : "rgba(192,81,74,0.3)"}`,
                      color: Number(item.stok) > 0 ? "#6FCF97" : T.danger,
                      borderRadius: 100, padding: "3px 12px",
                      fontSize: 12, fontWeight: 500,
                      whiteSpace: "nowrap",
                    }}>
                      {item.stok} pcs
                    </span>
                  </td>

                  <td style={{ padding: "14px 16px", color: T.muted, fontSize: 12, whiteSpace: "nowrap" }}>
                    {item.tgl_terbit
                      ? new Date(item.tgl_terbit).toLocaleDateString("id-ID", {
                          day: "numeric", month: "short", year: "numeric"
                        })
                      : "—"}
                  </td>

                  

                  

                  

                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <motion.button
                        whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.95 }}
                        onClick={() => navigate(`/dashboard/buku/edit/${item.id}`)}
                        style={{
                          background: "rgba(201,168,76,0.1)",
                          border: "1px solid rgba(201,168,76,0.25)",
                          borderRadius: 8, padding: "6px 14px",
                          color: T.gold, fontFamily: T.sans,
                          fontSize: 12, fontWeight: 500,
                          cursor: "pointer", whiteSpace: "nowrap",
                          transition: "background 0.2s",
                        }}
                      ><RiPencilFill /> Edit</motion.button>

                      <motion.button
                        whileHover={{ scale: 1.06, background: "rgba(192,81,74,0.15)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setDeleteTarget({ id: item.id, title: item.judul_buku })}
                        style={{
                          background: "rgba(192,81,74,0.08)",
                          border: "1px solid rgba(192,81,74,0.25)",
                          borderRadius: 8, padding: "6px 14px",
                          color: T.danger, fontFamily: T.sans,
                          fontSize: 12, fontWeight: 500,
                          cursor: "pointer", whiteSpace: "nowrap",
                          transition: "background 0.2s",
                        }}
                      ><MdDelete /> Hapus</motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}

              {!loading && filtered.length === 0 && (
                <tr>
                  <td colSpan={10} style={{ padding: "60px 20px", textAlign: "center" }}>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <div style={{ fontSize: 40, marginBottom: 16 }}><PiMailboxFill/></div>
                      <h4 style={{
                        fontFamily: T.serif, fontWeight: 300,
                        color: T.cream, margin: "0 0 8px", fontSize: "1.3rem",
                      }}>
                        {search ? "Buku tidak ditemukan" : "Belum ada buku"}
                      </h4>
                      <p style={{
                        color: T.muted, fontFamily: T.sans,
                        fontSize: 13, margin: 0,
                      }}>
                        {search
                          ? `Tidak ada hasil untuk "${search}"`
                          : "Mulai tambahkan buku ke koleksi perpustakaan."}
                      </p>
                    </motion.div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      <AnimatePresence>
        {deleteTarget && (
          <DeleteModal
            bookTitle={deleteTarget.title}
            onConfirm={confirmDelete}
            onCancel={() => setDeleteTarget(null)}
          />
        )}
      </AnimatePresence>

      <style>{`
        input::placeholder { color: ${T.muted}; opacity: 0.6; }
        tr { cursor: default; }
      `}</style>
    </div>
  );
};

export default Buku;