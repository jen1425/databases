var db = require('../db');

module.exports = {
  messages: {
    get: function () {}, // a function which produces all the messages
    post: function (data) {
      db.query(INSERT INTO `users` (`username`)
        SELECT 'JOSH' FROM DUAL WHERE NOT EXISTS (
          SELECT `userID` FROM `users` WHERE `username` = 'JOSH' LIMIT 1 );)
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {
      db.connect()
    },
    post: function () {}
  }
};

    INSERT INTO `users` (`username`)
     SELECT 'JOSH' FROM DUAL WHERE NOT EXISTS (
       SELECT `userID` FROM `users` WHERE `username` = 'JOSH' LIMIT 1 );