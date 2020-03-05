var validateOptions = require("./src/Options/validateOptions");
//traverses down object tree and finds object information
var traverseObjectNames = require("loose-node-doc/src/util/traverse/traverseObjectNames");
//reads cache hisotry and returns its list
var traverseCache = require("loose-node-doc/src/util/traverse/traverseCache");
//deletes certain paths from traverseCache() result
var ignorePaths = require("loose-node-doc/src/util/ignore/ignorePaths");
//ignores names starting with given list item
var ignoreObjects = require("loose-node-doc/src/util/ignore/ignoreObject");
//resolve objct tree sources
var resolveObjectDependencies = require("loose-node-doc/src/util/resolve/resolveObjectDependencies");
//fetches code's own name
var resolveCodeNames = require("loose-node-doc/src/util/resolve/resolveCodeNames");
//tries to salvage comment block from files
var resolveCodesFiles = require("loose-node-doc/src/util/resolve/resolveCodeFiles");
//reads all the files from the cache tree of traverseCache()
var loadAllRequiredFiles = require("loose-node-doc/src/util/IO/loadAllRequiredFiles");
//locate where comments are in the files list, and stores them to the otree
var resolveComments = require("loose-node-doc/src/util/resolve/resolveComments");
var parseComments = require("./src/util/parse/parseComments");
var Console = require("./src/out/Console");
var checker = require("./src/checker");
var Writer = require("loose-node-doc/src/Writer");
/**
 * LND(loose-node-doc).
 */
function LND() {}
/**
 * Creates html document output.
 * @param {*} out_path
 * @param {object}
 */
LND.generate = function(object, options) {
  //initial values
  if (!options) options = {};
  this.options = { verbose: true };
  this.console = Console;
  this.writer = new Writer(getProjectRootDir(),this.console);
  //first of all, the system needs messages
  //anything that requires LND can now access LND.messages
  //initializing options(updating and checking)
  this.options = validateOptions(options, Console);
  //verbose,lang are updated.
  this.console.updateMessages(this.options);
  //notify that options are loaded.
  this.console.outMessage("process-options-loaded");
  //notify and quit  on undefined object.
  if (checker.checkObjectStatus(this.console, object)) {
    return; //quit
  }
  //path objects pair
  var obj_names = traverseObjectNames(object);
  var names_count = Object.keys(obj_names).length;
  checker.checkObjectNamesCount(this.console, names_count);

  //ignore object names by given ignore list
  obj_names = ignoreObjects(obj_names, this.options.ignore_objects);
  checker.checkIgnoredObjects(
    this.console,
    names_count - Object.keys(obj_names).length
  );

  //traverses require cache and returns an array
  //{"path":{exports[names/codes],parent},...}
  var cache_tree = traverseCache();
  checker.checkCacheTreeCounts(this.console,cache_tree);
  
  //removes files by pre defined paths array
  if (this.options.enable_default_ignore_paths === true) {
    var before = Object.keys(cache_tree).length;
    //console.log("default ignores:"+this.options.default_ignore_paths);
    cache_tree = ignorePaths(
      cache_tree,
      this.options.default_ignore_paths,
      getProjectRootDir()
    );
    checker.checkDefaultCacheTreeIgnoreCounts(this.console,before-Object.keys(cache_tree).length);
  }
  
  //removes files by user defined array
  if (this.options.ignore_paths) {
    var before = Object.keys(cache_tree).length;
    cache_tree = ignorePaths(
      cache_tree,
      this.options.ignore_paths,
      getProjectRootDir()
    );
    var ignored_num = before - Object.keys(cache_tree).length;
    checker.checkCacheTreeIgnoreCounts(this.console,ignored_num);
  }

  //this file needs to be called directly
  var build_path = getBuildScriptPath();
  //traverses caches tree and resolve
  //{"name":{path,exports[codes/objects]},...}
  var otree = resolveObjectDependencies(build_path, cache_tree, obj_names);

  //{"name":{path,exports[codes/objects],name},...}
  otree = resolveCodeNames(otree, obj_names);

  //update otree with position and filename
  var all_files = loadAllRequiredFiles(cache_tree);

  otree = resolveCodesFiles(otree, all_files);
  otree = resolveComments(otree, all_files);
  otree = parseComments(otree);
  //notify user about the nnumber of resolved comments
  checker.checkResolvedComments(this.console,otree);
  //write datas if needed.
  this.writer.writeOtree(options,otree);
  this.writer.writeLog(options,this.console.logs);
};
/**
 * this file is meant to be called from build script.
 */
function getBuildScriptPath() {
  var trace = new Error().stack.split("\n")[3];
  //removing brackets
  trace = trace.substring(trace.indexOf("(") + 1, trace.lastIndexOf(")"));
  //there arae two semi colons from the tail of the path
  //and there can be zero or one semi colons from head, depending on OS.
  trace = trace.substring(0, trace.lastIndexOf(":"));
  trace = trace.substring(0, trace.lastIndexOf(":"));
  return trace;
}
/**
 * returns root project folder name.
 * does not end with directory separator.
 * @return {string} dir_name
 */
function getProjectRootDir() {
  //isnt always guaranteed to be node_modules
  var path = __dirname;
  var sep = require("path").sep;
  path = path.split(sep);
  path.pop();
  path.pop();
  path = path.join(sep);
  return path;
}

module.exports = LND;