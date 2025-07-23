// chart bar
var radiusPlus = 4;
Chart.elements.Rectangle.prototype.draw = function () {
    var ctx = this._chart.ctx;
    var vm = this._view;
    var left, right, top, bottom, signX, signY, borderSkipped;
    var borderWidth = vm.borderWidth;

    if (!vm.horizontal) {
        left = vm.x - vm.width / 2;
        right = vm.x + vm.width / 2;
        top = vm.y;
        bottom = vm.base;
        signX = 1;
        signY = bottom > top ? 1 : -1;
        borderSkipped = vm.borderSkipped || 'bottom';
    } else {
        left = vm.base;
        right = vm.x;
        top = vm.y - vm.height / 2;
        bottom = vm.y + vm.height / 2;
        signX = right > left ? 1 : -1;
        signY = 1;
        borderSkipped = vm.borderSkipped || 'left';
    }

    if (borderWidth) {
        var barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
        borderWidth = borderWidth > barSize ? barSize : borderWidth;
        var halfStroke = borderWidth / 2;
        var borderLeft = left + (borderSkipped !== 'left' ? halfStroke * signX : 0);
        var borderRight = right + (borderSkipped !== 'right' ? -halfStroke * signX : 0);
        var borderTop = top + (borderSkipped !== 'top' ? halfStroke * signY : 0);
        var borderBottom = bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0);

        if (borderLeft !== borderRight) {
            top = borderTop;
            bottom = borderBottom;
        }
        if (borderTop !== borderBottom) {
            left = borderLeft;
            right = borderRight;
        }
    }

    var barWidth = Math.abs(left - right);
    var roundness = this._chart.config.options.barRoundness || 0.5;
    var radius = barWidth * roundness * 0.5;

    var prevTop = top;

    top = prevTop + radius;
    var barRadius = top - prevTop;

    ctx.beginPath();
    ctx.fillStyle = vm.backgroundColor;
    ctx.strokeStyle = vm.borderColor;
    ctx.lineWidth = borderWidth;

    // draw the chart
    var x = left, y = (top - barRadius + 1), width = barWidth, height = bottom - prevTop, radius = barRadius + radiusPlus;

    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height);
    ctx.lineTo(x, y + height);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();

    ctx.fill();
    if (borderWidth) {
        ctx.stroke();
    }

    top = prevTop;
};

data_success = [1000, 1100, 1200, 1100];

var ctx2 = document.getElementById("chart-bar-2").getContext('2d');
const getGradient = (chart, ctx, chartArea, data, start_color, stop_color) => {
    let yAxis = chart.scales['y-axis-0'];
    y = parseFloat(yAxis.max);
    let width, height, gradient;
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (gradient === null || width !== chartWidth || height !== chartHeight) {
        width = chartWidth;
        height = chartHeight;
        var dt = parseFloat(data);
        var height_dt = dt * height / y;
        var top = chartArea.bottom - height_dt;
        gradient = ctx.createLinearGradient(0, chartArea.bottom, 0, top);
        gradient.addColorStop(0, stop_color);
        gradient.addColorStop(1, start_color);
        return gradient;

    }

}
var myChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ["EID", "SDK-LIVENESS-MATCH", "SDK-MATCH", "FACE-RECOG"],
        datasets: [{
            label: 'Thành công',
            backgroundColor: function (context) {
                const chart = context.chart;
                const {
                    ctx,
                    chartArea
                } = chart;
                if (!chartArea) {
                    return null;
                }
                const color = [];
                for(var i in data_success){
                    gradient = getGradient(chart, ctx, chartArea, data_success[i], '#007BFF', '#A1D6FC');
                    color.push(gradient);
                }
                return color;
            },
            data: [1000, 1100, 1200, 1100],
            borderWidth: 0,
            hoverBackgroundColor: "#0064e4"
        }, {
            label: 'Thất bại',
            backgroundColor: "#dfdfdf",
            data: [100, 120, 110, 150],
            borderWidth: 0,
            hoverBackgroundColor: "#bcbec0",
        },],
    },
    options: {
        tooltips: {
            displayColors: true,
            callbacks: {
                mode: 'x',
            },
        },
        scales: {
            xAxes: [{
                stacked: true,
                barThickness: 15,
                gridLines: {
                    // offsetGridLines: false,
                    display: false
                },
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                    beginAtZero: true,
                    suggestedMin: 50,
                    suggestedMax: 100
                },
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'SỐ LƯỢNG YÊU CẦU',
                    fontSize: 16,
                    fontColor: "#000000",
                },
            }]
        },
        responsive: true,
        maintainAspectRatio: true,
        legend: {
            position: 'bottom',
            labels: {
                generateLabels: function(chart){
                    var color = ["#007bff", "#3dfdfdf"]
                    var data = chart.data;
                    var legends = Array.isArray(data.datasets) ? data.datasets.map(function(dataset, i) {
                      return {
                        text: dataset.label,
                        fillStyle: (!Array.isArray(dataset.hoverBackgroundColor) ? dataset.hoverBackgroundColor : dataset.hoverBackgroundColor[0]),
                        hidden: !chart.isDatasetVisible(i),
                        lineCap: dataset.borderCapStyle,
                        lineDash: dataset.borderDash,
                        lineDashOffset: dataset.borderDashOffset,
                        lineJoin: dataset.borderJoinStyle,
                        lineWidth: dataset.borderWidth,
                        strokeStyle: dataset.borderColor,
                        pointStyle: dataset.pointStyle,
          
                        // Below is extra data used for toggling the datasets
                        datasetIndex: i
                      };
                    }, this) : [];
                    return legends;
                },
                usePointStyle: true,  //<-- set this
                fontColor: "#000000",
                fontFamily: 'Arial',
            }
        },
    }
});

// chart line
var ctx = document.getElementById("chart-line-1").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["12-02-2025", "13-02-2025", "14-02-2025", "15-02-2025", "16-02-2025", "17-02-2025", "18-02-2025", "19-02-2025", "20-02-2025", "21-02-2025", "22-02-2025", "23-02-2025", "24-02-2025", "25-02-2025", "26-02-2025", "27-02-2025", "28-02-2025", "01-03-2025", "02-03-2025", "03-03-2025", "04-03-2025"],
        datasets: [{
            label: 'FR',
            borderColor: "#009245",
            data: [1000, 1100, 1200, 1100, 1200, 1000, 1300, 1100, 1000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            fill: false
        }, {
            label: 'LD-FR',
            borderColor: "#f15a24",
            data: [1000, 1200, 1100, 1500, 1101, 1001, 1002, 950, 900, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            fill: false
        }, {
            label: 'LD',
            borderColor: "#007bff",
            data: [1000, 1020, 1010, 1050, 1011, 1010, 1020, 905, 920, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            fill: false
        }],
    },
    options: {
        title: {
            display: true,
        },
        responsive: true,
        maintainAspectRatio: true,
        legend: {
            position: 'bottom',
            labels: {
                // useLineStyle: true
                pointStyle: 'dash'
            }
        },
        scales: {
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'SỐ LƯỢNG YÊU CẦU',
                    fontSize: 16,
                    fontColor: "#000000",
                },
            }]
        }
    }

});

function timeRange(evt, idTime) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("div-timeRange");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(idTime).style.display = "block";
    evt.currentTarget.className += " active";
}