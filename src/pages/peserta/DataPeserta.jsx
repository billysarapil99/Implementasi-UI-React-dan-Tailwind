import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../../config/Constants";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/Button";

function DataPeserta() {
  const [peserta, setPeserta] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${baseUrl}/peserta`, {
        headers: user?.accessToken
          ? { Authorization: `Bearer ${user.accessToken}` }
          : {},
      });
      const list = Array.isArray(res.data) ? res.data : res.data?.data || [];
      const dataWithNo = list.map((item, index) => ({
        ...item,
        no: index + 1,
      }));
      setPeserta(dataWithNo);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (pesertaItem) => {
    const konfirmasi = confirm(
      `Yakin ingin menghapus data peserta "${pesertaItem.nama || pesertaItem.id}"?`
    );
    if (!konfirmasi) return;
    try {
      await axios.delete(`${baseUrl}/peserta/${pesertaItem.id}`, {
        headers: user?.accessToken
          ? { Authorization: `Bearer ${user.accessToken}` }
          : {},
      });
      fetchData();
    } catch (err) {
      alert("Gagal menghapus data peserta.");
    }
  };

  const columns = [
    { header: "No.", accessor: "no" },
    { header: "Nama", accessor: "nama" },
    { header: "Status", accessor: "status" },
    {
      header: "Aksi",
      accessor: "actions",
      render: (row) => (
        <div className="flex gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => navigate(`/peserta/detail/${row.id}`)}
          >
            Detail
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={() => navigate(`/peserta/edit/${row.id}`)}
          >
            Edit
          </Button>
          <Button
            type="button"
            variant="danger"
            onClick={() => handleDelete(row)}
          >
            Hapus
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Data Peserta</h2>
      <div className="mb-4">
        <Button type="button" onClick={() => navigate("/peserta/tambah")}>
          Tambah Peserta
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b">
                {columns.map((col) => (
                  <th key={col.accessor} className="py-2 px-3">
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {peserta.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="py-4 px-3 text-center">
                    Belum ada data peserta.
                  </td>
                </tr>
              ) : (
                peserta.map((row, rowIndex) => (
                  <tr key={row.id ?? rowIndex} className="border-b">
                    {columns.map((col) => (
                      <td key={col.accessor} className="py-2 px-3">
                        {col.render ? col.render(row) : row[col.accessor]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default DataPeserta;