/**
 * counts .comment object in object tree.
 * @param {object} otree
 * @param {string} key
 */
function countOtreeComment(otree) {
  var count = 0;
  for (var name in otree) {
    if (otree[name].comment) {
      count++;
    }
  }
  return count;
}

module.exports = countOtreeComment;