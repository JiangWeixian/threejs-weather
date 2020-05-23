const path = require('path')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CopyWebpakcPlugin = require('copy-webpack-plugin')
const ThreadLoader = require('thread-loader')

const configs = require('./config')

const workerpool = {
  workers: require('os').cpus().length - 1,
  poolTimeout: process.env.NODE_ENV === 'development' ? Infinity : 2000,
}

ThreadLoader.warmup(workerpool, ['ts-loader', 'babel-loader'])

/**
 * @type import('webpack').Configuration
 */
const common = {
  context: configs.path.context,
  entry: ['react-hot-loader/patch', './src/index.tsx'],
  output: {
    path: configs.path.output,
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
    alias: {
      '@': configs.path.project,
      assets: configs.path.assets,
      static: configs.path.static,
    },
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          { loader: 'cache-loader' },
          {
            loader: 'thread-loader',
            options: workerpool,
          },
          { loader: 'babel-loader' },
          {
            loader: 'ts-loader',
            options: {
              // IMPORTANT! use happyPackMode mode to speed-up compilation and reduce errors reported to webpack
              transpileOnly: true,
              happyPackMode: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[path][name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpakcPlugin([
      {
        from: configs.path.static,
        to: 'static',
      },
    ]),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: configs.path.tsconfig,
      checkSyntacticErrors: true,
    }),
  ],
}

module.exports = common
