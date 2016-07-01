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
