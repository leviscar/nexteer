/**
 * Created by Administrator on 2017/3/18.
 */

function shiftInput(setTime,shiftType,morStart, morEnd,Beats,morWorkNum,morWorkOverNum,morTar , cellName,open) {
    this.addDate = setTime;
    this.shiftType = shiftType;
    this.startTime  = morStart;
    this.endTime = morEnd;
    this.standardBeat= Beats;
    this.normalWorkerNum = morWorkNum;
    this.overtimeWorkerNum = morWorkOverNum;
    this.target =morTar;
    this.cell_name = cellName;
    this.open = open;
}
function OneShiftInput(setTime,shiftType,morStart, morEnd,Beats,morWorkNum,morWorkOverNum,morTar , cellName,open) {
    this.setting_time = setTime;
    this.shiftType = shiftType;
    this.morning_shift_start  = morStart;
    this.morning_shift_end = morEnd;
    this.morning_shift_standard_beats= Beats;
    this.morning_worker_num = morWorkNum;
    this.morning_overtime_worker_num = morWorkOverNum;
    this.morning_shift_target =morTar;
    this.cell_name = cellName;
    this.open = open;
}
function TwoShiftInput(setTime,shiftType,midStart, midEnd ,MBeats,MWorkNum,MWorkOverNum,midTar,cellName,open) {
    this.setting_time = setTime;
    this.shiftType=shiftType;
    this.middle_shift_start  = midStart;
    this.middle_shift_end = midEnd;
    this.middle_shift_standard_beats= MBeats;
    this.middle_worker_num=MWorkNum;
    this.middle_overtime_worker_num=MWorkOverNum;
    this.middle_shift_target=midTar;
    this.cell_name = cellName;
    this.open =open;
}

function ThreeShiftInput(setTime,shiftType,nigStart,nigEnd,nigBeats,nigWorkNum,nigWorkOverNum,nigTar,cellName,open) {
    this.setting_time=setTime;
    this.shiftType = shiftType;
    this.night_shift_start=nigStart;
    this.night_shift_end=nigEnd;
    this.night_shift_standard_beats=nigBeats;
    this.night_worker_num=nigWorkNum;
    this.night_overtime_worker_num = nigWorkOverNum;
    this.night_shift_target=nigTar;
    this.cell_name = cellName;
    this.open = open;
}
function  eventInput(type,cellName,event,eventStart,eventEnd) {
    this.shiftType=type;
    this.cellName = cellName;
    this.event=event;
    this.startTime=eventStart;
    this.endTime=eventEnd;
}
function showEvent() {
    $.get("http://localhost:8080/nexteer/work-shift/ISHAFT1?shift_type=Ashift", function (data) {
        if(data.system_status ==true){
            console.log($.parseJSON(data));
            $.each($.parseJSON(data), function (i, model) {

                $("#showEvent").append("<tbody><tr><td>"+model.shiftType+"</td><td>"+model.cellName+"</td><td>"+model.event+"</td><td>"+model.startTime+"</td><td>"+model.endTime+"</td></tr></tbody>");
            });
        }

    });

}
$('#addThiEvent').editableSelect({
    effects: 'slide'
});
showEvent();
function showBance() {
    $.get("http://localhost:8080/nexteer/work-shift/ISHAFT1?shift_type=Ashift", function (data) {
        console.log(typeof (data));
        console.log(data);
        // $("#productMessage").append("<tbody><tr><td>"+data.morning_shift_start+"</td><td>"+data.morning_shift_end+"</td><td>"+data.middle_shift_start+"</td><td>"+data.middle_shift_end+"</td><td>"+data.night_shift_start+"</td><td>"+data.night_shift_end+"</td><td>"+data.morning_shift_standard_beats+"</td><td>"
        //     +data.middle_shift_standard_beats+"</td><td>"+data.night_shift_standard_beats+"</td><td>"+data.morning_worker_num+"</td><td>"+data.middle_worker_num+"</td><td>"+data.night_worker_num+"</td><td>"+data.morning_overtime_worker_num+"</td><td>"+data.middle_overtime_worker_num+"</td><td>"+data.night_overtime_worker_num+"</td></tr></tbody>");
        console.log(data.id);
        // $("#mShift").html($.parseJSON(data).shiftType);
        // $("#ms").html($.parseJSON(data).startTime);
        // $("#me").html($.parseJSON(data).endTime);
        // $("#mb").html($.parseJSON(data).standardBeat);
        // $("#mw").html($.parseJSON(data).normalWorkerNum);
        // $("#mow").html($.parseJSON(data).overtimeWorkerNum);
        // $("#mTar").html($.parseJSON(data).target);
        // $("#cellAName").html($.parseJSON(data).cell_name);
        // $("#Aopen").html($.parseJSON(data).open);
        $("#mShift").html(data.shiftType);
        $("#ms").html(data.startTime);
        $("#me").html(data.endTime);
        $("#mb").html(data.standardBeat);
        $("#mw").html(data.normalWorkerNum);
        $("#mow").html(data.overtimeWorkerNum);
        $("#mTar").html(data.target);
        $("#cellAName").html(data.cellName);
        $("#Aopen").html(data.open);

    });
    $.get("http://localhost:8080/nexteer/work-shift/ISHAFT1?shift_type=Bshift", function (data) {
        console.log(typeof (data));
        console.log(data);
        // $("#productMessage").append("<tbody><tr><td>"+data.morning_shift_start+"</td><td>"+data.morning_shift_end+"</td><td>"+data.middle_shift_start+"</td><td>"+data.middle_shift_end+"</td><td>"+data.night_shift_start+"</td><td>"+data.night_shift_end+"</td><td>"+data.morning_shift_standard_beats+"</td><td>"
        //     +data.middle_shift_standard_beats+"</td><td>"+data.night_shift_standard_beats+"</td><td>"+data.morning_worker_num+"</td><td>"+data.middle_worker_num+"</td><td>"+data.night_worker_num+"</td><td>"+data.morning_overtime_worker_num+"</td><td>"+data.middle_overtime_worker_num+"</td><td>"+data.night_overtime_worker_num+"</td></tr></tbody>");
        console.log(data.id);
        // $("#miShift").html($.parseJSON(data).shiftType);
        // $("#mis").html($.parseJSON(data).startTime);
        // $("#mie").html($.parseJSON(data).endTime);
        // $("#mib").html($.parseJSON(data).standardBeat);
        // $("#miw").html($.parseJSON(data).normalWorkerNum);
        // $("#miow").html($.parseJSON(data).overtimeWorkerNum);
        // $("#miTar").html($.parseJSON(data).target);
        // $("#cellBName").html($.parseJSON(data).cell_name);
        // $("#Bopen").html($.parseJSON(data).open);
        $("#miShift").html(data.shiftType);
        $("#mis").html(data.startTime);
        $("#mie").html(data.endTime);
        $("#mib").html(data.standardBeat);
        $("#miw").html(data.normalWorkerNum);
        $("#miow").html(data.overtimeWorkerNum);
        $("#miTar").html(data.target);
        $("#cellBName").html(data.cellName);
        $("#Bopen").html(data.open);

    });
    $.get("http://localhost:8080/nexteer/work-shift/ISHAFT1?shift_type=Cshift", function (data) {
        console.log(typeof (data));
        console.log(data);
        // $("#productMessage").append("<tbody><tr><td>"+data.morning_shift_start+"</td><td>"+data.morning_shift_end+"</td><td>"+data.middle_shift_start+"</td><td>"+data.middle_shift_end+"</td><td>"+data.night_shift_start+"</td><td>"+data.night_shift_end+"</td><td>"+data.morning_shift_standard_beats+"</td><td>"
        //     +data.middle_shift_standard_beats+"</td><td>"+data.night_shift_standard_beats+"</td><td>"+data.morning_worker_num+"</td><td>"+data.middle_worker_num+"</td><td>"+data.night_worker_num+"</td><td>"+data.morning_overtime_worker_num+"</td><td>"+data.middle_overtime_worker_num+"</td><td>"+data.night_overtime_worker_num+"</td></tr></tbody>");
        console.log(data.id);
        // $("#nShift").html($.parseJSON(data).shiftType);
        // $("#ns").html($.parseJSON(data).startTime);
        // $("#ne").html($.parseJSON(data).endTime);
        // $("#nb").html($.parseJSON(data).standardBeat);
        // $("#nw").html($.parseJSON(data).normalWorkerNum);
        // $("#now").html($.parseJSON(data).overtimeWorkerNum);
        // $("#nTar").html($.parseJSON(data).target);
        // $("#cellCName").html($.parseJSON(data).cell_name);
        // $("#Copen").html($.parseJSON(data).open);
        $("#nShift").html(data.shiftType);
        $("#ns").html(data.startTime);
        $("#ne").html(data.endTime);
        $("#nb").html(data.standardBeat);
        $("#nw").html(data.normalWorkerNum);
        $("#now").html(data.overtimeWorkerNum);
        $("#nTar").html(data.target);
        $("#cellCName").html(data.cellName);
        $("#Copen").html(data.open);
    });
}
showBance();
console.log("开始运行");
$("#oneSub").bind("click", function () {

    var OneshiftJson=new shiftInput( $("#oneTime").val(),"Ashift",$("#oneStart").val().toString(),$("#oneEnd").val().toString(),Number($("#oneStdBeats").val()),Number($("#oneWorkNum").val()),Number($("#oneWorkOverNum").val()),Number($("#oneTar").val()),$("#oneCellName").val(),$("#oneOpen").val());
    console.log("start");
    console.log(JSON.stringify(OneshiftJson));
    $.ajax({
        type: "PATCH",
        url: "http://localhost:8080/nexteer/work-shift",
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
    var TwoshiftJson =new shiftInput($("#twoTime").val(),"Bshift",$("#twoMStart").val().toString(),$("#twoMEnd").val().toString(),Number($("#twoMStdBeats").val()),Number($("#twoMWorkNum").val()),Number($("#twoMWorkOverNum").val()),Number($("#twoTar").val()),$("#twoCellName").val(),$("#twoOpen").val());

    console.log( JSON.stringify(TwoshiftJson));

    $.ajax({
        type: "PATCH",
        url: "http://localhost:8080/nexteer/work-shift",
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


    var ThishiftJson=new shiftInput($("#thiTime").val(),"Cshift".$("#thiNStart").val(),$("#thiNEnd").val(), Number($("#thiNBeats").val()), Number($("#thiNWorkNum").val()),Number($("#thiNWorkOverNum").val()),umber($("#thiTar").val()),$("#thiCellName").val(),$("#thiOpen").val());

    // $("#thiMorStart").val(),$("#thiMorEnd").val(),$("#thiMidStart").val(),
    //     $("#thiMidEnd").val(),$("#thiNStart").val(),$("#thiNEnd").val(),parseInt($("#thiMorTar").val()),parseInt($("#thiMidTar").val()),parseInt($("#thiNTar").
    // val()),parseInt($("#thiMorBeats").val()),parseInt($("#thiMidBeats").val()),parseInt($("#thiNBeats").val())

    console.log( JSON.stringify(ThishiftJson));
    $.ajax({
        type: "PATCH",
        url: "http://localhost:8080/nexteer/work-shift",
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
        url: "http://localhost:8080/nexteer/rest-event",
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


