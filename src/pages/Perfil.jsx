import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

function Perfil() {
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [imagenPerfil, setImagenPerfil] = useState('');
  const [successImgMsg, setSuccessImgMsg] = useState('');
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const email = localStorage.getItem('email');
  const token = localStorage.getItem('token');

  const API_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://back-cos-gim3.onrender.com'
    : 'http://localhost:5000';

  useEffect(() => {
    if (!token || !email) return;
    axios.post(`${API_BASE_URL}/api/search/users`, { email }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUser(res.data))
      .catch(err => console.error('Error al obtener usuario:', err));
  }, []);

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) return setMessage('Por favor, completa todos los campos');
    if (newPassword !== confirmPassword) return setMessage('Las contraseñas no coinciden');
    if (newPassword.length < 8) return setMessage('La contraseña debe tener al menos 8 caracteres');

    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/api/update/password/${email}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });
      const data = await res.json();
      setMessage(res.ok ? 'Contraseña actualizada exitosamente' : data.message || 'Error al actualizar');
    } catch (err) {
      console.error('Error:', err);
      setMessage('Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  const scrollToPassword = () => {
    setShowPasswordForm(true);
    setTimeout(() => {
      passwordRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <Navbar toggleMenu={toggleMenu} isMenuOpen={isMenuOpen} />
      <div className="flex flex-col items-center justify-start min-h-screen pt-28 px-4 bg-gradient-to-br from-zinc-950 via-black to-zinc-900 text-white transition-all duration-300">
        {user && (
          <div className="w-full max-w-xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl rounded-2xl px-8 pt-6 pb-6 mb-8 transition-all duration-300">
            <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-br from-yellow-300 to-white tracking-tight">
              Perfil
            </h1>

            <div className="grid gap-6 mb-8 text-center">
              <div className="flex flex-col">
                <span className="text-sm text-gray-400">Nombre</span>
                <span className="text-lg font-semibold">{user.nombre}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-400">Email</span>
                <span className="text-lg font-semibold">{user.email}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-gray-400">Nivel</span>
                <span className="text-lg font-semibold">{user.nivel || 'Principiante'}</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-white/80">
                Mis Cursos
              </h2>
              {user.cursos?.length > 0 ? (
                <div className="p-4 bg-white/5 border border-gray-400/20 rounded-lg space-y-2">
                  {user.cursos.map((curso, i) => (
                    <div key={i} className="text-center font-bold text-white/90">
                      {curso}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-300">Ninguno</p>
              )}
            </div>

            <button
              onClick={scrollToPassword}
              className="w-full bg-gradient-to-r from-yellow-300 to-yellow-500 text-black py-2 rounded-lg font-semibold hover:from-yellow-400 hover:to-yellow-600 transition-colors"
            >
              Cambiar Contraseña
            </button>
          </div>
        )}

        {showPasswordForm && (
          <form
            ref={passwordRef}
            onSubmit={handlePasswordChange}
            className="w-full max-w-md bg-white/5 backdrop-blur-md border border-white/10 shadow-md rounded-xl px-6 pt-6 pb-8 mb-8"
          >
            <h2 className="text-2xl font-bold text-center mb-4">Cambiar Contraseña</h2>
            {message && (
              <p className={`text-sm mb-4 text-center ${message.includes('exitosamente') ? 'text-green-400' : 'text-red-400'}`}>
                {message}
              </p>
            )}
            <input
              disabled
              value={email}
              className="w-full mb-4 bg-gray-800 text-gray-400 p-2 rounded border border-gray-600 cursor-not-allowed"
            />
            <input
              type="password"
              placeholder="Nueva contraseña"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mb-4 p-2 bg-gray-800 text-white rounded border border-gray-600"
            />
            <input
              type="password"
              placeholder="Confirmar contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full mb-6 p-2 bg-gray-800 text-white rounded border border-gray-600"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded"
            >
              {loading ? 'Actualizando...' : 'Guardar Cambios'}
            </button>
          </form>
        )}

        <button
          onClick={() => navigate('/Dashboard')}
          className="bg-white text-black font-bold py-2 px-6 rounded hover:bg-gray-200 transition mt-6"
        >
          Volver
        </button>
      </div>
    </>
  );
}

export default Perfil;
