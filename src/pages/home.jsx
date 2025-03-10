"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Menu, X } from "lucide-react"

export default function BarberAcademy() {
  const [currentCourseIndex, setCurrentCourseIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false);

  const courseImages = [
    "https://i.ibb.co/cSNDmbZF/Tarjeta-Master-Fade.png",
    "https://i.ibb.co/8D8162hD/Tarjeta-Cutting-Mastery.png",
    "https://i.ibb.co/ymf4c9b2/Tarjeta-Colorimetria.png",
    "https://i.ibb.co/MxMJGhVx/Tarjeta-Barber-Cash.png",
    "https://i.ibb.co/tTff7Kh2/Tarjeta-Agendas-Ilimitadas.png",
    "https://i.ibb.co/JWKGtLrr/Tarjeta-Focus.png",
  ]
  const courseNames = [
    "Master Fade",
    "Cutting Mastery",
    "Colorimetría",
    "Barber Cash",
    "Agendas Ilimitadas",
    "Focus"
  ];

  const phoneNumber = "+59891640623" // Reemplaza con tu número de WhatsApp

  const getWhatsAppLink = (index) => {
    const message = `Hola, estoy interesado en el curso "${courseNames[index]}". ¿Podrías darme más información?`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };


  const nextCourse = () => {
    setCurrentCourseIndex((prevIndex) => (prevIndex === courseImages.length - 1 ? 0 : prevIndex + 1))
  }

  const prevCourse = () => {
    setCurrentCourseIndex((prevIndex) => (prevIndex === 0 ? courseImages.length - 1 : prevIndex - 1))
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="relative min-h-screen bg-gradient-to-r from-[#8B6914]/30 via-transparent to-[#8B6914]/30">
        {/* Background Image */}
        <div className="absolute inset-0 " />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 " />

        {/* Content */}
        <div className="relative z-10 text-white">
          {/* Navigation Bar */}
          <nav className="p-4 bg-black flex justify-between items-center">
            {/* Botón de menú hamburguesa */}
            <button
              className="text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Menú desplegable */}
            {isOpen && (
              <div className="fixed top-10 left-0 w-full bg-black text-white flex flex-col items-center py-4 shadow-lg z-50">
                <a
                  href="/login"
                  className="w-full text-center py-3 hover:bg-[#8B6914]/50 transition"
                >
                  Iniciar sesión
                </a>
                <a
                  href="/login"
                  className="w-full text-center py-3 hover:bg-[#8B6914]/50 transition"
                >
                  Registrarse
                </a>
              </div>
            )}
          </nav>


          {/* Header Section */}
          <header className="px-6 pt-4 pb-8 bg-[url('https://i.ibb.co/jk0MLcD8/fondo.png')] bg-cover bg-center bg-no-repeat opacity-80">

            <div className="mb-6">
              <img
                src="/LOGO1.png"
                alt="Erick Gomez Academy"
                className="w-[180px]"
              />
            </div>

            <div className="flex  md:flex-row gap-8 z-10">
              <div className="md:w-2/3">
                <h1 className="text-3xl font-bold mb-2 z-10">Mis Formaciones</h1>
                <p className="relative text-lg text-gray-300 z-10">
                  Si estás buscando perfeccionar tus técnicas de cortes y fade o escalar tu tus redes con Erick, este
                  año tienes la oportunidad de hacerlo 100% online sin importar de donde seas.
                </p>
              </div>

              <img src="https://i.ibb.co/mVH7LDYv/Erick-fondo.png" className="absolute top-[140px] left-[150px] z-0 md:left-[800px]" alt="" />
              <div className="md:w-1/3 flex justify-center md:justify-end">

              </div>
            </div>

            {/* Banner Section */}
            <div className="mt-8">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://i.ibb.co/L7xrzRz/Social-proof-banner.png"
                  alt="Social proof banner"
                  className="w-full h-auto object-cover md:w-1/2"
                />
              </div>
            </div>

            <p className="text-center text-sm mt-6">
              Hemos formado a más de 100,000 <br />
              Profesionales a nivel mundial
            </p>

            <div className="border-b border-[#D4AF37] my-4" />
          </header>

          {/* Courses Section */}
          <section className="px-4 py-4">
            <h2 className="text-xl font-bold text-center mb-2">CURSOS ONLINE</h2>

            <div className="flex justify-center items-center w-full">
              <img
                src="https://i.ibb.co/v6XQcg8g/Pasos.png"
                className="w-full mb-[60px] md:w-1/2"
                alt=""
              />
            </div>

            {/* Course Card */}
            <div className="rounded-xl flex flex-col items-center md:justify-center mt-5">
              <div className="relative">
                {/* Contenedor del fondo */}
                <div className="bg-[url('https://i.ibb.co/L7xrzRz/Social-proof-banner.png')] bg-cover bg-center bg-no-repeat w-screen h-[450px] bg-black/90 border-t-2 border-b-2 border-yellow-500 md:flex md:flex-col md:items-center">
                  {/* Imagen dentro del contenedor */}

                  <img
                    src={courseImages[currentCourseIndex] || "/placeholder.svg"}
                    alt={`Curso ${currentCourseIndex + 1}`}
                    className="w-full object-cover rounded-lg mt-[-30px] mb-4 md:w-1/4"
                  />
                </div>

                {/* Botón izquierdo */}
                <button
                  onClick={prevCourse}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-1"
                >
                  <ChevronLeft size={20} />
                </button>

                {/* Botón derecho */}
                <button
                  onClick={nextCourse}
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/50 rounded-full p-1"
                >
                  <ChevronRight size={20} />
                </button>
              </div>




              <div className="flex items-center justify-center mt-[160px] mb-4">
                <span className="mr-2 font-bold">4.8</span>
                <div className="flex text-[#D4AF37]">
                  <span>★★★★★</span>
                </div>
                <span className="ml-2 text-md font-bold">1,560 calificaciones</span>
              </div>
              <button>
                <a
                  href={getWhatsAppLink(currentCourseIndex)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-red-600 text-white py-3 rounded-md font-bold flex items-center justify-center p-5"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                    />
                  </svg>
                  Obtener ahora
                </a>
              </button>
            </div>


          </section>
        </div>
      </div>
    </div>
  )
}

