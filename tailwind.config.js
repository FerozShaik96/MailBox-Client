/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-purple': '#081A51',
        'light-white': 'rgba(255,255,255,0.10)',
      },
      backgroundImage: {
        bgIMg: "url('/img4.jpg')",
      },
    },
  },
  plugins: [],
};
