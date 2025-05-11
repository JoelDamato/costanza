import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://back-cos-gim3.onrender.com'
    : 'http://localhost:5000';

export default function GeneradorUsuario() {
  const [estado, setEstado] = useState('form'); // form | generado
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [copiado, setCopiado] = useState(false);
  const [error, setError] = useState('');

  const generarPassword = () => {
    const palabras = [
      'diente', 'sonrisa', 'caries', 'placa', 'esmalte',
      'muela', 'limpieza', 'brackets', 'encia', 'fluor',
      'rayos', 'cura', 'pasta', 'sarro', 'implante'
    ];
    const palabra = palabras[Math.floor(Math.random() * palabras.length)];
    const numero = Math.floor(100 + Math.random() * 900);
    return palabra + numero;
  };

  const crearUsuario = async () => {
    const nuevaPassword = generarPassword();
    setPassword(nuevaPassword);
    setError('');
    try {
      const res = await axios.post(`${API_BASE_URL}/api/create/register`, {
        nombre,
        email,
        password: nuevaPassword,
        cursos: ['Focus Dental'],
        rol: 'user',
      });
      if (res.status === 201) {
        setEstado('generado');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear usuario');
    }
  };

  const copiarMensaje = () => {
    const texto = 
`🎉 ¡Gracias por tu compra y bienvenid@ oficialmente al curso de *Focus Dental*.

📚 Accedé a la plataforma desde:
👉 https://dariocostanza.com/login

👤 Usuario: ${email}
🔐 Contraseña: ${password}

🔓 *Modalidad del curso:*
Cada 7 días se desbloquea un nuevo módulo. Este ritmo está diseñado para evitar la infoxicación y ayudarte a aplicar cada concepto con claridad y foco.

⚠️ *Clave para avanzar:*
No mires los videos por mirar. Aplicá lo aprendido, repasá si hace falta, y usalo en tu día a día.

✨ Hoy empieza tu nueva versión como profesional. ¡Vamos con todo!`;

    navigator.clipboard.writeText(texto).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    });
  };

  if (estado === 'generado') {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mt-4">
        <h2 className="text-xl font-bold mb-4 text-black">✅ Cuenta creada con éxito</h2>
        <div className="whitespace-pre-line text-sm leading-relaxed text-black mb-4">
          🎉 ¡Gracias por tu compra y bienvenid@ oficialmente a *Focus Dental*.

          📚 Accedé a la plataforma desde:
          👉 https://dariocostanza.com/login

          👤 Usuario: {email}
          🔐 Contraseña: {password}

          🔓 *Modalidad del curso:*
          Cada 7 días se desbloquea un nuevo módulo. Este ritmo está diseñado para evitar la infoxicación y ayudarte a aplicar cada concepto con claridad y foco.

          ⚠️ *Clave para avanzar:*
          No mires los videos por mirar. Aplicá lo aprendido, repasá si hace falta, y usalo en tu día a día.

          ✨ Hoy empieza tu nueva versión como profesional. ¡Vamos con todo!
        </div>
        <div className="flex gap-3">
          <button
            onClick={copiarMensaje}
            className={`px-4 py-2 rounded-md text-white ${copiado ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            {copiado ? '✅ Copiado' : '📋 Copiar mensaje'}
          </button>
          <button
            onClick={() => {
              setEstado('form');
              setEmail('');
              setNombre('');
              setPassword('');
            }}
            className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md text-black"
          >
            🔁 Generar otro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mt-4">
      <h2 className="text-xl font-bold mb-4 text-black">🧾 Crear nuevo usuario</h2>
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none"
      />
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value.toLowerCase())}
        className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none"
      />
      <button
        onClick={crearUsuario}
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
      >
        ➕ Crear usuario
      </button>
    </div>
  );
}
