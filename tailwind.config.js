/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./build/*.html", "./build/*.js"],
  theme: {
    extend: {
      colors: {
        palegray: "#D9D9D9",
        paleyellow: "#F4F4DC",
      },
      fontFamily: {
        jaro: ["Jaro", "sans-serif"],
        inder: ["Inder", "sans-serif"],
      },
    },
    plugins: [],
  },
};
