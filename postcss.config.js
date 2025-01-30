const isProduction = process.env.HUGO_ENVIRONMENT === 'production'
const postcssImport = require('postcss-import')
const postcssNormalize = require('postcss-normalize')
const postcssPresetEnv = require('postcss-preset-env')({
	features: {
		'nesting-rules': true,
	},
})
const { purgeCSSPlugin } = require('@fullhuman/postcss-purgecss');
const purgecss = purgeCSSPlugin({
	content: ['./hugo_stats.json'],
	defaultExtractor: (content) => {
		const els = JSON.parse(content).htmlElements
		return ['light', 'dark', ...(els.tags || []), ...(els.classes || [])]
	},
	safelist: { deep: [/chroma/] },
})

const fontsPath = isProduction ? 'public/fonts' : 'static/fonts'
const postcssUrl = require('postcss-url')([
	{
		filter: /\/@fontsource\//,
		url: 'copy',
		assetsPath: fontsPath,
		useHash: true,
	},
	{
		filter: /\/@fontsource\//,
		url: (asset) => {
			return asset.url.replace(fontsPath, '/fonts')
		},
		multi: true,
	},
])

module.exports = {
	plugins: [
		postcssImport,
		postcssUrl,
		postcssNormalize,
		postcssPresetEnv,
		...(isProduction ? [purgecss] : []),
	],
}
