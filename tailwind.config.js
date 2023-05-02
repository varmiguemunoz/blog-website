/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage:{
        "login-bg": "url('http://localhost:3000/background.jpg')"
      }
    },
  },
  plugins: [],
}

