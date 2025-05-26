import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function WorkshopLanding() {
  

    const [showExtraContent, setShowExtraContent] = useState(false);
    const valueStackRef = useRef(null);

     const [timeLeft, setTimeLeft] = useState(getRemainingTime());
const [showOffer, setShowOffer] = useState(true);

  function getRemainingTime() {
    const now = new Date();
    const tomorrow = new Date();
    tomorrow.setHours(23, 59, 59, 999);
    return tomorrow - now;
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getRemainingTime());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const hours = String(Math.floor(timeLeft / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(Math.floor((timeLeft / (1000 * 60)) % 60)).padStart(2, "0");
  const seconds = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, "0");

    const handleWppClick = (mensaje) => {
  if (typeof fbq !== "undefined") {
    fbq('track', 'Contact'); // o 'Lead' si querés otro evento
  }
  window.open(`https://wa.me/15557644626?text=${encodeURIComponent(mensaje)}`, '_blank');
};


    const scrollToValueStack = () => {
        if (valueStackRef.current) {
            const topOffset = valueStackRef.current.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = topOffset - 30;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    const benefits = [
        {
            img: "/23.png",
            text: "<strong>🧠 Dominá el juego desde adentro</strong>: Transformá tu mentalidad para dejar de pensar como técnico y empezar a crecer como profesional libre y rentable."
        },
        {
            img: "/21.png",

            text: "<strong>🚀 Pacientes que te buscan</strong>, no que te comparan: Aprendé a posicionarte como referente en tu zona sin sentir que estás vendiendo todo el tiempo."
        },
        {
            img: "https://i.ibb.co/dwCmYC9r/cam-mock-up.png",
            text: "<strong>📸 Imagen que vende por vos</strong>: Mostrá tu trabajo como un profesional premium, aunque no sepas nada de fotografía o edición."
        },
        {
            img: "https://i.ibb.co/N68NtPTs/732b8122-3e80-4330-8507-87a70f9d787d.png",
            text: "<strong>💼 Gestión que no te roba tiempo</strong>: Organizá tu consultorio como un negocio, con herramientas simples que te devuelven horas de vida."
        },
        {
            img: "/24.png",
            text: "<strong>📊 Finanzas que te permiten vivir de esto</strong>: Aprendé a cobrar bien, manejar tu dinero y dejar de tener un buen mes y uno flojo."
        },
        {
            img: "https://i.ibb.co/NgJqry0C/comunidad.png",
            text: "<strong>💬 No estás solo en esto</strong>: Conectá con una comunidad de odontólogos que comparten tus desafíos y crecen juntos."
        }
    ];

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowExtraContent(true);
        }, 3000);

        return () => clearTimeout(timeout);
    }, []);

    useEffect(() => {
        const link = document.createElement("link");
        link.href = "https://fonts.cdnfonts.com/css/garet";
        link.rel = "stylesheet";
        document.head.appendChild(link);
        return () => document.head.removeChild(link);
    }, []);

    useEffect(() => {
  // Revisar si ya hay un tiempo guardado
  const savedStart = localStorage.getItem("focusOfferStart");

  let startTime;

  if (savedStart) {
    startTime = new Date(savedStart);
  } else {
    startTime = new Date();
    localStorage.setItem("focusOfferStart", startTime.toISOString());
  }

  const interval = setInterval(() => {
    const now = new Date();
    const elapsed = now - new Date(startTime);
    const total = 24 * 60 * 60 * 1000; // 24 hs en ms
    const remaining = total - elapsed;

    if (remaining <= 0) {
      localStorage.removeItem("focusOfferStart");
      setShowOffer(false);
      clearInterval(interval);
    } else {
      setTimeLeft(remaining);
    }
  }, 1000);

  return () => clearInterval(interval);
}, []);

const formatTime = (ms) => {
  const hours = String(Math.floor(ms / (1000 * 60 * 60))).padStart(2, "0");
  const minutes = String(Math.floor((ms / (1000 * 60)) % 60)).padStart(2, "0");
  const seconds = String(Math.floor((ms / 1000) % 60)).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};


    useEffect(() => {
  const timer = setInterval(() => {
    setTimeLeft(getRemainingTime());
  }, 1000);
  return () => clearInterval(timer);
}, []);


  useEffect(() => {
  const script1 = document.createElement('script');
  script1.src = 'https://fast.wistia.com/player.js';
  script1.async = true;
  document.body.appendChild(script1);

  const scriptTags = [];

  const ids = ['0sse36yiqn', 'klhc8r6prt', 'vxamn03xcr'];
  ids.forEach(id => {
    const script = document.createElement('script');
    script.src = `https://fast.wistia.com/embed/${id}.js`;
    script.async = true;
    script.type = 'module';
    document.body.appendChild(script);
    scriptTags.push(script);
  });

  return () => {
    // Remover script player.js
    if (script1.parentNode) {
      script1.parentNode.removeChild(script1);
    }

    // Remover scripts de cada video solo si existen en el DOM
    scriptTags.forEach(script => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    });
  };
}, []);






    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-black via-[#FFCC00] to-black font-[Garet] text-black">


            <div className="bg-white rounded-2xl max-w-4xl w-[96%] p-2 md:p-6 mx-5 shadow-lg mt-2 md:mt-7">

                {/* HEADER */}
                <header className="text-center">
                    <h1 className="text-black text-3xl md:text-5xl font-bold underline decoration-[#FFCC00] underline-offset-4 drop-shadow-lg mt-2 mb-2">
                       Cómo pasar de sentirte atrapado en tu profesión a sentirte dueño de tu tiempo, tu vida y tus decisiones
                    </h1>

   {/* VIDEO (Wistia) */}
<div className="text-center flex justify-center items-center w-full mb-5 bg-black">
  <div className="relative w-full max-w-4xl aspect-video mt-5">
    <style>
      {`
        wistia-player[media-id='0sse36yiqn']:not(:defined) {
          background: center / contain no-repeat url('https://fast.wistia.com/embed/medias/0sse36yiqn/swatch');
          display: block;
          filter: blur(5px);
          padding-top: 56.25%;
        }
      `}
    </style>

    <script
      src="https://fast.wistia.com/player.js"
      async
    ></script>
    <script
      src="https://fast.wistia.com/embed/0sse36yiqn.js"
      async
      type="module"
    ></script>

    <div
      dangerouslySetInnerHTML={{
        __html: `<wistia-player media-id="0sse36yiqn" aspect="1.7777777777777777"></wistia-player>`
      }}
    />
  </div>
</div>

                        <>

                       

                            
                            <motion.div
                                onClick={scrollToValueStack}
                                whileHover={{ scale: 1.05 }}
                                className="flex justify-center items-center text-black bg-[#FFCC00] text-base md:text-2xl font-bold p-3 rounded-lg shadow-lg mx-auto w-full max-w-xl mb-3 mt-3 cursor-pointer"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            >
                                🚀 Accede a mi formación 🚀
                            </motion.div>
                        </>
                 

                    {/* Slider de Clientes */}
                    <section className="pb-6 pt-6 bg-white">
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

                    <p className="text-lg md:text-xl text-gray-800 mb-3">
                        Cuando empezaste esta carrera, te imaginabas ayudando a la gente, viviendo bien de tu trabajo y teniendo una vida estable.<br /><br />
                        Pero algo se desvió. Ahora sentís que trabajás el doble, ganás menos de lo que merecés y que estás siempre apagando incendios.<br /><br />
                        <strong>Esa sensación de estancamiento no es normal.</strong><br /><br />
                        Este programa está pensado para que <strong>tomes el control total</strong> de tu carrera, <strong>recuperes tiempo</strong>, <strong>mejores tus ingresos</strong> y vuelvas a sentirte orgulloso de lo que construís cada día.<br /><br />
                        Porque sí: esa versión de tu profesión que alguna vez soñaste, existe. Solo tenés que dejar de postergarla.
                    </p>
                </header>

                {/* Testimonios Focus Dental */}
<section className="w-full max-w-4xl mx-auto px-4 py-10">
  <h2 className="text-3xl font-bold text-center text-black mb-8 underline decoration-[#FFCC00] underline-offset-4">
    Testimonios de Focus Dental
  </h2>

  {[ 'klhc8r6prt', 'vxamn03xcr' ].map((id, index) => (
    <div key={id} className="relative w-full aspect-video mb-10">
      <style>
        {`
          wistia-player[media-id='${id}']:not(:defined) {
            background: center / cover no-repeat url('https://fast.wistia.com/embed/medias/${id}/swatch');
            display: block;
            filter: blur(4px);
            padding-top: 56.25%;
          }
        `}
      </style>
      <div
        dangerouslySetInnerHTML={{
          __html: `<wistia-player media-id="${id}" aspect="1.7777777777777777"></wistia-player>`
        }}
      />
    </div>
  ))}

</section>




                {/* BENEFICIOS */}
                <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-3xl font-bold text-center mb-8 underline decoration-[#FFCC00] underline-offset-4">
                        Los 6 pilares para una práctica rentable y sin estrés
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                className="flex flex-col items-center gap-4 p-6 border border-[#ffcc00] rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-300 text-center min-h-[320px]"
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >

                                <img
                                    src={benefit.img}
                                    alt=""
                                    className="w-auto h-60 sm:h-52 object-contain rounded-xl"
                                />
                                <span className="text-base md:text-lg text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: benefit.text }} />
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* VALUE STACK */}
                <motion.div
                    ref={valueStackRef}
                    className="bg-white  rounded-xl p-5 mt-5 shadow-xl text-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold underline decoration-[#FFCC00] underline-offset-4 mb-4">
                        Esto es TODO lo que vas a recibir con <span className="text-green-600">FOCUS DENTAL</span>
                    </h2>

                    <img
                        src="https://i.ibb.co/B51S2F3Z/Mock-up-dario-sin-fondo.png"
                        alt="Logo Darío Costanza"
                        className="w-full h-auto max-h-25 object-contain rounded-xl mb-4"
                    />

                    <ul className="text-center text-base md:text-lg font-medium mb-6 max-w-3xl mx-auto space-y-2">
                        <li><strong>🎓 Acceso completo al Programa Focus Dental – </strong><span className="text-red-600 font-bold">$997 USD</span></li>
                        <li>🖼️<strong> Bono #1: </strong>Pack de imágenes listas para tu consultorio – <span className="text-red-600 font-bold">$97 USD</span></li>
                        <li>📲<strong> Bono #2: </strong>Mensajes que hacen volver a tus pacientes – <span className="text-red-600 font-bold">$197 USD</span></li>
                        <li>👥<strong> Bono #3: </strong>Comunidad privada de odontólogos – <span className="text-red-600 font-bold">$297 USD</span></li>
                        <li>📂<strong> Bono #4: </strong>Recursos descargables de gestión – <span className="text-red-600 font-bold">$297 USD</span></li>
                        <li>🛠️<strong> Bono #5: </strong>Herramientas digitales que te ahorran tiempo – <span className="text-red-600 font-bold">$147 USD</span></li>
                        <li>🎁<strong> Bono #6: </strong>Descuentos exclusivos en insumos y equipamiento – <span className="text-red-600 font-bold">$250 USD</span></li>
                        <li>🎁<strong> Bono #7: </strong>Clase en Vivo con Dario – <span className="text-red-600 font-bold">$497 USD</span></li>
                    </ul>
{showOffer && (
        <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-3xl p-8 md:p-12 mb-6 max-w-2xl mx-auto text-center border-2 border-yellow-400/30 shadow-[0_0_50px_rgba(255,204,0,0.3)] backdrop-blur-sm">
          {/* Efectos de brillo premium en las esquinas */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-2xl" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-yellow-400/20 to-transparent rounded-full blur-2xl" />

          <div className="relative z-10">
            <h3 className="text-xl md:text-3xl font-bold text-yellow-400 uppercase tracking-wider mb-2 drop-shadow-[0_0_10px_rgba(255,204,0,0.5)]">
              COMPRANDO <span className="underline font-extrabold text-yellow-300">HOY</span>
            </h3>
            <p className="text-2xl md:text-4xl font-extrabold bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-300 bg-clip-text text-transparent mt-2 mb-4 drop-shadow-lg">
              TE LLEVÁS TODOS LOS BONUS GRATIS
            </p>

            {/* Contenedor para OFERTA ESPECIAL con subrayado dorado */}
            <div className="relative inline-block mb-6">
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-wide drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] ">
                OFERTA ESPECIAL!
              </h2>

            
              
            </div>

            <p className="text-yellow-200 text-base md:text-lg font-medium mb-6 drop-shadow-md">Expira en:</p>

            {/* Contenedor del cronómetro con destello de fondo */}
            <div className="relative">
              {/* Destello horizontal detrás de todo el cronómetro */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-full max-w-md h-2 bg-gradient-to-r from-transparent via-yellow-400 to-transparent blur-lg opacity-40 animate-pulse" />
              </div>

              {/* Destello adicional más intenso */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-1 bg-gradient-to-r from-transparent via-yellow-300 to-transparent blur-md opacity-60" />
              </div>

              {/* Cronómetro */}
              <div className="relative z-10 flex justify-center gap-6 mt-4">
                {["Horas", "Min", "Seg"].map((label, i) => {
                  const parts = formatTime(timeLeft).split(":")
                  const timeVal = parts[i]
                  return (
                    <div
                      key={label}
                      className="relative bg-gradient-to-b from-gray-800 to-black w-20 md:w-24 h-24 md:h-28 rounded-xl flex items-center justify-center shadow-[inset_0_2px_10px_rgba(0,0,0,0.8),0_0_20px_rgba(255,204,0,0.2)] border border-yellow-400/20"
                    >
                      {/* Brillo interno en cada número */}
                      <div className="absolute inset-1 bg-gradient-to-b from-yellow-400/5 to-transparent rounded-lg" />

                      <span className="relative z-10 text-4xl md:text-6xl font-black bg-gradient-to-b from-yellow-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,204,0,0.8)]">
                        {timeVal}
                      </span>
                      <div className="absolute -bottom-6 text-xs text-yellow-200 font-semibold uppercase tracking-wider">
                        {label}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}





                    <div className="flex flex-col items-center mb-2">
                        <p className="text-xl font-bold text-red-600 line-through mb-1">$1,985 USD</p>
                        <div className="bg-green-100 border border-green-600 text-green-800 text-3xl md:text-6xl font-extrabold py-1 mb-4 px-6 rounded-xl shadow-md tracking-wide">
                            $297 USD
                        </div>
                          <div className="bg-yellow-100 border border-yellow-500 text-yellow-800 text-sm font-bold px-4 py-1 rounded-lg shadow-sm mb-2">
    💳 ¡3 cuotas sin interés disponibles!
  </div>
  <div className="flex items-center justify-center gap-2 mt-1">
      <img
      src="https://flagcdn.com/w40/ar.png"
      alt="Bandera Argentina"
      className="w-6 h-4 object-cover rounded-sm"
    />
    
    <p className="text-sm font-semibold">
      
      En Argentina por <span className="text-green-600 font-bold">$329.000 ARS</span>
    </p>
  </div>
                    </div>

                           
                 <div className="flex items-center justify-center gap-4 mt-2 px-5">

    <img
    src="https://i.ibb.co/jPDQkz5N/Screenshot-2025-05-11-215629.png"
    alt="Tarjeta crédito 1"
    className="w-24 md:w-40 h-auto"
  />
  <img
    src="https://i.ibb.co/zW4Z4f9w/Screenshot-2025-05-11-205010.png"
    alt="Tarjeta crédito 1"
    className="w-24 md:w-40 h-auto"
  />
   <img
    src="https://i.ibb.co/d0qxzjrB/Screenshot-2025-05-11-205343.png"
    alt="Tarjeta crédito 1"
    className="w-24 md:w-40 h-auto"
  />



</div>

                    <motion.button
  onClick={() => handleWppClick("¡Hola! Quiero acceder al Programa Focus Dental")}
  className="bg-[#FFCC00] text-black text-xl md:text-2xl font-semibold py-4 px-10 rounded-lg w-full max-w-2xl mx-auto mt-6 transition-transform hover:scale-105 shadow-lg"
  whileHover={{ scale: 1.1 }}
  animate={{
    scale: [1, 1.05, 1],
    boxShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 10px rgba(255,204,0,0.8)", "0px 0px 0px rgba(0,0,0,0)"]
  }}
  transition={{ repeat: Infinity, duration: 2 }}
>
  ¡Quiero transformar mi consultorio!
</motion.button>


                </motion.div>

                {/* CIERRE */}
                <div className="bg-white mt-5 p-5 rounded-xl shadow-md text-lg text-gray-800">
                    <blockquote className="italic border-l-4 border-[#FFCC00] pl-4">
                        Sé lo que estás pensando. ¿Y si esto no es para mí? ¿Y si no me sale?
                        <br /><br />
                        Yo también estuve ahí. Dudando. Probando cosas sueltas.
                        Hasta que entendí que no necesitaba saberlo todo. Solo necesitaba el sistema correcto.
                        <br /><br />
                        <strong>Una hoja de ruta. Un GPS para dejar de improvisar.</strong>
                        <br /><br />
                        Hoy tenés la posibilidad de acceder con una inversión mínima… pero el acceso no va a estar siempre abierto.
                        <br /><br />
                        Porque <strong>prefiero acompañar a pocos odontólogos comprometidos, que vender a muchos sin resultados.</strong>
                    </blockquote>

                

<div className="max-w-4xl mx-auto px-6 py-16 bg-white rounded-xl shadow-lg">
  <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-12">
    Preguntas Frecuentes <span className="text-yellow-500">Focus Dental</span>
  </h2>

  <div className="divide-y divide-gray-200 space-y-6">
    
    {/* Acceso */}
    <div className="pt-2">
      <div className="flex items-start gap-4 mb-2">
        <svg className="w-8 h-8 md:w-6 md:h-6 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg md:text-xl font-semibold text-black">
          ¿Hasta cuándo tengo acceso a la formación?
        </h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        Vas a tener acceso de por vida a todo el contenido. Los bonos exclusivos, como la clase en vivo con Darío, están disponibles solo durante esta etapa de lanzamiento.
      </p>
    </div>

    {/* Modalidad */}
    <div className="pt-6">
      <div className="flex items-start gap-4 mb-2">
        <svg className="w-8 h-8 md:w-6 md:h-6 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2m10 0V6a4 4 0 10-8 0v2m8 0H9" />
        </svg>
        <h3 className="text-lg md:text-xl font-semibold text-black">
          ¿Cómo es la modalidad?
        </h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        Es 100% online. Podés ver las clases donde quieras, cuando quieras, las veces que necesites. El acceso es tuyo para siempre.
      </p>
    </div>

    {/* Inicio */}
    <div className="pt-6">
      <div className="flex items-start gap-4 mb-2">
        <svg className="w-8 h-8 md:w-6 md:h-6 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6m10 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="text-lg md:text-xl font-semibold text-black">
          ¿Cuándo empieza el programa?
        </h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        El acceso es inmediato. Una vez que te inscribís, ya podés empezar a ver las clases y avanzar a tu ritmo.
      </p>
    </div>

    {/* Cuotas */}
    <div className="pt-6">
      <div className="flex items-start gap-4 mb-2">
        <svg className="w-8 h-8 md:w-6 md:h-6 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2-3 .895-3 2 1.343 2 3 2m0-8V4m0 16v-4" />
        </svg>
        <h3 className="text-lg md:text-xl font-semibold text-black">
          ¿Puedo pagar en cuotas?
        </h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        Sí. Aceptamos pagos en cuotas mediante tarjetas de credito.
      </p>
    </div>

    {/* Consultas */}
    <div className="pt-6">
      <div className="flex items-start gap-4 mb-2">
        <svg className="w-8 h-8 md:w-6 md:h-6 text-yellow-500 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M21 16v2a2 2 0 01-2 2H5l-2 2V6a2 2 0 012-2h14a2 2 0 012 2v10z" />
        </svg>
        <h3 className="text-lg md:text-xl font-semibold text-black">
          Quiero más información
        </h3>
      </div>
      <p className="text-gray-700 leading-relaxed">
        ¡Escribime! Estoy para ayudarte. Contame qué duda tenés y te explico todo con claridad.
      </p>
    </div>
<motion.button
  onClick={() =>
    handleWppClick("Hola, estoy listo para inscribirme a la formación Focus Dental.")
  }
  className="bg-[#FFCC00] text-black text-lg font-bold py-3 px-6 rounded-lg shadow-md mx-auto block"
  whileHover={{ scale: 1.05 }}
>
  QUIERO INSCRIBIRME
</motion.button>



  </div>
</div>




                         <h2 className="mt-5 text-3xl font-bold text-center mb-8 underline decoration-[#FFCC00] underline-offset-4">
                        ¿Podés garantizarme resultados?
                    </h2>
                    <p className='px-5'>	

Te garantizamos un método probado y un acompañamiento constante, herramientas y soporte práctico , para que puedas tomar decisiones estratégicas y aumentar tu rentabilidad.</p>
                    <div className="w-48 h-48 overflow-hidden mx-auto mt-2 rounded">
                        <img 
                            src="/Garantia s fondo.png" 
                            alt="Descripción de la imagen"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <motion.button
                        onClick={() => window.open("https://wa.me/15557644626?text=¡Hola!%20Quiero%20más%20info%20sobre%20Focus%20Dental", "_blank")}
                        className="bg-[#FFCC00] text-black text-lg font-bold py-3 px-6 rounded-lg shadow-md mx-auto block"
                        whileHover={{ scale: 1.05 }}
                    >
                        QUIERO MÁS INFO
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
