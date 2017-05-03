/**
 * Created by Administrator on 2017/4/20.
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
function noComDateInput(addDate) {
    this.addDate = addDate;
}

var curTime = judgeTime(Uyear)+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
var jsonString = new noComDateInput(curTime);
console.log("noComShow开始");
console.log(jsonString);
//更新当前无抱怨天数
function getNCOMNowData() {

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/nexteer/quality-complain",
        data: JSON.stringify(jsonString),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(JSON.stringify(data));
            $("#noComDay").html(data.noCom_dates);
            console.log("获取无抱怨日期操作成功");
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });

    console.log("公元"+Uyear+"年"+Umonth+"月"+Uday+"日");
}
function getnoComDay() {

    $.get("http://localhost:8080/nexteer/quality-complain/day?date="+curTime,function (data) {
        if(data.system_status != false){
            console.log(JSON.stringify(data));

            $("#noComDay").html($.parseJSON(data).count);
            console.log("获取无抱怨日期操作成功");
        }
    });
    $.get("http://localhost:8080/nexteer/quality-complain/max",function (data) {

        console.log(JSON.stringify(data));
        $("#noComHigh").html(data);
        console.log("获取无抱怨日期最大值操作成功");
    });

}
getNCOMNowData();
setTimeout(getnoComDay(),1000);
setInterval(getNCOMNowData(),1000*60*60);