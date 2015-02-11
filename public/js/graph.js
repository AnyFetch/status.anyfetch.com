var dataArray = [];
var warnings = [];

function initGraphs(providers) {
  $.each(providers, function(index, value) {
    var dataSet = {
      name: index.charAt(0).toUpperCase() + index.slice(1) + ' provider - ' + value,
      dataSet: [{label: "Documents pending", data: [], color: "#00FF00"}],
      id: index,
      options: getOptions(),
      html: ''
    };
    dataSet.html = generateHtml(dataSet);
    $('#graph-container').append(dataSet.html);
    dataArray.push(dataSet);
  });
}

function updateAll() {
  for(var i = 0; i < dataArray.length; i++) {
    $.plot($('#flot-' + dataArray[i].id), dataArray[i].dataSet, dataArray[i].options);
  }
}

function generateHtml(dataSet) {
  return ("<div class='panel panel-default'><div class='panel-heading'>" +
    dataSet.name + "</div><div id=flot-" + dataSet.id +
    " style='height:300px;'></div></div>");
}

function updateGraphs(data, date, realtime) {
  for(var i = 0; i < dataArray.length; i++) {
    if(dataArray[i].options.yaxis.max < data[dataArray[i].id].pending_documents) {
      dataArray[i].options.yaxis.max = data[dataArray[i].id].pending_documents;
    }
    while(dataArray[i].dataSet[0].data.length > storedValues) {
      dataArray[i].dataSet[0].data.shift();
    }
    if(data[dataArray[i].id].pending_documents > -1) {
      dataArray[i].dataSet[0].data.push([date, data[dataArray[i].id].pending_documents]);
    }
    else {
      var found = false;
      if(warnings.length === 0) {
        warnings.push([dataArray[i].name, 5]);
      }
      else {
        for(var j = 0; j < warnings.length; j++) {
          if(warnings[j][0] === dataArray[i].name) {
            found = true;
          }
        }
        if(!found) {
          warnings.push([dataArray[i].name, 5]);
        }
      }
    }
    for(var j = warnings.length - 1; j > -1; j--) {
      $('#critical-status').append(warnings[j][0] + '</br>');
      if(warnings[j][1] > 0) {
        warnings[j][1] -= 1;
      }
      else {
        warnings.splice(j, 1);
      }
    }
  }
  if (realtime) {
    showWarnings();
    updateAll();
  }
}

function showWarnings() {
  $('#critical-status').empty();
  if(warnings.length !== 0) {
    $('#critical-status').append('<p>Not Responding: ' + warnings.length + '</p>');
  }
  else {
    $('#critical-status').append('<p>Everything looks good!</p>Documents pending:</br>');
    for(var i = 0; i < dataArray.length; i++) {
      $('#critical-status').append(
        dataArray[i].dataSet[0].data[dataArray[i].dataSet[0].data.length - 1][1] + ' - ' + dataArray[i].id + '</br>');
    }
  }
}

function getOptions() {
  var options = {
    series: {
      lines: {
        show: true,
        lineWidth: 1.2,
        fill: true
      }
    },
    xaxis: {
      mode: "time",
      tickSize: [2, "second"],
      tickFormatter: function(v, axis) {
        var date = new Date(v);

        if(date.getSeconds() % 20 === 0) {
          var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
          var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
          var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

          return hours + ":" + minutes + ":" + seconds;
        }
        else {
          return "";
        }
      },
      axisLabel: "Time",
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelFontFamily: 'Verdana, Arial',
      axisLabelPadding: 10
    },
    yaxis: {
      min: 0,
      max: 50,
      axisLabel: "Documents pending",
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelFontFamily: 'Verdana, Arial',
      axisLabelPadding: 10
    },
    legend: {
      labelBoxBorderColor: "#fff"
    },
    grid: {
      backgroundColor: "#000000",
      tickColor: "#008040"
    }
  };
  return options;
}
