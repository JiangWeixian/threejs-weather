const path = require('path')
const tsConfig = require('./ts.config')
const babelConfig = require('./babel.config')
const postcssPlugins = require('./postcss.config')

const configs = {
  dirs: {
    components: path.resolve(__dirname, '../components'),
    lib: path.resolve(__dirname, '../lib'),
    es: path.resolve(__dirname, '../es'),
  },
  tsConfig: tsConfig(),
  getBabelConfig: babelConfig,
  postcssPlugins: postcssPlugins,
}

module.exports = configs
