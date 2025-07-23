

// real time
function getDateTime() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    if (month.toString().length == 1) {
        month = '0' + month;
    }
    if (day.toString().length == 1) {
        day = '0' + day;
    }
    if (hour.toString().length == 1) {
        hour = '0' + hour;
    }
    if (minute.toString().length == 1) {
        minute = '0' + minute;
    }
    if (second.toString().length == 1) {
        second = '0' + second;
    }
    var dateTime = hour + ':' + minute + ':' + second + ' ' + day + '-' + month + '-' + year;
    return dateTime;
}

// example usage: realtime clock
setInterval(function () {
    currentTime = getDateTime();
    document.getElementById("digital-clock").innerHTML = currentTime;
}, 1000);

const optionNav = document.querySelector(".select-nav"),
    selectBtn_Nav = optionNav.querySelector(".select-btn-nav"),
    optionsNav = optionNav.querySelectorAll(".option-nav");

selectBtn_Nav.addEventListener("click", () =>
    optionNav.classList.toggle("active")
);

optionsNav.forEach((option) => {
    option.addEventListener("click", () => {

        optionsNav.classList.remove("active");
        option.classList.toggle("active");
    });
});

const optionfun = document.querySelector(".select-fun"),
    selectBtn_Fun = optionfun.querySelector(".select-btn-fun"),
    optionsFun = optionfun.querySelectorAll(".option-fun");

selectBtn_Fun.addEventListener("click", () =>
    optionfun.classList.toggle("active")
);

optionsFun.forEach((option) => {
    option.addEventListener("click", () => {

        optionfun.classList.remove("active");
        option.classList.toggle("active");
    });
});

