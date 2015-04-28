(function(window, document, $) {
  var $download, $droppable, $header, $inputfile, $main, $outputfile, cancelEvent, csv2json, handleDroppedFile, init, initLoadAnimation;
  $header = void 0;
  $main = void 0;
  $inputfile = void 0;
  $outputfile = void 0;
  $droppable = void 0;
  $download = void 0;
  csv2json = require('./modules/csv2json');
  cancelEvent = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  };
  handleDroppedFile = function(event) {
    var file, fileReader;
    file = event.originalEvent.dataTransfer.files[0];
    fileReader = new FileReader;
    fileReader.onload = function(event) {
      var blob, json, newFileName, resultdata;
      cancelEvent(event);
      resultdata = event.target.result;
      $inputfile.find('.file-name').text(file.name);
      $inputfile.find('.content').text(resultdata);
      json = csv2json(resultdata);
      newFileName = file.name.replace(/\.csv$/, '.json');
      $outputfile.find('.file-name').text(newFileName);
      $outputfile.find('.content').text(json);
      blob = new Blob([json], {
        'type': 'application/force-download',
        'disposition': 'attachment; filename=' + newFileName
      });
      window.URL = window.URL || window.webkitURL;
      $download.find('> a').attr('href', window.URL.createObjectURL(blob)).attr('download', newFileName);
    };
    fileReader.readAsText(file, 'SJIS');
    return false;
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
