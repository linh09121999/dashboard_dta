// Chart bar
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

var ctx1 = document.getElementById("chart-bar-1").getContext('2d');

const data_success = [100, 1100, 1800, 1100, 1200, 1000, 1300, 1100, 1000];

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


var myChart1 = new Chart(ctx1, {
    type: 'bar',
    data: {
        labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28"],
        datasets: [{
            label: 'Thành công',
            data: data_success,
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
                for (var i in data_success) {
                    gradient = getGradient(chart, ctx, chartArea, data_success[i], '#007BFF', '#A1D6FC');
                    color.push(gradient);
                }
                return color;
            },
            borderWidth: 0,
            hoverBackgroundColor: "#0064e4",
        }, {
            label: 'Thất bại',
            backgroundColor: "#dfdfdf",
            data: [100, 120, 110, 150, 111, 101, 102, 95, 90],
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
                generateLabels: function (chart) {
                    var data = chart.data;
                    var legends = Array.isArray(data.datasets) ? data.datasets.map(function (dataset, i) {
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
                usePointStyle: true, //<-- set this
                // fontColor: "#000000",
                // fontFamily: 'Arial',
            },
        },
    }
});

// chart doughnut
Chart.pluginService.register({
    beforeDraw: function (chart) {
        if (chart.config.options.elements.center) {
            // Get ctx from string
            var ctx = chart.chart.ctx;

            // Get options from the center object in options
            var centerConfig = chart.config.options.elements.center;
            var fontStyle = centerConfig.fontStyle || 'Arial';
            var txt = centerConfig.text;
            var color = centerConfig.color || '#000';
            var maxFontSize = centerConfig.maxFontSize || 75;
            var sidePadding = centerConfig.sidePadding || 20;
            var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
            // Start with a base font of 30px
            ctx.font = "30px " + fontStyle;

            // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
            var stringWidth = ctx.measureText(txt).width;
            var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

            // Find out how much the font can grow in width.
            var widthRatio = elementWidth / stringWidth;
            var newFontSize = Math.floor(30 * widthRatio);
            var elementHeight = (chart.innerRadius * 2);

            // Pick a new font size so it will not be larger than the height of label.
            var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
            var minFontSize = centerConfig.minFontSize;
            var lineHeight = centerConfig.lineHeight || 25;
            var wrapText = false;

            if (minFontSize === undefined) {
                minFontSize = 20;
            }

            if (minFontSize && fontSizeToUse < minFontSize) {
                fontSizeToUse = minFontSize;
                wrapText = true;
            }

            // Set font settings to draw it correctly.
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
            var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
            ctx.font = fontSizeToUse + "px " + fontStyle;
            ctx.fillStyle = color;

            if (!wrapText) {
                ctx.fillText(txt, centerX, centerY);
                return;
            }

            var words = txt.split(' ');
            var line = '';
            var lines = [];

            // Break words up into multiple lines if necessary
            for (var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + ' ';
                var metrics = ctx.measureText(testLine);
                var testWidth = metrics.width;
                if (testWidth > elementWidth && n > 0) {
                    lines.push(line);
                    line = words[n] + ' ';
                } else {
                    line = testLine;
                }
            }

            // Move the center up depending on line height and number of lines
            centerY -= (lines.length / 2) * lineHeight;

            for (var n = 0; n < lines.length; n++) {
                ctx.fillText(lines[n], centerX, centerY);
                centerY += lineHeight;
            }
            //Draw text in center
            ctx.fillText(line, centerX, centerY);
        }
    }
});

var ctx1 = document.getElementById("chart-doughnut-1").getContext('2d');
var gradientSuccess = ctx1.createLinearGradient(0, 0, 0, 300);
gradientSuccess.addColorStop(0.3, '#007BFF');
gradientSuccess.addColorStop(0, '#A1D6FC');

var myChartDoughnut1 = new Chart(ctx1, {
    type: 'doughnut',
    data: {
        labels: ["Thành công", "Thất bại"],
        datasets: [{
            backgroundColor: [
                gradientSuccess,
                "#dfdfdf",
            ],
            data: [7000, 3000],
            borderWidth: 0,
            hoverBorderColor: [gradientSuccess, '#dfdfdf'],
            // hoverBackgroundColor:["#0f1999"] ,
            hoverBorderWidth: 3
        }]
    },
    options: {
        maintainAspectRatio: false,
        legend: {
            position: "bottom",
            display: false,
        },
        cutoutPercentage: 70,
        elements: {
            // center: {
            //     text: '10000',
            //     color: '#000000', // Default is #000000
            //     fontStyle: 'Arial', // Default is Arial
            //     sidePadding: 20, // Default is 20 (as a percentage)
            //     minFontSize: 25, // Default is 20 (in px), set to false and text will not wrap.
            //     lineHeight: 25 // Default is 25 (in px), used for when text wraps
            // }
        },
    },
});


var ctx2 = document.getElementById("chart-doughnut-2").getContext('2d');
var myChartDoughnut2 = new Chart(ctx2, {
    type: 'doughnut',
    data: {
        labels: ["NCP", "GTELPAY", "VCB", "PVCB", "EPAY", "MOMO", "ARG", "VIETINBANK", "TCB", "TPBANK", "BIDV"],
        datasets: [{
            backgroundColor: [
                "#0f3b99",
                "#5886e9",
                "#ffc505",
                "#ff9705",
                "#a1d6fc",
                "#37cdc0",
                "#75d475",
                "#ff5005",
                "#ae6ceb",
                "#cc54b5",
                "#99000f"
            ],
            data: [1800, 1000, 800, 900, 500, 1100, 400, 700, 1100, 800, 400],
            borderWidth: 0,
            hoverBorderColor: [
                "#0f3b99",
                "#5886e9",
                "#ffc505",
                "#ff9705",
                "#a1d6fc",
                "#37cdc0",
                "#75d475",
                "#ff5005",
                "#ae6ceb",
                "#cc54b5",
                "#99000f"],
            hoverBorderWidth: 3
        }]
    },
    options: {
        maintainAspectRatio: false,
        legend: {
            position: "bottom",
            display: false,
        },
        cutoutPercentage: 70,
    },
});



const optionMenu = document.querySelector(".select-menu"),
    selectBtn = optionMenu.querySelector(".select-btn"),
    options = optionMenu.querySelectorAll(".option"),
    sBtn_text = optionMenu.querySelector("#sBtn-text-month");

selectBtn.addEventListener("click", () =>
    optionMenu.classList.toggle("active")
);

options.forEach((option) => {
    option.addEventListener("click", () => {
        let selectedOption = option.querySelector(".option-text").innerText;
        sBtn_text.innerText = selectedOption;

        optionMenu.classList.remove("active");
        option.classList.toggle("active");
    });
});



document.getElementById("div-select-month").addEventListener('click', function () {
    $(".custom-model-main-time").addClass('model-open-time');
});

document.getElementById("close-btn-month").addEventListener('click', function () {
    $(".custom-model-main-time").removeClass('model-open-time');
});

document.getElementById("cancel-select-month").addEventListener('click', function () {
    $(".custom-model-main-time").removeClass('model-open-time');
});


document.getElementById("save-select-month").addEventListener('click', function () {
    //.btn-year là class buton (F12 để trỏ đến class ấy, chứ nó ở trong thư viện gốc)

    let selectedmonth = document.querySelector(".selected");// tương tự
    if (selectedmonth) {
        let selectedYear = document.querySelector(".btn-year").innerText;
        let month = selectedmonth.querySelector(".month").innerText; //tương tự
        sBtn_text.innerText = month + " - " + selectedYear;
        $(".custom-model-main-time").removeClass('model-open-time');
        optionMenu.classList.remove("active");
    }
    else {
        let selectedYear = document.querySelector(".btn-year").innerText;
        sBtn_text.innerText = selectedYear;
        $(".custom-model-main-time").removeClass('model-open-time');
        optionMenu.classList.remove("active");
    }
});
