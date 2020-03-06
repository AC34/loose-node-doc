/**
 * merges function information and adds otree.
 * @param {object} otree of resolveObjectDependencies.js
 * @param {array} rtree of TraverseModuleTree.js
 * @return {object} otree with line numbers of parents
 */
function resolveCodesFiles(otree, files) {
  for (var name in otree) {
    //only work ono type "function"
    if (otree[name].type !== "function")continue; 
      //console.log("otree["+name+"] is function");
      //find exported code(given in string), from all the files.
      var match = matchFile(otree[name].exports, files);
      if(!match.pos)continue;
      //pos index starts from index 0
      if (match.pos < 0) continue;
      otree[name].pos = match.pos;
      otree[name].filename = match.path;
  }
  return otree;
}
/**
 * returns {path:path,pos:>-1}
 * or an empty object {}
 */
function matchFile(code, files) {
  for (var path in files) {
    var pos = files[path].indexOf(code);
    if(pos===-1)continue;
    return {"path":path,"pos":pos};
  }
  return {};
}
module.exports = resolveCodesFiles;
