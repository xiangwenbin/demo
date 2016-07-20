var webpack = require('webpack');
module.exports = {
	entry : {
		index : './src/javascript/pages/index.js'
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
			loader : 'style!css'
		} ]
	},
	plugins : [ new webpack.optimize.CommonsChunkPlugin({
		name : [ 'index' ]
	})]
}