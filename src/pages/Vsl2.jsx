// Aquí empieza el código actualizado — podés copiar y pegar directamente en tu archivo

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from "framer-motion";

export default function WorkshopLanding() {
    const [timeLeft, setTimeLeft] = useState(0);

    const benefits = [
        { text: "🧠 Mentalidad profesional real: Salí del piloto automático y empezá a pensar como alguien que lidera su consultorio, no que lo sobrevive.", img: "/DARIO CONSTANZA BOOK.png" },
        { text: "🔍 Atractivo sin hacer marketing: Olvidate de 'venderte'. Vas a aprender a generar confianza desde cómo te comunicás y mostrás.", img: "/NOTEBOOK DARIO 2.png" },
        { text: "📸 Imagen que respalda tu autoridad: Aunque nunca hayas sacado una buena foto, vas a mostrar tu trabajo con claridad y calidad.", img: "/BUSINESS CARDS DARIO.png" },
        { text: "📋 Gestión que no te consume: Sistemas simples para organizar turnos, tiempos, pacientes y decisiones sin quemarte.", img: "/comunidad dario.png" },
        { text: "💰 Finanzas para ODONTÓLOGOS: Aprendé a cobrar lo que vale tu trabajo, tomar buenas decisiones y no vivir de mes a mes.", img: "/comunidad dario2.png" }
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
            const offsetPosition = topOffset - 30;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-black via-[#ffc400] to-black font-sans">
            <motion.img src="/LOGO1.png" alt="Logo" className='w-[250px] mt-4 md:w-1/2'
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
            />

            <div className="bg-white rounded-2xl max-w-4xl w-[96%] p-2 md:p-6 mx-5 shadow-lg mt-2 md:mt-7">
                {/* Header */}
                <header className="text-center">
                    <motion.h1 className="text-black text-3xl md:text-5xl font-bold drop-shadow-lg mt-2 mb-4"
                        initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}
                    >
                        ✋ No necesitás otra formación
                    </motion.h1>
                    <motion.p className="text-lg md:text-xl text-gray-800"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}
                    >
                        Necesitás dejar de sentir que <strong>la odontología te consume</strong> en vez de impulsarte.
                        <br /><br />
                        Cuando arrancaste esta carrera, lo hiciste con una imagen en mente:
                        <br /><br />
                        👨‍⚕️ Pacientes que confían en vos<br />
                        💰 Un ingreso justo por tu trabajo<br />
                        ⏰ Tiempo para vos y tu vida<br /><br />
                        Pero en algún momento, eso se desvió.
                        <br /><br />
                        Hoy te encontrás <strong>trabajando mil horas</strong>, cobrando menos de lo que merecés…
                        <br />
                        O incluso peor: <strong>sin saber por dónde empezar.</strong>
                        <br /><br />
                        Y te cuento algo: <strong>no es tu culpa.</strong><br />
                        Nadie nos enseñó a vivir de esta profesión sin sentirnos esclavos de la camilla.
                    </motion.p>
                </header>

                {/* Video */}
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

                {/* CTA */}
                <motion.div
                    onClick={scrollValueStack}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255, 185, 33, 0.9)" }}
                    className="flex justify-center items-center text-white bg-[#ffb921] text-base md:text-2xl font-bold p-3 rounded-lg shadow-lg mx-auto w-full max-w-xl mb-3 cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                >
                    🚀 Empezá tu transformación ahora 🚀
                </motion.div>

                {/* Timer */}
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
                        ⏳ ¡Últimos minutos para acceder a tu oportunidad!
                    </motion.p>
                )}

                {/* Beneficios */}
                <motion.div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
                >
                    <h2 className="text-3xl font-bold text-center mb-8 text-[#ffc400] border-b-4 border-[#ffc400]">
                        Esto no es una formación más
                    </h2>
                    <p className="mb-6 text-lg text-gray-800">
                        Es el sistema que a mí y a más de 85 colegas nos devolvió el control.
                        <br />
                        ✔️ Para dejar de competir en precios<br />
                        ✔️ Para atraer pacientes que valoren tu laburo<br />
                        ✔️ Para tener claridad, dirección y libertad real
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {benefits.map((benefit, index) => {
                            const ref = useRef(null);
                            const isInView = useInView(ref, { amount: 0.5 });
                            return (
                                <motion.div
                                    ref={ref}
                                    key={index}
                                    className="flex flex-row items-start gap-x-6 p-4 border-yellow-500/50 rounded-lg bg-[#fff8e1] shadow-md"
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

                {/* Value Stack */}
                <motion.div
                    ref={recibirRef}
                    className="bg-white border-4 border-dashed border-[#ffc400] rounded-xl p-6 mt-10 shadow-xl text-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-3">
                        📦 ¿Qué vas a llevarte con <span className="text-green-600">FOCUS DENTAL</span>?
                    </h2>
                    <p className="italic mb-6 text-gray-600">Sin tecnicismos. Sin humo. Sin complicarte.</p>

                    <ul className="text-left text-lg md:text-xl font-medium mb-6 max-w-3xl mx-auto space-y-2">
                        <li>✅ Pack de imágenes listas para usar – <span className="text-red-600 font-bold">$97 USD</span></li>
                        <li>✅ Mensajes de seguimiento para pacientes – <span className="text-red-600 font-bold">$197 USD</span></li>
                        <li>✅ Comunidad privada con colegas – <span className="text-red-600 font-bold">$297 USD</span></li>
                        <li>✅ Recursos prácticos para tu gestión – <span className="text-red-600 font-bold">$297 USD</span></li>
                        <li>✅ Herramientas digitales recomendadas – <span className="text-red-600 font-bold">$147 USD</span></li>
                        <li>✅ Descuentos en insumos y software – <span className="text-red-600 font-bold">+$250 USD</span></li>
                    </ul>

                    <p className="text-2xl font-bold text-red-600 line-through mb-2">Valor total: +$1.900 USD</p>
                    <p className="text-3xl font-bold text-green-600 mb-4">Hoy accedés por solo $197 USD</p>

                    <motion.button
                        onClick={() => window.open("https://wa.me/+5493512153675?text=¡Hola!%20Quiero%20acceder%20a%20Focus%20Dental%20ahora", "_blank")}
                        className="bg-[#ffb921] text-white text-xl md:text-2xl font-semibold py-4 px-10 rounded-lg w-full max-w-2xl mx-auto mt-6 transition-transform hover:scale-105 shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        animate={{
                            scale: [1, 1.05, 1],
                            boxShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 10px rgba(255,185,33,0.8)", "0px 0px 0px rgba(0,0,0,0)"]
                        }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        ¡Accedé ahora!
                    </motion.button>
                </motion.div>

                {/* Cierre inspirador */}
                <motion.div className="bg-white rounded-lg shadow-lg p-5 mt-5 text-center text-lg text-gray-800"
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }}
                >
                    <p className="italic mb-4">
                        No es para cualquiera. Es para el que está listo para dejar de improvisar y empezar a construir algo real.
                        <br /><br />
                        Y sí: <strong>la odontología que soñaste todavía existe.</strong>
                        <br /><br />
                        Solo tenés que dejar de perseguir pacientes… y empezar a diseñar tu carrera con intención.
                    </p>
                    <p className="text-red-600 font-bold mb-2">⚠️ Cupos limitados. Cuando cierre, es porque voy a enfocarme 100% en los que entraron.</p>
                    <p className="font-bold text-xl">🎯 Si sabés que este es tu momento, hacé clic abajo y empezá hoy.</p>
                </motion.div>
            </div>
        </div>
    );
}
