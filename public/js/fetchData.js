var urlsList = null;
var storedValues = 100;

jQuery(function() {
  var socket = io('http://localhost:8081');

  socket.on('savedData', function(res) {
    var date = new Date().getTime();
    $('#graph-container').append("<img src=loading.gif id='loading-image' style='align:center'>");
    for(var i = res.length - 1; i > -1; i--) {
      date -= 2000;
      updateGraphs(res[i], date, false);
    }
    $('#loading-image').remove();
  });

  socket.on('data', function(res) {
    var date = new Date().getTime();
    updateGraphs(res, date, true);
  });

  socket.on('urls', function(urls) {
    if(urlsList) {
      dataArray = [];
      warnings = [];
      $('#grid-mode').hide();
      $('#justify-mode').show();
      $('#graph-container').empty();
    }
    urlsList = urls;
    initGraphs(urls);
  });
});

//
// Changing grid mode
//

$('#justify-mode').hide();

$("#grid-mode").click(function() {
  $('#grid-mode').hide();
  $('#justify-mode').show();
  $('#graph-container').empty();
  for(var i = 0; i < dataArray.length; i++) {
    var html = '';
    html += '<div class=col-md-4>';
    html += dataArray[i].html;
    html += '</div>';
    $('#graph-container').append(html);
  }
});

$("#justify-mode").click(function() {
  $('#justify-mode').hide();
  $('#grid-mode').show();
  $('#graph-container').empty();
  for(var i = 0; i < dataArray.length; i++) {
    $('#graph-container').append(dataArray[i].html);
  }
});

//
// Slider Handler
//

$("#slider").slider({
  value: storedValues,
  min: 25,
  max: 500,
  step: 25,
  slide: function(event, ui) {
    $("#slider-value").html(ui.value);
    storedValues = ui.value;
  }
});

$("#slider-value").html($('#slider').slider('value'));
