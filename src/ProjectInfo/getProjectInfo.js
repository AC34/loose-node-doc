/**
 * @param {object} options
 * @returns {object} ProjectInfo
 */
function getProjectInfo(options){
  var pi = require("./model/ProjectInfo");
  pi.project_root_dir = resolveProjectRootDir();
  pi.entry_point_dir = resolveEntryPointDir(); 
  pi.package_json = readPackageJson(resolvePackageFile(options));
  
  return pi; 
}
/**
 * @return {string} project_root_dir
 */
function resolveProjectRootDir(){

}
/**
 * @return {string} entry_point_dir
 */
function resolveEntryPointDir(){

}
function resolveBuildScriptPath(){

}
/**
 * 
 * @param {object} options 
 * @return {string}
 */
function resolvePackageFile(options){
   
}
/**
 * reads package.json file
 * @param {string} package_file_path 
 * @return {object} package.json
 */
function readPackageJson(package_file_path){

}