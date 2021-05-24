/* eslint-env browser */

import io from "socket.io-client";

class Socket {

  constructor() {
    this.socket = io("https://post-it-pinnwand.herokuapp.com/");
    //"ws://localhost:3000" change with upper link
  }

  /**
   * get  message from server that a user joined the room
   */
  onUserJoined() {
    this.socket.on("userJoined");
  }

  /**
   * get new postit from server
   * 
   * @param {object} postit 
   */
  onAddedPostit(postit) {
    this.socket.on("addedPostit", postit);
  }

  /**
   * get changed postit from server
   * 
   * @param {object} postit 
   */
  onChangedPostit(postit) {
    this.socket.on("changedPostit", postit);
  }

  /**
   * get deleted postit from server
   * 
   * @param {object} postit 
   */
  onDeletedPostit(postit) {
    this.socket.on("deletedPostit", postit);
  }

  /**
   * send message with data to server
   * 
   * @param {string} event 
   * @param {string/array/object} data 
   */
  emit(event, data) {
    this.socket.emit(event, data);
  }
}

export default new Socket();