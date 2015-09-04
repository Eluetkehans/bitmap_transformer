'use strict';
// var EventEmitter = require('events').EventEmitter
// var ee = new EventEmitter();
module.exports = function(img, obj, callback){

  var imgBuff = new Buffer(img);
  obj['bitmapType'] = imgBuff.toString('ascii', 0, 2);
  obj['fileSize'] = imgBuff.readUInt32LE(2);
  obj['imgStart'] = imgBuff.readUInt32LE(10);
  obj['imgWidth'] = imgBuff.readUInt16LE(18);
  obj['imgHeight'] = imgBuff.readUInt16LE(22);
  obj['bitsPerPixel'] = imgBuff.readUInt16LE(28);
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
  if(imgBuff.readUInt32LE(14) == 12) {obj['headerName'] = 'BITMAPCOREHEADER' +
                                                          'OS21XBITMAPHEADER'};
  if(imgBuff.readUInt32LE(14) == 64) {obj['headerName'] = 'OS22XBITMAPHEADER'};
  if(imgBuff.readUInt32LE(14) == 40) {obj['headerName'] = 'BITMAPINFOHEADER'};
  if(imgBuff.readUInt32LE(14) == 52) {obj['headerName'] = 'BITMAPV2INFOHEADER'};
  if(imgBuff.readUInt32LE(14) == 56) {obj['headerName'] = 'BITMAPV3INFOHEADER'};
  if(imgBuff.readUInt32LE(14) == 108) {obj['headerName'] = 'BITMAPV4HEADER'};
  if(imgBuff.readUInt32LE(14) == 124) {obj['headerName'] = 'BITMAPV5HEADER'};

 
  callback(img, obj);

  // ee.emit('parseDone');
}
// ee.on('parseDone', function(){
//   console.log('this works madude');
// });





