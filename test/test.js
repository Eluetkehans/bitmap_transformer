'use strict';

var saveFile = require('../lib/save_file.js');
var transformer = require('../lib/transformer.js');
var fs = require('fs');
var chai = require('chai');
var expect = chai.expect;



describe('transformer', function(){
	it('should create a new image buffer', function(done){
		var myHeader =  { bitmapType: 'BM',
						  fileSize: 30054,
						  imgStart: 54,
						  headerSize: 54,
						  imgWidth: 100,
						  imgHeight: 100,
						  bitsPerPixel: 24,
						  palletteColors: 0,
						  rawColors: '',
						  rowSizeUnpadded: 304,
						  rowSizePadded: 304 };
		var testBuff = new Buffer(myHeader['fileSize']);
		
		transformer(testBuff, myHeader, fs, saveFile);
		expect(Buffer.isBuffer(testBuff)).to.be.eql(true);
		done();
	});
});

describe('saveFile', function(){
    it('should create a new file', function(){
        var x = new Buffer(10);
        var target = __dirname + '/../img/negative_color.bmp';
        saveFile(x, fs);
        expect(target).to.exist;
    });
});