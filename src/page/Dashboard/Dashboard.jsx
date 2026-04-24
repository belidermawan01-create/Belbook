import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import axios from "axios";
import Footer from "../../components/Footer/Footer";
import { FaBookOpen, FaChartLine, FaStar} from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
/*
  Selaras dengan Home.jsx, Navbar, DaftarBuku, Login, Sidebar
  Dark Luxury Library theme — token warna & font identik.
*/

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

/* ── Stat card ── */
const StatCard = ({ icon, label, value, sub, delay, accent }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    whileHover={{ y: -5, borderColor: "rgba(201,168,76,0.4)" }}
    style={{
      background:   T.darkCard,
      border:       "1px solid rgba(201,168,76,0.1)",
      borderRadius: 18,
      padding:      "28px 24px",
      position:     "relative",
      overflow:     "hidden",
      transition:   "border-color 0.3s ease",
    }}
  >
    {/* Corner glow */}
    <div style={{
      position:   "absolute", top: -30, right: -30,
      width:      100, height: 100, borderRadius: "50%",
      background: `radial-gradient(circle, ${accent || "rgba(201,168,76,0.12)"}, transparent 70%)`,
      pointerEvents: "none",
    }} />

    <div style={{
      width: 40, height: 40, borderRadius: 10,
      background: `${accent || "rgba(201,168,76,0.1)"}`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 18, marginBottom: 16,
    }}>{icon}</div>

    <div style={{
      fontFamily: T.serif, fontSize: "2.2rem",
      fontWeight: 600, color: T.cream, lineHeight: 1,
      marginBottom: 4,
    }}>{value}</div>

    <div style={{
      fontFamily: T.sans, fontSize: 13,
      color: T.cream, fontWeight: 500, marginBottom: 2,
    }}>{label}</div>

    {sub && (
      <div style={{
        fontFamily: T.sans, fontSize: 11,
        color: T.muted, letterSpacing: "0.04em",
      }}>{sub}</div>
    )}
  </motion.div>
);

/* ── Custom tooltip for chart ── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background:   T.darkCard,
      border:       "1px solid rgba(201,168,76,0.25)",
      borderRadius: 10,
      padding:      "10px 16px",
      fontFamily:   T.sans,
    }}>
      <p style={{ color: T.muted, fontSize: 11, margin: "0 0 4px", letterSpacing: "0.06em" }}>
        {label}
      </p>
      <p style={{ color: T.gold, fontSize: 16, fontFamily: T.serif, fontWeight: 600, margin: 0 }}>
        {payload[0].value} <span style={{ fontSize: 11, color: T.muted }}>buku</span>
      </p>
    </div>
  );
};

/* ════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════ */
const Dashboard = () => {
  const navigate = useNavigate();
  const [buku, setBuku] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchBuku(); }, []);

  const fetchBuku = async () => {
    try {
      const res = await axios.get("/api/buku");
      setBuku(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* 7-day chart data */
  const grafikData = useMemo(() => {
    const today = new Date();
    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(today.getDate() - (6 - i));
      const nextDate = new Date(date);
      nextDate.setDate(date.getDate() + 1);
      const tgl = date.toLocaleDateString("id-ID", { day: "numeric", month: "short" });
      const jumlah = buku.filter((p) => {
        if (!p.createdAt) return false;
        const c = new Date(p.createdAt);
        return c >= date && c < nextDate;
      }).length;
      return { tgl, jumlah };
    });
  }, [buku]);

  const totalMingguIni = grafikData.reduce((s, d) => s + d.jumlah, 0);
  const hariTertinggi  = grafikData.reduce((a, b) => b.jumlah > a.jumlah ? b : a, grafikData[0] || {});

  const stats = [
    {
      icon: <FaBookOpen />, label: "Total Buku",
      value: loading ? "—" : buku.length,
      sub: "Dalam koleksi",
      accent: "rgba(201,168,76,0.12)",
      delay: 0.3,
    },
    {
      icon: <FaChartLine />, label: "Ditambahkan Minggu Ini",
      value: loading ? "—" : totalMingguIni,
      sub: "7 hari terakhir",
      accent: "rgba(30,77,43,0.25)",
      delay: 0.42,
    },
    {
      icon: <FaStar />, label: "Hari Terbanyak",
      value: loading ? "—" : (hariTertinggi?.tgl || "—"),
      sub: `${hariTertinggi?.jumlah || 0} buku ditambahkan`,
      accent: "rgba(201,168,76,0.08)",
      delay: 0.54,
    },
  ];

  return (
    <div style={{
      background:  T.dark,
      minHeight:   "100vh",
      fontFamily:  T.sans,
      color:       T.cream,
      overflowX:   "hidden",
    }}>

      {/* ════════ PAGE HEADER ════════ */}
      <div style={{
        padding:    "40px clamp(24px, 4vw, 56px) 0",
        position:   "relative",
      }}>
        {/* Background glow */}
        <div style={{
          position:      "absolute", top: 0, left: 0, right: 0, height: 260,
          background:    "radial-gradient(ellipse 70% 80% at 30% 0%, rgba(30,77,43,0.16) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Overline */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16, position: "relative" }}
        >
          <div style={{ width: 28, height: 1, background: T.gold }} />
          <span style={{
            fontSize: 11, letterSpacing: "0.25em",
            color: T.gold, textTransform: "uppercase",
            fontWeight: 500,
          }}>Admin Panel</span>
        </motion.div>

        {/* Title */}
        <div style={{ overflow: "hidden", marginBottom: 6, position: "relative" }}>
          <motion.h1
            initial={{ y: "100%" }} animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: T.serif, fontWeight: 300,
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              lineHeight: 1.1, margin: 0, color: T.cream,
              letterSpacing: "-0.015em",
            }}
          >
            Selamat Datang,{" "}
            <span style={{ fontStyle: "italic", color: T.gold }}>Admin</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            color: T.muted, fontSize: "0.9rem", lineHeight: 1.6,
            margin: "0 0 36px", fontWeight: 300,
            position: "relative",
          }}
        >
          {new Date().toLocaleDateString("id-ID", {
            weekday: "long", day: "numeric",
            month: "long", year: "numeric",
          })}
        </motion.p>

        {/* Gold divider */}
        <motion.div
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            height: 1, marginBottom: 40, position: "relative",
            background: "linear-gradient(90deg, rgba(201,168,76,0.3), rgba(201,168,76,0.05), transparent)",
          }}
        />
      </div>

      <div style={{ padding: "0 clamp(24px, 4vw, 56px) 60px" }}>

        {/* ════════ STAT CARDS ════════ */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 20, marginBottom: 40,
        }}>
          {stats.map((s, i) => <StatCard key={i} {...s} />)}
        </div>

        {/* ════════ CHART CARD ════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background:   T.darkCard,
            border:       "1px solid rgba(201,168,76,0.1)",
            borderRadius: 20,
            padding:      "32px 28px",
            marginBottom: 28,
            position:     "relative",
            overflow:     "hidden",
          }}
        >
          {/* Top glow rule */}
          <div style={{
            position:   "absolute", top: -1, left: "20%", right: "20%",
            height:     2,
            background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)`,
          }} />
          <div style={{
            position:      "absolute", top: 0, left: "15%", right: "15%",
            height:        80,
            background:    `radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07), transparent)`,
            pointerEvents: "none",
          }} />

          {/* Chart header */}
          <div style={{
            display:       "flex",
            justifyContent:"space-between",
            alignItems:    "flex-start",
            marginBottom:  28,
            flexWrap:      "wrap",
            gap:           12,
            position:      "relative",
          }}>
            <div>
              <div style={{
                fontFamily: T.sans, fontSize: 11,
                letterSpacing: "0.2em", color: T.muted,
                textTransform: "uppercase", marginBottom: 6,
              }}>Statistik Penambahan</div>
              <h3 style={{
                fontFamily: T.serif, fontWeight: 600,
                fontSize: "1.4rem", color: T.cream, margin: 0,
              }}>
                Buku Ditambahkan{" "}
                <span style={{ fontStyle: "italic", color: T.gold }}>7 Hari Terakhir</span>
              </h3>
            </div>

            {/* Total badge */}
            <div style={{
              background:   "rgba(201,168,76,0.08)",
              border:       "1px solid rgba(201,168,76,0.2)",
              borderRadius: 100,
              padding:      "8px 18px",
              display:      "flex",
              alignItems:   "center",
              gap:          8,
            }}>
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: 7, height: 7, borderRadius: "50%",
                  background: T.gold, display: "inline-block",
                }}
              />
              <span style={{
                fontFamily: T.sans, fontSize: 12,
                color: T.gold, fontWeight: 500,
              }}>
                Total: {totalMingguIni} buku
              </span>
            </div>
          </div>

          {/* Chart */}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={grafikData} barSize={32}>
              <defs>
                <linearGradient id="barGold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%"   stopColor={T.goldLt} stopOpacity={1} />
                  <stop offset="100%" stopColor="#7A5010"  stopOpacity={0.8} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(201,168,76,0.08)"
                vertical={false}
              />
              <XAxis
                dataKey="tgl"
                tick={{ fill: T.muted, fontSize: 12, fontFamily: T.sans }}
                axisLine={{ stroke: "rgba(201,168,76,0.1)" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: T.muted, fontSize: 12, fontFamily: T.sans }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(201,168,76,0.05)" }} />
              <Bar
                dataKey="jumlah"
                name="Jumlah Buku"
                fill="url(#barGold)"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* ════════ ACTION ROW ════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
        >
          <motion.button
            whileHover={{ scale: 1.04, boxShadow: `0 0 36px rgba(201,168,76,0.3)` }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/daftarBukuAdmin")}
            style={{
              background:    `linear-gradient(135deg, ${T.gold}, #A8832E)`,
              color:         T.dark,
              border:        "none",
              borderRadius:  100,
              padding:       "13px 32px",
              fontSize:      13,
              fontFamily:    T.sans,
              fontWeight:    700,
              cursor:        "pointer",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              boxShadow:     `0 4px 20px rgba(201,168,76,0.2)`,
            }}
          >
            <FaBookOpen /> DetailBuku
          </motion.button>

          <motion.button
            whileHover={{ borderColor: "rgba(201,168,76,0.45)", color: T.cream }}
            whileTap={{ scale: 0.97 }}
            onClick={fetchBuku}
            style={{
              background:    "transparent",
              border:        "1px solid rgba(201,168,76,0.2)",
              borderRadius:  100,
              padding:       "13px 28px",
              color:         T.muted,
              fontFamily:    T.sans,
              fontSize:      13,
              fontWeight:    500,
              cursor:        "pointer",
              letterSpacing: "0.05em",
              transition:    "border-color 0.25s, color 0.25s",
            }}
          >
            <FiRefreshCcw />  Refresh Data
          </motion.button>
        </motion.div>

      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;