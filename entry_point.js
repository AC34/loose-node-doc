  var getMessages = require("loose-node-doc/src/Options/getMessages");
  var validateOptions = require("./src/Options/validateOptions");
  var fs = require("fs");
  //traverses down object tree and finds object information
  var traverseObjectNames = require("loose-node-doc/src/util/traverse/traverseObjectNames");
  //reads cache hisotry and returns its list
  var traverseCache = require("loose-node-doc/src/util/traverse/traverseCache");
  //deletes certain paths from traverseCache() result
  var ignoreFiles = require("loose-node-doc/src/util/ignore/ignoreFiles");
  //g by object names
  var ignoreObjects = require("loose-node-doc/src/util/ignore/ignoreObject");
  //resolve objct tree sources
  var resolveObjectDependencies = require("loose-node-doc/src/util/resolve/resolveObjectDependencies");
  //fetches code's own name
  var resolveCodeNames = require("loose-node-doc/src/util/resolve/resolveCodeNames");
  //tries to salvage comment block from files
  var resolveCodesFiles =require("loose-node-doc/src/util/resolve/resolveCodesFiles");
  var loadAllRequiredFiles = require("loose-node-doc/src/util/IO/loadAllRequiredFiles");
  var resolveComments = require("loose-node-doc/src/util/resolve/resolveComments");

/**
 * LND(loose-node-doc).
 */
function LND() {
  this.files_to_ignore = [];
  this.objects_to_ignore = [];
}
/**
 * Creates html document output.
 * @param {*} out_path
 * @param {object}
 */
LND.generate = function(object,options) {
  if(!options)options = {};
  //initializing log
  this.logs = [];
  //initial setting for getMessages,parseOptions
  this.options = {verbose:true};
  //first of all, the system needs messages
  //anything that requires LND can now access LND.messages
  this.messages = getMessages(options,this);
  //initializing options(updating and checking)
  this.options = validateOptions(options,this);
  if(!object){
    this.log(this.messages["empty-object"]());
    this.log(this.messages["process-stopped"]());
    return;
  }
  
  //test out_path
  

  //ignoring list by object names
  //var ignore_objects = ["util.fs"];
  //default ignoring list by file names
  //paths from user's build script.
  var default_ignores = [
    "../node_modules/"
  ];
    
  //path objects pair
  var obj_names = traverseObjectNames(object);
  obj_names = ignoreObjects(obj_names,this.ignore_objects);
  /*fs.writeFileSync(
    "./build/tmp/obj_names.json",
    JSON.stringify(obj_names, null, "\t"),
    {encoding:'utf8',flag:'w'}
  );*/

  //traverses require cache and returns an array
  //{"path":{exports[names/codes],parent},...}
  var cache_tree = traverseCache();
  cache_tree = ignoreFiles(cache_tree, default_ignores);
  cache_tree = ignoreFiles(cache_tree,this.files_to_ignore);
  /*fs.writeFileSync(
    "./build/tmp/ctree.json",
    JSON.stringify(cache_tree, null, "\t"),
    {encoding:'utf8',flag:'w'}
  );*/

  //traverses caches tree and resolve 
  //{"name":{path,exports[codes/objects]},...}
  var otree = resolveObjectDependencies(cache_tree,obj_names);
  //{"name":{path,exports[codes/objects],name},...}
  otree = resolveCodeNames(otree,obj_names);
  /*fs.writeFileSync(
    "./build/tmp/otree.json",
    JSON.stringify(otree, null, "\t"),
    {encoding:'utf8',flag:'w'}
  );*/
  //update otree with position and filename
  var all_files = loadAllRequiredFiles(cache_tree);
  otree = resolveCodesFiles(otree,all_files);
  otree = resolveComments(otree,all_files);
  fs.writeFileSync(
    "./build/tmp/otree.json",
    JSON.stringify(otree, null, "\t"),
    {encoding:'utf8',flag:'w'}
  );
  //var otree = addCommentsToTree(otree);
}

/**
 * files and directories to ignore.
 * relative paths from project directory.
 * @param {array} paths
 */
LND.ignoreFiles = function(paths) {
  if (!Array.isArray(paths)) {
    //fail
    console.log("paths needs to be type of array.");
    return;
  }
  this.files_to_ignore = paths;
};
LND.g = function(obj_names) {
  if (!Array.isArray(obj_names)) {
    //fail
    console.log("obj_names needs to be type of array.");
  }
  this.objects_to_ignore = obj_names;
};
LND.log = function(message){
  this.logs.push(message);
  if(this.options.verbose){
    console.log(message);
  }
}
module.exports = LND;