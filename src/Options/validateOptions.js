function validateOptions(object,LND){
  var definition =require(__dirname+"/Options");
  var addition = {};
  for(var key in definition){
    //key exists
    if(object[key]){
      var val = object[key];
      if(typeof val !== definition[key].data_type){
        LND.log(LND.messages["option-wrong-datatype"](key,definition[key].data_type,typeof val));
        LND.log(LND.messages["proceed-with-default"](definition[key].default));
      }
    }else{
      //key is missing. substituting default
      addition[key] = definition[key].default;
    }
  }
  return Object.assign(object,addition);
}

module.exports = validateOptions;