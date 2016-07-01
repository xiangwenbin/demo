"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
require('../../../css/index.css');
var BaseModule = require('../BaseModule');
var BaseComponent = require('../components/BaseComponent');
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
