module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-normalize'),
        require('precss'),
        require('autoprefixer'),
        require('cssnano')({
            preset: 'default'
        })
    ]
}
