module.exports = function(objects, ignores) {
  var ret = {};
  for (var i in objects) {
    //console.log("ignoreObject i:"+i+"");
    var ignore = false;
    for (var k in ignores) {
      if (objects[i].tree_name.startsWith(ignores[k])) {
        ignore = true;
      }
    }
    if (!ignore) {
      ret[i] = objects[i];
    }
  }
  return ret;
};
