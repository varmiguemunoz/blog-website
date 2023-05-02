/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      backgroundImage:{
        "login-bg": "url('https://blog-website-olive.vercel.app/background.jpg')"
      }
    },
  },
  plugins: [],
}

