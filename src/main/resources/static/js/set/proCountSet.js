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

    var addProJson=new addProInput($("#addProID").val().toString(),$("#addProName").val().toString(),$("#addProCell").val(),Number($("#addProSTD").val()));
    console.log("start");
    console.log(JSON.stringify(addProJson));
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/nexteer/product-model",
        data:JSON.stringify(addProJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if(data.status==true) {
                $("#addProStatus").html("添加成功");

            }
            else{
                $("#addProStatus").html("添加失败");
            }
            console.log(data.status);
            console.log("nice");
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
    // $.get("http://localhost:8080/nexteer/product-model", function (data) {
    //     $("#proLine").append("<td>"+"第"+(data.length)+"列"+"</td>");
    //     $("#proLineId").append("<td>"+data[data.length-1].modelId+"</td>");
    //     $("#proLineName").append("<td>"+data[data.length-1].modelName+"</td>");
    //     $("#proLineCell").append("<td>"+data[data.length-1].cellName+"</td>");
    //     $("#proLineSTD").append("<td>"+data[data.length-1].std+"</td>");
    // });
});

//获取全部型号信息
//获取Ishaft1型号信息
$.get("http://localhost:8080/nexteer/product-model/Ishaft1", function (data) {
    console.log(JSON.stringify(data));
    // $("#productMessage").replaceWith("<thead><tr><th>行数</th><th>型号ID</th><th>型号名称</th><th>所属单元</th><th>STD</th></tr></thead>");
    $.each(data, function (i, model) {
        $("#productIs1Message").append("<tbody><tr><td>"+(i+1)+"</td><td>"+model.modelId+"</td><td>"+model.modelName+"</td><td>"+model.cellName+"</td><td>"+model.std+"</td></tr></tbody>");
    });
});

//获取Ishaft2型号信息
$.get("http://localhost:8080/nexteer/product-model/Ishaft2", function (data) {
    console.log(JSON.stringify(data));
    // $("#productMessage").replaceWith("<thead><tr><th>行数</th><th>型号ID</th><th>型号名称</th><th>所属单元</th><th>STD</th></tr></thead>");
    $.each(data, function (i, model) {
        $("#productIs2Message").append("<tbody><tr><td>"+(i+1)+"</td><td>"+model.modelId+"</td><td>"+model.modelName+"</td><td>"+model.cellName+"</td><td>"+model.std+"</td></tr></tbody>");
    });
});

//获取Ishaft3型号信息
$.get("http://localhost:8080/nexteer/product-model/Ishaft3", function (data) {
    console.log(JSON.stringify(data));
    // $("#productMessage").replaceWith("<thead><tr><th>行数</th><th>型号ID</th><th>型号名称</th><th>所属单元</th><th>STD</th></tr></thead>");
    $.each(data, function (i, model) {
        $("#productIs3Message").append("<tbody><tr><td>"+(i+1)+"</td><td>"+model.modelId+"</td><td>"+model.modelName+"</td><td>"+model.cellName+"</td><td>"+model.std+"</td></tr></tbody>");
    });
});

//获取Ishaft4型号信息
$.get("http://localhost:8080/nexteer/product-model/Ishaft4", function (data) {
    console.log(JSON.stringify(data));
    // $("#productMessage").replaceWith("<thead><tr><th>行数</th><th>型号ID</th><th>型号名称</th><th>所属单元</th><th>STD</th></tr></thead>");
    $.each(data, function (i, model) {
        $("#productIs4Message").append("<tbody><tr><td>"+(i+1)+"</td><td>"+model.modelId+"</td><td>"+model.modelName+"</td><td>"+model.cellName+"</td><td>"+model.std+"</td></tr></tbody>");
    });
});

//获取CEPS型号信息
$.get("http://localhost:8080/nexteer/product-model/CEPS", function (data) {
    console.log(JSON.stringify(data));
    // $("#productMessage").replaceWith("<thead><tr><th>行数</th><th>型号ID</th><th>型号名称</th><th>所属单元</th><th>STD</th></tr></thead>");
    $.each(data, function (i, model) {
        $("#productCEPSMessage").append("<tbody><tr><td>"+(i+1)+"</td><td>"+model.modelId+"</td><td>"+model.modelName+"</td><td>"+model.cellName+"</td><td>"+model.std+"</td></tr></tbody>");
    });
});

//获取BEPS型号信息
$.get("http://localhost:8080/nexteer/product-model/BEPS", function (data) {
    console.log(JSON.stringify(data));
    // $("#productMessage").replaceWith("<thead><tr><th>行数</th><th>型号ID</th><th>型号名称</th><th>所属单元</th><th>STD</th></tr></thead>");
    $.each(data, function (i, model) {
        $("#productBEPSMessage").append("<tbody><tr><td>"+(i+1)+"</td><td>"+model.modelId+"</td><td>"+model.modelName+"</td><td>"+model.cellName+"</td><td>"+model.std+"</td></tr></tbody>");
    });
});
