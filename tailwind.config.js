/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      width:{'80':'80%',},
      height:{'200':'200px','100vh':'100vh '},
    },
  },
  plugins: [],
}

