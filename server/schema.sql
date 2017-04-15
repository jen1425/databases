CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  userID int NOT NULL AUTO_INCREMENT,
  username varchar(20),
  PRIMARY KEY (userID)    
);

CREATE TABLE room (
  roomID int NOT NULL AUTO_INCREMENT,
  room varchar(20),
  PRIMARY KEY (roomID)    
);

CREATE TABLE messages (
  messageID int NOT NULL AUTO_INCREMENT,
  message varchar(160),
  roomID int,
  userID int,
  PRIMARY KEY (messageID),

  FOREIGN KEY (userID)
    REFERENCES users(userID),

  FOREIGN KEY (roomID)
    REFERENCES room(roomID)
);




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

