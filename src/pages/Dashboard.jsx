import '../App.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import useUserStore from '../store/users';

function Dashboard() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  // Get user state from Zustand
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
    // Check if token exists
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    if (!token) {
      setIsLoading(false); // Update loading state
    } else if (email) {
      // Fetch user data from API
      axios.post(`${API_BASE_URL}/api/search/users`, { email: email }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(response => {
          // Save user data in global state with Zustand
          setUserData(response.data);

          // Save user name in localStorage
          if (response.data.nombre) {
            localStorage.setItem('nombre', response.data.nombre);
          }
          setIsLoading(false); // Update loading state after data is loaded
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
          setIsLoading(false); // Update loading state even if there's an error
        });
    } else {
      console.error('No email found in localStorage');
      setIsLoading(false); // Update loading state
    }
  }, [navigate, API_BASE_URL, setUserData]);

  // Reset profile state when component mounts
  useEffect(() => {
    setShowProfile(false);
  }, [setShowProfile]);

  // Get courses from API
  useEffect(() => {
    axios.get(`${API_BASE_URL}/api/courses/getcourses`)
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, [API_BASE_URL]);

  // Function to log out
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('nombre');
    clearUserData();
    navigate('/');
  };

  // Function to check if user has a specific course
  const hasCourse = (courseTitle) => {
    return user?.cursos?.includes(courseTitle);
  };

  // Function to show/hide profile
  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setIsMenuOpen(false);
  };

  // Function to show/hide menu (on mobile)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to sanitize course title and convert it to a URL-safe slug
  const sanitizeCourseTitle = (title) => {
    return title.replace(/\s+/g, '-').toLowerCase();
  };

  const phoneNumber = "+59891640623";
  const message = "Hola, tengo una consulta!.";

  const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  // If still loading, show a loading indicator
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-black">
        <div className="bg-black/80 p-8 rounded-lg text-white text-xl">
          Cargando...
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-screen flex flex-col items-center bg-black/90">
      {/* Navbar */}
      <Navbar
        toggleProfile={toggleProfile}
        handleLogout={handleLogout}
        toggleMenu={toggleMenu}
        isMenuOpen={isMenuOpen}
      />

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "black",
          color: "#fff",
          padding: "10px 15px",
          borderRadius: "50px",
          textDecoration: "none",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontWeight: "bold",
          fontSize: "16px",
          zIndex: 1000,
        }}
      >
        <img
          src="/soporte.png"
          alt="WhatsApp"
          style={{ width: "28px", height: "28px" }}
        />
        Soporte
      </a>

      {/* User profile modal */}
      {showProfile && user && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-90 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 sm:w-1/2 relative z-60">
            <button onClick={toggleProfile} className="absolute top-2 right-2 text-black text-2xl font-bold">
              &times;
            </button>
            <h2 className="text-2xl font-bold mb-4">Mi Perfil</h2>
            <p><strong>Nombre:</strong> {user.nombre}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Cursos Adquiridos:</strong></p>
            <ul className="list-disc list-inside">
              {user.cursos && user.cursos.length > 0 ? (
                user.cursos.map((curso, index) => (
                  <li key={index}>{curso}</li>
                ))
              ) : (
                <li>No hay cursos adquiridos todavía</li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* Coupon section - with null check for user */}
      {user && !hasCourse('Cupon') && (
        courses.map((course, index) => (
          course.courseTitle === 'Cupon' && (
            <div
              key={index}
              className="bg-red-900 w-full m-5 rounded-lg shadow-lg p-6 flex items-center justify-between"
            >
              <img
                src={course.image}
                alt={course.courseTitle}
                className="w-20 h-20 rounded-lg"
              />

              <div className='flex flex-col items-center p-2 w-3/4'>
                <h3 className="text-white text-2xl font-bold mb-4">Felicidades, ¡tienes un cupón disponible!</h3>

                <a
                  href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                    `Hola, quiero usar mi cupón de descuento. Soy ${user.nombre || 'un estudiante'}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-md py-2 px-4 rounded-lg border-2 border-white hover:bg-white/50 transition"
                >
                  RECLAMA TU DESCUENTO DEL 40% EN EL PRODUCTO QUE QUIERAS!
                </a>
              </div>
            </div>
          )
        ))
      )}

      <div className="h-auto w-full sm:w-11/12 rounded-xl sm:rounded-2xl flex flex-col items-center p-8 shadow-lg">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full shadow-1xl">

          {/* Course cards - with null check for user */}
          {user && courses.map((course, index) => (
            // Filter courses that are not "REGALO DE LANZAMIENTO" without access and are not "CUPON"
            (course.courseTitle !== 'Cupon' &&
              (course.courseTitle !== 'REGALO DE LANZAMIENTO' || hasCourse(course.courseTitle))) && (
              <div
                key={index}
                className="bg-black/90 rounded-lg shadow-lg p-6 flex flex-col items-center justify-between"
                style={{ minHeight: "40rem", maxHeight: "50rem" }}
              >
                <img
                  src={course.image}
                  alt={course.courseTitle}
                  className="w-full h-full max-w-[320px] max-h-[320px] rounded-lg shadow-md mb-4"
                />

                <h3 className="text-white text-2xl font-bold mb-4">{course.courseTitle}</h3>

                <p className="text-white font-bold mb-4">{course.courseDescription}</p>

                {hasCourse(course.courseTitle) ? (
                  <button
                    onClick={() => navigate(`/${sanitizeCourseTitle(course.courseTitle)}`)}
                    className="bg-black text-white py-2 px-4 rounded-lg hover:bg-black/90 transition"
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
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                  >
                    Obtener ahora
                  </a>
                )}
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;