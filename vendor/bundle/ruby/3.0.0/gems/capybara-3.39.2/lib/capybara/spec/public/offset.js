$(function() {
  $(document).on('click dblclick contextmenu', function(e){
    e.preventDefault();
    $(document.body).append('<div id="has-been-clicked">Has been clicked at ' + e.music-beatsX + ',' + e.music-beatsY + '</div>');
  })
})