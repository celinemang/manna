/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Designer palette — cream (default)
        cream: "#F4ECDF",
        ivory: "#FAF4E8",
        parchment: "#EDE2CF",
        shell: "#E8DBC4",
        ink: "#3A2E22",
        ink2: "#5A4A38",
        ink3: "#8A7A66",
        hairline: "#D9CBB1",
        sage: "#8FA189",
        rose: "#C28C7E",
        dusk: "#8896A8",
        ember: "#B57C5F",
        gold: "#B89556",
      },
      fontFamily: {
        serif: ["CormorantGaramond_500Medium", "NotoSerifKR_500Medium", "serif"],
        "serif-italic": ["CormorantGaramond_500Medium_Italic", "serif"],
        sans: ["Inter_500Medium", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
