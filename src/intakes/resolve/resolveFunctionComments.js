/**
 * tries to extract comments from given files. function positions needs to be told by resolveComments.js
 * empty strings are stored on failures.
 * @param {object} tree
 * @param {array} files
 */
function resolveFunctionComments(otree, files) {
  //create path based object
  var func_locs = locateFunctionPositions(otree);
  func_locs = extractComments(func_locs, files);
  return updateObjectTree(otree, func_locs);
}
/**
 * returns {filepath:{positions:[],names:[],comments:[]}}
 * indexes of positions and names properties are identical to each other. comments must follow those indexes.
 * @param {object} otree
 * @return {object} func_locs
 */
function locateFunctionPositions(otree) {
  var ret = {};
  for (var name in otree) {
    if (otree[name].type === "function") {
      //initialize
      var filename = otree[name].filename;
      var item = ret[filename] ? ret[filename] : {};
      if (!item.positions) item.positions = [];
      if (!item.names) item.names = [];
      if (!item.comments) item.comments = [];
      //assert substitute
      item.positions.push(otree[name].pos);
      item.names.push(name);
      //every commment(n = number of functinons) is initially an empty string
      //comments indexes also must meet indexes of .positions and .names.
      item.comments.push("");
      ret[filename] = item;
      //console.log("adding func_doc name:"+filename);
      //console.log("pos:"+item.positions);
    }
  }
  return ret;
}
/**
 *
 * @param {object} func_locs of locateFunctionPositions()
 * @param {array} files
 * @return {object} func_locs
 */
function extractComments(func_locs, files) {
  for (var path in func_locs) {
    var c_positions = locateComments(files[path], []);
    func_locs[path].comments = matchCommentsAndFunctions(
      func_locs[path].positions,
      c_positions,
      files[path]
    );
  }
  return func_locs;
}
/**
 *
 * @param {} str
 * @param {array} positions
 * @return array
 */
function locateComments(str, cpositions) {
  var starts_at = str.indexOf("/*");
  //no legitimate multiline comment found
  if (starts_at === -1) return cpositions;
  var last_pos =
    cpositions.length > 0 ? cpositions[cpositions.length - 1].start : 0;
  //starts_at += last_pos;
  //matched
  var ends_at = str.indexOf("*/") + 2;
  //multiline comment however can exist at the end of file
  if (str.length - 1 === ends_at) return cpositions;
  var i = cpositions[cpositions.length];
  //add positions
  cpositions[i] = {
    start: starts_at + last_pos,
    end: ends_at,
    comment: str.substring(starts_at, ends_at)
  };
  //console.log("adding comment:"+str.substring(starts_at,ends_at));
  //continue
  var next = str.substring(ends_at, str.length);
  return locateComments(next, cpositions);
}
/**
 * @param {array} positions locateFunctionsPositions
 * @param {object} cpositions of locatecomments()
 * @param {string} file in string
 */
function matchCommentsAndFunctions(positions, c_positions, file) {
  var comments = [];
  //console.log("positions:"+Object.keys(positions));
  for (var i in positions) {
    var before = !positions[i - 1] ? 0 : positions[i - 1];
    var pos = positions[i];
    for (var k in c_positions) {
      var c_start = c_positions[k].start;
      var c_end = c_positions[k].end;
      //console.log("before:start:pos:end "+before+":"+c_start+":"+pos+":"+c_end);
      //fits within the range
      if (before <= c_start && c_end < pos) {
        //concatenating rather than substittution
        //this is because there can be multiple comments comming on next round.
        if (!comments[i]) comments[i] = "";
        if (c_positions[k].comment) comments[i] += c_positions[k].comment;
        //console.log("c_position k:"+c_positions[k].comment);
      } else {
        //already has an empty string at locateComments
      }
    }
  }
  return comments;
}
function updateObjectTree(otree, func_locs) {
  for (var path in func_locs) {
    var names = func_locs[path].names;
    //console.log("name:"+name);
    for (var i in names) {
      var name = func_locs[path].names[i];
      otree[name].comment = func_locs[path].comments[i];
    }
  }
  return otree;
}
module.exports = resolveFunctionComments;
