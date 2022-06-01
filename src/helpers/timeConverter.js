"use strict";
exports.__esModule = true;
function default_1(timestmap) {
    var date = new Date(timestmap * 1000);
    var hours = "0" + date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();
    var day = "0" + date.getDate();
    var month = "0" + (date.getMonth() + 1);
    var year = date.getFullYear();
    var result = day.substr(-2) +
        "/" +
        month.substr(-2) +
        "/" +
        year +
        " " +
        hours.substr(-2) +
        ":" +
        minutes.substr(-2) +
        ":" +
        seconds.substr(-2);
    return result;
}
exports["default"] = default_1;
