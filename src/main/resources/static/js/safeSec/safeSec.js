/**
 * Created by Administrator on 2017/3/4.
 */


var circleDateTime=[];
var safeCalendarTime=[];
var logCalendarTime = [];
var eventData = [];
$.get("http://10.1.0.40:8080/nexteer/safety-date", function (data) {
    $.each(data, function (i, model) {
        safeCalendarTime[i]=new Date(model.year,model.month-1,model.day).getTime();
    })
});

$.get("http://10.1.0.40:8080/nexteer/safety-date/unsafe", function (data) {
    var j =0,k=0;
    $.each(data, function (i, model) {

        if (model.is_safe == -1) {
            circleDateTime[j] = new Date(model.year, model.month - 1, model.day).getTime();

            j++;
        }

        if(model.is_safe == 0){
            logCalendarTime[k] = new Date(model.year,model.month-1,model.day).getTime();
            k++;
        }
        eventData[i] = {
            id: i,
            color: 'red',
            name: model.log,
            startDate: new Date(model.year, model.month - 1, model.day),
            endDate: new Date(model.year, model.month - 1, model.day)
        };
    });
    console.log(eventData);
    console.log(logCalendarTime);
    console.log(circleDateTime);
});

$(document).ready(function() {
    $('#calendar').calendar({
        mouseOnDay: function(e) {
            if(e.events.length > 0) {
                var content = '';

                for(var i in e.events) {
                    content += '<div class="event-tooltip-content">'
                        + '<div class="event-name" style="color:' + e.events[i].color + '">' + e.events[i].name + '</div>'
                        + '</div>';
                }

                $(e.element).popover({
                    trigger: 'manual',
                    container: 'body',
                    html:true,
                    content: content
                });

                $(e.element).popover('show');
            }
        },
        mouseOutDay: function(e) {
            if(e.events.length > 0) {
                $(e.element).popover('hide');
            }
        },
        dayContextMenu: function(e) {
            $(e.element).popover('hide');
        },
        dataSource:eventData,
        customDayRenderer: function(element, date) {
            for(var i in safeCalendarTime){
                if(date.getTime()==safeCalendarTime[i]){
                    $(element).css('background-color', 'green');
                    $(element).css('color', 'white');
                    $(element).css('border-radius', '1px');
                }
            }
            for(var j in circleDateTime){
                if(date.getTime()==circleDateTime[j]){
                    $(element).css('background-color', 'red');
                    $(element).css('color', 'white');
                    $(element).css('border-radius', '1px');
                }

            }
            for(var k in logCalendarTime){
                if(date.getTime()==logCalendarTime[k]){
                    $(element).css('background-color', 'orange');
                    $(element).css('color', 'white');
                    $(element).css('border-radius', '1px');
                }

            }
        }
    });
});



