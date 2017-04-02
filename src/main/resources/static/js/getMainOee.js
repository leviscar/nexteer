/**
 * Created by Administrator on 2017/3/30.
 */

var IshaftTitle=["Ishaft1","Ishaft2","Ishaft3","Ishaft4"];
var IshaftValue=["00","00","00","00"];

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
    var currTime = judgeTime(Uyear)+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday)+" "+judgeTime(Udate.getHours())+":"+judgeTime(Udate.getMinutes())+":"+judgeTime(Udate.getSeconds());
    var cellName = "ISHAFT1";
    var mainOeeJson = new mainOeeInput(currTime,cellName);
    console.log(mainOeeJson);
    console.log("getMainOee开始");
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/dashboard/oee",
        data: JSON.stringify(mainOeeJson),
        contentType: "application/json; charset=utf-8",
        sync : false,
        dataType: "json",
        success: function (data) {
            console.log(JSON.stringify(data));
            console.log("获取"+cellName+"Oee成功");
            IshaftValue[0]=data.oee.toFixed(2);
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });

}

getMainOee();
function change(n){
    getMainOee();
    if(n>IshaftTitle.length-1) n=0;  //
    $("#showIshaft").replaceWith("<a href=\"\" id=\"showIshaft\">"+IshaftTitle[n]+"</a>");
    $("#showIshaftValue").replaceWith("<div class=\"ftqNumCon text-center\" id=\"showIshaftValue\">"+IshaftValue[n]+"%"+"</div>");
    n++;
    setTimeout("change("+n+")",1000*2);
}
window.onload = function(){
    setTimeout("change(1)", 1000*2);
};
