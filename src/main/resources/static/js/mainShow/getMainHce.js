/**
 * Created by Administrator on 2017/3/30.
 */

var HCEValue = [];
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
function mainHceInput(curr_time,cell_name) {
    this.curr_time=curr_time;
    this.cell_name=cell_name;
}
function getMainIshaft1Hce() {
    var date=new Date();
    var year=date.getFullYear();
    var month=date.getMonth()+1;
    var day=date.getDate();
    var currTime = judgeTime(year)+"-"+judgeTime(month)+"-"+judgeTime(day)+" "+judgeTime(date.getHours())+":"+judgeTime(date.getMinutes())+":"+judgeTime(date.getSeconds());
    var cellName = "ISHAFT1";
    var mainHceJson = new mainHceInput(currTime,cellName);
    $.get("http://10.1.0.40:8080/nexteer/dashboard/hce/ISHAFT1?time="+currTime,function (data) {
        if($.parseJSON(data).system_status != false){
            if($.parseJSON(data).open != false){

                $("#showMainIshaft1Hce").html($.parseJSON(data).hce.toFixed(1)+"%");
                console.log("获取hce操作成功");
                switch ($.parseJSON(data).status)
                {
                    case -1:
                        $("#hceISStatus").replaceWith("<div class=\"col-md-6 \" id=\"hceISStatus\"><img src=\"images/Rainy.png\" alt=\"NICE\"></div>");
                        break;
                    case 0:
                        $("#hceISStatus").replaceWith("<div class=\"col-md-6 \" id=\"hceISStatus\"><img src=\"images/Cloudy.png\" alt=\"NICE\"></div>");
                        break;
                    case 1:
                        $("#hceISStatus").replaceWith("<div class=\"col-md-6 \" id=\"hceISStatus\"><img src=\"images/Sunny.png\" alt=\"NICE\"></div>");
                        break;
                    default:
                        $("#hceISStatus").replaceWith("<div class=\"col-md-6 \" id=\"hceISStatus\"></div>");
                }
            }
            else{
                console.log("休班");
            }

        }
    });
    $.get("http://10.1.0.40:8080/nexteer/dashboard/hce/BEPS3?time="+currTime,function (data) {
        if($.parseJSON(data).system_status != false){
            if($.parseJSON(data).open != false){
                console.log(JSON.stringify(data));

                $("#showMainBEPSHce").html($.parseJSON(data).hce.toFixed(1)+"%");
                console.log("获取hce操作成功");
                switch ($.parseJSON(data).status)
                {
                    case -1:
                        $("#hceBEPSStatus").replaceWith("<div class=\"col-md-6 \" id=\"hceBEPSStatus\"><img src=\"images/Rainy.png\" alt=\"NICE\"></div>");
                        break;
                    case 0:
                        $("#hceBEPSStatus").replaceWith("<div class=\"col-md-6 \" id=\"hceBEPSStatus\"><img src=\"images/Cloudy.png\" alt=\"NICE\"></div>");
                        break;
                    case 1:
                        $("#hceBEPSStatus").replaceWith("<div class=\"col-md-6 \" id=\"hceBEPSStatus\"><img src=\"images/Sunny.png\" alt=\"NICE\"></div>");
                        break;
                    default:
                        $("#hceBEPSStatus").replaceWith("<div class=\"col-md-6 \" id=\"hceBEPSStatus\"></div>");
                }
            }
            else{
                console.log("休班");
            }

        }
    });
    $.get("http://10.1.0.40:8080/nexteer/dashboard/hce/CEPS5?time="+currTime,function (data) {
        if($.parseJSON(data).system_status != false){
            if($.parseJSON(data).open != false){
                console.log(JSON.stringify(data));

                $("#showMainCEPSHce").html($.parseJSON(data).hce.toFixed(1)+"%");
                console.log("获取hce操作成功");
                switch ($.parseJSON(data).status)
                {
                    case -1:
                        $("#hceCEPSStatus").replaceWith("<div class=\"col-md-6 \" id=\"hceCEPSStatus\"><img src=\"images/Rainy.png\" alt=\"NICE\"></div>");
                        break;
                    case 0:
                        $("#hceCEPSStatus").replaceWith("<div class=\"col-md-6 \" id=\"hceCEPSStatus\"><img src=\"images/Cloudy.png\" alt=\"NICE\"></div>");
                        break;
                    case 1:
                        $("#hceCEPSStatus").replaceWith("<div class=\"col-md-6 \" id=\"hceCEPSStatus\"><img src=\"images/Sunny.png\" alt=\"NICE\"></div>");
                        break;
                    default:
                        $("#hceCEPSStatus").replaceWith("<div class=\"col-md-6 \" id=\"hceCEPSStatus\"></div>");
                }
            }
            else{
                console.log("休班");
            }

        }
    });


}

getMainIshaft1Hce();
setInterval(getMainIshaft1Hce(),1000*2);