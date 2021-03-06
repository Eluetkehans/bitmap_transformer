'use strict';

module.exports = function(img, header, fs, saveFile) {
  if(header.imgStart != header.headerSize){       //handles pallette images
      console.log("this is a palletted image!!!");
      console.dir(header);
      
      var newImage = new Buffer(header['fileSize']);
      img.copy(newImage);

      // The color palette starts at the end of the header and extends
      // to where the image starts
      for(var k = header['headerSize']; k < header['imgStart']; k++){
        var current = newImage.readUInt8(k);
        current = 255 - current;
        newImage.writeUInt8(current, k);
      }
      console.dir(header);
      saveFile(newImage, fs);    

  } else { 
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
    for (var i = header['imgStart']; i < img.length; i++) {

        // Only reading 1 byte at a time. Use UInt8
        var current = img.readUInt8(i);
        // Reverse the color value
        current = 255 - current;
        newImage.writeUInt8(current, i);
    }
    console.dir(header);
    saveFile(newImage, fs);

  }              
} 