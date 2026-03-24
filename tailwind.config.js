/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pokedex: {
          bg:        "#fff3e4", // warm cream - page background #faeee1 #fff8f0
          text:      "#3d1a00", // deep warm brown - body text
          header:    "#de5239", // red-orange - header background
          accent:    "#ffad52", // warm orange - buttons & active filters
          hover:     "#ff9441", // bright orange - hover state
          yellow:    "#ffd57b", // pale yellow - icons, subtitles, highlights
          id:        "#de5239", // same as header - pokemon ID badges
        },
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

