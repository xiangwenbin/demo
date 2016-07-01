"use strict";
var Regular = require('../../lib/regularjs/dist/regular.min.js');
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
