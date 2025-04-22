import React, { useState, useEffect, useRef } from 'react';

export default function WorkshopLanding() {

  
  const [timeLeft, setTimeLeft] = useState(3600000); // 1 hora en milisegundos
  const [showExtraContent, setShowExtraContent] = useState(false);
  const videoRef = useRef(null)

  useEffect(() => {
    // Escuchar mensajes del iframe
    const handleMessage = (event) => {
      const { data } = event;

      // Verificar si el mensaje es del evento panda_timeupdate
      if (data.message === "panda_timeupdate") {
        // console.log(`Tiempo actual del video: ${data.currentTime}s`);

        // Mostrar contenido adicional si el tiempo alcanza 180 segundos
        if (data.currentTime >= 180) {
          setShowExtraContent(true);
        }
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 0) {
          return 3600000; // Reinicia el cronómetro a 1 hora
        }
        return prevTime - 1000;
      });
    }, 1000);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

  const formatTime = (time) => {
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: seconds.toString().padStart(2, '0'),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
<div
  className="min-h-screen flex flex-col items-center"
  style={{
    background: "linear-gradient(to right, black, #013557 50%, black 100%)",
    fontFamily: "Lato, sans-serif",
  }}
>

      {/* Header */}<img src="https://gopitchering.com/wp-content/uploads/2024/07/704851e0a88209f5f3717dd586768749_1200_80.webp" className="my-5" alt="" />
      <h2 className="text-lg md:text-2xl text-white text-center font-medium">
          Conoce el NUEVO Trabajo que va a revolucionar el Mercado Digital en 2025…
          </h2>
      <div className="bg-white rounded-2xl max-w-4xl w-[96%] p-2 md:p-6 md:w-full mx-5 shadow-lg mt-7">
        <header className="text-center">
         

          <h1 className="text-2xl md:text-3xl md:text-5xl font-bold leading-tight mb-2">
          Conviértete en Pitcher Partner y ayuda a creadores a lanzar cursos online exitosos.
          </h1>

          <p className="text-xl text-gray-700 mb-3">
          <span className="text-[#f9bc66] font-bold">
            y llevarte GRANDES comisiones en dólares en menos de {" "}
              <span className="italic">7 días</span>...
            </span>
          </p>
        </header>

        <div className="text-center flex justify-center items-center w-full mb-5 overflow-hidden bg-black">
  <iframe
    ref={videoRef}
    src="https://player-vz-7cd4a4ef-9e2.tv.pandavideo.com/embed/?v=a77aa388-c94a-4f56-aad1-c3c67de4a6a1"
    style={{
      border: "none",
      width: "100%",
      height: "100%",
    }}
    allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture"
    className="aspect-video max-w-full"
  />
</div>


        {/* New Product Section */}
        {showExtraContent == false? 
        <button
        onClick={() => window.open("https://pay.hotmart.com/O94296249S?checkoutMode=10&bid=1725551295569", "_blank")}
  className="bg-gradient-to-r from-black via-[#013557] to-black text-white text-xl md:text-2xl font-medium py-4 px-8 rounded-lg w-full max-w-2xl mx-auto block mb-16 transition-all duration-300 hover:translate-x-1 hover:translate-x-[-5px]"
  style={{
    backgroundSize: "200%",
    backgroundPosition: "center",
  }}
>
Quiero Acceder a Go Pitchering
</button> : ""}

{showExtraContent && (
      <div>
        <section className="w-full max-w-4xl  px-4 mt-2 bg-white">
          <h1  className="bg-gradient-to-r from-black via-[#013557] to-black text-white font-bold text-center text-3xl md:text-2xl font-medium py-4 px-8 rounded-lg w-full max-w-2xl mx-auto block mb-16 transition-all duration-300 hover:translate-x-1 hover:translate-x-[-5px]"
>
          Aprende a ser un PITCHER PARTNER
          </h1>

          <div className="relative mb-12 w-full">
            <img
              src="https://gopitchering.com/wp-content/uploads/2024/08/thgrtdfx.png"
              alt="VSL Method Products"
              className="w-full h-auto"
            />
          </div>




          


          {/* Perfect For You Section */}
          <div >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-[#f9bc66] overflow-hidden border-b-4 border-[#f9bc66] whitespace-nowrap animate-typing max-w-full mx-auto">
  Este Curso es perfecto para ti si...
</h2>



<div className="p-6 rounded-lg shadow-2xl max-w-4xl mx-auto mb-5 text-black">
  <ul className="space-y-4 text-1xl md:text-2xl">
    <li className="flex items-start gap-4">
      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#f9bc66] flex-shrink-0" viewBox="0 0 24 24">
        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
      <span className="leading-relaxed">Si quieres empezar a hacer +1000 dólares a partir de los próximos 30 días.</span>
    </li>
    <li className="flex items-start gap-4">
      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#f9bc66] flex-shrink-0" viewBox="0 0 24 24">
        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
      <span className="leading-relaxed">Si estás cansado de la gente negativa que te tira para atrás y no te permite avanzar.</span>
    </li>
    <li className="flex items-start gap-4">
      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#f9bc66] flex-shrink-0" viewBox="0 0 24 24">
        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
      <span className="leading-relaxed">Si estás buscando aprender una habilidad digital rentable en 2024.</span>
    </li>
    <li className="flex items-start gap-4">
      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#f9bc66] flex-shrink-0" viewBox="0 0 24 24">
        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
      <span className="leading-relaxed">Si NO tienes miles de seguidores en redes sociales o NO te gusta mostrarte en cámara.</span>
    </li>
    <li className="flex items-start gap-4">
      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#f9bc66] flex-shrink-0" viewBox="0 0 24 24">
        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
      <span className="leading-relaxed">Si sos de mente positiva y buscas un cambio en tu vida.</span>
    </li>
    <li className="flex items-start gap-4">
      <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#f9bc66] flex-shrink-0" viewBox="0 0 24 24">
        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
      <span className="leading-relaxed">Si prefieres trabajar los fines de semana en lugar de salir a un boliche.</span>
    </li>
  </ul>
</div>




   <button
    onClick={() => window.open("https://pay.hotmart.com/O94296249S?checkoutMode=10&bid=1725551295569", "_blank")}
  className="bg-gradient-to-r from-black via-[#013557] to-black text-white text-xl md:text-2xl font-medium py-4 px-8 rounded-lg w-full max-w-2xl mx-auto block mb-16 transition-all duration-300 hover:translate-x-1 hover:translate-x-[-5px]"
  style={{
    backgroundSize: "200%",
    backgroundPosition: "center",
  }}
>
Quiero ser un Pitcher Partner
</button>

 
         
          </div>
        </section>
{/* Testimonials Section */}
<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 mt-18 text-[#f9bc66] overflow-hidden border-b-4 border-[#f9bc66] whitespace-nowrap animate-typing max-w-full ">
    Nuestros testimonios!
</h2>
    <img
    className="w-full mb-5"
    src="https://i.ibb.co/QQgGk3Y/Captura-de-pantalla-2025-01-20-19-06-28.png"
    alt="Imagen 2"
  />
    <img
    className="w-full mb-5"
    src="https://i.ibb.co/tPdyTZf/Captura-de-pantalla-2025-01-20-19-06-40.png"
    alt="Imagen 2"
  />
    <img
    className="w-full mb-5"
    src="https://i.ibb.co/42jHNqk/Captura-de-pantalla-2025-01-20-19-06-52.png"
    alt="Imagen 2"
  />
        <section>        
          {/* Product Details */}
          <div className="grid gap-8 mb-16">

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-[#f9bc66] overflow-hidden border-b-4 border-[#f9bc66] whitespace-nowrap animate-typing max-w-full mx-auto">
  Vas a adquirir todo esto...
</h2>
            <div className="flex gap-8 items-center">
              <img 
                src="https://gopitchering.com/wp-content/uploads/2024/08/Crea-el-Curso-Perfecto.png"
                alt="7 Minute Closing"
                className="w-32 sm:w-48 h-auto"
              />
              <div className="text-left">
                <h4 className="text-1xl md:text-2xl font-bold mb-2">CREA CURSOS RENTABLES SIN EXPERIENCIA – Valorada en $197 USD</h4>
                <p className="text-gray-600">
                No es necesario adivinar ni pensar qué curso necesita la audiencia de tu profesional. Con un estudio de mercado que te enseñaré a hacer, podrás descubrir todos los problemas y necesidades que tiene su audiencia y Crear El Curso Perfecto que resuelva exactamente sus problemas para vender cientos súper fácil y rápido. 
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-center">
              <img 
                src="https://gopitchering.com/wp-content/uploads/2024/08/Guia-de-Lanzamiento-Predecible-en-7-Dias.png"
                alt="One Page Formula"
                className="w-32 sm:w-48 h-auto"
              />
              <div className="text-left">
                <h4 className="text-1xl md:text-2xl font-bold mb-2">GUÍA DE LANZAMIENTO PREDECIBLE EN 7 DÍAS – Valorada en $970 USD</h4>
                <p className="text-gray-600">
                Aprende a crear lanzamientos predecibles en menos de 7 días con el método Go Pitchering. Podrás replicar el método hasta convertirte en un lanzador experto sin margen de error.
              
                </p>
              </div>
            </div>

            <div className="flex gap-8 items-center">
              <img 
                src="https://gopitchering.com/wp-content/uploads/2024/08/Prospecta-tu-Primer-Influencer-Asegurado.png"
                alt="One Page Formula"
                className="w-32 sm:w-48 h-auto"
              />
              <div className="text-left">
                <h4 className="text-1xl md:text-2xl font-bold mb-2">PROSPECTA TU PRIMER INFLUENCER ASEGURADO – VALOR INVALUABLE</h4>
                <p className="text-gray-600">
                ¿No conoces ni tienes algún amigo con al menos 20k en Instagram? Te enseñaré como encontrar influencers profesionales dispuesto a trabajar contigo aunque no tengas experiencia. El método elimina la incertidumbre de conseguir profesionales y te pone en el camino hacia el éxito enseñandote .
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-8 items-center">
              <img 
                src="https://gopitchering.com/wp-content/uploads/2024/08/regalo-point.png"
                alt="One Page Formula"
                className="w-32 sm:w-48 h-auto"
              />
              <div className="text-left">
                <h4 className="text-1xl md:text-2xl font-bold mb-2">CONTRATO ASEGURADOR DE LANZAMIENTO – Valorado en $1500 USD</h4>
                <p className="text-gray-600">
                ¿Y si te dijera que hay una forma de asegurar tu lanzamiento haciendo que tu profesional cumpla con TODO lo necesario para que tengan un lanzamiento 100% exitoso? Ahórrate dolores de cabeza y lanzamientos fallidos con este valioso recurso Legal.
                </p>
              </div>
            </div>
          
          {/* Pricing Summary */}
          <div className="mb-16">
          <div className="border-4 border-white p-6 rounded-xl shadow-xl shadow-[#00000099] shadow-2xl  transition-all duration-300 transform  mb-14 mt-5">
        <div className=" flex flex-col items-center justify-center text-center">
        <h1 className="animate-pulse bg-gradient-to-b from-black/20 via-[#013557] to-black/2 rounded-2xl text-4xl font-bold text-white p-2 mb-4">BONUS TEMPORALES:</h1>

        <div className="relative -mx-6 md:-mx-8 lg:-mx-12">
        <div className="flex flex-col gap-6 mb-4">
        <img
    className="w-full rounded-lg hover:scale-105 transform transition duration-300 -translate-x-4"
    src="https://gopitchering.com/wp-content/uploads/2024/08/FDSSDDS-1024x521.png"
    alt="Imagen 1"
  />
  <img
    className="w-full rounded-lg hover:scale-105 transform transition duration-300 -translate-x-4"
    src="https://gopitchering.com/wp-content/uploads/2024/08/BONUS-2-1024x521.png"
    alt="Imagen 2"
  />
</div>

</div>


        <div className="flex justify-center items-center gap-4 flex-wrap">
          <div className="bg-[#013557] text-white p-4 rounded-lg text-center min-w-[80px] max-w-[100px] shadow-md">
            <span className="block text-2xl font-bold">{hours}</span>
            <p className="text-sm">Horas</p>
          </div>
          <div className="bg-[#013557] text-white p-4 rounded-lg text-center min-w-[80px] max-w-[100px] shadow-md">
            <span className="block text-2xl font-bold">{minutes}</span>
            <p className="text-sm">Minutos</p>
          </div>
          <div className="bg-[#013557] text-white p-4 rounded-lg text-center min-w-[80px] max-w-[100px] shadow-md">
            <span className="block text-2xl font-bold">{seconds}</span>
            <p className="text-sm">Segundos</p>
          </div>
        </div>
      </div>

      <p className="text-center text-white font-bold text-sm mt-4 bg-[#013557] p-3 rounded-lg shadow-md hover:scale-105 transform transition duration-300">
        Acelera tus resultados comprando dentro de la primera hora con estos bonus GRATIS
      </p>
  
      <button
        onClick={() => window.open("https://pay.hotmart.com/O94296249S?checkoutMode=10&bid=1725551295569", "_blank")}
  className="mt-5 bg-gradient-to-r from-black via-[#013557] to-black text-white text-xl md:text-2xl font-medium py-4 px-8 rounded-lg w-full max-w-2xl mx-auto block mb-1 animate-bounce"
  style={{
    backgroundSize: "200%",
    backgroundPosition: "center",
  }}
>
  ¡Quiero también el bonus!
</button>



    </div>


    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 mt-18 text-[#f9bc66] overflow-hidden border-b-4 border-[#f9bc66] whitespace-nowrap animate-typing max-w-full ">
    Entonces, esto es lo que obtendrás!
</h2>

            
            <div className="border-4 border-dashed border-[#f9bc66] rounded-xl p-6 md:p-8 max-w-2xl mx-auto">
  <div className="space-y-6 text-lg">
    <div className="flex flex-col md:flex-row justify-between items-center gap-2">
      <span className="font-semibold text-center md:text-left">GUÍA DE LANZAMIENTO PREDECIBLE EN 7 DÍAS</span>
      <span className="text-[#f9bc66] font-bold text-center md:text-right">(Valorado en $970 usd)</span>
    </div>
    <div className="flex flex-col md:flex-row justify-between items-center gap-2">
      <span className="font-semibold text-center md:text-left">CREA CURSOS RENTABLES SIN EXPERIENCIA</span>
      <span className="text-[#f9bc66] font-bold text-center md:text-right">(Valorado en $197 usd)</span>
    </div>
    <div className="flex flex-col md:flex-row justify-between items-center gap-2">
      <span className="font-semibold text-center md:text-left">PROSPECTA TU PRIMER INFLUENCER ASEGURADO</span>
      <span className="text-[#f9bc66] font-bold text-center md:text-right">(Valor INVALUABLE)</span>
    </div>
    <div className="flex flex-col md:flex-row justify-between items-center gap-2">
      <span className="font-semibold text-center md:text-left">CONTRATO ASEGURADOR DE LANZAMIENTO</span>
      <span className="text-[#f9bc66] font-bold text-center md:text-right">(Valorado en $1500 usd)</span>
    </div>
  </div>

  


              <div className="flex flex-col items-center ">
        <h3 className="text-sm py-1 rounded-lg text-center leading-none mt-2">
          <span className="text-black block leading-none m-0">PRECIO REGULAR: <span className="line-through">$1497 USD</span></span>
        </h3>
        <h3 className="text-sm py-1 rounded-lg text-center leading-none m-0">
          <strong>
            <span className="text-[#f9bc66] text-3xl leading-none m-0">SOLO POR HOY: $97 USD</span>
          </strong>
        </h3>
      </div>


            </div>
          </div>
  

          {/* CTA Button */}         <button
            onClick={() => window.open("https://pay.hotmart.com/O94296249S?checkoutMode=10&bid=1725551295569", "_blank")}
  className="bg-gradient-to-r from-black via-[#013557] to-black text-white text-xl md:text-2xl font-medium py-4 px-8 rounded-lg w-full max-w-2xl mx-auto block mb-16 transition-all duration-300 hover:translate-x-1 hover:translate-x-[-5px]"
  style={{
    backgroundSize: "200%",
    backgroundPosition: "center",
  }}
>
¡Sí! Quiero Acceso Inmediato
</button>
        </section>
        </div>
)}


        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-gray-500">
          <p className="mb-2">© 2025 Go Pitchering. All Rights Reserved.</p>
          <p className="max-w-2xl mx-auto">
            Descargo de Responsabilidad: Este producto no garantiza la obtención de resultados. Las referencias al desarrollo de una determinada estrategia no debe ser interpretada como una garantía de resultados. Esta página no es parte de la página de Meta o de Meta, Inc.
          </p>
        </footer>
      </div>
    </div>
  );
}

