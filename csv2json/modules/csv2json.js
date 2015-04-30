var _ = require('lodash');
var csv = require('csv');
var q = require('q');

function csv2json( _csvString ) {
  var def = q.defer();

  var _listRow;

  csv.parse( _csvString, {comment:'#'}, function(err, data) {

    _listRow = data;

    var propertyList = _listRow.shift(0);

    var createJson =  _.map( _listRow, function ( values ) {
        var newData = {};
        _.forEach( values, function ( value, key, object ) {
          // 指定されていない列がCSV上にあった場合、無視
          if( typeof propertyList[key] === 'string' ) {
            newData[ propertyList[key] ] = value;
          }
        });
        return newData;
      });
    console.log( createJson );
    def.resolve( JSON.stringify( createJson ) );
  });

  return def.promise;
};

module.exports = csv2json;
