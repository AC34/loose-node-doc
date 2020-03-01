  var getMessages = require("loose-node-doc/src/Options/getMessages");
  var validateOptions = require("./src/Options/validateOptions");
  var fs = require("fs");
  //traverses down object tree and finds object information
  var traverseObjectNames = require("loose-node-doc/src/util/traverse/traverseObjectNames");
  //reads cache hisotry and returns its list
  var traverseCache = require("loose-node-doc/src/util/traverse/traverseCache");
  //deletes certain paths from traverseCache() result
  var ignoreFiles = require("loose-node-doc/src/util/ignore/ignoreFiles");
  //ignores names starting with given list item
  var ignoreObjects = require("loose-node-doc/src/util/ignore/ignoreObject");
  //resolve objct tree sources
  var resolveObjectDependencies = require("loose-node-doc/src/util/resolve/resolveObjectDependencies");
  //fetches code's own name
  var resolveCodeNames = require("loose-node-doc/src/util/resolve/resolveCodeNames");
  //tries to salvage comment block from files
  var resolveCodesFiles =require("loose-node-doc/src/util/resolve/resolveCodesFiles");
  //reads all the files from the cache tree of traverseCache()
  var loadAllRequiredFiles = require("loose-node-doc/src/util/IO/loadAllRequiredFiles");
  //locate where comments are in the files list, and stores them to the otree
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
  
  //path objects pair
  var obj_names = traverseObjectNames(object);
  obj_names = ignoreObjects(obj_names,this.options.ignore_objects);
  //traverses require cache and returns an array
  //{"path":{exports[names/codes],parent},...}
  var cache_tree = traverseCache();
  //removes files by pre defined array
  if(this.options.ignore_default_ignore_paths===true){
    cache_tree = ignoreFiles(cache_tree, this.options.default_ignore_paths);
  }
  //removes files by user defined array
  if(this.options.ignore_paths){
    cache_tree = ignoreFiles(cache_tree,this.options.ignore_paths);
  }
  //fs.writeFileSync("./build/tmp/obj_names.json",JSON.stringify(obj_names,null,"\t"));
  //fs.writeFileSync("./build/tmp/ctree.json",JSON.stringify(cache_tree,null,"\t"));
  //this file needs to be called directly
  var build_path = getBuildScriptPath();
  //traverses caches tree and resolve 
  //{"name":{path,exports[codes/objects]},...}
  var otree = resolveObjectDependencies(build_path,cache_tree,obj_names);
  //{"name":{path,exports[codes/objects],name},...}
  otree = resolveCodeNames(otree,obj_names);
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
 * logging method.
 */
LND.log = function(message){
  this.logs.push(message);
  if(this.options.verbose){
    console.log(message);
  }
}
/**
 * this file is meant to be called from build script.
 */
function getBuildScriptPath(){
  var trace = new Error().stack.split("\n")[3];
  //removing brackets
  trace = trace.substring(trace.indexOf("(")+1,trace.lastIndexOf(")"));
  //there arae two semi colons from the tail of the path
  //and there can be zero or one semi colons from head, depending on OS.
  trace = trace.substring(0,trace.lastIndexOf(":"));
  trace = trace.substring(0,trace.lastIndexOf(":"));
  return trace;
}

module.exports = LND;