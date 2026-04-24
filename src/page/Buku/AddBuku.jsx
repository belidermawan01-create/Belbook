import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import addProductt from "../../assets/monyet.png";
import "./AddBuku.css";

const AddBuku = () => {
  const navigate = useNavigate();

  const [namaBuku, setNamaBuku] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [stok, setStok] = useState("");
  const [tanggalTerbit, setTanggalTerbit] = useState("");
  const [penulis, setPenulis] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [genre, setGenre] = useState("");
  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(null);

  const [genreList, setGenreList] = useState([]);
  const [penulisList, setPenulisList] = useState([]);
  const [penerbitList, setPenerbitList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getGenre();
    getPenulis();
    getPenerbit();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
console.log("KENA SUBMIT BARU");
    try {
      const token = localStorage.getItem("token"); 
console.log(localStorage.getItem("token"));
      const formData = new FormData();
      formData.append("judul_buku", namaBuku);
      formData.append("deskripsi", deskripsi);
      formData.append("stok", stok);
      formData.append("tgl_terbit", tanggalTerbit);
      formData.append("genre_id", genre);
      formData.append("penulis_id", penulis);
      formData.append("penerbit_id", penerbit);

      if (gambar) {
        formData.append("foto", gambar);
      }

      await axios.post("/api/buku", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate(-1);
    } catch (error) {
      console.log("ERROR:", error.response || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handlechangeImage = (e) => {
    const file = e.target.files[0];
    setGambar(file);

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const getGenre = async () => {
    try {
      const res = await axios.get("/api/genre");
      setGenreList(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPenulis = async () => {
    try {
      const res = await axios.get("/api/penulis");
      setPenulisList(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPenerbit = async () => {
    try {
      const res = await axios.get("/api/penerbit");
      setPenerbitList(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="produk-header-tambah">
        <h3>Tambah Buku</h3>
      </div>

      <div className="add-kategori-layout">
        <div className="form-side">
          <form onSubmit={handleSubmit} className="from-wrapper">

            <div className="from-grid">
              <label>Foto</label>
              <input type="file" accept="image/*" onChange={handlechangeImage} />
              {preview && <img src={preview} width={200} />}
            </div>

            <div className="from-grid">
              <label>Judul Buku</label>
              <input
                type="text"
                placeholder="Atomic Habits"
                onChange={(e) => setNamaBuku(e.target.value)}
                required
              />
            </div>

            <div className="from-grid">
              <label>Deskripsi</label>
              <input
                type="text"
                onChange={(e) => setDeskripsi(e.target.value)}
                required
              />
            </div>

            <div className="from-grid">
              <label>Stok</label>
              <input
                type="number"
                onChange={(e) => setStok(e.target.value)}
                required
              />
            </div>

            <div className="from-grid">
              <label>Tanggal Terbit</label>
              <input
                type="date"
                onChange={(e) => setTanggalTerbit(e.target.value)}
                required
              />
            </div>

            <div className="from-grid">
              <label>Genre</label>
              <select value={genre} onChange={(e) => setGenre(e.target.value)} required>
                <option value="">Pilih Genre</option>
                {genreList.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.nama_genre}
                  </option>
                ))}
              </select>
            </div>

            <div className="from-grid">
              <label>Penulis</label>
              <select value={penulis} onChange={(e) => setPenulis(e.target.value)} required>
                <option value="">Pilih Penulis</option>
                {penulisList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nama_penulis}
                  </option>
                ))}
              </select>
            </div>

            <div className="from-grid">
              <label>Penerbit</label>
              <select value={penerbit} onChange={(e) => setPenerbit(e.target.value)} required>
                <option value="">Pilih Penerbit</option>
                {penerbitList.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nama_penerbit}
                  </option>
                ))}
              </select>
            </div>

            <div className="btn-group">
              <button type="button" onClick={() => navigate(-1)}>
                Batal
              </button>

              <button type="submit" disabled={loading}>
                {loading ? "Menyimpan..." : "Simpan"}
              </button>
            </div>

          </form>
        </div>

        <div className="image-side">
          <img src={addProductt} alt="preview" />
        </div>
      </div>
    </div>
  );
};

export default AddBuku;