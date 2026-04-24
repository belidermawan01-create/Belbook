import { Route, Routes } from "react-router-dom";
import Home from "./page/Home/Home";
import DaftarBuku from "./page/DaftarBuku/DaftarBuku";
import Login from "./page/Login/Login";
import DaftarBukuAdmin from "./page/DaftarBukuAdmin/DaftarBukuAdmin";
import AddBuku from "./page/DaftarBukuAdmin/AddBukuu";
import DashboardLayout from "./page/DashboardLayout/DashboardLayout.jsx";
import Buku from "./page/Buku/Buku.jsx";
import EditBuku from "./page/Buku/EditBuku.jsx";
import Dashboard from "./page/Dashboard/Dashboard.jsx";
import AddBukuu from "./page/DaftarBukuAdmin/AddBukuu";

function App() {
  return (
    <Routes>
       <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="daftarBuku" element={<DaftarBuku />} />
      <Route path="daftarBukuAdmin" element={<DaftarBukuAdmin />} />
      <Route path="daftarBukuAdmin/add" element={<AddBuku />} />

      <Route path="dashboard/" element={<DashboardLayout/>}>
      {/* Buku*/}
        <Route path="/dashboard/dashboardd" element={<Dashboard/>} />
        <Route path="/dashboard/buku" element={<Buku />} />
        <Route path="/dashboard/buku/add" element={<AddBukuu />} />
        <Route path="/dashboard/buku/edit/:id" element={<EditBuku />} />

      </Route>
    </Routes>
  );
}

export default App;
