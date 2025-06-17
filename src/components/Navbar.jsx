import { Menu, X, CircleUserRound } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [opacity, setOpacity] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");

  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://back-cos-gim3.onrender.com"
      : "http://localhost:5000";

  useEffect(() => {
    if (token && email) {
      axios
        .post(`${API_BASE_URL}/api/search/users`, { email }, {
          headers: { Authorization: `Bearer ${token}` }
        })
        .then(res => {
          setUser(res.data);
          localStorage.setItem("rol", res.data.rol);
        })
        .catch(err => console.error("Error al obtener el usuario:", err));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newOpacity = Math.min(scrollY / 300, 0.9);
      setOpacity(newOpacity);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <nav
      className="w-full fixed top-0 z-50 flex items-center justify-between px-4 py-3 transition-colors duration-200"
      style={{ backgroundColor: `rgba(0, 0, 0, ${opacity})` }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src="/LOGOS/IMAGOTIPO/amarillo y blanco.png"
          alt="Logo"
          className="h-12 cursor-pointer"
          onClick={() => handleNavigation("/Dashboard")}
        />
      </div>

      {/* Navegación Desktop */}
      <div className="hidden sm:flex items-center gap-4">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
          <Menu className="w-6 h-6" />
        </button>
        {user?.imagenPerfil ? (
          <img
            src={user.imagenPerfil}
            alt="Foto"
            className="w-8 h-8 rounded-full border object-cover cursor-pointer"
            onClick={() => handleNavigation("/Perfil")}
          />
        ) : (
          <CircleUserRound className="w-6 h-6 text-white cursor-pointer" onClick={() => handleNavigation("/Perfil")} />
        )}
      </div>

      {/* Navegación Mobile */}
      <div className="sm:hidden flex items-center gap-2">
        <button onClick={() => setIsMenuOpen(true)} className="text-white">
          <Menu className="w-8 h-8" />
        </button>
        {user?.imagenPerfil ? (
          <img
            src={user.imagenPerfil}
            alt="Foto"
            className="w-8 h-8 rounded-full border object-cover cursor-pointer"
            onClick={() => handleNavigation("/Perfil")}
          />
        ) : (
          <CircleUserRound className="w-8 text-white h-8" onClick={() => handleNavigation("/Perfil")} />
        )}
      </div>

      {/* Menú lateral */}
      {isMenuOpen && (
        <div className="fixed top-0 right-0 w-2/3 sm:w-1/3 h-full bg-black bg-opacity-95 z-40 flex flex-col p-6">
          <button onClick={() => setIsMenuOpen(false)} className="self-end mb-6">
            <X className="w-6 h-6 text-white" />
          </button>
          <button onClick={() => handleNavigation('/Dashboard')} className="text-white py-2 border-b">Dashboard</button>
          {user?.rol === 'admin' && (
            <>
              <button onClick={() => handleNavigation('/PanelControl')} className="text-white py-2 border-b">Panel de Control</button>
              <button onClick={() => handleNavigation('/Metricas')} className="text-white py-2 border-b">Métricas</button>
            </>
          )}
          <button onClick={() => handleNavigation('/PreguntasFrecuentes')} className="text-white py-2 border-b">Preguntas Frecuentes</button>
          <button onClick={handleLogout} className="text-white py-2 border-b hover:bg-red-800/30">Cerrar sesión</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
