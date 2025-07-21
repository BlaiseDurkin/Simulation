/*
// Data for the line plot
var data = {
    labels: [],
    datasets: [
        {
            label: "",
            data: [],
            borderColor: "#3e95cd",
            fill: false
        }
    ]
};

// Configuration for the chart
var coptions = {
        animation: false,
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 3,
                bottom: 3
            }
        },
        title: {
            display: true,
            text: 'fuck'
        },
        legend: {
            display: true,
            position: "bottom",
            labels: {
                text: 'fuc me'
            }
        },
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }],
            xAxes: [{
                ticks: {
                    beginAtZero: true
                }

            }]
        }
    }

// Create the chart

var ctx = document.getElementById("myChart").getContext("2d");
var myChart = new Chart(ctx, {
    type: "line",
    data: data,
    options: coptions
});

// Highlight a specific point on the line
var highlightIndex = 3;
myChart.data.datasets[0].pointBackgroundColor = Array(myChart.data.datasets[0].data.length).fill("#3e95cd");
myChart.data.datasets[0].pointBackgroundColor[highlightIndex] = "red";
myChart.update();

myChart.data.datasets[0].pointRadius = Array(myChart.data.datasets[0].data.length).fill(3);
// Set the point radius for a specific data point
myChart.data.datasets[0].pointRadius[highlightIndex] = 5;
// Update the chart with the new point radius values
myChart.update();

// Create a new dataset that only contains the highlighted data point
var highlightData = Array(myChart.data.datasets[0].data.length).fill(null);
highlightData[highlightIndex] = myChart.data.datasets[0].data[highlightIndex];
var lineDataset = {
  label: 'Today '+myChart.data.datasets[0].data[highlightIndex],
  data: highlightData,
  borderColor: 'red',
  backgroundColor: 'green',
  borderWidth: 2,
  pointRadius: 0,
  pointHoverRadius: 0,
  lineTension: 0,
  type: 'line',
  fill: false
};

// Add the new dataset to the chart data and update the chart
myChart.data.datasets.push(lineDataset);

// Update the chart with the new annotation
myChart.update();




document.addEventListener("DOMContentLoaded", () => {
    linePlot("myChart", []);

*/