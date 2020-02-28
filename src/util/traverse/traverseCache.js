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
      //console.log("parent keys:" + Object.keys(item.parent));
      //console.log("parent id:"+item.parent.id);
      tree[file].parent = item.parent.filename;
    }
    //doesnt work good on circular reference.
    /*if (item.children) {
      //console.log("children:"+item.children);
      tree[file].children = [];
      console.log("typeof children:"+typeof item.children);
      var keys = Object.keys(item.children);
      console.log("children keys:"+JSON.stringify(keys));
      for(var k in keys){
        //console.log("i:"+item.children[keys[i]].toString());
        console.log("k:"+JSON.stringify(keys[k]));
        console.log("child:"+k+":"+JSON.stringify(item.children[keys[k]]));
        console.log("exports:"+item.exports?true:false);
        //tree[file].children.push(item.children[keys[i]]);
      }
    }*/
    if (item.exports) {
      tree[file].exports = item.exports;
    }
  }
  //work out parents and children
  return resolveChildren(tree);
}
function resolveChildren(tree){
  for(var path in tree){
    //if root, dosnt have a parent
    if(!tree[path].parent)continue;
    var parent = tree[path].parent;
    //if somoehow parent doesnt exist, skip.
    if(!tree[parent])continue;
    //initialize parent
    if(!tree[parent].children)tree[parent].children = [];
    //push
    if(!tree[parent].children[path])tree[parent].children.push(path);
  }
  return tree;
}
module.exports = createCacheTree;