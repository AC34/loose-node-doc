/**
 * class name should be changed.
 * .start() to start recording.
 * .stop() to stop recording.
 * .dumpByPaths(array) for fetching.
 * @param {array} module_paths
 */
function TraverseModuleTree() {}
TraverseModuleTree.prototype.start = function() {
  var mod = require("module");
  this.original_req = mod.prototype.require;
  var custom_req = mod.prototype.require;
  if(!global.module_tree)global.module_tree = [];
  //override require function and creates module_tree[]
  mod.prototype.require = function(path) {
    if (typeof this.exports === "function") {
      var item = {};
      item.exports = this.exports.toString();
      var traces = new Error().stack.split("\n");
      var trace = traces[3];
      console.log("trace:" + trace);
      item.filename = this.filename;
      var required = trace.substring(
        trace.indexOf("(") + 3,
        trace.indexOf(")")
      );
      required = required.slice(0, required.lastIndexOf(":"));
      var line = required.substring(
        required.lastIndexOf(":") + 1,
        required.length
      );
      required = required.slice(0, required.lastIndexOf(":"));
      //abort on this script
      if (__filename === required) return original.apply(this, arguments);
      item.required_from = required;
      item.required_line = line;
      module_tree.push(item);
    }
    return custom_req.apply(this, arguments);
  };
};
TraverseModuleTree.prototype.dump = function() {
  return global.module_tree;
};
TraverseModuleTree.prototype.stop = function() {
  require("module").require = this.original_req;
};
TraverseModuleTree.prototype.clear = function() {
  global.module_tree = [];
};
module.exports = TraverseModuleTree;
