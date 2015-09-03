'use strict';

var expect = require('chai').expect;
var index = require(__dirname + '/../index');

describe('index', function() {
  it('should call all necessary modules');
});

/*
TODO bit map file header parser.
  -should read the first two bytes and return type. (BM type manditory)
  -should read the image size. offset 2, size 4 bytes.
    (we will probably have to use this to find the pallet)
*/

