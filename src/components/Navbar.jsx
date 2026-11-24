import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="font-bold text-lg">
          JobSheet React & Tailwind
        </Link>

        {/* Tombol menu mobile */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden px-2 py-1 border border-white rounded"
        >
          ☰
        </button>

        {/* Menu desktop */}
        <ul className="hidden lg:flex items-center gap-6">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/peserta" className="hover:underline">
              Data Peserta
            </Link>
          </li>
          {user === null ? (
            <>
              <li>
                <Link to="/login" className="hover:underline">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="hover:underline">
                  Register
                </Link>
              </li>
            </>
          ) : (
            <li>
              <button
                type="button"
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm cursor-pointer"
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="lg:hidden px-4 pb-4">
          <ul className="flex flex-col gap-2">
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/peserta" onClick={() => setMenuOpen(false)}>
                Data Peserta
              </Link>
            </li>
            {user === null ? (
              <>
                <li>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" onClick={() => setMenuOpen(false)}>
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;