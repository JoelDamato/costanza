import '../App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import useUserStore from '../store/users';

function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (!token) {
      setIsLoading(false);
    } else if (email) {
      axios.post(`${API_BASE_URL}/api/search/users`, { email }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        setUserData(res.data);
        if (res.data.nombre) {
          localStorage.setItem('nombre', res.data.nombre);
        }
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [API_BASE_URL, setUserData]);

  useEffect(() => {
    setShowProfile(false);
  }, [setShowProfile]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/courses/getcourses`)
      .then(res => setCourses(res.data))
      .catch(err => console.error('Error fetching courses:', err));
  }, [API_BASE_URL]);

  const handleLogout = () => {
    localStorage.clear();
    clearUserData();
    navigate('/');
  };

  const hasCourse = (title) => user?.cursos?.includes(title);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setIsMenuOpen(false);
  };

  const sanitizeCourseTitle = (title) => title.replace(/\s+/g, '-').toLowerCase();


  const phoneNumber = "+5491170587318";
  const message = "Hola, tengo una consulta!.";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black">
        <div className="bg-black/80 p-8 rounded-lg text-white text-xl">
          Cargando...
        </div>
      </div>
    );
  }

  const isCoursePlayable = (course) => {
    const firstChapter = course.chapters?.[0];
    return !!firstChapter?.video;
  };
  

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      <Navbar
      />

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-black text-white px-4 py-3 rounded-full shadow-md flex items-center gap-2 z-50"
      >
        <img src="/soporte.png" alt="Soporte" className="w-6 h-6" />
        Soporte
      </a>

      <div className="pt-32 px-4 flex flex-col items-center">
        {user && (
          <h1 className="p-2 text-3xl md:text-4xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-br from-yellow-400 to-white">
            ¡Bienvenido {user.nombre || 'alumno'} a tu plataforma!
          </h1>
        )}



        <div className="w-full  px-4 py-8 flex justify-center ">
          {user && courses.map((course, index) =>
            course.courseTitle !== 'Cupon' &&
            (course.courseTitle !== 'REGALO DE LANZAMIENTO' || hasCourse(course.courseTitle)) && (
<div
  key={index}
  className="bg-white/10 w-[400px] backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-between shadow-xl hover:shadow-2xl transition-all duration-300 min-h-[440px] text-center"
>
                <img
                  src={course.image}
                  alt={course.courseTitle}
                  className="w-full h-full object-cover rounded-lg mb-4"
                />
                {hasCourse(course.courseTitle) ? (
                  <button
                    onClick={() => navigate(`/${sanitizeCourseTitle(course.courseTitle)}`)}
                    className="bg-white text-black font-bold py-2 px-4 rounded hover:bg-gray-200 transition"
                  >
                    Ver Curso
                  </button>
                ) : (
                  <a
                    href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                      `Hola, me interesa más información sobre el curso: ${course.courseTitle}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition"
                  >
                    Obtener ahora
                  </a>
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
