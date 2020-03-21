
/**
 * turns all the absolute paths to relative paths from project root.
 * all the paths are supposed to be under the project root directory.
 * @param {otree} otree
 * @preturn {otree} otree
 */
function otreeToRelativePaths(otree,project_root_dir){
  for(var name in otree){
    if(otree[name].filename){
      otree[name].filename = toReleative(otree[name].filename,project_root_dir);
    }
  }
  return otree;
}

function toReleative(path,project_root_dir){
  if(path.startsWith(project_root_dir)){
    var ret = path.replace(project_root_dir,"");
    if(ret.startsWith("/"))ret = ret.replace("/","");
    return ret;
  }
  //else reutrn as is
  return path;
}

module.exports = otreeToRelativePaths;