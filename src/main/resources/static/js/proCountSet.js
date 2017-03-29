/**
 * Created by Administrator on 2017/3/28.
 */
function addProInput(modelID, modelName, cellName,std) {
    this.modelId  = modelID;
    this.modelName = modelName;
    this.cellName = cellName;
    this.std= std;
}

console.log("开始运行");
$("#addProSub").bind("click", function () {

    var addProJson=new OneShiftInput($("#addProID").val().toString(),$("#addProName").val().toString(),$("#addProCell").val(),parseFloat($("#addProSTD").val()));
    console.log("start");
    console.log(JSON.stringify(addProJson));
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/product-model",
        data:JSON.stringify(addProJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if(data.status==true) {
                $("#addProStatus").html("添加型号信息成功");

            }
            else{
                $("#addProStatus").html("添加型号信息失败");
            }
            console.log(data.status);
            console.log("nice");
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
    $.get("http://localhost:8080/product-model", function (data) {
        $("#proLine").append("<td>"+"第"+(data.length)+"列"+"</td>");
        $("#proLineId").append("<td>"+data[data.length-1].modelId+"</td>");
        $("#proLineName").append("<td>"+data[data.length-1].modelName+"</td>");
        $("#proLineCell").append("<td>"+data[data.length-1].cellName+"</td>");
        $("#proLineSTD").append("<td>"+data[data.length-1].std+"</td>");
    });
});

//获取全部型号信息

$.get("http://localhost:8080/product-model", function (data) {
    $.each(data, function (i, model) {
        $("#proLine").append("<td>"+"第"+(i+1)+"列"+"</td>");
        $("#proLineId").append("<td>"+data[i].modelId+"</td>");
        $("#proLineName").append("<td>"+data[i].modelName+"</td>");
        $("#proLineCell").append("<td>"+data[i].cellName+"</td>");
        $("#proLineSTD").append("<td>"+data[i].std+"</td>");
    });
});