
/**
 * Created by Administrator on 2017/4/8.
 */
/**
 * Created by Administrator on 2017/3/30.
 */
var IshaftTitle=["Ishaft1","Ishaft2","Ishaft3","Ishaft4"];
IshaftOEEValue=["00","00","00","00"];
IshaftOEEHref = ["http://localhost:8080/nexteer/OEESecView.html","http://localhost:8080/nexteer/OEEIshaftTwoWeekView.html","http://localhost:8080/nexteer/OEEIshaftThrWeekView.html","http://localhost:8080/nexteer/OEEIshaftFouWeekView.html"];

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
    // var currTime = judgeTime(Uyear)+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday)+" "+judgeTime(Udate.getHours())+":"+judgeTime(Udate.getMinutes())+":"+judgeTime(Udate.getSeconds());
    var currTime = "2017-03-23 15:00:00";
    var cellName = "ISHAFT1";
    var mainOeeJson = new mainOeeInput(currTime,cellName);
    console.log(mainOeeJson);
    console.log("getMainOee开始");
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/nexteer/dashboard/oee",
        data: JSON.stringify(mainOeeJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if(data.status==false){
                $("#showIshaftValue").html("00%");
            }
            else {
                console.log(JSON.stringify(data));
                console.log("获取"+cellName+"Oee成功");
                $("#showIshaftValue").html(data.oee+"%");
            }

        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });

}
function getMainPro() {
    // var currTime = judgeTime(Uyear)+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday)+" "+judgeTime(Udate.getHours())+":"+judgeTime(Udate.getMinutes())+":"+judgeTime(Udate.getSeconds());
    var currTime = "2017-03-23 15:00:00";
    var cellName = "ISHAFT1";
    var mainOeeJson = new mainOeeInput(currTime,cellName);
    console.log(mainOeeJson);
    console.log("getMainPro开始");
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/nexteer/dashboard/output",
        data: JSON.stringify(mainOeeJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
                console.log(JSON.stringify(data));
                console.log("获取"+cellName+"OutPut成功");
                $("#tarOut").html(data.targetOutput);
                $("#curOut").html(data.curOutput);
                $("#reachRate").html(data.reachRate+"%");

        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });

}
getMainOee();
getMainPro();
setInterval(function () {
        getMainOee();
        getMainPro();
},1000*60);
