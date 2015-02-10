var dataArray = [];

function initGraphs(providers) {
  for(var i = 0; i < providers.length; i++) {
    var dataSet = {
      name: providers[i][0].charAt(0).toUpperCase() + providers[i][0].slice(1) + ' provider - ' + providers[i][1],
      dataSet: [{label: "Documents pending", data: [], color: "#00FF00"}],
      id: providers[i][0],
      options: getOptions()
    };
    var html = "<div class='panel panel-default'><div class='panel-heading'>" + dataSet.name + "</div><div id=flot-" + dataSet.id + " style='height:300px'></div></div>";
    $('.container').append(html);
    dataArray.push(dataSet);
  }
}

function updateAll() {
  for(var i = 0; i < dataArray.length; i++) {
    $.plot($('#flot-' + dataArray[i].id), dataArray[i].dataSet, dataArray[i].options);
  }
}

function updateGraphs(data, date) {
  for(var i = 0; i < dataArray.length; i++) {
    if(dataArray[i].options.yaxis.max < data[dataArray[i].id].pending_documents) {
      dataArray[i].options.yaxis.max = data[dataArray[i].id].pending_documents;
    }
    dataArray[i].dataSet[0].data.push([date, data[dataArray[i].id].pending_documents]);
  }
  updateAll();
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
      max: 10000,
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
