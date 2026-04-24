import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddBukuu = () => {
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

  const getGenre = async () => {
    try {
      const res = await axios.get("/api/genre");
      setGenreList(res.data.data || []);
    } catch (error) {
      console.log("ERROR GENRE:", error);
    }
  };

  const getPenulis = async () => {
    try {
      const res = await axios.get("/api/penulis");
      setPenulisList(res.data.data || []);
    } catch (error) {
      console.log("ERROR PENULIS:", error);
    }
  };

  const getPenerbit = async () => {
    try {
      const res = await axios.get("/api/penerbit");
      setPenerbitList(res.data.data || []);
    } catch (error) {
      console.log("ERROR PENERBIT:", error);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("judul_buku", namaBuku);
    formData.append("deskripsi", deskripsi);
    formData.append("stok", stok);
    formData.append("tgl_terbit", tanggalTerbit);
    formData.append("genre_id", genre);
    formData.append("penulis_id", penulis);
    formData.append("penerbit_id", penerbit);
    formData.append("foto", gambar);

    const res = await axios.post("/api/buku", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("SUCCESS:", res.data);
    alert("Buku berhasil ditambahkan!");
    navigate(-1);
  } catch (error) {
    console.log("ERROR:", error.response?.data || error);
    alert(error.response?.data?.message || "Gagal!");
  } finally {
    setLoading(false);
  }
};

  const handlechangeImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setGambar(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <h3>Tambah Buku</h3>

      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handlechangeImage} />
        {preview && <img src={preview} width={200} />}

        <input
          type="text"
          placeholder="Judul"
          value={namaBuku}
          onChange={(e) => setNamaBuku(e.target.value)}
        />

        <input
          type="text"
          placeholder="Deskripsi"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
        />

        <input
          type="number"
          placeholder="Stok"
          value={stok}
          onChange={(e) => setStok(e.target.value)}
        />

        <input
          type="date"
          value={tanggalTerbit}
          onChange={(e) => setTanggalTerbit(e.target.value)}
        />

        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">Pilih Genre</option>
          {genreList.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nama_genre}
            </option>
          ))}
        </select>

        <select value={penulis} onChange={(e) => setPenulis(e.target.value)}>
          <option value="">Pilih Penulis</option>
          {penulisList.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nama_penulis}
            </option>
          ))}
        </select>

        <select value={penerbit} onChange={(e) => setPenerbit(e.target.value)}>
          <option value="">Pilih Penerbit</option>
          {penerbitList.map((item) => (
            <option key={item.id} value={item.id}>
              {item.nama_penerbit}
            </option>
          ))}
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Simpan"}
        </button>
      </form>
    </div>
  );
};

export default AddBukuu;