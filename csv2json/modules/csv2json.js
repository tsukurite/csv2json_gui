var fs = require('fs');
var csv = require('csv');
var Iconv = require('iconv').Iconv;
var conv = new Iconv('cp932', 'UTF-8//TRANSLIT//IGNORE')
var _ = require('lodash');

function csv2json( _csvString ) {
  var csv = _csvString;

  var _listRow = csv.replace( /(\r\n|\r|\n)/g, '\n' ).split( '\n' );

  var dataName = _listRow.shift(0).split(',');

  var formattedJson = _.map( _listRow, function ( values ) {
    var newData = {};
    if( values !== '' ){
      var valuesArray = values.split(',');
      _.forEach( valuesArray, function ( value, key, object ) {
        newData[ dataName[key] ] = value;
      });
      return newData;
    } else {
      return false;
    }
  });

  var createJson = [];
  _.forEach( formattedJson, function ( value, key, object ) {
    if( value !== false ) {
      createJson.push (value );
    }
  });

  var str = JSON.stringify( createJson );
  return str;
};

module.exports = csv2json;
