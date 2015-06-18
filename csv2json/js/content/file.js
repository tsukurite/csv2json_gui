(function(window, document, $) {
  var $download, $droppable, $header, $inputfile, $main, $outputfile, cancelEvent, csv2jsonic, handleDroppedFile, init, initLoadAnimation;
  $header = void 0;
  $main = void 0;
  $inputfile = void 0;
  $outputfile = void 0;
  $droppable = void 0;
  $download = void 0;
  csv2jsonic = require('csv2jsonic')();
  csv2jsonic.setup({
    charset: 'utf-8',
    delimitter: ':'
  });
  cancelEvent = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };
  handleDroppedFile = function(event) {
    var file, fileReader;
    event.preventDefault();
    file = event.originalEvent.dataTransfer.files[0];
    fileReader = new FileReader;
    fileReader.readAsText(file, 'SJIS');
    fileReader.onload = function(event) {
      var blob, json, newFileName, resultArray, resultSplit, resultdata;
      cancelEvent(event);
      resultdata = event.target.result;
      $inputfile.find('.file-name').text(file.name);
      $inputfile.find('.content').text(resultdata);
      resultSplit = resultdata.split(/\r\n|\r|\n/);
      resultArray = [];
      _.forEach(resultSplit, function(data) {
        var row;
        row = data;
        if (row !== '') {
          row = row.replace(/","/g, ',').replace(/^\"/g, '').replace(/\"$/g, '');
        }
        row = row.replace(/([^\\]),/gm, '$1,,');
        row = row.replace(/\\/gm, '');
        return resultArray.push(row.split(/,,/gm));
      });
      json = JSON.stringify(csv2jsonic.convert(resultArray));
      console.table(csv2jsonic.convert(resultArray));
      json = json.replace(/\\\\,/g, '\,');
      newFileName = file.name.replace(/\.csv$/i, '.json');
      $outputfile.find('.file-name').text(newFileName);
      $outputfile.find('.content').text(json);
      blob = new Blob([json], {
        'type': 'application/force-download',
        'disposition': 'attachment; filename=' + newFileName
      });
      window.URL = window.URL || window.webkitURL;
      return $download.find('> a').attr('href', window.URL.createObjectURL(blob)).attr('download', newFileName);
    };
  };
  init = function() {
    if (!window.FileReader) {
      alert('File API がサポートされていません。');
      return false;
    }
    $header = $('#header');
    $inputfile = $('#inputfile');
    $outputfile = $('#outputfile');
    $main = $('#main');
    $droppable = $('#droppable');
    $download = $('#download');
    $droppable.on('dragenter', cancelEvent);
    $droppable.on('dragover', cancelEvent);
    $droppable.on('drop', handleDroppedFile);
    initLoadAnimation();
  };
  initLoadAnimation = function() {
    $header.velocity('stop').velocity({
      scaleX: 0,
      scaleY: 0
    }, {
      duration: 0
    }).velocity({
      scaleY: [1, 'easeOutQuart'],
      scaleX: [1, 'easeOutQuad']
    }, {
      duration: 300
    });
    $main.velocity('stop').velocity({
      opacity: 1
    }, {
      duration: 300
    });
  };
  $(window).on('load', function() {
    init();
  });
})(window, document, jQuery);
