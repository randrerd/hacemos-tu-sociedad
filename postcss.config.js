// postcss.config.js
module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    require('postcss-partial-import')({ prefix: '_', extension: '.scss' }),
    require('postcss-nested'),
    require('postcss-simple-vars'),
    require('autoprefixer'),
  ],
};
