'use strict';

module.exports = function(img, header, fs) {
  
  // Where the new image can be stored:
  var newImage = new Buffer(header['fileSize']);

  // Copy the header information into the new image.
  img.copy(newImage);

  // Each pixel is stored in 4 bytes
  // 24 bitPerPixel store color in 3 bytes, and 1 byte of alpha/padding
  // the color order of those bytes are: blue green red
  // each of these can be a value from 0-255.

  // Make sure to start at the end of the header, not the beggining of
  // the buffer!
  for (var i = header['headerSize']; i < img.length; i++) {
    // Skip every fourth byte. That has the alpha, not a color value
    if (i % 4 != 0) {
      // Only reading 1 byte at a time. Use UInt8
      var current = img.readUInt8(i);
      // Reverse the color value
      current = 255 - current;
      newImage.writeUInt8(current, i);
    }

  }

  // Write transformation to file. Might want to move this to its own
  // module later. Might want to pull path from command line later, too.
  var path = __dirname + "/img/color_invert.bmp";
  console.log(path);
  fs.writeFile(path, newImage, function(err) {
    if (err) {
      console.error("Error: " + err.message);
    } else {
      console.log("Image created at: " + path);
    }
  })
  console.dir(header);
} 