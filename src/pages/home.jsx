
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Eye, Mic, Heart, Target } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

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
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent"></div>

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


      {/* Slider de Clientes */}
      <section className="pb-6 bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 tracking-tight">
            Ellos confiaron en mí:
          </h2>
          <div className="w-24 h-1 mx-auto bg-[#FFCC00] mt-3 rounded"></div>
        </div>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30}
          slidesPerView={2}
          breakpoints={{
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
          loop={true}
          grabCursor={true}
          autoplay={{
            delay: 1,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={2000}
          allowTouchMove={false}
          className="max-w-7xl mx-auto px-4"
        >

          {[
            'Círculo Odontológico de San Juan.webp',
            'Colegio Odontológico de la Provincia de Córdoba.webp',
            'La dental 2.webp',
            'Centro de formación de sonrisas (negro).webp',
            'Círculo Odontológico de Salta (negro).webp',
            'Círculo Odontológico de Jesús María.webp',
          ].map((logo, idx) => (
            <SwiperSlide key={idx} className="flex justify-center items-center pt-6">
              <div className="h-32 w-32 flex justify-center items-center bg-transparent">
                <img
                  src={`/WepP/${logo}`}
                  alt={`Logo ${idx + 1}`}
                  className="h-20 sm:h-24 md:h-28 object-contain transition-transform duration-500 hover:scale-105 hover:brightness-110 drop-shadow-md"
                  loading="lazy"
                  decoding="async"
                />

              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* CTA */}

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 px-4 bg-white"
      >

        <div className="container mx-auto max-w-3xl space-y-6">
          <h2 className="text-4xl font-bold">¿Te gustaría empezar tu proceso?</h2>
          <p className="text-lg">
            Si sentís que es momento de mirar hacia adentro, rediseñar tu forma de vivir o liderar, estoy acá para acompañarte con compromiso y alegría.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://wa.me/5491170587318?text=¡Hola!%20Quiero%20empezar%20mi%20proceso"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-gray-900 transition"
            >
              Hablemos
            </a>

          </div>
        </div>
      </motion.section>

     


    </div>
  )
}
