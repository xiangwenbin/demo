'use strict';

function HtmlWebpackXPlugin (options) {
	
}

HtmlWebpackXPlugin.prototype.apply = function (compiler) {
  var self = this;
  // Hook into the html-webpack-plugin processing
  compiler.plugin('compilation', function (compilation) {
	  compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
//	      htmlPluginData.html += 'The magic footer';
		  console.log(JSON.stringify(htmlPluginData));
	      callback(null, htmlPluginData);
	    });
    compilation.plugin('html-webpack-plugin-after-emit', function (htmlPluginData, callback) {
      
//      console.log(htmlPluginData.html.source());
//    	console.log(JSON.stringify(htmlPluginData));
      return callback(null,htmlPluginData);
    });
  });
};

module.exports = HtmlWebpackXPlugin;