var urlsList = null;
var storedValues = 100;

jQuery(function() {
  var socket = io('http://localhost:8081');

  socket.on('data', function(res) {
    var date = new Date().getTime();
    updateGraphs(res, date);
  });

  socket.on('urls', function(urls) {
    if(urlsList) {
      dataArray = [];
      for(var i = 0; i < urls.length; i++) {
        $('.flot-' + urls[i][0]).remove();
      }
    }
    urlsList = urls;
    initGraphs(urls);
  });
});

//
// Changing grid mode
//

$('#grid-mode').hide();

$("#grid-mode").click(function() {
  $('#grid-mode').hide();
  $('#justify-mode').show();
  $('#graph-container').empty();
  for (var i = 0; i < dataArray.length; i++) {
    $('#graph-container').append(dataArray[i].html);
  }
});

$("#justify-mode").click(function() {
  $('#justify-mode').hide();
  $('#grid-mode').show();
  $('#graph-container').empty();

  for(var i = 0; i < dataArray.length; i++) {
    var html = '';
    html += '<div class=col-md-4>';
    html += dataArray[i].html;
    html += '</div>'
    $('#graph-container').append(html);
  }
});

//
// Slider Handler
//

$("#slider").slider({
  value: storedValues,
  min: 0,
  max: 500,
  step: 50,
  slide: function(event, ui) {
    $("#slider-value").html(ui.value);
    storedValues = ui.value;
  }
});

$("#slider-value").html($('#slider').slider('value'));
