//import * as Modal from "./modal.js";
import PostItModel from ".//postItModel";

let postItModel = new PostItModel;
var textArea = document.getElementById("inputText");

/**
 * get new input from textarea
 * replace post it text with new input
 * send post it and new text to postItModel
 * 
 * @param {*} postIt 
 */
let updateText = (postIt) => {
  let newText = textArea.value;
  postIt.childNodes[0].nodeValue = newText;
  textArea.value = "";
  postItModel.changeText(postIt, newText);
};

/**
 * get text color from textarea and set post it text color accordingly
 * send post it and new color to postItModel
 * 
 * @param {*} postIt 
 */
let updateTextColor = (postIt) => {
  let color = textArea.style.color;
  postIt.style.color = color;
  postItModel.updatePostItModel(postIt, "textColor", color);
  postItModel.getTextColor(color);
};

/**
 * get text size from textarea and change post it text size accordingly
 * send updated data to postItModel
 * 
 * @param {*} postIt 
 */
let updateTextSize = (postIt) => {
  let textSize = textArea.style.fontSize;
  postIt.style.fontSize = textSize;
  postItModel.updatePostItModel(postIt, "textSize", textSize);
  postItModel.getTextSize(textSize);
};

/**
 * get paper color of current post it
 * 
 * @param {*} postIt 
 */
let getCurrentPostItColor = (postIt) => {
  let color;
  if (postIt.classList.contains("yellowB")) {
    color = "yellowB";
  } else if (postIt.classList.contains("blueB")) {
    color = "blueB";
  } else if (postIt.classList.contains("redB")) {
    color = "redB";
  } else if (postIt.classList.contains("greenB")) {
    color = "greenB";
  }
  return color;
};

/**
 * get textarea background color and convert it from RGB to HEX
 * check for current post it color
 * remove all colors from post it classList and then assign a new color
 * new color is determined by textarea background color
 * changes get send to postItModel
 * 
 * @param {*} postIt 
 */
let updatePostItColor = (postIt) => {
  var rgb = textArea.style.backgroundColor;
  var color = "#" + rgb.substr(4, rgb.indexOf(")") - 4).split(",").map((color) => parseInt(color).toString(16)).join("");
  let newColor = getCurrentPostItColor(postIt);
  postIt.classList.remove("yellowB", "blueB", "greenB", "redB");
  switch (color) {
    case "#7d93f7":
      newColor = "blueB";
      postIt.classList.add(newColor);
      postItModel.getPostItColor("blue");
      break;
    case "#f3d084":
      newColor = "yellowB";
      postIt.classList.add(newColor);
      postItModel.getPostItColor("yellow");
      break;
    case "#11c25b":
      newColor = "greenB";
      postIt.classList.add(newColor);
      postItModel.getPostItColor("green");
      break;
    case "#ee8565":
      newColor = "redB";
      postIt.classList.add(newColor);
      postItModel.getPostItColor("red");
      break;
    case "#NaN":
      postIt.classList.add(newColor);
      break;
    default:
      console.log("no changes to paper color");
      break;
  }
  postItModel.updatePostItModel(postIt, "postItColor", newColor);
};

export {
  updateText,
  updateTextSize,
  updateTextColor,
  updatePostItColor,
  getCurrentPostItColor,
};