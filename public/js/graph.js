var MAX_DATA_SET_LENGTH = 24;

var dbDocRef = database.ref().child('Distance_Values');
dbDocRef.on('child_added', (data) => {
    addData(data.val());
});




var canvas = document.getElementById('myChart');
var data = {
    labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
        '06:00', '07:00', '08:00', '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00'],
    datasets: [{
        label: 'Reading of water level by proximity sensor',
        data: [0],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 2,
        fill: true,
        pointBorderColor: 'rgba(204,102,102,1)',
        pointBorderWidth: 1,
    },]
}

var options = {
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero: true,
                callback: function(value) {
                    return value + ' inches';
                },
                min: 0,
                max: 20
            }
        }],
        xAxes: [{
            ticks: {
                type: 'linear',
                autoSkip: true,
                maxTicksLimit: 24,
            }
        }],
    },
    showLines: true
};
var myChart = new Chart.Line(canvas, {
    data: data,
    options: options
});

function addData(download = NaN) {
    var datasets = myChart.data.datasets;
    var downloadDataSet = datasets[0].data;

    var downloadDataLength = downloadDataSet.length;
    if (downloadDataLength > MAX_DATA_SET_LENGTH) {
        downloadDataSet.shift();
        didRemoveData = true;
    }

    downloadDataSet.push(download);
    myChart.update();
}
