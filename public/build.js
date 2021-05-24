/* eslint-env node */
// source: https://github.com/babel/babelify#node

var fs = require("fs");
var browserify = require("browserify");
browserify("./resources/js/index.js")
  .transform("babelify", {presets: ["@babel/preset-env"]})
  .bundle()
  .pipe(fs.createWriteStream("bundle.js"));