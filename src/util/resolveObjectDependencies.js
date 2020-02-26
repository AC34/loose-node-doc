/**
 * reconstruts path tree to object tree. 
 * @param {object} cache_tree result of traverseCache.js
 * @return {object} merged tree
 */
function resolveObjectDependencies(cache_tree,require_tree) {
  //adds parent and childeren infos
  var root_obj = constructRootObject(cache_tree);
  //reconstruct tree from its roots
  var tree = startReconstruction(root_obj, cache_tree);
  return tree;
}
/**
 * Merges merges root
 * @param {object} caches
 */
function constructRootObject(caches) {
  var root_obj = {};
  var sources = [];
  var children = [];
  var exports = {};
  for (var path in caches) {
    if (caches[path].parent === undefined) {
      //at this point there are multiple entries that doesn't have parent path.
      sources.push(path);
      if (caches[path].children) {
        children = children.concat(caches[path].children);
      }
      if (caches[path].exports) {
        exports = Object.assign(caches[path].exports);
      }
    }
  }
  root_obj.sources = sources;
  root_obj.children = children;
  root_obj.exports = exports;
  return root_obj;
}
/**
 * @param {object} root_obj
 * @param {object} caches
 */
function startReconstruction(root_obj, caches) {
  //console.log("root_obj"+JSON.stringify(root_obj));
  var tree = {};
  console.log("root paths:"+JSON.stringify(root_obj.sources,null,"\t"));
  for (var i in root_obj.children) {
    var path = root_obj.children[i];
    tree = Object.assign(tree, traverseExports("", path, caches, tree));
  }
  return tree;
}
function resolveChildren(){

}
/**
 * tree{path_string:{path:other}}
 * @param {string} prefix
 * @param {object} exports
 * @param {object} caches
 * @param {object} tree
 */
function traverseExports(prefix, path, caches, tree) {
  var item = caches[path];
  for(var key in item.exports){
    var new_prefix = prefix!==""?prefix+"."+key:key;
    var ex = item.exports[key];
    if(typeof ex === "object"){
      //no children then ignore
      if(!caches[path].children)continue;
      for(var i in caches[path].children){
        //keep traversing object
        tree = Object.assign(tree,traverseExports(new_prefix,caches[path].children[i],caches,tree));
      }
    }else{
      //ex is either value or function
      tree[new_prefix] = {};
      tree[new_prefix].path = path;
      if(typeof ex === "function"){
        tree[new_prefix].exports = ex.toString();//function
      }else{
        tree[new_prefix].exports = ex;//value
      }
    }
  }
  return tree;
}
module.exports = resolveObjectDependencies;
