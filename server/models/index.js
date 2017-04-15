var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT * FROM messages', function(err, results, fields) {
        if (err) { console.error(err)};
        // no messsages returned
        console.log('get all messages results: ', results);
        callback(results);
      });
    },

    post: function (data, callback) {
      data.roomname = data.roomname || 'Lobby';
      db.query('INSERT INTO users (`username`) SELECT "' + data.username + '" FROM DUAL WHERE NOT EXISTS (SELECT userID FROM users WHERE username = "' + data.username + '" LIMIT 1 );',
        function(err, results, fields) {
          if (err) {console.error(err)}
          db.query ('INSERT INTO rooms (`room`) SELECT "' + data.roomname + '" FROM DUAL WHERE NOT EXISTS (SELECT roomID FROM rooms WHERE room = "' + data.roomname + '" LIMIT 1 );',
            function(err, results, fields) {
              if (err) {console.error(err)}
              db.query('INSERT INTO messages (message, userID, roomID) VALUES ("' +
                data.message + '" ,' +
                '(SELECT userID FROM users WHERE username = "' + data.username + '"),' +
                '(SELECT roomID FROM rooms WHERE room = "'+ data.roomname +'") );', function(err, results, fields) {
                  if (err) {console.error(err)}
                    callback();
                });
            });
        });
    }
  },

  users: {
    // Ditto as above.
    get: function (data) {
      db.query()
    },
    post: function (data, callback) {
      db.query('INSERT INTO users (`username`) SELECT "' + data.username + '" FROM DUAL WHERE NOT EXISTS (SELECT userID FROM users WHERE username = "'+ data.username + '");',function(err, results, fields) {
        if (err) {console.log(err)};
        callback();
      })
    }
  }
};

    // INSERT INTO users (`username`)
    //   SELECT 'JOSH' FROM DUAL WHERE NOT EXISTS (
    //     SELECT userID FROM users WHERE username = 'JOSH' LIMIT 1 );

    // INSERT INTO rooms (room)
    //  SELECT 'NewRoom' FROM DUAL WHERE NOT EXISTS (
    //    SELECT room FROM rooms WHERE room = 'NewRoom' LIMIT 1 );

    // INSERT INTO messages (message, roomID, userID) VALUES (
    //     'Hello',
    //     (SELECT userID FROM users
    //       WHERE username = 'JOSH'),
    //     (SELECT roomID FROM rooms
    //       WHERE room = 'Lobby')
    //   );

