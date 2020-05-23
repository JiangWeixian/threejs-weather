// NOTE: dont move this file
const path = require('path')
const Rupture = require('rupture')

// path
const context = path.resolve(__dirname, '../')
const assets = path.resolve(context, 'src/assets')
const project = path.resolve(context, 'src')
const static = path.resolve('context', 'static')
const output = path.resolve(context, 'dist')
const public = path.resolve(context, 'public')

const common = {
  path: {
    static,
    assets,
    project,
    output,
    context,
    public,
    tsconfig: path.resolve(context, 'tsconfig.json'),
  },
  stylus: {
    plugins: [Rupture()],
  },
  gzip: false,
}

module.exports = common
