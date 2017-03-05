/**
 * Created by Administrator on 2017/3/4.
 */


var circleDateTime=[];
$.get("http://localhost:8080/safetyDate/getUnsafeDates", function (data) {
    $.each(data, function (i, model) {
        circleDateTime[i]=new Date(model.year,model.month-1,model.day).getTime();
    })
});

$(function() {
    $('#calendar').calendar({
        customDayRenderer: function(element, date) {
            for(var i in circleDateTime){
                if(date.getTime()==circleDateTime[i]){
                    $(element).css('background-color', 'red');
                    $(element).css('color', 'white');
                    $(element).css('border-radius', '15px');
                }

            }
        }
    });
});



