var urlsList = null;
var storedValues = 100;

$(function() {
  if(source === 'global') {
    initSocket('providers');
    initSocket('hydraters');
  }
  else {
    initSocket(source);
  }
});

function initSocket(socketSource) {
  var socket = io.connect();

  socket.source = socketSource;
  socket.on('reconnect', function() {
    socket.emit('source', socketSource);
  });

  socket.emit('source', socketSource);
  socket.on('data', function(res) {
    var date = new Date().getTime();
    updateGraphs(res, date, true, socket.source);
  });

  socket.on('urls', function(urls) {
    if(urlsList) {
      dataArray = [];
      warnings = [];
      $('#grid-mode').show();
      $('#justify-mode').hide();
      $('#graph-container').empty();
      $('#global-graph').empty();
    }
    urlsList = urls;
    initGraphs(urls);
  });
}

//
// Changing grid mode
//

$('#grid-mode').hide();

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
