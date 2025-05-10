import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
    <h1 className="text-6xl font-extrabold text-yellow-500 mb-4">404</h1>
    <p className="text-lg mb-6 text-white">Página no encontrada</p>
    <Link
      to="/"
      className="px-4 py-2 border border-yellow-500 text-yellow-500 rounded hover:bg-yellow-500 hover:text-black transition"
    >
      Volver al Inicio
    </Link>
  </div>
);

export default NotFound;
