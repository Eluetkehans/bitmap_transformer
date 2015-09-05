'use strict';
var fs = require('fs');

var headerParser = require(__dirname + "/lib/header_parser.js");
var transformer = require(__dirname + "/lib/transformer");
var saveFile = require(__dirname + "/lib/save_file");
var header = {};

fs.readFile(__dirname + '/img/' + process.argv[2], callHP); 

function callHP(err, data){
  if(err){
	throw err;
  }
  headerParser(data, header, fs, transformer, saveFile);
};

// headerParser.on('parseDone', function(){
// 	console.log('hey the event emitter works!')
// });






