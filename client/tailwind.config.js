const {nextui} = require("@nextui-org/react");

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          primaryGray: '#828282',
          primaryGreen: '#1DB954',
          primaryPurple: '#BF40BF'
        },
    },
},
  darkMode: "class",
  plugins: [nextui()],
}