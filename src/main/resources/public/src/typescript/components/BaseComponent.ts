let Regular = require('../../lib/regularjs/dist/regular.min.js');
if (Regular.config) {
    Regular.config({ BEGIN: "{", END: "}" });
}
let BaseComponent = Regular.extend({
    template: '<div>base Template {hello}</div>',
    data: {
        hello: "hello world"
    }
});
export = BaseComponent;