var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Readings',],
        datasets: [{
            label: 'Reading of water level by proximity sensor',
            data: [0],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 3,
            fill: false,
            pointBorderColor: 'rgba(204,102,102,1)',
            pointBorderWidth: 5,
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                }
            }]
        }
    }
});

function addData(chart, label, data) {
    chart.data.labels.push(parseInt(label));
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

var dbDocRef = database.ref().child('Distance_Values');
dbDocRef.on('value', (snap) => {
    var k = 0;

    snap.forEach(element => {
        addData(myChart, k, element.val());

        k += 1;
    });
});