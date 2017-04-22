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
    $.get("http://localhost:8080/nexteer/dashboard/hce/ISHAFT1?time="+curTime,function (data) {
        if(data.system_status != false){
            console.log(JSON.stringify(data));

            $("#showMainIshaft1Hce").html(data.hce);
            console.log("获取hce操作成功");
        }
    });

}

getMainIshaft1Hce();
setInterval(getMainIshaft1Hce(),1000*2);