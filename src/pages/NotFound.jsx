import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-4xl font-bold mb-4">404</h1>
    <p className="text-xl mb-4">Página no encontrada</p>
    <Link to="/" className="text-blue-500 hover:underline">
      Volver al Inicio
    </Link>
  </div>
);

export default NotFound;
