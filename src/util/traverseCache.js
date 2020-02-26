/**
 * !!require the target object before calling this function.!!
 * Does traverse require cache and returns an object
 * {path:{parent(string:path),children(array:sring:path),exports(array:)},...}
 * may not have the root parent.
 * @return {object} tree
 */
function createCacheTree() {
  var caches = require.cache;
  var tree = {};
  ;
  for (var file in caches) {
    var item = caches[file];
    //console.log("cache[" + file + "] " + Object.keys(item));
    //initialize
    tree[file] = {};
    if (item.parent) {
      //console.log("parent:" + item.parent.filename);
      tree[file].parent = item.parent.filename;
    }
    if (item.children) {
      var keys = Object.keys(item.children);
      tree[file].children = [];
      for (var k in keys) {
        tree[file].children.push(item.children[keys[k]].filename);
      }
    }
    if (item.exports) {
      tree[file].exports = item.exports;
    }
  }
  return tree;
}
module.exports = createCacheTree;