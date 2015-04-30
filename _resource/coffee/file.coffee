((window, document, $) ->

  $header     = undefined
  $main       = undefined
  $inputfile  = undefined
  $outputfile = undefined
  $droppable  = undefined
  $download   = undefined

  # require modules
  csv2json = require( './modules/csv2json' )

  # Cancel
  cancelEvent = (event) ->
    event.preventDefault()
    event.stopPropagation()
    false


  # Drop
  handleDroppedFile = (event) ->
    # ファイルは複数ドロップされる可能性がありますが, ここでは 1 つ目のファイルを扱います.
    file = event.originalEvent.dataTransfer.files[0]
    # ファイルの内容は FileReader で読み込みます.
    fileReader = new FileReader

    fileReader.readAsText file, 'SJIS'

    fileReader.onload = (event) ->
      # デフォルトの処理をキャンセルします.
      cancelEvent event
      resultdata = event.target.result

      # #inputfileエリアの更新
      $inputfile.find('.file-name').text file.name
      $inputfile.find('.content').text resultdata

      # json変換
      csv2json( resultdata )
        .done( ( _json )->
          json = _json

          #responseエリアの更新
          newFileName = file.name.replace(/\.csv$/, '.json')
    
          $outputfile.find('.file-name').text newFileName
          $outputfile.find('.content').text json
    
          # ファイルダウンロード用のURL作成
          blob = new Blob([ json ],
            'type': 'application/force-download'
            'disposition': 'attachment; filename=' + newFileName)
          window.URL = window.URL or window.webkitURL
    
          # ファイルダウンロード用のリンク更新
          $download.find('> a').attr('href', window.URL.createObjectURL(blob)).attr 'download', newFileName
          return
        )
    return false

  init = ->
    # File API が使用できない場合は諦めます.
    if !window.FileReader
      alert 'File API がサポートされていません。'
      return false

    # 要素のキャッシュ
    $header     = $('#header')
    $inputfile  = $('#inputfile')
    $outputfile = $('#outputfile')
    $main       = $('#main')
    $droppable  = $('#droppable')
    $download   = $('#download')

    # dragenter, dragover イベントのデフォルト処理をキャンセルします.
    $droppable.on 'dragenter', cancelEvent
    $droppable.on 'dragover', cancelEvent

    # ドロップ時のイベントハンドラを設定します.
    $droppable.on 'drop', handleDroppedFile
    initLoadAnimation()
    return

  initLoadAnimation = ->
    $header.velocity('stop').velocity({
      scaleX: 0
      scaleY: 0
    }, duration: 0).velocity {
      scaleY: [
        1
        'easeOutQuart'
      ]
      scaleX: [
        1
        'easeOutQuad'
      ]
    }, duration: 300
    $main.velocity('stop').velocity { opacity: 1 }, duration: 300
    return

  $(window).on 'load', ->
    init()
    return

  return
) window, document, jQuery
