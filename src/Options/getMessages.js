/**
 * tries to fetch language file.
 * returns default(en-US) when anything goes wrong.
 * @param {string} lang_tag
 * @return {object} language object
 */
function getMessages(options, LND) {
  var lang_tag = options.lang?options.lang:"en_US";
  var en_US = require(__dirname+"/lang/en/US");
  var lang_s = require(__dirname+"/lang/language_specific");
  //not type of string
  if (typeof lang_tag !== "string") {
    LND.log(lang_s["illega-tag-type"](typeof lang_tag));
    LND.log(lang_s["proceed-with-default-language"]());
    console.log("wrong type tag");
    return en_US;
  }
  //check variables
  if (lang_tag.indexOf("_") !== 2) {
    LND.log(lang_s["illegal-lang-tag-format"](lang_tag));
    LND.log(lang_s["proceed-with-default-language"](typeof lang_tag));
    console.log("missing underscore");
    return en_US;
  }
  var lang_code = lang_tag.split("_")[0];
  var country_code = lang_tag.split("_")[1];
  if (!supportsLanguage(lang_code)) {
    LND.log(lang_s["unsupported-language-code"](lang_code));
    LND.log(lang_s["proceed-with-default-language"](typeof lang_tag));
    return en_US;
  }
  if(!supportsCountry(lang_code,country_code)){
    LND.log(lang_s["unsupported-country-code"](country_code));
    LND.log(lang_s["proceed-with-default-language"](typeof lang_tag));
    console.log("unsupported country");
    return en_US;
  }
  //Even if anything fails here, its not recoverable by this file, anything should be recovered before releasing.
  var path = __dirname+"/lang/"+lang_code+"/"+country_code+".js";
  var sep = require("path").sep;
  path = path.replace(/\//g,sep);
  return require(path);
}
/**
 * checks directory
 * @param {string} country
 * @return {boolean}
 */
function supportsLanguage(language) {
  var path = __dirname+"/lang/" + language+ "/";
  return require("fs")
    .existsSync(path);
}
/**
 * checks file existance
 */
function supportsCountry(language, country) {
  var path = __dirname+"/lang/" + language + "/" + country+".js";
  return require("fs").existsSync(path);
}
module.exports = getMessages;
