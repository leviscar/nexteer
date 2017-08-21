/**
 * Created by Administrator on 2017/7/6.
 */


$(document).ready(function () {
    function addOeeInput(addDate, cellName,tarOee) {
        this.addDate  = addDate;
        this.cellName = cellName;
        this.targetOee= tarOee;
    }
    function judgeMyTime(time) {
        var timeStr="";
        if (time<10){
            timeStr="0"+time.toString()
        }
        else {
            timeStr=time.toString()
        }
        return timeStr;
    }
    console.log("开始运行oeeSet");
    $("#addOeeSub").bind("click", function () {

        var addOeeJson=new addOeeInput($("#addOeeDate").val().toString(),$("#addOeeCell").val().toString(),Number($("#addOeeTar").val()));
        console.log("start");
        console.log(JSON.stringify(addOeeJson));
        $.ajax({
            type: "POST",
            url: "http://10.1.0.40:8080/nexteer/oee/target",
            data:JSON.stringify(addOeeJson),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                // $("#addOeeStatus").html("添加"+data.addDate+"目标值为"+data.targetOee);
                $("#addOeeStatus").html("成功");
                switch (data.cellName){
                    case "ISHAFT1": line="第一条中间轴";
                        break;
                    case "ISHAFT2": line="第二条中间轴";
                        break;
                    case "ISHAFT3": line="第三条中间轴";
                        break;
                    case "ISHAFT4": line="第四条中间轴";
                        break;
                    case "BEPS3": line="有刷产线";
                        break;
                    case "CEPS5": line="无刷产线";
                        break;
                }
                $("#oeeIshaftTable").find('tbody').empty();
                getOeeData();

            },
            failure: function (errMsg) {
                console.log(errMsg);
            }
        });

        setInterval(function () {
            $("#addOeeStatus").html("");
        },1000*7);
    });

    function getOeeData() {
        console.log("oee");
        var date=new Date();
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        var day=date.getDate();
        var time=year+"-"+judgeMyTime(month)+"-"+judgeMyTime(day);
        var yesTime=year+"-"+judgeMyTime(month)+"-"+judgeMyTime(day-1);
        var url="http://10.1.0.40:8080/nexteer/oee/period?start="+time+"&end="+time;
        $.get(url,function (data) {
            console.log(data);
            console.log(typeof data);
            var oeeData=data;
            console.log(oeeData[oeeData.length-1]);
            var i;
            var ISHAFT1Data=[];
            var ISHAFT2Data=[];
            var ISHAFT3Data=[];
            var ISHAFT4Data=[];
            var BEPSData=[];
            var CEPSData=[];
            ((oeeData.length<=19)?(i=0):(i=oeeData.length-19));

            for (i;i<oeeData.length;i++){
                var line;
                switch (oeeData[i].cellName){
                    case "ISHAFT1": line="第一条中间轴";
                        ISHAFT1Data.push(oeeData[i]);
                        break;
                    case "ISHAFT2": line="第二条中间轴";
                        ISHAFT2Data.push(oeeData[i]);
                        break;
                    case "ISHAFT3": line="第三条中间轴";
                        ISHAFT3Data.push(oeeData[i]);
                        break;
                    case "ISHAFT4": line="第四条中间轴";
                        ISHAFT4Data.push(oeeData[i]);
                        break;
                    case "BEPS3": line="有刷产线";
                        BEPSData.push(oeeData[i]);
                        break;
                    case "CEPS5": line="无刷产线";
                        CEPSData.push(oeeData[i]);
                        break;
                }
                // $("#oeeIshaftTable").prepend("<tbody><tr><td>"+oeeData[i].addDate+"</td><td>"+line+"</td><td>"+oeeData[i].targetOee
                //     +"</td></tr></tbody>");

            }
            (ISHAFT1Data.length<=0)?(console.log("")):($("#oeeIshaftTable").append("<tbody><tr><td>"+ISHAFT1Data[ISHAFT1Data.length-1].addDate+"</td><td>"+"第一条中间轴"+"</td><td>"+ISHAFT1Data[ISHAFT1Data.length-1].targetOee
                    +"</td></tr></tbody>"));
            (ISHAFT2Data.length<=0)?(console.log("")):($("#oeeIshaftTable").append("<tbody><tr><td>"+ISHAFT2Data[ISHAFT2Data.length-1].addDate+"</td><td>"+"第二条中间轴"+"</td><td>"+ISHAFT2Data[ISHAFT2Data.length-1].targetOee
                    +"</td></tr></tbody>"));
            (ISHAFT3Data.length<=0)?(console.log("")):($("#oeeIshaftTable").append("<tbody><tr><td>"+ISHAFT3Data[ISHAFT3Data.length-1].addDate+"</td><td>"+"第三条中间轴"+"</td><td>"+ISHAFT3Data[ISHAFT3Data.length-1].targetOee
                    +"</td></tr></tbody>"));
            (ISHAFT4Data.length<=0)?(console.log("")):($("#oeeIshaftTable").append("<tbody><tr><td>"+ISHAFT4Data[ISHAFT4Data.length-1].addDate+"</td><td>"+"第四条中间轴"+"</td><td>"+ISHAFT4Data[ISHAFT4Data.length-1].targetOee
                    +"</td></tr></tbody>"));
            (BEPSData.length<=0)?(console.log("")):($("#oeeIshaftTable").append("<tbody><tr><td>"+BEPSData[BEPSData.length-1].addDate+"</td><td>"+"有刷产线"+"</td><td>"+BEPSData[BEPSData.length-1].targetOee
                    +"</td></tr></tbody>"));
            (CEPSData.length<=0)?(console.log("")):($("#oeeIshaftTable").append("<tbody><tr><td>"+CEPSData[CEPSData.length-1].addDate+"</td><td>"+"无刷产线"+"</td><td>"+CEPSData[CEPSData.length-1].targetOee
                    +"</td></tr></tbody>"));
        })
    }
    getOeeData();
});

