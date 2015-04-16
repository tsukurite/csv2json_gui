var fs    = require('fs');
var csv   = require('csv');
var Iconv = require('iconv').Iconv;
var conv  = new Iconv('cp932','utf-8');
var _     = require('lodash');

var q = require('q');

function dumpCsv( path ) {
  var def = q.defer();
  var json_array = [];

  fs.readFile( path, function(err, sjisBuf) {
    var buf = conv.convert(sjisBuf);
    console.log( 'CSV Loading:' + path + ' *=-');
    csv.parse(buf.toString(),{comment:'#'}, function(err, data) {
      json_array.push( data );
      def.resolve( json_array );
    });
  });

  return def.promise;
}

module.exports = dumpCsv;
