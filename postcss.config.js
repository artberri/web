const path = require("path");
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
    return ["light", "dark", ...(els.tags || []), ...(els.classes || [])];
  },
  safelist: [],
});

const postcssUrl = require("postcss-url")([
  {
    filter: /\/@fontsource\//,
    url: "copy",
    assetsPath: "static/fonts",
    // base path to search assets from
    // basePath: path.resolve("node_modules/@fontsource"),
    // dir to copy assets
    // assetsPath: "fonts",
    // using hash names for assets (generates from asset content)
    // useHash: true,
  },
  {
    filter: /\/@fontsource\//,
    url: (asset) => {
      return asset.url.replace("static/fonts", "/fonts");
    },
    multi: true,
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
