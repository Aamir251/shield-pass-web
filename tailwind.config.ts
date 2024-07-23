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
        light: "#E0DBF9",
      },
      textColor: {
        "primary-white": "#D8D5F1",
        "secondary-white": "#B2B2C9",
      },
    },
  },
  plugins: [],
};
export default config;
