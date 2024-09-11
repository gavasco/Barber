/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        lightBackGround: "#83D6E3",
        backGround: '#63C2D1',
        darkBackGround: "#268596",

        primary: '#23cae4',
        darkPrimary: '#33a7b9',

        blackTransparent: 'rgba(0, 0, 0, 0.5)',
      }
    },
  },
  plugins: [],
};
