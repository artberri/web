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
const postcssUrl = require("postcss-url")([
  {
    url: "inline",
  },
]);

module.exports = {
  plugins: [
    postcssImport,
    postcssUrl,
    postcssNormalize,
    postcssPresetEnv,
    ...(process.env.HUGO_ENVIRONMENT === "production" ? [purgecss] : []),
  ],
};
