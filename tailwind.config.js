module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./public/**/*.js"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "github-dark": "#0d1117",
        "github-dark-border": "#30363d",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
