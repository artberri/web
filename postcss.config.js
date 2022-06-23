const postcssImport = require("postcss-import");
const postcssNormalize = require("postcss-normalize");
const postcssPresetEnv = require("postcss-preset-env")({
  features: {
    "nesting-rules": true,
  },
});
const purgecss = require("@fullhuman/postcss-purgecss")({
  content: ["./hugo_stats.json"],
  defaultExtractor: (content) => {
    const els = JSON.parse(content).htmlElements;
    return [...(els.tags || []), ...(els.classes || []), ...(els.ids || [])];
  },
  safelist: [],
});
const fontMagician = require("postcss-font-magician")({
  variants: {
    "Fjalla One": {
      400: [],
    },
    Poly: {
      400: [],
      700: [],
    },
  },
});

module.exports = {
  plugins: [
    postcssImport,
    postcssNormalize,
    fontMagician,
    postcssPresetEnv,
    ...(process.env.HUGO_ENVIRONMENT === "production" ? [purgecss] : []),
  ],
};
