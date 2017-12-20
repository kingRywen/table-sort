const merge = require('webpack-merge')
const webpack = require('webpack');
const path = require('path');
const common = require('./webpack.common');
var es3ifyPlugin = require('es3ify-webpack-plugin');

// 分离css文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {

	stats: {
		// 增加资源信息
		assets: true,
		children: false,
		colors: true
	},

	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			// exclude: /node_modules/
		},
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

			use: ExtractTextPlugin.extract({
				use: [{
					loader: 'css-loader',
					options: {
						sourceMap: true,
						minimize: true
					}
				},
				{
					loader: 'sass-loader',
					options: {
						sourceMap: true
					}
				}
				],
				fallback: 'style-loader'
			})
		}
		]
	},

	plugins: [
		new es3ifyPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				properties: false,
				warnings: false
			},
			output: {
				beautify: false
			},
			sourceMap: false
		}),
		new ExtractTextPlugin('style.css'),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		})
	]
});