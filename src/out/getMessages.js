/**
 * tries to fetch language file.
 * returns default(en-US) when anything goes wrong.
 * @param {string} lang
 * @return {object} language object
 */
function getMessages(lang,Console) {
  var en_US = require(__dirname+"/lang/en/US");
  var lang_s = require(__dirname+"/lang/language_specific");
  //not type of string
  if (typeof lang !== "string") {
    Console.outAny(lang_s["illegal-tag-type"](typeof lang));
    Console.outAny(lang_s["proceed-with-default-language"]());
    return en_US;
  }
  //wrong underscore position
  if (lang.indexOf("_") !== 2) {
    Console.outAny(lang_s["illegal-lang-tag-format"](lang));
    Console.outAny(lang_s["proceed-with-default-language"](typeof lang));
    return en_US;
  }
  var lang_code = lang.split("_")[0];
  var country_code = lang.split("_")[1];
  if (!supportsLanguage(lang_code)) {
    Console.outAny(lang_s["unsupported-language-code"](lang_code));
    Console.outAny(lang_s["proceed-with-default-language"](typeof lang));
    return en_US;
  }
  if(!supportsCountry(lang_code,country_code)){
    Console.outAny(lang_s["unsupported-country-code"](country_code));
    Console.outAny(lang_s["proceed-with-default-language"](typeof lang));
    Console.log("unsupported country");
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
