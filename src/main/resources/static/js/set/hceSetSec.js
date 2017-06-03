/**
 * Created by Administrator on 2017/4/8.
 */
function addHceInput(addDate, cellName,tarHce) {
    this.addDate  = addDate;
    this.cellName = cellName;
    this.targetHce= tarHce;
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

console.log("开始运行HceSet");
$("#addHceSub").bind("click", function () {

    var addHceJson=new addHceInput($("#addHceDate").val().toString(),$("#addHceCell").val().toString(),Number($("#addHceTar").val()));
    console.log("start");
    console.log(JSON.stringify(addHceJson));
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/nexteer/hce/target",
        data:JSON.stringify(addHceJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $("#addHceStatus").html("成功");
            var line;
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
            $("#hceIshaftTable").prepend("<tbody><tr><td>"+data.addDate+"</td><td>"+line+"</td><td>"+data.targetHce
                +"</td></tr></tbody>");
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
    setInterval(function () {
        $("#addHceStatus").html("");
    },1000*7);
});
