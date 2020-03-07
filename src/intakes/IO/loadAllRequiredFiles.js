/**
 * There could be duplicates, but loads all files.
 * @todo avoid duplicates
 * @param {object} cache_tree
 * @return {object} {path:content,...}  
 */
function loadAllRequiredFiles(cache_tree){
  var paths = Object.keys(cache_tree);
  var fs = require("fs");
  var files = {};
  for(var i in paths){
    files[paths[i]] = fs.readFileSync(paths[i],"UTF-8");
  }
  return files;
}

module.exports = loadAllRequiredFiles;