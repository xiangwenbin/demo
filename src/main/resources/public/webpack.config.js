/**
 * angular 打包 loaders 从右至左流
 * ftl模板loader的几种选择尝试
 * 1 使用html-loader 需配置htmlLoader属性
 *   htmlLoader: {
 *		ignoreCustomFragments: [/<%[\s\S]*?%>/,/<\?[\s\S]*?\?>/,/<#[\s\S]*?>/,/<\/#[\s\S]*?>/]
 *	 }
 *   但同时使用webpack.optimize.UglifyJsPlugin 及 htmlloader 会多调一次html-minifier,htmlLoader的设置无效
 * 2 template-html?engine=hogan  无法读取变量
 * 3 使用underscore-template 读取ftl模板，模板引擎 lodash 通过设置
 *   interpolate: '\\{\\{(.+?)\\}\\}',//赋值
 *   evaluate: '\\{%([\\s\\S]+?)%\\}',//表达式
 *   escape: '\\{\\{\\{(.+?)\\}\\}\\}' 
 *   可调整 指令标签
 */

//var minify = require("html-minifier");
//exports.minify = function(value, options) {
//	var options=options||{};
//	options.ignoreCustomFragments=[/<%[\s\S]*?%>/,/<\?[\s\S]*?\?>/,/<#[\s\S]*?>/,/<\/#[\s\S]*?>/];
//	return minify(value, options);
//};
/**test consolidate**/
//var cons = require('consolidate');
//cons.hogan('./tpl/main.ftl', { htmlWebpackPlugin:{options:{title:'11'}} }, function(err, html){
//  if (err) throw err;
//  console.log(html);
//});
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackXPlugin=require('./config/HtmlWebpackXPlugin');
var helpers = require('./config/helpers');
////////////////////////////////////////////
/** 将ts 入口文件路径目录解析成 entry map* */
var entry = helpers.getEntry('src', 'typescript', 'angular', 'pages');
console.log("entry:"+JSON.stringify(entry));
//////////////////////////////////////
var plugins = [
/** 提取公共js * */
new webpack.optimize.CommonsChunkPlugin({
	name : [ 'core' ]
}),
/** 将js里的外联 css打包提取 * */
new ExtractTextPlugin('[name].[hash].css'),
/** 压缩混淆js * */
//?config={ignoreCustomFragments: [/<%[\s\S]*?%>/,/<\?[\s\S]*?\?>/,/<#[\s\S]*?>/,/<\/#[\s\S]*?>/]}
new HtmlWebpackPlugin({
	minify:false}),new HtmlWebpackPlugin({
    title:'main title',
	name:'main',
    template: './tpl/main.ftl',
    filename: 'main.ftl',
	showErrors:false,
	chunks:['core','main'],
	envProfile:'dev',
	inject:false,
	minify:false
}),new webpack.optimize.UglifyJsPlugin({
	output : {
		comments : false,
	},
	compress : {
		warnings : false
	}
}),new HtmlWebpackXPlugin() ];
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
		extensions : [ '', '.js', '.ts','.ftl' ]
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
			test : /\.ftl$/,
			loader : 'underscore-template',
			query: {
				interpolate: '\\{\\{(.+?)\\}\\}',
                evaluate: '\\{%([\\s\\S]+?)%\\}',
                escape: '\\{\\{\\{(.+?)\\}\\}\\}'
            }
		},{
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
	htmlLoader: {
		ignoreCustomFragments: [/<%[\s\S]*?%>/,/<\?[\s\S]*?\?>/,/<#[\s\S]*?>/,/<\/#[\s\S]*?>/]
	},
	plugins : plugins
}