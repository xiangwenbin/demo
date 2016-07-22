/**
 * angular 打包 loaders 从右至左流
 */
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./config/helpers');
////////////////////////////////////////////
/** 将ts 入口文件路径目录解析成 entry map* */
var entry = helpers.getEntry('src', 'typescript', 'angular', 'pages');
console.log("entry:"+entry);
//////////////////////////////////////
var plugins = [
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
}), new HtmlWebpackPlugin() ];
////////////////////////////////////////////
module.exports = {
	entry : entry,
	output : {
		path : './dist',
		/**生成index.html **/
		publicPath : '/dist',
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
			/** 
			 * angular2-template-loader angular组件 templateUrl styleUrls 路径转换 
			 * webpack-replace 将ts里无法被解析的字符串.css!转换成.css
			 * */
			test : /\.ts$/,
			loaders : [ 'ts', 'angular2-template-loader','webpack-replace?{search: ".css!",replace: ".css"}' ]
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
			 * 只能使用相对地址,绝对路径会在node_modules里找,配置moduleId可以讲绝对路径根路径指向 当前组件所在目录
			 */
			test : /\.css$/,
			include : helpers.root('src', 'typescript'),
			loader : 'raw'
		} ]
	},
	plugins : plugins
}