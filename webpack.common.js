const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: [
      './src/index.js'
    ]
  },

  output: {
    filename: 'table-sort.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'TableSort',
    libraryTarget: 'umd'
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    // new HtmlWebpackPlugin({
    //   template: './src/index.tmpl.html'
    // })
  ]
}