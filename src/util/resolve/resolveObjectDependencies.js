/**
 * reconstruts path tree to object tree.
 * @param {object} cache_tree result of traverseCache.js
 * @return {object} merged tree
 */
function resolveObjectDependencies(cache_tree, obj_names) {
  var tree_names = listTreeNames(obj_names);
  console.log("tree_names"+tree_names);
  //adds parent and childeren infos
  var root_obj = constructRootObject(cache_tree);
  //reconstruct tree from its roots
  var tree = startReconstruction(root_obj, cache_tree,tree_names);
  return tree;
}
/**
 * Merges merges root
 * @param {object} caches
 */
function constructRootObject(caches) {
  var root_obj = {};
  var sources = [];
  var children = [];
  var exports = {};
  for (var path in caches) {
    if (caches[path].parent === undefined) {
      //at this point there are multiple entries that doesn't have parent path.
      sources.push(path);
      if (caches[path].children) {
        children = children.concat(caches[path].children);
      }
      if (caches[path].exports) {
        exports = Object.assign(caches[path].exports);
      }
    }
  }
  root_obj.sources = sources;
  root_obj.children = children;
  root_obj.exports = exports;
  return root_obj;
}
/**
 * @param {object} root_obj
 * @param {object} caches
 * @param {array} tree_names a list of usable nested object names
 */
function startReconstruction(root_obj, caches,tree_names) {
  //console.log("root_obj"+JSON.stringify(root_obj));
  var tree = {};
  console.log("root paths:" + JSON.stringify(root_obj.sources, null, "\t"));
  for (var i in root_obj.sources) {
    var source = root_obj.sources[i];
    var children = root_obj.children;
    //for (var k in children) {
    //  tree = Object.assign(tree, traverseExports("", source, children[k],caches, tree));
    //}
    //for(var ex in root_obj.exports){
    tree = Object.assign(tree, traverseExports("", source, caches, tree,tree_names));
    //}
  }
  return tree;
}
/**
 * tree{path_string:{path:other}}
 * @param {string} prefix
 * @param {array} parent_candidates
 * @param {object} caches
 * @param {object} tree
 * @param {array} tree_names
 */
function traverseExports(prefix, parent_path, caches, tree,tree_names) {
  var item = caches[parent_path];
  for (var key in item.exports) {
    var new_prefix = prefix !== "" ? prefix + "." + key : key;
    //Proceed if such pattern of name exists.
    console.log(new_prefix+":exists:"+tree_names.includes(new_prefix));
    if(!tree_names.includes(new_prefix))continue;
    //console.log("prefix:" + new_prefix);
    var ex = item.exports[key];
    if (typeof ex === "object") {
      //no children then ignore
      var children = item.children;
      if (!children) continue;
      for (var i in children) {
        if (caches[children[i]]) {
          tree = Object.assign(
            tree,
            traverseExports(new_prefix, children[i], caches, tree,tree_names));
        }
      }
    } else {
      //ex is either value or function
      tree[new_prefix] = {};
      //var cpath = resolveChildPath(parent_path, caches);
      //if(cpath!==false){
      //  tree[new_prefix].path = resolveChildPath(parent_path,caches);
      //}
      if (typeof ex === "function") {
        tree[new_prefix].exports = ex.toString(); //function
      } else {
        tree[new_prefix].exports = ex; //value
      }
    }
  }
  return tree;
}
/**
 * extracts tree_names and returns as an array.
 * @param {object} obj_names 
 * @return {array} tree_names
 */
function listTreeNames(obj_names){
  var list = [];
  for(var i in obj_names){
    if(obj_names[i].tree_name){
      list.push(obj_names[i].tree_name);
    }
  }
  return list;
}
module.exports = resolveObjectDependencies;