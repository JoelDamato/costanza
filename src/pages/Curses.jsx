import '../App.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

function Curses() {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const phoneNumber = "+59891640623";

  useEffect(() => {
    const head = document.head;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src =
      "https://t.erickgomezacademy.com/v1/lst/universal-script?ph=fb1590df5598c8770c1c7fbfb13870b527b36e3e2b2ee95bbf0bd268b93a649c&tag=!clicked&ref_url=" +
      encodeURIComponent(window.location.href);
    head.appendChild(script);

    return () => {
      head.removeChild(script);
    };
  }, []);

  const API_BASE_URL = "https://back-cursos.onrender.com"
  // process.env.NODE_ENV === 'production'
  //   ? 'https://back-cursos.onrender.com'
  //   : 'http://localhost:5000';

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/courses/getcourses`)
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  }, [API_BASE_URL]);

  return (
    <div className="bg-black/90 h-full w-screen flex flex-col items-center" style={{ backgroundImage: "url('https://i.ibb.co/fGZCrFh/FONDO-BARBER.jpg')" }}>
      <div className="relative flex flex-col items-center mt-[-15px] sm:mt-[-30px]">
        <img
          src="https://i.ibb.co/hy7tRTP/ERICK.webp"
          alt="Fondo"
          loading="lazy"
          className="w-full max-w-md sm:max-w-lg rounded-lg"
        />
        <img src="/LOGO1.png" alt=""
          loading="lazy"
          className="absolute top-20 text-shadow text-white font-bold text-center text-2xl sm:text-4xl px-4" />
      </div>

      <div className="bg-gradient-to-r from-black/90 to-black/90 h-auto w-full sm:w-11/12 flex flex-col items-center p-8 shadow-lg">
        <p
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)" }}
          className="mt-20 text-shadow text-white font-bold text-center text-1xl sm:text-2xl px-4 mb-4">
          Si estás buscando perfeccionar tus técnicas de cortes y fade o escalar tu tus redes con Erick, este año tienes la oportunidad de hacerlo 100% online sin importar de donde seas
        </p>
        <p className="bg-white rounded-lg text-black font-bold text-center text-2xl sm:text-lg px-4 mb-2">
          Conoce todos mis cursos
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full shadow-1xl">
          {courses.length > 0 ? (
            courses
              .filter(course => course.courseTitle !== "REGALO DE LANZAMIENTO")
              .map((course, index) => (
                <motion.div
                  key={index}
                  className="bg-black/90 rounded-lg shadow-lg p-6 flex flex-col items-center justify-between h-full"
                  whileInView={{ opacity: 1, y: 0 }}
                  initial={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true, amount: 0.2 }} // Se activa cuando el 20% de la tarjeta entra en la vista
                >
                  <img
                    src={course.image}
                    alt={course.courseTitle}
                    loading="lazy"
                    className="w-full h-full max-w-[320px] max-h-[320px] rounded-lg shadow-md mb-4"
                  />

                  <h3 className="text-white text-2xl font-bold mb-4 text-center">
                    {course.courseTitle}
                  </h3>
                  <p className="text-white font-bold mb-4 text-center">{course.courseDescription}</p>
                  <a
                    href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                      "Hola, me interesa más información sobre el curso: " + course.courseTitle
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition flex items-center gap-2 mt-auto text-2xl sm:text-2xl sm:py-4 sm:px-8"             >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 32 32"
                      fill="#fff"
                      style={{ width: "28px", height: "28px" }}
                    >
                      <path d="M16 0C7.16 0 0 7.16 0 16c0 2.82.74 5.44 2.02 7.74L0 32l8.5-2.22C11.01 31.26 13.45 32 16 32c8.84 0 16-7.16 16-16S24.84 0 16 0zm8.26 23.43c-.37.95-2.18 1.88-3.04 1.97-.8.07-1.56.37-5.3-1.13-4.47-1.85-7.3-6.43-7.53-6.73-.22-.3-1.8-2.37-1.8-4.53 0-2.16 1.14-3.22 1.56-3.67.42-.45.93-.57 1.23-.57h.9c.3 0 .66-.06 1.03.78.37.84 1.3 3.1 1.4 3.32.11.22.18.5.04.8-.14.3-.2.48-.4.74-.2.27-.42.6-.6.8-.2.2-.4.42-.18.82.22.4 1 1.63 2.13 2.64 1.46 1.3 2.67 1.7 3.07 1.92.4.2.65.17.9-.1.26-.28 1.04-1.2 1.32-1.6.28-.4.56-.34.93-.2.37.14 2.35 1.1 2.75 1.3.4.2.66.3.76.46.1.17.1 1.02-.26 1.97z" />
                    </svg>
                    Obtener ahora
                  </a>
                </motion.div>
              ))
          ) : (
            <p className="text-white text-xl">Cargando cursos...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Curses;
