import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from "framer-motion";

export default function WorkshopLanding() {
    const [timeLeft, setTimeLeft] = useState(0);
    const [showExtraContent, setShowExtraContent] = useState(false);

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

                <motion.div className="flex justify-center items-center text-white bg-[#ffb921] text-base md:text-2xl font-bold p-3 rounded-lg shadow-lg mx-auto w-full max-w-xl mb-3"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
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

                {/* Sección de Beneficios con imágenes */}
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
                                    <img
                                        src={benefit.img}
                                        alt={benefit.text}
                                        className="w-24 h-24 object-cover flex-shrink-0 rounded-lg"
                                    />
                                    <span className="text-base md:text-lg">{benefit.text}</span>
                                </motion.div>
                            );
                        })}
                    </div>


                </motion.div>

                <motion.button
                    onClick={() => window.open("https://wa.me/+5493512153675?text=¡Hola!%20Quiero%20mi%20prueba%20gratuita%20de%207%20días.", "_blank")}
                    className="bg-[#ffb921] text-white text-xl md:text-2xl font-semibold py-4 px-10 rounded-lg w-full max-w-2xl mx-auto mt-3 mb-8 transition-transform hover:scale-105 shadow-lg"
                    whileHover={{ scale: 1.1 }}
                >
                    ¡Sí! Quiero mi prueba gratuita de 7 días
                </motion.button>
            </div>
        </div>
    );
}
