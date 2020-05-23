module.exports = {
  plugins: {
    'postcss-preset-env': {},
    'rucksack-css': {},
    'postcss-import': {},
    'postcss-url': {},
    'postcss-cssnext': {
      browsers: ['> 1%'],
    },
    cssnano: {
      preset: 'advanced',
      autoprefixer: false,
    },
  },
}
