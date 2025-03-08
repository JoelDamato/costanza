import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";

export default function WorkshopLanding() {
    const [timeLeft, setTimeLeft] = useState(3600000); // 1 hora en milisegundos
    const [showExtraContent, setShowExtraContent] = useState(false);
    const videoRef = useRef(null);

    const benefits = [
        { text: "Acceso a cursos exclusivos de marketing y gestión para odontólogos.", icon: "📖" },
        { text: "Técnicas avanzadas de fotografía dental para potenciar tu imagen profesional.", icon: "📷" },
        { text: "Sesiones personalizadas de coaching para el crecimiento de tu clínica.", icon: "🎯" },
        { text: "Networking con profesionales de la odontología a nivel internacional.", icon: "🌍" },
        { text: "Recursos y herramientas digitales para optimizar la gestión de pacientes.", icon: "🛠️" },
        { text: "Casos de estudio y mentorías en implantología y estética dental.", icon: "🦷" },
        { text: "Acceso exclusivo a eventos, webinars y conferencias del sector.", icon: "🎤" }
    ];

    useEffect(() => {
        const handleMessage = (event) => {
            const { data } = event;
            if (data.message === "panda_timeupdate" && data.currentTime >= 1) {
                setShowExtraContent(true);
            }
        };
        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, []);

    useEffect(() => {
        const link = document.createElement("link");
        link.href = "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap";
        link.rel = "stylesheet";
        document.head.appendChild(link);
        return () => document.head.removeChild(link);
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(prevTime => (prevTime <= 0 ? 3600000 : prevTime - 1000));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formatTime = (time) => {
        const hours = String(Math.floor(time / 3600000)).padStart(2, '0');
        const minutes = String(Math.floor((time % 3600000) / 60000)).padStart(2, '0');
        const seconds = String(Math.floor((time % 60000) / 1000)).padStart(2, '0');
        return { hours, minutes, seconds };
    };

    const { hours, minutes, seconds } = formatTime(timeLeft);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-black via-[#ffc400] to-black font-sans">
            <img src="/LOGO1.png" alt="Logo" className='w-full mt-4 mb-4 md:w-1/2' />
            <div className="bg-white rounded-2xl max-w-4xl w-[96%] p-2 md:p-6 mx-5 shadow-lg mt-2 md:mt-7">
                <header className="text-center">
                    <h1 className="text-black text-3xl md:text-5xl font-bold drop-shadow-lg mt-2 mb-2">
                        Impulsando la Odontología del Futuro
                    </h1>
                    <p className="text-1xl text-[#ffc400] mb-3 font-bold">
                        Capacitación, tecnología y estrategia para transformar tu práctica dental.
                    </p>
                </header>
                <div className="text-center flex justify-center items-center w-full mb-5 bg-black">
                    <div className="relative w-full max-w-4xl aspect-video mt-5">
                        <iframe
                            src="https://player.vimeo.com/video/1051695808?h=4211e0dbc5"
                            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
                <section className="w-full max-w-4xl px-4 mt-2 bg-white">
                    <h2 className="mt-10 text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-[#ffb921] border-b-4 border-[#ffb921] mx-auto">
                        ¿Eres un odontólogo con visión de crecimiento? Entonces...
                    </h2>
                    <ul className="p-6 rounded-lg shadow-2xl max-w-4xl mx-auto mb-5 text-black text-xl md:text-2xl space-y-4">
                        {["Quieres potenciar tu clínica dental con estrategias de marketing efectivas.",
                            "Buscas mejorar la gestión de tu tiempo y optimizar la atención a pacientes.",
                            "Deseas aumentar tu presencia en redes sociales con fotografía profesional.",
                            "Necesitas orientación para hacer crecer tu consultorio y fidelizar clientes.",
                            "Quieres aprender de expertos en implantología y estética dental.",
                            "Te interesa acceder a una comunidad de odontólogos con visión de crecimiento."].map((item, index) => (
                                <li key={index} className="flex items-start gap-4">
                                    ⭐ <span className="leading-relaxed">{item}</span>
                                </li>
                            ))}
                    </ul>
                </section>
                <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-[#ffc400] border-b-4 border-[#ffc400] mx-auto">
                        Aprende, crece y destaca en la odontología con estos beneficios
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {benefits.map((benefit, index) => (
                            <motion.li key={index} className="flex items-center gap-3 p-3 border-y-2 border-yellow-500/50 rounded-lg h-36" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }}>
                                {benefit.icon} <span>{benefit.text}</span>
                            </motion.li>
                        ))}
                    </div>
                </div>
                <button
                    onClick={() => window.open("https://wa.me/+5493512153675?text=¡Hola!%20Quiero%20mi%20prueba%20gratuita%20de%207%20días.", "_blank")}
                    className="bg-gradient-to-r from-black via-[#ffc400] to-black text-white text-xl md:text-2xl font-semibold py-4 px-10 rounded-lg w-full max-w-2xl mx-auto mt-3 mb-8 transition-transform hover:scale-105 shadow-lg"
                >
                    ¡Sí! Quiero mi prueba gratuita de 7 días
                </button>
            </div>
        </div>
    );
}