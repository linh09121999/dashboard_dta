var data_user = [
    [
        1, "Nguyễn Văn A", "12345678", "A là"
    ],
    [
        2, "Đào Văn B", "44448888", "B là"
    ],
    [
        3, "Cao Ngọc C", "#1234ABcd", "C là"
    ],
];
var columns_user = [
    { title: "STT" },
    { title: "Tên đăng nhập" },
    { title: "Mật khẩu" },
    { title: "Mô tả" },
    { title: "Xóa" }

]

$(document).ready(function () {
    var table = $("#table-user").DataTable({
        data: data_user,
        columns: columns_user,
        paging: true,
        lengthChange: true,
        searching: true,
        ordering: true,
        info: true,
        autoWidth: false,
        dom: "<'row'<'col-sm-12'tr>>",
        'columnDefs': [
            {
                targets: 4, defaultContent: '<button id="delete-user" data-dismiss="modal" type="button"><i class="fa fa-trash-alt icon-delete"></i></button>'
            },
        ]
    });
    $('#delete-user').each(function () {
        $(this).on('click', function (evt) {
            $this = $(this);
            var dtRow = $this.parents('tr');
            if (confirm("Bạn có chắc chắn sẽ xóa hàng này không?")) {
                var table = $('#table-user').DataTable();
                table.row(dtRow[0].rowIndex - 1).remove().draw(false);
            }
        });
    });
})

function openTab(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}


function openTabAdd(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabaddcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tabAddlinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
};
// pop up dv
document.getElementById("add-dv").addEventListener('click', function () {
    $(".custom-model-main").addClass('model-open');
});
document.getElementById("close-btn").addEventListener('click', function () {
    $(".custom-model-main").removeClass('model-open');
});
document.getElementById("cancel-dv").addEventListener('click',function () {
    $(".custom-model-main").removeClass('model-open');
});
document.getElementById("save-dv").addEventListener('click',function () {
    $(".custom-model-main").removeClass('model-open');
});

// popup user
document.getElementById("addUser").addEventListener('click', function () {
    $(".custom-model-main-user").addClass('model-open-user');
});
document.getElementById("close-btn-user").addEventListener('click',function () {
    $(".custom-model-main-user").removeClass('model-open-user');
});
document.getElementById("cancel-user").addEventListener('click',function () {
    $(".custom-model-main-user").removeClass('model-open-user');
});
document.getElementById("save-user").addEventListener('click',function () {
    $(".custom-model-main-user").removeClass('model-open-user');
});

// popup kh
document.getElementById("addKH").addEventListener('click', function () {
    $(".custom-model-main-kh").addClass('model-open-kh');
});
document.getElementById("close-btn-kh").addEventListener('click',function () {
    $(".custom-model-main-kh").removeClass('model-open-kh');
});
document.getElementById("cancel-kh").addEventListener('click',function () {
    $(".custom-model-main-kh").removeClass('model-open-kh');
});
document.getElementById("save-kh").addEventListener('click',function () {
    $(".custom-model-main-kh").removeClass('model-open-kh');
});
document.getElementById("add-kh-User").addEventListener('click', function () {
    $(".custom-model-main-user").addClass('model-open-user');
});
document.getElementById("add-kh-dv").addEventListener('click', function () {
    $(".custom-model-main").addClass('model-open');
});