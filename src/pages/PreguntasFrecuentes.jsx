"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import Navbar from "../components/Navbar" 

const PreguntasFrecuentes = () => {
  const [abiertas, setAbiertas] = useState({})

  const secciones = [
    {
      titulo: "Preguntas Frecuentes",
      preguntas: [
        {
          pregunta: "¿Qué voy a aprender realmente en esta formación?",
          respuesta:
            "Vas a aprender a posicionarte como un referente en tu especialidad, dejando de depender del boca a boca y construyendo una marca que atrae pacientes que valoran tu trabajo. Combinamos marketing estratégico, fotografía dental, redes sociales, mentalidad emprendedora y un paso a paso probado que ya transformó la carrera de cientos de colegas.",
        },
        {
          pregunta: "¿Necesito conocimientos previos en marketing o fotografía?",
          respuesta:
            "Para nada. El curso está diseñado para odontólogos que quieren empezar desde cero, con herramientas simples, prácticas y 100% aplicadas a tu día a día. Si sabés atender pacientes, podés aplicar este método.",
        },
        {
          pregunta: "¿Desde dónde accedo y cómo es la modalidad?",
          respuesta:
            "La formación es 100% online y podés acceder desde cualquier país. Solo necesitás conexión a internet. Incluye clases grabadas y materiales descargables. Podés avanzar a tu ritmo y volver a ver las clases todas las veces que necesites.",
        },
        {
          pregunta: "¿Recibo diploma al finalizar?",
          respuesta:
            "Sí. Una vez que completes los módulos y apruebes la evaluación final, accedés a un diploma que valida tu crecimiento profesional. Más allá del papel, lo importante es la transformación real que vas a lograr en tu consultorio y en tu mentalidad.",
        },
        {
          pregunta: "¿Qué pasa después de terminar el curso?",
          respuesta:
            "Tu camino recién empieza. Vas a ser parte de una comunidad activa con colegas que ya están creciendo, accedés a actualizaciones y nuevas formaciones, y podés seguir escalando con programas más avanzados y mentorías.",
        },
      ],
    },
  ]

  const togglePregunta = (id) => {
    setAbiertas((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <>
    <Navbar/>
    <div className="min-h-screen bg-black text-white py-12 px-6 md:px-16 relative">
      {/* Destello amarillo suave en la esquina inferior izquierda */}
      <div
        className="pointer-events-none absolute left-0 bottom-0 w-48 h-48"
        style={{
          background: "radial-gradient(circle at 0% 100%, #FFD700 0%, #FFD70088 40%, transparent 80%)",
          opacity: 0.7,
          zIndex: 1,
        }}
      />
      {secciones.map((seccion, i) => (
        <div key={i} className="mb-10 max-w-3xl mx-auto">
          <h2 className="p-5 text-3xl md:text-3xl font-bold text-center mb-6 text-transparent bg-gradient-to-b from-gray-400 to-gray-200 bg-clip-text drop-shadow-lg tracking-wide">
            {seccion.titulo}
          </h2>

          <div className="space-y-3">
            {seccion.preguntas.map((q, idx) => {
              const id = `${i}-${idx}`
              const abierta = abiertas[id]

              return (
                <div key={id} className="border border-black rounded-3xl p-6 bg-[#FFD700]">
                  <button
                    className="w-full flex items-center justify-between text-left font-bold text-black"
                    onClick={() => togglePregunta(id)}
                  >
                    <span className="flex items-center gap-2">
                      {/* SVG con fondo transparente y líneas negras */}
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9 12.75 3 3m0 0 3-3m-3 3v-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      {q.pregunta}
                    </span>
                    <motion.div animate={{ rotate: abierta ? 180 : 0 }} transition={{ duration: 0.3 }}>
                      <ChevronDown className="w-5 h-5 text-black" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {abierta && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-2 text-black text-sm leading-relaxed overflow-hidden"
                      >
                        {q.respuesta}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default PreguntasFrecuentes

