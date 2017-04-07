/**
 * Created by Administrator on 2017/4/8.
 */
importScripts("jquery.min.js");
onmessage = function (event) {
    var returnArr=[];
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
    function Is1OutInput(curr_time,cell_name) {
        this.curr_time=curr_time;
        this.cell_name=cell_name;
    }

    // var currTime = judgeTime(Uyear)+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday)+" "+judgeTime(Udate.getHours())+":"+judgeTime(Udate.getMinutes())+":"+judgeTime(Udate.getSeconds());
    var currTime = "2017-03-23 15:00:00";
    var cellName = "ISHAFT1";
    var Is1OutJson = new Is1OutInput(currTime,cellName);
    console.log(Is1OutJson);
    console.log("getIs1Out开始");
    $.ajax({
            type: "POST",
            url: "http://localhost:8080/nexteer/dashboard/output",
            data: JSON.stringify(Is1OutJson),
            contentType: "application/json; charset=utf-8",
            async : false,
            dataType: "json",
            success: function (data) {
                if(data.status==0){
                    returnArr[0]=data.cellName;
                    returnArr[1]=data.targetOutput;
                    returnArr[2]=data.curOutput;
                    returnArr[3]=data.reachRate;
                    returnArr[4]=data.status;
                }
                else {

                    console.log("获取ISHAFT1产量失败");

                }

            },
            failure: function (errMsg) {
                console.log(errMsg);
            }
        });
    postMessage(returnArr);

};