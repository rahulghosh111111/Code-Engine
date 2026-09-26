/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ide: {
          bg: '#1e1e1e',
          sidebar: '#252526',
          header: '#333333',
          border: '#3c3c3c',
          active: '#37373d',
          text: '#cccccc',
          accent: '#007acc'
        }
      }
    },
  },
  plugins: [],
};
