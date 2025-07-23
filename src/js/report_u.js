// table
var data_tk = [
	[
		1,"EID", 3000, 100,  3100
	],
	[
		2, "SDK-LIVENESS-MATCH", 2000, 100, 2100
	],
	[
		3, "SDK-MATCH", 1000, 90, 1900
	],
	[
		4, "FACE-RECOG", 1500, 50, 1550
	],
];
var columns_tk = [
	{ title: "STT" },
	{ title: "Tên dịch vụ" },
	{ title: "Số lượng thành công" },
	{ title: "Số lượng thất bại" },
	{ title: "Tổng" }
]

var data_ds = [
	[
		"1hjsdfs-asj-84ruefh", "SDK-MATCH", "23:59:59 02-04-2025", 1, 1
	],
	[
		"97hgd-asj-84ruefh", "SDK-MATCH", "23:59:59 02-04-2025", 1, 1
	],
	[
		"5erefd-asj-84ruefh", "SDK-MATCH", "23:59:59 02-04-2025", 1, 1
	],
	[
		"9fdg-asj-84ruefh", "FACE-RECOG", "23:59:59 02-04-2025", 1, 1
	],
	[
		"46fgd-asj-84ruefh", "FACE-RECOG", "23:59:59 02-04-2025", 1, 1
	],
	[
		"54hjsdfs-asj-84ruefh", "EID", "23:59:59 02-04-2025", 1, 1
	],
	[
		"24hjsdfs-asj-84ruefh", "EID", "23:59:59 02-04-2025", 1, 1
	],
	[
		"34jsdfs-asj-84ruefh", "EID", "23:59:59 02-04-2025", 1, 1
	],
	[
		"67jsdfs-asj-84ruefh", "EID", "23:59:59 02-04-2025", 1, 1
	],
	[
		"3hjsdfs-asj-84ruefh", "EID", "23:59:59 02-04-2025", 1, 1
	],
	[
		"2hjsdfs-asj-84ruefh", "EID", "23:59:59 02-04-2025", 1, 1
	]
];
var columns_ds = [
	{ title: "Transaction ID" },
	{ title: "Dịch vụ" },
	{ title: "Thời gian" },
	{ title: "Status Code" },
	{ title: "Result" }
]


$(document).ready(function () {
	$("#table-tk").DataTable({
		data: data_tk,
		columns: columns_tk,
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
		// dom:'<"toolbar">lBfrtip',
		dom: "<'row mb-3'<'col-sm-12 col-md-6 d-flex align-items-center justify-content-start datatable-search'l><'col-sm-12 col-md-6 d-flex align-items-center justify-content-end datatable-btns'fB>>" +
                        "<'row'<'col-sm-12'tr>>" +
                        "<'row'<'col-sm-12 col-md-6 d-flex align-items-center justify-content-start'i><'col-sm-12 col-md-6 d-flex align-items-center justify-content-end'p>>",
		"pageLength": 10,
		responsive: true,
		buttons: ["excelHtml5"]
	});

	$("#table-ds").DataTable({
		data: data_ds,
		columns: columns_ds,
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
		// dom:'<"toolbar">lBfrtip',
		dom:"<'row mb-3'<'col-sm-12 col-md-6 d-flex align-items-center justify-content-start datatable-search'l><'col-sm-12 col-md-6 d-flex align-items-center justify-content-end datatable-btns'fB>>" +
                        "<'row'<'col-sm-12'tr>>" +
                        "<'row'<'col-sm-12 col-md-6 d-flex align-items-center justify-content-start'i><'col-sm-12 col-md-6 d-flex align-items-center justify-content-end'p>>",
		"pageLength": 10,
		responsive: true,
		buttons: [{
			extend: 'colvis',
			text: 'Hiển thị',
			columns: function (idx, data, node) {
				return $('#table-ds').DataTable().column(idx).visible();
			}
		}, "excelHtml5"
		]
	});
});

