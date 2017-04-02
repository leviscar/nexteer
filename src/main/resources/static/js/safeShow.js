/**
 * Created by Administrator on 2017/3/10.
 */
function judgeTime(time) {
    var timeStr="";
    if (time<10){
        timeStr="0"+time.toString()
    }
    else {
        timeStr=time.toString()
    }
    return timeStr;
}
function safeDateInput(year,month,day) {
    this.year = year;
    this.month = month;
    this.day = day;
}
var jsonString = new safeDateInput(judgeTime(Uyear),judgeTime(Umonth) , judgeTime(Uday));
$("#safeDay").html("0000");
console.log("safeShow开始");
console.log(jsonString);
//更新当前安全天数
function getNowData() {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/safetyDate/getDates",
        data: JSON.stringify(jsonString),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(JSON.stringify(data));
            $("#safeDay").html(data.safe_dates);
            console.log("获取安全日期操作成功");
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
    console.log("公元"+Uyear+"年"+Umonth+"月"+Uday+"日");
}
getNowData();
setInterval(getNowData(),1000*60*60);