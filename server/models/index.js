var db = require('../db');

module.exports = {
  messages: {
    get: function () {
      db.query('SELECT * FROM mesages', function(err, results, fields) {
        if (err) { console.error(err)};

        console.log('get all messages results: ', results);

        return results;
      })
    },
    
    post: function (data) {
      db.query('INSERT INTO users (`username`) SELECT ' + data.username + ' FROM DUAL WHERE NOT EXISTS (SELECT userID FROM users WHERE username = ' + data.username + ' LIMIT 1 );',
        function(err, results, fields) {
          if (err) {console.error(err)}
          db.query ('INSERT INTO rooms (`room`) SELECT ' + data.room + ' FROM DUAL WHERE NOT EXISTS (SELECT roomID FROM users WHERE room = ' + data.room + ' LIMIT 1 );',
            function(err, results, fields) {
              if (err) {console.error(err)}
              db.query('INSERT INTO messages (message, roomID, userID) VALUES (' + 
                data.message + ',' +
                '(SELECT userID FROM users WHERE username = "' + data.username + '" ),' +
                '(SELECT roomID FROM rooms WHERE room = "'+ user.room +'") );', function(err, results, fields) {
                  if (err) {console.error(err)}
                });
            });
        });
    }
  },

  users: {
    // Ditto as above.
    get: function () {
      db.connect()
    },
    post: function () {}
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

