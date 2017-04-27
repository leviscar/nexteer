/**
 * Created by Administrator on 2017/4/8.
 */
function addOeeInput(addDate, cellName,tarOee) {
    this.addDate  = addDate;
    this.cellName = cellName;
    this.targetOee= tarOee;
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
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
    setInterval(function () {
        $("#addOeeStatus").html("");
    },1000*7);
});