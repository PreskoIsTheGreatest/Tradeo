var chart;
var chartData;
var loadChart = function (chartData) {
    if (chart == null) {
        google.charts.setOnLoadCallback(drawChart);
    }
    drawChart();
};

function loadChartFromData(){
    var type=document.getElementById('filter_type').value;
    var name=document.getElementById('filter_name').value;
    var period=document.getElementById('filter_period').value;
    var filters={
        type,
        name,
        period
    };
    $.ajax({
        url: 'offer/graph/' + JSON.stringify(filters),
        type: "POST",
        contentType: "application/json;charset=UTF-8",
    }).success(function (docs) {
        console.log(docs);
        prepareData(docs,(result)=>{
            loadChart(result);
        })
    })

}

function prepareData(docs,cb){
    chartData=[['Период', 'Цена']];
    docs.reverse().map(function(el){
        chartData.push([""+el._id,el.avgPrice]);
    });
    if(chartData.length===1){
        chartData.push(["0",0]);
    }
    cb(chartData);
}

google.charts.load('current', {'packages':['corechart']});

function drawChart() {
    console.log(chartData);
    var data = google.visualization.arrayToDataTable(chartData);

    var options = {
        title: 'Цена за Период',
        hAxis: {title: 'Период',  titleTextStyle: {color: '#511c39'}},
        vAxis: {minValue: 0}
    };
    console.log(data);
    chart = new google.visualization.AreaChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}