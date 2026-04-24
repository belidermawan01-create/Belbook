import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import editProduk from "../../assets/monyet.png";
import "./EditBuku.css";

const EditBuku = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [namaBuku, setNamaBuku] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [stok, setStok] = useState(0);
  const [tanggalTerbit, setTanggalTerbit] = useState("");

  const [genre, setGenre] = useState("");
  const [penulis, setPenulis] = useState("");
  const [penerbit, setPenerbit] = useState("");

  const [genreList, setGenreList] = useState([]);
  const [penulisList, setPenulisList] = useState([]);
  const [penerbitList, setPenerbitList] = useState([]);

  const [gambar, setGambar] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBukuById();
    getGenre();
    getPenulis();
    getPenerbit();
  }, []);

  const getBukuById = async () => {
  setLoading(true);
  try {
    const res = await axios.get(`/buku/cari/${id}`);
    const data = res.data.data;

    console.log("DATA BUKU:", data); 

    setNamaBuku(data.judul_buku || "");
    setDeskripsi(data.deskripsi || "");
    setStok(data.stok || 0);
    setTanggalTerbit(data.tgl_terbit || "");

    setGenre(String(data.genre_id || ""));
    setPenulis(String(data.penulis_id || ""));
    setPenerbit(String(data.penerbit_id || ""));

    setPreview(data.foto || null);
  } catch (err) {
    console.log(err.response);
  } finally {
    setLoading(false);
  }
};

  const getGenre = async () => {
    try {
      const res = await axios.get(`/genre`);
      setGenreList(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const getPenulis = async () => {
    try {
      const res = await axios.get(`/penulis`);
      setPenulisList(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const getPenerbit = async () => {
    try {
      const res = await axios.get(`/penerbit`);
      setPenerbitList(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.patch(
        `/buku/update/${id}`,
        {
          judul_buku: namaBuku,
          deskripsi,
          stok,
          tgl_terbit: tanggalTerbit,
          genre_id: genre,
          penulis_id: penulis,
          penerbit_id: penerbit,
          foto: gambar,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      navigate(-1);
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    setGambar(file);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <div>
      <h3>Edit Buku</h3>

      <div className="add-buku-layout">
        <div className="image-side">
          <img src={editProduk} alt="preview" />
        </div>

        <div className="form-side">
          <form onSubmit={handleSubmit}>
            <div>
              <label>Foto</label>
              <input type="file" onChange={handleChangeImage} />
              {preview && <img src={preview} width={200} />}
            </div>

            <div>
              <label>Judul</label>
              <input
                value={namaBuku}
                onChange={(e) => setNamaBuku(e.target.value)}
              />
            </div>

            <div>
              <label>Deskripsi</label>
              <input
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
              />
            </div>

            <div>
              <label>Stok</label>
              <input
                type="number"
                value={stok}
                onChange={(e) => setStok(e.target.value)}
              />
            </div>

            <div>
              <label>Tanggal</label>
              <input
                type="date"
                value={tanggalTerbit}
                onChange={(e) => setTanggalTerbit(e.target.value)}
              />
            </div>

            <div>
              <label>Genre</label>
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                <option value="">Pilih</option>
                {Array.isArray(genreList) &&
                  genreList.map((item) => (
                    <option key={item.id} value={String(item.id)}>
  {item.nama_genre}
</option>
                  ))}
              </select>
            </div>

            <div>
              <label>Penulis</label>
              <select
                value={penulis}
                onChange={(e) => setPenulis(e.target.value)}
              >
                <option value="">Pilih</option>
                {Array.isArray(penulisList) &&
                  penulisList.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nama_penulis}
                    </option>
                  ))}
              </select>
            </div>

            <div>
              <label>Penerbit</label>
              <select
                value={penerbit}
                onChange={(e) => setPenerbit(e.target.value)}
              >
                <option value="">Pilih</option>
                {Array.isArray(penerbitList) &&
                  penerbitList.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.nama_penerbit}
                    </option>
                  ))}
              </select>
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Loading..." : "Simpan"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBuku;