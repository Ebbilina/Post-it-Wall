import PostIt from "./postIt.js";
import Observable from "./utils/Observer.js";
import socket from "./socket.js";

const INIT_X_POSITION = 10,
  INIT_Y_POSITION = 7;
let postArray = [],
  tColor = "black",
  fSize = "medium",
  pColor = "yellowB";

class PostItModel extends Observable {

  constructor() {

    super();

    /**
     * get new postit if it isn't in array -> adds it
     */
    socket.onAddedPostit((postit) => {
      if (!(postArray.find((post) => post.id === postit.id))) {
        postArray.push(postit);
      }
    });

    /**
     * delete post it from array
     */
    socket.onDeletedPostit((postit) => {
      this.deletePostItfromArray(postit);
    });
  }

  /**
   * create new postit and send information to server
   * get new postit from server 
   * send new postit via websocket to server
   * returns new postit
   * 
   * @param {string} text 
   * @param {string} textcolor 
   * @param {number} positionX 
   * @param {number} positionY 
   * @param {number} zIndex 
   * @param {string} paperColor 
   * @param {string} fontSize 
   */
  createNewPostIt(text = document.getElementById("inputText").value, textcolor =
    tColor, positionX = INIT_X_POSITION,
    positionY = INIT_Y_POSITION, zIndex = "0", paperColor = pColor, fontSize =
      fSize) {
    const roomId = new URLSearchParams(window.location.search).get("room");
    return fetch("postit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId,
        text,
        textcolor,
        positionX,
        positionY,
        zIndex,
        paperColor,
        fontSize,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        const newPostIt = new PostIt(data.text,
          data.id,
          data.textcolor,
          data.positionX,
          data.positionY,
          data.zIndex,
          data.paperColor,
          data.fontSize);
        socket.emit("addedPostit", { newPostIt, roomId });
        return newPostIt;
      });
  }

  init(postitArray) {
    postArray = postitArray;
  }

  /**
   * get deleted postit by id
   * delete it from postArray
   * send the new postArray to BE
   * send message to server
   * 
   * @param {number} postItID 
   */
  deletePostIt(postItID) {
    const postIt = postArray.find((post) => post.id === postItID);
    this.deletePostItfromArray(PostIt);
    const roomId = new URLSearchParams(window.location.search).get("room");
    this.postitOnChange(roomId, postArray);
    socket.emit("deletedPostit", { postIt, roomId });
  }

  /**
   * get postit to delete it from postArray
   * 
   * @param {object} postIt 
   */
  deletePostItfromArray(postIt) {
    const indexOfPostit = postArray.indexOf(postIt);
    postArray.splice(indexOfPostit, 1);
  }

  addPostIt() {
    return this.createNewPostIt().then((postIt) => {
      postArray.push(postIt);
      return postIt;
    });
  }

  /**
     * get post it from array by id
     * show post it text in textarea
     * 
     * @param {*} postit 
     */
  retrieveText(postit) {
    var textarea = document.getElementById("inputText");
    const postIt = postArray.find((post) => post.id === postit.id);
    textarea.value = postIt.text;
  }

  changePositionData(event) {
    let postIt = event.data;
    const postit = postArray.find((post) => post.id === postIt.id);
    postit.positionX = postIt.x;
    postit.positionY = postIt.y;
    const roomId = new URLSearchParams(window.location.search).get("room");
    this.postitOnChange(roomId, postArray, postit);
    const postItdb = postit;
    socket.emit("changedPostit", { postItdb, roomId });
  }

  changeZIndex(ev) {
    let change = ev.data;
    const postIt = postArray.find((post) => post.id === change.id);
    postIt.zIndex = change.zIndex;
  }

  /**
     * get post it from array by id
     * replace saved post it text with new input from textarea
     * 
     * @param {*} postIt 
     * @param {string} newText 
     */
  changeText(postIt, newText) {
    const relatedPostIt = postArray.find((post) => post.id === postIt.id);
    relatedPostIt.text = newText;
  }

  /**
     * get post it from array by id
     * change saved attributes of post it (text color, text size and post it color)
     * 
     * @param {*} postIt 
     * @param {string} type 
     * @param {string} data 
     */
  updatePostItModel(postIt, type, data) {
    const relatedPostIt = postArray.find((post) => post.id === postIt.id);
    switch (type) {
      case "textColor":
        relatedPostIt.textcolor = data;
        break;
      case "textSize":
        relatedPostIt.fontSize = data;
        break;
      case "postItColor":
        relatedPostIt.paperColor = data;
        break;
      default:
        throw new Error("couldn't update post it color");
    }
  }

  /**
  * updated postArray entry gets send to database
  */
  sendAttributesToDB(postItId) {
    const roomId = new URLSearchParams(window.location.search).get("room");
    this.postitOnChange(roomId, postArray);
    const postItdb = postArray.find((post) => post.id === postItId);
    socket.emit("changedPostit", { postItdb, roomId });
  }

  /**
   * set text color when creating a new post it
   * 
   * @param {string} color 
   */
  getTextColor(color) {
    tColor = color;
  }

  /**
   * set text size when creating a new post it
   * 
   * @param {string} size 
   */
  getTextSize(size) {
    fSize = size;
  }

  /**
   * set post it color when creating a new post it
   * 
   * @param {string} color 
   */
  getPostItColor() {
    var rgb = document.getElementById("inputText").style.backgroundColor;
    var color = "#" + rgb.substr(4, rgb.indexOf(")") - 4).split(",").map((color) => parseInt(color).toString(16)).join("");
    switch (color) {
      case "#f3d084":
        pColor = "yellowB";
        break;
      case "#7d93f7":
        pColor = "blueB";
        break;
      case "#11c25b":
        pColor = "greenB";
        break;
      case "#ee8565":
        pColor = "redB";
        break;
      default:
        pColor = "yellowB";
    }
  }

  /**
   * gets the roomId where it saves the new postArray
   * 
   * @param {number} roomId 
   * @param {array} postArray 
   */
  postitOnChange(roomId, postArray) {
    fetch("postitOnChange", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomId,
        postArray,
      }),
    });
  }

  /**
   * get changed postit, replace the postit with the same id in postArray
   * and returns old postit
   * 
   * @param {postIt} changedPostit 
   */
  updatePostits(changedPostit) {
    let relatedPostIt = postArray.find((post) => post.id === changedPostit
      .id);
    const currentPostit = relatedPostIt;
    const indexOfPostit = postArray.indexOf(relatedPostIt);
    postArray.splice(indexOfPostit, 1, changedPostit);
    return currentPostit;
  }
}

export default PostItModel;