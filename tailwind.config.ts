/** @type {import('tailwindcss').Config} */
module.exports = {
    theme: {
      extend: {
        keyframes: {
          shine: {
            "0%": { backgroundPosition: "200% 0" },
            "25%": { backgroundPosition: "-200% 0" },
            "100%": { backgroundPosition: "-200% 0" },
          },
        },
        animation: {
          shine: "shine 3s ease-out infinite",
        },
      },
    },
    plugins: [],
  };
  