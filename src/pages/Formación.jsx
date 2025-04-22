import React, { useState, useEffect, useRef } from 'react';
import { motion } from "framer-motion";

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
            img: "https://i.ibb.co/rGg9t0ht/agenda.png",
            text: "<strong>🧠 Dominá el juego desde adentro</strong>: Transformá tu mentalidad para dejar de pensar como técnico y empezar a crecer como profesional libre y rentable."
        },
        {
            img: "https://i.ibb.co/27dThx0K/mapssinfondo.png",
            text: "<strong>🚀 Pacientes que te buscan</strong>, no que te comparan: Aprendé a posicionarte como referente en tu zona sin sentir que estás vendiendo todo el tiempo."
        },
        {
            img: "https://i.ibb.co/vxr1jMZ1/Chat-GPT-Image-22-abr-2025-17-38-58.png",
            text: "<strong>📸 Imagen que vende por vos</strong>: Mostrá tu trabajo como un profesional premium, aunque no sepas nada de fotografía o edición."
        },
        {
            img: "https://i.ibb.co/1tPV773h/fondotranspc.png",
            text: "<strong>💼 Gestión que no te roba tiempo</strong>: Organizá tu consultorio como un negocio, con herramientas simples que te devuelven horas de vida."
        },
        {
            img: "https://i.ibb.co/wFtZBHBw/finanzas.png",
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
        const deadline = new Date("2025-05-17T00:00:00").getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = deadline - now;
            setTimeLeft(distance > 0 ? distance : 0);
        }, 1000);
        return () => clearInterval(interval);
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

                    {/* VIDEO */}
                    <div className="text-center flex justify-center items-center w-full mb-5 bg-black">
                        <div className="relative w-full max-w-4xl aspect-video mt-5">
                            <iframe
                                src="https://player.vimeo.com/video/1051695808?h=4211e0dbc5"
                                className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                                frameBorder="0"
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>

                    {/* CTA al minuto 0 */}
                    {showExtraContent && (
                        <>
                            <div className="bg-white border-2 border-[#FFCC00] text-black font-semibold text-base md:text-lg py-3 px-5 rounded-md text-center mb-2 shadow-sm">
                                <p className="mb-2">
                                    Precio lanzamiento disponible hasta el <span className="font-bold">17 de mayo</span>
                                </p>
                                <div className="bg-black text-[#FFCC00] text-xl font-bold py-2 px-4 rounded-md inline-block ">
                                    ⏳ {days} días, {hours}:{minutes}:{seconds} ⏳
                                </div>
                            </div>
                            <motion.div
                                onClick={scrollToValueStack}
                                whileHover={{ scale: 1.05 }}
                                className="flex justify-center items-center text-black bg-[#FFCC00] text-base md:text-2xl font-bold p-3 rounded-lg shadow-lg mx-auto w-full max-w-xl mb-3 cursor-pointer"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 1 }}
                            >
                                🚀 Accede a mi formación 🚀
                            </motion.div>
                        </>
                    )}

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
                        Los 5 pilares para una práctica rentable y sin estrés
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
                        <li>🎓 Acceso completo al Programa Focus Dental – <span className="text-black font-bold">$997 USD</span></li>
                        <li>🖼️ Bono #1: Pack de imágenes listas para tu consultorio – <span className="text-black font-bold">$97 USD</span></li>
                        <li>📲 Bono #2: Mensajes que hacen volver a tus pacientes – <span className="text-black font-bold">$197 USD</span></li>
                        <li>👥 Bono #3: Comunidad privada de odontólogos – <span className="text-black font-bold">$297 USD</span></li>
                        <li>📂 Bono #4: Recursos descargables de gestión – <span className="text-black font-bold">$297 USD</span></li>
                        <li>🛠️ Bono #5: Herramientas digitales que te ahorran tiempo – <span className="text-black font-bold">$147 USD</span></li>
                        <li>🧾 Bono #6: Descuentos exclusivos en insumos y equipamiento – <span className="text-black font-bold">$250+ USD</span></li>
                    </ul>

                    <div className="flex flex-col items-center mb-2">
                        <p className="text-xl font-bold text-red-600 line-through mb-1">$1,985 USD</p>
                        <div className="bg-green-100 border border-green-600 text-green-800 text-3xl font-extrabold py-2 px-6 rounded-xl shadow-md tracking-wide">
                            $197 USD
                        </div>
                    </div>


                    <div className="bg-white border-2 border-[#FFCC00] text-black font-semibold text-base md:text-lg py-3 px-5 rounded-md text-center shadow-sm">
                        <p className="mb-2">
                            Precio lanzamiento disponible hasta el <span className="font-bold">17 de mayo</span>
                        </p>
                        <div className="bg-black text-[#FFCC00] text-xl font-bold py-2 px-2 rounded-md inline-block ">
                            ⏳ {days} días, {hours}:{minutes}:{seconds} ⏳
                        </div>
                    </div>

                    <motion.button
                        onClick={() => window.open("https://wa.me/+5493512153675?text=¡Hola!%20Quiero%20acceder%20al%20Programa%20Focus%20Dental", "_blank")}
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
                        className="mt-6 text-center font-bold text-xl text-[#FFCC00] bg-black/80 rounded-lg px-4 py-3 shadow-lg backdrop-blur-sm inline-block mx-auto w-fit"
                        style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.6)' }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        🎯 Si sentís que llegó tu momento, no sigas postergándolo.
                    </motion.p>

                    <motion.button
                        onClick={() => window.open("https://wa.me/+5493512153675?text=¡Hola!%20Quiero%20más%20info%20sobre%20Focus%20Dental", "_blank")}
                        className="bg-[#FFCC00] text-black text-lg font-bold py-3 px-6 rounded-lg shadow-md mt-5 mx-auto block"
                        whileHover={{ scale: 1.05 }}
                    >
                        QUIERO MÁS INFO
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
