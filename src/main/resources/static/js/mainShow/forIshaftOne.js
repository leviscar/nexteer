
/**
 * Created by Administrator on 2017/4/8.
 */
/**
 * Created by Administrator on 2017/3/30.
 */
var IshaftTitle=["Ishaft1","Ishaft2","Ishaft3","Ishaft4"];
IshaftOEEValue=["00","00","00","00"];
IshaftOEEHref = ["http://10.1.0.40:8080/nexteer/ishaft1OEESec.html","http://10.1.0.40:8080/nexteer/OEEIshaftTwoWeekView.html","http://10.1.0.40:8080/nexteer/OEEIshaftThrWeekView.html","http://10.1.0.40:8080/nexteer/OEEIshaftFouWeekView.html"];

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
function mainOeeInput(curr_time,cell_name) {
    this.curr_time=curr_time;
    this.cell_name=cell_name;
}
function getMainOee() {
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    var currTime = judgeTime(year)+"-"+judgeTime(month)+"-"+judgeTime(day)+" "+judgeTime(date.getHours())+":"+judgeTime(date.getMinutes())+":"+judgeTime(date.getSeconds());
    // var currTime = "2017-03-23 15:00:00";
    // var cellName = "ISHAFT1";
    // var mainOeeJson = new mainOeeInput(currTime,cellName);
    // console.log(mainOeeJson);
    console.log("getMainOee开始");
    // $.ajax({
    //     type: "POST",
    //     url: "http://10.1.0.40:8080/nexteer/dashboard/oee",
    //     data: JSON.stringify(mainOeeJson),
    //     contentType: "application/json; charset=utf-8",
    //     dataType: "json",
    //     success: function (data) {
    //         if(data.system_status ==false){
    //             console.log(JSON.stringify(data));
    //         }
    //         else {
    //             console.log(JSON.stringify(data));
    //             console.log("获取"+cellName+"Oee成功");
    //             $("#showIshaft1OeeValue").html(data.oee+"%");
    //         }
    //
    //     },
    //     failure: function (errMsg) {
    //         console.log(errMsg);
    //     }
    // });
    $.get("http://10.1.0.40:8080/nexteer/dashboard/oee/ISHAFT1?time="+currTime,function (data) {
        if($.parseJSON(data).system_status != false){
            if($.parseJSON(data).open != false){
                console.log(JSON.stringify(data));
                console.log("获取Oee成功");
                $("#showIshaft1OeeValue").html($.parseJSON(data).oee+"%");
                switch ($.parseJSON(data).status)
                {
                    case -1:
                        $("#oeeISStatus").replaceWith("<div class=\"col-md-6 \" id=\"hceISStatus\"><img src=\"images/Rainy.png\" alt=\"NICE\"></div>");
                        break;
                    case 0:
                        $("#oeeISStatus").replaceWith("<div class=\"col-md-6 \" id=\"hceISStatus\"><img src=\"images/Cloudy.png\" alt=\"NICE\"></div>");
                        break;
                    case 1:
                        $("#oeeISStatus").replaceWith("<div class=\"col-md-6 \" id=\"hceISStatus\"><img src=\"images/Sunny.png\" alt=\"NICE\"></div>");
                        break;
                    default:
                        $("#oeeISStatus").replaceWith("<div class=\"col-md-6 \" id=\"hceISStatus\"></div>");
                }
            }
            else{
                console.log("休班");
            }

        }
    });
    $.get("http://10.1.0.40:8080/nexteer/dashboard/oee/BEPS?time="+currTime,function (data) {
        if($.parseJSON(data).system_status != false){
            if($.parseJSON(data).open != false){
                console.log(JSON.stringify(data));

                $("#showMainBEPSoee").html($.parseJSON(data).oee.toFixed(1)+"%");
                console.log("获取oee操作成功");
                switch ($.parseJSON(data).status)
                {
                    case -1:
                        $("#oeeBEPSStatus").replaceWith("<div class=\"col-md-6 \" id=\"oeeBEPSStatus\"><img src=\"images/Rainy.png\" alt=\"NICE\"></div>");
                        break;
                    case 0:
                        $("#oeeBEPSStatus").replaceWith("<div class=\"col-md-6 \" id=\"oeeBEPSStatus\"><img src=\"images/Cloudy.png\" alt=\"NICE\"></div>");
                        break;
                    case 1:
                        $("#oeeBEPSStatus").replaceWith("<div class=\"col-md-6 \" id=\"oeeBEPSStatus\"><img src=\"images/Sunny.png\" alt=\"NICE\"></div>");
                        break;
                    default:
                        $("#oeeBEPSStatus").replaceWith("<div class=\"col-md-6 \" id=\"oeeBEPSStatus\"></div>");
                }
            }
            else{
                console.log("休班");
            }

        }
    });
    $.get("http://10.1.0.40:8080/nexteer/dashboard/oee/CEPS?time="+currTime,function (data) {
        if($.parseJSON(data).system_status != false){
            if($.parseJSON(data).open != false){
                console.log(JSON.stringify(data));

                $("#showMainCEPSoee").html($.parseJSON(data).oee.toFixed(1)+"%");
                console.log("获取oee操作成功");
                switch ($.parseJSON(data).status)
                {
                    case -1:
                        $("#oeeCEPSStatus").replaceWith("<div class=\"col-md-6 \" id=\"oeeCEPSStatus\"><img src=\"images/Rainy.png\" alt=\"NICE\"></div>");
                        break;
                    case 0:
                        $("#oeeCEPSStatus").replaceWith("<div class=\"col-md-6 \" id=\"oeeCEPSStatus\"><img src=\"images/Cloudy.png\" alt=\"NICE\"></div>");
                        break;
                    case 1:
                        $("#oeeCEPSStatus").replaceWith("<div class=\"col-md-6 \" id=\"oeeCEPSStatus\"><img src=\"images/Sunny.png\" alt=\"NICE\"></div>");
                        break;
                    default:
                        $("#oeeCEPSStatus").replaceWith("<div class=\"col-md-6 \" id=\"oeeCEPSStatus\"></div>");
                }
            }
            else{
                console.log("休班");
            }

        }
    });
}
function getMainPro() {
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    var currTime = judgeTime(year)+"-"+judgeTime(month)+"-"+judgeTime(day)+" "+judgeTime(date.getHours())+":"+judgeTime(date.getMinutes())+":"+judgeTime(date.getSeconds());
    // var currTime = "2017-03-23 15:00:00";
    // var cellName = "ISHAFT1";
    // var mainOeeJson = new mainOeeInput(currTime,cellName);
    // var urlString = "http://10.1.0.40:8080/nexteer/dashboard/output/ISHAFT1?time="+currTime;
    // console.log(mainOeeJson);
    console.log("getMainPro开始");
    // $.ajax({
    //     type: "POST",
    //     url: urlString,
    //     data: JSON.stringify(mainOeeJson),
    //     acceptType:"application/json",
    //     contentType: "application/json",
    //     dataType: "json",
    //     success: function (data) {
    //         if (data.system_status !=false){
    //             console.log(JSON.stringify(data));
    //             console.log("获取"+cellName+"OutPut成功");
    //             $("#tarOut").html(data.target);
    //             $("#curOut").html(data.curr_output);
    //             $("#reachRate").html(data.reach_rate+"%");
    //         }
    //
    //     },
    //     failure: function (errMsg) {
    //         console.log(errMsg);
    //     }
    // });
    $.get("http://10.1.0.40:8080/nexteer/dashboard/output/ISHAFT1?time="+currTime,function (data) {
        if($.parseJSON(data).system_status != false){
            if($.parseJSON(data).open != false){
                console.log(JSON.stringify(data));
                console.log("获取Oee成功");
                console.log(JSON.stringify(data));
                console.log("获取"+cellName+"OutPut成功");
                $("#tarOut").html($.parseJSON(data).target);
                $("#curOut").html($.parseJSON(data).curr_output);
                $("#reachRate").html($.parseJSON(data).reach_rate+"%");
                switch ($.parseJSON(data).status)
                {
                    case -1:
                        $("#status").replaceWith("<td class=\" noPadding\" id=\"status\"><a href=\"http://10.1.0.40:8080/nexteer/Ishaft1Unit.html\"><img  src=\"images/down.png\" alt=\"NICE\"></a></td>");
                        break;
                    case 0:
                        $("#status").replaceWith("<td class=\" noPadding\" id=\"status\"><a href=\"http://10.1.0.40:8080/nexteer/Ishaft1Unit.html\"><img class=\"slider\" src=\"images/slider.png\" alt=\"NICE\"></a></td>");
                        break;
                    case 1:
                        $("#status").replaceWith("<td class=\" noPadding\" id=\"status\"><a href=\"http://10.1.0.40:8080/nexteer/Ishaft1Unit.html\"><img  src=\"images/up.png\" alt=\"NICE\"></a></td>");
                        break;
                    default:
                        $("#status").replaceWith("<td class=\" noPadding\" id=\"status\"><a href=\"http://10.1.0.40:8080/nexteer/Ishaft1Unit.html\"></a></td>");
                }
            }
            else{
                console.log("休班");
            }

        }
    });
    $.get("http://10.1.0.40:8080/nexteer/dashboard/output/ISHAFT2?time="+currTime,function (data) {
        if($.parseJSON(data).system_status != false){
            if($.parseJSON(data).open != false){
                $(".secTable>tbody>tr:nth-child(4)>td:nth-child(2)").html($.parseJSON(data).shift_type);
                $(".secTable>tbody>tr:nth-child(4)>td:nth-child(3)").html($.parseJSON(data).target);
                $(".secTable>tbody>tr:nth-child(4)>td:nth-child(4)").html($.parseJSON(data).curr_output);
                $(".secTable>tbody>tr:nth-child(4)>td:nth-child(5)").html($.parseJSON(data).reach_rate+"%");
                switch ($.parseJSON(data).status)
                {
                    case -1:
                        $(".secTable>tbody>tr:nth-child(4)>td:nth-child(6)").replaceWith("<td class=\" noPadding\" ><a href=\"http://10.1.0.40:8080/nexteer/html/Unit/Ishaft2Unit.html\"><img  src=\"images/down.png\" alt=\"NICE\"></a></td>");
                        break;
                    case 0:
                        $(".secTable>tbody>tr:nth-child(4)>td:nth-child(6)").replaceWith("<td class=\" noPadding\" ><a href=\"http://10.1.0.40:8080/nexteer/html/Unit/Ishaft2Unit.html\"><img class=\"slider\" src=\"images/slider.png\" alt=\"NICE\"></a></td>");
                        break;
                    case 1:
                        $(".secTable>tbody>tr:nth-child(4)>td:nth-child(6)").replaceWith("<td class=\" noPadding\" ><a href=\"http://10.1.0.40:8080/nexteer/html/Unit/Ishaft2Unit.html\"><img  src=\"images/up.png\" alt=\"NICE\"></a></td>");
                        break;
                    default:
                        $(".secTable>tbody>tr:nth-child(4)>td:nth-child(6)").replaceWith("<td class=\" noPadding\" ><a href=\"http://10.1.0.40:8080/nexteer/html/Unit/Ishaft2Unit.html\"></a></td>");
                }
            }
            else{
                console.log("休班");
            }

        }
    });
    $.get("http://10.1.0.40:8080/nexteer/dashboard/output/ISHAFT3?time="+currTime,function (data) {
        if($.parseJSON(data).system_status != false){
            if($.parseJSON(data).open != false){
                $(".secTable>tbody>tr:nth-child(5)>td:nth-child(2)").html($.parseJSON(data).shift_type);
                $(".secTable>tbody>tr:nth-child(5)>td:nth-child(3)").html($.parseJSON(data).target);
                $(".secTable>tbody>tr:nth-child(5)>td:nth-child(4)").html($.parseJSON(data).curr_output);
                $(".secTable>tbody>tr:nth-child(5)>td:nth-child(5)").html($.parseJSON(data).reach_rate+"%");
                switch ($.parseJSON(data).status)
                {
                    case -1:
                        $(".secTable>tbody>tr:nth-child(5)>td:nth-child(6)").replaceWith("<td class=\" noPadding\" ><a href=\"http://10.1.0.40:8080/nexteer/html/Unit/Ishaft3Unit.html\"><img  src=\"images/down.png\" alt=\"NICE\"></a></td>");
                        break;
                    case 0:
                        $(".secTable>tbody>tr:nth-child(5)>td:nth-child(6)").replaceWith("<td class=\" noPadding\" ><a href=\"http://10.1.0.40:8080/nexteer/html/Unit/Ishaft3Unit.html\"><img class=\"slider\" src=\"images/slider.png\" alt=\"NICE\"></a></td>");
                        break;
                    case 1:
                        $(".secTable>tbody>tr:nth-child(5)>td:nth-child(6)").replaceWith("<td class=\" noPadding\" ><a href=\"http://10.1.0.40:8080/nexteer/html/Unit/Ishaft3Unit.html\"><img  src=\"images/up.png\" alt=\"NICE\"></a></td>");
                        break;
                    default:
                        $(".secTable>tbody>tr:nth-child(5)>td:nth-child(6)").replaceWith("<td class=\" noPadding\" ><a href=\"http://10.1.0.40:8080/nexteer/html/Unit/Ishaft3Unit.html\"></a></td>");
                }
            }
            else{
                console.log("休班");
            }

        }
    });
    $.get("http://10.1.0.40:8080/nexteer/dashboard/output/ISHAFT4?time="+currTime,function (data) {
        if($.parseJSON(data).system_status != false){
            if($.parseJSON(data).open != false){
                $(".secTable>tbody>tr:nth-child(6)>td:nth-child(2)").html($.parseJSON(data).shift_type);
                $(".secTable>tbody>tr:nth-child(6)>td:nth-child(3)").html($.parseJSON(data).target);
                $(".secTable>tbody>tr:nth-child(6)>td:nth-child(4)").html($.parseJSON(data).curr_output);
                $(".secTable>tbody>tr:nth-child(6)>td:nth-child(5)").html($.parseJSON(data).reach_rate+"%");
                switch ($.parseJSON(data).status)
                {
                    case -1:
                        $(".secTable>tbody>tr:nth-child(6)>td:nth-child(6)").replaceWith("<td class=\" noPadding\" ><a href=\"http://10.1.0.40:8080/nexteer/html/Unit/Ishaft4Unit.html\"><img  src=\"images/down.png\" alt=\"NICE\"></a></td>");
                        break;
                    case 0:
                        $(".secTable>tbody>tr:nth-child(6)>td:nth-child(6)").replaceWith("<td class=\" noPadding\" ><a href=\"http://10.1.0.40:8080/nexteer/html/Unit/Ishaft4Unit.html\"><img class=\"slider\" src=\"images/slider.png\" alt=\"NICE\"></a></td>");
                        break;
                    case 1:
                        $(".secTable>tbody>tr:nth-child(6)>td:nth-child(6)").replaceWith("<td class=\" noPadding\" ><a href=\"http://10.1.0.40:8080/nexteer/html/Unit/Ishaft4Unit.html\"><img  src=\"images/up.png\" alt=\"NICE\"></a></td>");
                        break;
                    default:
                        $(".secTable>tbody>tr:nth-child(6)>td:nth-child(6)").replaceWith("<td class=\" noPadding\" ><a href=\"http://10.1.0.40:8080/nexteer/html/Unit/Ishaft4Unit.html\"></a></td>");
                }
            }
            else{
                console.log("休班");
            }

        }
    });
    $.get("http://10.1.0.40:8080/nexteer/dashboard/output/BEPS?time="+currTime,function (data) {
        if($.parseJSON(data).system_status != false){
            if($.parseJSON(data).open != false){
                $(".secTable>tbody>tr:nth-child(1)>td:nth-child(2)").html($.parseJSON(data).shift_type);
                $(".secTable>tbody>tr:nth-child(1)>td:nth-child(3)").html($.parseJSON(data).target);
                $(".secTable>tbody>tr:nth-child(1)>td:nth-child(4)").html($.parseJSON(data).curr_output);
                $(".secTable>tbody>tr:nth-child(1)>td:nth-child(5)").html($.parseJSON(data).reach_rate+"%");
                switch ($.parseJSON(data).status)
                {
                    case -1:
                        $(".secTable>tbody>tr:nth-child(1)>td:nth-child(6)").replaceWith("<td class=\" noPadding\" ><a href=\"http://10.1.0.40:8080/nexteer/html/Unit/BEPS3Unit.html\"><img  src=\"images/down.png\" alt=\"NICE\"></a></td>");
                        break;
                    case 0:
                        $(".secTable>tbody>tr:nth-child(1)>td:nth-child(6)").replaceWith("<td class=\" noPadding\" ><a href=\"http://10.1.0.40:8080/nexteer/html/Unit/BEPS3Unit.html\"><img class=\"slider\" src=\"images/slider.png\" alt=\"NICE\"></a></td>");
                        break;
                    case 1:
                        $(".secTable>tbody>tr:nth-child(1)>td:nth-child(6)").replaceWith("<td class=\" noPadding\" ><a href=\"http://10.1.0.40:8080/nexteer/html/Unit/BEPS3Unit.html\"><img  src=\"images/up.png\" alt=\"NICE\"></a></td>");
                        break;
                    default:
                        $(".secTable>tbody>tr:nth-child(1)>td:nth-child(6)").replaceWith("<td class=\" noPadding\" ><a href=\"http://10.1.0.40:8080/nexteer/html/Unit/BEPS3Unit.html\"></a></td>");
                }
            }
            else{
                console.log("休班");
            }

        }
    });
    $.get("http://10.1.0.40:8080/nexteer/dashboard/output/CEPS?time="+currTime,function (data) {
        if($.parseJSON(data).system_status != false){
            if($.parseJSON(data).open != false){
                $(".secTable>tbody>tr:nth-child(2)>td:nth-child(2)").html($.parseJSON(data).shift_type);
                $(".secTable>tbody>tr:nth-child(2)>td:nth-child(3)").html($.parseJSON(data).target);
                $(".secTable>tbody>tr:nth-child(2)>td:nth-child(4)").html($.parseJSON(data).curr_output);
                $(".secTable>tbody>tr:nth-child(2)>td:nth-child(5)").html($.parseJSON(data).reach_rate+"%");
                switch ($.parseJSON(data).status)
                {
                    case -1:
                        $(".secTable>tbody>tr:nth-child(2)>td:nth-child(6)").replaceWith("<td class=\" noPadding\" ><a href=\"http://10.1.0.40:8080/nexteer/html/Unit/CEPS5Unit.html\"><img  src=\"images/down.png\" alt=\"NICE\"></a></td>");
                        break;
                    case 0:
                        $(".secTable>tbody>tr:nth-child(2)>td:nth-child(6)").replaceWith("<td class=\" noPadding\" ><a href=\"http://10.1.0.40:8080/nexteer/html/Unit/CEPS5Unit.html\"><img class=\"slider\" src=\"images/slider.png\" alt=\"NICE\"></a></td>");
                        break;
                    case 1:
                        $(".secTable>tbody>tr:nth-child(2)>td:nth-child(6)").replaceWith("<td class=\" noPadding\" ><a href=\"http://10.1.0.40:8080/nexteer/html/Unit/CEPS5Unit.html\"><img  src=\"images/up.png\" alt=\"NICE\"></a></td>");
                        break;
                    default:
                        $(".secTable>tbody>tr:nth-child(2)>td:nth-child(6)").replaceWith("<td class=\" noPadding\" ><a href=\"http://10.1.0.40:8080/nexteer/html/Unit/CEPS5Unit.html\"></a></td>");
                }
            }
            else{
                console.log("休班");
            }

        }
    });

}
getMainOee();
getMainPro();
setInterval(function () {
        getMainOee();
        getMainPro();
},1000*60);
