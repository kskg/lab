/* Code
---------------------------------------------------------------------- */

// Replace 'document.getElementByID, getElementsByTagName, querySelectorAll'
var $id  = function(id)  { return document.getElementById(id); };
var $tag = function(tag) { return document.getElementsByTagName(tag); };
var $qsa = function(qsa) { return document.querySelectorAll(qsa); };

(function() {

  var list = $id('list');
  var listItem = $qsa('.list__item');
  var dragItem;

  function handleDragStart(event) {
    this.classList.add('drag')
    dragItem = this;
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/html', this.innerHTML);

    // リストの最後尾にドロップエリアを生成
    var dropArea = document.createElement('li');
    dropArea.classList.add('list__item', 'droparea');
    dropArea.setAttribute('draggable', 'true');
    dropArea.addEventListener('dragstart', handleDragStart, false);
    dropArea.addEventListener('dragend', handleDragEnd, false);
    dropArea.addEventListener('dragenter', handleDragEnter, false);
    dropArea.addEventListener('dragleave', handleDragLeave, false);
    dropArea.addEventListener('dragover', handleDragOver, false);
    dropArea.addEventListener('drop', handleDrop, false);
    list.appendChild(dropArea);
  }

  function handleDragEnd(event) {
    for (var i = 0, len = listItem.length; i < len; i++) {
      listItem[i].classList.remove('enter', 'drag');
    }

    // 追加したドロップエリアを削除
    var deleteTarget = $qsa('.droparea');
    for (var i = 0, len = deleteTarget.length; i < len; i++) {
      deleteTarget[i].parentNode.removeChild(deleteTarget[i]);
    }
  }

  function handleDragEnter(event) {
    if (dragItem === this) {
      this.classList.add('drag');
    } else {
      this.classList.add('enter');
    }
  }

  function handleDragLeave(event) {
    this.classList.remove('enter');
  }

  function handleDragOver(event) {
    if (event.preventDefault) { event.preventDefault(); }
    event.dataTransfer.dropEffect = 'move';
    return false;
  }

  function handleDrop(event) {
    if (event.stopPropagation) { event.stopPropagation(); }
    this.parentNode.insertBefore(dragItem, this);
    return false;
  }

  // イベントの登録
  for (var i = 0, len = listItem.length; i < len; i++) {
    listItem[i].addEventListener('dragstart', handleDragStart, false); // ドラッグが開始された時
    // listItem[i].addEventListener('drag', handleDrag, false);           // ドラッグしている間
    listItem[i].addEventListener('dragend', handleDragEnd, false);     // ドラッグが終了した時
    listItem[i].addEventListener('dragenter', handleDragEnter, false); // ドロップ領域に入った時
    listItem[i].addEventListener('dragleave', handleDragLeave, false); // ドロップ領域から出た時
    listItem[i].addEventListener('dragover', handleDragOver, false);   // ドロップ領域に入っている間
    listItem[i].addEventListener('drop', handleDrop, false);           // ドロップされた時
  }

}());


