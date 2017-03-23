/**
 * Created by Administrator on 2017/3/21.
 */
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
function myTimer(){
    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();
    $("#showMainTime").html(judgeTime(hours)+":"+judgeTime(minutes)+":"+judgeTime(seconds));
}
function myDate() {
    var year = new Date().getFullYear();
    var month = new Date().getMonth()+1;
    var day = new Date().getDate();
    $("#showMainDate").html(judgeTime(year)+"年"+judgeTime(month )+"月"+judgeTime(day)+"日");
}
setInterval(function(){myTimer()},1000);
setInterval(function () {myDate()},1000);