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
$("#time").html("公元"+Uyear+"年"+Umonth+"月"+Uday+"日");
// var nowScrapString = new safety_date(Uyear.toString(),UscrapMonth.toString() , UscrapDay.toString());
var curTime = judgeTime(Uyear)+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday-1);
// console.log(nowScrapString);
//显示前一天的报废金额
function showScrapData() {
    // $.ajax({
    //     type: "POST",
    //     url: "http://localhost:8080/nexteer/scrap-amount/getByDate",
    //     data: JSON.stringify(nowScrapString),
    //     contentType: "application/json; charset=utf-8",
    //     dataType: "json",
    //     success: function (data) {
    //         $("#Ishaft1ScrapAmount").html(data.value);
    //         console.log(JSON.stringify(data));
    //         console.log("载入报废金额成功。。");
    //
    //     },
    //     failure: function (errMsg) {
    //         console.log(errMsg);
    //         console.log("载入报废金额失败。。");
    //     }
    // });
    $.get("http://localhost:8080/nexteer/scrap-amount/day?date="+curTime,function (data) {
        var IshaftArray=0;
        var CEPSArray = 0;
        var BEPSArray =0;
            // $("#BEPSScrapAmount").html($.parseJSON(data).beps_value);
            // $("#CEPSScrapAmount").html($.parseJSON(data).ceps_value);
            // console.log($.parseJSON(data));
            // var result= $.parseJSON(data).ishaft1_value + $.parseJSON(data).ishaft2_value + $.parseJSON(data).ishaft3_value + $.parseJSON(data).ishaft4_value;
            // $("#Ishaft1ScrapAmount").html(result);
        $.each($.parseJSON(data), function (i, model) {
            switch (model.cellName){
                case "ISHAFT1":
                    IshaftArray+=model.value;
                    break;
                case "ISHAFT2":
                    IshaftArray+=model.value;
                    break;
                case "ISHAFT3":
                    IshaftArray+=model.value;
                    break;
                case "ISHAFT4":
                    IshaftArray+=model.value;
                    break;
                case "CEPS1":
                    CEPSArray+=model.value;
                    break;
                case "CEPS2":
                    CEPSArray+=model.value;
                    break;
                case "CEPS3":
                    CEPSArray+=model.value;
                    break;
                case "CEPS4":
                    CEPSArray+=model.value;
                    break;
                case "CEPS5":
                    CEPSArray+=model.value;
                    break;
                case "BEPS1":
                    BEPSArray+=model.value;
                    break;
                case "BEPS2":
                    BEPSArray+=model.value;
                    break;
                case "BEPS3":
                    BEPSArray+=model.value;
                    break;
            }
        });
        $("#BEPSScrapAmount").html(BEPSArray);
        $("#CEPSScrapAmount").html(CEPSArray);
        $("#Ishaft1ScrapAmount").html(IshaftArray);
            console.log("载入报废金额成功。。");

    });
}
showScrapData();
setInterval(function () {
    showScrapData();
},1000*10*20);