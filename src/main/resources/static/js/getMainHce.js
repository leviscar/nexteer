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
    var currTime = judgeTime(Uyear)+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday)+" "+judgeTime(Udate.getHours())+":"+judgeTime(Udate.getMinutes())+":"+judgeTime(Udate.getSeconds());

    var cellName = "ISHAFT1";
    var mainHceJson = new mainHceInput(currTime,cellName);
    console.log(mainHceJson);
    console.log("getMainHce开始");
    $.get("http://10.1.0.40:8080/nexteer/dashboard/hce/ISHAFT1?time="+currTime,function (data) {
        if($.parseJSON(data).system_status != false){
            if($.parseJSON(data).open != false){
                console.log(JSON.stringify(data));

                $("#showMainIshaft1Hce").html($.parseJSON(data).hce+"%");
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

}

getMainIshaft1Hce();
setInterval(getMainIshaft1Hce(),1000*2);