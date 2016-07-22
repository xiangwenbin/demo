/**
 * 模块解析顺序 先加上跟路径baseURL,然后通过map替换包，最后通过packages，替换main下的.js
 */
var packages = {
	'app' : {
		main : 'main.js',
		defaultExtension : 'js'
	},
	'rxjs' : {
		defaultExtension : 'js'
	},
	'angular2-in-memory-web-api' : {
		main : 'index.js',
		defaultExtension : 'js'
	},
};
var packages = {
	'app' : {
		main : 'main.js',
		defaultExtension : 'js'
	},
	'rxjs' : {
		defaultExtension : 'js'
	},
	'angular2-in-memory-web-api' : {
		main : 'index.js',
		defaultExtension : 'js'
	},
};
var ngPackageNames = [ 'common', 'compiler', 'core', 'forms', 'http',
		'platform-browser', 'platform-browser-dynamic', 'router',
		'router-deprecated', 'upgrade', ];

function packIndex(pkgName) {
	packages['@angular/' + pkgName] = {
		main : 'index.js',
		defaultExtension : 'js'
	};
}
ngPackageNames.forEach(packIndex);
System.config({
	baseURL : '/',
	defaultJSExtensions : true,
	paths : {
		"github:" : "jspm_packages/github/",
		"npm:" : "jspm_packages/npm/"
	},
	map : {
		"@angular" : 'node_modules/@angular',
		'angular2-in-memory-web-api' : 'node_modules/angular2-in-memory-web-api',
		'rxjs' : 'node_modules/rxjs',
		"css" : "github:systemjs/plugin-css@0.1.23"
	},
	packages : packages
});
