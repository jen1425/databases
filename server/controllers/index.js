var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
        models.messages.get(function(newMessages) {
        newMessages = {results: newMessages};
        console.log('MESSAGES RETRIEVED UPON GET REQUEST: ', JSON.stringify(newMessages));
        res.send(JSON.stringify(newMessages));
      });

    }, // a function which handles a get request for all messages
    post: function (req, res) {
      models.messages.post(req.body, function() {
        res.send();
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {},
    post: function (req, res) {
      models.users.post(req.body, function(result) {
        res.send();
      })
    }
  }
};

