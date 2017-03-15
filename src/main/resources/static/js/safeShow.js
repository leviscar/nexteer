/**
 * Created by Administrator on 2017/3/10.
 */
$("#time").html("公元"+Uyear+"年"+Umonth+"月"+Uday+"日");
var UsafeMonth=Umonth.toString();
var UsafeDay=Uday.toString();
if(Umonth<10&&Umonth>0){
    USafeMonth="0"+Umonth.toString();
}
if(UsafeDay<10&&UsafeDay>0){
    UsafeDay="0"+UsafeDay.toString();
}

var jsonString = new safety_date(Uyear.toString(),UsafeMonth , UsafeDay);
$("#safeDay").html("0000");
//更新当前安全天数
function getNowData() {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/safetyDate/addDate",
        data: JSON.stringify(jsonString),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".loading").html(JSON.stringify(data));

        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/safetyDate/getDates",
        data: JSON.stringify(jsonString),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".loading").html(JSON.stringify(data));
            $("#safeDay").html(data.safe_dates);
            $("#actionStatus").html("更新当前日期为安全日期操作成功");
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
    $("#submitDay").html("公元"+Uyear+"年"+Umonth+"月"+Uday+"日");
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/safetyDate/getDates",
        data: JSON.stringify(jsonString),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".loading").html(JSON.stringify(data));
            $("#safeDay").html(data.safe_dates);
            $("#actionStatus").html("更新当前日期为安全日期操作成功");
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
}
getNowData();
// $("#addDay").bind("click",);