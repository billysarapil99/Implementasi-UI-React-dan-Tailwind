import { useState, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";

function Form({ data = { nama: "", status: "" }, mode = "create", onSubmit, onClose }) {
  const [form, setForm] = useState({
    nama: data?.nama || "",
    status: data?.status || "",
  });

  const isReadOnly = mode === "detail";

  useEffect(() => {
    setForm({
      nama: data?.nama || "",
      status: data?.status || "",
    });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isReadOnly) {
      if (onClose) onClose();
      return;
    }
    if (onSubmit) {
      onSubmit(form);
    }
  };

  const titleMap = {
    create: "Tambah Data Peserta",
    edit: "Edit Data Peserta",
    detail: "Detail Data Peserta",
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-blue-600">
        {titleMap[mode] || "Form Data Peserta"}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nama</label>
          <Input
            type="text"
            name="nama"
            value={form.nama}
            onChange={handleChange}
            placeholder="Masukkan nama peserta"
            disabled={isReadOnly}
            required={!isReadOnly}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Status</label>
          <Input
            type="text"
            name="status"
            value={form.status}
            onChange={handleChange}
            placeholder="Contoh: Aktif / Selesai"
            disabled={isReadOnly}
            required={!isReadOnly}
          />
        </div>

        <div className="flex gap-2 pt-2">
          {!isReadOnly && (
            <Button type="submit" variant="primary">
              {mode === "edit" ? "Update" : "Simpan"}
            </Button>
          )}
          {onClose && (
            <Button type="button" variant="secondary" onClick={onClose}>
              {isReadOnly ? "Kembali" : "Batal"}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Form;