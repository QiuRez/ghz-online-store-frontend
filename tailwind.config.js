/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    screens: {
      'smm': '420px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        "primary-color": "var(--primary-color)",
        "primary-color-darker": "var(--primary-color-darker)",
        "primary-background-color": "var(--primary-background-color)"
      }
    },
  },
  plugins: [],
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}']
}

