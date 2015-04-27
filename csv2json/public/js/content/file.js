(function( window, document, $ ) {

  var $header, $main, $inputfile, $outputfile, $droppable, $download;


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
      
      $.ajax({
        url: '/csv2json/',
        type: 'POST',
        data: { csv: resultdata, } 
      }).done( function ( res ) {

        // #inputfileエリアの更新
        $inputfile.find( '.file-name' ).text( file.name );
        $inputfile.find( '.content' ).text( resultdata );


        // #responseエリアの更新
        var newFileName = file.name.replace( /\.csv$/, '.json' );
        $outputfile.find( '.file-name' ).text( newFileName );
        $outputfile.find( '.content' ).text( res );

        // ファイルダウンロード用のURL作成
        var blob = new Blob([ res ], {
          "type" : "application/force-download",
          "disposition": "attachment; filename=" + newFileName
        });
        window.URL = window.URL || window.webkitURL;

        // ファイルダウンロード用のリンク更新
        $download.find( '> a' )
          .attr("href", window.URL.createObjectURL(blob))
          .attr("download", newFileName );
      });
    }
    fileReader.readAsText( file, 'SJIS' );
  
    return false;
  }



  function init() {
    // File API が使用できない場合は諦めます.
    if(!window.FileReader) {
      alert("File API がサポートされていません。");
      return false;
    }


    // 要素のキャッシュ
    $header     = $( '#header' );
    $inputfile  = $( '#inputfile' );
    $outputfile = $( '#outputfile' );
    $main       = $( '#main' );
    $droppable  = $( '#droppable' );
    $download   = $( '#download' );

    // dragenter, dragover イベントのデフォルト処理をキャンセルします.
    $droppable.on("dragenter", cancelEvent);
    $droppable.on("dragover", cancelEvent);

    // ドロップ時のイベントハンドラを設定します.
    $droppable.on("drop", handleDroppedFile);

    initLoadAnimation();
  }

  function initLoadAnimation() {
    $header
      .velocity( 'stop' )
      .velocity( { scaleX:0, scaleY:0 }, { duration:0 } )
      .velocity( {
        scaleY  : [ 1, "easeOutQuart" ],
        scaleX  : [ 1, "easeOutQuad" ]
      },{
        duration : 300
      });

    $main
      .velocity( 'stop' )
      .velocity( {
        opacity : 1
      }, {
        duration : 300
      });
  }

  $(window).on( 'load', function () {
    init();
  });


})( window, document, jQuery );
