//using default options for initial values
var options = require("./../Options/Options");
var getMessages = require("./getMessages");

module.exports = {
  logs: [],
  //load default
  verbose: options.verbose.default,
  //load default
  lang: options.lang.default,
  messages: getMessages(options.lang.default, this),
  //updates messages instance
  updateMessages: function(options) {
    this.verbose = options.verbose;
    var m_before = this.messages;
    this.messages = getMessages(options.lang, this);
    //this needs to be updated after updating messages. since getMessages needs console to function on valid language.
    //only updating this.lang on successful switch. otherwise default message is returned.
    if (m_before !== this.messages) {
      this.lang = options.lang;
    }
  },
  outAny: function(message) {
    this.logs.push(message);
    if (this.verbose !== true) return;
  },
  outMessage: function(key, args = {}) {
    if (!this.messageExists(key)) return;
    var message = args === {} ? this.messages[key]() : this.messages[key](args);
    this.logs.push(message);
    if (this.verbose !== true) return;
    console.log(message);
  },
  messageExists: function(key) {
    if (this.messages[key]) {
      return true;
    } else {
      console.log("Console: key [" + key + "] does not exist.");
      return false;
    }
  }
};
