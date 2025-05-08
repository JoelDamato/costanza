import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Eye, Mic, Heart, Target } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function HomePage() {
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.cdnfonts.com/css/garet";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

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
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white font-garet">

      {/* Header */}
      <header className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-black shadow-md transition-all duration-300">
        <Link to="/" aria-label="Ir al inicio">
          <img
            src="/LOGOS/IMAGOTIPO/amarillo y blanco.png"
            alt="Logo Darío Costanza"
            className="h-10 w-auto"
          />
        </Link>
        <Link to="/login" aria-label="Iniciar sesión">
          <User size={28} className="text-white hover:text-[#FFCC00] transition" />
        </Link>
      </header>

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative px-4 py-3 md:py-36 bg-white overflow-hidden"
      >
        <div className="container mx-auto max-w-6xl text-center space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl md:text-6xl font-bold text-gray-900 leading-tight"
          >
            Acompañando procesos de transformación con propósito y presencia
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-l text-gray-600 max-w-2xl mx-auto"
          >
            Soy Darío Costanza, coach profesional desde hace más de 15 años. Estoy acá para potenciar tu bienestar desde una presencia cercana, profesional y motivadora.
          </motion.p>
        </div>
      </motion.section>

      {/* Biografía */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-3 px-4 bg-[#E0E0E0]"
      >
        <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-12 items-center">
          <motion.img
            src="/dario.jpg"
            alt="Darío Costanza"
            className="rounded-3xl shadow-lg"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Sobre mí</h2>
            <p className="text-lg text-gray-800">
              Soy odontólogo, especializado en estética dental e implantología, y apasionado por el marketing y la fotografía aplicada a la odontología.
            </p>
            <p className="text-lg text-gray-800">
              Fundé CODA Odontología con el propósito de unir tecnología, diseño de sonrisas y gestión clínica para transformar la experiencia del paciente y el modelo de negocio odontológico.
            </p>
            <p className="text-lg text-gray-800">
              Acompaño a otros profesionales a potenciar sus prácticas a través de mentorías, cursos de marketing y fotografía dental, combinando visión clínica, estrategia y creatividad.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Pilares con íconos y animación */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-3 mb-6 px-4 bg-white"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <span className="bg-[#FFCC00] text-gray-900 px-4 py-1.5 rounded-full text-sm font-medium uppercase tracking-wide">
              Mis Pilares
            </span>
            <h2 className="text-4xl font-bold mt-4 text-gray-900">Lo que sostiene mi práctica</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {pilares.map((pillar, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="bg-[#E0E0E0] p-8 rounded-2xl shadow-md border border-gray-200 hover:shadow-xl transition relative group"
              >
                <div className="mb-4 flex justify-center items-center">
                  <motion.div
                    whileHover={{
                      y: -6,
                      scale: 1.15,
                      rotate: [-3, 3, -2, 2, 0], // leve vibración orgánica
                    }}
                    transition={{ type: "spring", stiffness: 180, damping: 10 }}
                    className="transition duration-300 group-hover:drop-shadow-[0_8px_25px_rgba(255,204,0,0.6)]"
                  >
                    {pillar.icon}
                  </motion.div>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{pillar.title}</h3>
                <p className="text-gray-700">{pillar.desc}</p>
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
        className="py-6 px-4 bg-[#FFCC00] text-gray-900 text-center"
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
  );
}
