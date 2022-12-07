/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'spblue': '#4FACF7',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
