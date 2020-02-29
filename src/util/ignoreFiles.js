/**
 * @param {object} cache_tree by traverseCache.js
 * @param {array} ignores relative paths from caller script
 */
function ignoreFiles(cache_tree, ignores) {
  if(!cache_tree||!ignores)return cache_tree;
  var ignores = resolvePaths(ignores);
  //console.log("ignoring paths:" + JSON.stringify(ignores));
  for (var path in cache_tree) {
    //console.log("ignore target:"+path);
    //remove from parent
    //if(cache_tree[path].parent === project_root)delete cache_tree[path].parent;
    for (var i in ignores) {
      //parent
      if (cache_tree[path].parent) {
        if (cache_tree[path].parent.startsWith(ignores[i])){
          delete cache_tree[path].parent;
        }
      }
      //children
      if(cache_tree[path].children){
        var new_children = [];
        for(var k in cache_tree[path].children){
          //console.log("cache k:"+cache_tree[path].children[k]+" length:"+cache_tree[path].children.length);
          if(!cache_tree[path].children[k].startsWith(ignores[i])){
            new_children.push(cache_tree[path].children[k]);
          }
        }
        cache_tree[path].children = new_children;
      }
      //self
      if (path.startsWith(ignores[i])) {
        delete cache_tree[path];
        break;
      }
    }
  }
  return cache_tree;
}
/**
 * trns paths from relative path from root to absolute path from drive
 * @param {array} paths
 * @return {array} paths
 */
function resolvePaths(paths) {
  var root_dir = process.mainModule.paths[0]
    .split("node_modules")[0]
    .slice(0, -1); //does not end with separator
  //console.log("root_dir" + root_dir);
  var sep = require("path").sep;
  var resolve = require("path").resolve;
  var new_paths = [];
  for (var i in paths) {
    var path = paths[i];
    if (path.startsWith("./")) path = path.replace("./", "");
    if (path.startsWith("/", "")) path = path.replace("/", ""); //first only
    path = path.replace(/\//g, sep);
    new_paths.push(resolve(root_dir + sep + path));
  }
  return new_paths;
}
module.exports = ignoreFiles;
