/**
 * Created by Administrator on 2017/4/20.
 */

var circleNComDateTime=[];
var NComCalendarTime=[];
var eventData =[];
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
        eventData[i]={id:i,color:'red',name:model.log,startDate: new Date(Number(modelTime[0]),Number(modelTime[1]),Number(modelTime[2])),endDate: new Date(Number(modelTime[0]),Number(modelTime[1]),Number(modelTime[2]))};
    });
    console.log(circleNComDateTime);
});

$(function() {
    $('#ncomCalendar').calendar({
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
            for(var i in NComCalendarTime){
                if(date.getTime()==NComCalendarTime[i]){
                    $(element).css('background-color', 'orange');
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



