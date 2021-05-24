/* eslint-disable no-undef */
/* eslint-env browser */

import interact from "interactjs";
import Observable from "./utils/Observer.js";
import Event from "./utils/Event.js";
import * as Modal from "./modal.js";
import PostItModel from "./postItModel.js";

import socket from "./socket.js";
const HUNDRED_PERCENTAGE_CALC = 100,
  MATRIX_PARSING_POSITION = 10;
let that,
  windowWidth,
  windowHeight,
  postItModel = new PostItModel();

class PostItView extends Observable {
  constructor(main) {
    super();
    this.main = main;
    that = this;

    /**
     * When a new User gets per Invate to webpage
     * toggle visibility off buttons
     */
    socket.onUserJoined(() => {
      this.toggleButtons();
    });

    /**
     * get new postit from server and initialize it
     */
    socket.onAddedPostit((postit) => {
      this.showNewPostIt(postit);
    });

    /**
     * get changed postit from server and update current postit
     */
    socket.onChangedPostit((postit) => {
      console.log("2" + postit);
      this.updatePostit(postit);
    });

    /**
     * get deleted postit from server and delete it from HTML
     */
    socket.onDeletedPostit((postit) => {
      const currentPostit = document.getElementById(postit.id);
      currentPostit.parentNode.removeChild(currentPostit);
    });
  }

  /**
   * if given array isn't undefined create array
   * 
   * @param {array} postItArray 
   */
  init(postItArray) {
    if (postItArray !== undefined) {
      this.getWindowSize();
      postItArray.forEach(element => {
        this.showNewPostIt.call(this, element);
      });
    }
  }

  /**
   * toggle visibility of buttons
   */
  toggleButtons() {
    document.getElementById("newPinboard").style.visibility = "hidden";
    document.getElementById("newPostIt").style.visibility = "visible";
  }
/**
 * create new Post-It-Element with every necessary attribute and add it in the "main"-Element
 * @param {object} newPostIt 
 */
  showNewPostIt(newPostIt) {
    let el = document.createElement("div");
    let menu = document.createElement("p");
    let delBtn = document.createElement("button");
    let editBtn = document.createElement("button");
    menu.setAttribute("id", "menu");
    delBtn.setAttribute("id", "delBtn");
    delBtn.setAttribute("title", "Zettel löschen");
    editBtn.setAttribute("id", "editBtn");
    editBtn.setAttribute("title", "Zettel bearbeiten");
    delBtn.innerHTML = "&times;";
    editBtn.innerHTML = "edit";
    menu.appendChild(editBtn);
    menu.appendChild(delBtn);
    el.innerHTML = newPostIt.text;
    el.appendChild(menu);
    el.classList.add("postIt");
    //save the Percentage-Position of the Post-It in the element
    el.setAttribute("posX", newPostIt.positionX);
    el.setAttribute("posY", newPostIt.positionY);
    //set the z-Index of Post-It (order)
    el.style.zIndex = newPostIt.zIndex;
    //set font-size of Post-It
    el.style.fontSize = newPostIt.fontSize;
    //set text color of Post-It
    el.style.color = newPostIt.textcolor;
    //set paper color of Post-It through css-class
    el.classList.add(newPostIt.paperColor);
    //set ID of Post-It
    el.id = newPostIt.id;
    this.main.append(el);
    //set Post-Its on right position
    let pixelPos = this.calculatePercentToPX(newPostIt.positionX, newPostIt
      .positionY);
    el.style.transform = `translate(${pixelPos.pxX}px, ${pixelPos.pxY}px)`;
    //init the drag-functionality
    this.initDraggable(el);
    //init click to set Post-it to front
    el.addEventListener("click", this.bringPostItToFront);

    $(document).ready(function() {
      //open modal and load text from post it into textarea
      $(editBtn).click(function() {
        $("#saveBtn").prop("disabled", false);
        $("#newBtn").prop("disabled", true);
        $("#newModal").modal();
        postItModel.retrieveText(el);
        Modal.updatePostItStyle(el);
      });
      //if delete button clicked, remove post it from view and call delete function to remove post it from array
      $(delBtn).click(function () {
        postItModel.deletePostIt(el.id);
        el.parentNode.removeChild(el);
      });
    });
  }

  /**
   * get size and position of current post it
   * iterate through postArray and check for collisions with other post its
   * if current post it collides with another one compare z-indices
   * if current post it's z-index is smaller increase it so it's higher than the other post it's
   * send changes via Event to postItModel
   * 
   * @param {*} ev 
   */
  bringPostItToFront(ev) {
    let ownEdges = that.getSizeAndPosition(ev.target);
    let elArray = that.main.children;
    for (let i = 0; i < elArray.length; i++) {
      let element = elArray[i];
      if (element.id === ev.target.id) {
        continue;
      } 
      let otherEdges = that.getSizeAndPosition(element);
      if (otherEdges.right > ownEdges.left && otherEdges.left < ownEdges
        .right &&
        otherEdges.top < ownEdges.bottom && otherEdges.bottom > ownEdges.top
      ) {
        let zOwn = parseInt(ev.target.style.zIndex),
          zOther = parseInt(element.style.zIndex);
        if (zOwn <= zOther) {
          let more = zOther + 1;
          ev.target.style.zIndex = more.toString();
          let zEvent = new Event("newZ-Index", {
            "id": ev.target
              .id,
            "zIndex": ev.target.style.zIndex,
          });
          that.notifyAll(zEvent);
        }
      }
    }

  }

  /**
   * get position of element
   * get width and height and return data about edges
   * 
   * @param {object} el 
   */
  getSizeAndPosition(el) {
    let pos = this.getPxPositionEl(el);
    let width = window.getComputedStyle(el).getPropertyValue("width");
    let height = window.getComputedStyle(el).getPropertyValue("height"),
      leftEdge = pos[0],
      upperEdge = pos[1],
      rightEdge = pos[0] + parseInt(width),
      lowerEdge = pos[1] + parseInt(height);
    return ({ "left": leftEdge, "top": upperEdge, "right": rightEdge, "bottom": lowerEdge });
  }

  /**
   * convert position from percentage to pixel
   * 
   * @param {number} percentageX 
   * @param {number} percentageY 
   */
  calculatePercentToPX(percentageX, percentageY) {
    let pxX = percentageX * windowWidth / HUNDRED_PERCENTAGE_CALC;
    let pxY = percentageY * windowHeight / HUNDRED_PERCENTAGE_CALC;
    return { "pxX": pxX, "pxY": pxY };
  }

  /**
   * convert position from pixel to percentage
   * 
   * @param {*} pos 
   */
  calculatePxToPercent(pos) {
    let perX = pos[0] / windowWidth * HUNDRED_PERCENTAGE_CALC;
    let perY = pos[1] / windowHeight * HUNDRED_PERCENTAGE_CALC;
    return { "perX": perX, "perY": perY };
  }

  /**
   * get element position in pixel
   * parsing code from https://gist.github.com/aderaaij/a6b666bf756b2db1596b366da921755d
   * 
   * @param {*} el 
   */
  getPxPositionEl(el) {
    let position = [],
      styl = window.getComputedStyle(el).getPropertyValue("transform");
    let mat = styl.match(/^matrix3d\((.+)\)$/);
    if (mat) {
      return parseFloat(mat[1].split(", ")[13]);
    }
    mat = styl.match(/^matrix\((.+)\)$/);

    if (mat) {
      position.push(parseFloat(mat[1].split(", ")[4],
        MATRIX_PARSING_POSITION));
    } else {
      position.push(0);
    }
    if (mat) {
      position.push(parseFloat(mat[1].split(", ")[5],
        MATRIX_PARSING_POSITION));
    } else {
      position.push(0);
    }
    return position;
  }

  /**
   * initialize drag and drop functionality
   * get position when drag event starts
   * update position while dragging
   * set restrictions so post its stay within visible screen
   * 
   * @param {*} paper 
   */
  initDraggable(paper) {
    this.getWindowSize();
    let position;
    interact(paper)
      .on("dragend", this.onDragEnd)
      .draggable({
        listeners: {
          start() {
            position = that.getPxPositionEl(paper);
          },
          move(event) {
            position[0] += event.dx;
            position[1] += event.dy;
            event.target.style.transform =
              `translate(${position[0]}px, ${position[1]}px)`;
          },
        },
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: "parent",
          }),
        ],
      });
  }

  /**
   * get dropped post it
   * get position of that post it in pixel and percent
   * remove position attributes and replace with new position attributes
   * send changes via Event to PostItModel
   * 
   * @param {*} data 
   */
  onDragEnd(data) {
    let paperEl = data.target;
    let position = that.getPxPositionEl(paperEl);
    let percent = that.calculatePxToPercent(position);
    paperEl.removeAttribute("posX");
    paperEl.removeAttribute("posY");
    paperEl.setAttribute("posX", percent.perX);
    paperEl.setAttribute("posY", percent.perY);
    let sendEvent = new Event("newPos", {
      "id": paperEl.id,
      "x": percent
        .perX,
      "y": percent.perY,
    });
    that.notifyAll(sendEvent);
  }

  /**
   * if window size changes new pixel position is calculated based on percentage position saved in element
   */
  changePxPositionPostIts() {
    let elArray = this.main.children;
    this.getWindowSize();
    for (let i = 0; i < elArray.length; i++) {
      let element = elArray[i];
      let posX = element.getAttribute("posX");
      let posY = element.getAttribute("posY");
      let newPx = this.calculatePercentToPX(posX, posY);
      element.style.transform = `translate(${newPx.pxX}px, ${newPx.pxY}px)`;
    }
  }
  /**
   * get the size of the Post-It-Wall for position calculations
   */
  getWindowSize() {
    windowWidth = window.innerWidth;
    windowHeight = this.main.offsetHeight;
  }

  /**
   * get changed postit from server and update postit with the same id
   * 
   * @param {postIt} changedPostit
   */
  updatePostit(changedPostit) {
    const relatedPostIt = postItModel.updatePostits(changedPostit);
    const postit = document.getElementById(changedPostit.id);
    postit.childNodes[0].nodeValue = changedPostit.text;
    postit.removeAttribute("posX");
    postit.removeAttribute("posY");
    postit.setAttribute("posX", changedPostit.positionX);
    postit.setAttribute("posY", changedPostit.positionY);
    this.changePxPositionPostIts();
    postit.classList.replace(relatedPostIt.paperColor, changedPostit
      .paperColor);
    postit.style.color = changedPostit.textcolor;
    postit.style.fontSize = changedPostit.fontSize;
    postit.style.zIndex = changedPostit.zIndex;
  }
}

export default PostItView;