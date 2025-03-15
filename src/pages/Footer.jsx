import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-4 mt-auto">
      <div className="container mx-auto flex flex-col items-center gap-4">
        {/* Logo */}
        <img
          src="/LOGO1.png"
          alt="Dario Costanza Logo"
          className="w-[150px] mt-[0px] mb-[45px]"
        />

        {/* Texto principal */}
        <p className="text-center text-md font-bold mt-[-50px]">
          Dario Costanza 2025®️ | Todos los derechos reservados ©️
        </p>

        {/* Términos */}
        <p className="text-center text-sm">
          <a href="/politicas-de-privacidad" className="hover:underline">
            Políticas de privacidad
          </a>
          {" | "}
          <a href="/terminos-condiciones" className="hover:underline">
            Términos de condiciones y uso
          </a>
          {" | "}
          <a href="/politica-compra" className="hover:underline">
            Política de compra
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
