import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#141415",
        "secondary-dark": "#252528",
        "primary-orange": "#F86262",
        "primary-blue": "#6DC4F4",
        light: "#E0DBF9",
      },
      textColor: {
        "primary-white": "#F0F0F0",
        "secondary-white": "#C3C1C1",
      },

      backgroundColor: {
        "black-one": "#1B1B1D",
      },
      borderColor: {
        primary: "#29292C",
        input: "#353438",
      },
    },
  },
  plugins: [],
};
export default config;
