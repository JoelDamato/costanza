import React from 'react';

const PoliticaCompra = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 text-gray-900">
      <h1 className="text-3xl font-bold mb-6 text-yellow-500">Política de Compra y Reembolso</h1>

      <p className="mb-4">1. Precios y pagos:</p>
      <p className="mb-4">
        Los precios están en USD e incluyen impuestos si corresponde. Los métodos de pago disponibles son tarjeta de crédito, débito y transferencias.
      </p>

      <p className="mb-4">2. Entrega de servicios:</p>
      <p className="mb-4">
        Al adquirir la formación, recibirás acceso al contenido, materiales y sesiones según el cronograma estipulado. Toda la información de acceso será enviada por correo electrónico en un plazo de 24 a 48 horas luego de confirmado el pago.
      </p>

      <p className="mb-4">3. Política de reembolsos:</p>
      <ul className="list-disc pl-6 mb-4">
        <li>
          El reembolso podrá solicitarse únicamente a partir del día 60 desde la fecha de compra, y solo si el cliente demuestra que no obtuvo resultados luego de aplicar completamente el contenido de la formación.
        </li>
        <li>
          Será requisito obligatorio presentar evidencia clara de haber completado toda la formación, incluyendo:
          <ul className="list-disc pl-6 mt-2">
            <li>Participación activa en las actividades solicitadas.</li>
            <li>Ejecución en tiempo y forma de las acciones indicadas.</li>
            <li>Entrega de los ejercicios o tareas prácticas.</li>
            <li>Registro de carga laboral e ingresos actualizados de forma legal, que demuestren que la formación no generó resultados económicos.</li>
          </ul>
        </li>
        <li>
          Los reembolsos serán procesados únicamente en el mismo método de pago utilizado en la compra.
        </li>
      </ul>

      <p className="mb-4">4. Contacto:</p>
      <p className="mb-4">
        Para consultas sobre compras o reembolsos, escribinos a{" "}
        <a href="mailto:contacto@dariocostanza.com" className="text-yellow-500 underline">
          contacto@dariocostanza.com
        </a>.
      </p>
    </div>
  );
};

export default PoliticaCompra;
