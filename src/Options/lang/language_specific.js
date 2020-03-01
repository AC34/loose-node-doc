/**
 * messages here cannot be translated.
 */
var langauge_specific_messages = {
  /**
   * @param {*} given_type 
   */
  "illega-tag-type":function(given_type){
    return "Illegal [lang] tag. Expecting [string] but ["+given_type+"] was given." 
  },
  /**
   * @param {string} given_tag 
   */
  "illegal-lang-tag-format"(given_tag){
    return "Illegal argument for [lang] value. There is soemthing wrong with given value ["+given_tag +"]";
  },
  /**
   * @param {string} unsupported_code 
   */
  "unsupported-language-code":function(unsupported_code){
    return "Unsupported language code ["+unsupported_code+"] was given.";
  },
  /**
   * @param {string} unsupported_code 
   */
  "unsupported-country-code":function(unsupported_code){
    return "Unsupported country code ["+unsupported_code+"] was given";
  },
  "proceed-with-default-language":function(){
    return "proceeding with default language setting(en_US)."
  },
}
module.exports = langauge_specific_messages;