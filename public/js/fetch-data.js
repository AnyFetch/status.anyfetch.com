var urlsList = null;

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
  var graph = new Graph(socket.source);
  socket.on('reconnect', function() {
    socket.emit('source', socketSource);
  });

  socket.emit('source', socketSource);
  socket.on('data', function(res) {
    var date = new Date().getTime();
    graph.updateGraphs(res, date, true);
  });

  socket.on('urls', function(urls) {
    if(urlsList) {
      graph.dataArray = [];
      graph.warnings = [];
      $('#grid-mode').show();
      $('#justify-mode').hide();
      $('#graph-container').empty();
      $('#global-graph').empty();
    }
    urlsList = urls;
    graph.initGraphs(urls);
  });

  //
  // Changing grid mode
  //

  $('#grid-mode').hide();

  $("#grid-mode").click(function() {
    $('#grid-mode').hide();
    $('#justify-mode').show();
    $('#graph-container').empty();
    for(var i = 0; i < graph.dataArray.length; i++) {
      var html = '';
      html += '<div class=col-md-4>';
      html += graph.dataArray[i].html;
      html += '</div>';
      $('#graph-container').append(html);
    }
  });

  $("#justify-mode").click(function() {
    $('#justify-mode').hide();
    $('#grid-mode').show();
    $('#graph-container').empty();
    for(var i = 0; i < graph.dataArray.length; i++) {
      $('#graph-container').append(graph.dataArray[i].html);
    }
  });
};
