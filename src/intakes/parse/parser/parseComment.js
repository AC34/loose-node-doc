/**
 * All spaces,@,/,* are removed.
 * Anything before first @ is stored at index of 0.
 * Any types are an array.
 * variable name will be name:<name> and any comment after
 * returns an empty objet on emty comment and failed parses.
 * @param {string} comment_string
 * @return {object}
 */
function parseComment(comment_string) {
  var lines = comment_string.split("\n");
  comment_tree = parseLines(lines);
  return comment_tree;
}
/**
 * parses line by line
 * c_index meaning items starting with atmark.
 * @param {array} lines
 * @param {object} c_tree
 */
function parseLines(lines, c_tree = {}, c_index = 0) {
  //end on undefined
  if (!lines[0]) return c_tree;
  //trim the line
  var line = trim(lines.shift());
  //avoid trimmed empty line
  if (line === "") return parseLines(lines, c_tree, c_index);
  //updating index (only when needed by the line)
  c_index = resolveC_Index(line, c_index);
  if (!c_tree[c_index] && c_index > 0) c_tree[c_index] = {}; //initialize object
  //update initial description (only when index=0)
  if (c_index === 0) {
    if (!c_tree[c_index]) c_tree[c_index] = "";
    c_tree[c_index] += line + "\n";
    return parseLines(lines, c_tree, c_index); //proceed
  }
  //resolve tag (on index incrementation)
  if (Object.keys(c_tree[c_index]).length === 0) {
    if (line.indexOf("@") === 0) var sp_pos = line.indexOf(" ");
    if (sp_pos === -1) {
      c_tree[c_index].tag = line.substring(1, line.length); //all line
    } else {
      c_tree[c_index].tag = line.substring(1, line.indexOf(" ")); //tag only
    }
  }
  //update c_tree by parsing it
  c_tree = parseLine(line, c_tree, c_index);
  //proceed
  return parseLines(lines, c_tree, c_index);
}
/**
 * ignores unnecessary strings
 * @param {string} str
 */
function trim(str) {
  var ignores = ["/", " ", "*"];
  var before = str;
  str = str.replace(/\r/g, "");
  str = str.replace(/\n/g, "");
  for (var i in ignores) {
    if (str.indexOf(ignores[i]) === 0) str = str.substring(1, str.length);
    if (str.lastIndexOf(ignores[i]) === str.length - ignores[i].length)
      str = str.substring(0, str.length - 1);
  }
  //repeat on demand
  return str !== before ? trim(str) : str;
}
function resolveC_Index(line, c_index) {
  var at = "";
  if (line.indexOf("@") === 0) {
    at = line.substring(line.indexOf("@") + 1, line.indexOf(" "));
  }
  //parser is still at parsing initial description lines.
  if (at === "" && c_index === 0) {
    return c_index;
  }
  //if parser had previous at_item parsed, its not looking at initial description lines anymore. this line should belong to previous line. Meaning no new creation of at_item.
  if (at === "" && c_index > 0) {
    return c_index;
  }
  //parser is introduced to new line, starting with atmark.
  //increment
  if (at !== "") {
    return c_index + 1;
  }
}
/**
 *
 * @param {string} line
 */
function parseLine(line, c_tree, c_index) {
  //There is a chance of next line being description of previous @ definition(roughly saying). Anything else is under the initial description.
  var el = line.split(" ");
  //shift tag
  var tagline = false;
  if (el[0].startsWith("@")) {
    el.shift();
    tagline = true;
  }
  if (el.length === 0) return c_tree;
  //moving on to next block.
  if (isBlockDataTypes(el[0])) {
    //is data type. then shift.
    c_tree[c_index].types = fetchDataTypes(el[0]).toString();
    if (!el[1]) return c_tree; //somehow user forgot to add more info
    el.shift();
    //name can come after datatype
    //yet there can be an empty block
    if (!c_tree[c_index].name && el[0]) {
      //treat as name ,then shift
      c_tree[c_index].name = el[0];
      if (!el[1]) return c_tree;
      el.shift();
    }
  } else {
    //if there is only one clause after @, then  it should be treated as a name
    if (!c_tree[c_index].name && el.length === 1 && tagline === true) {
      //treat as name ,then shift
      c_tree[c_index].name = el[0];
      if (!el[1]) return c_tree;
      el.shift();
    }
  }
  //abort on end
  if (el.length === 0) return c_tree;
  //meaning rest is description
  if (!c_tree[c_index].description) c_tree[c_index].description = "";
  c_tree[c_index].description += el.join(" ")+"\n";
  return c_tree;
}
/**
 * @param {string} suspect
 * @return {boolean}
 */
function isBlockDataTypes(suspect) {
  if (
    suspect.indexOf("{") === 0 &&
    suspect.indexOf("}") === suspect.length - 1
  ) {
    return true;
  } else {
    return false;
  }
}
/**
 * @param {string} d_block
 * @return {array}
 */
function fetchDataTypes(d_block) {
  d_block = d_block.substring(1, d_block.length - 1);
  if (d_block.indexOf("|") > -1) {
    return d_block.split("|");
  } else {
    return new Array(d_block).toString();
  }
}
module.exports = parseComment;