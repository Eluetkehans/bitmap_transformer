'use strict';


var headerParser = module.exports = exports = function(img, obj){
  var imgBuff = new Buffer(img);
  obj['bitmapType'] = imgBuff.toString('ascii', 0, 2);
  obj['size'] = imgBuff.readUInt32LE(2);
  obj['start'] = imgBuff.readUInt32LE(10);

  console.log("success!") 
  console.log(obj['bitmapType']);
  console.log(obj['size']);
  console.log(obj['start'])
}