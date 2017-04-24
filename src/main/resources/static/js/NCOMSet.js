/**
 * Created by Administrator on 2017/3/2.
 */


console.log("开始运行NCOMSet");

//单击重置无抱怨天数
$("#startNCOMDate").bind("click",function () {
    function startDay(addDate,count,noCom) {
        this.addDate = addDate;
        this.count = count;
        this.noComplain = noCom;
    }

    var startCount=Number($("#startNCOMDateValue").val());
    var startLog="";
    var getStartJson=new startDay($("#startNCOMDateTime").val(),startCount,1);
    console.log(getStartJson);
    $.ajax({
        type: "PATCH",
        url: "http://10.1.0.40:8080/nexteer/quality-complain",
        data: JSON.stringify(getStartJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(JSON.stringify(data));
            console.log(data.count);
            $("#startNCOMDateStu").html("重置"+data.addDate+"无抱怨天数为:"+ data.count);
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
    setTimeout(function () {
        $("#startNCOMDateStu").html("");
    },1000*showSeconds)
});


//发生事故重置
$("#resetNCOMDate").bind("click",function () {
    function resetNCOMDate(addDate,log,noCom,count) {
        this.addDate = addDate;
        this.log = log;
        this.noComplain = noCom;
        this.count = count;
    }

    var resetMessage=$("#resetNCOMDateValue").val().toString();
    var getResetJson=new resetNCOMDate($("#resetNCOMDateTime").val(),resetMessage,0,0);
    $.ajax({
        type: "PATCH",
        url: "http://10.1.0.40:8080/nexteer/quality-complain",
        data: JSON.stringify(getResetJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(JSON.stringify(data));
            console.log(data.safe_dates);
            $("#resetNCOMDateStu").html("重置"+data.addDate+"无抱怨天数为:"+ data.count+"<br>"+"事故信息为:"+data.log);

        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
    setTimeout(function () {
        $("#resetNCOMDateStu").html("");
    },1000*showSeconds)
});

//配置正式抱怨事件
$("#desNCOMDate").bind("click",function () {
    function desNCOMDate(addDate,log,noCom,count) {
        this.addDate = addDate;
        this.log = log;
        this.noComplain = noCom;
        this.count= count;
    }

    var desMessage=$("#desNCOMDateValue").val().toString();
    var getdesJson=new desNCOMDate($("#desNCOMDateTime").val(),desMessage,-1,0);
    $.ajax({
        type: "PATCH",
        url: "http://10.1.0.40:8080/nexteer/quality-complain",
        data: JSON.stringify(getdesJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(JSON.stringify(data));
            console.log(data.count);
            $("#desNCOMDateStu").html("配置"+data.addDate+"正式抱怨天数为:"+ data.count+"<br>"+"抱怨信息为:"+data.log);

        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
    setTimeout(function () {
        $("#desNCOMDateStu").html("");
    },1000*showSeconds)
});

//配置非正式抱怨事件
$("#logNCOMDate").bind("click",function () {
    function logNCOMDate(addDate,log,noCom,count) {
        this.addDate = addDate;
        this.log = log;
        this.noComplain = noCom;
        this.count = count;
    }

    var logMessage=$("#logNCOMDateValue").val().toString();
    var getlogJson=new logNCOMDate($("#logNCOMDateTime").val(),logMessage,0,0);
    $.ajax({
        type: "PATCH",
        url: "http://10.1.0.40:8080/nexteer/quality-complain",
        data: JSON.stringify(getlogJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(JSON.stringify(data));
            console.log(data.count);
            $("#logNCOMDateStu").html("重置"+data.addDate+"无抱怨天数为:"+ data.count+"<br>"+"事故信息为:"+data.log);

        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
    setTimeout(function () {
        $("#logNCOMDateStu").html("");
    },1000*showSeconds)
});


