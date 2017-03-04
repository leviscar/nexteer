/**
 * Created by Administrator on 2017/3/2.
 */
$(document).ready(function ()
{   var Udate=new Date();
    var Uyear=Udate.getFullYear();
    var Umonth=Udate.getMonth()+1;
    var Uday=Udate.getDate();
    $("#time").html("公元"+Uyear+"年"+Umonth+"月"+Uday+"日");
    $("#addDay").click(change());
    function change() {
        $("#submit-day").html("ahahaha");
// $("#submit-day").html("嗯哼"+$("#myYear").val());
    }
    $("#getDay").click(function () {

        var data={
        "year":"2007",
        "month":"02",
        "day":"01"
        };
        $("#safeDay").html($.toJSON({"year":"2007","month":"02","day":"01"}));
        // // $(".text").attr('disable','true');
        // // $('.loading').show();

        // $.ajax({
        //     url:"http://localhost:8080/safetyDate/getDates",
        //     type:"POST",
        //     data:carr,
        //     success:function (data) {
        //
        //     $("#submit-day").html("接收nimei");
        //     $(".loading").html(JSON.stringify(data));
        //
        //     }
        // });
        $.ajax({
        url:"http://localhost:8080/safetyDate/getDates",
        type:"POST",
        data:"year=2007&month=02&day=01",
        success:function (data) {

        $("#submit-day").html("接收成功");
        $(".loading").html(JSON.stringify(data));

        }
        })
    })

});
