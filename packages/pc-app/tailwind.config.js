/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4A90E2',
        accent: '#00E5FF',
        iceGlass: 'rgba(255, 255, 255, 0.1)',
        iceBorder: 'rgba(255, 255, 255, 0.2)'
      },
      boxShadow: {
        'glow': '0 0 20px rgba(0, 229, 255, 0.4)',
        'glow-strong': '0 0 30px rgba(0, 229, 255, 0.8)'
      },
      backgroundImage: {
        'frozen-forest': "url('https://images.unsplash.com/photo-1549880181-58079a40590a?q=80&w=2070&auto=format&fit=crop')"
      }
    },
  },
  plugins: [],
}