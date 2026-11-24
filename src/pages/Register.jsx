import { useState } from "react";
import { baseUrl } from "../config/Constants";
import axios from "axios";
import Input from "../components/Input";
import Button from "../components/Button";

function Register({ onSwitchToLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Mengirim...");
    try {
      const res = await axios.post(`${baseUrl}/auth/register`, form);
      setStatus(`User ${res.data?.name || form.name} berhasil terdaftar!`);
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setStatus("Gagal mendaftar. Silakan periksa data kembali.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-blue-600 text-center">
        Form Registrasi
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nama Lengkap"
          required
        />
        <Input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <Input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <Button type="submit" variant="primary">
          Daftar
        </Button>
      </form>
      {status && (
        <p className="text-sm text-center text-gray-700 mt-3">{status}</p>
      )}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Sudah punya akun?
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-blue-600 hover:underline ml-1 cursor-pointer"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;