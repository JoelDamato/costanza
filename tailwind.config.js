/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Incluir todos los componentes en src
    './public/index.html',        // Incluir tu HTML si también usas clases ahí
  ],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        garet: ['"Garet"', 'sans-serif'], // Agregado para usar font-garet
      },
    },
  },
  plugins: [],
};
