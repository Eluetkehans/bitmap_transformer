'use strict';
module.exports = function(img, fs) {

  var path = __dirname + "/../img/negative_color.bmp";
  fs.writeFile(path, img, function(err) {
    if (err) {
      console.error("Error: " + err.message);
    } else {
      console.log("Image created at: " + path);
    }
  });
}