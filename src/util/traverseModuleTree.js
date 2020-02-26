/**
 * uses global.module_tree for storage.
 * do require.cache = {}; to stop updating the tree.
 * after stopping, global.module_tree can be deleted.
 * @param {string} module_path 
 */
function traverseModuleTree() {
  var mod = require("module");
  var original = mod.prototype.require;
  global.module_tree = [];
  //oerride require function and creates module_tree[]
  mod.prototype.require = function(path) {
    //console.log("exports:"+this.exports);
    var item = {};
    console.log("this keys:"+JSON.stringify(Object.keys(this)));
    console.log("id:"+this.id);
    console.log("exports"+JSON.stringify(this.exports));
    if(this.exports){
      item.exports = typeof this.exports ==="function"?this.exports.toString():this.exports;
    }
    var trace = new Error().stack.split("\n");
    //console.log("traces:"+trace);
    if (trace !== undefined) {
      trace = trace[3];
      for (var i in this.children) {
        //console.log("this children[" + i + "]:" + this.children[i].require);
      }
      //console.log("trace:" + trace);
      item.filename = this.filename;
      var required = trace.substring(
        trace.indexOf("(") + 3,
        trace.indexOf(")")
      );
      var col = required.substring(
        required.lastIndexOf(":") + 1,
        required.length
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
      item.required_col = col;
    }
    global.module_tree.push(item);
    return original.apply(this, arguments);
  };
}

module.exports = traverseModuleTree;
