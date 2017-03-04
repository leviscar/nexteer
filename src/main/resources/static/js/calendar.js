/**
 * Created by Administrator on 2017/3/4.
 */

$(function(){
    $(function() {
        $('#calendar').calendar();
    });
    $("#calendarUnSafeLog").html("nice work");
    var calendarUnSafeYear=new Date().getFullYear();
    var calendarUnSafeMonth=new Date().getMonth()+1;
    var calendarUnSafeDay=new Date().getDate();

    function getCalendarValue(){
        calendarUnSafeYear=$("#calendarUnSafeYear").val();
        calendarUnSafeMonth=$("#calendarUnSafeMonth").val();
        calendarUnSafeDay=$("#calendarUnSafeDay").val();
    }
    $("#calendarUnSafeDate").bind("click",function(){
        getCalendarValue();
        if(calendarUnSafeYear==""||calendarUnSafeMonth==""||calendarUnSafeDay==""){
            calendarUnSafeYear=new Date().getFullYear();
            calendarUnSafeMonth=new Date().getMonth()+1;
            calendarUnSafeDay=new Date().getDate();
        }
        $("#calendarUnSafeTime").html("获得的时间为"+calendarUnSafeYear+"年"+calendarUnSafeMonth+"月"+calendarUnSafeDay+"日");
        $(function() {
            var currentYear = new Date().getFullYear();
            var redDateTime = new Date(currentYear, 2, 13).getTime();
            var circleDateTime = new Date(calendarUnSafeYear, calendarUnSafeMonth, calendarUnSafeDay).getTime();
            var borderDateTime = new Date(currentYear, 0, 12).getTime();

            $('#calendar').calendar({
                customDayRenderer: function(element, date) {
                    if(date.getTime() == redDateTime) {
                        $(element).css('font-weight', 'bold');
                        $(element).css('font-size', '15px');
                        $(element).css('color', 'green');
                    }
                    else if(date.getTime() == circleDateTime) {
                        $(element).css('background-color', 'red');
                        $(element).css('color', 'white');
                        $(element).css('border-radius', '15px');
                    }
                    else if(date.getTime() == borderDateTime) {
                        $(element).css('border', '2px solid blue');
                    }
                }
            });
        });
    });

});


//


//$("#calendarUnSafeDate").bind("click",function(){
//    if(calendarUnSafeYear!=""&&calendarUnSafeMonth!=""&&calendarUnSafeDay!=""){
//        getCalendarValue();
//        $("#time").html("获得的时间为"+calendarUnSafeYear+"年"+calendarUnSafeMonth+"月"+calendarUnSafeDay+"日");
//    }else{
//        $("#calendarUnSafeLog").html("输入错误，请重新输入");
//    }
//

