/* eslint-env node */

const io = require("socket.io");

class Websocket {

  constructor(http) {
    this.io = io(http);

    this.io.on("connection", (socket) => {
      /**
       * user joins room with given roomId
       */
      socket.on("roomJoined", (roomId) => {
        socket.join(roomId);
        this.io.to(roomId).emit("roomJoined");
      });

      /**
       * server sends every User new postit
       */
      socket.on("addedPostit", (postit) => {
        this.io.to(postit.roomId).emit("addedPostit", postit
          .newPostIt);
      });

      /**
       * server sends changed postit to all clients 
       * except for the client who sent the message
       */
      socket.on("changedPostit", (postit) => {
        socket.broadcast.to(postit.roomId).emit("changedPostit",
          postit.postItdb);
      });

      /**
       * server send deleted postit to every client
       */
      socket.on("deletedPostit", (postit) => {
        socket.broadcast.to(postit.roomId).emit("deletedPostit",
          postit
          .postIt);
      });

    });
  }
}

/**
 * initialize an Object of Websocket
 * 
 * @param {string} http 
 */
const init = (http) => {
  return new Websocket(http);
};

module.exports = init;