"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import { User, Eye, Mic, Heart, Target, Calendar } from "lucide-react"

export default function HomePage() {
  useEffect(() => {
    const link = document.createElement("link")
    link.href = "https://fonts.cdnfonts.com/css/garet"
    link.rel = "stylesheet"
    document.head.appendChild(link)
    return () => document.head.removeChild(link)
  }, [])

  const pilares = [
    {
      title: "Presencia",
      desc: "Estar ahí, completamente, para vos. Sin juicios, sin agenda, con entrega total.",
      icon: <Eye size={40} className="text-[#FFCC00]" />,
    },
    {
      title: "Escucha profunda",
      desc: "Escuchar lo que decís, lo que no decís, y lo que necesita ser dicho.",
      icon: <Mic size={40} className="text-[#FFCC00]" />,
    },
    {
      title: "Compasión",
      desc: "Una mirada amorosa, humana y comprometida con tu proceso.",
      icon: <Heart size={40} className="text-[#FFCC00]" />,
    },
    {
      title: "Sentido",
      desc: "Cada conversación busca reconectar con lo que realmente importa.",
      icon: <Target size={40} className="text-[#FFCC00]" />,
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-[#F8F5F0] font-garet">
      {/* Header */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-black shadow-md transition-all duration-300 backdrop-blur-sm bg-black/90">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link to="/" aria-label="Ir al inicio" className="transition-transform hover:scale-105 inline-block">
            <img src="/LOGOS/IMAGOTIPO/amarillo y blanco.png" alt="Logo Darío Costanza" className="h-10 w-auto" />
          </Link>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link
            to="/login"
            aria-label="Iniciar sesión"
            className="transition-all duration-300 hover:scale-110 inline-block"
          >
            <User size={28} className="text-white hover:text-[#FFCC00] transition" />
          </Link>
        </motion.div>
      </header>

      {/* Hero with background image */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative px-4 py-16 md:py-24 bg-[#F8F5F0] overflow-hidden"
      >
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
          <img
            src="https://i.ibb.co/DD4Qm0Yh/dario-1.png"
            alt="Darío Costanza"
            className="w-full h-full object-cover object-center md:object-right scale-[0.85] origin-center"
          />
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 space-y-6 text-white backdrop-blur-sm bg-black/10 p-6 rounded-xl">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block bg-[#FFCC00] text-black px-4 py-1 rounded-md text-sm font-bold uppercase shadow-lg"
              >
                UNA MIRADA DIFERENTE
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-lg"
              >
                Ser odontólogo es más que técnica, es liderar tu camino con propósito
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-lg text-gray-100 drop-shadow"
              >
                Acompaño a odontólogos a ver su profesión desde otra perspectiva. A conectar con su propósito, a liderar
                su clínica y su vida desde la presencia, la compasión y el sentido.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/contacto"
                  className="inline-block bg-[#FFCC00] hover:bg-[#E6B800] text-black font-bold py-3 px-8 rounded-full transition-all duration-300 text-center shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  QUIERO SABER MÁS
                </Link>
              </motion.div>
            </div>
            <div className="md:w-1/2">
              {/* This div is intentionally empty to maintain the layout while using the background image */}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Pilares */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 px-4 bg-[#F8F5F0] relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#FFCC00]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#FFCC00]/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#FFCC00] text-gray-900 px-4 py-1.5 rounded-full text-sm font-medium uppercase tracking-wide shadow-md inline-block"
            >
              Metodología
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold mt-4 text-gray-900"
            >
              Los pilares de mi acompañamiento
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pilares.map((pilar, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 + 0.4, duration: 0.5 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="bg-white p-6 rounded-lg shadow-md transition-all duration-300 border border-gray-100 flex flex-col items-center text-center"
              >
                <div className="bg-[#FFCC00]/10 p-4 rounded-full mb-4">{pilar.icon}</div>
                <h3 className="text-xl font-bold mb-2">{pilar.title}</h3>
                <p className="text-gray-600">{pilar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Biografía */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 px-4 bg-white"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2 overflow-hidden rounded-lg shadow-lg">
              <motion.img
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                whileHover={{ scale: 1.05, rotate: -1 }}
                src="/placeholder.svg?key=pd54d"
                alt="Clínica Dental"
                className="w-full h-auto object-cover rounded-lg transform transition-all duration-500"
              />
            </div>
            <div className="md:w-1/2 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="inline-block bg-[#FFCC00] text-black px-4 py-1 rounded-md text-sm font-bold uppercase shadow-md"
              >
                Sobre mí
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-3xl md:text-4xl font-bold text-black"
              >
                Más de 15 años combinando clínica y mentoría
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-gray-700"
              >
                Mi camino como odontólogo me llevó a comprender que la técnica es solo una parte. El verdadero cambio
                ocurre cuando te conectás con tu propósito y liderás tu propia práctica desde la presencia y el
                bienestar integral.
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="text-gray-700"
              >
                Hoy acompaño a otros odontólogos a mirar su profesión desde un lugar más humano, consciente y alineado
                con sus valores.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.7 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/sobre-mi"
                  className="inline-block bg-transparent hover:bg-[#FFCC00] text-black font-bold py-3 px-8 rounded-full transition-all duration-300 text-center border-2 border-[#FFCC00] shadow-md hover:shadow-lg transform hover:-translate-y-1"
                >
                  Conocer más
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Testimonios */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 px-4 bg-white relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FFCC00]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#FFCC00]/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-12">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-[#FFCC00] text-gray-900 px-4 py-1.5 rounded-full text-sm font-medium uppercase tracking-wide shadow-md inline-block"
            >
              Testimonios
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-bold mt-4 text-gray-900"
            >
              Experiencias de transformación
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 + 0.4, duration: 0.5 }}
                whileHover={{
                  y: -10,
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className="bg-[#F8F5F0] p-6 rounded-lg shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={`/thoughtful-artist.png?key=nlgd9&height=60&width=60&query=person%20${idx + 1}`}
                      alt={`Odontólogo ${idx + 1}`}
                      className="w-12 h-12 rounded-full object-cover border-2 border-[#FFCC00] shadow-md"
                    />
                    <div>
                      <h3 className="font-bold">Odontólogo {idx + 1}</h3>
                      <div className="flex text-[#FFCC00]">
                        {[...Array(5)].map((_, i) => (
                          <motion.span
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 + i * 0.1 + 0.5 }}
                          >
                            ★
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-700 italic relative">
                    <span className="absolute -top-2 -left-2 text-4xl text-[#FFCC00]/30">"</span>
                    "Este espacio me ayudó a reconectar con mi propósito y liderar mi clínica desde un lugar más
                    consciente y humano."
                    <span className="absolute -bottom-5 -right-2 text-4xl text-[#FFCC00]/30">"</span>
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA final */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 px-4 bg-[#FFCC00] text-gray-900 text-center relative overflow-hidden"
      >
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full blur-xl"></div>
        </div>

        <div className="container mx-auto max-w-3xl relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-sm"
          >
            ¿Querés mirar tu profesión desde otro lugar?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg mb-8"
          >
            Te invito a explorar nuevas formas de liderar tu camino como odontólogo, desde el propósito y el bienestar
            integral.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/contacto"
              className="inline-flex items-center gap-2 bg-black hover:bg-gray-800 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 text-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Calendar size={24} />
              QUIERO TRANSFORMARME
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </div>
  )
}
