/**
 * Created by Administrator on 2017/3/18.
 */
function OneShiftInput(setTime,morStart, morEnd,Beats,morWorkNum,morWorkOverNum,morTar , cellName) {
    this.setting_time = setTime;
    this.morning_shift_start  = morStart;
    this.morning_shift_end = morEnd;
    this.morning_shift_standard_beats= Beats;
    this.morning_worker_num = morWorkNum;
    this.morning_overtime_worker_num = morWorkOverNum;
    this.morning_shift_target =morTar;
    this.cell_name = cellName;
}
function TwoShiftInput(setTime,midStart, midEnd ,MBeats,MWorkNum,MWorkOverNum,midTar,cellName) {
    this.setting_time = setTime;
    this.middle_shift_start  = midStart;
    this.middle_shift_end = midEnd;
    this.middle_shift_standard_beats= MBeats;
    this.middle_worker_num=MWorkNum;
    this.middle_overtime_worker_num=MWorkOverNum;
    this.middle_shift_target=midTar;
    this.cell_name = cellName;
}

function ThreeShiftInput(setTime,nigStart,nigEnd,nigBeats,nigWorkNum,nigWorkOverNum,nigTar,cellName) {
    this.setting_time=setTime;
    this.night_shift_start=nigStart;
    this.night_shift_end=nigEnd;
    this.night_shift_standard_beats=nigBeats;
    this.night_worker_num=nigWorkNum;
    this.night_overtime_worker_num = nigWorkOverNum;
    this.night_shift_target=nigTar;
    this.cell_name = cellName;
}
function  eventInput(type,event,eventStart,eventEnd) {
    this.shift_type=type;
    this.event=event;
    this.event_start_time=eventStart;
    this.event_end_time=eventEnd;
}
function showEvent() {
    $.get("http://localhost:8080/nexteer/rest-event/getAllEvent", function (data) {
        if(data.system_status ==true){
            console.log($.parseJSON(data));
            $.each($.parseJSON(data), function (i, model) {

                $("#showEvent").append("<tbody><tr><td>"+model.shift_type+"</td><td>"+model.event+"</td><td>"+model.event_start_time+"</td><td>"+model.event_end_time+"</td></tr></tbody>");
            });
        }

    });

}
$('#addThiEvent').editableSelect({
    effects: 'slide'
});
showEvent();
function showBance() {
    $.get("http://localhost:8080//nexteer/work-shift/ISHAFT1", function (data) {
        console.log(typeof (data));
        console.log($.parseJSON(data));
        // $("#productMessage").append("<tbody><tr><td>"+data.morning_shift_start+"</td><td>"+data.morning_shift_end+"</td><td>"+data.middle_shift_start+"</td><td>"+data.middle_shift_end+"</td><td>"+data.night_shift_start+"</td><td>"+data.night_shift_end+"</td><td>"+data.morning_shift_standard_beats+"</td><td>"
        //     +data.middle_shift_standard_beats+"</td><td>"+data.night_shift_standard_beats+"</td><td>"+data.morning_worker_num+"</td><td>"+data.middle_worker_num+"</td><td>"+data.night_worker_num+"</td><td>"+data.morning_overtime_worker_num+"</td><td>"+data.middle_overtime_worker_num+"</td><td>"+data.night_overtime_worker_num+"</td></tr></tbody>");
        console.log($.parseJSON(data).id);
        $("#ms").html($.parseJSON(data).morning_shift_start);
        $("#me").html($.parseJSON(data).morning_shift_end);
        $("#mis").html($.parseJSON(data).middle_shift_start);
        $("#mie").html($.parseJSON(data).middle_shift_end);
        $("#ns").html($.parseJSON(data).night_shift_start);
        $("#ne").html($.parseJSON(data).night_shift_end);
        $("#mb").html($.parseJSON(data).morning_shift_standard_beats);
        $("#mib").html($.parseJSON(data).middle_shift_standard_beats);
        $("#nb").html($.parseJSON(data).night_shift_standard_beats);
        $("#mw").html($.parseJSON(data).morning_worker_num);
        $("#miw").html($.parseJSON(data).middle_worker_num);
        $("#nw").html($.parseJSON(data).night_worker_num);
        $("#mow").html($.parseJSON(data).morning_overtime_worker_num);
        $("#miow").html($.parseJSON(data).middle_overtime_worker_num);
        $("#now").html($.parseJSON(data).night_overtime_worker_num);
        $("#oneTar").html($.parseJSON(data).morning_shift_target);
        $("#twoTar").html($.parseJSON(data).morning_shift_target);
        $("#thiTar").html($.parseJSON(data).morning_shift_target);
        $("#cellName").html($.parseJSON(data).cell_name);

    });
}
showBance();
console.log("开始运行");
$("#oneSub").bind("click", function () {

    var OneshiftJson=new OneShiftInput( $("#oneTime").val(),$("#oneStart").val().toString(),$("#oneEnd").val().toString(),Number($("#oneStdBeats").val()),Number($("#oneWorkNum").val()),Number($("#oneWorkOverNum").val()),Number($("#oneTar").val()),$("#oneCellName").val());
    console.log("start");
    console.log(JSON.stringify(OneshiftJson));
    $.ajax({
        type: "POST",
        url: "http://localhost:8080/nexteer/work-shift/ashift",
        data:JSON.stringify(OneshiftJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if(data.system_status==true) {
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
    var TwoshiftJson =new TwoShiftInput($("#twoTime").val(),$("#twoMStart").val().toString(),$("#twoMEnd").val().toString(),Number($("#twoMStdBeats").val()),Number($("#twoMWorkNum").val()),Number($("#twoMWorkOverNum").val()),Number($("#twoTar").val()),$("#twoCellName").val());

    console.log( JSON.stringify(TwoshiftJson));

    $.ajax({
        type: "POST",
        url: "http://localhost:8080/nexteer/work-shift/bshift",
        data: JSON.stringify(TwoshiftJson),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            if(data.system_status==true) {
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


    var ThishiftJson=new ThreeShiftInput($("#thiTime").val(),$("#thiNStart").val(),$("#thiNEnd").val(), Number($("#thiNBeats").val()), Number($("#thiNWorkNum").val()),Number($("#thiNWorkOverNum").val()),umber($("#thiTar").val()),$("#thiCellName").val());

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
            if(data.system_status==true) {
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
            if(data.system_status==true) {
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
            if(data.system_status== true) {
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
            if(data.system_status==true) {
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


