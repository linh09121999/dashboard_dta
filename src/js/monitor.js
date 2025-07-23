// chart line
var ctx = document.getElementById("chart-line-2").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ["00:01 ", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "22:00"],
        datasets: [{
            label: 'time',
            borderColor: "#0F3B99",
            backgroundColor: "#F8FDFF",
            data: [10, 12, 6, 11, 8, 5, 8, 9, 13, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            fill: true
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
                useLineStyle: true,
            },
            display: false
        },
        scales: {
            // xAxes:[{
            //     display: true,
            //     scaleLabel: {
            //         display: true,
            //         labelString: 'GIỜ',
            //         fontSize: 16,
            //         fontColor: "#000000",
            //     },
            // }],
            yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'THỜI GIAN PHẢN HỒI',
                    fontSize: 16,
                    fontColor: "#000000",
                },
            }]
        }
    }

})

// table
var data_success = [
    [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]
];

var data_false = [
    [
        1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        9, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        10, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ],
    [
        11, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ]
];
var columns_success = [
    { title: "STT" },
    { title: "Datetime" },
    { title: "Transld" },
    { title: "API" },
    { title: "Status" },
    { title: "Error" },
    { title: "Message" },
    { title: "StatusCode" },
    { title: "Data.result" },
    { title: "ErrorDetail" },
    { title: "Response_time" }
];
var columns_false = [
    { title: "STT" },
    { title: "Datetime" },
    { title: "Transld" },
    { title: "API" },
    { title: "Status" },
    { title: "Error" },
    { title: "Message" },
    { title: "StatusCode" },
    { title: "Data.result" },
    { title: "ErrorDetail" },
    { title: "Response_time" }
];
$(document).ready(function () {
    $("#table-success").DataTable({
        data: data_success,
        columns: columns_success,
        paging: true,
        lengthChange: true,
        searching: true,
        language: {
			searchPlaceholder: 'Tìm kiếm...',
			search: "",
			"sEmptyTable": "Không có dữ liệu trong bảng",
			"sLoadingRecords": "Đang tải...",
			"sZeroRecords": "Không tìm thấy hồ sơ phù hợp",
			"sInfoEmpty": 'Không có mục nào hiển thị',
			lengthMenu: 'Hiển thị _MENU_ mục',
		},
		"infoCallback": function (settings, start, end, max, total, pre) {
			return "Hiện thị " + start + " đến " + end + " trên " + total + " mục";
		},
        ordering: true,
        info: true,
        autoWidth: false,
		dom: "<'row mb-1'<'col-sm-12 col-md-6 d-flex align-items-center justify-content-start datatable-search'l><'col-sm-12 col-md-6 d-flex align-items-center justify-content-end datatable-btns'fB>>" +
			"<'row'<'col-sm-12'tr>>" +
			"<'row'<'col-sm-12 col-md-6 d-flex align-items-center justify-content-start'i><'col-sm-12 col-md-6 d-flex align-items-center justify-content-end'p>>",
        responsive: true,
        buttons: [{
            extend: 'colvis',
            text: 'Hiển thị',
            columns: function (idx, data, node) {
                return $('#table-success').DataTable().column(idx).visible();
            }
        }]
    });

    $("#table-false").DataTable({
        data: data_false,
        columns: columns_false,
        paging: true,
        lengthChange: true,
        searching: true,
        language: {
			searchPlaceholder: 'Tìm kiếm...',
			search: "",
			"sEmptyTable": "Không có dữ liệu trong bảng",
			"sLoadingRecords": "Đang tải...",
			"sZeroRecords": "Không tìm thấy hồ sơ phù hợp",
			"sInfoEmpty": 'Không có mục nào hiển thị',
			lengthMenu: 'Hiển thị _MENU_ mục',
		},
		"infoCallback": function (settings, start, end, max, total, pre) {
			return "Hiện thị " + start + " đến " + end + " trên " + total + " mục";
		},
        ordering: true,
        info: true,
        autoWidth: false,
        dom: "<'row mb-1'<'col-sm-12 col-md-6 d-flex align-items-center justify-content-start datatable-search'l><'col-sm-12 col-md-6 d-flex align-items-center justify-content-end datatable-btns'fB>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-6 d-flex align-items-center justify-content-start'i><'col-sm-12 col-md-6 d-flex align-items-center justify-content-end'p>>",
        responsive: true,
        buttons: [{
            extend: 'colvis',
            text: 'Hiển thị',
            columns: function (idx, data, node) {
                return $('#table-false').DataTable().column(idx).visible();
            }
        }]
    });
});

const optionMenu = document.querySelector(".select-menu"),
    selectBtn = optionMenu.querySelector(".select-btn"),
    options = optionMenu.querySelectorAll(".option"),
    sBtn_text = optionMenu.querySelector("#sBtn-text-date");

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

document.getElementById("div-select-date").addEventListener('click', function () {
    $(".custom-model-main-time").addClass('model-open-time');
});

document.getElementById("close-btn-date").addEventListener('click', function () {
    $(".custom-model-main-time").removeClass('model-open-time');
});

document.getElementById("cancel-select-date").addEventListener('click', function () {
    $(".custom-model-main-time").removeClass('model-open-time');
});



document.getElementById("save-select-date").addEventListener('click', function () {
    // $(".btn-transparent").click(function(){
    //     let selectedYear = document.querySelector(".btn-year").innerText; //.btn-year là class buton (F12 để trỏ đến class ấy, chứ nó ở trong thư viện gốc)

    //     let selectedmonth = document.querySelector(".selected");// tương tự
    //     if(selectedmonth){
    //         let month = selectedmonth.querySelector(".month").innerText; //tương tự
    //         sBtn_text.innerText = month+ " - " +selectedYear;

    //         $(".custom-model-main-time").removeClass('model-open-time');
    //         optionMenu.classList.remove("active");
    //     }
    //     else {
    //         sBtn_text.innerText =  selectedYear;
    //         $(".custom-model-main-time").removeClass('model-open-time');
    //         optionMenu.classList.remove("active");
    //     }
    // })


    let selectedDay = document.querySelector(".selected");// tương tự
    if (selectedDay) {
        let selectedYear = document.querySelector(".btn-year").innerText; //.btn-year là class buton (F12 để trỏ đến class ấy, chứ nó ở trong thư viện gốc)
        let selectedMonth = document.querySelector(".btn-month").innerText;
        let day = selectedDay.querySelector(".day").innerText; //tương tự
        console.log(day + " - " + selectedMonth + " - " + selectedYear)
        sBtn_text.innerText = day + " - " + selectedMonth + " - " + selectedYear;

        $(".custom-model-main-time").removeClass('model-open-time');
        optionMenu.classList.remove("active");
    }
    else {
        alert("Bạn chưa chọn thời gian");
    }
});


