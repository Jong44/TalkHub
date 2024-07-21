/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#FF6347",
        "secondary-color": "#6C757D",
        "accent-color": "#FFD700",
        "background-color": "#F1F1F1",
        "text-color": "#343A40",
        "card-background-color": "#FFFFFF",
      },
    },
  },
  plugins: [],
};
