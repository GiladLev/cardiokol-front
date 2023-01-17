/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    // fontFamily: {
    //   sans: ['Heebo', 'sans-serif']
    // },
    extend: {
      colors: {
        primary: '#FE515C',
        secondary: '#219494',
        background: '#F1F1F1',
        backgroundError: "#F8D8DA",
        backgroundErrorLogin: "#EBECEC",
        dayCircle:'#F6F6F6',
        line: '#212D391A',
        currentDay: '#8CD7DC',
        colorBorder: '#212D3933',
        recordCircle: "#212D390D" ,
        errorColor: "#EF233C",
        half : "#AFD3D3"
      },
    },
  },
  plugins: [],
}
