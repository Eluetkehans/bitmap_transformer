'use strict';

var os = require('os');
module.exports = function(img, obj, fs, callback, saveFile){

  var imgBuff = new Buffer(img);
  obj['bitmapType'] = imgBuff.toString('ascii', 0, 2);

  //handles CPU architecture 'endianness'
  var end = os.endianness();
  
  obj['fileSize'] = imgBuff['readUInt32' + end](2);
  obj['imgStart'] = imgBuff['readUInt32' + end](10);
  // Reads the DIB size and adds the file header to return the total
  // header size
  obj['headerSize'] = imgBuff['readUInt32' + end](14) + 14;
  obj['imgWidth'] = imgBuff['readUInt16' + end](18);
  obj['imgHeight'] = imgBuff['readUInt16' + end](22);
  obj['bitsPerPixel'] = imgBuff['readUInt16' + end](28); 
  obj['palletteColors'] = imgBuff['readUInt16' + end](46);
  obj['rawColors'] = imgBuff.toString('hex', obj.headerSize, obj.imgStart);
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
}
