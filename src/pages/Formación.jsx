import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function WorkshopLanding() {
    const [timeLeft, setTimeLeft] = useState(0);
    const [showExtraContent, setShowExtraContent] = useState(false);
    const valueStackRef = useRef(null);

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
            img: "/22.png",
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
        const deadline = new Date("2025-05-18T00:00:00").getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = deadline - now;
            setTimeLeft(distance > 0 ? distance : 0);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const script1 = document.createElement('script');
        script1.src = 'https://fast.wistia.com/player.js';
        script1.async = true;
        document.body.appendChild(script1);
    
        const script2 = document.createElement('script');
        script2.src = 'https://fast.wistia.com/embed/8eetqfnrcb.js';
        script2.async = true;
        script2.type = 'module';
        document.body.appendChild(script2);
    
        return () => {
            document.body.removeChild(script1);
            document.body.removeChild(script2);
        };
    }, []);    

    const formatTime = (time) => {
        const days = Math.floor(time / (1000 * 60 * 60 * 24));
        const hours = String(Math.floor((time / (1000 * 60 * 60)) % 24)).padStart(2, '0');
        const minutes = String(Math.floor((time / 1000 / 60) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((time / 1000) % 60)).padStart(2, '0');
        return { days, hours, minutes, seconds };
    };

    const { days, hours, minutes, seconds } = formatTime(timeLeft);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-black via-[#FFCC00] to-black font-[Garet] text-black">
            <img
                src="/LOGOS/IMAGOTIPO/amarillo y blanco.png"
                alt="Logo Darío Costanza"
                className="h-10 w-auto mt-2"
            />

            <div className="bg-white rounded-2xl max-w-4xl w-[96%] p-2 md:p-6 mx-5 shadow-lg mt-2 md:mt-7">

                {/* HEADER */}
                <header className="text-center">
                    <h1 className="text-black text-3xl md:text-5xl font-bold underline decoration-[#FFCC00] underline-offset-4 drop-shadow-lg mt-2 mb-2">
                        Esto es de Odontólogos, para odontólogos.
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



                    {/* CTA al minuto 0 */}
                    {showExtraContent && (
                        <>

                        {/* 
                            <div className="bg-white border-2 border-[#FFCC00] text-black font-semibold text-base md:text-lg py-3 px-5 rounded-md text-center mb-2 shadow-sm">
                                <p className="mb-2">
                                    Precio lanzamiento disponible hasta el <span className="font-bold">18 de mayo</span>
                                </p>
                                <div className="bg-black text-[#FFCC00] text-xl font-bold py-2 px-4 rounded-md inline-block ">
                                    ⏳ {days} días, {hours}:{minutes}:{seconds} ⏳
                                </div>
                            </div>

                            */}
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
                    )}

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
                    className="bg-white border-4 border-dashed border-[#FFCC00] rounded-xl p-5 mt-5 shadow-xl text-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold underline decoration-[#FFCC00] underline-offset-4 mb-4">
                        Esto es TODO lo que vas a recibir con <span className="text-green-600">FOCUS DENTAL</span>
                    </h2>

                    <img
                        src="https://i.ibb.co/RGcDgqdJ/general-2.png"
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
                        <li>🎁<strong> Bono #7: </strong>Clase en Vivo con Dario – SOLO los primeros 30 en ingresar – <span className="text-red-600 font-bold">$497 USD</span></li>
                    </ul>

                    <div className="flex flex-col items-center mb-2">
                        <p className="text-xl font-bold text-red-600 line-through mb-1">$1,985 USD</p>
                        <div className="bg-green-100 border border-green-600 text-green-800 text-3xl font-extrabold py-2 mb-4 px-6 rounded-xl shadow-md tracking-wide">
                            $197 USD
                        </div>
                    </div>

         {/* 
                           <div className="bg-white border-2 border-[#FFCC00] text-black font-semibold text-base md:text-lg py-3 px-5 rounded-md text-center shadow-sm">
                        <p className="mb-2">
                            Precio lanzamiento disponible hasta el <span className="font-bold">18 de mayo</span>
                        </p>
                        <div className="bg-black text-[#FFCC00] text-xl font-bold py-2 px-2 rounded-md inline-block ">
                            ⏳ {days} días, {hours}:{minutes}:{seconds} ⏳
                        </div>
                    </div>

                            */}
                 

                    <motion.button
                        onClick={() => window.open("https://wa.me/5491170587318?text=¡Hola!%20Quiero%20acceder%20al%20Programa%20Focus%20Dental", "_blank")}
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

                    <motion.p
                        className="flex justify-center mt-6 text-center font-bold text-xl text-[#FFCC00] bg-black/80 rounded-lg px-4 py-3 shadow-lg backdrop-blur-sm inline-block mx-auto w-fit"
                        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        🎯 Si sentís que llegó tu momento, no sigas postergándolo.
                    </motion.p>
                    <div className="w-48 h-48 overflow-hidden mx-auto mt-2 rounded">
                        <img 
                            src="/Garantia s fondo.png" 
                            alt="Descripción de la imagen"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <motion.button
                        onClick={() => window.open("https://wa.me/5491170587318?text=¡Hola!%20Quiero%20más%20info%20sobre%20Focus%20Dental", "_blank")}
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
