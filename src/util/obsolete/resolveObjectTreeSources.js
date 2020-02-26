/**
 * adds source path
 * @param {object} objects_tree 
 * @param {array} files_list 
 * @return {object} customized tree
 */
function resolveObjectTreeFiles(objects_tree,files_list){
  var files = loadFiles(files_list);
  for(var file in files){
    for(var obj in objects_tree){
      if(!objects_tree[obj].code)continue;
      var pos = files[file].indexOf(objects_tree[obj].code);
      //console.log("filepos"+pos+" of file:"+file);
      if(pos>=0){
        objects_tree[obj].source = file;
      }
    }
  }
  return objects_tree;
}
/**
 * 
 * @param {array} files 
 * 
 */
function loadFiles(files){
  var ret = [];
  var fs = require("fs");
  for(var i in files){
    ret[files[i]] = fs.readFileSync(files[i]);
  }
  return ret;
}

module.exports = resolveObjectTreeFiles;