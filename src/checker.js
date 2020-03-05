/**
 * Functions defined here are unnecessary for main process, yet is very important for notifying user about what is going on during the process.
 * "checks" is short for checkpoints.
 */
var checks = {
  /**
   * checks object is undefined.
   * outputs status to console.
   * returns false on undefined.
   * @param {object} object
   * @return {boolean} proceedable
   */
  checkObjectStatus: function(Console, object) {
    if (!object) {
      Console.outMessage("empty-object");
      Console.outMessage("process-stopped");
      return;
    } else {
      Console.outMessage("process-object-loaded");
    }
  },
  /**
   * notifies user about the keys length of acquired obj_names.
   * @param {object} Console
   * @param {number} count
   */
  checkObjectNamesCount: function(Console, count) {
    if (count === 0) {
      Console.outMessage("object-names-empty");
      Console.outMessage("process-stopped");
      return;
    } else {
      Console.outMessage("process-object-names-loaded", {
        number_of_keys: count
      });
    }
  },
  /**
   * notifies ignored obj_names objoect keys and notifies user.
   * @param {object} Console
   * @param {number} obj_names
   */
  checkIgnoredObjects: function(Console, count) {
    Console.outMessage("process-ignored-objects", {
      ignored_amount: count
    });
  },
  /**
   * Counts cache_tree object keys lengthk, and notifies about it.
   * @param {object} Console
   * @param {object} cache_tree
   */
  checkCacheTreeCounts: function(Console, cache_tree) {
    var num = Object.keys(cache_tree).length;
    if (Object.keys(cache_tree).length === 0) {
      Console.outMessage("empty-cache", {});
      Console.outMessage("process-stopped", {});
      return;
    } else {
      Console.outMessage("process-traversed-caches", {
        number_of_caches: num
      });
    }
  },
  checkDefaultCacheTreeIgnoreCounts: function(Console, ignore_count) {
    Console.outMessage("process-ignored-default-paths", {
      ignored_amount: ignore_count
    });
  },
  checkCacheTreeIgnoreCounts: function(Console, ignore_count) {
    Console.outMessage("process-ignored-paths", {
      ignored_amount: ignore_count
    });
  },
  checkResolvedComments: function(Console, otree) {
    var count = countOtreeComment(otree);
    if (count === 0) {
      Console.outMessage("zero-comments-resolved");
    } else {
      Console.outMessage("process-resolved-comments", { num: count });
    }
  }
};
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
module.exports = checks;
