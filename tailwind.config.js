/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "primary-background-color": "var(--primary-background-color)"
      }
    },
  },
  plugins: [],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
}

