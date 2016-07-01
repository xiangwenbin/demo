/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	__webpack_require__(1);
	var BaseModule = __webpack_require__(5);
	var BaseComponent = __webpack_require__(6);
	var Index = (function (_super) {
	    __extends(Index, _super);
	    function Index() {
	        _super.call(this);
	        this.initEvent();
	        this.initElement();
	        new BaseComponent({ data: { hello: "你好" } }).$inject('#module-cnt');
	    }
	    Index.prototype.initEvent = function () {
	        console.log("init events...");
	    };
	    Index.prototype.initElement = function () {
	        console.log('init elements...');
	    };
	    return Index;
	}(BaseModule));
	new Index();


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./index.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./index.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "body{\r\n\tbackground:#ccc;\r\n}", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	var BaseModule = (function () {
	    function BaseModule() {
	        this.init();
	    }
	    BaseModule.prototype.init = function () {
	        console.log("基类");
	    };
	    return BaseModule;
	}());
	module.exports = BaseModule;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var Regular = __webpack_require__(7);
	if (Regular.config) {
	    Regular.config({ BEGIN: "{", END: "}" });
	}
	var BaseComponent = Regular.extend({
	    template: '<div>base Template {hello}</div>',
	    data: {
	        hello: "hello world"
	    }
	});
	module.exports = BaseComponent;


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global, setImmediate) {!function(){"use strict";function t(e,n,r){function i(){r=r||e,n=n||"root";var t=new Error('Failed to require "'+r+'" from "'+n+'"');throw t.path=r,t.parent=n,t.require=!0,t}var s=t.resolve(e);if(null==s)return void i();var a=t.modules[s];if(!a._resolving&&!a.exports){var o={};o.exports={},o.client=o.component=!0,a._resolving=!0,a.call(this,o.exports,t.relative(s),o),delete a._resolving,a.exports=o.exports}return a.exports}t.modules={},t.aliases={},t.exts=["",".js",".json","/index.js","/index.json"],t.resolve=function(e){"/"===e.charAt(0)&&(e=e.slice(1));for(var n=0;5>n;n++){var r=e+t.exts[n];if(t.modules.hasOwnProperty(r))return r;if(t.aliases.hasOwnProperty(r))return t.aliases[r]}},t.normalize=function(t,e){var n=[];if("."!=e.charAt(0))return e;t=t.split("/"),e=e.split("/");for(var r=0;r<e.length;++r)".."===e[r]?t.pop():"."!=e[r]&&""!=e[r]&&n.push(e[r]);return t.concat(n).join("/")},t.register=function(e,n){t.modules[e]=n},t.alias=function(e,n){function r(){throw new Error('Failed to alias "'+e+'", it does not exist')}return t.modules.hasOwnProperty(e)?void(t.aliases[n]=e):void r()},t.relative=function(e){function n(r){var i=n.resolve(r);return t(i,e,r)}var r=t.normalize(e,"..");return n.resolve=function(n){var i=n.charAt(0);if("/"===i)return n.slice(1);if("."===i)return t.normalize(r,n);for(var s=e.split("/"),a=s.length;a--&&"deps"!==s[a];);return n=s.slice(0,a+2).join("/")+"/deps/"+n},n.exists=function(e){return t.modules.hasOwnProperty(n.resolve(e))},n},t.register("regularjs/src/Regular.js",function(t,e,n){var r=e("./env.js"),i=e("./parser/Lexer.js"),s=e("./parser/Parser.js"),a=e("./config.js"),o=e("./util"),u=e("./helper/extend.js");if(r.browser)var c=e("./helper/combine.js"),l=e("./dom.js"),h=e("./walkers.js"),f=e("./group.js");var p=e("./helper/event.js"),d=e("./helper/watcher.js"),v=e("./helper/parse.js"),m=e("./helper/filter.js"),g="undefined"==typeof document?{}:document,y=function(t){var e=r.isRunning;r.isRunning=!0;var n,i;t=t||{},t.data=t.data||{},t.computed=t.computed||{},t.events=t.events||{},this.data&&o.extend(t.data,this.data),this.computed&&o.extend(t.computed,this.computed),this.events&&o.extend(t.events,this.events),o.extend(this,t,!0),this.$parent&&this.$parent._append(this),this._children=[],this.$refs={},i=this.template,"string"==typeof i&&i.length<16&&(n=l.find(i))&&(i=n.innerHTML),i&&i.nodeType&&(i=i.innerHTML),"string"==typeof i&&(this.template=new s(i).parse()),this.computed=x(this.computed),this.$root=this.$root||this,this.events&&this.$on(this.events),this.$body&&(this._getTransclude=function(){var e=this.$parent||this;return this.$body?e.$compile(this.$body,{namespace:t.namespace,outer:this,extra:t.extra}):void 0}),this.$emit("$config"),this.config&&this.config(this.data),i&&(this.group=this.$compile(this.template,{namespace:t.namespace}),c.node(this)),this.$parent||this.$update(),this.$ready=!0,this.$emit("$init"),this.init&&this.init(this.data),r.isRunning=e};h&&(h.Regular=y),o.extend(y,{_directives:{__regexp__:[]},_plugins:{},_protoInheritCache:["directive","use"],__after__:function(t,e){var n;if(this.__after__=t.__after__,e.name&&y.component(e.name,this),n=e.template){var r,i;"string"==typeof n&&n.length<16&&(r=l.find(n))&&(n=r.innerHTML,(i=l.attr(r,"name"))&&y.component(i,this)),n.nodeType&&(n=n.innerHTML),"string"==typeof n&&(this.prototype.template=new s(n).parse())}e.computed&&(this.prototype.computed=x(e.computed)),y._inheritConfig(this,t)},directive:function(t,e){if("object"===o.typeOf(t)){for(var n in t)t.hasOwnProperty(n)&&this.directive(n,t[n]);return this}var r,i=o.typeOf(t),s=this._directives;if(null==e){if("string"===i&&(r=s[t]))return r;for(var a=s.__regexp__,u=0,c=a.length;c>u;u++){r=a[u];var l=r.regexp.test(t);if(l)return r}return void 0}return"function"==typeof e&&(e={link:e}),"string"===i?s[t]=e:"regexp"===i&&(e.regexp=t,s.__regexp__.push(e)),this},plugin:function(t,e){var n=this._plugins;return null==e?n[t]:(n[t]=e,this)},use:function(t){return"string"==typeof t&&(t=y.plugin(t)),"function"!=typeof t?this:(t(this,y),this)},config:function(t){var e=!1;if("object"==typeof t)for(var n in t)("END"===n||"BEGIN"===n)&&(e=!0),a[n]=t[n];e&&i.setup()},expression:v.expression,Parser:s,Lexer:i,_addProtoInheritCache:function(t,e){if(Array.isArray(t))return t.forEach(y._addProtoInheritCache);var n="_"+t+"s";y._protoInheritCache.push(t),y[n]={},y[t]||(y[t]=function(r,i){var s=this[n];if("object"==typeof r){for(var a in r)r.hasOwnProperty(a)&&this[t](a,r[a]);return this}return null==i?s[r]:(s[r]=e?e(i):i,this)})},_inheritConfig:function(t,e){var n=y._protoInheritCache,r=o.slice(n);return r.forEach(function(n){t[n]=e[n];var r="_"+n+"s";e[r]&&(t[r]=o.createObject(e[r]))}),t}}),u(y),y._addProtoInheritCache("component"),y._addProtoInheritCache("filter",function(t){return"function"==typeof t?{get:t}:t}),p.mixTo(y),d.mixTo(y),y.implement({init:function(){},config:function(){},destroy:function(){this.$emit("$destroy"),this.group&&this.group.destroy(!0),this.group=null,this.parentNode=null,this._watchers=null,this._children=[];var t=this.$parent;if(t){var e=t._children.indexOf(this);t._children.splice(e,1)}this.$parent=null,this.$root=null,this._handles=null,this.$refs=null},$compile:function(t,e){e=e||{},"string"==typeof t&&(t=new s(t).parse());var n,r=this.__ext__,i=e.record;e.extra&&(this.__ext__=e.extra),i&&this._record();var a=this._walk(t,e);if(i){n=this._release();var o=this;n.length&&(a.ondestroy=function(){o.$unwatch(n)})}return e.extra&&(this.__ext__=r),a},$bind:function(t,e,n){var r=o.typeOf(e);if("expression"===e.type||"string"===r)this._bind(t,e,n);else if("array"===r)for(var i=0,s=e.length;s>i;i++)this._bind(t,e[i]);else if("object"===r)for(var i in e)e.hasOwnProperty(i)&&this._bind(t,i,e[i]);return t.$update(),this},$unbind:function(){},$inject:function(t,e){var n=c.node(this);if(t===!1)return this._fragContainer||(this._fragContainer=l.fragment()),this.$inject(this._fragContainer);if("string"==typeof t&&(t=l.find(t)),!t)throw"injected node is not found";return n?(l.inject(n,t,e),this.$emit("$inject",t),this.parentNode=Array.isArray(n)?n[0].parentNode:n.parentNode,this):this},$mute:function(t){t=!!t;var e=t===!1&&this._mute;return this._mute=!!t,e&&this.$update(),this},_bind:function(t,e,n){var r=this;if(!(t&&t instanceof y))throw"$bind() should pass Regular component as first argument";if(!e)throw"$bind() should  pass as least one expression to bind";if(n||(n=e),e=v.expression(e),n=v.expression(n),n.set){var i=this.$watch(e,function(e){t.$update(n,e)});t.$on("$destroy",function(){r.$unwatch(i)})}if(e.set){var s=t.$watch(n,function(t){r.$update(e,t)});this.$on("$destroy",t.$unwatch.bind(t,s))}n.set(t,e.get(this))},_walk:function(t,e){if("array"===o.typeOf(t)){for(var n=[],r=0,i=t.length;i>r;r++)n.push(this._walk(t[r],e));return new f(n)}return"string"==typeof t?g.createTextNode(t):h[t.type||"default"].call(this,t,e)},_append:function(t){this._children.push(t),t.$parent=this},_handleEvent:function(t,e,n,r){var i,s=this.constructor,a="function"!=typeof n?o.handleEvent.call(this,n,e):n,u=s.event(e);return u?i=u.call(this,t,a,r):l.on(t,e,a),u?i:function(){l.off(t,e,a)}},_touchExpr:function(t){var e,n=this.__ext__,r={};if("expression"!==t.type||t.touched)return t;if(e=t.get||(t.get=new Function(o.ctxName,o.extName,o.prefix+"return ("+t.body+")")),r.get=n?function(t){return e(t,n)}:e,t.setbody&&!t.set){var i=t.setbody;t.set=function(e,n,r){return t.set=new Function(o.ctxName,o.setName,o.extName,o.prefix+i),t.set(e,n,r)},t.setbody=null}return t.set&&(r.set=n?function(e,r){return t.set(e,r,n)}:t.set),o.extend(r,{type:"expression",touched:!0,once:t.once||t.constant}),r},_f_:function(t){var e=this.constructor,n=e.filter(t);if(!n)throw"filter "+t+" is undefined";return n},_sg_:function(t,e,n){if("undefined"!=typeof n){var r=this.computed,i=r[t];if(i){if("expression"!==i.type||i.get||this._touchExpr(i),i.get)return i.get(this);o.log("the computed '"+t+"' don't define the get function,  get data."+t+" altnately","error")}}return"undefined"==typeof e||"undefined"==typeof t?void 0:n&&"undefined"!=typeof n[t]?n[t]:e[t]},_ss_:function(t,e,n,r,i){var s,i=this.computed,r=r||"=",a=i?i[t]:null;if("="!==r)switch(s=a?a.get(this):n[t],r){case"+=":e=s+e;break;case"-=":e=s-e;break;case"*=":e=s*e;break;case"/=":e=s/e;break;case"%=":e=s%e}if(a){if(a.set)return a.set(this,e);o.log("the computed '"+t+"' don't define the set function,  assign data."+t+" altnately","error")}return n[t]=e,e}}),y.prototype.inject=function(){return o.log("use $inject instead of inject","error"),this.$inject.apply(this,arguments)},y.filter(m),n.exports=y;var x=function(){function t(t){return function(e){return t.call(e,e.data)}}function e(t){return function(e,n){return t.call(e,n,e.data),n}}return function(n){if(n){var r,i,s,a={};for(var o in n)r=n[o],s=typeof r,"expression"!==r.type?"string"===s?a[o]=v.expression(r):(i=a[o]={type:"expression"},"function"===s?i.get=t(r):(r.get&&(i.get=t(r.get)),r.set&&(i.set=e(r.set)))):a[o]=r;return a}}}()}),t.register("regularjs/src/util.js",function(t,e,n){e("./helper/shim.js");var r=n.exports,i=e("./helper/entities.js"),s=[].slice,a={}.toString,o="undefined"!=typeof window?window:global;r.noop=function(){},r.uid=function(){var t=0;return function(){return t++}}(),r.varName="d",r.setName="p_",r.ctxName="c",r.extName="e",r.rWord=/^[\$\w]+$/,r.rSimpleAccessor=/^[\$\w]+(\.[\$\w]+)*$/,r.nextTick="function"==typeof setImmediate?setImmediate.bind(o):function(t){setTimeout(t,0)},r.prefix="var "+r.varName+"="+r.ctxName+".data;"+r.extName+"="+r.extName+"||'';",r.slice=function(t,e,n){for(var r=[],i=e||0,s=n||t.length;s>i;i++){var a=t[i];r.push(a)}return r},r.typeOf=function(t){return null==t?String(t):a.call(t).slice(8,-1).toLowerCase()},r.extend=function(t,e,n){if("array"===r.typeOf(n))for(var i=0,s=n.length;s>i;i++){var a=n[i];t[a]=e[a]}else for(var i in e)("undefined"==typeof t[i]||n===!0)&&(t[i]=e[i]);return t},r.makePredicate=function(t){function e(t){if(1===t.length)return n+="return str === '"+t[0]+"';";n+="switch(str){";for(var e=0;e<t.length;++e)n+="case '"+t[e]+"':";n+="return true}return false;"}"string"==typeof t&&(t=t.split(" "));var n="",r=[];t:for(var i=0;i<t.length;++i){for(var s=0;s<r.length;++s)if(r[s][0].length===t[i].length){r[s].push(t[i]);continue t}r.push([t[i]])}if(r.length>3){r.sort(function(t,e){return e.length-t.length}),n+="switch(str.length){";for(var i=0;i<r.length;++i){var a=r[i];n+="case "+a[0].length+":",e(a)}n+="}"}else e(t);return new Function("str",n)},r.trackErrorPos=function(){function t(t,e){for(var n=0,r=0,i=t.length;i>r;r++){var s=(t[r]||"").length;if(n+s>e)return{num:r,line:t[r],start:e-n};n=n+s+1}}var e=/\r\n|[\n\r\u2028\u2029]/g;return function(n,r){r>n.length-1&&(r=n.length-1),e.lastIndex=0;var i=n.split(e),s=t(i,r),a=s.line.length,o=s.start-10;0>o&&(o=0);var u=s.start+10;u>a&&(u=a);var c=s.line.slice(o,u),l=s.num+1+"> "+(o>0?"...":""),h=a>u?"...":"";return l+c+h+"\n"+new Array(s.start+l.length+1).join(" ")+"^"}}();var u=/\((\?\!|\?\:|\?\=)/g;r.findSubCapture=function(t){var e=0,n=0,r=t.length,i=t.match(u);for(i=i?i.length:0;r--;){var s=t.charAt(r);(0===r||"\\"!==t.charAt(r-1))&&("("===s&&e++,")"===s&&n++)}if(e!==n)throw"RegExp: "+t+"'s bracket is not marched";return e-i},r.escapeRegExp=function(t){return t.replace(/[-[\]{}()*+?.\\^$|,#\s]/g,function(t){return"\\"+t})};var c=new RegExp("&("+Object.keys(i).join("|")+");","gi");r.convertEntity=function(t){return(""+t).replace(c,function(t,e){return String.fromCharCode(i[e])})},r.createObject=function(t,e){function n(){}n.prototype=t;var i=new n;return e&&r.extend(i,e),i},r.createProto=function(t,e){function n(){this.constructor=t}return n.prototype=e,t.prototype=new n},r.clone=function(t){var e=r.typeOf(t);if("array"===e){for(var n=[],i=0,s=t.length;s>i;i++)n[i]=t[i];return n}if("object"===e){var n={};for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);return n}return t},r.equals=function(t,e){if(Array.isArray(t)){var n=l(t,e||[]);return n}var r=typeof t;return"number"===r&&"number"==typeof e&&isNaN(t)&&isNaN(e)?!0:t===e};var l=function(){function t(t,e){return t===e}function e(e,n){for(var r=e.length,i=n.length,s=[],a=0;r>=a;a++)s.push([a]);for(var o=1;i>=o;o++)s[0][o]=o;for(var a=1;r>=a;a++)for(var o=1;i>=o;o++)s[a][o]=t(e[a-1],n[o-1])?s[a-1][o-1]:Math.min(s[a-1][o]+1,s[a][o-1]+1);return s}function n(t,n){for(var r=e(n,t),i=n.length,s=i,a=t.length,o=a,u=[],c=r[s][o];s>0||o>0;)if(0!==s)if(0!==o){var l=r[s-1][o-1],h=r[s-1][o],f=r[s][o-1],p=Math.min(f,h,l);p===h?(u.unshift(2),s--,c=h):p===l?(l===c?u.unshift(0):(u.unshift(1),c=l),s--,o--):(u.unshift(3),o--,c=f)}else u.unshift(2),s--;else u.unshift(3),o--;var d=0,v=3,m=2,g=1,i=0;a=0;for(var y=[],x={index:null,add:0,removed:[]},s=0;s<u.length;s++)switch(u[s]>0?null===x.index&&(x.index=a):null!=x.index&&(y.push(x),x={index:null,add:0,removed:[]}),u[s]){case d:i++,a++;break;case v:x.add++,a++;break;case m:x.removed.push(n[i]),i++;break;case g:x.add++,x.removed.push(n[i]),i++,a++}return null!=x.index&&y.push(x),y}return n}();r.throttle=function(t,e){var n,r,i,e=e||100,s=null,a=0,o=function(){a=+new Date,s=null,i=t.apply(n,r),n=r=null};return function(){var u=+new Date,c=e-(u-a);return n=this,r=arguments,0>=c||c>e?(clearTimeout(s),s=null,a=u,i=t.apply(n,r),n=r=null):s||(s=setTimeout(o,c)),i}},r.escape=function(){var t=/&/g,e=/</g,n=/>/g,r=/\'/g,i=/\"/g,s=/[&<>\"\']/;return function(a){return s.test(a)?a.replace(t,"&amp;").replace(e,"&lt;").replace(n,"&gt;").replace(r,"&#39;").replace(i,"&quot;"):a}}(),r.cache=function(t){t=t||1e3;var e=[],n={};return{set:function(t,r){return e.length>this.max&&(n[e.shift()]=void 0),void 0===n[t]&&e.push(t),n[t]=r,r},get:function(t){return void 0===t?n:n[t]},max:t,len:function(){return e.length}}},r.handleEvent=function(t){var e,n=this;return"expression"===t.type&&(e=t.get),e?function(t){n.data.$event=t;var r=e(n);r===!1&&t&&t.preventDefault&&t.preventDefault(),n.data.$event=void 0,n.$update()}:function(){var e=s.call(arguments);e.unshift(t),n.$emit.apply(n,e),n.$update()}},r.once=function(t){var e=0;return function(){0===e++&&t.apply(this,arguments)}},r.log=function(t,e){"undefined"!=typeof console&&console[e||"log"](t)},r.isVoidTag=r.makePredicate("area base br col embed hr img input keygen link menuitem meta param source track wbr r-content"),r.isBooleanAttr=r.makePredicate("selected checked disabled readOnly required open autofocus controls autoplay compact loop defer multiple"),r.isFalse-function(){return!1},r.isTrue-function(){return!0},r.assert=function(t,e){if(!t)throw e}}),t.register("regularjs/src/walkers.js",function(t,e,n){function r(t,e){for(var n=[],r=0,i=t.length;i>r;r++){var s=this._walk(t[r],{element:e,fromElement:!0,attrs:t});s&&n.push(s)}return n}var i=(e("./parser/node.js"),e("./dom.js")),s=e("./helper/animate.js"),a=e("./group.js"),o=e("./util"),u=e("./helper/combine.js"),c=n.exports={};c.list=function(t,e){function n(n,r){if(n||(n=[],r=o.equals(n,r)),r&&r.length){for(var a=0,c=n.length,v=(r[0].index,0);v<r.length;v++){for(var m=r[v],g=m.index,y=a;g>y;y++){var x=f.get(y+1);x.data[p]=y}for(var E=0,_=m.removed.length;_>E;E++){var N=f.children.splice(g+1,1)[0];N.destroy(!0)}for(var T=g;T<g+m.add;T++){var w=n[T],j={};j[p]=T,j[d]=w,o.extend(j,l);var b=h.$compile(t.body,{extra:j,namespace:i,record:!0,outer:e.outer});b.data=j;var $=u.last(f.get(T));$.parentNode&&s.inject(u.node(b),$,"after"),f.children.splice(T+1,0,b)}a=g+m.add-m.removed.length,a=0>a?0:a}if(c>a)for(var v=a;c>v;v++){var A=f.get(v+1);A.data[p]=v}}}var r=(c.Regular,document.createComment("Regular list")),i=e.namespace,l=e.extra,h=this,f=new a;f.push(r);var p=t.variable+"_index",d=t.variable;return this.$watch(t.sequence,n,{init:!0}),f},c.template=function(t,e){var n,n,r=t.content,i=document.createComment("inlcude"),o=e.namespace,c=e.extra,l=new a;if(l.push(i),r){var h=this;this.$watch(r,function(t){(n=l.get(1))&&(n.destroy(!0),l.children.pop()),l.push(n=h.$compile(t,{record:!0,outer:e.outer,namespace:o,extra:c})),i.parentNode&&s.inject(u.node(n),i,"before")},{init:!0})}return l};var l=0;c["if"]=function(t,e){var n,r,i=this,o=e.extra;if(e&&e.element){var c=function(s){s?(r&&u.destroy(r),t.consequent&&(n=i.$compile(t.consequent,{record:!0,element:e.element,extra:o}))):(n&&u.destroy(n),t.alternate&&(r=i.$compile(t.alternate,{record:!0,element:e.element,extra:o})))};return this.$watch(t.test,c,{force:!0}),{destroy:function(){n?u.destroy(n):r&&u.destroy(r)}}}var n,r,h=document.createComment("Regular if"+l++),f=new a;f.push(h);var p=null,d=e.namespace,c=function(a){var c=!!a;c!==p&&(p=c,f.children[1]&&(f.children[1].destroy(!0),f.children.pop()),c?t.consequent&&t.consequent.length&&(n=i.$compile(t.consequent,{record:!0,outer:e.outer,namespace:d,extra:o}),f.push(n),h.parentNode&&s.inject(u.node(n),h,"before")):t.alternate&&t.alternate.length&&(r=i.$compile(t.alternate,{record:!0,outer:e.outer,namespace:d,extra:o}),f.push(r),h.parentNode&&s.inject(u.node(r),h,"before")))};return this.$watch(t.test,c,{force:!0,init:!0}),f},c.expression=function(t){var e=document.createTextNode("");return this.$watch(t,function(t){i.text(e,""+(null==t?"":""+t))}),e},c.text=function(t){var e=document.createTextNode(o.convertEntity(t.text));return e};var h=/^on-(.+)$/;c.element=function(t,e){var n,a,c,l=t.attrs,f=this,p=this.constructor,d=t.children,v=e.namespace,m=e.extra,g=0,y=p.component(t.tag);if("svg"===t.tag&&(v="svg"),y){for(var x,E={},_=0,N=l.length;N>_;_++){var T=l[_],w=this._touchExpr(T.value||""),j=T.name,b=j.match(h);b?(x=x||{},x[b[1]]=o.handleEvent.call(this,w,b[1])):(E[T.name]="expression"!==w.type?w:w.get(f),"ref"===T.name&&null!=w&&(a="expression"===w.type?w.get(f):w),"isolate"===T.name&&(g="expression"===w.type?w.get(f):parseInt(w||3,10),E.isolate=g))}var $={data:E,events:x,$parent:this,$outer:e.outer,namespace:v,$root:this.$root,$body:t.children},n=new y($);a&&f.$refs&&(f.$refs[a]=n);for(var _=0,N=l.length;N>_;_++){var T=l[_],w=T.value||"";"expression"===w.type&&-1===T.name.indexOf("on-")&&(w=f._touchExpr(w),2&g||this.$watch(w,n.$update.bind(n,T.name)),!w.set||1&g||n.$watch(T.name,f.$update.bind(f,w),{sync:!0}))}return a&&n.$on("destroy",function(){f.$refs&&(f.$refs[a]=null)}),n}if("r-content"===t.tag&&this._getTransclude)return this._getTransclude();d&&d.length&&(c=this.$compile(d,{outer:e.outer,namespace:v,extra:m}));var A=i.create(t.tag,v,l);c&&!o.isVoidTag(t.tag)&&i.inject(u.node(c),A),l.sort(function(t,e){var n=p.directive(t.name),r=p.directive(e.name);return n&&r?(r.priority||1)-(n.priority||1):n?1:r?-1:"type"===e.name?1:-1});var S=r.call(this,l,A,S),O={type:"element",group:c,node:function(){return A},last:function(){return A},destroy:function(t){t?s.remove(A,c?c.destroy.bind(c):o.noop):c&&c.destroy(),S.length&&S.forEach(function(t){t&&("function"==typeof t.destroy?t.destroy():t())})}};return O},c.attribute=function(t,e){var n=t,r=this.constructor,s=this,a=e.element,u=n.name,c=n.value||"",l=r.directive(u);if(c=this._touchExpr(c),l&&l.link){var h=l.link.call(s,a,c,u,e.attrs);return"function"==typeof h&&(h={destroy:h}),h}if("ref"===u&&null!=c&&e.fromElement){var f="expression"===c.type?c.get(s):c,p=this.$refs;if(p)return p[f]=a,{destroy:function(){p[f]=null}}}return"expression"===c.type?this.$watch(c,function(t){i.attr(a,u,t)},{init:!0}):o.isBooleanAttr(u)?i.attr(a,u,!0):i.attr(a,u,c),e.fromElement?void 0:{destroy:function(){i.attr(a,u,null)}}}}),t.register("regularjs/src/env.js",function(t,e){var n=e("./util");t.svg=function(){return"undefined"!=typeof document&&document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure","1.1")}(),t.browser="undefined"!=typeof document&&document.nodeType,t.exprCache=n.cache(1e3),t.isRunning=!1}),t.register("regularjs/src/index.js",function(t,e,n){var r=e("./env.js"),i=e("./config"),s=n.exports=e("./Regular.js"),a=s.Parser,o=s.Lexer;r.browser&&(e("./directive/base.js"),e("./directive/animation.js"),e("./module/timeout.js"),s.dom=e("./dom.js")),s.env=r,s.util=e("./util.js"),s.parse=function(t,e){e=e||{},(e.BEGIN||e.END)&&(e.BEGIN&&(i.BEGIN=e.BEGIN),e.END&&(i.END=e.END),o.setup());var n=new a(t).parse();return e.stringify?JSON.stringify(n):n}}),t.register("regularjs/src/dom.js",function(t,e,n){function r(t){return(""+t).replace(/-\D/g,function(t){return t.charAt(1).toUpperCase()})}function i(t,e){return"change"===e&&u.msie<9&&t&&t.tagName&&"input"===t.tagName.toLowerCase()&&("checkbox"===t.type||"radio"===t.type)?"click":e}function s(t){if(t=t||window.event,t._fixed)return t;this.event=t,this.target=t.target||t.srcElement;var e=this.type=t.type,n=this.button=t.button;if(v.test(e)&&(this.pageX=null!=t.pageX?t.pageX:t.clientX+m.scrollLeft,this.pageY=null!=t.pageX?t.pageY:t.clientY+m.scrollTop,"mouseover"===e||"mouseout"===e)){for(var r=t.relatedTarget||t[("mouseover"===e?"from":"to")+"Element"];r&&3===r.nodeType;)r=r.parentNode;this.relatedTarget=r}("DOMMouseScroll"===e||"mousewheel"===e)&&(this.wheelDelta=t.wheelDelta?t.wheelDelta/120:-(t.detail||0)/3),this.which=t.which||t.keyCode,this.which||void 0===n||(this.which=1&n?1:2&n?3:4&n?2:0),this._fixed=!0}var a,o,u=n.exports,c=e("./env.js"),l=e("./util"),h=document.createElement("div"),f=function(){},p={html:"http://www.w3.org/1999/xhtml",svg:"http://www.w3.org/2000/svg"};u.body=document.body,u.doc=document,u.tNode=h,h.addEventListener?(a=function(t,e,n){t.addEventListener(e,n,!1)},o=function(t,e,n){t.removeEventListener(e,n,!1)}):(a=function(t,e,n){t.attachEvent("on"+e,n)},o=function(t,e,n){t.detachEvent("on"+e,n)}),u.msie=parseInt((/msie (\d+)/.exec(navigator.userAgent.toLowerCase())||[])[1]),isNaN(u.msie)&&(u.msie=parseInt((/trident\/.*; rv:(\d+)/.exec(navigator.userAgent.toLowerCase())||[])[1])),u.find=function(t){if(document.querySelector)try{return document.querySelector(t)}catch(e){}return-1!==t.indexOf("#")?document.getElementById(t.slice(1)):void 0},u.inject=function(t,e,n){if(n=n||"bottom",Array.isArray(t)){var r=t;t=u.fragment();for(var i=0,s=r.length;s>i;i++)t.appendChild(r[i])}var a,o;switch(n){case"bottom":e.appendChild(t);break;case"top":(a=e.firstChild)?e.insertBefore(t,e.firstChild):e.appendChild(t);break;case"after":(o=e.nextSibling)?o.parentNode.insertBefore(t,o):e.parentNode.appendChild(t);break;case"before":e.parentNode.insertBefore(t,e)}},u.id=function(t){return document.getElementById(t)},u.create=function(t,e){if("svg"===e){if(!c.svg)throw Error("the env need svg support");e=p.svg}return e?document.createElementNS(e,t):document.createElement(t)},u.fragment=function(){return document.createDocumentFragment()};var d={"class":function(t,e){"className"in t&&(t.namespaceURI===p.html||!t.namespaceURI)?t.className=e||"":t.setAttribute("class",e)},"for":function(t,e){"htmlFor"in t?t.htmlFor=e:t.setAttribute("for",e)},style:function(t,e){t.style?t.style.cssText=e:t.setAttribute("style",e)},value:function(t,e){t.value=null!=e?e:""}};u.attr=function(t,e,n){if(l.isBooleanAttr(e)){if("undefined"==typeof n)return t[e]||(t.attributes.getNamedItem(e)||f).specified?e:void 0;n?(t[e]=!0,t.setAttribute(e,e),u.msie&&u.msie<=7&&(t.defaultChecked=!0)):(t[e]=!1,t.removeAttribute(e))}else if("undefined"!=typeof n)d[e]?d[e](t,n):null===n?t.removeAttribute(e):t.setAttribute(e,n);else if(t.getAttribute){var r=t.getAttribute(e,2);return null===r?void 0:r}},u.on=function(t,e,n){var r=e.split(" ");n.real=function(e){var r=new s(e);r.origin=t,n.call(t,r)},r.forEach(function(e){e=i(t,e),a(t,e,n.real)})},u.off=function(t,e,n){var r=e.split(" ");n=n.real||n,r.forEach(function(e){e=i(t,e),o(t,e,n)})},u.text=function(){var t={};return u.msie&&u.msie<9?(t[1]="innerText",t[3]="nodeValue"):t[1]=t[3]="textContent",function(e,n){var r=t[e.nodeType];return null==n?r?e[r]:"":void(e[r]=n)}}(),u.html=function(t,e){return"undefined"==typeof e?t.innerHTML:void(t.innerHTML=e)},u.replace=function(t,e){e.parentNode&&e.parentNode.replaceChild(t,e)},u.remove=function(t){t.parentNode&&t.parentNode.removeChild(t)},u.css=function(t,e,n){if("object"!==l.typeOf(e)){if("undefined"==typeof n){var i;return u.msie<=8&&(i=t.currentStyle&&t.currentStyle[e],""===i&&(i="auto")),i=i||t.style[e],u.msie<=8&&(i=""===i?void 0:i),i}e=r(e),e&&(t.style[e]=n)}else for(var s in e)e.hasOwnProperty(s)&&u.css(t,s,e[s])},u.addClass=function(t,e){var n=t.className||"";-1===(" "+n+" ").indexOf(" "+e+" ")&&(t.className=n?n+" "+e:e)},u.delClass=function(t,e){var n=t.className||"";t.className=(" "+n+" ").replace(" "+e+" "," ").trim()},u.hasClass=function(t,e){var n=t.className||"";return-1!==(" "+n+" ").indexOf(" "+e+" ")};var v=/^(?:click|dblclick|contextmenu|DOMMouseScroll|mouse(?:\w+))$/,m=document;m=m.compatMode&&"CSS1Compat"!==m.compatMode?m.body:m.documentElement,l.extend(s.prototype,{immediateStop:l.isFalse,stop:function(){this.preventDefault().stopPropagation()},preventDefault:function(){return this.event.preventDefault?this.event.preventDefault():this.event.returnValue=!1,this},stopPropagation:function(){return this.event.stopPropagation?this.event.stopPropagation():this.event.cancelBubble=!0,this},stopImmediatePropagation:function(){this.event.stopImmediatePropagation&&this.event.stopImmediatePropagation()}}),u.nextFrame=function(){var t=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){setTimeout(t,16)},e=window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.webkitCancelRequestAnimationFrame||function(t){clearTimeout(t)};return function(n){var r=t(n);return function(){e(r)}}}();var g;u.nextReflow=function(t){u.nextFrame(function(){g=document.body.offsetWidth,t()})}}),t.register("regularjs/src/group.js",function(t,e,n){function r(t){this.children=t||[]}var i=e("./util"),s=e("./helper/combine");i.extend(r.prototype,{destroy:function(t){s.destroy(this.children,t),this.ondestroy&&this.ondestroy(),this.children=null},get:function(t){return this.children[t]},push:function(t){this.children.push(t)}}),n.exports=r}),t.register("regularjs/src/config.js",function(t,e,n){n.exports={BEGIN:"{",END:"}"}}),t.register("regularjs/src/parser/Lexer.js",function(t,e,n){function r(t){return function(e){return{type:t,value:e}}}function i(t,e){h[l.END]&&(this.markStart=h[l.END],this.markEnd=l.END),this.input=(t||"").trim(),this.opts=e||{},this.map=2!==this.opts.mode?o:u,this.states=["INIT"],e&&e.expression&&(this.states.push("JST"),this.expression=!0)}function s(t){for(var e,n,r={},i=0,s=t.length;s>i;i++)e=t[i],n=e[2]||"INIT",(r[n]||(r[n]={rules:[],links:[]})).rules.push(e);return a(r)}function a(t){function e(t,e){return"string"==typeof f[e]?c.escapeRegExp(f[e]):String(f[e]).slice(1,-1)}var n,i,s,a,o,u,l;for(var h in t){n=t[h],n.curIndex=1,i=n.rules,s=[];for(var p=0,d=i.length;d>p;p++)l=i[p],o=l[0],a=l[1],"string"==typeof a&&(a=r(a)),"regexp"===c.typeOf(o)&&(o=o.toString().slice(1,-1)),o=o.replace(/\{(\w+)\}/g,e),u=c.findSubCapture(o)+1,n.links.push([n.curIndex,u,a]),n.curIndex+=u,s.push(o);n.TRUNK=new RegExp("^(?:("+s.join(")|(")+"))")}return t}var o,u,c=e("../util.js"),l=e("../config.js"),h={"}":"{","]":"["},f={NAME:/(?:[:_A-Za-z][-\.:_0-9A-Za-z]*)/,IDENT:/[\$_A-Za-z][_0-9A-Za-z\$]*/,SPACE:/[\r\n\f ]/},p=/a|(b)/.exec("a"),d=p&&void 0===p[1]?function(t){return void 0!==t}:function(t){return!!t},v=i.prototype;v.lex=function(t){t=(t||this.input).trim();var e,n,r,i,s,a=[];this.input=t,this.marks=0,this.index=0;for(var o=0;t;)o++,s=this.state(),e=this.map[s],n=e.TRUNK.exec(t),n||this.error("Unrecoginized Token"),r=n[0].length,t=t.slice(r),i=this._process.call(this,n,e,t),i&&a.push(i),this.index+=r;return a.push({type:"EOF"}),a},v.error=function(t){throw"Parse Error: "+t+":\n"+c.trackErrorPos(this.input,this.index)},v._process=function(t,e,n){for(var r,i=e.links,s=!1,a=i.length,o=0;a>o;o++){var u=i[o],c=u[2],l=u[0];if(d(t[l])){s=!0,c&&(r=c.apply(this,t.slice(l,l+u[1])),r&&(r.pos=this.index));break}}if(!s)switch(n.charAt(0)){case"<":this.enter("TAG");break;default:this.enter("JST")}return r},v.enter=function(t){return this.states.push(t),this},v.state=function(){var t=this.states;return t[t.length-1]},v.leave=function(t){var e=this.states;t&&e[e.length-1]!==t||e.pop()},i.setup=function(){f.END=l.END,f.BEGIN=l.BEGIN,o=s([m.ENTER_JST,m.ENTER_TAG,m.TEXT,m.TAG_NAME,m.TAG_OPEN,m.TAG_CLOSE,m.TAG_PUNCHOR,m.TAG_ENTER_JST,m.TAG_UNQ_VALUE,m.TAG_STRING,m.TAG_SPACE,m.TAG_COMMENT,m.JST_OPEN,m.JST_CLOSE,m.JST_COMMENT,m.JST_EXPR_OPEN,m.JST_IDENT,m.JST_SPACE,m.JST_LEAVE,m.JST_NUMBER,m.JST_PUNCHOR,m.JST_STRING,m.JST_COMMENT]),u=s([m.ENTER_JST2,m.TEXT,m.JST_COMMENT,m.JST_OPEN,m.JST_CLOSE,m.JST_EXPR_OPEN,m.JST_IDENT,m.JST_SPACE,m.JST_LEAVE,m.JST_NUMBER,m.JST_PUNCHOR,m.JST_STRING,m.JST_COMMENT])};var m={ENTER_JST:[/[^\x00<]*?(?={BEGIN})/,function(t){return this.enter("JST"),t?{type:"TEXT",value:t}:void 0}],ENTER_JST2:[/[^\x00]*?(?={BEGIN})/,function(t){return this.enter("JST"),t?{type:"TEXT",value:t}:void 0}],ENTER_TAG:[/[^\x00<>]*?(?=<)/,function(t){return this.enter("TAG"),t?{type:"TEXT",value:t}:void 0}],TEXT:[/[^\x00]+/,"TEXT"],TAG_NAME:[/{NAME}/,"NAME","TAG"],TAG_UNQ_VALUE:[/[^\{}&"'=><`\r\n\f ]+/,"UNQ","TAG"],TAG_OPEN:[/<({NAME})\s*/,function(t,e){return{type:"TAG_OPEN",value:e}},"TAG"],TAG_CLOSE:[/<\/({NAME})[\r\n\f ]*>/,function(t,e){return this.leave(),{type:"TAG_CLOSE",value:e}},"TAG"],TAG_ENTER_JST:[/(?={BEGIN})/,function(){this.enter("JST")},"TAG"],TAG_PUNCHOR:[/[\>\/=&]/,function(t){return">"===t&&this.leave(),{type:t,value:t}},"TAG"],TAG_STRING:[/'([^']*)'|"([^"]*)"/,function(t,e,n){var r=e||n||"";return{type:"STRING",value:r}},"TAG"],TAG_SPACE:[/{SPACE}+/,null,"TAG"],TAG_COMMENT:[/<\!--([^\x00]*?)--\>/,null,"TAG"],JST_OPEN:["{BEGIN}#{SPACE}*({IDENT})",function(t,e){return{type:"OPEN",value:e}},"JST"],JST_LEAVE:[/{END}/,function(t){return this.markEnd===t&&this.expression?{type:this.markEnd,value:this.markEnd}:this.markEnd&&this.marks?(this.marks--,{type:this.markEnd,value:this.markEnd}):(this.firstEnterStart=!1,this.leave("JST"),{type:"END"})},"JST"],JST_CLOSE:[/{BEGIN}\s*\/({IDENT})\s*{END}/,function(t,e){return this.leave("JST"),{type:"CLOSE",value:e}},"JST"],JST_COMMENT:[/{BEGIN}\!([^\x00]*?)\!{END}/,function(){this.leave()},"JST"],JST_EXPR_OPEN:["{BEGIN}",function(t){if(t===this.markStart){if(this.expression)return{type:this.markStart,value:this.markStart};if(this.firstEnterStart||this.marks)return this.marks++,this.firstEnterStart=!1,{type:this.markStart,value:this.markStart};this.firstEnterStart=!0}return{type:"EXPR_OPEN",escape:!1}},"JST"],JST_IDENT:["{IDENT}","IDENT","JST"],JST_SPACE:[/[ \r\n\f]+/,null,"JST"],JST_PUNCHOR:[/[=!]?==|[-=><+*\/%\!]?\=|\|\||&&|\@\(|\.\.|[<\>\[\]\(\)\-\|\{}\+\*\/%?:\.!,]/,function(t){return{type:t,value:t}},"JST"],JST_STRING:[/'([^']*)'|"([^"]*)"/,function(t,e,n){return{type:"STRING",value:e||n||""}},"JST"],JST_NUMBER:[/(?:[0-9]*\.[0-9]+|[0-9]+)(e\d+)?/,function(t){return{type:"NUMBER",value:parseFloat(t,10)}},"JST"]};i.setup(),n.exports=i}),t.register("regularjs/src/parser/node.js",function(t,e,n){n.exports={element:function(t,e,n){return{type:"element",tag:t,attrs:e,children:n}},attribute:function(t,e){return{type:"attribute",name:t,value:e}},"if":function(t,e,n){return{type:"if",test:t,consequent:e,alternate:n}},list:function(t,e,n){return{type:"list",sequence:t,variable:e,body:n}},expression:function(t,e,n){return{type:"expression",body:t,constant:n||!1,setbody:e||!1}},text:function(t){return{type:"text",text:t}},template:function(t){return{type:"template",content:t}}}}),t.register("regularjs/src/parser/Parser.js",function(t,e,n){function r(t,e){e=e||{},this.input=t,this.tokens=new o(t,e).lex(),this.pos=0,this.noComputed=e.noComputed,this.length=this.tokens.length}var i=e("../util.js"),s=e("../config.js"),a=e("./node.js"),o=e("./Lexer.js"),u=i.varName,c=i.ctxName,l=i.extName,h=i.makePredicate("STRING IDENT NUMBER"),f=i.makePredicate("true false undefined null this Array Date JSON Math NaN RegExp decodeURI decodeURIComponent encodeURI encodeURIComponent parseFloat parseInt Object"),p=r.prototype;p.parse=function(){this.pos=0;var t=this.program();return"TAG_CLOSE"===this.ll().type&&this.error("You may got a unclosed Tag"),t
	},p.ll=function(t){t=t||1,0>t&&(t+=1);var e=this.pos+t-1;return e>this.length-1?this.tokens[this.length-1]:this.tokens[e]},p.la=function(t){return(this.ll(t)||"").type},p.match=function(t,e){var n;return(n=this.eat(t,e))?n:(n=this.ll(),void this.error("expect ["+t+(null==e?"":":"+e)+']" -> got "['+n.type+(null==e?"":":"+n.value)+"]",n.pos))},p.error=function(t,e){throw t="Parse Error: "+t+":\n"+i.trackErrorPos(this.input,"number"==typeof e?e:this.ll().pos||0),new Error(t)},p.next=function(t){t=t||1,this.pos+=t},p.eat=function(t,e){var n=this.ll();if("string"!=typeof t){for(var r=t.length;r--;)if(n.type===t[r])return this.next(),n}else if(n.type===t&&("undefined"==typeof e||n.value===e))return this.next(),n;return!1},p.program=function(){for(var t=[],e=this.ll();"EOF"!==e.type&&"TAG_CLOSE"!==e.type;)t.push(this.statement()),e=this.ll();return t},p.statement=function(){var t=this.ll();switch(t.type){case"NAME":case"TEXT":var e=t.value;for(this.next();t=this.eat(["NAME","TEXT"]);)e+=t.value;return a.text(e);case"TAG_OPEN":return this.xml();case"OPEN":return this.directive();case"EXPR_OPEN":return this.interplation();case"PART_OPEN":return this.template();default:this.error("Unexpected token: "+this.la())}},p.xml=function(){var t,e,n,r;return t=this.match("TAG_OPEN").value,e=this.attrs(),r=this.eat("/"),this.match(">"),r||i.isVoidTag(t)||(n=this.program(),this.eat("TAG_CLOSE",t)||this.error("expect </"+t+"> gotno matched closeTag")),a.element(t,e,n)},p.xentity=function(t){var e,n=t.value;return"NAME"===t.type?(this.eat("=")&&(e=this.attvalue()),a.attribute(n,e)):("if"!==n&&this.error("current version. ONLY RULE #if #else #elseif is valid in tag, the rule #"+n+" is invalid"),this["if"](!0))},p.attrs=function(t){var e;e=t?["NAME"]:["NAME","OPEN"];for(var n,r=[];n=this.eat(e);)r.push(this.xentity(n));return r},p.attvalue=function(){var t=this.ll();switch(t.type){case"NAME":case"UNQ":case"STRING":this.next();var e=t.value;if(~e.indexOf(s.BEGIN)&&~e.indexOf(s.END)){var n=!0,i=new r(e,{mode:2}).parse();if(1===i.length&&"expression"===i[0].type)return i[0];var o=[];i.forEach(function(t){t.constant||(n=!1),o.push(t.body||"'"+t.text.replace(/'/g,"\\'")+"'")}),o="["+o.join(",")+"].join('')",e=a.expression(o,null,n)}return e;case"EXPR_OPEN":return this.interplation();default:this.error("Unexpected token: "+this.la())}},p.directive=function(){var t=this.ll().value;return this.next(),"function"==typeof this[t]?this[t]():void this.error("Undefined directive["+t+"]")},p.interplation=function(){this.match("EXPR_OPEN");var t=this.expression(!0);return this.match("END"),t},p.include=function(){var t=this.expression();return this.match("END"),a.template(t)},p["if"]=function(t){var e=this.expression(),n=[],r=[],i=n,s=t?"attrs":"statement";this.match("END");for(var o,u;!(u=this.eat("CLOSE"));)if(o=this.ll(),"OPEN"===o.type)switch(o.value){case"else":i=r,this.next(),this.match("END");break;case"elseif":return this.next(),r.push(this["if"](t)),a["if"](e,n,r);default:i.push(this[s](!0))}else i.push(this[s](!0));return"if"!==u.value&&this.error("Unmatched if directive"),a["if"](e,n,r)},p.list=function(){var t,e,n=this.expression(),r=[],i=[],s=r;for(this.match("IDENT","as"),t=this.match("IDENT").value,this.match("END");!(e=this.eat("CLOSE"));)this.eat("OPEN","else")?(s=i,this.match("END")):s.push(this.statement());return"list"!==e.value&&this.error("expect list got /"+e.value+" ",e.pos),a.list(n,t,r,i)},p.expression=function(){var t;return this.eat("@(")?(t=this.expr(),t.once=!0,this.match(")")):t=this.expr(),t},p.expr=function(){this.depend=[];var t=this.filter(),e=t.get||t,n=t.set;return a.expression(e,n,!this.depend.length)},p.filter=function(){var t,e,n,r=this.assign(),s=this.eat("|"),a=[],o="t",u=r.set,l="";if(s){u&&(t=[]),e="(function("+o+"){";do l=o+" = "+c+"._f_('"+this.match("IDENT").value+"' ).get.call( "+i.ctxName+","+o,l+=this.eat(":")?", "+this.arguments("|").join(",")+");":");",a.push(l),t&&t.unshift(l.replace(" ).get.call"," ).set.call"));while(s=this.eat("|"));return a.push("return "+o),t&&t.push("return "+o),n=e+a.join("")+"})("+r.get+")",t&&(u=u.replace(i.setName,e+t.join("")+"})("+i.setName+")")),this.getset(n,u)}return r},p.assign=function(){var t,e=this.condition();return(t=this.eat(["=","+=","-=","*=","/=","%="]))?(e.set||this.error("invalid lefthand expression in assignment expression"),this.getset(e.set.replace(","+i.setName,","+this.condition().get).replace("'='","'"+t.type+"'"),e.set)):e},p.condition=function(){var t=this.or();return this.eat("?")?this.getset([t.get+"?",this.assign().get,this.match(":").type,this.assign().get].join("")):t},p.or=function(){var t=this.and();return this.eat("||")?this.getset(t.get+"||"+this.or().get):t},p.and=function(){var t=this.equal();return this.eat("&&")?this.getset(t.get+"&&"+this.and().get):t},p.equal=function(){var t,e=this.relation();return(t=this.eat(["==","!=","===","!=="]))?this.getset(e.get+t.type+this.equal().get):e},p.relation=function(){var t,e=this.additive();return(t=this.eat(["<",">",">=","<="])||this.eat("IDENT","in"))?this.getset(e.get+t.value+this.relation().get):e},p.additive=function(){var t,e=this.multive();return(t=this.eat(["+","-"]))?this.getset(e.get+t.value+this.additive().get):e},p.multive=function(){var t,e=this.range();return(t=this.eat(["*","/","%"]))?this.getset(e.get+t.type+this.multive().get):e},p.range=function(){var t,e,n=this.unary();if(t=this.eat("..")){e=this.unary();var r="(function(start,end){var res = [],step=end>start?1:-1; for(var i = start; end>start?i <= end: i>=end; i=i+step){res.push(i); } return res })("+n.get+","+e.get+")";return this.getset(r)}return n},p.unary=function(){var t;return(t=this.eat(["+","-","~","!"]))?this.getset("("+t.type+this.unary().get+")"):this.member()},p.member=function(t,e,n,r){var s,a,o,f=!1;if(t)"string"==typeof e&&h(e)?n.push(e):(n&&n.length&&this.depend.push(n),n=null);else{a=this.primary();var p=typeof a;"string"===p?(n=[],n.push(a),e=a,o=l+"."+a,t=c+"._sg_('"+a+"', "+u+", "+l+")",f=!0):"this"===a.get?(t=c,n=["this"]):(n=null,t=a.get)}if(s=this.eat(["[",".","("]))switch(s.type){case".":var d=this.match("IDENT").value;return r=t,"("!==this.la()?t=c+"._sg_('"+d+"', "+t+")":t+="['"+d+"']",this.member(t,d,n,r);case"[":return a=this.assign(),r=t,"("!==this.la()?t=c+"._sg_("+a.get+", "+t+")":t+="["+a.get+"]",this.match("]"),this.member(t,a,n,r);case"(":var v=this.arguments().join(",");return t=t+"("+v+")",this.match(")"),this.member(t,null,n)}n&&n.length&&this.depend.push(n);var m={get:t};return e&&(m.set=c+"._ss_("+(e.get?e.get:"'"+e+"'")+","+i.setName+","+(r?r:i.varName)+", '=', "+(f?1:0)+")"),m},p.arguments=function(t){t=t||")";var e=[];do this.la()!==t&&e.push(this.assign().get);while(this.eat(","));return e},p.primary=function(){var t=this.ll();switch(t.type){case"{":return this.object();case"[":return this.array();case"(":return this.paren();case"STRING":return this.next(),this.getset("'"+t.value+"'");case"NUMBER":return this.next(),this.getset(""+t.value);case"IDENT":return this.next(),f(t.value)?this.getset(t.value):t.value;default:this.error("Unexpected Token: "+t.type)}},p.object=function(){for(var t=[this.match("{").type],e=this.eat(["STRING","IDENT","NUMBER"]);e;){t.push("'"+e.value+"'"+this.match(":").type);var n=this.assign().get;t.push(n),e=null,this.eat(",")&&(e=this.eat(["STRING","IDENT","NUMBER"]))&&t.push(",")}return t.push(this.match("}").type),{get:t.join("")}},p.array=function(){var t,e=[this.match("[").type];if(this.eat("]"))e.push("]");else{for(;(t=this.assign())&&(e.push(t.get),this.eat(","));)e.push(",");e.push(this.match("]").type)}return{get:e.join("")}},p.paren=function(){this.match("(");var t=this.filter();return t.get="("+t.get+")",this.match(")"),t},p.getset=function(t,e){return{get:t,set:e}},n.exports=r}),t.register("regularjs/src/helper/extend.js",function(t,e,n){function r(t,e,n){return function(){var r=this.supr;this.supr=n[t];var i=e.apply(this,arguments);return this.supr=r,i}}function i(t,e,n){for(var i in e)e.hasOwnProperty(i)&&(t[i]=o(e[i])&&o(n[i])&&a.test(e[i])?r(i,e[i],n):e[i])}var s=e("../util.js"),a=/xy/.test(function(){"xy"})?/\bsupr\b/:/.*/,o=function(t){return"function"==typeof t},u=["events","data","computed"],c=u.length;n.exports=function l(t){function e(){a.apply(this,arguments)}function n(t){for(var e=c;e--;){var n=u[e];t.hasOwnProperty(n)&&r.hasOwnProperty(n)&&(s.extend(r[n],t[n],!0),delete t[n])}return i(r,t,o),this}t=t||{};var r,a=this,o=a&&a.prototype||{};return"function"==typeof t?(r=t.prototype,t.implement=n,t.extend=l,t):(r=s.createProto(e,o),e.implement=n,e.implement(t),a.__after__&&a.__after__.call(e,a,t),e.extend=l,e)}}),t.register("regularjs/src/helper/shim.js",function(){function t(t,e){for(var n in e)void 0===t[n]&&(t[n]=e[n])}var e=[].slice,n={}.toString;t(String.prototype,{trim:function(){return this.replace(/^\s+|\s+$/g,"")}}),t(Array.prototype,{indexOf:function(t,e){e=e||0;for(var n=e,r=this.length;r>n;n++)if(this[n]===t)return n;return-1},forEach:function(t,e){for(var n=0,r=this.length;r>n;n++)t.call(e,this[n],n,this)},filter:function(t,e){for(var n=[],r=0,i=this.length;i>r;r++){var s=t.call(e,this[r],r,this);s&&n.push(this[r])}return n},map:function(t,e){for(var n=[],r=0,i=this.length;i>r;r++)n.push(t.call(e,this[r],r,this));return n}}),t(Function.prototype,{bind:function(t){var n=this,r=e.call(arguments,1);return function(){var i=r.concat(e.call(arguments));return n.apply(t,i)}}}),t(Object,{keys:function(t){var e=[];for(var n in t)t.hasOwnProperty(n)&&e.push(n);return e}}),t(Date,{now:function(){return+new Date}}),t(Array,{isArray:function(t){return"[object Array]"===n.call(t)}})}),t.register("regularjs/src/helper/parse.js",function(t,e,n){var r=e("../env").exprCache,i=(e("../util"),e("../parser/Parser.js"));n.exports={expression:function(t){return"string"==typeof t&&(t=t.trim())&&(t=r.get(t)||r.set(t,new i(t,{mode:2,expression:!0}).expression())),t?t:void 0},parse:function(t){return new i(t).parse()}}}),t.register("regularjs/src/helper/watcher.js",function(t,e,n){function r(){}var i=e("../util.js"),s=e("./parse.js").expression,a={$watch:function(t,e,n){var r,a,o,u,c=this.__ext__;this._watchers||(this._watchers=[]),n=n||{},n===!0&&(n={deep:!0});var l=i.uid("w_");if(Array.isArray(t)){for(var h=[],f=0,p=t.length;p>f;f++)h.push(this.$expression(t[f]).get);var d=[];o=function(t){for(var e=!0,n=0,r=h.length;r>n;n++){var s=h[n](t,c);i.equals(s,d[n])||(e=!1,d[n]=i.clone(s))}return e?!1:d}}else t=this._touchExpr(s(t)),r=t.get,a=t.once;var v={id:l,get:r,fn:e,once:a,force:n.force,test:o,deep:n.deep,last:n.sync?r(this):void 0};return this._watchers.push(v),u=this._records&&this._records.length,u&&this._records[u-1].push(l),n.init===!0&&(this.$phase="digest",this._checkSingleWatch(v,this._watchers.length-1),this.$phase=null),v},$unwatch:function(t){if(t=t.uid||t,this._watchers||(this._watchers=[]),Array.isArray(t))for(var e=0,n=t.length;n>e;e++)this.$unwatch(t[e]);else{var r,i,s=this._watchers;if(!t||!s||!(i=s.length))return;for(;i--;)r=s[i],r&&r.id===t&&s.splice(i,1)}},$expression:function(t){return this._touchExpr(s(t))},$digest:function(){if("digest"!==this.$phase&&!this._mute){this.$phase="digest";for(var t=!1,e=0;t=this._digest();)if(++e>20)throw"there may a circular dependencies reaches";e>0&&this.$emit&&this.$emit("$update"),this.$phase=null}},_digest:function(){var t,e,n,r=this._watchers,i=!1;if(r&&r.length)for(var s=0,a=r.length;a>s;s++)e=r[s],n=this._checkSingleWatch(e,s),n&&(i=!0);if(t=this._children,t&&t.length)for(var o=0,u=t.length;u>o;o++)t[o]._digest()&&(i=!0);return i},_checkSingleWatch:function(t,e){var n=!1;if(t){if(!t.test){var r=t.get(this),s=t.last,a=!0;if("object"===i.typeOf(r)&&t.deep)if(t.last){for(var o in r)if(t.last[o]!==r[o]){a=!1;break}if(a!==!1)for(var u in s)if(s[u]!==r[u]){a=!1;break}}else a=!1;else a=i.equals(r,t.last);return a===!1||t.force?(a=!1,t.force=null,n=!0,t.fn.call(this,r,t.last),t.last="object"!=typeof r||t.deep?i.clone(r):r):"array"===i.typeOf(a)&&a.length?(t.last=i.clone(r),t.fn.call(this,r,a),n=!0):a=!0,n&&t.once&&this._watchers.splice(e,1),n}var c=t.test(this);c&&(n=!0,t.fn.apply(this,c))}},$set:function(t,e){if(null!=t){var n=i.typeOf(t);if("string"===n||"expression"===t.type)t=this.$expression(t),t.set(this,e);else if("function"===n)t.call(this,this.data);else for(var r in t)this.$set(r,t[r])}},$get:function(t){return this.$expression(t).get(this)},$update:function(){this.$set.apply(this,arguments);var t=this;do{if(t.data.isolate||!t.$parent)break;t=t.$parent}while(t);t.$digest()},_record:function(){this._records||(this._records=[]),this._records.push([])},_release:function(){return this._records.pop()}};i.extend(r.prototype,a),r.mixTo=function(t){return t="function"==typeof t?t.prototype:t,i.extend(t,a)},n.exports=r}),t.register("regularjs/src/helper/event.js",function(t,e,n){function r(){arguments.length&&this.$on.apply(this,arguments)}var i=[].slice,s=e("../util.js"),a={$on:function(t,e){if("object"==typeof t)for(var n in t)this.$on(n,t[n]);else{var r=this,i=r._handles||(r._handles={}),s=i[t]||(i[t]=[]);s.push(e)}return this},$off:function(t,e){var n=this;if(n._handles){t||(this._handles={});var r,i=n._handles;if(r=i[t]){if(!e)return i[t]=[],n;for(var s=0,a=r.length;a>s;s++)if(e===r[s])return r.splice(s,1),n}return n}},$emit:function(t){var e,n,r,s=this,a=s._handles;if(t){var n=i.call(arguments,1),r=t;if(!a)return s;if(e=a[r.slice(1)])for(var o=0,u=e.length;u>o;o++)e[o].apply(s,n);if(!(e=a[r]))return s;for(var c=0,u=e.length;u>c;c++)e[c].apply(s,n);return s}},$broadcast:function(){}};s.extend(r.prototype,a),r.mixTo=function(t){t="function"==typeof t?t.prototype:t,s.extend(t,a)},n.exports=r}),t.register("regularjs/src/helper/animate.js",function(t,e,n){function r(t){var e,n=0,r=0,s=0,a=0,o=0,u=5/3;return window.getComputedStyle&&(e=window.getComputedStyle(t),r=i(e[h+"Duration"])||r,s=i(e[h+"Delay"])||s,a=i(e[f+"Duration"])||a,o=i(e[f+"Delay"])||o,n=Math.max(r+s,a+o)),1e3*n*u}function i(t){var e,n=0;return t?(t.split(",").forEach(function(t){e=parseFloat(t),e>n&&(n=e)}),n):0}var s=e("../util"),a=e("../dom.js"),o={},u=e("../env.js"),c="transitionend",l="animationend",h="transition",f="animation";"ontransitionend"in window||("onwebkittransitionend"in window?(c+=" webkitTransitionEnd",h="webkitTransition"):("onotransitionend"in a.tNode||"Opera"===navigator.appName)&&(c+=" oTransitionEnd",h="oTransition")),"onanimationend"in window||("onwebkitanimationend"in window?(l+=" webkitAnimationEnd",f="webkitAnimation"):"onoanimationend"in a.tNode&&(l+=" oAnimationEnd",f="oAnimation")),o.inject=function(t,e,n,r){if(r=r||s.noop,Array.isArray(t)){for(var i=a.fragment(),o=0,u=0,c=t.length;c>u;u++)i.appendChild(t[u]);a.inject(i,e,n);var l=function(){o++,o===c&&r()};for(c===o&&r(),u=0;c>u;u++)t[u].onenter?t[u].onenter(l):l()}else a.inject(t,e,n),t.onenter?t.onenter(r):r()},o.remove=function(t,e){t.onleave?t.onleave(function(){p(t,e)}):p(t,e)};var p=function(t,e){a.remove(t),e&&e()};o.startClassAnimate=function(t,e,n,i){var o,h,f,p;return!l&&!c||u.isRunning?n():(p=s.once(function(){f&&clearTimeout(f),2===i&&a.delClass(t,o),3!==i&&a.delClass(t,e),a.off(t,l,p),a.off(t,c,p),n()}),2===i?(a.addClass(t,e),o=e.split(/\s+/).map(function(t){return t+"-active"}).join(" "),a.nextReflow(function(){a.addClass(t,o),h=r(t),f=setTimeout(p,h)})):a.nextReflow(function(){a.addClass(t,e),h=r(t),f=setTimeout(p,h)}),a.on(t,l,p),a.on(t,c,p),p)},o.startStyleAnimate=function(t,e,n){var i,o,u;return a.nextReflow(function(){a.css(t,e),i=r(t),u=setTimeout(o,i)}),o=s.once(function(){u&&clearTimeout(u),a.off(t,l,o),a.off(t,c,o),n()}),a.on(t,l,o),a.on(t,c,o),o},n.exports=o}),t.register("regularjs/src/helper/combine.js",function(t,e,n){var r=e("../dom.js"),i=n.exports={node:function(t){var e,n;if(t.element)return t.element;if("function"==typeof t.node)return t.node();if("number"==typeof t.nodeType)return t;if(t.group)return i.node(t.group);if(e=t.children){if(1===e.length)return i.node(e[0]);for(var r=[],s=0,a=e.length;a>s;s++)n=i.node(e[s]),Array.isArray(n)?r.push.apply(r,n):r.push(n);return r}},last:function(t){var e=t.children;return"function"==typeof t.last?t.last():"number"==typeof t.nodeType?t:e&&e.length?i.last(e[e.length-1]):t.group?i.last(t.group):void 0},destroy:function(t,e){if(t){if(Array.isArray(t))for(var n=0,s=t.length;s>n;n++)i.destroy(t[n],e);var a=t.children;if("function"==typeof t.destroy)return t.destroy(e);"number"==typeof t.nodeType&&e&&r.remove(t),a&&a.length&&(i.destroy(a,!0),t.children=null)}}}}),t.register("regularjs/src/helper/entities.js",function(t,e,n){var r={quot:34,amp:38,apos:39,lt:60,gt:62,nbsp:160,iexcl:161,cent:162,pound:163,curren:164,yen:165,brvbar:166,sect:167,uml:168,copy:169,ordf:170,laquo:171,not:172,shy:173,reg:174,macr:175,deg:176,plusmn:177,sup2:178,sup3:179,acute:180,micro:181,para:182,middot:183,cedil:184,sup1:185,ordm:186,raquo:187,frac14:188,frac12:189,frac34:190,iquest:191,Agrave:192,Aacute:193,Acirc:194,Atilde:195,Auml:196,Aring:197,AElig:198,Ccedil:199,Egrave:200,Eacute:201,Ecirc:202,Euml:203,Igrave:204,Iacute:205,Icirc:206,Iuml:207,ETH:208,Ntilde:209,Ograve:210,Oacute:211,Ocirc:212,Otilde:213,Ouml:214,times:215,Oslash:216,Ugrave:217,Uacute:218,Ucirc:219,Uuml:220,Yacute:221,THORN:222,szlig:223,agrave:224,aacute:225,acirc:226,atilde:227,auml:228,aring:229,aelig:230,ccedil:231,egrave:232,eacute:233,ecirc:234,euml:235,igrave:236,iacute:237,icirc:238,iuml:239,eth:240,ntilde:241,ograve:242,oacute:243,ocirc:244,otilde:245,ouml:246,divide:247,oslash:248,ugrave:249,uacute:250,ucirc:251,uuml:252,yacute:253,thorn:254,yuml:255,fnof:402,Alpha:913,Beta:914,Gamma:915,Delta:916,Epsilon:917,Zeta:918,Eta:919,Theta:920,Iota:921,Kappa:922,Lambda:923,Mu:924,Nu:925,Xi:926,Omicron:927,Pi:928,Rho:929,Sigma:931,Tau:932,Upsilon:933,Phi:934,Chi:935,Psi:936,Omega:937,alpha:945,beta:946,gamma:947,delta:948,epsilon:949,zeta:950,eta:951,theta:952,iota:953,kappa:954,lambda:955,mu:956,nu:957,xi:958,omicron:959,pi:960,rho:961,sigmaf:962,sigma:963,tau:964,upsilon:965,phi:966,chi:967,psi:968,omega:969,thetasym:977,upsih:978,piv:982,bull:8226,hellip:8230,prime:8242,Prime:8243,oline:8254,frasl:8260,weierp:8472,image:8465,real:8476,trade:8482,alefsym:8501,larr:8592,uarr:8593,rarr:8594,darr:8595,harr:8596,crarr:8629,lArr:8656,uArr:8657,rArr:8658,dArr:8659,hArr:8660,forall:8704,part:8706,exist:8707,empty:8709,nabla:8711,isin:8712,notin:8713,ni:8715,prod:8719,sum:8721,minus:8722,lowast:8727,radic:8730,prop:8733,infin:8734,ang:8736,and:8743,or:8744,cap:8745,cup:8746,"int":8747,there4:8756,sim:8764,cong:8773,asymp:8776,ne:8800,equiv:8801,le:8804,ge:8805,sub:8834,sup:8835,nsub:8836,sube:8838,supe:8839,oplus:8853,otimes:8855,perp:8869,sdot:8901,lceil:8968,rceil:8969,lfloor:8970,rfloor:8971,lang:9001,rang:9002,loz:9674,spades:9824,clubs:9827,hearts:9829,diams:9830,OElig:338,oelig:339,Scaron:352,scaron:353,Yuml:376,circ:710,tilde:732,ensp:8194,emsp:8195,thinsp:8201,zwnj:8204,zwj:8205,lrm:8206,rlm:8207,ndash:8211,mdash:8212,lsquo:8216,rsquo:8217,sbquo:8218,ldquo:8220,rdquo:8221,bdquo:8222,dagger:8224,Dagger:8225,permil:8240,lsaquo:8249,rsaquo:8250,euro:8364};n.exports=r}),t.register("regularjs/src/helper/filter.js",function(t,e,n){var r=n.exports={};r.json={get:function(t){return"undefined"!=typeof JSON?JSON.stringify(t):t},set:function(t){return"undefined"!=typeof JSON?JSON.parse(t):t}},r.last=function(t){return t&&t[t.length-1]},r.average=function(t,e){return t=t||[],t.length?r.total(t,e)/t.length:0},r.total=function(t,e){var n=0;if(t)return t.forEach(function(t){n+=e?t[e]:t}),n}}),t.register("regularjs/src/directive/base.js",function(t,e){var n=(e("../util.js"),e("../dom.js")),r=(e("../helper/animate.js"),e("../Regular.js"));e("./event.js"),e("./form.js"),r.directive("r-class",function(t,e){this.$watch(e,function(e){var n=" "+t.className.replace(/\s+/g," ")+" ";for(var r in e)e.hasOwnProperty(r)&&(n=n.replace(" "+r+" "," "),e[r]===!0&&(n+=r+" "));t.className=n.trim()},!0)}),r.directive("r-style",function(t,e){this.$watch(e,function(e){for(var r in e)e.hasOwnProperty(r)&&n.css(t,r,e[r])},!0)}),r.directive("r-hide",function(t,e){var n,r=null;this.$watch(e,function(e){var i=!!e;i!==r&&(r=i,i?t.onleave?n=t.onleave(function(){t.style.display="none",n=null}):t.style.display="none":(n&&n(),t.style.display="",t.onenter&&t.onenter()))})}),r.directive("r-html",function(t,e){this.$watch(e,function(e){e=e||"",n.html(t,e)},{force:!0})})}),t.register("regularjs/src/directive/form.js",function(t,e){function n(t,e){function n(){e.set(r,this.value),i.last=this.value,r.$update()}var r=this,i=this.$watch(e,function(e){var n=a.slice(t.getElementsByTagName("option"));n.forEach(function(n,r){n.value==e&&(t.selectedIndex=r)})});return o.on(t,"change",n),void 0===e.get(r)&&t.value&&e.set(r,t.value),function(){o.off(t,"change",n)}}function r(t,e){var n=this,r=this.$watch(e,function(e){t.value!==e&&(t.value=null==e?"":""+e)}),i=function(t){var i=this;if("cut"===t.type||"paste"===t.type)a.nextTick(function(){var t=i.value;e.set(n,t),r.last=t,n.$update()});else{var s=i.value;e.set(n,s),r.last=s,n.$update()}};return 9!==o.msie&&"oninput"in o.tNode?t.addEventListener("input",i):(o.on(t,"paste",i),o.on(t,"keyup",i),o.on(t,"cut",i),o.on(t,"change",i)),void 0===e.get(n)&&t.value&&e.set(n,t.value),function(){9!==o.msie&&"oninput"in o.tNode?t.removeEventListener("input",i):(o.off(t,"paste",i),o.off(t,"keyup",i),o.off(t,"cut",i),o.off(t,"change",i))}}function i(t,e){var n=this,r=this.$watch(e,function(e){o.attr(t,"checked",!!e)}),i=function(){var t=this.checked;e.set(n,t),r.last=t,n.$update()};return e.set&&o.on(t,"change",i),void 0===e.get(n)&&e.set(n,!!t.checked),function(){e.set&&o.off(t,"change",i)}}function s(t,e){var n=this,r=(this.$watch(e,function(e){t.checked=e==t.value?!0:!1}),function(){var t=this.value;e.set(n,t),n.$update()});return e.set&&o.on(t,"change",r),void 0===e.get(n)&&t.checked&&e.set(n,t.value),function(){e.set&&o.off(t,"change",r)}}var a=e("../util.js"),o=e("../dom.js"),u=e("../Regular.js"),c={text:r,select:n,checkbox:i,radio:s};u.directive("r-model",function(t,e){var n=t.tagName.toLowerCase(),r=n;return"input"===r?r=t.type||"text":"textarea"===r&&(r="text"),"string"==typeof e&&(e=this.$expression(e)),c[r]?c[r].call(this,t,e):"input"===n?c.text.call(this,t,e):void 0})}),t.register("regularjs/src/directive/animation.js",function(t,e){function n(t){var e,n=[],r=0,s=i.noop,a={type:t,start:function(t){return e=i.uid(),"function"==typeof t&&(s=t),r>0?r=0:a.step(),a.compelete},compelete:function(){e=null,s&&s(),s=i.noop,r=0},step:function(){n[r]&&n[r](a.done.bind(a,e))},done:function(t){t===e&&(r<n.length-1?(r++,a.step()):a.compelete())},push:function(t){n.push(t)}};return a}function r(t,e){function r(t){l&&m.push(l),l=n(t)}function i(t,e){e&&t()}function s(t){return function(){delete t.onenter,delete t.onleave}}e=e.trim();for(var o,l,h,f,p,d,v=e.split(";"),m=[],g=[],y=0,x=v.length;x>y;y++)if(o=v[y],p=o.split(":"),h=p[0]&&p[0].trim(),f=p[1]&&p[1].trim(),h)if(h!==u)if(h!==c){var d=a.animation(h);if(!d||!l)throw"you need start with `on` or `event` in r-animation";l.push(d.call(this,{element:t,done:l.done,param:f}))}else r(f),"leave"===f?(t.onleave=l.start,g.push(s(t))):"enter"===f?(t.onenter=l.start,g.push(s(t))):"on"+f in t?g.push(this._handleEvent(t,f,l.start)):(this.$on(f,l.start),g.push(this.$off.bind(this,f,l.start)));else r("when"),this.$watch(f,i.bind(this,l.start));return g.length?function(){g.forEach(function(t){t()})}:void 0}var i=e("../util.js"),s=e("../helper/animate.js"),a=(e("../dom.js"),e("../Regular.js")),o=/\s+/,u="when",c="on";a._addProtoInheritCache("animation"),a.animation({wait:function(t){var e=parseInt(t.param)||0;return function(t){setTimeout(t,e)}},"class":function(t){var e=t.param.split(","),n=e[0]||"",r=parseInt(e[1])||1;return function(e){s.startClassAnimate(t.element,n,e,r)}},call:function(t){var e=this.$expression(t.param).get,n=this;return function(t){e(n),n.$update(),t()}},emit:function(t){var e=t.param,n=e.split(","),r=n[0]||"",i=n[1]?this.$expression(n[1]).get:null;if(!r)throw"you shoud specified a eventname in emit command";var s=this;return function(t){s.$emit(r,i?i(s):void 0),t()}},style:function(t){var e,n={},r=t.param,i=r.split(",");return i.forEach(function(t){if(t=t.trim()){var r=t.split(o),i=r.shift(),s=r.join(" ");if(!i||!s)throw"invalid style in command: style";n[i]=s,e=!0}}),function(r){e?s.startStyleAnimate(t.element,n,r):r()}}}),a.directive("r-animation",r),a.directive("r-sequence",r)}),t.register("regularjs/src/directive/event.js",function(t,e){function n(t,e){for(var n=t.target;n&&n!==i.doc;){for(var r=0,s=e.length;s>r;r++)e[r].element===n&&e[r].fire(t);n=n.parentNode}}var r=e("../util.js"),i=e("../dom.js"),s=e("../Regular.js");s._addProtoInheritCache("event"),s.event("enter",function(t,e){function n(t){13===t.which&&(t.preventDefault(),e(t))}return r.log("on-enter will be removed in 0.4.0","error"),i.on(t,"keypress",n),function(){i.off(t,"keypress",n)}}),s.directive(/^on-\w+$/,function(t,e,n,r){if(n&&e){var i=n.split("-")[1];return this._handleEvent(t,i,e,r)}}),s.directive(/^delegate-\w+$/,function(t,e,s){function a(t){n(t,u[c])}var o=this.$root,u=o._delegates||(o._delegates={});if(s&&e){var c=s.split("-")[1],l=r.handleEvent.call(this,e,c);u[c]||(u[c]=[],o.$on("$inject",function(t){var e=this.parentNode;e&&i.off(e,c,a),i.on(t,c,a)}),o.$on("$destroy",function(){o.parentNode&&i.off(o.parentNode,c,a),o._delegates[c]=null}));var h={element:t,fire:l};return u[c].push(h),function(){var t=u[c];if(t&&t.length)for(var e=0,n=t.length;n>e;e++)t[e]===h&&t.splice(e,1)}}})}),t.register("regularjs/src/module/timeout.js",function(t,e){function n(t){t.implement({$timeout:function(t,e){return e=e||0,setTimeout(function(){t.call(this),this.$update()}.bind(this),e)},$interval:function(t,e){return e=e||1e3/60,setInterval(function(){t.call(this),this.$update()}.bind(this),e)}})}var r=e("../Regular.js");r.plugin("timeout",n),r.plugin("$timeout",n)}),t.alias("regularjs/src/index.js","regularjs/index.js"), true?module.exports=t("regularjs"):"function"==typeof define&&define.amd?define(function(){return t("regularjs")}):window.Regular=t("regularjs")}();
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(8).setImmediate))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(9).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;

	// DOM APIs, for completeness

	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };

	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};

	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};

	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};

	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);

	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};

	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);

	  immediateIds[id] = true;

	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });

	  return id;
	};

	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(8).setImmediate, __webpack_require__(8).clearImmediate))

/***/ },
/* 9 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	(function () {
	  try {
	    cachedSetTimeout = setTimeout;
	  } catch (e) {
	    cachedSetTimeout = function () {
	      throw new Error('setTimeout is not defined');
	    }
	  }
	  try {
	    cachedClearTimeout = clearTimeout;
	  } catch (e) {
	    cachedClearTimeout = function () {
	      throw new Error('clearTimeout is not defined');
	    }
	  }
	} ())
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = cachedSetTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    cachedClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        cachedSetTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ }
/******/ ]);