/**
 * Lists files recursively.
 * Empty directories will not be listed.
 * @param {string} dir (start with ./)
 * @param {array} files can be null
 * @return {array} file_path list
 */
function listFilesRecursive(dir,files){
  if(files===undefined)files = [];
  if(dir===undefined)return [];
  var fs = require("fs");
  var current_dir = fs.readdirSync(dir);
  var append = [];
  for(var i in current_dir){
    var item = current_dir[i];//file names without parents
    if(fs.statSync(dir+item).isDirectory()){
      if(!item.endsWith("/"))item+="/";
      //do recursive.
      //one dimentional.
      append = listFilesRecursive(dir+item,files);
    }else{
      //append file
      files.push(dir+item);
    }
  }
  return files.concat(append);
}
/**
 * @param {string} path_from_project_root
 */
function listFilesRecursiveInterface(roots,files){
  if(files===undefined)files = [];
  if(roots===undefined)return [];
  var ret_list = [],dir_list = [],fs = require("fs");
  for(var i in roots){
    if(fs.statSync(roots[i]).isDirectory()){
      //format with trailing /
     if(!roots[i].endsWith("/"))roots[i]= roots[i]+"/";
     dir_list.push(roots[i]);
    }else{
      //straight into return array
      ret_list.push(roots[i]);
    }
  }
  //now process every directories
  for(var i in dir_list){
    ret_list = ret_list.concat(listFilesRecursive(dir_list[i],[]));
  }
  return ret_list;
}

module.exports = listFilesRecursiveInterface;