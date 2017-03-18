/**
 * Created by Administrator on 2017/3/18.
 */
function  curTimeInput(currTime) {
    this.curr_time=currTime;
}
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
Udate=new Date();
Uyear=Udate.getFullYear();
Umonth=Udate.getMonth()+1;
Uday=Udate.getDate();

var curTimeJson=curTimeInput(Uyear+"-"+Umonth+"-"+Uday+" "+judgeTime(Udate.getHours())+":"+judgeTime(Udate.getMinutes())+":"+judgeTime(Udate.getSeconds()));

$.ajax({
    type: "POST",
    url: "http://localhost:8080/ishaft1-unit-status/getByCurTime",
    data: JSON.stringify(curTimeJson),
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function (data) {
        console.log(JSON.stringify(data));
        console.log("操作正常");
        $("#safeSearch").html(data.safe_dates);

    },
    failure: function (errMsg) {
        console.log(errMsg);
    }
});