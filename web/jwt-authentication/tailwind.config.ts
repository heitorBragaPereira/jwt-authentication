import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "red",
        secondary: {
          light: "#292929",
          dark: "#454545",
        },
        tertiary: {
          light: "#454545",
          dark: "#454545",
        },
        textPrimary: {
          light: "#454545",
          dark: "#ffff",
        },
        textSecondary: {
          light: "#cad4e0",
          dark: "#292929",
        },
        salmao: "#faac6b",
      },
    },
  },
  plugins: [],
};

export default config;
