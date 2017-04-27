/**
 * Created by Administrator on 2017/4/8.
 */
function addHceInput(addDate, cellName,tarHce) {
    this.addDate  = addDate;
    this.cellName = cellName;
    this.targetHce= tarHce;
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
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
    setInterval(function () {
        $("#addHceStatus").html("");
    },1000*7);
});
