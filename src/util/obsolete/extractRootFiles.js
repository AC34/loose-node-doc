/**
 * extracts root paths from cache_tree made by raverseCache..js
 * unwanted paths must be avoided before.
 * @param {objct} cache_tree 
 * @return {array} roots
 */
function extractRootFiles(cache_tree){
  var roots = [];
  for(var path in cache_tree){
    if(!cache_tree[path].parent){
      roots.push(path);
    }
  }
  return roots;
}

module.exports = extractRootFiles;