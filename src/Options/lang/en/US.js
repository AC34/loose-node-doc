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
    return "Unknown option key of ["+given_key+"] was given. There is no such option available. This key will be ignored during the process.";
  },
  "option-wrong-datatype":function(option_key,expected_type,actual_type){
    return "Option ["+option_key+"] expects data type of ["+expected_type+"]. However, ["+actual_type+"] was given."; 
  },
  "empty-object":function(){
    return "An empty object was given.";
  },
  "proceed-with-default":function(value){
    if(typeof value==="object")value = JSON.stringify(value);
    return "Continuing process with default value ["+value+"].";
  },
  "empty-cache":function(){
    return "Traversed cache and found zero files loaded.";
  },
  "object_names_empty":function(){
    return "Could not find any object names.";
  },
  "zero-comments-resolved":function(){
    return "Zero comments resolved.";
  },
  /**
   * process notifications.
   */
  "process-stopped":function(){
    return "loose-node-doc process stopped.";
  },
  "process-options-loaded":function(){
    return "options loaded.";
  },
  "process-object-loaded":function(){
    return "object loaded.";
  },
  "process-object-names-loaded":function(number_of_keys){
    return "["+number_of_keys+"] of object names loaded.";
  },
  "process-ignored-object-names":function(number_of_keys){
    return "Ignored object names. Proceeding with ["+number_of_keys+"] keys.";
  },
  "process-traversed-caches":function(number_of_files){
    return "Traversed cache and found ["+number_of_files+"] files loaded.";
  },
  "process-ignored-objects":function(ignored){
    return "["+ignored+"] object names ignored.";
  },
  "process-ignored-paths":function(number_of_ignoreds){
    return "Ignored ["+number_of_ignoreds+"] paths from loaded caches.";
  },
  "process-resolved-comments":function(num){
    return "Resolved ["+num+"] comments.";
  }
}
