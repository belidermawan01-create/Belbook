import React from "react";
import { motion } from "framer-motion";
import { FaBook, FaCamera, FaHeart } from "react-icons/fa";
import { IoIosAlarm, IoMdMail } from "react-icons/io";
import Logo from "../../assets/Logooo.png";
import { FaLocationDot } from "react-icons/fa6";
import { RiBookShelfLine } from "react-icons/ri";
import { PiBirdFill } from "react-icons/pi";

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

const links = {
  Navigasi: [
    { label: "Beranda",        href: "/home"       },
    { label: "Daftar Buku",    href: "/daftarBuku" },
    { label: "Tentang Kami",   href: "/about"      },
  ],
  Layanan: [
    { label: "Pinjam Buku",    href: "/daftarBuku" },
    { label: "Riwayat Pinjam", href: "/riwayat"    },
    { label: "Bantuan",        href: "/bantuan"    },
  ],
};

const socials = [
  { icon: <FaBook />, label: "Facebook",  href: "#" },
  { icon: <FaCamera />, label: "Instagram", href: "#" },
  { icon: <PiBirdFill />, label: "Twitter",   href: "#" },
];

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      background:   T.darkMid,
      borderTop:    "1px solid rgba(201,168,76,0.1)",
      fontFamily:   T.sans,
      position:     "relative",
      overflow:     "hidden",
    }}>

      <div style={{
        position:   "absolute",
        top:        -1, left: "20%", right: "20%",
        height:     2,
        background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)`,
        pointerEvents: "none",
      }} />

      <div style={{
        position:      "absolute", inset: 0,
        background:    "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(30,77,43,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth:  1320,
        margin:    "0 auto",
        padding:   "64px clamp(24px, 6vw, 100px) 0",
        position:  "relative",
        zIndex:    1,
      }}>
        <div style={{
          display:             "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap:                 48,
          marginBottom:        56,
        }}
          className="footer-grid"
        >

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              display:     "flex",
              alignItems:  "center",
              gap:         10,
              marginBottom: 20,
            }}>
              <div style={{
                width:          40, height: 40,
                borderRadius:   9,
                display:        "flex",
                alignItems:     "center",
                justifyContent: "center",
                fontSize:       20,
                flexShrink:     0,
              }}>
                <img style={{width:"40px"}} src={Logo} alt="" />
              </div>
              <span style={{
                fontFamily:    T.serif,
                fontSize:      "1.5rem",
                fontWeight:    600,
                color:         T.cream,
                letterSpacing: "0.01em",
              }}>
                Bil<span style={{ fontStyle: "italic", color: T.gold }}>book</span>
              </span>
            </div>

            <p style={{
              color:      T.muted,
              fontSize:   "0.88rem",
              lineHeight: 1.8,
              margin:     "0 0 24px",
              maxWidth:   280,
              fontWeight: 300,
            }}>
              Perpustakaan digital karya Beli Dermawan — menghadirkan ribuan judul
              buku pilihan langsung ke genggamanmu, kapan pun dan di mana pun.
            </p>

            <div style={{ display: "flex", gap: 10 }}>
              {socials.map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  whileHover={{ scale: 1.12, borderColor: "rgba(201,168,76,0.5)" }}
                  whileTap={{ scale: 0.95 }}
                  title={s.label}
                  style={{
                    width:          36, height: 36,
                    borderRadius:   "50%",
                    border:         "1px solid rgba(201,168,76,0.15)",
                    display:        "flex",
                    alignItems:     "center",
                    justifyContent: "center",
                    fontSize:       15,
                    textDecoration: "none",
                    transition:     "border-color 0.25s",
                  }}
                >{s.icon}</motion.a>
              ))}
            </div>
          </motion.div>

          {Object.entries(links).map(([section, items], si) => (
            <motion.div
              key={section}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + si * 0.1 }}
            >
              <div style={{
                display:     "flex",
                alignItems:  "center",
                gap:         10,
                marginBottom: 20,
              }}>
                <div style={{ width: 16, height: 1, background: T.gold, opacity: 0.6 }} />
                <h4 style={{
                  fontFamily:    T.sans,
                  fontSize:      10,
                  letterSpacing: "0.22em",
                  color:         T.gold,
                  margin:        0,
                  textTransform: "uppercase",
                  fontWeight:    500,
                }}>{section}</h4>
              </div>

              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map((link, i) => (
                  <motion.li key={i} whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <a href={link.href} style={{
                      fontFamily:     T.sans,
                      fontSize:       13,
                      color:          T.muted,
                      textDecoration: "none",
                      transition:     "color 0.2s",
                      display:        "flex",
                      alignItems:     "center",
                      gap:            6,
                    }}
                      onMouseEnter={e => e.currentTarget.style.color = T.cream}
                      onMouseLeave={e => e.currentTarget.style.color = T.muted}
                    >
                      <span style={{ color: T.gold, fontSize: 8 }}>✦</span>
                      {link.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div style={{
              display: "flex", alignItems: "center",
              gap: 10, marginBottom: 20,
            }}>
              <div style={{ width: 16, height: 1, background: T.gold, opacity: 0.6 }} />
              <h4 style={{
                fontFamily: T.sans, fontSize: 10,
                letterSpacing: "0.22em", color: T.gold,
                margin: 0, textTransform: "uppercase", fontWeight: 500,
              }}>Kontak</h4>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { icon: <IoMdMail />, text: "admin@bilbook.id" },
                { icon: <FaLocationDot/> , text: "Indonesia" },
                { icon: <IoIosAlarm />, text: "Buka 24/7" },
              ].map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 13, marginTop: 1 }}>{item.icon}</span>
                  <span style={{
                    fontFamily: T.sans, fontSize: 13,
                    color: T.muted, lineHeight: 1.5,
                  }}>{item.text}</span>
                </div>
              ))}
            </div>

            <motion.a
              href="/daftarBuku"
              whileHover={{ scale: 1.04, boxShadow: `0 0 24px rgba(201,168,76,0.25)` }}
              whileTap={{ scale: 0.97 }}
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            6,
                marginTop:      20,
                background:     `linear-gradient(135deg, ${T.gold}, #A8832E)`,
                color:          T.dark,
                textDecoration: "none",
                borderRadius:   100,
                padding:        "9px 20px",
                fontSize:       11,
                fontFamily:     T.sans,
                fontWeight:     700,
                letterSpacing:  "0.08em",
                textTransform:  "uppercase",
                boxShadow:      `0 3px 14px rgba(201,168,76,0.18)`,
              }}
            ><RiBookShelfLine /> Mulai Baca</motion.a>
          </motion.div>

        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          style={{
            borderTop:     "1px solid rgba(201,168,76,0.08)",
            padding:       "20px 0 28px",
            display:       "flex",
            justifyContent:"space-between",
            alignItems:    "center",
            flexWrap:      "wrap",
            gap:           12,
          }}
        >
          <p style={{
            fontFamily: T.sans, fontSize: 12,
            color: T.muted, margin: 0,
          }}>
            © {year}{" "}
            <span style={{ color: T.cream, fontFamily: T.serif, fontStyle: "italic" }}>
              Bilbook
            </span>
            {" "}by Beli Dermawan. All rights reserved.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {["Privasi", "Syarat & Ketentuan"].map((t, i) => (
              <a key={i} href="#" style={{
                fontFamily: T.sans, fontSize: 11,
                color: T.muted, textDecoration: "none",
                letterSpacing: "0.04em",
                transition: "color 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.color = T.gold}
                onMouseLeave={e => e.currentTarget.style.color = T.muted}
              >{t}</a>
            ))}

            <span style={{
              fontFamily: T.sans, fontSize: 11,
              color: T.muted, letterSpacing: "0.04em",
            }}>
              Made with{" "}
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{ display: "inline-block" }}
              ><FaHeart/></motion.span>
            </span>
          </div>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
};

export default Footer;