var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
   
      console.log('Hello from controller GET!!')
      var messages;
      models.messages.get(function(newMessages) {
        console.log('MESSAGES RETRIEVED UPON GET REQUEST: ', newMessages);
        res.send(newMessages);
      });

      // send back via express;
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

