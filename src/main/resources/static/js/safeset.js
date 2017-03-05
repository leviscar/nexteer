/**
 * Created by Administrator on 2017/3/2.
 */
function safety_date(year, month, day, is_safe, safety_date, log) {
    this.year = year;
    this.month = month;
    this.day = day;
    this.is_safe = is_safe;
    this.safety_date = safety_date;
    this.log = log;
}
    var Udate=new Date();
    var Uyear=Udate.getFullYear();
    var Umonth=Udate.getMonth()+1;
    var Uday=Udate.getDate();
    $("#time").html("公元"+Uyear+"年"+Umonth+"月"+Uday+"日");
    var UsafeMonth=Umonth.toString();
    var UsafeDay=Uday.toString();
    if(Umonth<10&&Umonth>0){
        USafeMonth="0"+Umonth.toString();
    }
    if(UsafeDay<10&&UsafeDay>0){
        UsafeDay="0"+UsafeDay.toString();
    }

    var jsonString = new safety_date(Uyear.toString(),UsafeMonth , UsafeDay);
$("#safeDay").html("未初始化");
    //更新当前安全天数
$("#addDay").bind("click",function () {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/safetyDate/addDate",
        data: JSON.stringify(jsonString),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".loading").html(JSON.stringify(data));
            $("#actionStatus").html("更新当前日期为安全日期操作成功");
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/safetyDate/getDates",
        data: JSON.stringify(jsonString),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".loading").html(JSON.stringify(data));
            $("#safeDay").html(data.safe_dates);
            $("#res").html("获取指定日期正常");
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
    $("#submitDay").html("公元"+Uyear+"年"+Umonth+"月"+Uday+"日");
});


//获得指定日期安全天数
$("#getDay").bind("click", function () {
    var getDayYear = $("#myYear").val();
    var getDayMonth = $("#myMonth").val();
    var getDayDay = $("#myDay").val();
    $("#submitDay").html(getDayYear+"年"+getDayMonth+"月"+getDayDay+"日");
    var getDayJson = new safety_date(getDayYear.toString(), getDayMonth.toString(), getDayDay.toString());
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/safetyDate/getDates",
        data: JSON.stringify(getDayJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".loading").html(JSON.stringify(data));
            $("#safeSearch").html(data.safe_dates);
            $("#actionStatus").html("获取指定日期正常");
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
});

//单击重置安全日期
$("#startDate").bind("click",function () {
    function startDay(year, month, day, safe_dates, log) {
        this.year = year;
        this.month = month;
        this.day = day;
        this.safe_dates = safe_dates;
        this.log = log;
    }
    var startDateYear=$("#startYear").val();
    var startDateMonth=$("#startMonth").val();
    var startDateDay=$("#startDay").val();
    var startCount=$("#startSafeDay").val();
    var startLog="";
    $("#submitDay").html(startDateYear+"年"+startDateMonth+"月"+startDateDay+"日");
    var getStartJson=new startDay(startDateYear.toString(),startDateMonth.toString(),startDateDay.toString(),startCount.toString(),startLog.toString());
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/safetyDate/reset",
        data: JSON.stringify(getStartJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".loading").html(JSON.stringify(data));
            $("#safeDay").html(data.safe_dates);
            $("#actionStatus").html("普通重置按钮操作成功");
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
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
    var resetYear=$("#resetYear").val().toString();
    var resetMonth=$("#resetMonth").val().toString();
    var resetDay=$("#resetDay").val().toString();
    var resetMessage=$("#resetMessage").val().toString();
    $("#submitDay").html(resetYear+"年"+resetMonth+"月"+resetDay+"日");
    var getResetJson=new resetDate(resetYear,resetMonth,resetDay,0,resetMessage);
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/safetyDate/reset",
        data: JSON.stringify(getResetJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".loading").html(JSON.stringify(data));
            $("#safeDay").html(data.safe_dates);
            $("#actionStatus").html("发生事故重置按钮运行成功");
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
});

//获取全部的日期信息
$("#getAllSafeDate").bind("click",function () {
    $.get("http://localhost:8080/safetyDate/getAllDates", function (data) {
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
    $.get("http://localhost:8080/safetyDate/getUnsafeDates", function (data) {
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