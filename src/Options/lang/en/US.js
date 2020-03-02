/**
 * keys must be in lowercase.
 * @common-messages can be translated.
 * @language-related-messages will be ignored even if translated.
 */
module.exports = {
  /**
   * @common-messages
   */
  "option-invalid-option-key":function(given_key){
    return "Option key of ["+given_key+"] does not exist. There is no such option available.";
  },
  "option-wrong-datatype":function(option_key,expected_type,actual_type){
    return "Option ["+option_key+"] expects data type of ["+expected_type+"]. However, ["+actual_type+"] was given."; 
  },
  "empty-object":function(){
    return "An empty object was given.";
  },
  "process-stopped":function(){
    return "loose-node-doc process stopped.";
  },
  "proceed-with-default":function(value){
    if(typeof value==="object")value = JSON.stringify(value);
    return "Continuing process with ["+value+"]";
  }
}
