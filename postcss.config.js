const postcssNormalize = require('postcss-normalize');

module.exports = {
    plugins: [
        require('postcss-import'),
        postcssNormalize(),
        require('postcss-mixins'),
        require('postcss-simple-vars'),
        require('postcss-nested'),
        require('autoprefixer'),
        require('cssnano')({
            preset: 'default'
        })
    ]
}
