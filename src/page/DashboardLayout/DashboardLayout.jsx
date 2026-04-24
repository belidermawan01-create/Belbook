import { useState } from "react";
import "./DashboardLayout.css";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import NavbarAdmin from "../../components/NavbarAdmin/NavbarAdmin";

const DashboardLayout = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <NavbarAdmin search={search} setSearch={setSearch} />
        <main className="dashboard-content">
          <Outlet context={{ search }} />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
