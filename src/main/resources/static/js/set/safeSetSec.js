$(document).ready(function () {
    /**
     * Created by Administrator on 2017/3/2.
     */


    console.log("开始运行safeSet");
//更新当前安全天数
    function getNowData() {
        var jsonString = new safeDateInput(judgeTime(Uyear),judgeTime(Umonth) , judgeTime(Uday));
        var curTime = judgeTime(Uyear)+"-"+judgeTime(Umonth)+"-"+judgeTime(Uday);
        $.ajax({
            type: "POST",
            url: "http://localhost:8080/nexteer/safety-date",
            data: JSON.stringify(jsonString),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(JSON.stringify(data));
                $("#safeDay").html(data.safe_dates);
                console.log("获取安全日期操作成功");
            },
            failure: function (errMsg) {
                console.log(errMsg);
            }
        });

        console.log("公元"+Uyear+"年"+Umonth+"月"+Uday+"日");
    }
    function getSafeDay() {

        $.get("http://localhost:8080/nexteer/safety-date/day?date="+curTime,function (data) {
            if(data.system_status != false){
                console.log(JSON.stringify(data));
                $("#safeDay").html(data.safe_dates);
                console.log("获取安全日期操作成功");
            }
        });
        $.get("http://localhost:8080/nexteer/safety-date/max",function (data) {

            console.log(JSON.stringify(data));
            $("#safeHigh").html(data);
            console.log("获取安全日期最大值操作成功");
        });

    }
//单击指定安全日期
    $("#startDate").bind("click",function () {
        function startDay(year, month, day, safe_dates, log) {
            this.year = year;
            this.month = month;
            this.day = day;
            this.safe_dates = safe_dates;
            this.log = log;
        }
        var startDateTime= $("#startDateTime").val().split("-");
        var startDateYear= startDateTime[0];
        var startDateMonth= startDateTime[1];
        var startDateDay= startDateTime[2];
        var startCount=Number($("#startDateValue").val());
        var startLog="";
        console.log(startDateYear+"年"+startDateMonth+"月"+startDateDay+"日");
        var getStartJson=new startDay(startDateYear.toString(),startDateMonth.toString(),startDateDay.toString(),startCount,startLog.toString());
        getNowData();
        $.ajax({
            type: "PATCH",
            url: "http://localhost:8080/nexteer/safety-date",
            data: JSON.stringify(getStartJson),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(JSON.stringify(data));
                console.log(data.safe_dates);
                // $("#startDateStu").html("重置"+data.year+"/"+data.month+"/"+data.day+"安全运行天数为:"+ data.safe_dates);
                $("#startDateStu").html("成功");
            },
            failure: function (errMsg) {
                console.log(errMsg);
            }
        });
        setTimeout(function () {
            $("#startDateStu").html("");
        },1000*showSeconds)
    });


//发生事故重置
    $("#resetDate").bind("click",function () {
        function resetDate(year, month, day, safety_date, log) {
            this.year = year;
            this.month = month;
            this.day = day;
            this.safe_dates = safety_date;
            this.log = log;
        }
        var resetDateTime= $("#resetDateTime").val().split("-");
        var resetYear= resetDateTime[0];
        var resetMonth= resetDateTime[1];
        var resetDay= resetDateTime[2];
        var resetMessage=$("#resetDateValue").val().toString();
        console.log(resetYear+"年"+resetMonth+"月"+resetDay+"日");
        var getResetJson=new resetDate(resetYear,resetMonth,resetDay,0,resetMessage);
        $.ajax({
            type: "PATCH",
            url: "http://localhost:8080/nexteer/safety-date",
            data: JSON.stringify(getResetJson),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(JSON.stringify(data));
                console.log(data.safe_dates);
                // $("#resetDateStu").html("重置"+data.year+"/"+data.month+"/"+data.day+"安全运行天数为:"+ data.safe_dates+"<br>"+"事故信息为:"+data.log);
                $("#resetDateStu").html("成功");

            },
            failure: function (errMsg) {
                console.log(errMsg);
            }
        });
        setTimeout(function () {
            $("#resetDateStu").html("");
        },1000*showSeconds)
    });

//配置损工事件
    $("#desDate").bind("click",function () {
        function desDate(year, month, day, is_safe,safety_date, log) {
            this.year = year;
            this.month = month;
            this.day = day;
            this.is_safe = is_safe;
            this.safe_dates = safety_date;
            this.log = log;
        }
        var desDateTime= $("#desDateTime").val().split("-");
        var desYear= desDateTime[0];
        var desMonth= desDateTime[1];
        var desDay= desDateTime[2];
        var desMessage=$("#desDateValue").val().toString();
        console.log(desYear+"年"+desMonth+"月"+desDay+"日");
        var getdesJson=new desDate(desYear,desMonth,desDay,-1,0,desMessage);
        $.ajax({
            type: "PATCH",
            url: "http://localhost:8080/nexteer/safety-date",
            data: JSON.stringify(getdesJson),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(JSON.stringify(data));
                console.log(data.safe_dates);
                // $("#desDateStu").html("配置"+data.year+"/"+data.month+"/"+data.day+"为损工事件 天数为:"+ data.safe_dates+"<br>"+"事故信息为:"+data.log);
                $("#desDateStu").html("成功");

            },
            failure: function (errMsg) {
                console.log(errMsg);
            }
        });
        setTimeout(function () {
            $("#desDateStu").html("");
        },1000*showSeconds)
    });

//配置可记录事件
    $("#logDate").bind("click",function () {
        function logDate(year, month, day,is_safe ,safety_date, log ) {
            this.year = year;
            this.month = month;
            this.day = day;
            this.is_safe = is_safe;
            this.safe_dates = safety_date;
            this.log = log;
        }
        var logDateTime= $("#logDateTime").val().split("-");
        var logYear= logDateTime[0];
        var logMonth= logDateTime[1];
        var logDay= logDateTime[2];
        var logMessage=$("#logDateValue").val().toString();
        console.log(logYear+"年"+logMonth+"月"+logDay+"日");
        var getlogJson=new logDate(logYear,logMonth,logDay,0,0,logMessage);
        console.log(getlogJson);
        $.ajax({
            type: "PATCH",
            url: "http://localhost:8080/nexteer/safety-date",
            data: JSON.stringify(getlogJson),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                console.log(JSON.stringify(data));
                console.log(data.safe_dates);
                // $("#logDateStu").html("配置"+data.year+"/"+data.month+"/"+data.day+"为可记录事件 天数为:"+ data.safe_dates+"<br>"+"可记录信息为:"+data.log);
                $("#logDateStu").html("成功");

            },
            failure: function (errMsg) {
                console.log(errMsg);
            }
        });
        setTimeout(function () {
            $("#logDateStu").html("");
        },1000*showSeconds)
    });



});