((window, document, $) ->

  $header     = undefined
  $main       = undefined
  $inputfile  = undefined
  $outputfile = undefined
  $droppable  = undefined
  $download   = undefined

  # require modules
  csv2jsonic = require( 'csv2jsonic' )()

  # option setup
  csv2jsonic.setup( {
    charset   : 'utf-8'
    delimitter: ':'
  })

  # Cancel
  cancelEvent = (event) ->
    event.preventDefault()
    event.stopPropagation()
    false


  # Drop
  handleDroppedFile = (event) ->
    event.preventDefault()

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

      ## 文字列を配列に変換
      resultSplit = resultdata.split( /\r\n|\r|\n/ )
      resultArray = []

      _.forEach( resultSplit, ( data )->
        row = data
        if row != ''
          # "で区切られたフォーマットの場合、"がないフォーマットに変換
          row = row
            .replace( /","/g, ',' )
            .replace( /^\"/g, '' )
            .replace( /\"$/g, '' )

        # CSVのセパレータ,部分を,,に変換
        row = row.replace( /([^\\]),/gm, '$1,,' )

        # エスケープ文字を削除
        row = row.replace( /\\/gm, '' )
        
        resultArray.push( row.split( /,,/gm ) )
      )

      # json変換
      json = JSON.stringify( csv2jsonic.convert( resultArray ) )

      # json内にエスケープ文字が増えてしまうので削除
      json = json.replace( /\\\\,/g, '\,' )

      #responseエリアの更新
      newFileName = file.name.replace(/\.csv$/i, '.json')
    
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
