/** 普通js打包 * */
var webpack = require('webpack');
module.exports = {
	entry : {
		index : './src/javascript/pages/index.js'
	},
	output : {
		path : './js',
		filename : '[name].js'
	},
	module : {
		loaders : [ {
			test : /\.css$/,
			loader : 'style!css'
		} ]
	}
}