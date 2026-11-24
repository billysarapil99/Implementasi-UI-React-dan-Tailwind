import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { baseUrl } from "../../config/Constants";
import { AuthContext } from "../../context/AuthContext";
import Form from "../../components/Form";

function FormPeserta({ mode = "create" }) {
  const [data, setData] = useState({ nama: "", status: "" });
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if ((mode === "edit" || mode === "detail") && id) {
      axios
        .get(`${baseUrl}/peserta/${id}`, {
          headers: user?.accessToken
            ? { Authorization: `Bearer ${user.accessToken}` }
            : {},
        })
        .then((res) => {
          const detail = res.data?.data || res.data || {};
          setData({
            nama: detail.nama || "",
            status: detail.status || "",
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id, mode, user]);

  const handleSubmit = async (formData) => {
    try {
      const headers = user?.accessToken
        ? { Authorization: `Bearer ${user.accessToken}` }
        : {};

      if (mode === "edit" && id) {
        await axios.put(`${baseUrl}/peserta/${id}`, formData, { headers });
        Swal.fire("Sukses", "Data peserta berhasil diperbarui", "success");
      } else {
        await axios.post(`${baseUrl}/peserta`, formData, { headers });
        Swal.fire("Sukses", "Data peserta berhasil ditambahkan", "success");
      }

      navigate("/peserta");
    } catch (err) {
      Swal.fire(
        "Gagal",
        err.response?.data?.message || "Terjadi kesalahan saat menyimpan data",
        "error"
      );
    }
  };

  return (
    <div className="p-6">
      <Form
        data={data}
        mode={mode}
        onSubmit={handleSubmit}
        onClose={() => navigate("/peserta")}
      />
    </div>
  );
}

export default FormPeserta;