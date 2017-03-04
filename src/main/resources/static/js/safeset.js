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
    var jsonString = new safety_date("2016", "03", "23");

$("#addDay").bind("click", function () {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/safetyDate/addDate",
        data: JSON.stringify(jsonString),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".loading").html(JSON.stringify(data));
            $("#submit-day").html("运行安全");
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
});

$("#getDay").bind("click", function () {
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/safetyDate/getDates",
        data: JSON.stringify(jsonString),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            $(".loading").html(JSON.stringify(data));
            $("#submit-day").html("运行安全");
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
});
// $("#getDay").bind("click", function () {
//     $.ajax({
//         type: "POST",
//         url: "http://localhost:8080/safetyDate/getDates",
//         data: JSON.stringify(jsonString),
//         contentType: "application/json; charset=utf-8",
//         dataType: "json",
//         success: function (data) {
//             $("#res").html(JSON.stringify(data));
//         },
//         failure: function (errMsg) {
//             console.log(errMsg);
//         }
//     });
// });
// $(document).ready(function ()
// {   var Udate=new Date();
//     var Uyear=Udate.getFullYear();
//     var Umonth=Udate.getMonth()+1;
//     var Uday=Udate.getDate();
//     $("#time").html("公元"+Uyear+"年"+Umonth+"月"+Uday+"日");
//     $("#addDay").click(change());
//     function change() {
//         $("#submit-day").html("ahahaha");
// // $("#submit-day").html("嗯哼"+$("#myYear").val());
//     }
//     $("#getDay").click(function () {
//
//         var data={
//         "year":"2007",
//         "month":"02",
//         "day":"01"
//         };
//         $("#safeDay").html($.toJSON({"year":"2007","month":"02","day":"01"}));
//         // // $(".text").attr('disable','true');
//         // // $('.loading').show();
//
//         // $.ajax({
//         //     url:"http://localhost:8080/safetyDate/getDates",
//         //     type:"POST",
//         //     data:carr,
//         //     success:function (data) {
//         //
//         //     $("#submit-day").html("接收nimei");
//         //     $(".loading").html(JSON.stringify(data));
//         //
//         //     }
//         // });
//         $.ajax({
//         url:"http://localhost:8080/safetyDate/getDates",
//         type:"POST",
//         data:"year=2007&month=02&day=01",
//         success:function (data) {
//
//         $("#submit-day").html("接收成功");
//         $(".loading").html(JSON.stringify(data));
//
//         }
//         })
//     })
//
// });
