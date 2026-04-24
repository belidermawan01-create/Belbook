import { NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBook, FaPen, FaBuilding, FaUser,
  FaChevronDown, FaList, FaHistory,
} from "react-icons/fa";
import { IoStatsChartSharp } from "react-icons/io5";
import { useState } from "react";
import { RiAdminFill } from "react-icons/ri";
import Logooo from "../../assets/Logooo.png";


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

const linkBase = {
  display:        "flex",
  alignItems:     "center",
  gap:            10,
  padding:        "10px 16px",
  borderRadius:   10,
  textDecoration: "none",
  fontFamily:     T.sans,
  fontSize:       13,
  fontWeight:     400,
  letterSpacing:  "0.03em",
  color:          T.muted,
  transition:     "color 0.2s ease, background 0.2s ease",
  position:       "relative",
  overflow:       "hidden",
};

const NavItem = ({ to, icon: Icon, label, end = false, delay = 0 }) => (
  <motion.li
    initial={{ opacity: 0, x: -16 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    style={{ listStyle: "none" }}
  >
    <NavLink
      to={to}
      end={end}
      style={({ isActive }) => ({
        ...linkBase,
        color:      isActive ? T.gold    : T.muted,
        background: isActive ? "rgba(201,168,76,0.08)" : "transparent",
        fontWeight: isActive ? 500 : 400,
        borderLeft: isActive ? `2px solid ${T.gold}` : "2px solid transparent",
      })}
    >
      {({ isActive }) => (
        <>
          <span style={{
            fontSize:   15,
            color:      isActive ? T.gold : T.muted,
            flexShrink: 0,
            transition: "color 0.2s",
          }}>
            <Icon />
          </span>
          <span>{label}</span>

          {isActive && (
            <motion.span
              layoutId="active-dot"
              style={{
                marginLeft:   "auto",
                width:        5,
                height:       5,
                borderRadius: "50%",
                background:   T.gold,
                flexShrink:   0,
              }}
            />
          )}
        </>
      )}
    </NavLink>
  </motion.li>
);

const NavGroup = ({ icon: Icon, label, children, defaultOpen = false, delay = 0 }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <motion.li
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{ listStyle: "none" }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          ...linkBase,
          width:      "100%",
          background: "transparent",
          border:     "none",
          cursor:     "pointer",
          color:      T.muted,
          borderLeft: "2px solid transparent",
          justifyContent: "flex-start",
        }}
      >
        <span style={{ fontSize: 14, flexShrink: 0 }}><Icon /></span>
        <span style={{ flex: 1, textAlign: "left" }}>{label}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ fontSize: 10, flexShrink: 0 }}
        >
          <FaChevronDown />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{
              overflow: "hidden", margin: 0,
              padding: "4px 0 4px 28px",
              listStyle: "none",
            }}
          >
            {children}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.li>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <motion.aside
      initial={{ x: -280, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      style={{
        width:         260,
        minHeight:     "100vh",
        background:    T.darkCard,
        borderRight:   "1px solid rgba(201,168,76,0.1)",
        display:       "flex",
        flexDirection: "column",
        position:      "sticky",
        top:           0,
        fontFamily:    T.sans,
        flexShrink:    0,
      }}
    >
      <div style={{
        position:   "absolute",
        top:        -1, left: "15%", right: "15%",
        height:     2,
        background: `linear-gradient(90deg, transparent, ${T.gold}, transparent)`,
      }} />
      <div style={{
        position:       "absolute",
        top:            0, left: "10%", right: "10%",
        height:         100,
        background:     `radial-gradient(ellipse at 50% 0%, rgba(201,168,76,0.07), transparent)`,
        pointerEvents:  "none",
      }} />

      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        style={{
          padding:        "28px 24px 24px",
          display:        "flex",
          alignItems:     "center",
          gap:            10,
          borderBottom:   "1px solid rgba(201,168,76,0.08)",
          position:       "relative",
          zIndex:         1,
        }}
      >
        <div style={{
          width:          36,
          height:         36,
          borderRadius:   8,
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          fontSize:       18,
          flexShrink:     0,
        }}>
          <img style={{width:"35px"}} src={Logooo} alt="" />
        </div>

        <div>
          <h2 style={{
            fontFamily:    T.serif,
            fontSize:      "1.25rem",
            fontWeight:    600,
            color:         T.cream,
            margin:        0,
            lineHeight:    1.1,
            letterSpacing: "0.01em",
          }}>
            Bel<span style={{ fontStyle: "italic", color: T.gold }}>book</span>
          </h2>
          <p style={{
            fontFamily:    T.sans,
            fontSize:      10,
            color:         T.muted,
            margin:        0,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            marginTop:     2,
          }}>Admin Panel</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.45 }}
        style={{
          padding:       "20px 24px 8px",
          display:       "flex",
          alignItems:    "center",
          gap:           10,
        }}
      >
        <div style={{ width: 20, height: 1, background: T.gold, opacity: 0.5 }} />
        <span style={{
          fontSize:      10,
          letterSpacing: "0.2em",
          color:         T.muted,
          textTransform: "uppercase",
          fontWeight:    500,
        }}>Menu Utama</span>
      </motion.div>

      <nav style={{ padding: "0 12px", flex: 1 }}>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 2 }}>

          <NavItem to="/dashboard/dashboardd"      icon={IoStatsChartSharp} label="Dashboard" end delay={0.5} />
          <NavItem to="/dashboard/buku" icon={FaBook}            label="Buku"          delay={0.58} />

        

        </ul>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        style={{
          padding:     "16px 16px 24px",
          borderTop:   "1px solid rgba(201,168,76,0.08)",
          marginTop:   "auto",
        }}
      >
        <div style={{
          display:      "flex",
          alignItems:   "center",
          gap:          10,
          padding:      "12px 14px",
          background:   "rgba(201,168,76,0.05)",
          border:       "1px solid rgba(201,168,76,0.1)",
          borderRadius: 12,
          marginBottom: 10,
        }}>
          <div style={{
            width:          32,
            height:         32,
            borderRadius:   "50%",
            background:     `linear-gradient(135deg, ${T.green}, #0A2E16)`,
            border:         `1px solid rgba(201,168,76,0.25)`,
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            fontSize:       14,
            flexShrink:     0,
            color: "white"
          }}><RiAdminFill /></div>
          <div>
            <div style={{
              fontFamily: T.sans, fontSize: 12,
              color: T.cream, fontWeight: 500,
              lineHeight: 1.2,
            }}>Admin</div>
            <div style={{
              fontFamily: T.sans, fontSize: 10,
              color: T.muted, letterSpacing: "0.05em",
            }}>Administrator</div>
          </div>
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            style={{
              marginLeft:   "auto",
              width:        7,
              height:       7,
              borderRadius: "50%",
              background:   "#4CAF82",
              flexShrink:   0,
            }}
          />
        </div>

        <motion.button
          whileHover={{ borderColor: "rgba(201,168,76,0.45)", color: T.cream }}
          whileTap={{ scale: 0.97 }}
          onClick={handleLogout}
          style={{
            width:         "100%",
            background:    "transparent",
            border:        "1px solid rgba(201,168,76,0.15)",
            borderRadius:  10,
            padding:       "9px 16px",
            color:         T.muted,
            fontFamily:    T.sans,
            fontSize:      12,
            fontWeight:    500,
            cursor:        "pointer",
            letterSpacing: "0.06em",
            display:       "flex",
            alignItems:    "center",
            justifyContent:"center",
            gap:           8,
            transition:    "border-color 0.25s ease, color 0.25s ease",
          }}
        >
          <span style={{ fontSize: 12 }}>↩</span>
          Logout
        </motion.button>
      </motion.div>
    </motion.aside>
  );
};

export default Sidebar;