/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:"class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        lobster:"lobster",
      },
      colors:{
        'darkbg':'rgb(10,25,47)',
        'xdark':"rgb(45,45,51)",
        'hovcol':"rgb(100,254,217)",
        'dcardbg':"rgb(17,34,64)",
      },
      keyframes:{
        bounces:{
         '50%':{
          transform:'translateY(-25%)',
        
        },
         
        }
      },
      animation:{
        'bouncing':'bounces 1s linear infinite',
      },
      transitionTimingFunction:{
        'in-expo':' cubic-bezier(0.645,0.045,0.355,1)',
      }
    },
  },
  plugins: [],
}