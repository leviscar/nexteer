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
    this.std= std;
}

console.log("开始运行");
$("#addProSub").bind("click", function () {

    var addProJson=new addProInput($("#addProID").val().toString(),$("#addProName").val().toString(),$("#addProCell").val(),Number($("#addProSTD").val()));
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
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
    setTimeout(function () {
        $("#addProStatus").html("");
    },1000*showSeconds)
});


//获取Ishaft1型号信息
function getIshaft1() {
    $.get("http://10.1.0.40:8080/nexteer/product-model/Ishaft1", function (data) {
        console.log(JSON.stringify(data));
        // $("#productMessage").replaceWith("<thead><tr><th>行数</th><th>型号ID</th><th>型号名称</th><th>所属单元</th><th>STD</th></tr></thead>");
        $.each(data, function (i, model) {
            $("#productIs1Message").append("<tbody><tr><td>"+(i+1)+"</td><td>"+model.modelId+"</td><td>"+model.modelName+"</td><td>"+model.cellName+"</td><td>"+model.std+"</td><td><button class=\"modelSub btn btn-primary\">删除</button></td></tr></tbody>");
        });
    });
}

function getCEPS() {
    //获取CEPS型号信息
    $.get("http://10.1.0.40:8080/nexteer/product-model/CEPS", function (data) {
        console.log(JSON.stringify(data));
        // $("#productMessage").replaceWith("<thead><tr><th>行数</th><th>型号ID</th><th>型号名称</th><th>所属单元</th><th>STD</th></tr></thead>");
        $("#productCEPSMessage").find("tbody").remove();
        $.each(data, function (i, model) {
            $("#productCEPSMessage").append("<tbody><tr><td>"+(i+1)+"</td><td>"+model.modelId+"</td><td>"+model.modelName+"</td><td>"+model.cellName+"</td><td>"+model.std+"</td><td><button class=\"modelSub btn btn-primary\">删除</button></td></tr></tbody>");
        });
    });
}


//获取Ishaft2型号信息
function getIshaft2() {
    $.get("http://10.1.0.40:8080/nexteer/product-model/Ishaft2", function (data) {
        console.log(JSON.stringify(data));
        // $("#productMessage").replaceWith("<thead><tr><th>行数</th><th>型号ID</th><th>型号名称</th><th>所属单元</th><th>STD</th></tr></thead>");
        $("#productMessage").find("tbody").remove();
        $.each(data, function (i, model) {
            $("#productIs2Message").append("<tbody><tr><td>"+(i+1)+"</td><td>"+model.modelId+"</td><td>"+model.modelName+"</td><td>"+model.cellName+"</td><td>"+model.std+"</td><td><button class=\"modelSub btn btn-primary\">删除</button></td></tr></tbody>");
        });
    });
}



//获取Ishaft3型号信息
function getIshaft3() {
    $.get("http://10.1.0.40:8080/nexteer/product-model/Ishaft3", function (data) {
        console.log(JSON.stringify(data));
        // $("#productMessage").replaceWith("<thead><tr><th>行数</th><th>型号ID</th><th>型号名称</th><th>所属单元</th><th>STD</th></tr></thead>");
        $.each(data, function (i, model) {
            $("#productIs3Message").append("<tbody><tr><td>"+(i+1)+"</td><td>"+model.modelId+"</td><td>"+model.modelName+"</td><td>"+model.cellName+"</td><td>"+model.std+"</td><td><button class=\"modelSub btn btn-primary\">删除</button></td></tr></tbody>");
        });
    });
}


//获取Ishaft4型号信息
function getIshaft4() {
    $.get("http://10.1.0.40:8080/nexteer/product-model/Ishaft4", function (data) {
        console.log(JSON.stringify(data));
        // $("#productMessage").replaceWith("<thead><tr><th>行数</th><th>型号ID</th><th>型号名称</th><th>所属单元</th><th>STD</th></tr></thead>");
        $.each(data, function (i, model) {
            $("#productIs4Message").append("<tbody><tr><td>"+(i+1)+"</td><td>"+model.modelId+"</td><td>"+model.modelName+"</td><td>"+model.cellName+"</td><td>"+model.std+"</td><td><button class=\"modelSub btn btn-primary\">删除</button></td></tr></tbody>");
        });
    });
}

//获取BEPS型号信息
function getBEPS() {
    $.get("http://10.1.0.40:8080/nexteer/product-model/BEPS", function (data) {
        console.log(JSON.stringify(data));
        // $("#productMessage").replaceWith("<thead><tr><th>行数</th><th>型号ID</th><th>型号名称</th><th>所属单元</th><th>STD</th></tr></thead>");
        $.each(data, function (i, model) {
            $("#productBEPSMessage").append("<tbody><tr><td>"+(i+1)+"</td><td>"+model.modelId+"</td><td>"+model.modelName+"</td><td>"+model.cellName+"</td><td>"+model.std+"</td><td><button class=\"modelSub btn btn-primary\">删除</button></td></tr></tbody>");
        });
    });
}

getIshaft1();
getIshaft2();
getIshaft3();
getIshaft4();
getBEPS();
getCEPS();



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
                getIshaft1();
                getIshaft2();
                getIshaft3();
                getIshaft4();
                getBEPS();
                getCEPS();
            }
        });
    });
});