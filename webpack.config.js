const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const Workbox = require('workbox-webpack-plugin')

module.exports = {
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  entry: {
    app: path.join(__dirname, 'src/index')
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        use: {
          loader: 'babel-loader'
        },
        include: path.join(__dirname, 'src'),
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    port: 3010,
    compress: true,
    stats: 'minimal',
    overlay: true,
    clientLogLevel: 'none',
    quiet: true
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin([{ from: 'src/manifest.json', to: '' }, { from: 'src/assets', to: 'assets' }]),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.join(__dirname, 'public/index.html')
    }),
    new Workbox.GenerateSW({
      clientsClaim: true,
      skipWaiting: true
    })
  ]
}
