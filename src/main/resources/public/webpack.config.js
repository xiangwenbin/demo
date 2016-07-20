var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
	entry : {
		main : './src/typescript/angular/pages/main.ts'
	},
	output : {
		path : './js',
		filename : '[name].js'
	},
	resolve : {
		extensions : [ '', '.js', '.ts' ]
	},
	module : {
		loaders : [ {
			test : /\.ts$/,
			loaders : [ 'ts', 'angular2-template-loader' ]
		}, {
			test : /\.html$/,
			loader : 'html'
		}, {
			test : /\.css$/,
			loader : ExtractTextPlugin.extract('style', 'css?sourceMap')
		}, {
			test : /\.css$/,
			loader : 'raw'
		} ]
	},
	plugins : [ new webpack.optimize.CommonsChunkPlugin({
		name : [ 'core' ]
	}), new webpack.optimize.UglifyJsPlugin({
		output: {
            comments: false, 
        },
		compress : {
			warnings : false
		}
	}) ]
}