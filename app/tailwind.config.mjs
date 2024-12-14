/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(180deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%), url('/Image/BgProm.jpg')",
      },
      colors: {
        primary: "#003049",
        secondary: "#c1121f",
        terciary: "#669bbc",
        lettersDark: "#0d0a0b",
        lettersMiddle: "#999",
        lettersLight: "#f3eff5",
      },
      fontFamily: {
        poppins: ["poppins"],
      },
    },
  },
  plugins: [],
};
