const fs = require('fs');
var path = require('path');
var _root = path.resolve(__dirname, '..');
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}
function getEntry(srcDir) {
    var tsPath = root.apply(this,Array.prototype.slice.call(arguments, 0));
    var dirs = fs.readdirSync(tsPath);
    var matchs = [], files = {};
    dirs.forEach(function (item) {
        matchs = item.match(/(.+)\.ts$/);
        if (matchs) {
            files[matchs[1]] = path.resolve(tsPath,item);
        }
    });
    return files;
}
exports.root = root;
exports.getEntry = getEntry;