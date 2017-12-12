const merge = require('webpack-merge')
const webpack = require('webpack');
const path = require('path');
const common = require('./webpack.common');

module.exports = merge(common, {
  devtool: '#source-map',

  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    port: 9999
  },

  module: {
    rules: [
      {
        test: /\.(png|svg|jpeg|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'images/'
        }
      },
      {
        test: /\.jade$/,
        loader: 'pug-loader'
      },
      {
        test: /\.(ttf|woff|woff2|eot|otf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'fonts/'
        }
      },
      {
        test: /\.(scss|css)$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
});