/**
 * Created by Administrator on 2017/3/30.
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
function mainHceInput(curr_time,cell_name) {
    this.curr_time=curr_time;
    this.cell_name=cell_name;
}
function getMainHce() {
    var currTime = judgeTime(Uyear)+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday)+" "+judgeTime(Udate.getHours())+":"+judgeTime(Udate.getMinutes())+":"+judgeTime(Udate.getSeconds());
    // var currTime ="2017-03-23 15:00:00";
    var cellName = "ISHAFT1";
    var mainHceJson = new mainHceInput(currTime,cellName);
    console.log(mainHceJson);
    console.log("getMainHce开始");
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/nexteer/dashboard/hce",
        data: JSON.stringify(mainHceJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if(data.system_status != false){
                console.log(JSON.stringify(data));
                console.log("获取"+cellName+"HCE成功");
                $("#showMainIshaft1Hce").html(data.hce.toFixed(1)+"%");
            }

        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });

}

getMainHce();
setInterval(getMainHce(),1000*2);