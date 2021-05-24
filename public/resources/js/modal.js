/* eslint-disable no-undef */
/* eslint-env browser */

import PostItModel from "./postItModel.js";
import * as EditMenu from "./editMenu.js";

var textArea = document.getElementById("inputText");
let postItModel = new PostItModel();

/**
 * clear textarea input when either one of these buttons is clicked
 */
const clearText = () => {
  document.getElementById("newBtn").onclick = function () {
    textArea.value = "";
  };

  document.getElementById("closeBtn").onclick = function () {
    textArea.value = "";
  };
};

/**
 * event listeners for edit menu post it color buttons
 * set textarea background color to reflect current color choice
 * send color choice to postItModel
 */
let postItColor = () => {
  let currentColor = getCurrentTextAreaColor;
  postItModel.getPostItColor(currentColor);
  document.getElementById("bluePostIt").onclick = function () {
    textArea.style.backgroundColor = "#7d93f7";
    postItModel.getPostItColor("blue");
  };
  document.getElementById("yellowPostIt").onclick = function() {
    textArea.style.backgroundColor = "#f3d084";
    postItModel.getPostItColor("yellow");
  };
  document.getElementById("greenPostIt").onclick = function() {
    textArea.style.backgroundColor = "#11c25b";
    postItModel.getPostItColor("green");
  };
  document.getElementById("redPostIt").onclick = function() {
    textArea.style.backgroundColor = "#ee8565";
    postItModel.getPostItColor("red");
  };
};

/**
 * get current color of textarea
 */
let getCurrentTextAreaColor = () => {
  var rgb = textArea.style.backgroundColor;
  var color = "#" + rgb.substr(4, rgb.indexOf(")") - 4).split(",").map((color) => parseInt(color).toString(16)).join("");
  let currentColor;
  switch (color) {
    case "#f3d084":
      currentColor = "yellow";
      break;
    case "#7d93f7":
      currentColor = "blue";
      break;
    case "#11c25b":
      currentColor = "green";
      break;
    case "#ee8565":
      currentColor = "red";
      break;
    default:
      currentColor = "yellow";
  }
  return currentColor;
};

/**
 * event listeners for edit menu text color buttons
 * set textarea text color to reflect current color choice
 * send color choice to postItModel
 */
let textColor = () => {
  document.getElementById("whiteText").onclick = function () {
    textArea.style.color = "white";
    postItModel.getTextColor("white");
  };
  document.getElementById("blackText").onclick = function() {
    textArea.style.color = "black";
    postItModel.getTextColor("black");
  };
};

/**
 * event listeners for edit menu text size buttons
 * set textarea text size to reflect current choice
 * send text size choice to postItModel
 */
let textSize = () => {
  document.getElementById("smallText").onclick = function () {
    textArea.style.fontSize = "x-small";
    postItModel.getTextSize("x-small");
  };
  document.getElementById("normalText").onclick = function() {
    textArea.style.fontSize = "medium";
    postItModel.getTextSize("medium");
  };
  document.getElementById("largeText").onclick = function() {
    textArea.style.fontSize = "x-large";
    postItModel.getTextSize("x-large");
  };
};

/**
 * set textarea font size, text color and background color to reflect the post it
 * from which the edit button was clicked
 * 
 * @param {*} postIt 
 */
let setTextareaStyle = (postIt) => {
  textArea.style.fontSize = postIt.style.fontSize;
  textArea.style.color = postIt.style.color;

  if (postIt.classList.contains("yellowB")) {
    textArea.style.background = "#f3d084";
  } else if (postIt.classList.contains("blueB")) {
    textArea.style.background = "#7d93f7";
  } else if (postIt.classList.contains("greenB")) {
    textArea.style.background = "#11c25b";
  } else if (postIt.classList.contains("redB")) {
    textArea.style.background = "#ee8565";
  }
};

/**
 * set textarea preview
 * calls all style update functions when save button is clicked
 * and lastly calls a function that sends updated changes to database
 * 
 * @param {*} postIt 
 * @param {*} menu 
 */
const updatePostItStyle = (postIt) => {
  setTextareaStyle(postIt);

  document.getElementById("saveBtn").onclick = function () {
    EditMenu.updateText(postIt);
    EditMenu.updateTextColor(postIt);
    EditMenu.updateTextSize(postIt);
    EditMenu.updatePostItColor(postIt);
    postItModel.sendAttributesToDB(postIt.id);
    textArea.value = "";
  };

  document.getElementById("closeBtn").addEventListener("click", setTextareaStyle(postIt));
};

/**
 * save button ("Übernehmen") gets disabled when the new post it ('+' button) is clicked
 * new button ("Neu") is disabled when textarea is empty
 */
$(function () {
  $("#newPostIt").click(function () {
    $("#saveBtn").prop("disabled", true);
    $(textArea).keyup(function () {
      $("#newBtn").prop("disabled", (this.value === "") ? true : false);
    });
  });
});

/**
 * toggle tooltips to be active
 */
$(function () {
  $("[data-toggle='tooltip']").tooltip();
});

export {
  textSize,
  clearText,
  textColor,
  postItColor,
  updatePostItStyle,
};