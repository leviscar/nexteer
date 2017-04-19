/**
 * Created by Administrator on 2017/4/20.
 */

var circleNComDateTime=[];
var NComCalendarTime=[];
$.get("http://localhost:8080/nexteer/quality-complain", function (data) {
    $.each(data, function (i, model) {
        var modelTime= model.addDate.split("-");
        NComCalendarTime[i]=new Date(Number(modelTime[0]),Number(modelTime[1]),Number(modelTime[2])).getTime();
    });
    console.log(NComCalendarTime);
});

$.get("http://localhost:8080/nexteer/quality-complain/no-complain", function (data) {
    $.each(data, function (i, model) {
        var modelTime= model.addDate.split("-");
        circleNComDateTime[i]=new Date(Number(modelTime[0]),Number(modelTime[1]),Number(modelTime[2])).getTime();
    });
    console.log(circleNComDateTime);
});

$(function() {
    $('#ncomCalendar').calendar({
        customDayRenderer: function(element, date) {
            for(var i in NComCalendarTime){
                if(date.getTime()==NComCalendarTime[i]){
                    $(element).css('background-color', 'green');
                    $(element).css('color', 'white');
                    $(element).css('border-radius', '15px');
                }
            }
            for(var j in circleNComDateTime){
                if(date.getTime()==circleNComDateTime[j]){
                    $(element).css('background-color', 'red');
                    $(element).css('color', 'white');
                    $(element).css('border-radius', '15px');
                }

            }
        }
    });
});



