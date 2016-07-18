"use strict";
// let Regular = require('../../lib/regularjs/dist/regular.min');
var Regular = require('/regularjs/dist/regular.min');
// import {Regular}  from '/regularjs/'
if (Regular.config) {
    Regular.config({ BEGIN: "{", END: "}" });
}
var BaseComponent = Regular.extend({
    template: '<div>base Template {hello}</div>',
    data: {
        hello: "hello world"
    }
});
exports.BaseComponent = BaseComponent;
