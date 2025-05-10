import React from 'react';

const PoliticaPrivacidad = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 text-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-yellow-500">Política de Privacidad</h1>
      <p className="mb-4">1. Información que recopilamos:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Datos personales (nombre, correo, teléfono) cuando completás formularios o realizás compras.</li>
        <li>Datos de navegación (cookies, IP) para mejorar tu experiencia en el sitio.</li>
      </ul>
      <p className="mb-4">2. Uso de la información:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>Para gestionar consultas, compras y brindar soporte.</li>
        <li>Para enviarte información relevante sobre nuestros servicios (solo si aceptás recibir comunicaciones).</li>
      </ul>
      <p className="mb-4">3. Protección de datos:</p>
      <p className="mb-4">
        Tus datos están seguros, usamos protocolos de cifrado y nunca los compartimos con terceros sin tu consentimiento, salvo por obligación legal.
      </p>
      <p className="mb-4">4. Derechos del usuario:</p>
      <p className="mb-4">
        Podés acceder, rectificar o eliminar tus datos en cualquier momento escribiéndonos a{" "}
        <a href="mailto:contacto@dariocostanza.com" className="text-yellow-500 underline">
          contacto@dariocostanza.com
        </a>.
      </p>
    </div>
  );
};

export default PoliticaPrivacidad;
