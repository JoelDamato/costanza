import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";

export default function WorkshopLanding() {
    const [timeLeft, setTimeLeft] = useState(3600000);
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
            img: "/DARIO CONSTANZA BOOK.png",
            text: "🧠 Dominá el juego desde adentro: Transformá tu mentalidad para dejar de pensar como técnico y empezar a crecer como profesional libre y rentable."
        },
        {
            img: "/NOTEBOOK DARIO 2.png",
            text: "🚀 Pacientes que te buscan, no que te comparan: Aprendé a posicionarte como referente en tu zona sin sentir que estás vendiendo todo el tiempo."
        },
        {
            img: "/BUSINESS CARDS DARIO.png",
            text: "📸 Imagen que vende por vos: Mostrá tu trabajo como un profesional premium, aunque no sepas nada de fotografía o edición."
        },
        {
            img: "/comunidad dario.png",
            text: "💼 Gestión que no te roba tiempo: Organizá tu consultorio como un negocio, con herramientas simples que te devuelven horas de vida."
        },
        {
            img: "/comunidad dario2.png",
            text: "📊 Finanzas que te permiten vivir de esto: Aprendé a cobrar bien, manejar tu dinero y dejar de tener un buen mes y uno flojo."
        }
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
            <img src="/LOGO1.png" alt="Logo" className="w-[250px] mt-4 md:w-1/2" />

            <div className="bg-white rounded-2xl max-w-4xl w-[96%] p-2 md:p-6 mx-5 shadow-lg mt-2 md:mt-7">
                {/* HEADER */}
                <header className="text-center">
                    <h1 className="text-black text-3xl md:text-5xl font-bold drop-shadow-lg mt-2 mb-2">
                        Esto es de odontólogos, para odontólogos
                    </h1>
                    <p className="text-lg md:text-xl text-gray-800 mb-3">
                        Cuando empezaste esta carrera, te imaginabas ayudando a la gente, viviendo bien de tu trabajo y teniendo una vida estable.
                        <br /><br />
                        Pero algo se desvió. Ahora sentís que trabajás el doble, ganás menos de lo que merecés y que estás siempre apagando incendios.
                        <br /><br />
                        Esa sensación de estancamiento no es normal.
                        Este programa está pensado para que tomes el control total de tu carrera, recuperes tiempo, mejores tus ingresos y vuelvas a sentirte orgulloso de lo que construís cada día.
                        <br /><br />
                        Porque sí: esa versión de tu profesión que alguna vez soñaste, existe. Solo tenés que dejar de postergarla.
                    </p>
                </header>

                {/* VIDEO */}
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

                {/* CTA Scroll to Value Stack */}
                <motion.div
                    onClick={scrollToValueStack}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 0 15px rgba(255, 185, 33, 0.9)"
                    }}
                    className="flex justify-center items-center text-white bg-[#ffb921] text-base md:text-2xl font-bold p-3 rounded-lg shadow-lg mx-auto w-full max-w-xl mb-3 cursor-pointer"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                >
                    🚀 Transformá tu consultorio hoy 🚀
                </motion.div>

                {/* BENEFICIOS */}
                <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-[#ffc400] border-b-4 border-[#ffc400] mx-auto">
                        Los 5 pilares para una práctica rentable y sin estrés
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {benefits.map((benefit, index) => (
                            <motion.div
                                key={index}
                                className="flex items-start gap-4 p-4 border-yellow-500/50 rounded-lg bg-[#fff8e1] shadow-md"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                            >
                                <img
                                    src={benefit.img}
                                    alt={benefit.text}
                                    className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg flex-shrink-0 mt-1"
                                />
                                <span className="text-sm md:text-base text-gray-800 leading-snug">
                                    {benefit.text}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* VALUE STACK */}
                <motion.div
                    ref={valueStackRef}
                    className="bg-white border-4 border-dashed border-[#ffc400] rounded-xl p-5 mt-5 shadow-xl text-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h2 className="text-3xl md:text-4xl font-bold text-black mb-6">
                        Esto es TODO lo que vas a recibir con <span className="text-green-600">FOCUS DENTAL</span>
                    </h2>

                    <ul className="text-left text-lg md:text-xl font-medium mb-6 max-w-3xl mx-auto space-y-2">
                        <li>🎓 Acceso completo al Programa Focus Dental – <span className="text-red-600 font-bold">$997 USD</span></li>
                        <li>🖼️ Bono #1: Pack de imágenes listas para tu consultorio – <span className="text-red-600 font-bold">$97 USD</span></li>
                        <li>📲 Bono #2: Mensajes que hacen volver a tus pacientes – <span className="text-red-600 font-bold">$197 USD</span></li>
                        <li>👥 Bono #3: Comunidad privada de odontólogos – <span className="text-red-600 font-bold">$297 USD</span></li>
                        <li>📂 Bono #4: Recursos descargables de gestión – <span className="text-red-600 font-bold">$297 USD</span></li>
                        <li>🛠️ Bono #5: Herramientas digitales que te ahorran tiempo – <span className="text-red-600 font-bold">$147 USD</span></li>
                        <li>🧾 Bono #6: Descuentos exclusivos en insumos y equipamiento – <span className="text-red-600 font-bold">$250+ USD</span></li>
                    </ul>

                    <p className="text-2xl font-bold text-red-600 line-through mb-2">$1,985 USD</p>
                    <p className="text-3xl font-bold text-green-600 mb-4">Hoy solo por $197 USD</p>
                    <p className="text-base italic text-gray-600">✅ Sin adivinar. Sin fórmulas vacías. Sin ser influencer.</p>

                    <motion.button
                        onClick={() => window.open("https://wa.me/+5493512153675?text=¡Hola!%20Quiero%20acceder%20al%20Programa%20Focus%20Dental", "_blank")}
                        className="bg-[#ffb921] text-white text-xl md:text-2xl font-semibold py-4 px-10 rounded-lg w-full max-w-2xl mx-auto mt-6 transition-transform hover:scale-105 shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        animate={{
                            scale: [1, 1.05, 1],
                            boxShadow: ["0px 0px 0px rgba(0,0,0,0)", "0px 0px 10px rgba(255,185,33,0.8)", "0px 0px 0px rgba(0,0,0,0)"]
                        }}
                        transition={{ repeat: Infinity, duration: 2 }}
                    >
                        ¡Quiero acceder ahora!
                    </motion.button>
                </motion.div>

                {/* CIERRE INSPIRADOR */}
                <div className="bg-white mt-5 p-5 rounded-xl shadow-md text-lg text-gray-800">
                    <blockquote className="italic border-l-4 border-[#ffc400] pl-4">
                        Sé lo que estás pensando. ¿Y si esto no es para mí? ¿Y si no me sale?
                        <br /><br />
                        Yo también estuve ahí. Dudando. Probando cosas sueltas.
                        Hasta que entendí que no necesitaba saberlo todo. Solo necesitaba el sistema correcto.
                        <br /><br />
                        Y eso es lo que estás a punto de recibir.
                        <br /><br />
                        <strong>Una hoja de ruta. Un GPS para dejar de improvisar.</strong>
                        <br /><br />
                        Hoy tenés la posibilidad de acceder con una inversión mínima… pero el acceso no va a estar siempre abierto.
                        <br /><br />
                        Cuando cierro inscripciones, cierro de verdad.
                        <br /><br />
                        Porque <strong>prefiero acompañar a pocos odontólogos comprometidos, que vender a muchos sin resultados.</strong>
                    </blockquote>
                    <p className="mt-6 text-center font-bold text-xl">🎯 Si sentís que es el momento, no lo pienses más.</p>
                </div>
            </div>
        </div>
    );
}
