(function( window, document, $ ) {

  var $droppable = $("#droppable");
  var $response  = $("#response");
  
  // File API が使用できない場合は諦めます.
  if(!window.FileReader) {
    alert("File API がサポートされていません。");
    return false;
  }
  
  // Cancel
  var cancelEvent = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
  }
  
  // Drop
  var handleDroppedFile = function(event) {
    // ファイルは複数ドロップされる可能性がありますが, ここでは 1 つ目のファイルを扱います.
    var file = event.originalEvent.dataTransfer.files[0];
  
    // ファイルの内容は FileReader で読み込みます.
    var fileReader = new FileReader();
    fileReader.onload = function(event) {
      // デフォルトの処理をキャンセルします.
      cancelEvent(event);

      var resultdata = event.target.result;

      var $data = $droppable.find( '.data' )
      $data.find( '.file-name' ).text( file.name );
      $data.find( '.content' ).text( resultdata );
      $droppable.removeClass( 'non-data' );


      $.ajax({
        url: '/csv2json/',
        type: 'POST',
        data: { csv: resultdata, } 
      }).done( function ( res ) {
        $response.find( '.content' ).text( res );
        $response.removeClass( 'non-data' );
      });
    }
    fileReader.readAsText(file);
  
    return false;
  }
 


  // dragenter, dragover イベントのデフォルト処理をキャンセルします.
  $droppable.on("dragenter", cancelEvent);
  $droppable.on("dragover", cancelEvent);

  // ドロップ時のイベントハンドラを設定します.
  $droppable.on("drop", handleDroppedFile);


})( window, document, jQuery );
