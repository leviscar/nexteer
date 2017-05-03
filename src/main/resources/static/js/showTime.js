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
    $("#showTime").html(judgeTime(hours)+":"+judgeTime(minutes)+":"+judgeTime(seconds));
    // console.log(judgeTime(hours)+":"+judgeTime(minutes)+":"+judgeTime(seconds));
}
function myDate() {
    var yearNow = new Date().getFullYear();
    var monthNow = new Date().getMonth()+1;
    var dayNow = new Date().getDate();
    $("#showMainDate").html(judgeTime(yearNow)+"年"+judgeTime(monthNow )+"月"+judgeTime(dayNow)+"日");
}
setInterval(function(){myTimer();myDate()},1000);