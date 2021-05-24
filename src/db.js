/* eslint-env node */

const admin = require("firebase-admin");
const firebaseCredentials = require("../env/firebase.json");

class Database {

  constructor() {
    admin.initializeApp({
      credential: admin.credential.cert(firebaseCredentials),
    });
    this.db = admin.firestore();
  }

  /**
   * get room by id from collection "rooms"
   * 
   * @param {number} id 
   */
  getRoomById(id) {
    return this.db.collection("rooms").doc(id).get();
  }

  /**
   * creates new room/document by id
   * adds attribute "name" to document 
   * 
   * @param {number} id 
   * @param {string} name 
   */
  createRoom(id, name) {
    const docRef = this.db.collection("rooms").doc(id);
    return docRef.set({ name })
      .then(() => docRef.get());
  }

  /**
   * get attributes for new postIt
   * update array in document
   * returns new postIt
   * 
   * @param {number} roomId 
   * @param {string} text 
   * @param {number} id 
   * @param {string} textcolor 
   * @param {number} positionX 
   * @param {number} positionY 
   * @param {number} zIndex 
   * @param {string} paperColor 
   * @param {string} fontSize 
   */
  createPostIt(roomId, text, id, textcolor, positionX, positionY, zIndex,
    paperColor, fontSize) {
    const docRef = this.db.collection("rooms").doc(roomId);
    docRef.update({
      postitlist: admin.firestore.FieldValue.arrayUnion({
        text,
        id,
        textcolor,
        positionX,
        positionY,
        zIndex,
        paperColor,
        fontSize,
      }),
    });
    return {
      text,
      id,
      textcolor,
      positionX,
      positionY,
      zIndex,
      paperColor,
      fontSize,
    };
  }

  /**
   * get Id of room/document
   * update arraylist with postits in document
   * 
   * @param {number} roomId 
   * @param {array} postitlist 
   */
  changePostItById(roomId, postitlist) {
    const docRef = this.db.collection("rooms").doc(roomId);
    docRef.update({ postitlist: postitlist });
  }
}

module.exports = new Database();