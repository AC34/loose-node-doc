/**
 * @param {object} cache_tree by traverseCache.js 
 * @param {array} ignores relative paths from caller script
 */
function ignoreFiles(cache_tree,ignores){
  var ignores = resolvePaths(ignores);
  console.log("resolved paths:"+JSON.stringify(ignores));
  for(var path in cache_tree){
  //console.log("ignore target:"+path);
  //console.log("ignore target:"+path); 
  //remove from parent
  //if(cache_tree[path].parent === project_root)delete cache_tree[path].parent;
  } 
  return cache_tree;
}
/**
 * trns paths from relative path from root to absolute path from drive
 * @param {array} paths 
 * @return {array} paths
 */
function resolvePaths(paths){
  var root_dir = process.mainModule.paths[0].split('node_modules')[0].slice(0, -1);//does not end with separator
  var sep = require("path").sep;
  var new_paths = [];
  for(var i in paths){
    var path = paths[i];
    if(path.startsWith("./"))path = path.replace("./","");
    if(path.startsWith("/",""))path = path.replace("/","");//first only
    path = path.replace(/\//g,sep);
    new_paths.push(root_dir+sep+path);
  }
  return new_paths;
}
module.exports = ignoreFiles;