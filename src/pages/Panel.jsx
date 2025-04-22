import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal'; // Componente Modal
import Spinner from '../components/Spinner'; // Tu componente Spinner
import useUserStore from '../store/users';
import { useNavigate } from 'react-router-dom';

function PanelControl() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cursos, setCursos] = useState([]);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [activeSection, setActiveSection] = useState('crear');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [createdUser, setCreatedUser] = useState('');
  const [responseMessage, setResponseMessage] = useState("");
  const [responseColor, setResponseColor] = useState("");
  const [isActionLoading, setIsActionLoading] = useState(false); // Estado para el spinner

  const navigate = useNavigate();

  const user = useUserStore((state) => state.user);
  const setUserData = useUserStore((state) => state.setUserData);
  const clearUserData = useUserStore((state) => state.clearUserData);
  const showProfile = useUserStore((state) => state.showProfile);
  const setShowProfile = useUserStore((state) => state.setShowProfile);

  const API_BASE_URL = 
  process.env.NODE_ENV === 'production'
  ? 'https://back-cos-gim3.onrender.com'
  : 'http://localhost:5000';

  // Función para generar contraseña aleatoria
  const generateRandomPassword = (length = 12) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
  };

  useEffect(() => {
    if (email) {
      axios
        .get(`${API_BASE_URL}/api/users/${email}`)
        .then((response) => {
          if (response.data) {
            setNombre(response.data.nombre || '');
            setCursos(response.data.cursos || []); // Se mantiene la lista de cursos actual
          }
        })
        .catch(() => {
          setCursos([]);
        });
    }
  }, [email]);

  // CREAR USUARIOS
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsActionLoading(true);
    const generatedPassword = generateRandomPassword();
    try {
      const response = await axios.post(`${API_BASE_URL}/api/create/register`, {
        nombre,
        email,
        password: generatedPassword,
        cursos,
        rol: 'user',
      });
      if (response.status === 201) {
        setModalMessage(
          `Usuario creado exitosamente. \nEmail: ${email}\nContraseña: ${generatedPassword}`
        );
        setIsModalOpen(true);
        setNombre('');
        setEmail('');
        setCursos([]);
      }
    } catch (error) {
      setModalMessage(
        error.response?.data?.message || 'Error al registrar usuario: ' + error.message
      );
      setIsModalOpen(true);
    } finally {
      setIsActionLoading(false);
    }
  };

  // Manejar cambios en los checkboxes de cursos
  const handleCursoChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCursos([...cursos, value]);
    } else {
      setCursos(cursos.filter((curso) => curso !== value));
    }
  };

  // EDITAR USUARIO
  const handleEditUser = async (e) => {
    e.preventDefault();
    if (!email) {
      setModalMessage('Por favor, introduce un email.');
      setIsModalOpen(true);
      return;
    }
    setIsActionLoading(true);
    try {
      const responseGet = await axios.post(`${API_BASE_URL}/api/search/users`, { email });
      if (!responseGet.data) {
        setModalMessage('El usuario no existe en la base de datos.');
        setIsModalOpen(true);
        return;
      }
      const userCursos = responseGet.data.cursos || [];
      const updatedCursos = [...new Set([...userCursos, ...cursos])];
      const responseUpdate = await axios.put(`${API_BASE_URL}/api/update/users/${encodeURIComponent(email)}`, {
        nombre,
        cursos: updatedCursos,
      });
      if (responseUpdate.status === 200) {
        setModalMessage('Usuario actualizado exitosamente.');
        setIsModalOpen(true);
        setCursos(updatedCursos);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setModalMessage('El usuario no fue encontrado en la base de datos.');
      } else {
        setModalMessage('Error al actualizar usuario: ' + error.message);
      }
      setIsModalOpen(true);
    } finally {
      setIsActionLoading(false);
    }
  };

  // CAMBIAR CONTRASEÑA
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setModalMessage('Por favor, completa todos los campos');
      setIsModalOpen(true);
      return;
    }
    if (newPassword !== confirmPassword) {
      setModalMessage('Las contraseñas no coinciden');
      setIsModalOpen(true);
      return;
    }
    if (newPassword.length < 8) {
      setModalMessage('La contraseña debe tener al menos 8 caracteres');
      setIsModalOpen(true);
      return;
    }
    setIsActionLoading(true);
    try {
      const response = await axios.put(`${API_BASE_URL}/api/update/password/${email}`, {
        password: newPassword,
      });
      if (response.status === 200) {
        setModalMessage('Contraseña actualizada exitosamente.');
        setIsModalOpen(true);
        setNewPassword('');
        setConfirmPassword('');
      } else {
        throw new Error(response.data.message || 'Error al actualizar la contraseña');
      }
    } catch (error) {
      setModalMessage(error.response?.data?.message || 'Error al actualizar la contraseña.');
      setIsModalOpen(true);
    } finally {
      setIsActionLoading(false);
    }
  };

  // BORRAR USUARIO
  const deleteUser = async () => {
    if (!email) {
      setModalMessage('Por favor, introduce un email.');
      setIsModalOpen(true);
      return;
    }
    setIsActionLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/update/usuarios`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const result = await response.json();
      if (response.ok) {
        setModalMessage(result.message || 'Usuario eliminado correctamente.');
        setIsModalOpen(true);
      } else {
        setModalMessage(result.message || 'Error al eliminar el usuario.');
        setIsModalOpen(true);
      }
    } catch (error) {
      setModalMessage('Error de conexión al servidor.');
      setIsModalOpen(true);
    } finally {
      setIsActionLoading(false);
    }
  };

  // GESTIÓN DE CUPONES
  const handleCouponChange = async (action) => {
    if (!email) {
      setModalMessage('Por favor, introduce un email.');
      setIsModalOpen(true);
      return;
    }
    setIsActionLoading(true);
    try {
      const responseGet = await axios.post(`${API_BASE_URL}/api/search/users`, { email });
      if (!responseGet.data) {
        setModalMessage('El usuario no existe en la base de datos.');
        setIsModalOpen(true);
        return;
      }
      const userCursos = responseGet.data.cursos || [];
      let updatedCursos = [...userCursos];
      if (action === 'add') {
        if (updatedCursos.includes('Cupon')) {
          setModalMessage('El usuario no tiene un cupón para eliminar.');
          setIsModalOpen(true);
          return;
        }
        updatedCursos.push('Cupon');
      } else if (action === 'remove') {
        if (!updatedCursos.includes('Cupon')) {
          setModalMessage('El usuario ya tiene un cupón.');
          setIsModalOpen(true);
          return;
        }
        updatedCursos = updatedCursos.filter(curso => curso !== 'Cupon');
      }
      const responseUpdate = await axios.put(`${API_BASE_URL}/api/update/users/${encodeURIComponent(email)}`, {
        cursos: updatedCursos,
      });
      if (responseUpdate.status === 200) {
        setModalMessage(`Cupón ${action === 'add' ? 'agregado' : 'eliminado'} correctamente.`);
        setIsModalOpen(true);
        setCursos(updatedCursos);
      }
    } catch (error) {
      setModalMessage(`Error al ${action === 'add' ? 'agregar' : 'eliminar'} el cupón.`);
      setIsModalOpen(true);
    } finally {
      setIsActionLoading(false);
    }
  };

  useEffect(() => {
    setShowProfile(false);
  }, [setShowProfile]);

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    clearUserData();
    navigate('/');
  };

  // Función para verificar si el usuario tiene un curso específico
  const hasCourse = (courseName) => {
    return user?.cursos?.includes(courseName);
  };

  // Función para mostrar/ocultar el perfil
  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setIsMenuOpen(false);
  };

  // Función para mostrar/ocultar el menú (en móvil)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="h-full w-screen bg-gray-100 flex flex-col items-center">
      <Navbar
        toggleProfile={toggleProfile}
        handleLogout={handleLogout}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
      />

      {/* Overlay del spinner para acciones */}
      {isActionLoading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Spinner />
        </div>
      )}

      {/* Navegación entre secciones */}
      <div className="bg-gray-200 w-screen rounded-xl sm:rounded-2xl flex justify-center p-4 shadow-lg mb-5 overflow-x-auto sm:overflow-hidden whitespace-nowrap">
        <div className="flex gap-2 sm:gap-4">
          <button
            className={`px-3 py-2 text-sm sm:text-base rounded-lg ${activeSection === 'crear' ? 'bg-gray-400 text-black' : 'bg-gray-200'}`}
            onClick={() => setActiveSection('crear')}
          >
            Registro
          </button>
    
          <button
            className={`px-3 py-2 text-sm sm:text-base rounded-lg ${activeSection === 'editar' ? 'bg-gray-400 text-black' : 'bg-gray-200'}`}
            onClick={() => setActiveSection('editar')}
          >
            Accesos
          </button>
          <button
            className={`px-3 py-2 text-sm sm:text-base rounded-lg ${activeSection === 'cambiarContraseña' ? 'bg-gray-400 text-black' : 'bg-gray-200'}`}
            onClick={() => setActiveSection('cambiarContraseña')}
          >
            Claves
          </button>
          <button
            className={`px-3 py-2 text-sm sm:text-base rounded-lg ${activeSection === 'eliminar' ? 'bg-gray-400 text-black' : 'bg-gray-200'}`}
            onClick={() => setActiveSection('eliminar')}
          >
            Eliminar
          </button>
        </div>
      </div>

      {/* Sección para crear usuario */}
      {activeSection === 'crear' && (
        <div className="flex justify-center bg-gray-100 w-screen">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-[60%]">
            <form className="flex flex-col w-full items-center gap-5" onSubmit={handleSubmit}>
              <div className="w-4/5">
                <label className="block text-black font-semibold tracking-wide mb-2">
                  Nombre:
                  <input
                    className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                  />
                </label>
              </div>
              <div className="w-4/5">
                <label className="block text-black font-semibold tracking-wide mb-2">
                  Email:
                  <input
                    className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                    value={email}
                    placeholder="ejemplo@correo.com"
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    required
                  />
                </label>
              </div>
              <div className="w-4/5">
                <label className="block text-black font-semibold tracking-wide mb-2">
                  Cursos:
                  <div className="flex flex-col mt-2 space-y-2">
                    <label className="flex items-center justify-between">
                      <span>Focus Dental</span>
                      <input
                        type="checkbox"
                        value="Focus"
                        checked={cursos.includes('Focus Dental')}
                        onChange={handleCursoChange}
                        className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
                      />
                    </label>
               
        
                  </div>
                </label>
              </div>

              <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition" type="submit">
                Registrar
              </button>
            </form>

            {successMessage && (
              <div className="mt-6 bg-gray-100 p-4 rounded-xl shadow-lg text-black">
                <p className="text-xl text-black font-bold mb-2">{successMessage}</p>
                {createdUser && (
                  <>
                    <p>
                      Plataforma:{' '}
                      <a
                        href="https://plataforma.erickgomezacademy.com/"
                        className="text-blue-400 underline"
                      >
                        plataforma.erickgomezacademy.com
                      </a>
                    </p>
                    <p>Usuario: {createdUser.email}</p>
                    <p>Contraseña: {createdUser.password}</p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

        

      {/* Sección para editar usuario */}
      {activeSection === 'editar' && (
        <div className="flex justify-center bg-gray-100 w-screen">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-[60%]">
            <form className="flex flex-col w-full items-center gap-5" onSubmit={handleEditUser}>
              <div className="w-4/5">
                <label className="text-gray-600 text-sm mb-4 text-center">
                  Email del usuario a editar:
                  <input
                    className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="email"
                    value={email}
                    placeholder="ejemplo@correo.com"
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    required
                  />
                </label>
              </div>
              <div className="w-4/5">
                <label className="text-gray-600 text-sm mb-4 text-center">
                  Nombre:
                  <input
                    className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                  />
                </label>
              </div>

              <div className="w-4/5">
                <label className="block text-black font-semibold tracking-wide mb-2">
                  Cursos:
                  <div className="flex flex-col mt-2 space-y-2">
                    <label className="flex items-center justify-between">
                      <span>Focus Dental</span>
                      <input
                        type="checkbox"
                        value="Focus Dental"
                        checked={cursos.includes('Focus Dental')}
                        onChange={handleCursoChange}
                        className="relative w-10 h-5 rounded-full appearance-none bg-gray-300 checked:bg-green-500 transition-colors duration-200 cursor-pointer"
                      />
                    </label>
                
                  
            
                  </div>
                </label>
              </div>

              <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition" type="submit">
                Actualizar Usuario
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Sección para cambiar contraseña */}
      {activeSection === 'cambiarContraseña' && (
        <div className="flex justify-center bg-gray-100 w-screen">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-[60%]">
            <form className="flex flex-col w-full items-center gap-5" onSubmit={handlePasswordChange}>
              <div className="w-4/5">
                <label className="text-gray-600 text-sm mb-4 text-center">Email del Usuario:</label>
                <input
                  className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  value={email}
                  placeholder="ejemplo@correo.com"
                  onChange={(e) => setEmail(e.target.value.toLowerCase())}
                  required
                />
              </div>
              <div className="w-4/5">
                <label className="text-gray-600 text-sm mb-4 text-center">Nueva Contraseña:</label>
                <input
                  className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="w-4/5">
                <label className="text-gray-600 text-sm mb-4 text-center">Confirmar Contraseña:</label>
                <input
                  className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition" type="submit">
                Cambiar Contraseña
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Sección para eliminar usuario */}
      {activeSection === 'eliminar' && (
        <div className="flex justify-center bg-gray-100 w-screen">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-[60%]">
            <p className="text-gray-600 text-sm mb-4 text-center">
              Introduce el email del usuario que deseas eliminar:
            </p>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ejemplo@correo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition" onClick={deleteUser}>
              Eliminar
            </button>
            {responseMessage && (
              <div className={`mt-4 text-sm ${responseColor}`}>{responseMessage}</div>
            )}
          </div>
        </div>
      )}

      {/* Modal para errores */}
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <div className="text-black text-center">
            <p className="whitespace-pre-wrap">{modalMessage}</p>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Cerrar
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default PanelControl;
