/* eslint-env browser */

// io is defined via a script in html
import socket from "./socket";
import PostItView from "./postItView.js";
import PostItModel from "./postItModel.js";
import * as Modal from "./modal.js";

let postItView,
  postItModel,
  postArrayFromDb = [],
  roomID;

/**
 * proofs if the link is from an existing room
 * -> load data from db
 * or if it is the startsite 
 */
const init = () => {
  const roomId = getRoomId();
  if (roomId) {
    roomID = roomId;
    //get data from firebase
    fetch("https://post-it-pinnwand.herokuapp.com/rooms/?id=" + roomId)
    //http://localhost:3000/rooms/?id=" replace with upper link
      .then((response) => response.json())
      .then((data) => {
        setRoomHeading(data.room.name);
        if (data.room.postitlist) {
          postArrayFromDb = data.room.postitlist;
        }
        socket.emit("roomJoined", roomID);
        setupView();
        setupModel();
        setModalEventListeners();
        document.getElementById("newPinboard").style.visibility = "hidden";
        document.getElementById("newPostIt").style.visibility = "visible";
      });
  } else {
    setRoomHeading("Pinnwand");
    setupButton();
    setupView();
    setupModel();
    setModalEventListeners();
  }
};

const setRoomHeading = (name) => {
  document.getElementById("heading").innerHTML = name;
};

const addRoomName = () => {
  // eslint-disable-next-line no-alert
  const name = window.prompt("Enter new Room Name");
  return name;
};

/**
 * gets roomId from URL
 */
const getRoomId = () => {
  const params = new URLSearchParams(window.location.search);
  const room = params.get("room");
  return room;
};

/**
 * sends request to Backend
 * gets response from BE with room.data and room.id
 * sends message to Server that a new user joined the room
 */
const setupButton = () => {
  document.getElementById("newPinboard").addEventListener("click", () => {
    const name = addRoomName();
    if (!(name === null || name === "")) {
      fetch("https://post-it-pinnwand.herokuapp.com/rooms", {
        //http://localhost:3000/rooms" replace with upper link
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      })
        .then((response) => response.json())
        .then((room) => {
          setRoomURL(room);
          document.getElementById("newPinboard").style.visibility =
            "hidden";
          document.getElementById("newPostIt").style.visibility =
            "visible";
          socket.emit("roomJoined", room.id);
        });
    } else {
      // eslint-disable-next-line no-alert
      alert("please enter a name for your new pinboard");
    }
  });
};

/**
 * initiates PostItModel with Post-It-Data from Database
 */
const setupModel = () => {
  postItModel = new PostItModel();
  postItModel.init(postArrayFromDb);
};

/**
 * initiates View as connection between index.html and Javascript-Files
 * adding Event-Listeners of User-Interaction with postItView to send the data to postItModel
 */
const setupView = () => {
  let postItDataArray = postArrayFromDb;
  let main = document.querySelector("main");
  postItView = new PostItView(main);
  postItView.addEventListener("newPos", (ev) => postItModel
    .changePositionData(ev));
  postItView.addEventListener("newZ-Index", (ev) => postItModel.changeZIndex(
    ev));
  postItView.addEventListener("newPaperColor", (ev) => postItModel
    .changePaperColorData(ev));
  postItView.init(postItDataArray);

  window.addEventListener("resize", () => {
    postItView.changePxPositionPostIts();
  });

  let buttonAddPostIt = document.querySelector("#newBtn");
  buttonAddPostIt.addEventListener("click", () => {
    postItModel.addPostIt();
  });

};

/**
 * adds unique id to room-URL
 * 
 * @param {*} data 
 */
const setRoomURL = (data) => {
  document.getElementById("heading").innerHTML = data.room.name;
  window.history.replaceState(data.id, "roomlink",
    "https://post-it-pinnwand.herokuapp.com/?room=" + data.id);
  //http://localhost:3000/?room= replace with upper link
};

/**
 * setup event listeners for modal elements
 */

const setModalEventListeners = () => {
  Modal.postItColor();
  Modal.textColor();
  Modal.textSize();
  Modal.clearText();
};

init();