/**
 * Created by Administrator on 2017/3/30.
 */
var IshaftTitle=["Ishaft1","Ishaft2","Ishaft3","Ishaft4"];
IshaftOEEValue=["00","00","00","00"];
IshaftOEEHref = ["http://localhost:8080/OEESecView.html","http://localhost:8080/OEEIshaftTwoWeekView.html","http://localhost:8080/OEEIshaftThrWeekView.html","http://localhost:8080/OEEIshaftFouWeekView.html"];

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
    var currTime = "2016-10-14 15:00:00";
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
            if(data.status==false){
                IshaftOEEValue[0]=11;
            }
            else {
                console.log(JSON.stringify(data));
                console.log("获取"+cellName+"Oee成功");
                IshaftOEEValue[0]=data.oee;
            }

        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });

}

getMainOee();
// function change(n){
//     getMainOee();
//     if(n>IshaftTitle.length-1) n=0;  //
//     $("#showIshaft").replaceWith("<div class=\"col-md-8 ftqTitle text-center\" id=\"showIshaft\"><a href="+IshaftOEEHref[n]+">"+IshaftTitle[n]+"</a></div>");
//
// //     "<a href="+IshaftHref[n]+" id=\"showIshaft\">"+IshaftTitle[n]+"</a>"
//     $("#showIshaftValue").replaceWith("<div class=\"ftqNumCon text-center\" id=\"showIshaftValue\">"+IshaftOEEValue[n]+"%"+"</div>");
//     n++;
//     setTimeout("change("+n+")",1000*2);
// }
// window.onload = function(){
//     setTimeout("change(1)", 1000*2);
// };
