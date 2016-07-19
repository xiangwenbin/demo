/**
* 继承了regualr的基础组件类
**/
// let Regular = require('../../lib/regularjs/dist/regular.min');
let Regular = require('/regularjs/dist/regular.min');
// import {Regular}  from '/regularjs/'
if (Regular.config) {
    Regular.config({ BEGIN: "{", END: "}" });
}
let BaseComponent = Regular.extend({
    template: '<div>base Template {hello}</div>',
    data: {
        hello: "hello world"
    } 
});
export { BaseComponent};