/**
 * Functions defined here are subsections of main process.
 * This object is responsible for:
 *  Substitution:processing main process parts.
 *  Notification:logging how the process is processed.
 * This object is not reponsible for:
 *  Main process flow:cotrolling which parts are called and when.
 *  Validation on options: checking option keys and values and its types.
 */
var processMediator = {
  console: require("./outputs/Console"),
  /**
   * @param {object} object
   */
  validateOptions: function(object) {
    var validate = require("./Options/validateOptions");
    return validate(object, this.console);
  },
  /**
   * Quits the system if the object is undefined.
   * @param {object} object
   */
  checkObjectStatus: function(object) {
    if (!object) {
      this.console.outMessage("empty-object");
      this.console.outMessage("process-stopped");
      process.exit();
    }
    //Otherwise notify that object has been loaded
    this.console.outMessage("process-object-loaded");
  },
  /**
   * @return {object} obj_names
   */
  listObjectNames: function(object) {
    //prepare
    var traverseObjectNames = require("./intakes/traverse/traverseObjectNames");
    //returns path objects pair
    var obj_names = traverseObjectNames(object);
    var names_count = Object.keys(obj_names).length;
    if (names_count === 0) {
      //notify that no names have been found
      this.console.outMessage("object-names-empty");
      this.console.outMessage("process-stopped");
    } else {
      //notify how many object names have been found
      this.console.outMessage("process-object-names-loaded", {
        number_of_keys: names_count
      });
    }
    return obj_names;
  },
  /**
   * Ignores given names.
   * returns obj_names anyway.
   * @param {*} obj_names
   * @param {array} ignore_objects given by user
   * @return {object} obj_names
   */
  ignoreObjectNames: function(obj_names, ignores) {
    //prepare
    var ignoreObject = require("./arrange/ignore/ignoreObject");
    //ignore
    var before = Object.keys(obj_names).length;
    obj_names = ignoreObject(obj_names, ignores);
    var after = Object.keys(obj_names).length;
    if (before - after > 0) {
      //Notify ignored counts
      this.console.outMessage("process-ignored-objects", {
        ignored_amount: before - after
      });
    } else {
      //Don't notify on 0 ignores.
    }
    return obj_names;
  },
  /**
   * Traverses up cache list and makes tree out of it.
   * @return {object} cache_tree
   */
  listCacheTree: function() {
    //prepare
    var traverseC = require("./intakes/traverse/traverseCache");
    //do traverse
    //returns {"path":{exports[names/codes],parent},...}
    var c_tree = traverseC();
    var count = Object.keys(c_tree).length;
    if (count === 0) {
      //notify no cache were available
      this.console.outMessage("empty-cache", {});
      this.console.outMessage("process-stopped", {});
    } else {
      //notify the number of keys(paths)
      this.console.outMessage("process-traversed-caches", {
        number_of_caches: count
      });
    }
    return c_tree;
  },
  /**
   * @param {object} cache_tree
   * @param {object} options
   * @param {object} ProjectInfo
   * @return {object} cache_tree
   */
  ignoreCTreeByDefault: function(cache_tree, options, ProjectInfo) {
    //only on true
    if (options.enable_default_ignore_paths !== true) return cache_tree;
    //prepare
    var ignorePaths = require("./arrange/ignore/ignorePaths");
    //add build script path to
    var ignores = [
      //"loose-node-doc" entry_point file
      ProjectInfo.entry_point_path,
      //"loose-node-doc" dir
      ProjectInfo.entry_point_dir,
      //"node_modules" for most of the time
      require("path").dirname(ProjectInfo.entry_point_dir),
      //build script itself
      ProjectInfo.build_script_path
    ];
    //do ignore
    var before = Object.keys(cache_tree).length;
    cache_tree = ignorePaths(
      cache_tree,
      ignores,
      ProjectInfo.project_root_dir
    );
    var after = Object.keys(cache_tree).length;
    //notify
    if (before - after > 0) {
      this.console.outMessage("process-ignored-default-paths", {
        ignored_amount: before - after
      });
    } else {
      //do not notify on zero ignoreds.
    }
    return cache_tree;
  },
  /**
   * by ignore_paths by user option.
   * @param {object} cache_tree
   * @param {object} options
   * @param {object} ProjectInfo
   * @retur {object} cache_tree
   */
  ignoreCTreeByUserDefinition: function(cache_tree, options, ProjectInfo) {
    //avoid empty list
    if (options.ignore_paths.length === 0) return cache_tree;
    //prepare
    var ignorePaths = require("./arrange/ignore/ignorePaths");
    //do ignore
    var before = Object.keys(cache_tree).length;
    cache_tree = ignorePaths(
      cache_tree,
      options.ignore_paths,
      ProjectInfo.project_root_dir
    );
    var after = before - Object.keys(cache_tree).length;
    //notify
    if (before - after > 0) {
      this.console.outMessage("process-ignored-paths", {
        ignored_amount: before - after
      });
    } else {
      //do not notify on zero ignoreds.
    }
    return cache_tree;
  },
  /**
   * @param {object} ProjectInfo 
   * @param {object} obj_names 
   * @param {object} cache_tree 
   * @return {object} object_tree
   */
  resolveObjectTree: function(ProjectInfo, obj_names, cache_tree) {
    //prepare
    var resolveObjectDependencies = require("./intakes/resolve/resolveObjectDependencies");
    var resolveCodeNames = require("./intakes/resolve/resolveCodeNames");
    //traverses caches tree and transform tree as:
    //{"name":{path,exports[codes/objects],children[array]},...}
    var otree = resolveObjectDependencies( cache_tree, obj_names);
    //{"name":{path,exports[codes/objects],name},...}
    otree = resolveCodeNames(otree, obj_names);
    return otree;
  },
  parseComments:function(otree,cache_tree,project_info){
    var loadAllRequiredFiles = require("./intakes/IO/loadAllRequiredFiles");
    var resolveCodesFiles = require("./intakes/resolve/resolveCodeFiles");
    var resolveComments = require("./intakes/resolve/resolveFunctionComments");
    var parseComments = require("./intakes/parse/parseComments");
    var parseCommentsByTag = require("./intakes/resolve/resolveCommentsByTag");
    //load all files from cache tree({path:content,...})
    var all_files = loadAllRequiredFiles(cache_tree);
    //children of type "function" now has .path(strinng) and pos attributes(number)
    otree = resolveCodesFiles(otree, all_files);
    //"funtion" comments are read and added, as string.
    otree = resolveComments(otree, all_files);
    //now add options.trail_tag comments (not overriding already parsed function comments)
    otree = parseCommentsByTag(otree,all_files,project_info.trail_tag);
    //"function" commenets are parsed and now object.
    otree = parseComments(otree);
    return otree;
  },
  /**
   * Counts valid comment objects in otree.
   * Then notifies about it.
   * @param {*} otree
   */
  notifyResolvedCommentsCount: function(otree) {
    var counter = require("./interfaces/util/countOtreeComments");
    var count = counter(otree);
    if (count === 0) {
      this.console.outMessage("zero-comments-resolved");
    } else {
      this.console.outMessage("process-resolved-comments", { num: count });
    }
  },
  /**
   * @param {string} html 
   * @param {object} options 
   * @param {object} ProjectInfo 
   */
  makeHtmlPage:function(otree,options,ProjectInfo){
    //prepare
    var toHtml = require("./arrange/html/otreeToHtml");
    var createPage = require("./arrange/html_page/createPage");
    //convert
    var html = toHtml(otree,options,ProjectInfo);
    var page = createPage(html,options,ProjectInfo);
    //notify
    this.console.outMessage("process-html-template-created",{theme_name:options.html_template_name}); 
    return page;
  },
  writeHtmlPage:function(html,options,ProjectInfo){
    var FileWriter = require("./outputs/FileWriter");
    var writer = new FileWriter(ProjectInfo.project_root_dir);
    var html_file = writer.getAbsolutePath(options.html_path); 
    var copyAssets = require("./arrange/html_page/util/copyAssets");
    html_file = writer.replaceVersionPattern(html_file,ProjectInfo);
    var success = writer.writeHtml(html_file,html);
    copyAssets(ProjectInfo,options);
    var html_path = options.html_path.replace(new RegExp("@version"),ProjectInfo.package_json.version);
    //notify
    if(success){
      this.console.outMessage("process-write-html-success",{path:html_path});
    }else{
      this.console.outMessage("process-write-html-failure",{path:html_path});
    }
  },
  /**
   * 
   * @param {object} ProjectInfo 
   * @param {object} options 
   * @param {object} otree 
   */
  writeObjectTree: function(ProjectInfo, options, otree) {
    var FileWriter = require("./outputs/FileWriter");
    var toRelative = require("./outputs/filter/otreeToRelativePaths");
    writer = new FileWriter(ProjectInfo.project_root_dir);
    //not writing
    if (!options.write_object_tree) return;
    if (options.write_object_tree === false) return;
    //prepare
    var file_path = writer.getAbsolutePath(options.object_tree_path);
    //not writable then notify.
    if (!writer.isWritablePath(file_path)) {
      this.console.outMessage("process-invalid-object-tree-path", {
        path: options.object_tree_path
      });
    }
    //convert absolute paths to relative paths
    otree = toRelative(otree,ProjectInfo.project_root_dir);
    //write
    var result = writer.writeObject(file_path, otree);
    if (result === true) {
      this.console.outMessage("process-write-file-success", {
        path: options.object_tree_path 
      });
    } else {
      //error string is returned
      this.console.outMessage("process-error-on-writing-file", {
        path: options.object_tree_path,
        error: result
      });
    }
  },
  /**
   * 
   * @param {object} ProjectInfo 
   * @param {object} options 
   */
  writeLogs: function(ProjectInfo, options) {
    //prepare
    var log_array = this.console.logs;
    var FileWriter = require("./outputs/FileWriter");
    writer = new FileWriter(ProjectInfo.project_root_dir);
    //not writing
    if (!options.write_logs) return;
    if (options.write_logs === false) return;
    var log_path = writer.getAbsolutePath(options.log_path);
    //not writable then notify.
    if (!writer.isWritablePath(log_path)) {
      this.console.outMessage("process-invalid-log-path", {
        path: options.log_path
      });
    }
    //write
    var result = writer.writeLogs(log_path, log_array);
    if (result === true) {
      this.console.outMessage("process-write-file-success", { path: log_path });
    } else {
      //error string is returned
      this.console.outMessage("process-error-on-writing-file", {
        path: log_path,
        error: result
      });
    }
  }
};

module.exports = processMediator;