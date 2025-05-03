import React, { useState } from 'react';

function PagoMercadoPago() {
  const [title, setTitle] = useState("Focus Dental");
  const [price, setPrice] = useState("230000"); // en ARS
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [link, setLink] = useState("");

  const generarLinkDePago = async () => {
    setLoading(true);
    setError("");
    setLink("");

    try {
      const response = await fetch("http://localhost:5000/api/generar-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, price: parseFloat(price) })
      });

      const data = await response.json();

      if (response.ok && data.link) {
        setLink(data.link); // 👈 Mostrar el link, no redirigir
      } else {
        throw new Error(data.error || "Error desconocido");
      }
    } catch (err) {
      setError("❌ Error al generar el link de pago.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-zinc-900 text-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Generar Pago</h2>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Título del producto</label>
        <input
          type="text"
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-medium">Precio en ARS</label>
        <input
          type="number"
          className="w-full p-2 rounded bg-zinc-800 border border-zinc-600"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      {error && <p className="text-red-400 mb-3">{error}</p>}

      <button
        onClick={generarLinkDePago}
        disabled={loading}
        className={`w-full py-2 rounded font-semibold mb-4 ${
          loading ? "bg-gray-600" : "bg-yellow-400 text-black hover:bg-yellow-300"
        }`}
      >
        {loading ? "Generando..." : "Generar Link de Pago"}
      </button>

      {link && (
        <div className="mt-4 bg-zinc-800 p-4 rounded text-sm break-words">
          <p className="mb-2 font-medium text-green-400">✅ Link generado:</p>
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-400 underline break-all"
          >
            {link}
          </a>
        </div>
      )}
    </div>
  );
}

export default PagoMercadoPago;
