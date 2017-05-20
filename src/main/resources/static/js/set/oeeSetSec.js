/**
 * Created by Administrator on 2017/4/8.
 */
function addOeeInput(addDate, cellName,tarOee) {
    this.addDate  = addDate;
    this.cellName = cellName;
    this.targetOee= tarOee;
}
function judgeMyTime(time) {
    var timeStr="";
    if (time<10){
        timeStr="0"+time.toString()
    }
    else {
        timeStr=time.toString()
    }
    return timeStr;
}


console.log("开始运行oeeSet");
$("#addOeeSub").bind("click", function () {

    var addOeeJson=new addOeeInput($("#addOeeDate").val().toString(),$("#addOeeCell").val().toString(),Number($("#addOeeTar").val()));
    console.log("start");
    console.log(JSON.stringify(addOeeJson));
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/nexteer/oee/target",
        data:JSON.stringify(addOeeJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            // $("#addOeeStatus").html("添加"+data.addDate+"目标值为"+data.targetOee);
            $("#addOeeStatus").html("成功");
            switch (data.cellName){
                case "ISHAFT1": line="第一条中间轴";
                    break;
                case "ISHAFT2": line="第二条中间轴";
                    break;
                case "ISHAFT3": line="第三条中间轴";
                    break;
                case "ISHAFT4": line="第四条中间轴";
                    break;
                case "BEPS3": line="有刷产线";
                    break;
                case "CEPS5": line="无刷产线";
                    break;
            }
            $("#oeeIshaftTable").prepend("<tbody><tr><td>"+data.addDate+"</td><td>"+line+"</td><td>"+data.targetOee
                +"</td></tr></tbody>");
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });

    setInterval(function () {
        $("#addOeeStatus").html("");
    },1000*7);
});



