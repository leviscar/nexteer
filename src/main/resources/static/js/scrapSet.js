/**
 * Created by Administrator on 2017/3/29.
 */
function addScrap(year, month, day,is1Value, is2Value, is3Value,is4Value,cepsValue,bepsValue) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.ishaft1_value = is1Value;
    this.ishaft2_value = is2Value;
    this.ishaft3_value= is3Value;
    this.ishaft4_value = is4Value;
    this.ceps_value = cepsValue;
    this.beps_value = bepsValue;
}
//添加报废金额
$("#addScrap").bind("click",function () {


    var addScrapTime=$("#scrapAddTime").val().split("-");
    console.log(addScrapTime);

    var year=addScrapTime[0];
    var month=addScrapTime[1];
    var startday=addScrapTime[2];
    var addScrapJson=new addScrap(addScrapTime[0].toString(),addScrapTime[1].toString(),addScrapTime[2].toString(),Number($("#scrapIshaft1AddValue").val()),Number($("#scrapIshaft2AddValue").val()),Number($("#scrapIshaft3AddValue").val()),Number($("#scrapIshaft4AddValue").val()),Number($("#scrapCEPSAddValue").val()),Number($("#scrapBEPSAddValue").val()));
    console.log(year);

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/scrap-amount/add",
        data: JSON.stringify(addScrapJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            console.log(JSON.stringify(data));
            console.log('nice');
            if(data.status==true){
                $("#addScrapStu").html("添加报废金额成功");
            }


        },
        failure: function (errMsg) {
            console.log(errMsg);
            console.log('fail');
            $("#addScrapStu").html("添加报废金额失败");
        }

    });
});


//更新报废金额
$("#resetScrap").bind("click",function () {


    var resScrapTime=$("#scrapResTime").val().split("-");
    console.log(resScrapTime);

    var year=resScrapTime[0];
    var month=resScrapTime[1];
    var startday=resScrapTime[2];
    var resScrapJson=new addScrap(resScrapTime[0].toString(),resScrapTime[1].toString(),resScrapTime[2].toString(),Number($("#scrapIshaft1ResValue").val()),Number($("#scrapIshaft2ResValue").val()),Number($("#scrapIshaft3ResValue").val()),Number($("#scrapIshaft4ResValue").val()),Number($("#scrapCEPSResValue").val()),Number($("#scrapBEPSResValue").val()));
    console.log(year);

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/scrap-amount/add",
        data: JSON.stringify(resScrapJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {

            console.log(JSON.stringify(data));
            console.log('nice');
            if(data.status==true){
                $("#resScrapStu").html("更新报废金额成功");
            }
            if(data.status==false){
                $("#resScrapStu").html(data.log);
            }


        },
        failure: function (errMsg) {
            console.log(errMsg);
            console.log('fail');
            $("#addScrapStu").html("添加报废金额失败");
        }

    });
});