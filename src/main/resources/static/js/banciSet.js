/**
 * Created by Administrator on 2017/3/18.
 */
function OneShiftInput(setTime,morStart, morEnd,Beats,morWorkNum,morWorkOverNum) {
    this.setting_time = setTime;
    this.morning_shift_start  = morStart;
    this.morning_shift_end = morEnd;
    this.morning_shift_standard_beats= Beats;
    this.morning_worker_num = morWorkNum;
    this.morning_overtime_worker_num = morWorkOverNum;
}
function TwoShiftInput(setTime,midStart, midEnd ,MBeats,MWorkNum,MWorkOverNum) {
    this.setting_time = setTime;
    this.middle_shift_start  = midStart;
    this.middle_shift_end = midEnd;
    this.middle_shift_standard_beats= MBeats;
    this.middle_worker_num=MWorkNum;
    this.middle_overtime_worker_num=MWorkOverNum;
}

function ThreeShiftInput(setTime,nigStart,nigEnd,nigBeats,nigWorkNum,nigWorkOverNum) {
    this.setting_time=setTime;
    this.night_shift_start=nigStart;
    this.night_shift_end=nigEnd;
    this.night_shift_standard_beats=nigBeats;
    this.night_worker_num=nigWorkNum;
    this.night_overtime_worker_num = nigWorkOverNum;
}
function  eventInput(type,event,eventStart,eventEnd) {
    this.shift_type=type;
    this.event=event;
    this.event_start_time=eventStart;
    this.event_end_time=eventEnd;
}
function showEvent() {
    $.get("http://localhost:8080/nexteer/rest-event/getAllEvent", function (data) {
        $("#test").html(JSON.stringify(data));
        console.log(JSON.stringify(data));
        // $.each(data, function (i, model) {
        //
        //     $("#showEvent").append("<tbody><tr><td>"+model.id+"</td><td>"+model.shift_type+"</td><td>"+model.event+"</td><td>"+model.event_start_time+"</td><td>"+model.event_end_time+"</td></tr></tbody>");
        // });
    });

}
showEvent();
function showBance() {
    // $.ajax({
    //     type: "GET",
    //     url: "http://localhost:8080/nexteer/work-shift/now",
    //     contentType: "application/json; charset=utf-8",
    //     dataType: "json",
    //     success: function (data) {
    //             $("#ms").html(data.morning_shift_start);
    //             $("#me").html(data.morning_shift_end);
    //             $("#mis").html(data.middle_shift_start);
    //             $("#mie").html(data.middle_shift_end);
    //             $("#ns").html(data.night_shift_start);
    //             $("#ne").html(data.night_shift_end);
    //             $("#mb").html(data.morning_shift_standard_beats);
    //             $("#mib").html(data.middle_shift_standard_beats);
    //             $("#nb").html(data.night_shift_standard_beats);
    //             $("#mw").html(data.morning_worker_num);
    //             $("#miw").html(data.middle_worker_num);
    //             $("#nw").html(data.night_worker_num);
    //             $("#mow").html(data.morning_overtime_worker_num);
    //             $("#miow").html(data.middle_overtime_worker_num);
    //             $("#now").html(data.night_overtime_worker_num);
    //     },
    //     failure: function (errMsg) {
    //         console.log(errMsg);
    //     }
    // });

}
showBance();
console.log("开始运行");
$("#oneSub").bind("click", function () {

    var OneshiftJson=new OneShiftInput( $("#oneTime").val(),$("#oneStart").val().toString(),$("#oneEnd").val().toString(),Number($("#oneStdBeats").val()),Number($("#oneWorkNum").val()),Number($("#oneWorkOverNum").val()));
    console.log("start");
    console.log(JSON.stringify(OneshiftJson));
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/nexteer/work-shift/morning-shift",
        data:JSON.stringify(OneshiftJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if(data.status==true) {
                $("#oneStatus").html("添加班次信息成功");
            }
            else{
                $("#oneStatus").html("添加班次信息失败");
            }
            console.log(data.status);
            console.log("nice");
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
    setInterval(function () {
        $("#oneStatus").html("");
    },1000*7);
    showBance();
});

$("#twoSub").bind("click", function () {
    var TwoshiftJson =new TwoShiftInput($("#twoTime").val(),$("#twoMStart").val().toString(),$("#twoMEnd").val().toString(),Number($("#twoMStdBeats").val()),Number($("#twoMWorkNum").val()),Number($("#twoMWorkOverNum").val()));

    console.log( JSON.stringify(TwoshiftJson));

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/nexteer/work-shift/middle-shift",
        data: JSON.stringify(TwoshiftJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if(data.status==true) {
                $("#twoStatus").html("添加班次信息成功");
            }
            else{
                $("#twoStatus").html("添加班次信息失败");
            }
            console.log(data.status);
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
    setInterval(function () {
        $("#twoStatus").html("");
    },1000*7);
    showBance();
});

$("#thiSub").bind("click", function () {


    var ThishiftJson=new ThreeShiftInput($("#thiTime").val(),$("#thiNStart").val(),$("#thiNEnd").val(), Number($("#thiNBeats").val()), Number($("#thiNWorkNum").val()),Number($("#thiNWorkOverNum").val()));

    // $("#thiMorStart").val(),$("#thiMorEnd").val(),$("#thiMidStart").val(),
    //     $("#thiMidEnd").val(),$("#thiNStart").val(),$("#thiNEnd").val(),parseInt($("#thiMorTar").val()),parseInt($("#thiMidTar").val()),parseInt($("#thiNTar").
    // val()),parseInt($("#thiMorBeats").val()),parseInt($("#thiMidBeats").val()),parseInt($("#thiNBeats").val())

    console.log( JSON.stringify(ThishiftJson));
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/nexteer/work-shift/night-shift",
        data: JSON.stringify(ThishiftJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if(data.status==true) {
                $("#thiStatus").html("添加班次信息成功");
            }
            else{
                $("#thiStatus").html("添加班次信息失败");
            }
            console.log(data.status);
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
    setInterval(function () {
        $("#thiStatus").html("");
    },1000*7);
    showBance();
});

$("#oneEventSub").bind("click",function () {
    var addEventJson=new eventInput("早班",$("#addEvent").val().toString(),$("#addStart").val().toString(),$("#addEnd").val().toString());
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/nexteer/rest-event/addEvent",
        data: JSON.stringify(addEventJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if(data.status==true) {
                $("#addStatus").html("添加事件成功");
            }
            else{
                $("#addStatus").html("添加事件失败");
            }
            console.log(data.status);

        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
    setInterval(function () {
        $("#addStatus").html("");
    },1000*7);
    showBance();
});

$("#twoEventSub").bind("click",function () {
    var addEventJson=new eventInput($("#addSecType").val().toString(),$("#addSecEvent").val().toString(),$("#addSecStart").val().toString(),$("#addSecEnd").val().toString());
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/nexteer/rest-event/addEvent",
        data: JSON.stringify(addEventJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if(data.status== true) {
                $("#addSecStatus").html("添加事件成功");
            }
            else{
                $("#addSecStatus").html("添加事件失败");
            }
            console.log(data.status);
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
    setInterval(function () {
        $("#addSecStatus").html("");
    },1000*3);
    showBance();
});

$("#thiEventSub").bind("click",function () {
    var addEventJson= new eventInput($("#addThiType").val().toString(),$("#addThiEvent").val().toString(),$("#addThiStart").val().toString(),$("#addThiEnd").val().toString());
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/nexteer/rest-event/addEvent",
        data: JSON.stringify(addEventJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if(data.status==true) {
                $("#addThiStatus").html("添加事件成功");
            }
            else{
                $("#addThiStatus").html("添加事件失败");
            }
            console.log(data.status);
        },
        failure: function (errMsg) {
            console.log(errMsg);
        }
    });
    setInterval(function () {
        $("#addThiStatus").html("");
    },1000*5);
    showBance();
});


