module.exports = {
  important: true,
  // Active dark mode on class basis
  darkMode: "class",
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  content:["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  plugins: [],
  future: {
    purgeLayersByDefault: true,
  },
  theme: {
    extend: {
      colors: {
        blue: {
          950: '#38A1DB',
        },
      }
    },
  },
};
