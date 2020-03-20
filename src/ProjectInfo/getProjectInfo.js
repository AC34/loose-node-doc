var sep = require("path").sep;
/**
 * This function needs to be called from the entry point file.
 * @param {object} options
 * @returns {object} ProjectInfo
 */
function getProjectInfo(options){
  var pi = Object.assign({},require("./model/ProjectInfo"));
  pi.build_script_path = resolveBuildScriptPath();
  pi.project_root_dir = resolveProjectRootDir();
  pi.entry_point_dir = resolveEntryPointDir(); 
  var package_json_path = resolvePackageFile(pi.entry_point_dir,options);
  pi.package_json = readPackageJson(package_json_path);
  console.log("pi:"+JSON.stringify(pi));
  return pi; 
}
/**
 * returns project root directory. does not end with /
 * @return {string} project_root_dir
 */
function resolveProjectRootDir(){
  var path = __dirname;
  var sep = require("path").sep;
  path = path.split(sep);
  path.pop();
  path.pop();
  path.pop();
  path.pop();
  path = path.join(sep);
  return path;
}
/**
 * @return {string} entry_point_dir
 */
function resolveEntryPointDir(){
  var trace = new Error().stack.split("\n")[3];
  //removing brackets
  trace = trace.substring(trace.indexOf("(") + 1, trace.lastIndexOf(")"));
  //there arae two semi colons from the tail of the path
  //and there can be zero or one semi colons from head, depending on OS.
  trace = trace.substring(0, trace.lastIndexOf(":"));
  trace = trace.substring(0, trace.lastIndexOf(":"));
  trace = require("path").dirname(trace);
  return trace;
} 
function resolveBuildScriptPath(){
  var trace = new Error().stack.split("\n")[4];
  //removing brackets
  trace = trace.substring(trace.indexOf("(") + 1, trace.lastIndexOf(")"));
  //there arae two semi colons from the tail of the path
  //and there can be zero or one semi colons from head, depending on OS.
  trace = trace.substring(0, trace.lastIndexOf(":"));
  trace = trace.substring(0, trace.lastIndexOf(":"));
  return trace;
}
/**
 * 
 * @param {object} options 
 * @return {string}
 */
function resolvePackageFile(entry_point_dir,options){
  console.log("given options:"+JSON.stringify(options));
  var file = options.package_json_path;
  if(file.startsWith("./",""))file = file.replace("./","/");
  if(!file.startsWith("/",""))file = "/"+file;
  //concat
  file = entry_point_dir+file;
  file = file.replace(/\//g,sep);
  return file;
}
/**
 * reads package.json file
 * @param {string} package_file_path 
 * @return {object} package.json
 */
function readPackageJson(package_file_path){
  
}

module.exports = getProjectInfo;