var timestampField = 'timestamp';
var ignoreFields = ['timestamp', 'date', 'size', '_id', 'time'];

var fieldNames = {
    'speed': "Скорость",
    'pingMin': "Пинг min",
    'pingAvg': "Пинг avg",
    'pingMax': "Пинг max",
    'pingLossPercent': "Потери пакетов"
};

var balloons = {
    'speed': "Скорость: <b>[[value]]</b> КБ/с",
    'pingMin': "Пинг min: <b>[[value]]</b> мс",
    'pingAvg': "Пинг avg: <b>[[value]]</b> мс",
    'pingMax': "Пинг max: <b>[[value]]</b> мс",
    'pingLossPercent': "Потери пакетов: <b>[[value]]</b>%"
};

api.getData(function(data) {
    if (data.length == 0) {
        return;
    }

    for(var i = 0; i < data.length; ++i) {
        data[i].date = new Date(data[i][timestampField]);
    }

    var fields = Object.getOwnPropertyNames(data[0]);
    var valueAxes = [];
    var graphs = [];

    for(var i = 0; i < fields.length; ++i) {
        var field = fields[i];

        if (ignoreFields.indexOf(field) > -1) {
            continue;
        }

        valueAxes.push(
            {
                "id": field,
                "axisColor": COLORS[i],
                "axisThickness": 2
            }
        );

        graphs.push(
            {
                "valueAxis": field,
                "lineColor": COLORS[i],
                "bullet": "round",
                "bulletBorderThickness": 1,
                "lineThickness": 2,
                "hideBulletsCount": 30,
                "title": fieldNames[field],
                "valueField": field,
                "balloonText": "<div style='margin:5px; font-size:12px;'>" + balloons[field] + "</div>"
            }
        )
    }

    var chart = AmCharts.makeChart("chartdiv", {
        "type": "serial",
        "theme": "dark",
        "dataProvider": data,
        "graphs": graphs,
        "chartScrollbar": {},
        "chartCursor": {
            "cursorPosition": "mouse"
        },
        "valueAxis": valueAxes,
        "categoryField": "date",
        "legend": {
            "useGraphSettings": true
        },
        "categoryAxis": {
            "minPeriod": "ss",
            "parseDates": true
        },
        "numberFormatter": {
            "precision": 2
        }
    });
});