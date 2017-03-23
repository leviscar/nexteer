/**
 * Created by Administrator on 2017/3/8.
 */
showScrapDay=Uday-1;
var UscrapMonth=Umonth.toString();
var UscrapDay=showScrapDay.toString();
if(Umonth<10&&Umonth>0){
     UscrapMonth="0"+UscrapMonth;
}
if(Uday<10&&Uday>0){
    UscrapDay="0"+UscrapDay;
}

$("#time").html("公元"+Uyear+"年"+Umonth+"月"+Uday+"日");
var nowScrapString = new safety_date(Uyear.toString(),UscrapMonth.toString() , UscrapDay.toString());
console.log(nowScrapString);
//显示前一天的报废金额
function showScrapData() {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/scrap-amount/getByDate",
        data: JSON.stringify(nowScrapString),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#scrapAmount").html(data.value);
            console.log(JSON.stringify(data));
            console.log("载入报废金额成功。。");

        },
        failure: function (errMsg) {
            console.log(errMsg);
            console.log("载入报废金额失败。。");
        }
    });
}
showScrapData();
setInterval(function () {
    showScrapData();
},1000*10*20);