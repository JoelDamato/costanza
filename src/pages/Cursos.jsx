import { Link, useParams, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import useUserStore from '../store/users';
import NotFound from './NotFound.jsx'; // 👈 Añadido componente NotFound

function Cursos() {
  const API_BASE_URL = 
  process.env.NODE_ENV === 'production'
  ? 'https://back-cos-gim3.onrender.com'
  : 'http://localhost:5000';

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const user = useUserStore((state) => state.user);
  const clearUserData = useUserStore((state) => state.clearUserData);
  const showProfile = useUserStore((state) => state.showProfile);
  const setShowProfile = useUserStore((state) => state.setShowProfile);
  const { cursoId } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);      //👈 Estado para manejar carga
  const [courseNotFound, setCourseNotFound] = useState(false); //👈 Estado para página 404

  const sanitizeTitle = (title) => {
    return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9\-]/g, '');
  };

  const groupChaptersByModule = (chapters) => {
    return chapters.reduce((acc, chapter) => {
      const { module } = chapter;
      if (!acc[module]) {
        acc[module] = [];
      }
      acc[module].push(chapter);
      return acc;
    }, {});
  };

  useEffect(() => {
    const fetchCourseData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE_URL}/api/courses/getcourses`);
        const data = await response.json();
        const selectedCourse = data.find(course => sanitizeTitle(course.courseTitle) === cursoId);

        if (selectedCourse) {
          const modules = groupChaptersByModule(selectedCourse.chapters);
          setCourse({ ...selectedCourse, modules });
        } else {
          setCourseNotFound(true); //👈 Marca que curso no existe
        }
      } catch (error) {
        console.error("Error al obtener el curso:", error);
        setCourseNotFound(true); //👈 Error también dispara 404
      } finally {
        setLoading(false);
      }
    };

    if (cursoId) {
      fetchCourseData();
    }
  }, [cursoId]);

  useEffect(() => {
    setShowProfile(false);
  }, [setShowProfile]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    clearUserData();
    navigate('/');
  };

  if (loading) {
    return <div className="text-white">Cargando curso...</div>;
  }

  if (courseNotFound) {
    return <NotFound />;  //👈 Muestra la página 404 personalizada
  }

  return (
    <div
      className="h-full w-screen flex flex-col items-center bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: "url('https://i.ibb.co/fGZCrFh/FONDO-BARBER.jpg')",
      }}
    >
      <Navbar
        toggleProfile={() => setShowProfile(!showProfile)}
        handleLogout={handleLogout}
        toggleMenu={() => setIsMenuOpen(!isMenuOpen)}
        isMenuOpen={isMenuOpen}
      />

      <div className="h-auto w-full sm:w-11/12 rounded-xl sm:rounded-2xl flex flex-col items-center p-8 shadow-lg">
        <img src={course.image} alt={course.courseTitle} className="w-40 h-40 rounded-lg mb-4 pb-5" />

        {Object.entries(course.modules).map(([moduleName, chapters], moduleIndex) => (
          <div key={moduleIndex} className="mb-8 w-full">
            <h2 className="text-4xl font-extrabold text-white shadow-lg mb-6 text-center rounded-lg tracking-wider bg-gradient-to-r from-black/0 via-black to-black/0">
              Módulo: {moduleName}
            </h2>

            <div className="flex flex-wrap justify-center gap-6">
              {chapters.map((chapter, chapterIndex) => (
                <div
                  key={chapterIndex}
                  className="bg-gradient-to-r from-black/80 to-black rounded-lg shadow-lg p-6 flex flex-col items-center justify-between h-96 w-72"
                  style={{ minHeight: "26rem", maxHeight: "30rem" }}
                >
                  <h3
                    className="text-xl text-white font-bold mb-2 text-center"
                    style={{ minHeight: "6rem", maxHeight: "6rem", overflow: "hidden" }}
                  >
                    {chapter.title}
                  </h3>

                  <iframe
                    src={chapter.video}
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>

                  <div
                    className="flex-grow flex items-center justify-center"
                    style={{ minHeight: "4rem", maxHeight: "4rem", overflow: "hidden" }}
                  >
                    <p className="text-gray-300 text-sm text-center mb-4 line-clamp-3">
                      {chapter.description}
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      navigate(
                        `/cursos/${sanitizeTitle(course.courseTitle)}/${moduleName}/${chapterIndex + 1}`
                      )
                    }
                    className="bg-black text-white py-2 px-4 rounded-lg hover:bg-blue-800"
                  >
                    Ver Capítulo
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="mt-6">
          <Link to="/Dashboard">
            <button className="bg-black text-white py-2 px-4 rounded-lg hover:bg-blue-800">
              Regresar al Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cursos;
