/**
 * Created by Administrator on 2017/3/2.
 */
// function safety_date(year, month, day, is_safe, safety_date, log) {
//     this.year = year;
//     this.month = month;
//     this.day = day;
//     this.is_safe = is_safe;
//     this.safety_date = safety_date;
//     this.log = log;
// }
//     Udate=new Date();
//     Uyear=Udate.getFullYear();
//     Umonth=Udate.getMonth()+1;
//     Uday=Udate.getDate();

console.log("开始运行safeSet");
// //获得指定日期安全天数
// $("#getDay").bind("click", function () {
//
//     var addScrapTime=$("#getDayTime").val().split("-");
//     var getDayYear = addScrapTime[0];
//     var getDayMonth = addScrapTime[1];
//     var getDayDay = addScrapTime[2];
//     console.log(getDayYear+"年"+getDayMonth+"月"+getDayDay+"日");
//     var getDayJson = new safety_date(String(getDayYear), String(getDayMonth), String(getDayDay));
//     $.ajax({
//         type: "POST",
//         url: "http://localhost:8080/nexteer/safetyDate/getDates",
//         data: JSON.stringify(getDayJson),
//         contentType: "application/json; charset=utf-8",
//         dataType: "json",
//         success: function (data) {
//             console.log(JSON.stringify(data));
//             console.log(data.safe_dates);
//             $("#getDayStu").html("获取指定日期的安全天数为:"+ data.safe_dates);
//         },
//         failure: function (errMsg) {
//             console.log(errMsg);
//         }
//     });
//     setTimeout(function () {
//         $("#getDayStu").html("");
//     },1000*showSeconds)
// });

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
    $.ajax({
        type: "PATCH",
        url: "http://localhost:8080/nexteer/safety-date",
        data: JSON.stringify(getStartJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            console.log(JSON.stringify(data));
            console.log(data.safe_dates);
            $("#startDateStu").html("重置"+data.year+"/"+data.month+"/"+data.day+"安全运行天数为:"+ data.safe_dates);
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
            $("#resetDateStu").html("重置"+data.year+"/"+data.month+"/"+data.day+"安全运行天数为:"+ data.safe_dates+"<br>"+"事故信息为:"+data.log);

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
            $("#desDateStu").html("配置"+data.year+"/"+data.month+"/"+data.day+"为损工事件 天数为:"+ data.safe_dates+"<br>"+"事故信息为:"+data.log);

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
            $("#logDateStu").html("配置"+data.year+"/"+data.month+"/"+data.day+"为可记录事件 天数为:"+ data.safe_dates+"<br>"+"可记录信息为:"+data.log);

        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
    setTimeout(function () {
        $("#logDateStu").html("");
    },1000*showSeconds)
});

//获取全部的日期信息
$("#getAllSafeDate").bind("click",function () {
    $.get("http://localhost:8080/nexteer/safetyDate/getAllDates", function (data) {
        $.each(data, function (i, model) {
            $("#logSafeMessage").append(
                "<tr><th>"+"第"+(i+1)+"行"+"</th>"+"<td>" + model.year+"年" + "</td>" +
                "<td>" + model.month +"月"+ "</td>" +
                "<td>" + model.day +"日"+ "</td>" +
                "<td>" +model.is_safe + "</td>" +
                "<td>" + model.safe_dates + "</td>" +
                "<td>"+ model.log + "</td></tr>");
        });
    });
});

//获取全部不安全的日期信息
$("#getAllUnsafeDate").bind("click",function () {
    $.get("http://localhost:8080/nexteer/safetyDate/getUnsafeDates", function (data) {
        $.each(data, function (i, model) {
            $("#logUnSafeMessage").append(
                "<tr><th>"+"第"+(i+1)+"行"+"</th>"+"<td>" + model.year+"年" + "</td>" +
                "<td>" + model.month +"月"+ "</td>" +
                "<td>" + model.day +"日"+ "</td>" +
                "<td>" +model.is_safe + "</td>" +
                "<td>" + model.safe_dates + "</td>" +
                "<td>"+ model.log + "</td></tr>");
        });
    });
});