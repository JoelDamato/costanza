import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from "framer-motion";

export default function WorkshopLanding() {
    const [timeLeft, setTimeLeft] = useState(0);

    const benefits = [
        { text: "Acceso a cursos exclusivos de marketing y gestión para odontólogos.", img: "/DARIO CONSTANZA BOOK.png" },
        { text: "Técnicas avanzadas de fotografía dental para potenciar tu imagen profesional.", img: "/NOTEBOOK DARIO 2.png" },
        { text: "Sesiones personalizadas de coaching para el crecimiento de tu clínica.", img: "/BUSINESS CARDS DARIO.png" },
        { text: "Networking con profesionales de la odontología a nivel internacional.", img: "/comunidad dario.png" },
        { text: "Recursos y herramientas digitales para optimizar la gestión de pacientes.", img: "/comunidad dario2.png" },
        { text: "Casos de estudio y mentorías en implantología y estética dental.", img: "/DARIO CONSTANZA BOOK 2.png" },
        { text: "Acceso exclusivo a eventos, webinars y conferencias del sector.", img: "/NOTEBOOK DARIO.png" }
    ];

    useEffect(() => {
        let endTime = localStorage.getItem("endTime");
        if (!endTime) {
            endTime = Date.now() + 3600000;
            localStorage.setItem("endTime", endTime);
        }
        const updateTimer = () => {
            const timeRemaining = endTime - Date.now();
            setTimeLeft(timeRemaining > 0 ? timeRemaining : 0);
        };
        updateTimer();
        const interval = setInterval(updateTimer, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (time) => {
        const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, '0');
        const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
        return { minutes, seconds };
    };

    const { minutes, seconds } = formatTime(timeLeft);

    const recibirRef = useRef(null);

    const scrollValueStack = () => {
        if (recibirRef.current) {
            const topOffset = recibirRef.current.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = topOffset - 30; // Ajustá este valor según cuánto querés que quede más arriba

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };



    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-black via-[#ffc400] to-black font-sans">
            <motion.img src="/LOGO1.png" alt="Logo" className='w-[250px] mt-4 md:w-1/2'
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
            />

            <div className="bg-white rounded-2xl max-w-4xl w-[96%] p-2 md:p-6 mx-5 shadow-lg mt-2 md:mt-7">
                <header className="text-center">
                    <motion.h1 className="text-black text-3xl md:text-5xl font-bold drop-shadow-lg mt-2 mb-2"
                        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
                    >
                        Impulsando la Odontología del Futuro
                    </motion.h1>
                    <motion.p className="text-1xl text-[#ffc400] mb-3 font-bold"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
                    >
                        Capacitación, tecnología y estrategia para transformar tu práctica dental.
                    </motion.p>
                </header>

                <motion.div className="text-center flex justify-center items-center w-full mb-5 bg-black"
                    initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 1 }}
                >
                    <div className="relative w-full max-w-4xl aspect-video mt-5">
                        <iframe
                            src="https://player.vimeo.com/video/1051695808?h=4211e0dbc5"
                            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </motion.div>

                <motion.div
                    onClick={scrollValueStack}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 15px rgba(255, 185, 33, 0.9)"
                    }}
                    className="flex justify-center items-center text-white bg-[#ffb921] text-base md:text-2xl font-bold p-3 rounded-lg shadow-lg mx-auto w-full max-w-xl mb-3 cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    🚀 Oferta exclusiva por tiempo limitado 🚀
                </motion.div>


                <div className="flex justify-center w-full">
                    <motion.div
                        className="inline-flex justify-center items-center text-white bg-[#ffb921] text-3xl md:text-4xl font-bold p-2 rounded-lg shadow-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 1 }}
                    >
                        {minutes}:{seconds}
                    </motion.div>
                </div>

                {timeLeft < 60000 && (
                    <motion.p
                        className="text-red-600 font-bold mt-2 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        ⏳ ¡Última hora para acceder a tu prueba gratuita!
                    </motion.p>
                )}

                {/* Sección de Beneficios */}
                <motion.div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
                >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-[#ffc400] border-b-4 border-[#ffc400] mx-auto">
                        Aprende, crece y destaca en la odontología
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {benefits.map((benefit, index) => {
                            const ref = useRef(null);
                            const isInView = useInView(ref, { amount: 0.5 });
                            return (
                                <motion.div
                                    ref={ref}
                                    key={index}
                                    className="flex flex-row items-center gap-x-6 p-4 border-yellow-500/50 rounded-lg bg-[#fff8e1] shadow-md h-32"
                                    animate={{ scale: isInView ? 1.05 : 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <img src={benefit.img} alt={benefit.text} className="w-24 h-24 object-cover flex-shrink-0 rounded-lg" />
                                    <span className="text-base md:text-lg">{benefit.text}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Sección Testimonios */}
                <motion.div className="bg-white rounded-lg shadow-lg p-6 mt-10"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h3 className="text-center text-2xl md:text-4xl font-bold text-[#ffc400] mb-6">Lo que dicen nuestros colegas</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="bg-[#fff8e1] p-4 rounded-lg shadow-md">
                                <img src={`/testimonio${i}.jpg`} alt="Testimonio" className="w-20 h-20 rounded-full object-cover mb-2" />
                                <p className="text-sm italic mb-2">"Transformó completamente mi consulta. Ahora tengo más pacientes y menos estrés."</p>
                                <p className="font-semibold">Dr. Nombre Apellido</p>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Sección ¿Esto es para vos? */}
                <motion.section className="bg-[#000000] text-white rounded-lg p-6 mt-10 shadow-md"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-2xl md:text-4xl font-bold text-center text-[#ffc400] mb-4">¿Esto es para vos?</h2>
                    <p className="text-lg md:text-xl text-center">
                        ✔️ Si sos odontólogo y querés destacar frente a tu competencia...
                        <br />
                        ✔️ Si querés aprender a comunicar con impacto y atraer pacientes ideales...
                        <br />
                        ✔️ Si te cansaste de no saber cómo escalar tu clínica...
                    </p>
                </motion.section>
                {/* Value stack */}
                <motion.div
                    ref={recibirRef}
                    className="bg-white border-4 border-dashed border-[#ffc400] rounded-xl p-6 mt-10 shadow-xl text-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
                        Esto Es Todo Lo Que Vas A Recibir, Más Los <span className="text-green-600">BONOS GRATIS</span>
                    </h2>

                    <ul className="text-left text-lg md:text-xl font-medium mb-6 max-w-3xl mx-auto">
                        <li className="mb-2">📘 Acceso completo al Workshop de Marketing Dental... <span className="text-red-600 font-bold">$497 USD</span></li>
                        <li className="mb-2">🛠️ Derechos de uso para aplicar los sistemas en tu clínica... <span className="text-red-600 font-bold">$497 USD</span></li>
                        <li className="mb-2">🎯 <strong>Bono #1:</strong> Plantillas listas para publicar en redes... <span className="text-red-600 font-bold">$297 USD</span></li>
                        <li className="mb-2">📧 <strong>Bono #2:</strong> Secuencia de emails automatizados... <span className="text-red-600 font-bold">$197 USD</span></li>
                        <li className="mb-2">👨‍👩‍👧 <strong>Bono #3:</strong> Acceso a grupo privado de odontólogos... <span className="text-red-600 font-bold">$297 USD</span></li>
                        <li className="mb-2">📞 <strong>Bono #4:</strong> Llamada estratégica personalizada... <span className="text-red-600 font-bold">$359 USD</span></li>
                    </ul>

                    <p className="text-2xl font-bold text-red-600 line-through mb-2">$2,144 En Valor Total</p>
                    <p className="text-3xl font-bold text-green-600 mb-4">Pero Hoy Lo Obtienes Todo Por Sólo $497 USD</p>
                    <p className="text-base italic text-gray-600">Opción de prueba gratuita disponible por tiempo limitado ⏳</p>
                    <motion.button
                        onClick={() => window.open("https://wa.me/+5493512153675?text=¡Hola!%20Quiero%20mi%20prueba%20gratuita%20de%207%20días.", "_blank")}
                        className="bg-[#ffb921] text-white text-xl md:text-2xl font-semibold py-4 px-10 rounded-lg w-full max-w-2xl mx-auto mt-6 transition-transform hover:scale-105 shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        animate={{
                            scale: [1, 1.05, 1],
                            boxShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 10px rgba(255,185,33,0.8)", "0px 0px 0px rgba(0,0,0,0)"]
                        }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        ¡Prueba Gratuita!
                    </motion.button>
                </motion.div>
            </div>
        </div>
    );
}
