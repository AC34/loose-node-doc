/**
 * @param {object} cache_tree by traverseCache.js
 * @param {array} ignores relative paths from caller script
 */
function ignorePaths(cache_tree, ignores,root_dir) {
  console.log("ignoring paths:" + JSON.stringify(ignores));
  if(!cache_tree||!ignores)return cache_tree;
  var ignores = resolveAbsolutePaths(root_dir,ignores);
  for (var path in cache_tree) {
    //remove from parent ,children and self
    for (var i in ignores) {
      var ignore = ignores[i];
      //parent(string)
      if (cache_tree[path].parent) {
        if (cache_tree[path].parent.startsWith(ignore)){
          //console.log("deleting:parent:"+cpath);
          delete cache_tree[path].parent;
        }
      }
      //children(array)
      if(cache_tree[path].children){
        var new_children = [];
        for(var k in cache_tree[path].children){
          if(cache_tree[path].children[k].startsWith(ignore)){
            //console.log("deleting:children:"+cache_tree[path].children[k]);
          }else{
            //add in to new children collection
            new_children.push(cache_tree[path].children[k]);
          }
        }
        cache_tree[path].children = new_children;
      }
      //self (cache_tree key itself)
      if (path.startsWith(ignore)) {
        delete cache_tree[path];
        //key does  not exist from this point
        //cannot ignore anymore
        break;
      }
    }//ignores
  }//cache
  return cache_tree;
}
/**
 * turns paths from relative path from root to absolute path from drive(root)
 * @param {array} paths
 * @return {array} paths
 */
function resolveAbsolutePaths(root_dir,paths) {
  var sep = require("path").sep;
  var resolve = require("path").resolve;
  var new_paths = [];
  for (var i in paths) {
    var path = paths[i];
    //delete heading ./
    if (path.startsWith("./")) path = path.replace("./", "");
    //delete heading /
    if (path.startsWith("/", "")) path = path.replace("/", ""); //first only
    //replace / with teh OS directory separator
    path = path.replace(/\//g, sep);
    //remove empty string
    if(path==="")continue;
    new_paths.push(resolve(root_dir + sep + path));
  }
  console.log("resolved ignore paths:"+JSON.stringify(new_paths));
  return new_paths;
}
/**
 * omits first dot, return value starts with /
 * does not omit ../
 * @param {string} path 
 * @return {string} omitted
 */
function omitFirstDot(path){
  if(path.startsWith("./")){
    //first only
    path = path.replace(".","");
  }
  if(!path.startsWith("/")){
    path = "/"+path;
  }
  return path;
}
module.exports = ignorePaths;
