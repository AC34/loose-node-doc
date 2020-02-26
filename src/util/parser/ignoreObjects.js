module.exports = function(objects,ignores){
  var ret = {};
  ;
  for(var i in objects){
    var ignore = false;
    for(var k in ignores){
      if(i.startsWith(ignores[k]))ignore = true;
    }
    if(!ignore){
      ret[i] = objects[i];
    }
  }
  return ret;
}