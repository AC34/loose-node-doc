function validateOptions(object, Console) {
  var definition = require(__dirname + "/Options");
  var addition = {};
  //key existance check
  for (var key in object) {
    var target = undefined;
    //single level
    if(key.indexOf(".")===-1){
      target = definition[key].default;   
    }else{
      var levels = key.split(".");
      target = definition[levels[0]].default[levels[1]];
    }
    if (typeof target==="undefined") {
      Console.outMessage("option-invalid-option-key",{"key":key});
      continue;
    }
  }
  for (var key in definition) {
    //key exists
    if (object[key] !== undefined) {
      var type = typeof object[key];
      //type checks
      if(Array.isArray(object[key]))type="array";
      //other types
      if (type !== definition[key].data_type) {
        Console.outMessage("option-wrong-datatype",{"key":key,"expected":definition[key].data_type,"actual":typeof object[key]});
        Console.outMessage("proceed-with-default",{"value":definition[key].default})
        //assigning default value
        addition[key] = definition[key].default;
      } else {
        //leaving element as is
      }
    } else {
      //key is missing. substituting default
      addition[key] = definition[key].default;
    }
  } //for in definition
  var ret = Object.assign(object, addition);
  return ret;
}

module.exports = validateOptions;