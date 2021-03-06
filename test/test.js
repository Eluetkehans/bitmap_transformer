'use strict';

var saveFile = require('../lib/save_file.js');
var fs = require('fs');
var chai = require('chai');
var expect = chai.expect;

describe('saveFile', function(){
    it('should create a new file', function(){
        var x = new Buffer(10);
        var target = __dirname + '/../img/negative_color.bmp';
        saveFile(x, fs);
        expect(target).to.exist;
    });
});