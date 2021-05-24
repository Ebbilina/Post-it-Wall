/* eslint-env node */

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const http = require("http").createServer(app);
const { v4: uuid4 } = require("uuid");
const db = require("./db");
require("./websocket")(http);

const failedStatus = 200;

/**
 * Setup Frontend route
 */
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

/**
 * Setup Backend routes
 * get room with data from db
 */
app.get("/rooms", (req, res) => {
  db.getRoomById(req.query.id).then((room) => {
    if (room.exists) {
      res.send(JSON.stringify({
        id: room.id,
        room: room.data(),
      }));
    }
  });
});

/**
 * creates new room with id
 * sends id and data
 */
app.post("/rooms", (req, res) => {
  db.createRoom(uuid4(), req.body.name).then((room) => {
    res.send(JSON.stringify({
      id: room.id,
      room: room.data(),
    }));
  });
});

/**
 * send new postit with generated id back
 */
app.post("/postit", (req, res) => {
  res.send(db.createPostIt(req.body.roomId, req.body.text, uuid4(), req.body
    .textcolor, req.body.positionX, req.body.positionY,
    req.body.zIndex, req.body.paperColor, req.body.fontSize));
});

/**
 * changes document in firebase
 */
app.post("/postitOnChange", (req, res) => {
  db.changePostItById(req.body.roomId, req.body.postArray);
  res.sendStatus(failedStatus);
});

// Start server
let port = process.env.PORT;
//let port = 3000; replace upper let port
http.listen(port, () => {
  console.log("listening on *: " + port);
});