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
        url: "http://localhost:8080/nexteer/quality-complain",
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
    function resetNCOMDate(addDate,log,noCom) {
        this.addDate = addDate;
        this.log = log;
        this.noComplain = noCom;
    }

    var resetMessage=$("#resetNCOMDateValue").val().toString();
    var getResetJson=new resetNCOMDate($("#resetNCOMDateTime").val(),resetMessage,0);
    $.ajax({
        type: "PATCH",
        url: "http://localhost:8080/nexteer/quality-complain",
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


