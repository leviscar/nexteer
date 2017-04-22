/**
 * Created by Administrator on 2017/3/4.
 */


var circleDateTime=[];
var safeCalendarTime=[];
var eventData = [];
$.get("http://localhost:8080/nexteer/safety-date", function (data) {
    $.each(data, function (i, model) {
        safeCalendarTime[i]=new Date(model.year,model.month-1,model.day).getTime();
    })
});

$.get("http://localhost:8080/nexteer/safety-date/unsafe", function (data) {
    $.each(data, function (i, model) {
        circleDateTime[i]=new Date(model.year,model.month-1,model.day).getTime();
        eventData[i]={id:i,color:'red',name:model.log,startDate: new Date(model.year,model.month-1,model.day),endDate: new Date(model.year,model.month-1,model.day)};
    });
    console.log(eventData);
});

$(function() {
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



