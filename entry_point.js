/**
 * LND(loose-node-doc).
 */
var LND = {
  //for autocompletion of langauge choices
  langs: require("loose-node-doc/src/outputs/lang/langs_list"),
  //for autocompletion of option keys
  option_keys: require("loose-node-doc/src/options/option_keys")
};
/**
 * Creates html document output.
 * @param {object} app_root_object
 * @param {object} options
 */
LND.generate = function(object, options = {}) {
  //subsections and notifieers of main process
  var processInterfaces = require("loose-node-doc/src/processInterfaces");
  //"verbose:true" is required when validating options.
  this.options = { verbose: true };
  //first of all, the system needs messages for anything.
  //initializing and updatse options(overriding blanks with default and checking types)
  this.options = processInterfaces.validateOptions(options);
  //[verbose,lang] are updated.
  //now messages can be fully loaded.
  processInterfaces.console.updateMessages(this.options);
  //notify continue or quit on undefined object.
  processInterfaces.checkObjectStatus(object);
  /**
   * From here is the main process.
   */
  /**
   * list up all the object names
   */
  //worst scenario is that return could be an empty object.
  var obj_names = processInterfaces.listObjectNames(object);
  //ignore object by user defined ignore_objects option.
  obj_names = processInterfaces.ignoreObjectNames(
    obj_names,
    this.options.ignore_objects
  );
  /**
   * traverses require cache and returns an array
   */
  //{"path":{exports[names/codes],parent},...}
  var cache_tree = processInterfaces.listCacheTree();
  //removes paths by pre-defined sets
  //works only enable_default_ignore_paths is true
  cache_tree = processInterfaces.ignoreCTreeByDefault(
    cache_tree,
    this.options,
    getProjectRootDir()
  );
  //removes paths by user defined paths array
  cache_tree = processInterfaces.ignoreCTreeByUserDefinition(
    cache_tree,
    this.options,
    getProjectRootDir()
  );
  /**
   * Now the project is traversed by object itself and require cache.
   * Next step is to combine those informations into one tree information.
   */
  var otree = processInterfaces.resolveObjectTree(
    getBuildScriptPath(),
    obj_names,
    cache_tree
  );
  //notify user about the number of resolved comments
  processInterfaces.notifyResolvedCommentsCount(otree);

  //write datas on demand.
  processInterfaces.writeObjectTree(getProjectRootDir(), this.options, otree);
  processInterfaces.writeLogs(getProjectRootDir(), this.options);

  //end of the whole process.
};
/**
 * this file is meant to be called from build script.
 * !!build script path !== project root dir!!
 * @return {string} build_script_path
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
 * !!build script path !== project root dir!!
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
