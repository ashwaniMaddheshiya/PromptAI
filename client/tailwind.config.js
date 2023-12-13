/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        promptcardBG: "url('../public/ai-bg.jpg')",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
