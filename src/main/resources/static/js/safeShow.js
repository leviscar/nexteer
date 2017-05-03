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
var curTime = judgeTime(Uyear)+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
console.log("safeShow开始");
// console.log(jsonString);
//添加
// 当前安全天数
// function getNowData() {
//
//     $.ajax({
//         type: "POST",
//         url: "http://localhost:8080/nexteer/safety-date",
//         data: JSON.stringify(jsonString),
//         contentType: "application/json; charset=utf-8",
//         dataType: "json",
//         success: function (data) {
//             console.log(JSON.stringify(data));
//             $("#safeDay").html(data.safe_dates);
//             console.log("获取安全日期操作成功");
//         },
//         failure: function (errMsg) {
//             console.log(errMsg);
//         }
//     });
//
//     console.log("公元"+Uyear+"年"+Umonth+"月"+Uday+"日");
// }
function getSafeDay() {
    var nowYear = new Date().getFullYear();
    var nowMonth = new Date().getMonth()+1;
    var nowDay = new Date().getDate();
    var nowTime=judgeTime(nowYear)+"-"+judgeTime(nowMonth)+"-"+judgeTime(nowDay);
    console.log(nowTime);
    // var urlString = "http://localhost:8080/nexteer/safety-date/day?date="+nowTime;
    $.get("http://localhost:8080/nexteer/safety-date/day?date="+nowTime,function (data) {
        if($.parseJSON(data).system_status != false){
            console.log(JSON.stringify(data));
            $("#safeDay").html($.parseJSON(data).safe_dates);
            console.log("获取安全日期操作成功");
        }
    });
    // $.ajax({
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json'
    //     },
    //     type: 'GET',
    //     url: urlString,
    //     success: function (data) {
    //             if(data.system_status != false){
    //                 console.log(JSON.stringify(data));
    //                 $("#safeDay").html(data.safe_dates);
    //                 console.log("获取安全日期操作成功");
    //             }
    //
    //     },
    //     failure: function (errMsg) {
    //         console.log(errMsg);
    //         console.log('fail');
    //     }
    //
    // });
    $.get("http://localhost:8080/nexteer/safety-date/max",function (data) {

            console.log(JSON.stringify(data));
            $("#safeHigh").html(data);
            console.log("获取安全日期最大值操作成功");
    });
}
// getNowData();
setTimeout(getSafeDay(),1000);
// setInterval(getNowData(),1000*60*60);