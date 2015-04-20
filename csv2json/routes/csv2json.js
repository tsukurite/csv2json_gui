var fs = require('fs');
var csv = require('csv');
var Iconv = require('iconv').Iconv;
//var conv = new Iconv('cp932','utf-8');
var conv = new Iconv('cp932', 'UTF-8//TRANSLIT//IGNORE')
var _ = require('lodash');

var express  = require('express');
var router = express.Router();

function getHtml(req, res, next) {
  res.render( 'index' );
  return
}

function getJson (req, res, next) {
  var csv = req.body.csv;

  //var buf = conv.convert( req.body.csv );
  //csv = buf.toString();
  //var _listRow = csv.replace( /(\r\n|\r|\n)/g, '\n' ).split( '\n' );

  var _listRow = csv.replace( /(\r\n|\r|\n)/g, '\n' ).split( '\n' );

  var dataName = _listRow.shift(0).split(',');

  var createJson = _.map( _listRow, function ( values ) {
    var newData = {};
    var valuesArray = values.split(',');
    _.forEach( valuesArray, function ( value, key, object ) {
      newData[ dataName[key] ] = value;
    });
    return newData;
  });
  
  var str = JSON.stringify( createJson );
  res.json( str );
  return;
};

/* GET users listing. */
router.get('/', getHtml );

/* POST users listing. */
router.post('/', getJson );

module.exports = router;
