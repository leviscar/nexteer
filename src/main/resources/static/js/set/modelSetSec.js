/**
 * Created by Administrator on 2017/5/15.
 */
/**
 * Created by Administrator on 2017/4/30.
 */
/**
 * Created by Administrator on 2017/3/28.
 */
function addProInput(modelID, modelName, cellName,std) {
    this.modelId  = modelID;
    this.modelName = modelName;
    this.cellName = cellName;
}

console.log("开始运行");



//获取型号信息
function getProduct(cell,id) {
    $.get("http://10.1.0.40:8080/nexteer/product-model/"+cell, function (data) {
        $(id).find("tbody").empty();
        var line;
        // $("#productMessage").replaceWith("<thead><tr><th>行数</th><th>型号ID</th><th>型号名称</th><th>所属单元</th><th>STD</th></tr></thead>");
        $.each(data, function (i, model) {
            switch (model.cellName){
                case "Ishaft1": line="第一条中间轴";
                    break;
                case "Ishaft2": line="第二条中间轴";
                    break;
                case "Ishaft3": line="第三条中间轴";
                    break;
                case "Ishaft4": line="第四条中间轴";
                    break;
                case "BEPS": line="有刷产线";
                    break;
                case "CEPS": line="无刷产线";
                    break;
            }
            $(id).append("<tbody><tr><td>"+(i+1)+"</td><td>"+model.modelId+"</td><td>"+model.modelName+"</td><td>"+line+"</td><td><button class=\"modelSub btn btn-primary\">删除</button></td></tr></tbody>");
        });
    });
}
$(document).ready(function () {
    $("#addProSub").bind("click", function () {

        var addProJson=new addProInput($("#addProID").val().toString(),$("#addProName").val().toString(),$("#addProCell").val());
        console.log("start");
        console.log(JSON.stringify(addProJson));
        $.ajax({
            type: "POST",
            url: "http://10.1.0.40:8080/nexteer/product-model",
            data:JSON.stringify(addProJson),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if(data.modelId !=null) {
                    $("#addProStatus").html("添加成功");

                }
                else{
                    $("#addProStatus").html("添加失败");
                }
                console.log("nice");
                getProduct("Ishaft1","#productIs1Message");
                getProduct("Ishaft2","#productIs2Message");
                getProduct("Ishaft3","#productIs3Message");
                getProduct("Ishaft4","#productIs4Message");
                getProduct("BEPS","#productBEPSMessage");
                getProduct("CEPS","#productCEPSMessage");
            },
            failure: function (errMsg) {
                console.log(errMsg);
            }
        });
        setTimeout(function () {
            $("#addProStatus").html("");
        },1000*showSeconds)
    });


    getProduct("Ishaft1","#productIs1Message");
    getProduct("Ishaft2","#productIs2Message");
    getProduct("Ishaft3","#productIs3Message");
    getProduct("Ishaft4","#productIs4Message");
    getProduct("BEPS","#productBEPSMessage");
    getProduct("CEPS","#productCEPSMessage");
});





//delete按钮
$(document).ready(function(){
    $('#productCEPSMessage').on('click','.modelSub',function(){
        console.log("del start");
        // var modelId = $(this).parent().parent().find("td").eq(1).val();
        var modelId = $(this).parent().parent().find("td").eq(1).text();
        console.log(modelId);
        var urlString = "http://10.1.0.40:8080/nexteer/product-model?modelId=" + modelId;
        console.log(urlString);
        $.ajax({
            url: urlString,
            type: 'DELETE',
            success: function(result) {
                console.log("删除成功");
                getProduct("Ishaft1","#productIs1Message");
                getProduct("Ishaft2","#productIs2Message");
                getProduct("Ishaft3","#productIs3Message");
                getProduct("Ishaft4","#productIs4Message");
                getProduct("BEPS","#productBEPSMessage");
                getProduct("CEPS","#productCEPSMessage");
            }
        });
    });
    $('#productBEPSMessage').on('click','.modelSub',function(){
        console.log("del start");
        // var modelId = $(this).parent().parent().find("td").eq(1).val();
        var modelId = $(this).parent().parent().find("td").eq(1).text();
        console.log(modelId);
        var urlString = "http://10.1.0.40:8080/nexteer/product-model?modelId=" + modelId;
        console.log(urlString);
        $.ajax({
            url: urlString,
            type: 'DELETE',
            success: function(result) {
                console.log("删除成功");
                getProduct("Ishaft1","#productIs1Message");
                getProduct("Ishaft2","#productIs2Message");
                getProduct("Ishaft3","#productIs3Message");
                getProduct("Ishaft4","#productIs4Message");
                getProduct("BEPS","#productBEPSMessage");
                getProduct("CEPS","#productCEPSMessage");
            }
        });
    });
    $('#productIs1Message').on('click','.modelSub',function(){
        console.log("del start");
        // var modelId = $(this).parent().parent().find("td").eq(1).val();
        var modelId = $(this).parent().parent().find("td").eq(1).text();
        console.log(modelId);
        var urlString = "http://10.1.0.40:8080/nexteer/product-model?modelId=" + modelId;
        console.log(urlString);
        $.ajax({
            url: urlString,
            type: 'DELETE',
            success: function(result) {
                console.log("删除成功");
                getProduct("Ishaft1","#productIs1Message");
                getProduct("Ishaft2","#productIs2Message");
                getProduct("Ishaft3","#productIs3Message");
                getProduct("Ishaft4","#productIs4Message");
                getProduct("BEPS","#productBEPSMessage");
                getProduct("CEPS","#productCEPSMessage");
            }
        });
    });
    $('#productIs2Message').on('click','.modelSub',function(){
        console.log("del start");
        // var modelId = $(this).parent().parent().find("td").eq(1).val();
        var modelId = $(this).parent().parent().find("td").eq(1).text();
        console.log(modelId);
        var urlString = "http://10.1.0.40:8080/nexteer/product-model?modelId=" + modelId;
        console.log(urlString);
        $.ajax({
            url: urlString,
            type: 'DELETE',
            success: function(result) {
                console.log("删除成功");
                getProduct("Ishaft1","#productIs1Message");
                getProduct("Ishaft2","#productIs2Message");
                getProduct("Ishaft3","#productIs3Message");
                getProduct("Ishaft4","#productIs4Message");
                getProduct("BEPS","#productBEPSMessage");
                getProduct("CEPS","#productCEPSMessage");
            }
        });
    });
    $('#productIs3Message').on('click','.modelSub',function(){
        console.log("del start");
        // var modelId = $(this).parent().parent().find("td").eq(1).val();
        var modelId = $(this).parent().parent().find("td").eq(1).text();
        console.log(modelId);
        var urlString = "http://10.1.0.40:8080/nexteer/product-model?modelId=" + modelId;
        console.log(urlString);
        $.ajax({
            url: urlString,
            type: 'DELETE',
            success: function(result) {
                console.log("删除成功");
                getProduct("Ishaft1","#productIs1Message");
                getProduct("Ishaft2","#productIs2Message");
                getProduct("Ishaft3","#productIs3Message");
                getProduct("Ishaft4","#productIs4Message");
                getProduct("BEPS","#productBEPSMessage");
                getProduct("CEPS","#productCEPSMessage");
            }
        });
    });
    $('#productIs4Message').on('click','.modelSub',function(){
        console.log("del start");
        // var modelId = $(this).parent().parent().find("td").eq(1).val();
        var modelId = $(this).parent().parent().find("td").eq(1).text();
        console.log(modelId);
        var urlString = "http://10.1.0.40:8080/nexteer/product-model?modelId=" + modelId;
        console.log(urlString);
        $.ajax({
            url: urlString,
            type: 'DELETE',
            success: function(result) {
                console.log("删除成功");
                getProduct("Ishaft1","#productIs1Message");
                getProduct("Ishaft2","#productIs2Message");
                getProduct("Ishaft3","#productIs3Message");
                getProduct("Ishaft4","#productIs4Message");
                getProduct("BEPS","#productBEPSMessage");
                getProduct("CEPS","#productCEPSMessage");
            }
        });
    });


});