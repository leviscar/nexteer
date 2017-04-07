/**
 * Created by Administrator on 2017/3/4.
 */


var circleDateTime=[];
var safeCalendarTime=[];
$.get("http://localhost:8080/nexteer/safetyDate/getAllDates", function (data) {
    $.each(data, function (i, model) {
        safeCalendarTime[i]=new Date(model.year,model.month-1,model.day).getTime();
    })
});

$.get("http://localhost:8080/nexteer/safetyDate/getUnsafeDates", function (data) {
    $.each(data, function (i, model) {
        circleDateTime[i]=new Date(model.year,model.month-1,model.day).getTime();
    })
});

$(function() {
    $('#calendar').calendar({
        customDayRenderer: function(element, date) {
            for(var i in safeCalendarTime){
                if(date.getTime()==safeCalendarTime[i]){
                    $(element).css('background-color', 'green');
                    $(element).css('color', 'white');
                    $(element).css('border-radius', '15px');
                }
            }
            for(var j in circleDateTime){
                if(date.getTime()==circleDateTime[j]){
                    $(element).css('background-color', 'red');
                    $(element).css('color', 'white');
                    $(element).css('border-radius', '15px');
                }

            }
        }
    });
});



