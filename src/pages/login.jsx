import "../App.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const API_BASE_URL =
    process.env.NODE_ENV === "production"
      ? "https://back-cos-gim3.onrender.com"
      : "http://localhost:5000";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!isLogin && password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setIsLoading(true);

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/create/register";
      const payload = isLogin
        ? { email: email.toLowerCase(), password }
        : { nombre, email: email.toLowerCase(), password, rol: "user" };

      const response = await axios.post(`${API_BASE_URL}${endpoint}`, payload);

      if (response.status === 201) {
        setSuccessMessage("Cuenta creada exitosamente. ¡Ahora puedes iniciar sesión!");
        setNombre("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsLogin(true);
      } else if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("email", email.toLowerCase());
        navigate("/Dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error en el proceso. Intenta nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const phoneNumber = "+5491170587318";
  const message = "Hola, tengo una consulta!.";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="w-screen flex flex-col min-h-screen items-center justify-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-black to-black pt-5 pb-5">

      {/* Logo */}
      <img src="/LOGOS/IMAGOTIPO/amarillo y blanco.png" alt="Logo" className="w-[350px] mb-5 p-4" />

      {/* Botón de WhatsApp */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded-full shadow z-50 flex items-center gap-2 font-bold text-sm"
      >
        <img src="https://i.ibb.co/xKKJDBCS/d62368f7-f3e3-48ce-84cd-04a00024000e.png" alt="Soporte" className="w-6 h-6 rounded-lg" />
        Soporte
      </a>

      {/* Formulario */}
      <div className="bg-black/70 border border-zinc-700 p-8 rounded-2xl shadow-2xl backdrop-blur-md w-11/12 sm:w-1/2">
        <h1 className="text-white text-4xl mb-6 text-center font-bold">
          {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
        </h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {successMessage && <p className="text-green-500 text-center mb-4">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {!isLogin && (
            <div>
              <label className="block text-white mb-1">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full h-12 px-4 rounded-lg bg-gray-200 text-black"
                placeholder="Tu nombre"
                required
              />
            </div>
          )}

          <div>
            <label className="block text-white mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full h-12 px-4 rounded-lg bg-gray-200 text-black"
              placeholder="example@gmail.com"
              required
            />
          </div>

          <div>
            <label className="block text-white mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-12 px-4 rounded-lg bg-gray-200 text-black"
              placeholder="••••••••"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-white mb-1">Repetir Contraseña</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-12 px-4 rounded-lg bg-gray-200 text-black"
                placeholder="••••••••"
                required
              />
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white font-semibold py-3 px-6 rounded-md tracking-wide transition-all duration-200 ease-in-out ${
              isLoading
                ? "bg-gray-700 cursor-not-allowed opacity-50"
                : "bg-gradient-to-br from-zinc-800 to-zinc-900 hover:from-zinc-700 hover:to-zinc-800 hover:ring-2 hover:ring-zinc-400"
            }`}
            style={{
              boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
              fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.05em",
            }}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 mx-auto text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : isLogin ? "Iniciar Sesión" : "Registrarse"}
          </button>
        </form>

        <p className="text-white mt-4 text-center">
          {isLogin ? "¿No tienes cuenta?" : "¿Ya tienes una cuenta?"}{" "}
          <span
            className="text-blue-400 underline cursor-pointer"
            onClick={() => {
              setError("");
              setSuccessMessage("");
              setIsLogin(!isLogin);
            }}
          >
            {isLogin ? "Crear Cuenta" : "Iniciar Sesión"}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Home;
