
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import useUserStore from "../store/users"; // Importar el store de Zustand



function Capitulos() {
  const API_BASE_URL = 
    process.env.NODE_ENV === 'production'
      ? 'https://back-cos-gim3.onrender.com'
      : 'http://localhost:5000';

  const { cursoId, moduleName, chapterId } = useParams();
  const navigate = useNavigate();
  const commentsEndRef = useRef(null);
  const workerUrl = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState(localStorage.getItem("nombre") || "Anónimo");
  const [showComments, setShowComments] = useState(false);
  const [course, setCourse] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const [rol, setRol] = useState(localStorage.getItem("rol") || "");
  const [tiempoReproducido, setTiempoReproducido] = useState(0);
const [duracionEstimativa, setDuracionEstimativa] = useState(0);
const [videoFinalizado, setVideoFinalizado] = useState(false); 
const [capituloYaCompletado, setCapituloYaCompletado] = useState(false);


  const user = useUserStore((state) => state.user);
  const clearUserData = useUserStore((state) => state.clearUserData);
  const playerRef = useRef(null);

  const [texto, setTexto] = useState('');







  useEffect(() => {
    const verificarProgreso = async () => {
      try {
        const email = localStorage.getItem('email');
        const res = await fetch(`${API_BASE_URL}/api/progresoget?email=${email}`);
        const data = await res.json();
  
        const capituloActualId = `${moduleName}-${parseInt(chapterId, 10)}`;
        const progresoActual = data.find(p => p.capituloId === capituloActualId && p.estado === 'completado');
  

        console.log("📊 Progreso desde el backend:", data);
console.log("🧠 Capítulo actual ID:", `${moduleName}-${parseInt(chapterId, 10)}`);
console.log("✅ ¿Está completado?:", !!progresoActual);

        if (progresoActual) {
          setCapituloYaCompletado(true);
        }
      } catch (err) {
        console.error('Error al verificar progreso:', err);
      }
    };
  
    if (cursoId && moduleName && chapterId) {
      verificarProgreso();
    }
  }, [cursoId, moduleName, chapterId]);
  

  const currentModuleChapters = course?.chapters?.filter(
    (chapter) => chapter.module === moduleName
  ) || [];
  
  const currentChapter = currentModuleChapters[parseInt(chapterId, 10) - 1];
  

  

  // SIEMPRE FUERA DE CONDICIONALES
  useEffect(() => {
    if (currentChapter?.duration) {
      setDuracionEstimativa(currentChapter.duration);
    }
  }, [currentChapter]);
  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (chapterId) {
      localStorage.setItem("lastChapter", chapterId);
    }
  }, [chapterId]);

  useEffect(() => {
    const handleMessage = (event) => {
      if (!event.data || typeof event.data !== "object") return;
  
      const { message, playerData, currentTime } = event.data;
  
      if (message === "panda_allData") {
        if (playerData?.duration) {
          setDuracionEstimativa(playerData.duration);
        }
      }
  
      if (message === "panda_timeupdate" && typeof currentTime === "number") {
        setTiempoReproducido(currentTime);
      }
    };
  
    window.addEventListener("message", handleMessage);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);
  

  useEffect(() => {
    if (duracionEstimativa > 0 && tiempoReproducido >= duracionEstimativa * 0.80) {
      setVideoFinalizado(true);
    }
  }, [tiempoReproducido, duracionEstimativa]);
  
  function formatSecondsToMinutes(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  }
  
  useEffect(() => {
    if (!currentChapter?.video) return;
  
    const intervalRef = { current: null };
  
    window._wq = window._wq || [];
    window._wq.push({
      id: currentChapter.video,
      onReady: function(video) {
        console.log("🎥 Wistia video listo:", video);
        
        intervalRef.current = setInterval(() => {
          const tiempo = video.time();
          const duracion = video.duration();
  
          setTiempoReproducido(tiempo);
          setDuracionEstimativa(duracion);
  
          if (duracion > 0 && tiempo >= duracion * 0.8) {
            setVideoFinalizado(true);
            clearInterval(intervalRef.current);
          }
        }, 1000);
      },
    });
  
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [currentChapter?.video]);
  

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/courses/getcourses`);
        const data = await response.json();
        const selectedCourse = data.find(
          (course) =>
            course.courseTitle.toLowerCase().replace(/\s+/g, "-") === cursoId
        );
        if (selectedCourse) {
          setCourse(selectedCourse);
        }
      } catch (error) {
        console.error("Error al obtener el curso:", error);
      }
    };

    if (cursoId) {
      fetchCourseData();
    }
  }, [cursoId]);

  const fetchComments = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/comments/${cursoId}/${moduleName}/${chapterId}`);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error al obtener comentarios:", error);
    }
  };

  const handleAddComment = async () => {
    if (!newComment) return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/comments/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: cursoId,
          moduleName, // Incluye moduleName en la solicitud
          chapterId: parseInt(chapterId, 10),
          userEmail: userName,
          content: newComment,
        }),
      });
      if (response.ok) {
        setNewComment("");
        fetchComments();
      }
    } catch (error) {
      console.error("Error al agregar comentario:", error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/comments/${commentId}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchComments();
      }
    } catch (error) {
      console.error("Error al borrar comentario:", error);
    }
  };

  useEffect(() => {
    if (cursoId && moduleName && chapterId) {
      fetchComments();
    }
  }, [cursoId, moduleName, chapterId]);

  useEffect(() => {
    if (showComments) {
      commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [comments, showComments]);

  const goToNextChapter = async () => {
    const currentIndex = parseInt(chapterId, 10) - 1;
    const nextIndex = currentIndex + 1;
  
    const email = localStorage.getItem("email");
    const capituloActual = `${moduleName}-${parseInt(chapterId, 10)}`;
    const capituloSiguiente = `${moduleName}-${nextIndex + 1}`;
  
    try {
      // Marcar capítulo actual como finalizado
      await fetch(`${API_BASE_URL}/api/progreso`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          cursoId,
          capituloId: capituloActual,
          accion: "finalizado",
        }),
      });
  
      // Marcar siguiente como iniciado
      await fetch(`${API_BASE_URL}/api/progreso`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          cursoId,
          capituloId: capituloSiguiente,
          accion: "inicio",
        }),
      });
  
      // 🧹 Limpiar claves relacionadas al video
      localStorage.removeItem("lastChapter");
      // Agregá más si guardás por ejemplo `video_tiempo` o `progreso_video_capituloX`
  
      // Navegar
      window.location.href = `/cursos/${cursoId}/${moduleName}/${nextIndex + 1}`;
    } catch (error) {
      console.error("Error al actualizar progreso:", error);
    }
  };
  
  

  const goToPreviousChapter = () => {
    const currentIndex = parseInt(chapterId, 10) - 1;
    if (currentIndex > 0) {
      navigate(`/cursos/${cursoId}/${moduleName}/${currentIndex}`);
    } else {
      navigate(`/${cursoId}`);
    }
  };

  if (!course) {
    return <div className="text-white">Cargando curso...</div>;
  }


  if (currentModuleChapters.length === 0) {
    return <div className="text-white">Módulo no encontrado</div>;
  }


  // Después viene:
  if (!currentChapter) {
    return <div className="text-white">Capítulo no encontrado</div>;
  }
  

  return (
<>
      <Navbar />
      <div className=" pt-5 min-h-screen w-screen overflow-y-auto bg-gradient-to-r from-black/80 to-black flex flex-col items-center justify-center">
      <h1 className="mt-5 md:mt-12 text-4xl text-center mb-6 md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-gray-500 to-gray-200 drop-shadow-lg tracking-wide">
      {currentChapter.title}
            </h1>

      <div className="bg-gradient-to-b from-black/80 to-black w-full sm:rounded-2xl flex flex-col items-center px-8 shadow-lg">
      {currentChapter.video ? (
 
<div className="w-full pt-1 relative z-0">
  <div className="wistia_responsive_padding relative" style={{ padding: "56.25% 0 0 0" }}>
    <div
      className="wistia_responsive_wrapper"
      style={{
        height: "100%",
        left: 0,
        top: 0,
        width: "100%",
        position: "relative",
        zIndex: 0,
      }}
    >
      <div
        className={`wistia_embed wistia_async_${currentChapter.video} seo=true videoFoam=true`}
        style={{ height: "100%", width: "100%" }}
      ></div>
    </div>
  </div>
</div>


) : (
  <p className="text-center md:p-20 mt-5 mt-5 text-3xl text-bold text-white">Capítulo bloqueado.</p>
)}

{currentChapter?.tarea && (
  <a
    href={currentChapter.tarea}
    download
    target="_blank"
    rel="noopener noreferrer"
  >
    <button className="mt-5 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition">
      📥 Ver Ejercicio
    </button>
  </a>
)}



        <button
          onClick={() => setShowComments(!showComments)}
          className="mt-10 bg-white/40 border-5  text-white font-bold py-2 px-4 rounded-lg mt-4"
        >
          {showComments ? "Ocultar Comentarios" : "Mostrar Comentarios"}
        </button>

        {showComments && (
          <div className="w-full mt-6">
            <h2 className="text-2xl font-semibold mb-4 text-white text-center">Comentarios</h2>
            <div className="space-y-4 mb-6 overflow-y-auto" style={{ maxHeight: "300px" }}>
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="bg-black border-1 border-white p-4 rounded-lg shadow flex justify-between items-center"
                >
                  <div>
                    <p className="font-bold text-lg text-white">{comment.userEmail}</p>
                    <p className="text-white text-sm">{comment.content}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(comment.createdAt).toLocaleString()}</p>
                  </div>
                  {comment.userEmail === userName || rol === "admin" ? (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="bg-red-600 text-white py-1 px-1 rounded"
                    >
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

                    </button>
                  ) : null}
                </div>
              ))}
              <div ref={commentsEndRef} />
            </div>

            <textarea
              placeholder="Escribe tu comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full p-2 border rounded mb-2 bg-white/60 text-white"
            />
            <button
              onClick={handleAddComment}
              className="bg-gradient-to-r from-black to-white/20 text-white py-2 px-4 rounded-lg w-full"
            >
              Agregar Comentario
            </button>
          </div>
        )}

      


<div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full mt-10 px-4 z-10 relative">
  {/* Botón Anterior o Volver */}
  {parseInt(chapterId, 10) === 1 ? (
    <button
      onClick={() => navigate(`/${cursoId}`)}
      className="bg-black text-white py-2 px-4 rounded-lg"
    >
      Volver
    </button>
  ) : (
    <button
      onClick={goToPreviousChapter}
      className="bg-black text-white py-2 px-4 rounded-lg"
    >
      Anterior
    </button>
  )}

  {/* Botón Siguiente o Finalizar */}
  {parseInt(chapterId, 10) === currentModuleChapters.length ? (
    <button
      onClick={async () => {
        const email = localStorage.getItem("email");
        const capituloActual = `${moduleName}-${parseInt(chapterId, 10)}`;
        try {
          await fetch(`${API_BASE_URL}/api/progreso`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email,
              cursoId,
              capituloId: capituloActual,
              accion: "finalizado",
            }),
          });
        } catch (error) {
          console.error("Error al marcar como completado:", error);
        }

        navigate(`/${cursoId}`);
      }}
      disabled={!(videoFinalizado || capituloYaCompletado)}
      className={`py-2 px-4 border-2 border-white rounded-lg transition-all ${
        videoFinalizado || capituloYaCompletado
          ? "bg-green-500 text-white hover:bg-green-700"
          : "bg-black text-white cursor-not-allowed opacity-60"
      }`}
    >
      Finalizar
      {!(videoFinalizado || capituloYaCompletado) && (
        <div className="text-white mt-1 text-sm">
          ⏱ Reproducido: {formatSecondsToMinutes(tiempoReproducido)} / {formatSecondsToMinutes(duracionEstimativa)}
        </div>
      )}
    </button>
  ) : (
    <button
      onClick={goToNextChapter}
      disabled={!(videoFinalizado || capituloYaCompletado)}
      className={`py-2 px-4 border-2 border-white rounded-lg transition-all ${
        videoFinalizado || capituloYaCompletado
          ? "bg-green-500 text-white hover:bg-green-700"
          : "bg-black text-white cursor-not-allowed opacity-60"
      }`}
    >
      Siguiente
      {!(videoFinalizado || capituloYaCompletado) && (
        <div className="text-white mt-1 text-sm">
          ⏱ Reproducido: {formatSecondsToMinutes(tiempoReproducido)} / {formatSecondsToMinutes(duracionEstimativa)}
        </div>
      )}
    </button>
  )}
</div>







       
        
       
      </div>
    </div>
    </>
  );
}

export default Capitulos;
