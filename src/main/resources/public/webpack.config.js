/**
 * angular 打包 loaders 从右至左流
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./config/helpers');
console.log(helpers.root("css"));

module.exports = {
	entry : {
		main : './src/typescript/angular/pages/main.ts',
		index : './src/typescript/angular/pages/index.ts'
	},
	output : {
		path : './dist',
		publicPath : '/',
		/** filename : '[name].[hash].js' * */
		filename : '[name].js',
		/** 异步加载的js文件* */
		chunkFilename : '[id].[hash].chunk.js'
	},
	resolve : {
		extensions : [ '', '.js', '.ts' ]
	},
	module : {
		loaders : [ {
			/** angular2-template-loader angular组件 templateUrl styleUrls 路径转换* */
			test : /\.ts$/,
			loaders : [ 'ts', 'angular2-template-loader' ]
		}, {
			test : /\.html$/,
			loader : 'html'
		}, {
			/** 将import css 打包生产外联css* */
			test : /\.css$/,
			exclude : helpers.root('src', 'typescript'),
			loader : ExtractTextPlugin.extract('style', 'css?sourceMap')
		}, {
			/**
			 * 将src/typescript/路径下的 angular组件样式内敛到js里 styleUrls
			 * 只能使用相对地址,绝对路径会在node_modules里找
			 */
			test : /\.css$/,
			include : helpers.root('src', 'typescript'),
			loader : 'raw'
		} ]
	},
	plugins : [
	/** 提取公共js * */
	new webpack.optimize.CommonsChunkPlugin({
		name : [ 'core' ]
	}),
	/** 将js里的外联 css打包提取 * */
	new ExtractTextPlugin('[name].[hash].css'),
	/** 压缩混淆js * */
	new webpack.optimize.UglifyJsPlugin({
		output : {
			comments : false,
		},
		compress : {
			warnings : false
		}
	}) ]
}