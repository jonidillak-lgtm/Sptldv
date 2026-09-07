module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // blue-600
        pastelGreen: 'rgba(34,197,94,0.18)', // for DHP
        pastelRed: 'rgba(239,68,68,0.14)',
        grid: '#e6edf7',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        '2xl': '1rem',
      }
    },
  },
  plugins: [],
}