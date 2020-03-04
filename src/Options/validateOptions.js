function validateOptions(object, LND) {
  var definition = require(__dirname + "/Options");
  var addition = {};
  //key existannce check
  for (var key in object) {
    if (!definition[key]) {
      notifyInvalidKey(key,LND);
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
        LND.log(
          LND.messages["option-wrong-datatype"](
            key,
            definition[key].data_type,
            typeof object[key]
          )
        );
        LND.log(LND.messages["proceed-with-default"](definition[key].default));
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
function notifyInvalidKey(key,LND) {
  LND.log(LND.messages["option-invalid-option-key"](key));
}

module.exports = validateOptions;
