'use strict';
// var EventEmitter = require('events').EventEmitter
// var ee = new EventEmitter();
var os = require('os');
module.exports = function(img, obj, fs, callback, saveFile){

  var imgBuff = new Buffer(img);
  obj['bitmapType'] = imgBuff.toString('ascii', 0, 2);
  if (os.endianness() == 'LE') {                          //handles CPU architecture 'endianness'
    obj['fileSize'] = imgBuff.readUInt32LE(2);
    obj['imgStart'] = imgBuff.readUInt32LE(10);
    // Reads the DIB size and adds the file header to return the total
    // header size
    obj['headerSize'] = imgBuff.readUInt32LE(14) + 14;
    obj['imgWidth'] = imgBuff.readUInt16LE(18);
    obj['imgHeight'] = imgBuff.readUInt16LE(22);
    obj['bitsPerPixel'] = imgBuff.readUInt16LE(28); 
    obj['palletteColors'] = imgBuff.readUInt16LE(46);
    obj['rawColors'] = imgBuff.toString('hex', 54, obj.imgStart);

  } else {
    obj['fileSize'] = imgBuff.readUInt32BE(2);
    obj['imgStart'] = imgBuff.readUInt32BE(10);
    obj['headerSize'] = imgBuff.readUInt32BE(14);
    obj['imgWidth'] = imgBuff.readUInt16BE(18);
    obj['imgHeight'] = imgBuff.readUInt16BE(22);
    obj['bitsPerPixel'] = imgBuff.readUInt16BE(28);
  }
  // Pixel information is stored in an array of consecutive rows
  // after the imgStart. The rows must be in multiples of 4 bytes.
  // the formula for the row size is:
  // ((((bitsPerPixel * imgWidth) + 31) / 32) * 4) rounded up + x
  // where x is the amount needed to become a multiple of 4.

  // Initial formula:
  obj['rowSizeUnpadded'] = Math.ceil((((obj.bitsPerPixel * obj.imgWidth)
                                     + 31) / 32) * 4);
  // setup padded version:
  obj['rowSizePadded'] = obj['rowSizeUnpadded'];
  // add 1 until it is a multiple of 4:
  while(obj['rowSizePadded'] % 4 != 0) {
    obj['rowSizePadded'] += 1;
  };

  // Find header name by DIB size
  if(obj['headerSize'] == 12) {obj['headerName'] = 'BITMAPCOREHEADER' +
                                                          'OS21XBITMAPHEADER'};
  if(obj['headerSize'] == 64) {obj['headerName'] = 'OS22XBITMAPHEADER'};
  if(obj['headerSize'] == 40) {obj['headerName'] = 'BITMAPINFOHEADER'};
  if(obj['headerSize'] == 52) {obj['headerName'] = 'BITMAPV2INFOHEADER'};
  if(obj['headerSize'] == 56) {obj['headerName'] = 'BITMAPV3INFOHEADER'};
  if(obj['headerSize'] == 108) {obj['headerName'] = 'BITMAPV4HEADER'};
  if(obj['headerSize'] == 124) {obj['headerName'] = 'BITMAPV5HEADER'};

 
  callback(img, obj, fs, saveFile);

  // ee.emit('parseDone');
}
// ee.on('parseDone', function(){
//   console.log('this works madude');
// });





