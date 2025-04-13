import { useEffect } from "react";
import { Link } from "react-router-dom";
import { User } from "lucide-react";

export default function HomePage() {

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.cdnfonts.com/css/garet";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white font-garet">

      {/* Header con ícono de login */}
      <header className="flex justify-between items-center px-6 py-4 bg-black shadow-md">
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
      <section className="relative px-4 py-3 md:py-36 bg-white overflow-hidden">
        <div className="container mx-auto max-w-6xl text-center space-y-6">
          <h1 className="text-3xl md:text-6xl font-bold text-gray-900 leading-tight">
            Acompañando procesos de transformación con propósito y presencia
          </h1>
          <p className="text-l text-gray-600 max-w-2xl mx-auto">
            Soy Darío Costanza, coach profesional desde hace más de 15 años. Estoy acá para potenciar tu bienestar desde una presencia cercana, profesional y motivadora.
          </p>
        </div>
      </section>

      {/* Biografía */}
      <section className="py-3 px-4 bg-[#E0E0E0]">
        <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-12 items-center">
          <img
            src="/dario.jpg"
            alt="Darío Costanza"
            className="rounded-3xl shadow-lg"
          />
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">Sobre mí</h2>
            <p className="text-lg text-gray-800">
              Empecé este camino como parte de mi propio proceso personal. Hoy, después de más de 3.000 horas de sesiones, sigo creyendo en el poder transformador de una conversación con sentido.
            </p>
            <p className="text-lg text-gray-800">
              Mi mirada sobre el coaching es integral: creo en el trabajo con el cuerpo, las emociones y el lenguaje. No busco “arreglar” personas, sino acompañar desde la presencia, la escucha y la compasión.
            </p>
            <p className="text-lg text-gray-800">
              Me formé en instituciones internacionales y trabajo con líderes, profesionales y personas que desean reconectar con lo esencial.
            </p>
          </div>
        </div>
      </section>

      {/* Filosofía */}
      <section className="py-3 px-4">
        <div className="container mx-auto max-w-4xl text-center space-y-8">
          <h2 className="text-3xl font-bold text-gray-900">Mi filosofía de trabajo</h2>
          <p className="text-lg text-gray-700">
            Creo en un coaching ético, humano y profundo. Cada encuentro es único. Acompaño desde el respeto, la intuición y el silencio cuando hace falta.
          </p>
          <p className="text-lg text-gray-700">
            Trabajo con personas que quieren vivir más alineadas consigo mismas, desarrollar su liderazgo o sostener conversaciones difíciles desde la autenticidad.
          </p>
        </div>
      </section>

      {/* Pilares */}
      <section className="py-3 mb-6 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <span className="bg-[#FFCC00] text-gray-900 px-4 py-1.5 rounded-full text-sm font-medium uppercase tracking-wide">
              Mis Pilares
            </span>
            <h2 className="text-4xl font-bold mt-4 text-gray-900">Lo que sostiene mi práctica</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { title: "Presencia", desc: "Estar ahí, completamente, para vos. Sin juicios, sin agenda, con entrega total." },
              { title: "Escucha profunda", desc: "Escuchar lo que decís, lo que no decís, y lo que necesita ser dicho." },
              { title: "Compasión", desc: "Una mirada amorosa, humana y comprometida con tu proceso." },
              { title: "Sentido", desc: "Cada conversación busca reconectar con lo que realmente importa." },
            ].map((pillar, idx) => (
              <div key={idx} className="bg-[#E0E0E0] p-8 rounded-2xl shadow-md border border-gray-200">
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{pillar.title}</h3>
                <p className="text-gray-700">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-6 px-4 bg-[#FFCC00] text-gray-900 text-center">
        <div className="container mx-auto max-w-3xl space-y-6">
          <h2 className="text-4xl font-bold">¿Te gustaría empezar tu proceso?</h2>
          <p className="text-lg">
            Si sentís que es momento de mirar hacia adentro, rediseñar tu forma de vivir o liderar, estoy acá para acompañarte con compromiso y alegría.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="https://calendly.com/dario-costanza"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-gray-900 font-semibold px-6 py-3 rounded-full hover:bg-[#E0E0E0] transition"
            >
              Agendar sesión
            </a>
            <Link
              to="/contact"
              className="border border-white text-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-gray-900 transition"
            >
              Escribime
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
