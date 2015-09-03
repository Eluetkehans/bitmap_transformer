'use strict';
// var EventEmitter = require('events').EventEmitter
// var ee = new EventEmitter();

module.exports = function(img, obj, callback){

  var imgBuff = new Buffer(img);
  obj['bitmapType'] = imgBuff.toString('ascii', 0, 2);
  obj['size'] = imgBuff.readUInt32LE(2);
  obj['start'] = imgBuff.readUInt32LE(10);
 
  callback(obj)
  console.log("success!") 
  console.log(obj['bitmapType']);
  console.log(obj['size']);
  console.log(obj['start'])

  // ee.emit('parseDone');
}
// ee.on('parseDone', function(){
//   console.log('this works madude');
// });





